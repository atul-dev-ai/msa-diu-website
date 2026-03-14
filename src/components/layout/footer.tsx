"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "antd";
import {
  FacebookFilled,
  LinkedinOutlined,
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartFilled,
  RightOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <footer className="bg-slate-950 pt-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative bg-white rounded-full p-1">
                <Image
                  src="/logo.png"
                  alt="MSA-DIU Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                MSA <span className="text-indigo-500 font-bold">DIU</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering the students of Manikganj at Daffodil International
              University through unity, leadership, and cultural heritage.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/diumsa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Facebook Community page"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-300 hover:bg-indigo-500 hover:text-white transition-all duration-300 border border-slate-700 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:-translate-y-1"
              >
                <FacebookFilled className="text-lg" />
              </a>
              <div
                title="Coming Soon"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500 cursor-not-allowed border border-slate-700"
              >
                <LinkedinOutlined className="text-lg" />
              </div>
              <div
                title="Coming Soon"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500 cursor-not-allowed border border-slate-700"
              >
                <YoutubeFilled className="text-lg" />
              </div>
            </div>
          </div>

          {/* 2. Quick Links eta middle left er kaj. Ekhane mouse hover korle links 
          gular pashe right arrow hover hoye ashbe */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "#about" },
                { name: "Notice Board", path: "#notice" },
                { name: "Upcoming Events", path: "#events" },
                { name: "Executive Committee", path: "#committee" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className="text-slate-400 hover:text-indigo-400 text-sm flex items-center gap-2 transition-colors group"
                  >
                    <RightOutlined className="text-[10px] opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community part middle right er kaj ekhane link er opor mouse nile right arrow ho
          hover hobe */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.facebook.com/diumsa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Community Page"
                  className="group flex items-center text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit"
                >
                  <RightOutlined className="text-[10px] opacity-0 -ml-3 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  FaceBook Group
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsModalVisible(true)}
                  className="group flex items-center text-slate-400 hover:text-indigo-400 transition-colors text-sm text-left w-full cursor-pointer"
                >
                  <RightOutlined className="text-[10px] opacity-0 -ml-3 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Become a Member
                </button>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="group flex items-center text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit"
                >
                  <RightOutlined className="text-[10px] opacity-0 -ml-3 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link
                  href="https://rokto-lagbe-as.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Blood Donor and Finder Organization"
                  className="group flex items-center text-slate-400 hover:text-indigo-400 transition-colors text-sm w-fit"
                >
                  <RightOutlined className="text-[10px] opacity-0 -ml-3 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  Become a Blood Donor
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all flex-shrink-0">
                  <EnvironmentOutlined />
                </div>
                <span className="mt-1 group-hover:text-slate-300 transition-colors">
                  Daffodil Smart City, Ashulia, Savar, Dhaka.
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all flex-shrink-0">
                  <PhoneOutlined />
                </div>
                <span className="group-hover:text-slate-300 transition-colors">
                  +880 1XXX-XXXXXX
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all flex-shrink-0">
                  <MailOutlined />
                </div>
                <span className="group-hover:text-slate-300 transition-colors">
                  msa18official@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 py-6 border-t border-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm text-center lg:text-left">
            &copy; {currentYear} Manikganj Student Association - DIU. All rights
            reserved.
          </p>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center gap-2 px-5 py-2.5 bg-slate-950 rounded-full border border-slate-800 text-sm font-medium">
              <span className="text-slate-400">Developed with</span>
              <HeartFilled className="text-red-500 animate-pulse text-xs" />
              <span className="text-slate-400">by</span>
              <Link
                href="https://atulpaul.vercel.app"
                target="_blank"
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold hover:from-indigo-300 hover:to-cyan-300 transition-all ml-1 animate-bounce"
              >
                Atul Paul
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={
          <span className="text-xl font-bold text-slate-800">
            Become a Member
          </span>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        centered
        destroyOnClose
      >
        <div className="w-full h-[70vh] min-h-[500px] rounded-xl overflow-hidden mt-4">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScX_YOUR_FORM_ID_HERE/viewform?embedded=true"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="MSA DIU Membership Form"
            className="w-full h-full bg-slate-50"
          >
            Loading Form...
          </iframe>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
