"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  AimOutlined,
  EyeOutlined,
  CheckCircleFilled,
  UsergroupAddOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 relative bg-white overflow-hidden border-b border-slate-100"
    >

      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-sm mb-6 shadow-sm w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Who We Are
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
              Empowering the minds of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Manikganj at DIU
              </span>
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              The Manikganj Student Association (MSA) at Daffodil International
              University is a vibrant community built on unity, cultural
              heritage, and leadership. We strive to create a home away from
              home for every student from Manikganj.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                  <AimOutlined />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  To unite all students from Manikganj under one platform,
                  providing academic support, networking opportunities, and
                  career guidance.
                </p>
              </div>

              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                  <EyeOutlined />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Our Vision
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  To build a strong, empowered, and culturally enriched
                  community that represents the true spirit of Manikganj across
                  the nation.
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                "Networking and Mentorship Programs",
                "Cultural Events and Get-togethers",
                "Skill Development Workshops",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-700 font-medium"
                >
                  <CheckCircleFilled className="text-indigo-500 text-lg" />{" "}
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] flex items-center justify-center lg:justify-end"
          >

            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50 z-10 border-[6px] border-white">
              <Image
                src="/backbg-2.jpg"
                alt="Students collaborating"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute hidden md:block w-56 aspect-square rounded-3xl overflow-hidden shadow-xl shadow-cyan-200/50 border-[6px] border-white z-20 -left-12 bottom-12"
            >
              <Image
                src="/backbg-2.jpg"
                alt="Campus life"
                fill
                unoptimized
                className="object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 right-[-1rem] top-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-indigo-100/50 border border-white flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                <UsergroupAddOutlined />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-800">700+</h4>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Active Members
                </p>
              </div>
            </motion.div>

            <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 bg-[radial-gradient(circle,#6366f1_2px,transparent_2px)] bg-[size:16px_16px] opacity-20"></div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <UsergroupAddOutlined />,
              count: "700+",
              label: "Registered Members",
            },
            {
              icon: <CalendarOutlined />,
              count: "90+",
              label: "Events Organized",
            },
            {
              icon: <TrophyOutlined />,
              count: "7+",
              label: "Years of Excellence",
            },
            { icon: <AimOutlined />, count: "100%", label: "Commitment" }, // <-- এখানেও আপডেট করা হয়েছে
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center hover:bg-white hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl text-indigo-500 mb-3">{stat.icon}</div>
              <h4 className="text-3xl font-black text-slate-800 mb-1">
                {stat.count}
              </h4>
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
