"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NotificationOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  BellOutlined,
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
  created_at: string;
}

const NoticeBoard = () => {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeType | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const currentDate = new Date().toISOString();
        const { data, error } = await supabase
          .from("notices")
          .select("*")
          .gte("expirydate", currentDate)
          .order("created_at", { ascending: false });

        if (data) setNotices(data);
      } catch (error) {
        console.error("Failed to fetch notices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Modal Open Function
  const handleReadMore = (notice: NoticeType) => {
    setSelectedNotice(notice);
    setIsModalVisible(true);
  };

  if (loading) return null;

  return (
    <section
      id="notice"
      className="py-24 relative border-b border-indigo-100 overflow-hidden bg-gradient-to-b from-slate-50 to-indigo-50/30"
    >
      {/* 🔹 Bluish Tune Background Elements 🔹 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex animate-bounce items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-600 font-bold text-sm mb-5 shadow-sm"
            >
              <NotificationOutlined className="text-lg animate-pulse [animation-delay:0.5s]" />{" "}
              Official Updates
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Notice{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Board
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl">
              Stay updated with the latest announcements, upcoming events, and
              urgent official notices from MSA-DIU.
            </p>
          </div>
        </div>

        {/* Notices Container */}
        <div className="min-h-[400px]">
          {notices.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative flex flex-col items-center justify-center min-h-[400px] bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white overflow-hidden group shadow-xl shadow-indigo-100/50"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="z-10 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)] mb-6 border border-indigo-50">
                  <BellOutlined className="text-4xl text-indigo-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 mb-3 drop-shadow-sm">
                  No New Notices
                </h3>
                <p className="text-slate-500 font-medium text-lg text-center max-w-md">
                  We are all caught up! Any upcoming events or urgent updates
                  will appear right here.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            // Notices Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white/80 backdrop-blur-lg rounded-[2rem] p-7 border border-white shadow-xl shadow-indigo-100/40 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] hover:border-indigo-200 transition-all duration-500 group flex flex-col justify-between h-full relative overflow-hidden z-10"
                >
                  {/* Hover Glow Inside Card */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  {/* Top Glowing Border */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          notice.type === "Urgent"
                            ? "bg-red-50 text-red-600 border-red-200"
                            : notice.type === "Event"
                              ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        {notice.type}
                      </span>
                      {/* 🔹 Event Date explicitly shown here 🔹 */}
                      <span className="text-[11px] text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <CalendarOutlined className="text-indigo-500" /> Date:{" "}
                        {dayjs(notice.expirydate).format("DD MMM, YYYY")}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-snug">
                      {notice.title}
                    </h3>

                    <p className="text-sm text-slate-500 line-clamp-3 mb-8 leading-relaxed">
                      {notice.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReadMore(notice)}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-indigo-50/50 text-indigo-600 font-bold text-sm py-3.5 rounded-xl border border-indigo-100 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"
                  >
                    Read More{" "}
                    <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
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
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 border border-white/30 shadow-md backdrop-blur-sm -translate-x-1.5 translate-y-1.5 transition-colors duration-300"
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
        {selectedNotice && (
          <div>
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30`}
                >
                  {selectedNotice.type}
                </span>
                <span className="text-sm font-medium flex items-center gap-1.5 opacity-90">
                  <CalendarOutlined /> Program Date:{" "}
                  {dayjs(selectedNotice.expirydate).format("DD MMMM, YYYY")}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight relative z-10 drop-shadow-md">
                {selectedNotice.title}
              </h2>
            </div>

            <div className="p-8 bg-white">
              <h4 className="text-slate-800 font-bold text-lg mb-3">
                Notice Details
              </h4>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[15px] mb-8">
                {selectedNotice.description}
              </p>

              {selectedNotice.link && selectedNotice.link !== "#" ? (
                <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 text-center">
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Action required for this event:
                  </p>
                  <a
                    href={selectedNotice.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 mx-auto">
                      <FormOutlined className="text-lg" />
                      {selectedNotice.link.includes("forms")
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

export default NoticeBoard;
