"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  UserOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Spin, Table, Tag, Input, Select, Popconfirm, message } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

export default function MembersManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Filters State 🔹
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // 🔹 Fetch Data 🔹
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch All Members
      const { data: membersData, error: memberError } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (membersData) {
        setMembers(membersData);
        setFilteredMembers(membersData);
      }

      // Fetch Settings (Form ON/OFF Status)
      const { data: settingsData } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (settingsData) setSettings(settingsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Filter Logic 🔹
  useEffect(() => {
    let result = members;

    // Filter by Status
    if (statusFilter !== "all") {
      result = result.filter((m) => m.status === statusFilter);
    }

    // Filter by Department
    if (departmentFilter !== "all") {
      result = result.filter((m) =>
        m.department.toLowerCase().includes(departmentFilter.toLowerCase()),
      );
    }

    // Search by Name or ID
    if (searchText) {
      result = result.filter(
        (m) =>
          m.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
          m.student_id.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setFilteredMembers(result);
  }, [searchText, statusFilter, departmentFilter, members]);

  // 🔹 Approve Member 🔹
  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from("members")
      .update({ status: "approved" })
      .eq("id", id);
    if (!error) {
      message.success("Member Approved!");
      fetchData();
    } else {
      message.error("Failed to approve");
    }
  };

  // 🔹 Reject/Delete Member 🔹
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (!error) {
      message.success("Member Deleted!");
      fetchData();
    } else {
      message.error("Failed to delete");
    }
  };

  // 🔹 Toggle Membership Form 🔹
  const toggleForm = async () => {
    if (!settings) return;
    const newStatus = !settings.is_accepting_members;

    const { error } = await supabase
      .from("site_settings")
      .update({ is_accepting_members: newStatus })
      .eq("id", 1);

    if (!error) {
      setSettings({ ...settings, is_accepting_members: newStatus });
      message.success(
        `Membership Form is now ${newStatus ? "OPEN" : "CLOSED"}`,
      );
    }
  };

  // 🔹 Unique Departments for Filter Dropdown 🔹
  const uniqueDepartments = Array.from(
    new Set(members.map((m) => m.department.toUpperCase())),
  );

  // 🔹 Table Columns 🔹
  const columns = [
    {
      title: "Name & ID",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string, record: any) => (
        <div>
          <div className="font-bold text-slate-800">{text}</div>
          <div className="text-xs text-slate-500">{record.student_id}</div>
        </div>
      ),
    },
    {
      title: "Dept & Batch",
      dataIndex: "department",
      key: "department",
      render: (text: string, record: any) => (
        <div>
          <div className="font-semibold text-indigo-600">
            {text.toUpperCase()}
          </div>
          <div className="text-xs text-slate-500">{record.batch} Batch</div>
        </div>
      ),
    },
    {
      title: "Contact Info",
      dataIndex: "phone",
      key: "phone",
      render: (text: string, record: any) => (
        <div className="text-sm">
          <div>{text}</div>
          <div className="text-xs text-slate-500">{record.upazila}</div>
        </div>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => (
        <div className="text-sm">{dayjs(date).format("DD MMM, YYYY")}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "approved" ? "success" : "warning"}
          className="uppercase font-bold"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          {record.status === "pending" && (
            <button
              onClick={() => handleApprove(record.id)}
              className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-500 hover:text-white flex items-center justify-center transition-colors"
              title="Approve"
            >
              <CheckCircleOutlined />
            </button>
          )}
          <Popconfirm
            title="Delete the member?"
            description="Are you sure to delete this application?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <button
              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
              title="Delete"
            >
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (loading && !members.length) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* 🔹 Header & Settings Card 🔹 */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Members
            </span>
          </h1>
          <p className="text-slate-500 text-lg">
            Manage all pending and approved student applications.
          </p>
        </div>

        {/* ON/OFF Switch */}
        {settings && (
          <div className="relative z-10 bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center gap-5 min-w-[320px]">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${settings.is_accepting_members ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              <SettingOutlined />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Registration Form
              </p>
              <p
                className={`text-lg font-black ${settings.is_accepting_members ? "text-green-600" : "text-red-600"}`}
              >
                {settings.is_accepting_members ? "IS OPEN" : "IS CLOSED"}
              </p>
            </div>
            <button
              onClick={toggleForm}
              className={`px-5 py-2.5 cursor-pointer rounded-xl font-bold text-sm transition-all shadow-sm ${
                settings.is_accepting_members
                  ? "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200"
                  : "bg-green-50 text-green-600 hover:bg-green-500 hover:text-white border border-green-200"
              }`}
            >
              Turn {settings.is_accepting_members ? "OFF" : "ON"}
            </button>
          </div>
        )}
      </div>

      {/* 🔹 Filters & Search 🔹 */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search by Name or ID..."
          prefix={<SearchOutlined className="text-slate-400" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-md h-12 rounded-xl"
        />

        <div className="flex items-center gap-4 w-full md:w-auto cursor-pointer">
          <Select
            defaultValue="all"
            style={{ width: 150, height: 48 }}
            onChange={setStatusFilter}
            className="rounded-xl"
            suffixIcon={<FilterOutlined />}
          >
            <Option value="all">All Status</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
          </Select>

          <Select
            defaultValue="all"
            style={{ width: 150, height: 48 }}
            onChange={setDepartmentFilter}
            className="rounded-xl"
          >
            <Option value="all">All Dept</Option>
            {uniqueDepartments.map((dept: any) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* 🔹 Members Table 🔹 */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={filteredMembers}
          rowKey="id"
          pagination={{ pageSize: 10, className: "mr-6 mb-6" }}
          scroll={{ x: 800 }}
          className="custom-admin-table"
        />
      </div>
    </motion.div>
  );
}
