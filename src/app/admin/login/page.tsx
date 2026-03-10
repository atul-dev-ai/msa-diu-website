"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        message.success("Login successful! Welcome Admin.");
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      message.error(error.message || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <Link
        href="/"
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors z-20"
      >
        <ArrowLeftOutlined /> Back to Website
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-900/20">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-5 p-2 shadow-lg shadow-indigo-500/20">
              <div className="relative w-full h-full">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Admin Portal
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to manage MSA-DIU website
            </p>
          </div>

          <Form
            name="admin_login"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-slate-500 mr-2" />}
                placeholder="Admin Email"
                className="bg-slate-800/50 border-slate-700 text-white hover:border-indigo-500 focus:border-indigo-500 rounded-xl h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-500 mr-2" />}
                placeholder="Password"
                className="bg-slate-800/50 border-slate-700 text-white hover:border-indigo-500 focus:border-indigo-500 rounded-xl h-12"
              />
            </Form.Item>

            <Form.Item className="mt-8 mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 border-none h-12 rounded-xl font-bold text-base shadow-lg shadow-indigo-600/30"
              >
                Sign In to Dashboard
              </Button>
            </Form.Item>
          </Form>
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-6">
          This portal is strictly restricted for authorized MSA-DIU executives
          only.
        </p>
      </motion.div>
    </div>
  );
}
