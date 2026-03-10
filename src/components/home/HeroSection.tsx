"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  FormOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";

interface NoticeType {
  id: string | number;
  title: string;
  description: string;
  expirydate: string;
  type: string;
  link: string;
}

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [featuredNotice, setFeaturedNotice] = useState<NoticeType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchActiveNotice = async () => {
      try {
        const currentDate = new Date().toISOString();
        const { data, error } = await supabase
          .from("notices")
          .select("*")
          .gte("expirydate", currentDate)
          .order("created_at", { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          setFeaturedNotice(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch notice", error);
      }
    };

    fetchActiveNotice();
  }, []);

  if (!isClient) return null;

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] flex items-center pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/backbg-2.jpg"
          alt="DIU Campus Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-950/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 ${!featuredNotice ? "justify-center" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`w-full ${featuredNotice ? "lg:w-[55%] xl:w-[50%] text-left" : "w-full max-w-4xl mx-auto text-center"} flex flex-col justify-center space-y-6 md:space-y-8`}
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-200 font-medium text-xs md:text-sm backdrop-blur-md animate-bounce w-fit ${!featuredNotice ? "mx-auto" : ""}`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              Official Platform of MSA-DIU
            </div>

            <h1
              className={`font-extrabold text-white leading-[1.2] tracking-tight ${featuredNotice ? "text-4xl sm:text-5xl lg:text-5xl xl:text-5xl" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"}`}
            >
              Uniting the minds of <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Manikganj at DIU
              </span>
            </h1>

            <p
              className={`text-gray-300 leading-relaxed ${!featuredNotice ? "text-base md:text-lg mx-auto max-w-3xl" : "text-sm md:text-base max-w-xl"}`}
            >
              Empowering students through unity, leadership, and cultural
              heritage. Join our community to build a stronger network and make
              a difference together.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 ${!featuredNotice ? "justify-center" : ""}`}
            >
              <Link href="#events" className="w-full sm:w-auto">
                <button className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-tr from-indigo-400  to-slate-400 hover:from-indigo-500 hover:to-slate-500 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-1.5 hover:scale-105 duration-300">
                  Explore Events <ArrowRightOutlined />
                </button>
              </Link>
              <Link href="#about" className="w-full sm:w-auto">
                <button className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:scale-105 duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>

          <AnimatePresence>
            {featuredNotice && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-[45%] xl:w-[45%] mt-8 lg:mt-0"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span
                      className={`border px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        featuredNotice.type === "Urgent"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : featuredNotice.type === "Event"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                      }`}
                    >
                      <NotificationOutlined /> {featuredNotice.type}
                    </span>
                    <span className="text-gray-300 text-[10px] md:text-xs font-medium flex items-center gap-1">
                      <ClockCircleOutlined /> Ends:{" "}
                      {new Date(featuredNotice.expirydate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
                    {featuredNotice.title}
                  </h3>

                  <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed line-clamp-3">
                    {featuredNotice.description}
                  </p>

                  <button
                    onClick={() => setIsModalVisible(true)}
                    className="w-full py-3.5 rounded-xl bg-white text-indigo-900 font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2 group-hover:gap-4 duration-300 cursor-pointer hover:-translate-y-1.5 hover:scale-105"
                  >
                    View Details <ArrowRightOutlined />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        closeIcon={
          <motion.div
            whileHover={{ rotate: 90, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/40 hover:bg-slate-900/60 border border-white/30 shadow-md backdrop-blur-sm -translate-x-1.5 translate-y-1.5 transition-colors duration-300"
          >
            <CloseOutlined className="text-white text-base" />
          </motion.div>
        }
        centered
        width={600}
        className="notice-modal"
        styles={
          {
            content: { padding: 0, borderRadius: "1.5rem", overflow: "hidden" },
            mask: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(15, 23, 42, 0.6)",
            },
          } as any
        }
      >
        {featuredNotice && (
          <div>
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30`}
                >
                  {featuredNotice.type}
                </span>
                <span className="text-sm font-medium flex items-center gap-1.5 opacity-90">
                  <CalendarOutlined /> Program Date:{" "}
                  {dayjs(featuredNotice.expirydate).format("DD MMMM, YYYY")}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight relative z-10 drop-shadow-md">
                {featuredNotice.title}
              </h2>
            </div>

            <div className="p-8 bg-white">
              <h4 className="text-slate-800 font-bold text-lg mb-3">
                Notice Details
              </h4>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[15px] mb-8">
                {featuredNotice.description}
              </p>

              {featuredNotice.link && featuredNotice.link !== "#" ? (
                <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 text-center">
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Action required for this event:
                  </p>
                  <a
                    href={featuredNotice.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer">
                      <FormOutlined className="text-lg" />
                      {featuredNotice.link.includes("forms")
                        ? "Fill Google Form"
                        : "Click Here to Register / View"}
                    </button>
                  </a>
                </div>
              ) : (
                <div className="text-center pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    No additional links provided for this notice.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default HeroSection;
