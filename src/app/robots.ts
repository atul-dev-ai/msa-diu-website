import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/private/"], // অ্যাডমিন প্যানেল বা প্রাইভেট রাউটগুলো সার্চ ইঞ্জিন থেকে হাইড করা হলো
    },
    sitemap: "https://msa-diu-website.vercel.app/sitemap.xml",
  };
}
