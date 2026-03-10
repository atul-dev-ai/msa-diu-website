"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "antd";
import {
  FacebookOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartFilled,
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
                MSA <span className="text-indigo-500 font-light">DIU</span>
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
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                <FacebookOutlined className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                <LinkedinOutlined className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                <YoutubeOutlined className="text-lg" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>{" "}
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#notice"
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>{" "}
                  Notice Board
                </Link>
              </li>
              <li>
                <Link
                  href="#committee"
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>{" "}
                  Committee
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#committee"
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Executive Committee
                </Link>
              </li>
              <li>
              
                <button
                  onClick={() => setIsModalVisible(true)}
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm text-left w-full cursor-pointer"
                >
                  Become a Member
                </button>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <EnvironmentOutlined className="text-indigo-500 mt-1" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  Daffodil Smart City, Ashulia, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneOutlined className="text-indigo-500" />
                <span className="text-slate-400 text-sm">+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <MailOutlined className="text-indigo-500" />
                <span className="text-slate-400 text-sm">
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
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold hover:from-indigo-300 hover:to-cyan-300 transition-all ml-1"
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
