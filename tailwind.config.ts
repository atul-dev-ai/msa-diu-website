// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // @ts-ignore
  corePlugins: {
    preflight: false, // Ant Design-এর সাথে স্টাইলিং কনফ্লিক্ট এড়াতে এটি false রাখা ভালো
  },
};

export default config;