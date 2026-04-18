"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, MapPin, School, BookOpen, Edit2, LogOut, Settings, Award, Loader2, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { updateProfile, updatePassword } from "@/app/actions/user-actions";
import { handleSignOut } from "@/app/actions/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProfileClientProps {
  user: any;
  registrations: any[];
}

export default function ProfileClient({ user, registrations }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(user.profileImage);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setStatus({ type: "error", message: "Image size must be less than 2MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const formData = new FormData(e.currentTarget);
    if (imagePreview) {
      formData.append("profileImage", imagePreview);
    }
    const result = await updateProfile(formData);
    setLoading(false);
    if (result.success) {
      setStatus({ type: "success", message: result.success });
      setActiveTab("info");
      router.refresh();
    } else {
      setStatus({ type: "error", message: result.error || "Validation failed" });
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const formData = new FormData(e.currentTarget);
    const result = await updatePassword(formData);
    setLoading(false);
    if (result.success) {
      setStatus({ type: "success", message: result.success });
      setActiveTab("info");
    } else {
      setStatus({ type: "error", message: result.error || "Failed to update password" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
        <div className="card p-6 text-center">
          <div className="w-32 h-32 mx-auto rounded-full bg-[#1a3028] border-4 border-[#22c55e] overflow-hidden relative group mb-4 flex items-center justify-center">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-[#22c55e]" />
            )}
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{user.fullNameEn}</h2>
          <p className="text-sm text-[#a3b8aa] mb-4">Student, Class {user.class}</p>
          <div className="badge w-full justify-center">Registered Member</div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex flex-col">
            <button 
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-3 px-6 py-4 transition-colors font-medium text-left w-full ${activeTab === "info" ? "text-[#f0fdf4] bg-[#1a3028] border-l-4 border-[#22c55e]" : "text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-[#f0fdf4] border-l-4 border-transparent"}`}
            >
              <User className={`w-5 h-5 ${activeTab === "info" ? "text-[#22c55e]" : ""}`} /> Personal Info
            </button>
            <button 
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-3 px-6 py-4 transition-colors font-medium text-left w-full ${activeTab === "events" ? "text-[#f0fdf4] bg-[#1a3028] border-l-4 border-[#22c55e]" : "text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-[#f0fdf4] border-l-4 border-transparent"}`}
            >
              <Award className={`w-5 h-5 ${activeTab === "events" ? "text-[#22c55e]" : ""}`} /> My Events
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 px-6 py-4 transition-colors font-medium text-left w-full ${activeTab === "settings" ? "text-[#f0fdf4] bg-[#1a3028] border-l-4 border-[#22c55e]" : "text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-[#f0fdf4] border-l-4 border-transparent"}`}
            >
              <Settings className={`w-5 h-5 ${activeTab === "settings" ? "text-[#22c55e]" : ""}`} /> Account Settings
            </button>
            <div className="h-[1px] bg-[#1a3028] w-full"></div>
            <form action={handleSignOut} className="w-full">
              <button
                type="submit"
                className="flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-[#1a0505] transition-colors font-medium border-l-4 border-transparent text-left w-full group"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-full md:w-2/3 lg:w-3/4">
        {status && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${status.type === "success" ? "bg-green-500/10 border border-green-500/50 text-green-500" : "bg-red-500/10 border border-red-500/50 text-red-500"}`}>
            {status.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.message}
          </div>
        )}

        {/* Info Tab */}
        {activeTab === "info" && (
          <div className="card p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a3028]">
              <h2 className="text-2xl font-bold text-white">Personal Information</h2>
              <button onClick={() => setActiveTab("edit")} className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><User className="w-4 h-4" /> Full Name (English)</div>
                  <div className="text-[#f0fdf4] font-medium text-lg">{user.fullNameEn}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><User className="w-4 h-4" /> Full Name (Bangla)</div>
                  <div className="text-[#f0fdf4] font-medium text-lg font-bn">{user.fullNameBn}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><Mail className="w-4 h-4" /> Email Address</div>
                  <div className="text-[#f0fdf4] font-medium text-lg">{user.email}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><Calendar className="w-4 h-4" /> Date of Birth</div>
                  <div className="text-[#f0fdf4] font-medium text-lg">
                    {isMounted ? new Date(user.dateOfBirth).toLocaleDateString() : "Loading..."}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><Phone className="w-4 h-4" /> Mobile Number</div>
                  <div className="text-[#f0fdf4] font-medium text-lg">{user.mobileNumber}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><Phone className="w-4 h-4" /> Guardian's Mobile</div>
                  <div className="text-[#f0fdf4] font-medium text-lg">{user.guardianNumber}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><School className="w-4 h-4" /> School Name</div>
                  <div className="text-[#f0fdf4] font-medium text-lg">{user.schoolName}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><BookOpen className="w-4 h-4" /> Class</div>
                  <div className="text-[#f0fdf4] font-medium text-lg">Class {user.class}</div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 text-sm text-[#5a7a68] mb-1"><MapPin className="w-4 h-4" /> Address</div>
                <div className="text-[#f0fdf4] font-medium text-lg">{user.address}</div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Tab */}
        {activeTab === "edit" && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-[#1a3028]">Edit Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-8">
              {/* Profile Image Pick */}
              <div className="flex items-center gap-6 pb-6 border-b border-[#1a3028]">
                <div className="w-24 h-24 rounded-full bg-[#1a3028] border-2 border-dashed border-[#224035] flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-[#22c55e] transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-[#5a7a68] group-hover:text-[#22c55e] transition-colors" />
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/jpeg, image/png" onChange={handleImageChange} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#22c55e]"/> Profile Photo
                  </h4>
                  <p className="text-sm text-[#a3b8aa]">Click the circle to change your photo. <br /> Max 2MB (JPG or PNG).</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Full Name (English)</label>
                  <input name="fullNameEn" defaultValue={user.fullNameEn} className="input" required />
                </div>
                <div>
                  <label className="label">Full Name (Bangla)</label>
                  <input name="fullNameBn" defaultValue={user.fullNameBn} className="input font-bn" required />
                </div>
                <div>
                  <label className="label">Mobile Number</label>
                  <input name="mobileNumber" defaultValue={user.mobileNumber} className="input" required />
                </div>
                <div>
                  <label className="label">Guardian's Number</label>
                  <input name="guardianNumber" defaultValue={user.guardianNumber} className="input" required />
                </div>
                <div>
                  <label className="label">School Name</label>
                  <input name="schoolName" defaultValue={user.schoolName} className="input" required />
                </div>
                <div>
                  <label className="label">Class</label>
                  <select name="class" defaultValue={user.class} className="input">
                    {["6", "7", "8", "9", "10", "11", "12"].map(c => <option key={c} value={c}>Class {c}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label">Address</label>
                  <textarea name="address" defaultValue={user.address} className="input min-h-[100px]" required />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </button>
                <button type="button" onClick={() => setActiveTab("info")} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-[#1a3028]">My Registered Events</h2>
            {registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((reg) => (
                  <div key={reg.id} className="glass p-4 rounded-xl border-[#1a3028] flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">{reg.event.title}</h4>
                      <p className="text-sm text-[#a3b8aa]">
                        {isMounted ? new Date(reg.event.date).toLocaleDateString() : "Loading..."}
                      </p>
                    </div>
                    <Link href={`/events/${reg.event.slug}`} className="text-[#22c55e] hover:underline text-sm font-medium">View Details</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-12 h-12 text-[#1a3028] mx-auto mb-4" />
                <p className="text-[#a3b8aa]">You haven't registered for any events yet.</p>
                <Link href="/events" className="text-[#22c55e] hover:underline mt-2 inline-block">Browse Events</Link>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-[#1a3028]">Account Settings</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Change Password</h3>
                <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="label">Current Password</label>
                    <input name="currentPassword" type="password" className="input" required />
                  </div>
                  <div>
                    <label className="label">New Password</label>
                    <input name="newPassword" type="password" className="input" required />
                  </div>
                  <div>
                    <label className="label">Confirm New Password</label>
                    <input name="confirmPassword" type="password" className="input" required />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" disabled={loading} className="btn-primary">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
