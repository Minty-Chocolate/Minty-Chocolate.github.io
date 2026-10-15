export const site = {
  name: "Minty Chocolate",
  description:
    "Independent explorations in quantitative research, turning idea into code, and code into trade, one step at a time.",
  // Homepage introduction. The lead also supplies the site's metadata description.
  tagline: "Research · Code · Ideas",
  bio: "I enjoy turning interesting questions into experiments, reading papers with a pencil in hand, and building tools that make complex ideas a little clearer. This is a home for my independent work and notes along the way.",
  resume: "/resume",
  resumeHeadline: "Quantitative research · Software engineering",
  interests: "Statistical learning, portfolio construction, reproducible research, and scientific computing.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://minty-chocolate.github.io/personal-website").replace(/\/$/, ""),
  email: "hello@example.com",
  github: "https://github.com/Minty-Chocolate",
  linkedin: "https://www.linkedin.com/in/shaofan-wu/",
};
export const categories = {
  papers: {
    title: "Paper Reviews",
    description:
      "Notes on ideas worth revisiting. A reading journal across statistics, machine learning, and financial research.",
  },
  writing: {
    title: "Personal Writing",
    description:
      "Thoughts on research, software, and learning through the process of making things.",
  },
  projects: {
    title: "Project Repos",
    description:
      "A collection of side projects in quantitative research, built and implemented out of personal interest.",
  },
};
export const disclaimer =
  "Disclaimer: All projects are developed independently of my professional work. No proprietary code, data, or confidential information is shared.";

// Derived from the name so the navigation stays in sync.
export const siteInitials = site.name.trim().split(/\s+/).map((part) => part[0]).join("");
