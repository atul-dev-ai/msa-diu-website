"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  DashboardOutlined,
  NotificationOutlined,
  CalendarOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { message, Spin, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        message.error("Access Denied! Please login first.");
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    message.success("Logged out successfully!");
    router.push("/admin/login");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Secure Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      path: "/admin/dashboard/notices",
      icon: <NotificationOutlined />,
      label: "Manage Notices",
    },
    {
      path: "/admin/dashboard/events",
      icon: <CalendarOutlined />,
      label: "Manage Events",
    },
    {
      path: "/admin/dashboard/committee",
      icon: <TeamOutlined />,
      label: "Manage Committee",
    },
    {
      path: "/admin/dashboard/messages",
      icon: <MailOutlined />,
      label: "Inbox Messages",
    },
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <Spin size="large" />
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          Verifying secure connection...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside
        className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${collapsed ? "w-20" : "w-64"} z-20`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-100 shrink-0">
          <h1
            className={`font-black text-indigo-700 transition-all duration-300 tracking-tight ${collapsed ? "text-lg" : "text-2xl"}`}
          >
            {collapsed ? "MSA" : "MSA Admin"}
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link href={item.path} key={item.path}>
                <div
                  className={`flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-bold shadow-sm border border-indigo-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-500 font-medium border border-transparent"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!collapsed && (
                    <span className="ml-3 text-sm">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 font-bold text-sm shadow-sm ${collapsed ? "w-12 h-12 p-0 mx-auto rounded-full" : "w-full"}`}
          >
            <LogoutOutlined className={collapsed ? "text-lg m-0" : ""} />
            {!collapsed && <span>Secure Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">

        <header className="h-16 bg-slate-950 flex items-center justify-between px-6 shadow-md z-10 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white text-xl transition-colors cursor-pointer"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm font-medium hidden sm:block">
              Hello, Authorized Admin
            </span>

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white border-2 border-slate-800 shadow-md cursor-pointer hover:opacity-80 transition-opacity">
                <UserOutlined />
              </div>
            </Dropdown>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 relative">
          <div className="max-w-7xl mx-auto pb-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
