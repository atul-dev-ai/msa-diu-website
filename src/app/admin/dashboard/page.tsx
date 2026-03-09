"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  NotificationOutlined,
  CalendarOutlined,
  TeamOutlined,
  DatabaseOutlined,
  PlusOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { supabase } from "@/lib/supabase";
import { Spin } from "antd";

export default function DashboardOverview() {
  const [stats, setStats] = useState({ notices: 0, events: 0, committee: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Supabase থেকে শুধুমাত্র কাউন্ট (Count) নিয়ে আসা হচ্ছে (ডেটা লোড না করে)
        const { count: noticeCount } = await supabase
          .from("notices")
          .select("*", { count: "exact", head: true });
        const { count: eventCount } = await supabase
          .from("events")
          .select("*", { count: "exact", head: true });
        const { count: committeeCount } = await supabase
          .from("committee")
          .select("*", { count: "exact", head: true });

        setStats({
          notices: noticeCount || 0,
          events: eventCount || 0,
          committee: committeeCount || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  // স্ট্যাটিস্টিকস কার্ডের ডেটা
  const statCards = [
    {
      title: "Total Notices",
      count: stats.notices,
      icon: <NotificationOutlined />,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: "Total Events",
      count: stats.events,
      icon: <CalendarOutlined />,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      title: "Committee Members",
      count: stats.committee,
      icon: <TeamOutlined />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Database Status",
      count: "Active",
      icon: <DatabaseOutlined />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* 🔹 Header Section 🔹 */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
            Dashboard{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Overview
            </span>
          </h1>
          <p className="text-slate-500 text-lg">
            Welcome back to the MSA-DIU Admin Portal. Here are your live
            database statistics.
          </p>
        </div>
      </div>

      {/* 🔹 Live Statistics Grid 🔹 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Hover Gradient Line */}
            <div
              className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>

            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${stat.bgColor} ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
            </div>

            <h3 className="text-slate-500 font-semibold mb-1">{stat.title}</h3>
            <div className="text-3xl font-black text-slate-800">
              {stat.count}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Quick Actions Section 🔹 */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          ⚡ Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/admin/dashboard/notices">
            <div className="group flex items-center justify-between bg-indigo-50/50 hover:bg-indigo-600 p-5 rounded-2xl border border-indigo-100 transition-colors duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 group-hover:text-indigo-600 shadow-sm">
                  <PlusOutlined />
                </div>
                <span className="font-bold text-indigo-700 group-hover:text-white transition-colors">
                  Post New Notice
                </span>
              </div>
              <ArrowRightOutlined className="text-indigo-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </div>
          </Link>

          <Link href="/admin/dashboard/events">
            <div className="group flex items-center justify-between bg-cyan-50/50 hover:bg-cyan-600 p-5 rounded-2xl border border-cyan-100 transition-colors duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-cyan-600 group-hover:text-cyan-600 shadow-sm">
                  <PlusOutlined />
                </div>
                <span className="font-bold text-cyan-700 group-hover:text-white transition-colors">
                  Add New Event
                </span>
              </div>
              <ArrowRightOutlined className="text-cyan-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </div>
          </Link>

          <Link href="/admin/dashboard/committee">
            <div className="group flex items-center justify-between bg-purple-50/50 hover:bg-purple-600 p-5 rounded-2xl border border-purple-100 transition-colors duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 group-hover:text-purple-600 shadow-sm">
                  <PlusOutlined />
                </div>
                <span className="font-bold text-purple-700 group-hover:text-white transition-colors">
                  Manage Committee
                </span>
              </div>
              <ArrowRightOutlined className="text-purple-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
