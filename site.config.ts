export const siteConfig = {
  name: "psychemist",
  headline: "software engineer · future theorist · reality carver",
  location: "lagos, ng",
  description: "Full-stack developer specializing in web dev, blockchain, IoT, and AI/ML. Building innovative applications and exploring the intersection of technology and human cognition.",
  url: "https://psychemist.dev",
  keywords: ["developer", "engineer", "react", "nextjs", "typescript", "javascript", "python", "solidity", "rust", "blockchain", "ai", "machine learning", "zero-knowledge"],
  author: {
    name: "Ikechukwu Obunadike",
    email: "ikeagudike@gmail.com",
    location: "Lagos, Nigeria",
  },
  bioFormal: "software developer and hardware enthusiast. i can learn and build anything.",
  socials: {
    github: "https://github.com/psychemist",
    linkedin: "https://www.linkedin.com/in/chukwu-dike",
    twitter: "https://twitter.com/internetingbot",
    substack: "https://substack.com/@psychemist"
  },
  resumeUrl: "/resume.pdf",
  newsletterProvider: "substack" as const
} as const

// Keep backward compatibility
export const site = siteConfig
