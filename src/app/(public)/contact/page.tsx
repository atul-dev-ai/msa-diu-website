"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Form, Input, Button, message } from "antd";
import Link from "next/link";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
  FacebookFilled,
  LinkedinFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { supabase } from "@/lib/supabase";

import type { Metadata } from "next";

// 🔹 Unique SEO Metadata for Contact Page 🔹
export const metadata: Metadata = {
  title: "Contact Us | MSA DIU - Get in Touch",
  description:
    "Reach out to the Manikganj Student Association at DIU. Find our contact info, location, and connect with the MSA executive committee.",
  alternates: {
    canonical: "https://msa-diu-website.vercel.app/contact",
  },
};

const { TextArea } = Input;

export default function ContactAdmin() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // ফর্ম সাবমিট করার রিয়েল ফাংশন
  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      // ১. প্রথমে ডাটাবেসে (Supabase) সেভ করা
      const { error: dbError } = await supabase.from("messages").insert([
        {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        },
      ]);

      if (dbError) throw new Error("Failed to save in database");

      // ২. এরপর Resend API দিয়ে ইমেইল পাঠানো
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      if (!emailResponse.ok) {
        console.warn("Email API failed, but data was saved to DB.");
      }

      // ৩. সাকসেস মেসেজ দেখানো
      message.success(
        "Your message has been sent successfully! Our admin will contact you soon.",
      );
      form.resetFields();
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative bg-slate-50 overflow-hidden">
      {/* 🔹 Bluish Decorative Background 🔹 */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 🔹 Back to Home Button 🔹 */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:-translate-y-1 hover:scale-105 duration-300 transition-all hover:text-indigo-600 shadow-2xl shadow-purple-300 font-medium bg-white px-5 py-2.5 rounded-full border border-slate-200 w-fit group"
          >
            <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 border border-indigo-200 text-indigo-700 font-bold text-sm mb-4 shadow-sm"
          >
            <MailOutlined /> Get In Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Admin
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg"
          >
            Have a question, suggestion, or want to collaborate? Fill out the
            form below and our executive team will get back to you shortly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* 🔹 Left Side: Contact Information 🔹 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-indigo-100/40 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>

              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Office Address
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Daffodil Smart City,
                      <br />
                      Ashulia, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <PhoneOutlined />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Phone Number
                    </h4>
                    <p className="text-slate-500 text-sm">+880 1234 567890</p>
                    <p className="text-slate-500 text-sm">+880 9876 543210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <MailOutlined />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Email Address
                    </h4>
                    <p className="text-slate-500 text-sm">
                      msa18official@gmail.com
                    </p>
                    <p className="text-slate-500 text-sm">admin@msadiu.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-slate-100"
                  >
                    <FacebookFilled className="text-lg" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100"
                  >
                    <LinkedinFilled className="text-lg" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 🔹 Right Side: Contact Form 🔹 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white shadow-2xl shadow-indigo-100/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Send us a Message
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                Your email address will not be published. Required fields are
                marked *
              </p>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="large"
                className="contact-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <Form.Item
                    name="name"
                    label={
                      <span className="font-semibold text-slate-700">
                        Full Name
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input
                      placeholder="John Doe"
                      className="rounded-xl px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={
                      <span className="font-semibold text-slate-700">
                        Email Address
                      </span>
                    }
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input
                      placeholder="john@example.com"
                      className="rounded-xl px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="subject"
                  label={
                    <span className="font-semibold text-slate-700">
                      Subject
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter a subject" },
                  ]}
                >
                  <Input
                    placeholder="How can we help you?"
                    className="rounded-xl px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={
                    <span className="font-semibold text-slate-700">
                      Message
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter your message" },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Write your message here..."
                    className="rounded-xl px-4 py-3 bg-slate-50/50 hover:bg-white focus:bg-white resize-none"
                  />
                </Form.Item>

                <Form.Item className="mb-0 mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-indigo-600 hover:bg-indigo-500 border-none h-12 px-8 rounded-xl font-bold text-base shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                  >
                    Send Message <SendOutlined />
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
