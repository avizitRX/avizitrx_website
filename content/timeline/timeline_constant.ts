export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  details?: string[];
  tags?: string[];
  category: "personal" | "education" | "tech" | "career";
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2010",
    title: "The Spark",
    description:
      "First interaction with computers, beginning a lifelong curiosity with technology.",
    category: "personal",
    tags: ["Early Curiosity"],
  },
  {
    year: "2012",
    title: "First Web Page & First PC",
    description:
      "Built my first webpage using Wapka.mobi. Got my first PC and spent months exploring games like GTA Vice City.",
    category: "tech",
    tags: ["Wapka.mobi", "Gaming"],
  },
  {
    year: "2013",
    title: "Open Source Discovery",
    description:
      "Installed Ubuntu 13.04, my first Linux experience. Started learning Visual Basic, my first programming language.",
    category: "tech",
    tags: ["Ubuntu", "Visual Basic", "Linux"],
  },
  {
    year: "2015",
    title: "Hackintosh Success",
    description:
      "Successfully installed my first Hackintosh system, pushing the boundaries of hardware compatibility.",
    category: "tech",
    tags: ["Hackintosh", "Hardware"],
  },
  {
    year: "2016",
    title: "System Modification",
    description:
      "Rooted a Nokia XL, stepping into system-level modification and Android internals.",
    category: "tech",
    tags: ["Android", "Rooting", "Nokia XL"],
  },
  {
    year: "2017",
    title: "Connectivity & CMS",
    description:
      "Got my first broadband connection. Explored WordPress, Blogger and Wix, learning web ecosystems.",
    category: "tech",
    tags: ["WordPress", "Blogger", "CMS"],
  },
  {
    year: "2018",
    title: "Deep Dive: Linux & Security",
    description:
      "Switched to Linux as primary OS. Started learning penetration testing and cybersecurity tools.",
    category: "tech",
    tags: ["Cybersecurity", "Penetration Testing", "Security"],
  },
  {
    year: "2019",
    title: "Digital Marketing & SEO",
    description:
      "Learned SEO and digital marketing, bridging tech and content strategies.",
    category: "career",
    tags: ["SEO", "Growth"],
  },
  {
    year: "2021",
    title: "Academic Journey",
    description: "Started university journey in Computer Science.",
    category: "education",
    tags: ["University", "CS"],
  },
  {
    year: "2022",
    title: "Strengthening Foundations",
    description:
      "Formally learned Data Structures & Algorithms (DSA), strengthening core CS foundations.",
    category: "education",
    tags: ["DSA", "CS Fundamentals"],
  },
  {
    year: "2023",
    title: "Mobile Architecture",
    description:
      "Started learning Flutter and built multiple mobile app projects.",
    category: "tech",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    year: "2024",
    title: "AI Specialization & Thesis",
    description:
      "Learned AI/ML and completed thesis on '3D Bee Trajectory Generation and Analysis'.",
    category: "education",
    tags: ["AI", "ML", "Thesis", "Python"],
  },
  {
    year: "2025",
    title: "Research Horizon",
    description:
      "Started writing research papers in Machine Learning and related fields.",
    category: "career",
    tags: ["Research", "ML Writing"],
  },
];
