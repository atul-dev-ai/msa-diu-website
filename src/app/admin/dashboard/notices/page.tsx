"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Tag,
  Popconfirm,
  Space,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function ManageNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchNotices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      message.error("Failed to fetch notices!");
      console.error(error);
    } else {
      setNotices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const onFinish = async (values: any) => {
    setSubmitLoading(true);
    try {
      const { error } = await supabase.from("notices").insert([
        {
          title: values.title,
          description: values.description,
          type: values.type,
          // এখানেই মূল কনফিউশনটা ছিল! এখন key এবং value দুইটাই ছোট হাতের 'expirydate'
          expirydate: values.expirydate.toISOString(),
          link: values.link || "#",
        },
      ]);

      if (error) throw error;

      message.success("Notice added successfully!");
      form.resetFields();
      setIsModalVisible(false);
      fetchNotices();
    } catch (error: any) {
      message.error(error.message || "Something went wrong!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("notices").delete().eq("id", id);
      if (error) throw error;

      message.success("Notice deleted successfully!");
      fetchNotices();
    } catch (error: any) {
      message.error("Failed to delete notice!");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span className="font-semibold text-slate-700">{text}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        let color =
          type === "Urgent" ? "red" : type === "Event" ? "blue" : "default";
        return (
          <Tag
            color={color}
            className="font-medium uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-full"
          >
            {type}
          </Tag>
        );
      },
    },
    {
      title: "Expiry Date",
      dataIndex: "expirydate", // DataIndex ও ছোট হাতের করে দিয়েছি
      key: "expirydate",
      render: (date: string) => (
        <span className="text-slate-500 text-sm">
          {dayjs(date).format("DD MMM, YYYY")}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the notice"
            description="Are you sure to delete this notice?"
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
      className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <NotificationOutlined className="text-indigo-600" /> Manage Notices
          </h1>
          <p className="text-slate-500 mt-1">
            Create, view, and delete official association notices.
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalVisible(true)}
          className="bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-200 border-none font-medium"
        >
          Add New Notice
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={notices}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="border border-slate-100 rounded-xl overflow-hidden"
      />

      <Modal
        title={
          <span className="text-xl font-bold text-slate-800">
            Create New Notice
          </span>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-6"
        >
          <Form.Item
            name="title"
            label={
              <span className="font-medium text-slate-700">Notice Title</span>
            }
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input
              placeholder="e.g. Annual Iftar Mahfil 2026"
              className="rounded-lg px-4 py-2"
            />
          </Form.Item>

          <Form.Item
            name="type"
            label={
              <span className="font-medium text-slate-700">Notice Type</span>
            }
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select placeholder="Select type" className="h-10">
              <Select.Option value="Event">Event</Select.Option>
              <Select.Option value="Urgent">Urgent</Select.Option>
              <Select.Option value="Meeting">Meeting</Select.Option>
              <Select.Option value="General">General</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="expirydate" // Name ও ছোট হাতের
            label={
              <span className="font-medium text-slate-700">
                Expiry Date (When to hide from Hero Section)
              </span>
            }
            rules={[
              { required: true, message: "Please select an expiry date" },
            ]}
          >
            <DatePicker className="w-full rounded-lg px-4 py-2" />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="font-medium text-slate-700">
                Short Description
              </span>
            }
          >
            <TextArea
              rows={3}
              placeholder="Write a short description..."
              className="rounded-lg px-4 py-2"
            />
          </Form.Item>

          <Form.Item
            name="link"
            label={
              <span className="font-medium text-slate-700">
                Action Link (Optional)
              </span>
            }
          >
            <Input
              placeholder="e.g. #events or https://forms.gle/..."
              className="rounded-lg px-4 py-2"
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button
              onClick={() => setIsModalVisible(false)}
              className="rounded-xl px-6 h-10 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoading}
              className="bg-indigo-600 rounded-xl px-6 h-10 font-medium border-none shadow-md"
            >
              Publish Notice
            </Button>
          </div>
        </Form>
      </Modal>
    </motion.div>
  );
}
