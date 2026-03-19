"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";

interface MapModalProps {
  open: boolean;
  onClose: () => void;
}

const ADDRESS = "302 Gò Dưa, Phường Tam Bình, Thành phố Hồ Chí Minh";
const MAPS_QUERY = encodeURIComponent(ADDRESS);

export function MapModal({ open, onClose }: MapModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const embedSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${MAPS_QUERY}&zoom=16&language=vi`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-2xl bg-background rounded-lg overflow-hidden shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <p className="font-bold text-sm text-foreground">CEC Center</p>
            <p className="text-xs text-muted-foreground">{ADDRESS}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Đóng bản đồ"
          >
            <X className="h-4 w-4" weight="bold" />
          </button>
        </div>

        {/* Map embed */}
        <div className="w-full h-105">
          {apiKey && apiKey !== "your_api_key_here" ? (
            <iframe
              src={embedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CEC Center Location"
            />
          ) : (
            /* Fallback: open in Google Maps */
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-muted/30">
              <p className="text-sm text-muted-foreground text-center px-6">
                Chưa cấu hình Google Maps API key.<br />
                Thêm key vào <code className="text-xs bg-muted px-1 py-0.5 rounded">.env.local</code>
              </p>
              <a
                href={`https://maps.google.com/?q=${MAPS_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-600 underline"
              >
                Mở trong Google Maps ↗
              </a>
            </div>
          )}
        </div>

        {/* Footer link */}
        <div className="px-4 py-2 border-t border-border flex justify-end">
          <a
            href={`https://maps.google.com/?q=${MAPS_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Mở trong Google Maps ↗
          </a>
        </div>
      </div>
    </div>
  );
}
