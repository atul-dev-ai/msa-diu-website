"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";

// ডাটাবেসের নতুন ইভেন্ট টাইপ
interface EventType {
  id: number;
  title: string;
  description: string;
  event_date: string;
  cover_image: string;
  location?: string; // ডাটাবেসে থাকলে আসবে, না থাকলে ডিফল্ট দেখাবে
}

const EventsSection = () => {
  const sectionRef = useRef(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে ইভেন্ট ফেচ করা
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: false })
          .limit(6); // হোম পেজে লেটেস্ট ৬টি ইভেন্ট দেখাবো

        if (data) setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // GSAP Scroll Animation
  useEffect(() => {
    if (events.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [events]);

  if (loading) return null;

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Featured <span className="text-indigo-600">Events</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl">
              Catch up on the latest activities, galleries, and upcoming
              programs organized by MSA-DIU.
            </p>
          </div>

          {/* Desktop View All Button */}
          {events.length > 0 && (
            <Link href="/events" className="hidden md:flex">
              <button className="flex items-center gap-2 cursor-pointer  font-semibold ransition-colors hover:border py-2 px-5 hover:rounded-full hover:border-purple-300 hover:shadow-purple-300 hover:shadow-md hover:-translate-y-0.5 hover:scale-110 duration-300 transition-all rounded-full">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-purple-500 hover:to-pink-500 text-transparent">
                  {" "}
                  View All Events{" "}
                </span>{" "}
                <ArrowRightOutlined />
              </button>
            </Link>
          )}
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100">
            <p className="text-slate-500 font-medium text-lg">
              No events to show at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              // তারিখ অনুযায়ী অটোমেটিক স্ট্যাটাস এবং কালার সেট করা
              const isUpcoming = dayjs(event.event_date).isAfter(dayjs());
              const statusText = isUpcoming ? "Upcoming" : "Completed";
              const tagColor = isUpcoming ? "cyan" : "green";

              return (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="event-card bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
                >
                  {/* Event Cover Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-200 shrink-0">
                    {event.cover_image ? (
                      <Image
                        src={event.cover_image}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                      <Tag
                        color={tagColor}
                        className="text-sm px-3 py-1 rounded-full border-none shadow-sm font-bold uppercase tracking-wider"
                      >
                        {statusText}
                      </Tag>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3 font-medium">
                        <span className="flex items-center gap-1.5">
                          <CalendarOutlined className="text-indigo-500" />{" "}
                          {dayjs(event.event_date).format("DD MMM, YYYY")}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">
                        {event.title}
                      </h3>

                      <p className="text-sm text-slate-600 flex items-start gap-1.5 mb-5 line-clamp-1">
                        <EnvironmentOutlined className="text-slate-400 mt-1 shrink-0" />
                        <span>
                          {event.location || "DIU Smart City, Ashulia"}
                        </span>
                      </p>
                    </div>

                    {/* 🔹 View Details & Gallery Button 🔹 */}
                    <Link href={`/events/${event.id}`} className="mt-auto">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-white text-indigo-600 border cursor-pointer border-indigo-200 py-3 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition-all flex justify-center items-center gap-2 group"
                      >
                        Details & Gallery{" "}
                        <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Mobile View All Button */}
        {events.length > 0 && (
          <div className="mt-10 text-center md:hidden">
            <Link href="/events">
              <button className="inline-flex items-center gap-2 text-indigo-600 font-semibold px-6 py-3 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
                View All Events <ArrowRightOutlined />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
