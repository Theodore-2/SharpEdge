export interface Project {
    id: number;
    name: string;
    key: number;
    followers: number;
    tweets: number;
    lists: number;
    created: string;
    twitter?: string;
    telegram?: string;
    website?: string;
    tags?: string[]; // örneğin ["Solana", "Memecoin"]
    image?: string;
  }
  
  export const dummyProjects: Project[] = [
    {
      id: 1,
      name: "codex_pbc",
      key: 20,
      followers: 1043,
      tweets: 0,
      lists: 8,
      created: "11mo",
      twitter: "https://twitter.com/codexpbc",
      website: "https://codexpbc.com",
      tags: ["Other"],
    },
    {
      id: 2,
      name: "baosonbnb",
      key: 12,
      followers: 1485,
      tweets: 35,
      lists: -1,
      created: "1mo",
      twitter: "https://twitter.com/baosonbnb",
      website: "https://baosonbnb.com",
      tags: ["BSC", "Memecoins"],
    },
    {
      id: 3,
      name: "hyperunit",
      key: 8,
      followers: 800,
      tweets: 10,
      lists: 12,
      created: "1y",
      tags: ["Upgrade Required"],
    },
  ];