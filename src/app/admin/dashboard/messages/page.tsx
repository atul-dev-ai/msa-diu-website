"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message as antMessage,
  Tag,
  Space,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  MailOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";

export default function ManageMessages() {
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states for reading full message
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false }); // Notun message gulo age asbe

      if (error) throw error;
      if (data) setMessagesList(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      antMessage.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Mark a message as read
  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", id);
      if (error) throw error;

      antMessage.success("Message marked as read!");
      fetchMessages(); // Update the list
    } catch (error) {
      antMessage.error("Failed to update message status.");
    }
  };

  // Delete a message
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;

      antMessage.success("Message deleted successfully!");
      fetchMessages();
    } catch (error) {
      antMessage.error("Failed to delete message.");
    }
  };

  // View full message
  const viewMessage = (record: any) => {
    setSelectedMessage(record);
    setIsModalVisible(true);
    // Automatically mark as read when viewed
    if (!record.is_read) {
      markAsRead(record.id);
    }
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "is_read",
      key: "is_read",
      width: 100,
      render: (is_read: boolean) =>
        is_read ? (
          <Tag color="default" className="rounded-full px-3 font-semibold">
            Read
          </Tag>
        ) : (
          <Tag
            color="blue"
            className="rounded-full px-3 font-bold animate-pulse"
          >
            New
          </Tag>
        ),
    },
    {
      title: "Sender Info",
      key: "sender",
      width: 250,
      render: (_: any, record: any) => (
        <div>
          <div className="font-bold text-slate-800 flex items-center gap-2">
            <UserOutlined className="text-indigo-400" /> {record.name}
          </div>
          <div className="text-xs text-slate-500 mt-1">{record.email}</div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium flex items-center gap-1">
            <ClockCircleOutlined />{" "}
            {dayjs(record.created_at).format("DD MMM, YYYY hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      title: "Message",
      key: "message",
      render: (_: any, record: any) => (
        <div className="max-w-md">
          <div className="font-bold text-slate-700 mb-1">{record.subject}</div>
          <div className="text-sm text-slate-500 line-clamp-2">
            {record.message}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 150,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="text"
            onClick={() => viewMessage(record)}
            icon={<EyeOutlined className="text-indigo-500" />}
            className="hover:bg-indigo-50"
          />
          {!record.is_read && (
            <Button
              type="text"
              onClick={() => markAsRead(record.id)}
              icon={<CheckCircleOutlined className="text-emerald-500" />}
              className="hover:bg-emerald-50"
            />
          )}
          <Popconfirm
            title="Delete Message"
            description="Are you sure you want to delete this message permanently?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              className="hover:bg-red-50"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <MailOutlined />
            </div>
            Inbox Messages
          </h1>
          <p className="text-slate-500 mt-2">
            Read and manage all contact requests sent by students and visitors.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <Table
          columns={columns}
          dataSource={messagesList}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 8 }}
          className="border border-slate-100 rounded-xl overflow-hidden custom-table"
        />
      </div>

      {/* Message Reading Modal */}
      <Modal
        title={
          <span className="text-xl font-bold text-slate-800">
            Message Details
          </span>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setIsModalVisible(false)}
            className="rounded-xl px-6 h-10 font-medium"
          >
            Close
          </Button>,
        ]}
        width={600}
        destroyOnClose
        centered
      >
        {selectedMessage && (
          <div className="mt-4 space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                <h3 className="font-bold text-lg text-slate-800 m-0">
                  {selectedMessage.name}
                </h3>
                <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                  {dayjs(selectedMessage.created_at).format(
                    "DD MMM, YYYY - hh:mm A",
                  )}
                </span>
              </div>
              <div className="text-sm text-indigo-600 font-medium mb-1 flex items-center gap-2">
                <MailOutlined /> {selectedMessage.email}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                Subject
              </h4>
              <p className="text-slate-800 font-bold text-lg">
                {selectedMessage.subject}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                Message
              </h4>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-600 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
