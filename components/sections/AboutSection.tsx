"use client";

import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

const PARAGRAPHS_VI = [
  <><strong>TRUNG TÂM TƯ VẤN KIỂM ĐỊNH KỸ THUẬT CÔNG TRÌNH</strong> được thành lập theo chứng nhận đăng ký hoạt động Khoa học và Công nghệ số 135/ĐK-KHCN do Sở Khoa học &amp; Công nghệ thành phố Hồ Chí Minh cấp lần đầu ngày 30/05/2006 và chứng nhận đăng ký bổ sung lần 6 ngày 08/07/2025.</>,
  <>Các lĩnh vực hoạt động bao gồm: Nghiên cứu khoa học và triển khai ứng dụng trong lĩnh vực công nghệ vật liệu xây dựng; Sản xuất thử – Thử nghiệm, chuyển giao công nghệ từ kết quả nghiên cứu theo lĩnh vực đăng ký; Dịch vụ khoa học và công nghệ; Hợp tác trong và ngoài nước theo lĩnh vực đăng ký phù hợp Luật định.</>,
  <>Trung tâm tư vấn kiểm định kỹ thuật công trình có đội ngũ cán bộ khoa học kỹ thuật trình độ từ công nhân kỹ thuật, cao đẳng, kỹ sư, thạc sỹ và một số cộng tác viên nghiên cứu có nhiều kinh nghiệm trong công tác nghiên cứu khoa học thuộc lĩnh vực công trình giao thông vận tải, công trình hạ tầng đô thị, kiến trúc và xây dựng dân dụng, khảo sát địa chất công trình – địa chất thủy văn và địa hình công trình xây dựng; Tư vấn kiểm định đánh giá chất lượng các loại vật liệu xây dựng, công trình trong lĩnh vực xây dựng.</>,
  <>Trung tâm tư vấn kiểm định kỹ thuật công trình rất sẵn sàng hợp tác phát triển trong nước, ngoài nước và quốc tế với các đối tác phù hợp trong lĩnh vực dịch vụ KH&amp;CN của Trung tâm, đồng thời sẵn sàng chia sẻ trao đổi những kinh nghiệm nghề nghiệp nhằm cùng nhau phát triển trên tiêu chí: <em>&ldquo;Phát triển bền vững – Nâng cao và đảm bảo chất lượng công trình&rdquo;</em>.</>,
  <>Trung tâm tư vấn kiểm định kỹ thuật công trình xin gửi lời cảm ơn chân thành đến các quý Chủ đầu tư, quý Ban quản lý, Đơn vị tư vấn giám sát, Nhà thầu thi công xây lắp, … và các đơn vị đối tác trong thời gian qua đã quan tâm – Tạo điều kiện và hợp tác cùng Trung tâm chúng tôi. Trung tâm chúng tôi luôn mong muốn nhận được sự quan tâm, hợp tác, giúp đỡ, góp ý của Quý khách hàng trong thời gian tới.</>,
  <><strong>Trân trọng cảm ơn và kính chào!</strong></>,
];

const PARAGRAPHS_EN = [
  <><strong>CONSTRUCTION ENGINEERING VERIFICATION CONSULTANT CENTER</strong> was established under Science and Technology Activity Registration Certificate No. 135/ĐK-KHCN issued by the Ho Chi Minh City Department of Science and Technology, first issued on 30/05/2006 and the 6th supplementary registration on 08/07/2025.</>,
  <>Fields of activity include: Scientific research and application development in construction materials technology; Trial production, testing and technology transfer from research results in registered fields; Science and technology services; Domestic and international cooperation in registered fields in accordance with the law.</>,
  <>CEC Center has a team of scientific and technical staff ranging from skilled workers, college graduates, engineers and masters, along with experienced research collaborators in transportation engineering, urban infrastructure, architecture and civil construction, geological-hydrogeological survey and construction topography; consulting on quality assessment of construction materials and projects.</>,
  <>CEC Center is ready to cooperate and develop domestically, internationally and globally with suitable partners in its S&amp;T service fields, and is ready to share professional experiences for mutual development under the motto: <em>&ldquo;Sustainable Development – Improving and Ensuring Construction Quality&rdquo;</em>.</>,
  <>CEC Center sincerely thanks all Investors, Management Boards, Supervision Consultants, Construction Contractors, … and partner organizations for their attention, support and cooperation. We always welcome your continued attention, cooperation, assistance and feedback.</>,
  <><strong>Thank you and best regards!</strong></>,
];

export function AboutSection() {
  const { t, locale } = useLanguage();
  const paragraphs = locale === "vi" ? PARAGRAPHS_VI : PARAGRAPHS_EN;
  const introTitle = locale === "vi" ? "GIỚI THIỆU" : "ABOUT US";
  const projectsTitle = locale === "vi" ? "Các dự án đã và đang tham gia" : "Projects";

  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Two-column layout: 2/3 left | 1/3 right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* ── Left column (2/3) ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Column title */}
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#93CAF0" }}>
                {t.about.section_title}
              </p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter text-foreground leading-tight">
                {introTitle}
              </h2>
              <Separator className="mt-5 w-12 h-0.5 bg-foreground/20" />
            </div>

            {/* Body paragraphs */}
            <div className="space-y-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-sm lg:text-base text-muted-foreground leading-relaxed tracking-tighter">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* ── Right column (1/3) ── */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#93CAF0" }}>
                {locale === "vi" ? "Dự án" : "Projects"}
              </p>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tighter text-foreground leading-tight">
                {projectsTitle}
              </h2>
              <Separator className="mt-5 w-12 h-0.5 bg-foreground/20" />
            </div>

            {/*
              PROJECT LIST PLACEHOLDER
              ─────────────────────────
              Thêm nội dung dự án vào đây.
              Ví dụ cấu trúc mỗi dự án:

              <div className="border-l-2 border-border pl-4 space-y-1">
                <p className="text-sm font-bold text-foreground">Tên dự án</p>
                <p className="text-xs text-muted-foreground">Chủ đầu tư – Năm</p>
              </div>
            */}
            <div className="flex items-center justify-center h-48 border border-dashed border-border rounded-lg">
              <p className="text-sm text-muted-foreground/50 text-center px-4">
                {locale === "vi" ? "Nội dung sẽ được cập nhật..." : "Content coming soon..."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
