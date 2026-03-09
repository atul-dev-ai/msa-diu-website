import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // 👈 অ্যাডমিন প্যানেল গুগলে ইনডেক্স হবে না (সিকিউরিটি)
    },
    sitemap: "https://msa-diu-website.vercel.app/sitemap.xml",
  };
}
