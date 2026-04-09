import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

const disclosureItems = [
  {
    title: "ĐƠN CÔNG BỐ NĂNG LỰC HOẠT ĐỘNG THÍ NGHIỆM",
    href: "https://drive.google.com/file/d/1R-UL3amf7hM0ioy241_O2iQjqOEe1_oy/view?usp=sharing",
  },
  {
    title: "PHÁP LÝ TRUNG TÂM",
    href: "https://drive.google.com/file/d/15fP_vwUW4B8LaTpEvqJ7tgnmEFqhuVJ5/view?usp=drive_link",
  },
  {
    title: "QĐ THÀNH LẬP PTN + BỔ NHIỆM TP THÍ NGHIỆM",
    href: "https://drive.google.com/file/d/1j2h3IS63UzRZTFtHhJkArNafcVzQ5hwH/view?usp=drive_link",
  },
  {
    title: "DANH SÁCH NHÂN SỰ. BẢNG PHÂN CÔNG CÔNG VIỆC. BẰNG CẤP",
    href: "https://drive.google.com/file/d/1yIcHaRzjWkzSEEBNTqcW67PN8_UJO_v4/view?usp=drive_link",
  },
  {
    title: "DANH MỤC CÁC THỦ TỤC, QUY TRÌNH QUẢN LÝ CHẤT LƯỢNG",
    href: "https://drive.google.com/file/d/12YBk19_8INAz_RiSCFI-5n4EuLUvleGv/view?usp=drive_link",
  },
  {
    title: "HỆ THỐNG QLCL THEO TCVN ISO 17025: 2017",
    href: "https://drive.google.com/file/d/1VL9SUZL18C4daueoeWxeD_TylB1AtkJ0/view?usp=drive_link",
  },
  {
    title: "DANH MỤC MÁY MÓC THIẾT BỊ. HỢP ĐỒNG MUA BÁN.",
    href: "https://drive.google.com/file/d/1e5sALlmeHObp2ojFwPYcuexILEte3Zc3/view?usp=drive_link",
  },
  {
    title: "BẢN SAO CHỨNG NHẬN KIỂM ĐỊNH/HIỆU CHUẨN THIẾT BỊ",
    href: "https://drive.google.com/file/d/1bheDjco-z1HKvSv4sR4xb-fccdPqCSyA/view?usp=drive_link",
  },
  {
    title: "HỢP ĐỒNG THUÊ PTN. MẶT BẰNG PTN",
    href: "https://drive.google.com/file/d/1ET0S4U-Dxa9GJTY3XO94PDpH0c58yQlk/view?usp=drive_link",
  },
  {
    title: "DANH MỤC TÀI LIỆU TCVN",
    href: "https://drive.google.com/file/d/13qbAcDrwP-pZAqz9ePzvMNAgqLX1u4BK/view?usp=drive_link",
  },
  {
    title: "DANH MỤC TÀI LIỆU TCNN",
    href: "https://drive.google.com/file/d/1Dr3mL2LX7sYCOiUpdeAKHdsu145KFBbL/view?usp=drive_link",
  },
];

export default function CongBoNlhdThiNghiemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pb-14">
        <section className="w-full mb-10">
          <div className="relative h-56 sm:h-72 lg:h-96 w-full overflow-hidden">
            <Image
              src="/images/vanh-dai-3.jpg"
              alt="Bản đồ khu vực dự án"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              CÔNG BỐ NLHĐ THÍ NGHIỆM
            </h1>

            <div className="p-0 sm:p-0">
              <h2 className="text-lg sm:text-xl font-bold uppercase text-slate-800 mb-4">
                HỒ SƠ CÔNG BỐ NĂNG LỰC HOẠT ĐỘNG THÍ NGHIỆM
              </h2>

              <ol className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {disclosureItems.map((item, index) => (
                  <li key={item.title} className="group">
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-1.5"
                    >
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-sm sm:text-[15px] leading-normal font-semibold uppercase text-slate-800 group-hover:text-sky-800 transition-colors">
                        {item.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
