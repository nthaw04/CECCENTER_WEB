import { useState, useEffect, useCallback, useMemo } from "react";
import {
  searchData,
  groupSearchResults,
  type SearchItem,
} from "@/constants/searchData";

export interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
  groupedResults: ReturnType<typeof groupSearchResults>;
  isLoading: boolean;
  hasResults: boolean;
  clearSearch: () => void;
}

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const matchAllWords = (text: string, queryWords: string[]): boolean => {
  const normalizedText = normalizeText(text);
  return queryWords.every((word) => normalizedText.includes(word));
};

const getSearchScore = (item: SearchItem, query: string): number => {
  const normalizedQuery = normalizeText(query.trim());
  const queryWords = normalizedQuery.split(/\s+/).filter((w) => w.length > 0);

  if (normalizedQuery.length < 2) return 0;

  const normalizedTitle = normalizeText(item.title);
  const normalizedDescription = normalizeText(item.description);
  const normalizedKeywords = item.keywords.map(normalizeText);

  let score = 0;

  const titleMatchesAll = matchAllWords(item.title, queryWords);
  const descMatchesAll = matchAllWords(item.description, queryWords);
  const keywordExactMatch = normalizedKeywords.some(
    (kw) => kw.includes(normalizedQuery) || normalizedQuery.includes(kw),
  );
  const keywordsMatchAll = normalizedKeywords.some((kw) =>
    queryWords.every((word) => kw.includes(word)),
  );

  if (normalizedTitle.includes(normalizedQuery)) {
    score += 150;
    if (normalizedTitle.startsWith(normalizedQuery)) {
      score += 50;
    }
  } else if (titleMatchesAll) {
    score += 100;
  }

  if (keywordExactMatch) {
    score += 80;
  } else if (keywordsMatchAll) {
    score += 55;
  }

  if (descMatchesAll || normalizedDescription.includes(normalizedQuery)) {
    score += 30;
  }

  if (score > 0) {
    if (item.type === "page") score += 10;
    if (item.type === "feature") score += 5;
  }

  return score;
};

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 200);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const results = useMemo<SearchItem[]>(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return [];

    return searchData
      .map((item) => ({
        item,
        score: getSearchScore(item, debouncedQuery),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ item }) => item);
  }, [debouncedQuery]);

  const isLoading = query.trim() !== debouncedQuery;

  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  const groupedResults = groupSearchResults(results);
  const hasResults = results.length > 0;

  return {
    query,
    setQuery,
    results,
    groupedResults,
    isLoading,
    hasResults,
    clearSearch,
  };
}

export default useSearch;
