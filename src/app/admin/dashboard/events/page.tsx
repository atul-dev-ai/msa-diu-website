"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Popconfirm,
  Tag,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import Image from "next/image";
import imageCompression from "browser-image-compression"; // 👈 নতুন প্যাকেজটি ইম্পোর্ট করা হলো

const { TextArea } = Input;

export default function ManageEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Upload States 🔹
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [form] = Form.useForm();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });

      if (error) throw error;
      if (data) setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      message.error("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 Core Upload & Compression Function 🔹
  const uploadToSupabase = async (file: File) => {
    try {
      // ১. ছবি কম্প্রেস করার সেটিংস (সাইজ কমাবে কিন্তু কোয়ালিটি ঠিক রাখবে)
      const options = {
        maxSizeMB: 0.2, // সর্বোচ্চ ২০০ KB
        maxWidthOrHeight: 1280, // স্ট্যান্ডার্ড রেজোলিউশন
        useWebWorker: true,
      };

      // ২. অরিজিনাল ছবিকে কম্প্রেস করা হচ্ছে
      const compressedFile = await imageCompression(file, options);

      // ৩. কম্প্রেসড ছবি আপলোড করা হচ্ছে
      const fileExt = compressedFile.name.split(".").pop() || "jpg";
      const fileName = `event_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error } = await supabase.storage
        .from("events")
        .upload(fileName, compressedFile);
      if (error) throw error;

      const { data } = supabase.storage.from("events").getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error("Compression or Upload Error:", error);
      throw error;
    }
  };

  // 🔹 Handle Cover Image Upload 🔹
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingCover(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const url = await uploadToSupabase(file);
      // ফর্মের ফিল্ড অটো আপডেট করে দেবে
      form.setFieldsValue({ cover_image: url });
      message.success("Cover image optimized & uploaded!");
    } catch (err: any) {
      message.error("Cover upload failed: " + err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  // 🔹 Handle Gallery Images Upload (Multiple) 🔹
  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      setUploadingGallery(true);
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      const urls = [];
      for (const file of files) {
        const url = await uploadToSupabase(file);
        urls.push(url);
      }

      // আগের লিংকগুলো রেখে নতুনগুলো কমা দিয়ে অ্যাড করবে
      const currentGallery = form.getFieldValue("gallery_images") || "";
      const newGallery = currentGallery
        ? `${currentGallery},\n${urls.join(",\n")}`
        : urls.join(",\n");

      form.setFieldsValue({ gallery_images: newGallery });
      message.success(`${files.length} image(s) optimized & uploaded!`);
    } catch (err: any) {
      message.error("Gallery upload failed: " + err.message);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleAddEvent = async (values: any) => {
    setSubmitting(true);
    try {
      const formattedDate = values.event_date.format("YYYY-MM-DD");

      const galleryArray = values.gallery_images
        ? values.gallery_images
            .split(",")
            .map((url: string) => url.trim())
            .filter((url: string) => url !== "")
        : [];

      const { error } = await supabase.from("events").insert([
        {
          title: values.title,
          description: values.description,
          event_date: formattedDate,
          location: values.location || "DIU Smart City, Ashulia",
          cover_image: values.cover_image,
          gallery_images: galleryArray,
        },
      ]);

      if (error) throw error;

      message.success("Event added successfully!");
      setIsModalVisible(false);
      form.resetFields();
      fetchEvents();
    } catch (error: any) {
      message.error(error.message || "Failed to add event.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;

      message.success("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      message.error("Failed to delete event.");
    }
  };

  const columns = [
    {
      title: "Cover",
      dataIndex: "cover_image",
      key: "cover_image",
      width: 100,
      render: (imgUrl: string) =>
        imgUrl ? (
          <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-200">
            <Image
              src={imgUrl}
              alt="Cover"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-16 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
            <PictureOutlined />
          </div>
        ),
    },
    {
      title: "Event Details",
      key: "details",
      render: (_: any, record: any) => (
        <div>
          <div className="font-bold text-slate-800 text-base">
            {record.title}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CalendarOutlined className="text-indigo-400" />{" "}
              {dayjs(record.event_date).format("DD MMM, YYYY")}
            </span>
            <span className="flex items-center gap-1">
              <EnvironmentOutlined className="text-indigo-400" />{" "}
              {record.location || "DIU Smart City"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: (_: any, record: any) => {
        const isUpcoming = dayjs(record.event_date).isAfter(dayjs());
        return isUpcoming ? (
          <Tag color="cyan" className="rounded-full px-3 font-bold uppercase">
            Upcoming
          </Tag>
        ) : (
          <Tag color="green" className="rounded-full px-3 font-bold uppercase">
            Completed
          </Tag>
        );
      },
    },
    {
      title: "Gallery",
      key: "gallery",
      width: 100,
      render: (_: any, record: any) => (
        <Tag color="blue" className="rounded-full px-3">
          {record.gallery_images ? record.gallery_images.length : 0} Photos
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_: any, record: any) => (
        <Popconfirm
          title="Delete Event"
          description="Are you sure to delete this event?"
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
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
              <CalendarOutlined />
            </div>
            Manage Events
          </h1>
          <p className="text-slate-500 mt-2">
            Add new events, upload galleries, and manage campus activities.
          </p>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="bg-indigo-600 hover:bg-indigo-500 border-none rounded-xl font-bold shadow-lg shadow-indigo-200 relative z-10"
        >
          Add New Event
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <Table
          columns={columns}
          dataSource={events}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 8 }}
          className="border border-slate-100 rounded-xl overflow-hidden custom-table"
        />
      </div>

      <Modal
        title={
          <span className="text-xl font-bold text-slate-800">
            Create New Event
          </span>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
        centered
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEvent}
          className="mt-6"
        >
          <Form.Item
            name="title"
            label={
              <span className="font-semibold text-slate-700">Event Title</span>
            }
            rules={[{ required: true, message: "Please enter event title" }]}
          >
            <Input
              placeholder="E.g., MSA Annual Iftar Mahfil 2026"
              className="rounded-xl px-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="event_date"
              label={
                <span className="font-semibold text-slate-700">Event Date</span>
              }
              rules={[{ required: true, message: "Please select event date" }]}
            >
              <DatePicker
                className="w-full rounded-xl px-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white"
                format="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              name="location"
              label={
                <span className="font-semibold text-slate-700">
                  Location (Optional)
                </span>
              }
            >
              <Input
                placeholder="E.g., DIU Smart City, Ashulia"
                className="rounded-xl px-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white"
              />
            </Form.Item>
          </div>

          {/* 🔹 Cover Image Upload Area 🔹 */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700">
                Cover Image (Main Display Picture)
              </span>
            }
            required
            extra="Upload from device OR paste a direct image link below"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    disabled={uploadingCover}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploadingCover}
                    className="rounded-xl font-medium"
                  >
                    Upload Cover
                  </Button>
                </div>
                <span className="text-slate-400 font-semibold text-sm">OR</span>
              </div>

              <Form.Item
                name="cover_image"
                noStyle
                rules={[{ required: true, message: "Cover image is required" }]}
              >
                <Input
                  placeholder="https://example.com/cover.jpg"
                  className="rounded-xl px-4 py-2.5 bg-slate-50 hover:bg-white focus:bg-white"
                />
              </Form.Item>
            </div>
          </Form.Item>

          {/* 🔹 Gallery Images Upload Area 🔹 */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700">
                Gallery Images (Multiple Photos)
              </span>
            }
            extra={
              <span className="text-indigo-500 font-medium text-xs">
                Tip: You can select multiple images to upload at once, or paste
                multiple links separated by commas.
              </span>
            }
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* multiple attribute added here */}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    disabled={uploadingGallery}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploadingGallery}
                    className="rounded-xl font-medium"
                  >
                    Upload Gallery Images
                  </Button>
                </div>
                <span className="text-slate-400 font-semibold text-sm">OR</span>
              </div>

              <Form.Item name="gallery_images" noStyle>
                <TextArea
                  rows={3}
                  placeholder="https://link1.jpg,&#10;https://link2.jpg"
                  className="rounded-xl px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white resize-none"
                />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="font-semibold text-slate-700">
                Event Description
              </span>
            }
            rules={[
              { required: true, message: "Please enter event description" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Write a detailed description about the event..."
              className="rounded-xl px-4 py-3 bg-slate-50 hover:bg-white focus:bg-white resize-none"
            />
          </Form.Item>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              onClick={() => setIsModalVisible(false)}
              className="rounded-xl px-6 h-10 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="bg-indigo-600 hover:bg-indigo-500 border-none rounded-xl px-6 h-10 font-bold"
            >
              Publish Event
            </Button>
          </div>
        </Form>
      </Modal>
    </motion.div>
  );
}
