"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!params?.id) return;

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) setEvent(data);
      setLoading(false);
    };

    fetchEventDetails();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-indigo-600 font-medium cursor-pointer"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔹 Back Button 🔹 */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 cursor-pointer text-slate-500 hover:text-indigo-600 transition-all font-medium bg-white px-4 py-2 rounded-full shadow-2xl border hover:border-slate-300 hover:shadow-purple-500 border-slate-200 shadow-purple-300 duration-300 hover:-translate-y-0.5 hover:scale-105"
        >
          <ArrowLeftOutlined /> Go Back
        </button>

        {/* 🔹 Event Hero Section 🔹 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 mb-12"
        >
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 bg-slate-100">
            {event.cover_image ? (
              <Image
                src={event.cover_image}
                alt={event.title}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PictureOutlined className="text-5xl text-slate-300" />
              </div>
            )}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white flex items-center gap-2">
              <CalendarOutlined className="text-indigo-600" />
              <span className="font-bold text-slate-800">
                {dayjs(event.event_date).format("DD MMMM, YYYY")}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {event.title}
          </h1>

          <div className="prose prose-lg prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed">
            {event.description}
          </div>
        </motion.div>

        {/* 🔹 Event Gallery Section 🔹 */}
        {event.gallery_images && event.gallery_images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <PictureOutlined className="text-indigo-600" /> Event Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {event.gallery_images.map((imgUrl: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-md group border border-slate-100 cursor-pointer"
                >
                  <Image
                    src={imgUrl}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
