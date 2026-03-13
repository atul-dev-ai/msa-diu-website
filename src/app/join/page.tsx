"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  UserOutlined,
  IdcardOutlined,
  BookOutlined,
  PhoneOutlined,
  HomeOutlined,
  SendOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const JoinPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Form Status State 🔹
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [closedMessage, setClosedMessage] = useState("");
  const [checkingStatus, setCheckingStatus] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    department: "",
    batch: "",
    phone: "",
    bloodGroup: "",
    upazila: "",
  });

  // 🔹 Check if form is ON or OFF 🔹
  useEffect(() => {
    const checkFormStatus = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .single();
      if (data) {
        setIsFormOpen(data.is_accepting_members);
        setClosedMessage(data.closed_message);
      }
      setCheckingStatus(false);
    };
    checkFormStatus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: supabaseError } = await supabase.from("members").insert([
        {
          full_name: formData.fullName,
          student_id: formData.studentId,
          department: formData.department,
          batch: formData.batch,
          phone: formData.phone,
          blood_group: formData.bloodGroup,
          upazila: formData.upazila,
          status: "pending",
        },
      ]);

      if (supabaseError) throw supabaseError;
      setSuccess(true);
      setFormData({
        fullName: "",
        studentId: "",
        department: "",
        batch: "",
        phone: "",
        bloodGroup: "",
        upazila: "",
      });
    } catch (err: any) {
      setError(
        err.message || "Failed to submit application. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="mb-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-slate-400 hover:text-slate-500 font-medium transition-all cursor-pointer py-2 border px-5 rounded-2xl border-slate-400 drop-shadow-emerald-300 shadow-xl hover:drop-shadow-emerald-500 hover:-translate-y-1 hover:scale-105 duration-300 group">
              <ArrowLeftOutlined className="group-hover:-translate-x-2 group-hover:scale-100 transition duration-300 " /> Back to Home
            </button>
          </Link>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Become a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Member
              </span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              Join the Manikganj Student Association at DIU.
            </p>
          </div>

          {/* 🔹 IF FORM IS CLOSED SHOW THIS MESSAGE 🔹 */}
          {!isFormOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center"
            >
              <WarningOutlined className="text-5xl text-amber-500 mb-4" />
              <h3 className="text-2xl font-bold text-amber-800 mb-3">
                Applications Closed
              </h3>
              <p className="text-amber-700 font-medium">{closedMessage}</p>
            </motion.div>
          ) : (
            /* 🔹 ELSE SHOW THE FORM (Rest of the previous code) 🔹 */
            <AnimatePresence>
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50/80 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <CheckCircleOutlined className="text-5xl text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-green-600 mb-6">
                    Your application is currently{" "}
                    <span className="font-bold">Pending</span>. We will review
                    it soon.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-colors"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 text-center">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <UserOutlined className="text-indigo-500" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Md. Rahim"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <IdcardOutlined className="text-indigo-500" /> Student
                        ID
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        required
                        value={formData.studentId}
                        onChange={handleChange}
                        placeholder="e.g. 211-15-14***"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <BookOutlined className="text-indigo-500" /> Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g. CSE"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <BookOutlined className="text-indigo-500" /> Batch
                      </label>
                      <input
                        type="text"
                        name="batch"
                        required
                        value={formData.batch}
                        onChange={handleChange}
                        placeholder="e.g. 59th"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <PhoneOutlined className="text-indigo-500" /> Phone
                        Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="017********"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <UserOutlined className="text-indigo-500" /> Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        required
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full cursor-pointer bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="" disabled>
                          Select Blood Group
                        </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <HomeOutlined className="text-indigo-500" /> Upazila
                      (Manikganj)
                    </label>
                    <select
                      name="upazila"
                      required
                      value={formData.upazila}
                      onChange={handleChange}
                      className="w-full cursor-pointer bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="" disabled>
                        Select Upazila
                      </option>
                      <option value="Manikganj Sadar">Manikganj Sadar</option>
                      <option value="Singair">Singair</option>
                      <option value="Saturia">Saturia</option>
                      <option value="Ghior">Ghior</option>
                      <option value="Shivalaya">Shivalaya</option>
                      <option value="Harirampur">Harirampur</option>
                      <option value="Daulatpur">Daulatpur</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Application <SendOutlined />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default JoinPage;
