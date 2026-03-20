"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NodeBox = {
  id: string;
  level: number;
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  fontSize?: number;
};

const CHART_NODES: NodeBox[] = [
  { id: "board", level: 1, x: 420, y: 85, w: 290, h: 78, lines: ["BAN GIÁM ĐỐC", "TRUNG TÂM"] },

  { id: "admin", level: 2, x: 35, y: 225, w: 225, h: 78, lines: ["PHÒNG HÀNH CHÍNH", "TỔNG HỢP"] },
  { id: "consult", level: 2, x: 338, y: 225, w: 230, h: 78, lines: ["PHÒNG TƯ VẤN", "THIẾT KẾ, GIÁM SÁT"] },
  { id: "survey", level: 2, x: 640, y: 225, w: 240, h: 78, lines: ["PHÒNG KHẢO SÁT", "ĐỊA HÌNH, ĐỊA CHẤT"] },
  { id: "lab", level: 2, x: 945, y: 225, w: 235, h: 78, lines: ["PHÒNG TN CHUYÊN", "NGÀNH XÂY DỰNG"] },

  { id: "issue", level: 3, x: 35, y: 345, w: 225, h: 78, lines: ["PHÁT HÀNH, NHÂN BẢN", "BÀN GIAO HỒ SƠ"] },

  { id: "site1", level: 3, x: 338, y: 345, w: 230, h: 78, lines: ["KHẢO SÁT, GIÁM SÁT", "HIỆN TRƯỜNG"] },
  { id: "summary1", level: 4, x: 338, y: 466, w: 230, h: 78, lines: ["TỔNG HỢP,", "XỬ LÝ KẾT QUẢ"] },
  { id: "print", level: 5, x: 338, y: 586, w: 230, h: 78, lines: ["IN ẤN, TRÌNH DUYỆT", "XEM XÉT"] },

  { id: "site2", level: 3, x: 640, y: 345, w: 240, h: 78, lines: ["KHẢO SÁT, THÍ NGHIỆM", "HIỆN TRƯỜNG"] },

  { id: "fieldLab", level: 3, x: 900, y: 345, w: 160, h: 78, lines: ["THÍ NGHIỆM", "HIỆN TRƯỜNG"] },
  { id: "station", level: 3, x: 1080, y: 345, w: 165, h: 78, lines: ["TRẠM", "THÍ NGHIỆM", "HIỆN TRƯỜNG"] },

  { id: "indoor", level: 4, x: 795, y: 466, w: 240, h: 78, lines: ["THÍ NGHIỆM", "TRONG PHÒNG"] },
  { id: "summary2", level: 5, x: 795, y: 586, w: 240, h: 78, lines: ["TỔNG HỢP,", "XỬ LÝ KẾT QUẢ"] },
];

const LEVEL_COLORS: Record<number, { fill: string; stroke: string; text: string }> = {
  1: { fill: "#fff2e8", stroke: "#ea580c", text: "#7c2d12" },
  2: { fill: "#ecf4ff", stroke: "#2563eb", text: "#1e3a8a" },
  3: { fill: "#edfdf3", stroke: "#16a34a", text: "#14532d" },
  4: { fill: "#f5efff", stroke: "#7c3aed", text: "#4c1d95" },
  5: { fill: "#fffbe8", stroke: "#ca8a04", text: "#713f12" },
};

const CONNECTORS = [
  // board to top bus and down branches
  "M565 163 V214",
  "M150 214 H1063",
  "M150 214 V255",
  "M453 214 V255",
  "M760 214 V255",
  "M1063 214 V255",

  // admin branch
  "M150 303 V345",

  // consult branch
  "M453 303 V345",
  "M453 423 V466",
  "M453 544 V586",

  // survey branch
  "M760 303 V345",

  // lab branch to split
  "M1063 303 V332",
  "M978 332 H1162",
  "M978 332 V345",
  "M1162 332 V345",

  // merge to indoor test
  "M760 423 V444",
  "M980 423 V444",
  "M1162 423 V444",
  "M760 444 H1162",
  "M915 444 V466",

  // indoor to summary
  "M915 544 V586",

  // final flow from right to left and return loop to consult
  "M795 625 H568",
  "M338 625 H300 V264 H260",
];

const ARROWS = [
  "M150 255 V303",
  "M453 255 V303",
  "M760 255 V303",
  "M1063 255 V303",
  "M150 303 V345",
  "M453 303 V345",
  "M453 423 V466",
  "M453 544 V586",
  "M760 303 V345",
  "M978 332 V345",
  "M1162 332 V345",
  "M915 444 V466",
  "M915 544 V586",
  "M795 625 H568",
  "M300 264 H260",
];

const RETURN_CONNECTOR = "M338 625 H300 V264 H260";
const RETURN_ARROW = "M300 264 H260";
const DESKTOP_CHART_SCALE = 0.86;
const MOBILE_CHART_SCALE = 0.88;

function ChartNode({ node }: { node: NodeBox }) {
  const lineHeight = 20;
  const blockHeight = lineHeight * node.lines.length;
  const firstLineY = node.y + node.h / 2 - blockHeight / 2 + 14;
  const color = LEVEL_COLORS[node.level] ?? LEVEL_COLORS[2];

  return (
    <g className="chart-node">
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx="10"
        ry="10"
        fill={color.fill}
        stroke={color.stroke}
        strokeWidth="1.6"
      />
      {node.lines.map((line, index) => (
        <text
          key={`${node.id}-${line}-${index}`}
          x={node.x + node.w / 2}
          y={firstLineY + index * lineHeight}
          textAnchor="middle"
          className="select-none"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: node.fontSize ?? 15,
            fontWeight: 600,
            fill: color.text,
            letterSpacing: "0.1px",
          }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function OrganizationChartSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const chartScale = isMobile ? MOBILE_CHART_SCALE : DESKTOP_CHART_SCALE;
  const chartOffsetX = (1260 - 1260 * chartScale) / 2;
  const chartOffsetY = -35;

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(".chart-connector");
      const nodes = gsap.utils.toArray<SVGGElement>(".chart-node");

      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.out",
          stagger: 0.035,
        },
        0
      ).fromTo(
        nodes,
        { opacity: 0, scale: 0.96, transformOrigin: "center center" },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0.055 },
        0.2
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border border-border bg-card overflow-hidden">
      <div className="px-3 sm:px-4 py-2.5 flex items-center" style={{ backgroundColor: "#FE9D6F" }}>
        <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">Sơ Đồ Tổ Chức Của Trung Tâm</span>
      </div>

      <div className="overflow-x-hidden md:overflow-x-auto p-1 md:p-2 bg-white [scrollbar-width:thin]">
        <div className="w-full md:w-280 lg:w-full mx-auto">
          <svg
            viewBox="0 0 1260 560"
            className="w-full h-auto"
            role="img"
            aria-label="Sơ đồ tổ chức của trung tâm"
          >
          <defs>
            <marker
              id="chart-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="5.2"
              refY="2.6"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,5.2 L5.4,2.6 z" fill="#1f2937" />
            </marker>
          </defs>

            <g transform={`translate(${chartOffsetX} ${chartOffsetY}) scale(${chartScale})`}>
              {CONNECTORS.filter((d) => d !== RETURN_CONNECTOR).map((d, i) => (
                <path
                  key={`connector-${i}`}
                  d={d}
                  className="chart-connector"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="1.8"
                  strokeLinecap="square"
                />
              ))}

              {ARROWS.filter((d) => d !== RETURN_ARROW).map((d, i) => (
                <path
                  key={`arrow-${i}`}
                  d={d}
                  className="chart-connector"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="1.8"
                  markerEnd="url(#chart-arrow)"
                />
              ))}

              {CHART_NODES.map((node) => (
                <ChartNode key={node.id} node={node} />
              ))}

              {/* overlay the return connector so it won't be hidden by node fills */}
              <path
                d={RETURN_CONNECTOR}
                className="chart-connector"
                fill="none"
                stroke="#1f2937"
                strokeWidth="1.8"
                strokeLinecap="square"
              />
              <path
                d={RETURN_ARROW}
                className="chart-connector"
                fill="none"
                stroke="#1f2937"
                strokeWidth="1.8"
                markerEnd="url(#chart-arrow)"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
