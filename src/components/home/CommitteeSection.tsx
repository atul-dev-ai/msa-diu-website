"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FacebookFilled,
  LinkedinFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { supabase } from "@/lib/supabase";

// ডাটাবেসের মেম্বার টাইপ
interface CommitteeMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  batch: string;
  rank: number;
  image: string;
  facebook: string;
  linkedin: string;
}

const CommitteeSection = () => {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে মেম্বারদের ডেটা আনা (rank অনুযায়ী)
  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const { data, error } = await supabase
          .from("committee")
          .select("*")
          .order("rank", { ascending: true }); // Rank 1, 2, 3... হিসেবে আসবে

        if (data) setMembers(data);
      } catch (error) {
        console.error("Failed to fetch committee members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommittee();
  }, []);

  if (loading) return null; // লোডিং অবস্থায় ফাঁকা থাকবে

  return (
    <section
      id="committee"
      className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200"
    >
      {/* 🔹 Bluish Decorative Background (লগইন পেজের মতো) 🔹 */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold text-sm mb-4 shadow-sm animate-bounce"
          >
            <TeamOutlined className="animate-bounce"/> Executive Committee
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Leaders
            </span>
          </h2>
          <p className="text-slate-500 text-lg">
            The dedicated minds working behind the scenes to empower and unite
            the students of Manikganj at DIU.
          </p>
        </div>

        {/* Committee Grid */}
        {members.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 font-medium text-lg">
              Committee members will be updated soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] p-6 shadow-xl shadow-indigo-100/40 border border-slate-100 hover:border-indigo-200 transition-all group flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Card Top Glow Hover Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Profile Image with Gradient Ring */}
                <div className="relative w-28 h-28 mb-5 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-200">
                  <div className="w-full h-full relative rounded-full overflow-hidden border-4 border-white bg-slate-100">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <TeamOutlined className="text-3xl text-slate-300" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Details */}
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-bold text-sm mb-3 uppercase tracking-wide">
                  {member.designation}
                </p>

                {(member.department || member.batch) && (
                  <div className="text-slate-500 text-xs font-medium bg-slate-50 px-3 py-1.5 rounded-lg mb-6 w-full">
                    {member.department && <span>{member.department}</span>}
                    {member.department && member.batch && (
                      <span className="mx-1">•</span>
                    )}
                    {member.batch && <span>{member.batch}</span>}
                  </div>
                )}

                {/* Social Links */}
                <div className="flex gap-3 mt-auto pt-2">
                  {member.facebook && member.facebook !== "#" && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      <FacebookFilled className="text-lg" />
                    </a>
                  )}
                  {member.linkedin && member.linkedin !== "#" && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <LinkedinFilled className="text-lg" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommitteeSection;
