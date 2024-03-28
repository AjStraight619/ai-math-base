export const features = [
  {
    name: "GPT-4 Integration",
    description:
      "We have integrated the latest GPT-4 model to provide the best experience for our users.",
    icon: "",
    bgImage: "",
  },
  {
    name: "Wolfram Alpha Integration",
    description:
      "We have integrated the computational prowess of Wolfram Alpha to provide the best experience for our users.",
    icon: "",
    bgImage: "",
  },
  {
    name: "Text Editor",
    description:
      "We have integrated a text editor to provide the best experience for our users.",
    icon: "",
    bgImage: "",
  },
  {
    name: "Import and Export",
    description:
      "We have integrated import and export features to provide the best experience for our users.",
    icon: "",
    bgImage: "",
  },
] as const;

export const navLinks = [
  {
    name: "Home",
    hash: "#home",
  },

  {
    name: "Features",
    hash: "#features",
  },
  {
    name: "FAQ",
    hash: "#faq",
  },
];

export const liVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export const ulVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const sidebarPresenceVariants = {
  sidebarClosed: {
    x: 0,
    transition: { duration: 0.3 },
  },
  sidebarOpen: {
    x: "8rem",
    transition: { duration: 0.3 },
  },
};
