"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS_VI = [
  <><strong>TRUNG TÂM TƯ VẤN KIỂM ĐỊNH KỸ THUẬT CÔNG TRÌNH</strong> được thành lập theo chứng nhận đăng ký hoạt động Khoa học và Công nghệ số 135/ĐK-KHCN do Sở Khoa học &amp; Công nghệ thành phố Hồ Chí Minh cấp lần đầu ngày 30/05/2006 và chứng nhận đăng ký bổ sung lần 6 ngày 08/07/2025.</>,
  <>Các lĩnh vực hoạt động bao gồm: Nghiên cứu khoa học và triển khai ứng dụng trong lĩnh vực công nghệ vật liệu xây dựng; Sản xuất thử – Thử nghiệm, chuyển giao công nghệ từ kết quả nghiên cứu theo lĩnh vực đăng ký; Dịch vụ khoa học và công nghệ; Hợp tác trong và ngoài nước theo lĩnh vực đăng ký phù hợp Luật định.</>,
  <>Trung tâm có đội ngũ cán bộ khoa học kỹ thuật trình độ từ công nhân kỹ thuật, cao đẳng, <strong>kỹ sư, thạc sỹ</strong> và cộng tác viên nghiên cứu nhiều kinh nghiệm trong lĩnh vực công trình giao thông vận tải, hạ tầng đô thị, kiến trúc và xây dựng dân dụng, khảo sát địa chất công trình – địa chất thủy văn; <strong>Tư vấn kiểm định đánh giá chất lượng</strong> các loại vật liệu xây dựng và công trình.</>,
  <>Trung tâm rất sẵn sàng hợp tác phát triển trong nước, ngoài nước và quốc tế với các đối tác phù hợp, đồng thời sẵn sàng chia sẻ kinh nghiệm nghề nghiệp nhằm cùng nhau phát triển trên tiêu chí: <em>&ldquo;Phát triển bền vững – Nâng cao và đảm bảo chất lượng công trình&rdquo;</em>.</>,
  <>Trung tâm xin gửi lời cảm ơn chân thành đến các quý <strong>Chủ đầu tư</strong>, quý <strong>Ban quản lý</strong>, <strong>Đơn vị tư vấn giám sát</strong>, <strong>Nhà thầu thi công xây lắp</strong> và các đơn vị đối tác đã quan tâm, tạo điều kiện và hợp tác cùng Trung tâm. Trung tâm luôn mong muốn nhận được sự quan tâm, hợp tác và góp ý của Quý khách hàng trong thời gian tới.</>,
  <><strong>Trân trọng cảm ơn và kính chào!</strong></>,
];

const PARAGRAPHS_EN = [
  <><strong>CONSTRUCTION ENGINEERING VERIFICATION CONSULTANT CENTER</strong> was established under Science and Technology Activity Registration Certificate No. 135/ĐK-KHCN issued by the Ho Chi Minh City Department of Science and Technology, first issued on 30/05/2006 and the 6th supplementary registration on 08/07/2025.</>,
  <>Fields of activity include: Scientific research and application development in construction materials technology; Trial production &amp; testing, technology transfer from research results; Science and technology services; Domestic and international cooperation in registered fields in accordance with the law.</>,
  <>CEC Center has a team of scientific and technical staff ranging from skilled workers, college graduates, <strong>engineers and masters</strong>, along with experienced research collaborators in transportation engineering, urban infrastructure, architecture and civil construction, geological-hydrogeological survey; <strong>quality assessment consulting</strong> for construction materials and projects.</>,
  <>CEC Center is ready to cooperate and develop domestically, internationally and globally with suitable partners, sharing professional experiences for mutual development under the motto: <em>&ldquo;Sustainable Development – Improving and Ensuring Construction Quality&rdquo;</em>.</>,
  <>CEC Center sincerely thanks all <strong>Investors</strong>, <strong>Management Boards</strong>, <strong>Supervision Consultants</strong>, <strong>Construction Contractors</strong> and partner organizations for their support and cooperation. We always welcome your continued attention, cooperation and feedback.</>,
  <><strong>Thank you and best regards!</strong></>,
];

export function AboutSection() {
  const { locale } = useLanguage();
  const paragraphs = locale === "vi" ? PARAGRAPHS_VI : PARAGRAPHS_EN;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".gsap-reveal"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} id="about" className="border border-border bg-card h-full flex flex-col">
      {/* Header bar */}
      <div className="px-5 py-3 flex items-center justify-between shrink-0" style={{ backgroundColor: "#93CAF0" }}>
        <span className="text-sm font-bold tracking-[0.18em] uppercase text-white">
          {locale === "vi" ? "Giới Thiệu" : "About Us"}
        </span>
        <CaretRight size={16} color="white" weight="bold" />
      </div>

      {/* Body */}
      <div className="p-5 space-y-3 flex-1 gsap-reveal [&_strong]:font-bold [&_strong]:text-foreground [&_em]:italic [&_em]:text-foreground/70 dark:[&_em]:text-muted-foreground overflow-auto">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm text-foreground/75 dark:text-muted-foreground leading-relaxed tracking-tight">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
