export type SearchItemType = "page" | "section" | "feature" | "contact";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  type: SearchItemType;
  keywords: string[];
}

export interface GroupedSearchResults {
  page: SearchItem[];
  section: SearchItem[];
  feature: SearchItem[];
  contact: SearchItem[];
}

export const searchData: SearchItem[] = [
  {
    id: "page-home",
    title: "Trang chủ | Home",
    description:
      "Trang tổng quan CEC Center: giới thiệu, đối tác, dự án, cơ cấu tổ chức.",
    href: "/",
    type: "page",
    keywords: [
      "trang chu",
      "home",
      "cec",
      "cec center",
      "gioi thieu",
      "tong quan",
    ],
  },
  {
    id: "page-services",
    title: "Lĩnh vực hoạt động | Services",
    description:
      "Danh sách các dịch vụ tư vấn, kiểm định, thí nghiệm và giám sát.",
    href: "/services",
    type: "page",
    keywords: [
      "linh vuc",
      "services",
      "dich vu",
      "kiem dinh",
      "thi nghiem",
      "tu van",
    ],
  },
  {
    id: "page-structure",
    title: "Dự án / Cơ cấu tổ chức | Projects / Structure",
    description:
      "Thông tin cơ cấu tổ chức, phương hướng hoạt động và dự án tiêu biểu.",
    href: "/structure",
    type: "page",
    keywords: [
      "du an",
      "co cau",
      "structure",
      "projects",
      "to chuc",
      "phuong huong",
    ],
  },
  {
    id: "page-team",
    title: "Nhân lực | Team",
    description:
      "Đội ngũ chuyên gia kỹ thuật, kỹ sư, thạc sỹ và cộng tác viên nghiên cứu.",
    href: "/team",
    type: "page",
    keywords: [
      "nhan luc",
      "team",
      "chuyen gia",
      "ky su",
      "thac sy",
      "research",
    ],
  },
  {
    id: "page-recruitment",
    title: "Tuyển dụng | Recruitment",
    description: "Thông tin tuyển dụng và tài liệu tuyển dụng của CEC Center.",
    href: "/recruitment",
    type: "page",
    keywords: ["tuyen dung", "recruitment", "viec lam", "career", "job"],
  },
  {
    id: "page-contact",
    title: "Liên hệ | Contact",
    description:
      "Biểu mẫu liên hệ, thông tin địa chỉ, điện thoại, email và bản đồ.",
    href: "/contact",
    type: "page",
    keywords: [
      "lien he",
      "contact",
      "dia chi",
      "email",
      "so dien thoai",
      "map",
    ],
  },
  {
    id: "page-lab-capacity-disclosure",
    title: "Công bố NLHĐ thí nghiệm | Lab Capacity Disclosure",
    description:
      "Hồ sơ công bố năng lực hoạt động thí nghiệm và danh mục tài liệu liên quan.",
    href: "/cong-bo-nlhd-thi-nghiem",
    type: "page",
    keywords: [
      "cong bo",
      "nlhd thi nghiem",
      "ho so cong bo",
      "nang luc hoat dong thi nghiem",
      "iso 17025",
      "lab capacity disclosure",
    ],
  },

  {
    id: "about-center",
    title: "Giới thiệu trung tâm",
    description: "Trung tâm Tư vấn Kiểm định Kỹ thuật Công trình (CEC Center).",
    href: "/#about",
    type: "section",
    keywords: ["gioi thieu", "about", "cec center", "trung tam", "las xd 449"],
  },
  {
    id: "partners-strategic",
    title: "Đối tác chiến lược",
    description: "Danh sách khách hàng và đối tác chiến lược của CEC Center.",
    href: "/#partners",
    type: "section",
    keywords: [
      "doi tac",
      "khach hang",
      "partners",
      "clients",
      "solar cons",
      "319",
      "ideco",
    ],
  },
  {
    id: "projects-featured",
    title: "Dự án tiêu biểu",
    description:
      "Các dự án nổi bật: Vành đai 3, An Phú, bệnh viện 175, Biên Hòa - Vũng Tàu.",
    href: "/#projects",
    type: "section",
    keywords: [
      "du an tieu bieu",
      "featured projects",
      "vanh dai 3",
      "an phu",
      "benh vien 175",
      "bien hoa",
    ],
  },
  {
    id: "organization-chart",
    title: "Sơ đồ tổ chức trung tâm",
    description: "Sơ đồ cơ cấu tổ chức và các phòng ban chuyên môn.",
    href: "/#organization-chart",
    type: "section",
    keywords: ["so do to chuc", "organization chart", "phong ban", "co cau"],
  },

  {
    id: "service-research",
    title: "Nghiên cứu khoa học",
    description:
      "Nghiên cứu và triển khai ứng dụng công nghệ vật liệu xây dựng.",
    href: "/services",
    type: "feature",
    keywords: [
      "nghien cuu",
      "khoa hoc",
      "scientific research",
      "vat lieu xay dung",
    ],
  },
  {
    id: "service-transfer",
    title: "Sản xuất thử & chuyển giao công nghệ",
    description: "Thử nghiệm và chuyển giao công nghệ theo lĩnh vực đăng ký.",
    href: "/services",
    type: "feature",
    keywords: [
      "san xuat thu",
      "chuyen giao",
      "technology transfer",
      "thu nghiem",
    ],
  },
  {
    id: "service-survey",
    title: "Khảo sát địa chất",
    description: "Khảo sát địa chất công trình, địa chất thủy văn, địa hình.",
    href: "/services",
    type: "feature",
    keywords: ["khao sat", "dia chat", "hydrogeology", "topography"],
  },
  {
    id: "service-design",
    title: "Tư vấn thiết kế",
    description:
      "Tư vấn và thẩm tra thiết kế công trình giao thông, dân dụng, hạ tầng.",
    href: "/services",
    type: "feature",
    keywords: [
      "tu van thiet ke",
      "design consulting",
      "tham tra",
      "kien truc",
      "dan dung",
    ],
  },
  {
    id: "service-supervision",
    title: "Tư vấn giám sát",
    description:
      "Giám sát chất lượng công trình giao thông, hạ tầng và dân dụng.",
    href: "/services",
    type: "feature",
    keywords: ["tu van giam sat", "supervision", "chat luong cong trinh"],
  },
  {
    id: "service-testing",
    title: "Thí nghiệm & kiểm định",
    description:
      "Thí nghiệm, kiểm định, giám định chất lượng vật liệu và công trình.",
    href: "/services",
    type: "feature",
    keywords: ["thi nghiem", "kiem dinh", "testing", "inspection", "giam dinh"],
  },
  {
    id: "service-training",
    title: "Thông tin KH&CN và huấn luyện",
    description: "Thông tin khoa học công nghệ và bồi dưỡng chuyên môn.",
    href: "/services",
    type: "feature",
    keywords: ["huan luyen", "boi duong", "thong tin khcn", "training"],
  },
  {
    id: "service-cooperation",
    title: "Hợp tác quốc tế",
    description: "Hợp tác trong nước, ngoài nước và quốc tế theo Luật định.",
    href: "/services",
    type: "feature",
    keywords: ["hop tac", "quoc te", "international cooperation", "doi tac"],
  },

  {
    id: "structure-departments",
    title: "Các phòng ban",
    description:
      "Ban Giám đốc, phòng thí nghiệm, phòng khảo sát, phòng tư vấn giám sát - thiết kế.",
    href: "/structure",
    type: "section",
    keywords: [
      "phong ban",
      "ban giam doc",
      "phong thi nghiem",
      "phong khao sat",
      "phong tu van",
    ],
  },
  {
    id: "cert-las",
    title: "LAS-XD 449",
    description: "Mã số phòng thí nghiệm chuyên ngành xây dựng LAS-XD 449.",
    href: "/structure",
    type: "feature",
    keywords: ["las", "las xd 449", "phong thi nghiem", "lab code"],
  },
  {
    id: "cert-iso",
    title: "ISO/IEC 17025:2017",
    description:
      "Hệ thống quản lý phòng thí nghiệm theo TCVN ISO/IEC 17025:2017.",
    href: "/structure",
    type: "feature",
    keywords: ["iso", "iso iec 17025", "17025", "tieu chuan", "chung nhan"],
  },
  {
    id: "cert-capacity",
    title: "Chứng chỉ năng lực HCM-00027788",
    description:
      "Chứng chỉ năng lực hoạt động xây dựng do Sở Xây dựng TP.HCM cấp.",
    href: "/structure",
    type: "feature",
    keywords: [
      "hcm 00027788",
      "chung chi nang luc",
      "so xay dung",
      "nang luc hoat dong",
    ],
  },

  {
    id: "team-levels",
    title: "Nhân sự chuyên môn",
    description:
      "Công nhân kỹ thuật, cao đẳng, kỹ sư, thạc sỹ và cộng tác viên nghiên cứu.",
    href: "/team",
    type: "section",
    keywords: [
      "cong nhan",
      "cao dang",
      "ky su",
      "thac sy",
      "cong tac vien",
      "research collaborator",
    ],
  },

  {
    id: "contact-address",
    title: "Địa chỉ CEC Center",
    description: "302 Gò Dưa, Phường Tam Bình, TP. Hồ Chí Minh.",
    href: "/contact",
    type: "contact",
    keywords: ["302 go dua", "tam binh", "ho chi minh", "dia chi", "address"],
  },
  {
    id: "contact-phone",
    title: "Số điện thoại liên hệ",
    description: "0907 463 219",
    href: "/contact",
    type: "contact",
    keywords: ["0907463219", "0907 463 219", "dien thoai", "phone", "hotline"],
  },
  {
    id: "contact-email",
    title: "Email liên hệ",
    description: "ceccenter302@gmail.com",
    href: "/contact",
    type: "contact",
    keywords: ["ceccenter302@gmail.com", "gmail", "mail", "email"],
  },
  {
    id: "contact-map",
    title: "Bản đồ vị trí",
    description: "Google Maps vị trí trụ sở CEC Center.",
    href: "/contact",
    type: "contact",
    keywords: ["ban do", "google map", "vi tri", "location", "map"],
  },

  {
    id: "recruitment-info",
    title: "Thông tin tuyển dụng",
    description:
      "Trang tuyển dụng với 2 ảnh thông tin công việc hiển thị song song.",
    href: "/recruitment",
    type: "section",
    keywords: [
      "thong tin tuyen dung",
      "viec lam",
      "recruitment page",
      "career page",
      "page 1",
      "page 2",
    ],
  },
];

export const groupSearchResults = (
  results: SearchItem[],
): GroupedSearchResults => {
  return results.reduce(
    (acc, item) => {
      acc[item.type].push(item);
      return acc;
    },
    {
      page: [],
      section: [],
      feature: [],
      contact: [],
    } as GroupedSearchResults,
  );
};
