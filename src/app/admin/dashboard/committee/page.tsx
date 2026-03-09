"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  AutoComplete,
  Radio,
  Upload,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const designationOptions = [
  { value: "President" },
  { value: "Vice President" },
  { value: "General Secretary" },
  { value: "Joint Secretary" },
  { value: "Assistant General Secretary" },
  { value: "Organizing Secretary" },
  { value: "Assistant Organizing Secretary" },
  { value: "Finance Secretary" },
  { value: "Assistant Finance Secretary" },
  { value: "Women Secretary" },
  { value: "Assistant Women Secretary" },
  { value: "Office Secretary" },
  { value: "Assistant Office Secretary" },
  { value: "Press Secretary" },
  { value: "Assistant Press Secretary" },
  { value: "Digital Content Creator" },
  { value: "Assistant Digital Content Creator" },
  { value: "Creative Designer" },
  { value: "Assistant Creative Designer" },
  { value: "Hosting Secretary" },
  { value: "Cultural Secretary" },
  { value: "Executive Member" },
];

export default function ManageCommittee() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [imageUploadType, setImageUploadType] = useState<"url" | "upload">(
    "url",
  );
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const [form] = Form.useForm();

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("committee")
      .select("*")
      .order("rank", { ascending: true });

    if (error) {
      message.error("Failed to fetch members!");
      console.error(error);
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const onFinish = async (values: any) => {
    setSubmitLoading(true);
    try {
      let finalImageUrl = "";

      // ১. ডিভাইস থেকে আপলোড (HTTP 400 Fix)
      if (imageUploadType === "upload" && uploadFile) {
        // ফাইলের অরিজিনাল এক্সটেনশন বের করা
        const fileExt = uploadFile.name.split(".").pop();
        // কোনো স্পেস ছাড়া ক্লিন নাম তৈরি করা
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("committee_images")
          .upload(fileName, uploadFile, {
            contentType: uploadFile.type, // <-- HTTP 400 এরর ফিক্স!
            upsert: true,
          });

        if (uploadError) {
          throw new Error("Image upload failed: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("committee_images")
          .getPublicUrl(fileName);

        finalImageUrl = publicUrlData.publicUrl;
      }
      // ২. URL অপশন
      else if (imageUploadType === "url") {
        finalImageUrl = values.imageUrl || "";
      }

      // ডাটাবেসে ডেটা ইনসার্ট করা
      const { error } = await supabase.from("committee").insert([
        {
          name: values.name,
          designation: values.designation,
          department: values.department || null,
          batch: values.batch || null,
          rank: values.rank,
          image: finalImageUrl,
          facebook: values.facebook || "#",
          linkedin: values.linkedin || "#",
        },
      ]);

      if (error) throw error;

      message.success("Committee member added successfully!");
      form.resetFields();
      setUploadFile(null);
      setIsModalVisible(false);
      fetchMembers();
    } catch (error: any) {
      console.error("Upload Error Details:", error);
      message.error(error.message || "Something went wrong!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("committee").delete().eq("id", id);
      if (error) throw error;
      message.success("Member removed successfully!");
      fetchMembers();
    } catch (error: any) {
      message.error("Failed to remove member!");
    }
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "image",
      key: "image",
      render: (imgUrl: string) => (
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="Member"
              className="w-full h-full object-cover"
            />
          ) : (
            <UserOutlined className="text-slate-400 text-lg" />
          )}
        </div>
      ),
    },
    {
      title: "Name & Info",
      key: "info",
      render: (_: any, record: any) => (
        <div>
          <div className="font-bold text-slate-700">{record.name}</div>
          <div className="text-xs text-slate-500">
            {record.department} {record.batch && `- ${record.batch}`}
          </div>
        </div>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text: string) => (
        <span className="text-slate-600 font-medium">{text}</span>
      ),
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (rank: number) => (
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold text-xs">
          {rank}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Remove Member"
            description="Are you sure you want to remove this member?"
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
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 ">
            <TeamOutlined className="text-indigo-600 " /> Manage Committee
          </h1>
          <p className="text-slate-500 mt-1">
            Add members, update ranks, and manage the team.
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalVisible(true)}
          className="bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md border-none font-medium"
        >
          Add Member
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={members}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="border border-slate-100 rounded-xl overflow-hidden"
      />

      <Modal
        title={
          <span className="text-xl font-bold text-slate-800">
            Add Committee Member
          </span>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setUploadFile(null);
        }}
        footer={null}
        destroyOnClose
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-6"
        >
          <Form.Item
            name="name"
            label={
              <span className="font-medium text-slate-700">Full Name</span>
            }
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input
              placeholder="e.g. Rakib Hasan"
              className="rounded-lg px-4 py-2"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="designation"
              label={
                <span className="font-medium text-slate-700">
                  Designation / Position
                </span>
              }
              rules={[
                { required: true, message: "Select or type designation" },
              ]}
            >
              <AutoComplete
                options={designationOptions}
                placeholder="Type or select position"
                filterOption={(inputValue, option) =>
                  option!.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
                className="h-10"
              />
            </Form.Item>

            <Form.Item
              name="rank"
              label={
                <span className="font-medium text-slate-700">
                  Display Rank (1, 2, 3...)
                </span>
              }
              rules={[
                { required: true, message: "Please enter a sorting rank" },
              ]}
            >
              <InputNumber
                min={1}
                className="w-full rounded-lg"
                size="large"
                placeholder="e.g. 1 for President"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="department"
              label={
                <span className="font-medium text-slate-700">Department</span>
              }
            >
              <Input
                placeholder="e.g. CSE, BBA"
                className="rounded-lg px-4 py-2"
              />
            </Form.Item>
            <Form.Item
              name="batch"
              label={
                <span className="font-medium text-slate-700">
                  Batch / Semester
                </span>
              }
            >
              <Input
                placeholder="e.g. 62nd Batch"
                className="rounded-lg px-4 py-2"
              />
            </Form.Item>
          </div>

          {/* Image Upload Selection */}
          <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="font-medium text-slate-700 mb-3">Profile Image</div>
            <Radio.Group
              value={imageUploadType}
              onChange={(e) => setImageUploadType(e.target.value)}
              className="mb-4"
            >
              <Radio.Button value="url">
                <LinkOutlined /> Use Image URL
              </Radio.Button>
              <Radio.Button value="upload">
                <UploadOutlined /> Upload from Device
              </Radio.Button>
            </Radio.Group>

            {imageUploadType === "url" ? (
              <Form.Item name="imageUrl" className="mb-0">
                <Input
                  placeholder="Paste image URL here (https://...)"
                  className="rounded-lg px-4 py-2"
                />
              </Form.Item>
            ) : (
              <div className="mb-0">
                <Upload
                  maxCount={1}
                  beforeUpload={(file) => {
                    setUploadFile(file);
                    return false; // Auto upload বন্ধ রাখা হয়েছে
                  }}
                  onRemove={() => setUploadFile(null)}
                >
                  <Button icon={<UploadOutlined />} className="h-10 rounded-lg">
                    Select Image from Device
                  </Button>
                </Upload>
                {uploadFile && (
                  <p className="text-xs text-indigo-600 mt-2">
                    File selected: {uploadFile.name}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="facebook"
              label={
                <span className="font-medium text-slate-700">
                  Facebook Link
                </span>
              }
            >
              <Input placeholder="Optional" className="rounded-lg px-4 py-2" />
            </Form.Item>
            <Form.Item
              name="linkedin"
              label={
                <span className="font-medium text-slate-700">
                  LinkedIn Link
                </span>
              }
            >
              <Input placeholder="Optional" className="rounded-lg px-4 py-2" />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 mt-4">
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
              Save Member
            </Button>
          </div>
        </Form>
      </Modal>
    </motion.div>
  );
}
