"use client";

const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.201746080999!2d106.741211575485!3d10.87225465741795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527f5a144c4ab%3A0x7617682c8612a3b7!2zMzAyIMSQLiBHw7IgRMawYSwgVGFtIELDrG5oLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1774010748513!5m2!1svi!2s";

export function GoogleMap() {
  return (
    <div className="w-full h-full">
      <iframe
        src={EMBED_SRC}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="CEC Center Location"
      />
    </div>
  );
}
