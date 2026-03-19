import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-[45vh] min-h-70 max-h-130 overflow-hidden">
      <Image
        src="/images/vanh-dai-3.jpg"
        alt="Đường Vành Đai 3 – CEC Center"
        fill
        priority
        className="object-cover object-center"
      />
    </section>
  );
}
