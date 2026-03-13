/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // ওয়েবসাইটের সব রাউটের জন্য এই হেডারগুলো কাজ করবে
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // ক্লিকজ্যাকিং (Clickjacking) হ্যাকিং থেকে বাঁচাবে
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // ব্রাউজারকে ভুল ফাইল রান করা থেকে আটকাবে
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // অন্য সাইটে যাওয়ার সময় ইউজারের ডেটা লিক হওয়া ঠেকাবে
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload", // সব সময় HTTPS এ সাইট লোড করতে বাধ্য করবে
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;", // ক্রস-সাইট স্ক্রিপ্টিং (XSS) অ্যাটাক থেকে রক্ষা করবে
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-supabase-project-id.supabase.co", // 👈 আপনার Supabase এর আসল ডোমেইন দিন
        port: "",
        pathname: "/storage/v1/object/public/**", // 👈 Supabase স্টোরেজের পাথ
      },
      // যদি অন্য কোনো সাইট থেকে ইমেজ আসে, তাহলে সেগুলোও এখানে অ্যাড করতে হবে
    ],
  },
};

export default nextConfig;
