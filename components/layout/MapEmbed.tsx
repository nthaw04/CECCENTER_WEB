const ADDRESS = "302 Gò Dưa, Phường Tam Bình, Thành phố Hồ Chí Minh";
const MAPS_QUERY = encodeURIComponent(ADDRESS);

export function MapEmbed() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const haKey = apiKey && apiKey !== "AIzaSyDAX06ZrKiNfBiR2qvTdlEOkxdS9hhIHik";

  return (
    <div className="w-full h-72 sm:h-80 md:h-96">
      {haKey ? (
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${MAPS_QUERY}&zoom=16&language=vi`}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CEC Center Location"
        />
      ) : (
        <div className="w-full h-full bg-muted/40 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground">
            Chưa cấu hình Google Maps API key
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
  );
}
