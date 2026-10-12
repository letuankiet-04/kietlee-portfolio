import { Project, SkillCategory, ActivityItem, CertificationItem, WorkExperience } from '../types';

export interface OrbitSkillNode {
  name: string;
  category: 'sun' | 'planet' | 'satellite';
  orbitRadius: number;
  speed: number;
  size: number;
  color: string;
  description: {
    vi: string;
    en: string;
  };
}

export const PERSONAL_INFO = {
  name: 'Lê Tuấn Kiệt',
  fullNameEn: 'LE TUAN KIET',
  role: {
    vi: 'Java Backend Developer (Fresher)',
    en: 'Java Backend Developer (Fresher)',
  },
  tagline: {
    vi: 'Xây dựng cỗ máy hiệu năng cao đằng sau giao diện — Nơi mọi request trở thành hệ thống tin cậy.',
    en: 'Building the engine behind the interface — Where requests become reliable systems.',
  },
  taglineOptions: [
    {
      vi: 'Xây dựng cỗ máy hiệu năng cao đằng sau giao diện.',
      en: 'Building the engine behind the interface.',
    },
    {
      vi: 'Nơi mọi request biến thành hệ thống vận hành tin cậy.',
      en: 'Where requests become reliable systems.',
    },
    {
      vi: 'Kiến tạo kiến trúc Java vững chắc trong chiều sâu thế giới số.',
      en: 'Crafting resilient Java architectures inside the backend core.',
    },
  ],
  education: {
    university: 'FPT University HCM',
    major: {
      vi: 'Kỹ thuật Phần mềm (Software Engineering)',
      en: 'Software Engineering',
    },
    period: '09/2023 - 09/2027',
    year: {
      vi: 'Sinh viên năm 4',
      en: 'Senior (4th Year)',
    },
    gpa: '3.4 / 4.0',
    location: 'Long Trường, TP.HCM',
  },
  bio: {
    vi: 'Sinh viên năm 4 ngành Software Engineering tại FPT University HCM (09/2023 - 09/2027, GPA 3.4/4), đam mê phát triển backend, đã có 6 tháng thực tập tại FPT Software và đang tìm vị trí Fresher/Junior Backend Developer.',
    en: '4th-year Software Engineering student at FPT University HCM (09/2023 - 09/2027, GPA 3.4/4), passionate about backend engineering, completed a 6-month internship at FPT Software, actively seeking a Fresher/Junior Backend Developer position.',
  },
  location: 'Long Trường, TP.HCM',
  email: 'lekiet2442005@gmail.com',
  github: 'https://github.com/letuankiet-04',
  status: {
    vi: 'Fresher/Junior Backend Developer (Ex-Intern @ FPT Software)',
    en: 'Fresher/Junior Backend Developer (Ex-Intern @ FPT Software)',
  },
  languages: [
    { name: 'Tiếng Anh (English)', level: 'B2 (VSTEP B1 2024)' },
    { name: 'Tiếng Nhật (Japanese)', level: '~N5' },
  ],
  softSkills: [
    { vi: 'Tư duy phân tích', en: 'Analytical Thinking' },
    { vi: 'Giải quyết vấn đề', en: 'Problem Solving' },
    { vi: 'Làm việc nhóm', en: 'Teamwork & Collaboration' },
    { vi: 'Giao tiếp chủ động', en: 'Proactive Communication' },
  ],
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    period: '04/2026 - 09/2026',
    company: 'FPT Software',
    role: {
      vi: 'Java Backend Intern',
      en: 'Java Backend Intern',
    },
    type: '6 Months Internship',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'RESTful APIs', 'Git'],
    description: {
      vi: [
        'Vị trí: Java Backend Intern tại FPT Software.',
        'Tham gia phát triển và tối ưu các module backend, làm việc với hệ sinh thái Java & Spring Boot trong môi trường dự án thực tế.',
      ],
      en: [
        'Role: Java Backend Intern at FPT Software.',
        'Contributed to backend module development and maintenance within the enterprise Java & Spring Boot ecosystem.',
      ],
    },
    highlightNode: true,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'waste-collection',
    title: 'Crowdsourced Waste Collection & Recycling System',
    period: '01/2026 - 04/2026',
    tagline: {
      vi: 'Hệ thống thu gom & tái chế rác toàn diện với định vị GPS OpenStreetMap và tối ưu bộ đệm Redis',
      en: 'Full-stack Crowdsourced Waste Collection & Recycling System with GPS OpenStreetMap & Redis Caching',
    },
    description: {
      vi: 'Hệ thống thu gom và tái chế rác full-stack với Spring Boot + ReactJS, báo cáo và giám sát theo GPS qua OpenStreetMap.',
      en: 'Full-stack crowdsourced waste collection and recycling platform with Spring Boot + ReactJS, real-time GPS tracking via OpenStreetMap.',
    },
    features: {
      vi: [
        'Thiết kế kiến trúc RESTful API, phân quyền vai trò bảo mật với JWT Auth',
        'Thiết kế chuẩn hóa cơ sở dữ liệu quan hệ MySQL',
        'Triển khai đám mây (Cloud Deployment) trên Render, Railway và Vercel',
        'Kiểm thử và chất lượng code nghiêm ngặt: Mockito (unit test), JMeter (load test), PMD (static analysis)',
        'Tối ưu hóa hiệu năng và độ trễ truy vấn hệ thống bằng Redis caching',
      ],
      en: [
        'Architected RESTful API endpoints and secured role-based access with JWT Auth',
        'Engineered normalized relational MySQL database schemas',
        'Automated cloud deployment across Render, Railway, and Vercel',
        'Enforced strict code quality: Mockito unit testing, JMeter load testing, PMD code inspection',
        'Optimized system throughput and cache performance using Redis',
      ],
    },
    technologies: [
      'Java',
      'Spring Boot',
      'ReactJS',
      'RESTful APIs',
      'JWT Auth',
      'MySQL',
      'Redis',
      'Render',
      'Railway',
      'Vercel',
      'Mockito',
      'JMeter',
      'PMD',
      'Docker',
      'OpenStreetMap',
    ],
    githubBackend: 'https://github.com/letuankiet-04/Crowdsourced-WasteCollection-Recycling-System.git',
    githubFrontend: 'https://github.com/letuankiet-04/Crowdsourced-WasteCollection-Recycling-System-front.git',
    featured: true,
    accent: '#6DB33F', // Spring Green
    architecture: {
      client: 'ReactJS + OpenStreetMap GPS Interface',
      controller: 'WasteReportController, AuthController, RouteController',
      service: 'WasteCollectionService, RoutingService, NotificationService',
      repository: 'ReportRepository, UserRepository, LocationRepository',
      database: 'MySQL Relational Schema (Normalized)',
      cache: 'Redis Layer (Frequent GPS locations & metrics)',
    },
  },
  {
    id: 'property-management',
    title: 'Property Management System',
    period: '01/2026 - 03/2026',
    tagline: {
      vi: 'Web app quản lý, cho thuê và vận hành bất động sản tích hợp xác thực danh tính VNPT eKYC',
      en: 'Property management & rental operations web app integrated with VNPT eKYC verification',
    },
    description: {
      vi: 'Web app dùng Spring Boot + Thymeleaf để quản lý, cho thuê và vận hành bất động sản (nhà trọ, căn hộ, nhà ở).',
      en: 'Web application built with Spring Boot + Thymeleaf to manage, rent, and operate real estate properties (boarding houses, apartments, residences).',
    },
    features: {
      vi: [
        'Tích hợp VNPT eKYC định danh CCCD và xác minh người thuê',
        'Reporting Dashboard trực quan hóa hiệu suất kinh doanh',
        'Quy trình quản lý hợp đồng cho thuê thông minh',
        'Hệ thống tiếp nhận phản hồi (feedback system) khách hàng',
        'Quản lý danh mục bất động sản và trạng thái phòng',
      ],
      en: [
        'Integrated VNPT eKYC for national ID OCR & tenant verification',
        'Visual Reporting Dashboard for property performance',
        'Smart rental lease contract lifecycle management',
        'Customer feedback & support ticketing system',
        'Centralized property catalog & room availability tracking',
      ],
    },
    technologies: [
      'Java',
      'Spring Boot',
      'Thymeleaf',
      'RESTful APIs',
      'MySQL',
      'VNPT eKYC',
      'Postman',
      'Git',
    ],
    github: 'https://github.com/tienDon/property-management-system.git',
    featured: false,
    accent: '#00F0FF', // Cyan
    architecture: {
      client: 'Thymeleaf SSR + Interactive Bootstrap',
      controller: 'PropertyController, ContractController, KycController',
      service: 'PropertyService, ContractService, KycIntegrationService',
      repository: 'PropertyRepository, TenantRepository, ContractRepository',
      database: 'MySQL Database',
    },
  },
  {
    id: 'clothes-ecommerce',
    title: 'Clothes E-commerce',
    period: '06/2025 - 11/2025',
    tagline: {
      vi: 'Website thời trang thương mại điện tử với cấu hình bảo mật JWT và trải nghiệm mua sắm mượt mà',
      en: 'Fashion retail e-commerce platform with robust JWT security configuration',
    },
    description: {
      vi: 'Website bán quần áo: duyệt sản phẩm, đặt hàng, quản lý trải nghiệm mua sắm.',
      en: 'Apparel e-commerce website: product browsing, checkout ordering, and shopping experience management.',
    },
    features: {
      vi: [
        'Xây dựng các thao tác CRUD danh mục sản phẩm, biến thể hàng hóa',
        'Xác thực đăng nhập và bảo mật phân quyền người dùng với Spring Security & JWT',
        'Tính năng danh sách yêu thích (Wishlist) và giỏ hàng tương tác',
        'Quy trình đặt hàng và lưu vết giao dịch',
        'Giao diện người dùng hiện đại dựa trên bản vẽ thiết kế Figma',
      ],
      en: [
        'Full CRUD product catalog & inventory variant handling',
        'Secure user authentication & authorization with JWT filters',
        'Interactive wishlist & cart management flow',
        'Order placement & customer purchase history',
        'Modern responsive UI translated directly from Figma specs',
      ],
    },
    technologies: [
      'Java',
      'Spring Boot',
      'RESTful APIs',
      'MySQL',
      'JWT',
      'HTML',
      'CSS',
      'Git',
      'Figma',
    ],
    github: 'https://github.com/VietTungFizzy/DoAnJava09.git',
    featured: false,
    accent: '#F89820', // Java Orange
    architecture: {
      client: 'HTML5 / Modern CSS / JavaScript',
      controller: 'ProductController, CartController, OrderController, AuthController',
      service: 'ProductService, OrderService, UserService',
      repository: 'ProductRepository, OrderRepository, UserRepository',
      database: 'MySQL Relational Database',
    },
  },
  {
    id: 'personal-3d-portfolio',
    title: 'Personal 3D Portfolio',
    period: '10/2026',
    tagline: {
      vi: 'Website portfolio 3D tương tác kiến trúc số hiệu năng cao với React Three Fiber',
      en: 'Interactive 3D portfolio website featuring high-performance visual universe with React Three Fiber',
    },
    description: {
      vi: 'Website portfolio 3D tương tác, xây dựng bằng React, TypeScript, Three.js (React Three Fiber), GSAP, Tailwind CSS, deploy trên Vercel.',
      en: 'Interactive 3D portfolio website built with React, TypeScript, Three.js (React Three Fiber), GSAP, Tailwind CSS, deployed on Vercel.',
    },
    features: {
      vi: [
        'Giao diện 3D tương tác với React Three Fiber và hiệu ứng ánh sáng bloom shader',
        'Hệ thống quỹ đạo kỹ năng 3D, camera rig mượt mà và animation GSAP',
        'Thiết kế giao diện hiện đại với Tailwind CSS và tối ưu trải nghiệm người dùng',
        'Triển khai liên tục và tối ưu hóa hiệu năng trên nền tảng Vercel',
      ],
      en: [
        'Interactive 3D scene powered by React Three Fiber with bloom shader post-processing',
        'Dynamic 3D skills solar orbit system, responsive camera rig, and GSAP animations',
        'Modern responsive UI crafted with Tailwind CSS and interactive micro-animations',
        'Automated continuous deployment and performance optimization on Vercel',
      ],
    },
    technologies: [
      'React',
      'TypeScript',
      'Three.js',
      'React Three Fiber',
      'GSAP',
      'Tailwind CSS',
      'Vercel',
    ],
    github: 'https://github.com/letuankiet-04/kietlee-portfolio',
    featured: false,
    accent: '#61DAFB', // React Cyan
    architecture: {
      client: 'React 18 + React Three Fiber + Drei 3D Canvas',
      controller: 'Custom Interaction Hooks & Animation Controllers',
      service: 'Client State Management (AppContext) & Lenis Smooth Scroll',
      repository: 'Static Portfolio Data Store (TypeScript Module)',
      database: 'Edge Static Assets (Vercel CDN Edge Network)',
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: 'languages',
    label: { vi: 'Ngôn ngữ', en: 'Language' },
    skills: [
      { name: 'Java', level: 92, highlight: true },
      { name: 'TypeScript', level: 85, highlight: true },
      { name: 'JavaScript', level: 80, highlight: false },
      { name: 'C', level: 75, highlight: false },
      { name: 'HTML', level: 85, highlight: false },
      { name: 'CSS', level: 85, highlight: false },
    ],
  },
  {
    key: 'backend',
    label: { vi: 'Backend', en: 'Backend' },
    skills: [
      { name: 'Spring Boot', level: 92, highlight: true },
      { name: 'RESTful APIs', level: 90, highlight: true },
      { name: 'JWT Auth', level: 88, highlight: true },
      { name: 'Redis (Caching)', level: 82, highlight: true },
    ],
  },
  {
    key: 'database',
    label: { vi: 'Cơ sở dữ liệu', en: 'Database' },
    skills: [
      { name: 'MySQL', level: 88, highlight: true },
      { name: 'MongoDB', level: 82, highlight: true },
      { name: 'SQL Server', level: 80, highlight: false },
    ],
  },
  {
    key: 'frontend',
    label: { vi: 'Frontend', en: 'Frontend' },
    skills: [
      { name: 'ReactJS', level: 85, highlight: true },
      { name: 'TypeScript', level: 85, highlight: true },
    ],
  },
  {
    key: 'tools',
    label: { vi: 'Công cụ', en: 'Tools' },
    skills: [
      { name: 'Git', level: 90, highlight: false },
      { name: 'GitHub', level: 90, highlight: false },
      { name: 'Docker', level: 82, highlight: true },
      { name: 'Postman', level: 90, highlight: false },
      { name: 'JMeter', level: 80, highlight: true },
      { name: 'Mockito', level: 82, highlight: true },
      { name: 'PMD', level: 80, highlight: false },
      { name: 'Jira', level: 80, highlight: false },
      { name: 'Figma', level: 75, highlight: false },
    ],
  },
  {
    key: 'deployment',
    label: { vi: 'Triển khai', en: 'Deployment' },
    skills: [
      { name: 'Render', level: 85, highlight: false },
      { name: 'Railway', level: 85, highlight: false },
      { name: 'Vercel', level: 85, highlight: false },
    ],
  },
];

export const ORBIT_SKILLS: OrbitSkillNode[] = [
  {
    name: 'Java',
    category: 'sun',
    orbitRadius: 0.6,
    speed: 0.25,
    size: 0.95,
    color: '#F89820', // Java Sun Core
    description: {
      vi: 'Ngôn ngữ Backend chính (OOP, Đa luồng, Tối ưu cấu trúc)',
      en: 'Core Backend Language (OOP, Multithreading & Performance)',
    },
  },
  {
    name: 'Spring Boot',
    category: 'sun',
    orbitRadius: 0.65,
    speed: -0.28,
    size: 0.9,
    color: '#6DB33F', // Spring Boot Core
    description: {
      vi: 'Framework Backend doanh nghiệp (RESTful API, Security, JPA)',
      en: 'Enterprise Backend Framework (RESTful APIs, Security, JPA)',
    },
  },
  {
    name: 'MySQL',
    category: 'planet',
    orbitRadius: 2.8,
    speed: 0.45,
    size: 0.62,
    color: '#00758F', // MySQL Planet
    description: {
      vi: 'Hệ quản trị CSDL quan hệ (RDBMS, Thiết kế Schema chuẩn hóa)',
      en: 'Relational Database Management System (RDBMS, Schema Design)',
    },
  },
  {
    name: 'MongoDB',
    category: 'planet',
    orbitRadius: 3.4,
    speed: 0.38,
    size: 0.6,
    color: '#47A248', // MongoDB Dark Green
    description: {
      vi: 'NoSQL Database',
      en: 'NoSQL Database',
    },
  },
  {
    name: 'ReactJS',
    category: 'satellite',
    orbitRadius: 4.6,
    speed: 0.6,
    size: 0.42,
    color: '#61DAFB', // React Cyan
    description: {
      vi: 'Thư viện UI Frontend tương tác & Single Page Application',
      en: 'Interactive Frontend UI Library & Single Page Applications',
    },
  },
  {
    name: 'TypeScript',
    category: 'satellite',
    orbitRadius: 5.2,
    speed: 0.52,
    size: 0.4,
    color: '#3178C6', // TypeScript Blue
    description: {
      vi: 'Ngôn ngữ định kiểu tĩnh tăng cường cho Frontend & Fullstack',
      en: 'Strictly Typed Superset of JavaScript for Robust Apps',
    },
  },
];

export const ACTIVITIES: ActivityItem[] = [
  {
    period: '01/2026',
    title: {
      vi: 'Big OpenDay — FPT University',
      en: 'Big OpenDay — FPT University',
    },
    role: {
      vi: 'Event Organizer',
      en: 'Event Organizer',
    },
    organization: 'FPT University Ho Chi Minh City',
    description: {
      vi: 'Hướng dẫn nhóm học sinh và giới thiệu chương trình học, cơ hội nghề nghiệp.',
      en: 'Guided student groups and introduced the academic curriculum and tech career opportunities.',
    },
    highlight: 'FPT Big OpenDay 2026',
  },
  {
    period: '01/2025 - 04/2025',
    title: {
      vi: 'Children’s Smile',
      en: 'Children’s Smile',
    },
    role: {
      vi: 'Leader',
      en: 'Leader',
    },
    organization: 'Chùa Kỳ Quang',
    description: {
      vi: 'Dẫn dắt dự án thiện nguyện, điều phối giữa trẻ em mồ côi chùa Kỳ Quang, nhà tài trợ và tình nguyện viên.',
      en: 'Led the charity project, coordinating between orphaned children at Ky Quang Pagoda, sponsors, and volunteers.',
    },
    highlight: 'Leader — Ky Quang Orphanage Support',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'User Experience Research and Design',
    issuer: 'University of Michigan',
    issueDate: '01/2026',
    badgeType: 'design',
  },
  {
    title: 'Java Developer with Java, Spring Boot & Spring Framework',
    issuer: 'IBM',
    issueDate: '10/2025',
    badgeType: 'spring',
  },
  {
    title: 'Software Development Lifecycle',
    issuer: 'University of Minnesota',
    issueDate: '09/2025',
    badgeType: 'architecture',
  },
  {
    title: 'Java Programming and Software Engineering Fundamentals',
    issuer: 'Duke University',
    issueDate: '06/2025',
    badgeType: 'java',
  },
  {
    title: 'Web Design for Everybody',
    issuer: 'University of Michigan',
    issueDate: '05/2025',
    badgeType: 'design',
  },
  {
    title: 'Academic Skills for University Success',
    issuer: 'University of Sydney',
    issueDate: '05/2024',
    badgeType: 'general',
  },
  {
    title: 'VSTEP B1',
    issuer: 'Bộ GD&ĐT',
    issueDate: '2024',
    badgeType: 'general',
  },
];
