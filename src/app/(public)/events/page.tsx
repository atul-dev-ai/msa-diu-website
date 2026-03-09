"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  PictureOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Tag, Spin } from "antd";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";

interface EventType {
  id: number;
  title: string;
  description: string;
  event_date: string;
  cover_image: string;
  location?: string;
}

export default function AllEvents() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        // এখানে কোনো .limit() দেওয়া হয়নি, তাই ডাটাবেসের সব ইভেন্ট চলে আসবে
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: false });

        if (!error && data) setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden">
      {/* 🔹 Background Decor 🔹 */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb & Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-6 bg-white px-4 py-2 rounded-full shadow-2xl shadow-pink-300 border border-slate-200"
          >
            <HomeOutlined className="animate-bounce" /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 bg-gradient-to-b from-indigo-500 to-cyan-400 h-full"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Events & Galleries
              </span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Explore the complete archive of our campus activities, cultural
              programs, and memorable gatherings.
            </p>
          </motion.div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <PictureOutlined className="text-6xl text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 mb-2">
              No Events Found
            </h3>
            <p className="text-slate-500 text-lg">
              Check back later for exciting upcoming events!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => {
              const isUpcoming = dayjs(event.event_date).isAfter(dayjs());
              const statusText = isUpcoming ? "Upcoming" : "Completed";
              const tagColor = isUpcoming ? "cyan" : "green";

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-all duration-500 flex flex-col h-full group"
                >
                  {/* Event Cover Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100 shrink-0">
                    {event.cover_image ? (
                      <Image
                        src={event.cover_image}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PictureOutlined className="text-5xl text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                      <Tag
                        color={tagColor}
                        className="text-sm px-4 py-1.5 rounded-full border-none shadow-md font-bold uppercase tracking-wider"
                      >
                        {statusText}
                      </Tag>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-7 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-4 text-sm text-indigo-600 mb-4 font-bold bg-indigo-50 w-fit px-3 py-1.5 rounded-lg">
                        <CalendarOutlined />
                        {dayjs(event.event_date).format("DD MMMM, YYYY")}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-slate-600 mb-6 line-clamp-3">
                        {event.description}
                      </p>

                      <p className="text-sm text-slate-500 flex items-center gap-2 mb-8 font-medium">
                        <EnvironmentOutlined className="text-slate-400 text-lg" />
                        {event.location || "DIU Smart City, Ashulia"}
                      </p>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="mt-auto block"
                    >
                      <button className="w-full bg-slate-50 text-indigo-600 border border-slate-100 py-3.5 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 flex justify-center items-center gap-2 group/btn">
                        Explore Event{" "}
                        <ArrowRightOutlined className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
