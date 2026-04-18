"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, UserPlus, Upload, Loader2, Trophy, DollarSign, Wallet } from "lucide-react";
import { registerStudent } from "@/app/register/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { EventData } from "@/lib/events";

interface RegistrationFormProps {
  events: EventData[];
}

export default function RegistrationForm({ events }: RegistrationFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedEventId = searchParams.get("event");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState(preSelectedEventId || "");
  
  const selectedEvent = events.find(e => e.id === selectedEventId);
  const requiresPayment = selectedEvent && selectedEvent.fee > 0;

  useEffect(() => {
    if (preSelectedEventId) {
      setSelectedEventId(preSelectedEventId);
    }
  }, [preSelectedEventId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!selectedEventId) {
        setError("Please select an event to register for.");
        setLoading(false);
        return;
      }

      if (requiresPayment && !formData.get("transactionId")) {
        setError("Transaction ID is required for events with fees.");
        setLoading(false);
        return;
      }
      
      // Append base64 image if exists
      if (imagePreview) {
        formData.append("profileImage", imagePreview);
      }

      formData.set("eventId", selectedEventId);

      const result = await registerStudent(formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-32 pb-16 bg-[#050d0a] min-h-screen flex flex-col items-center justify-center">
        <div className="card p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-[#16a34a] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-[#a3b8aa] mb-4">You have successfully registered for <strong>{selectedEvent?.title}</strong>.</p>
          <p className="text-[#a3b8aa] mb-8 text-sm">Redirecting to your profile...</p>
          <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="badge mb-4">Event Registration</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Student & Event Signup</h1>
        <p className="text-[#a3b8aa] text-sm">Create your account and register for an upcoming event at once.</p>
      </div>

      <div className="card p-8 md:p-10 relative">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {/* Step 1: Event Selection */}
          <div className="space-y-6 bg-[#0a1410] p-6 rounded-2xl border border-[#1a3028]">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#22c55e]" /> Select Event
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#a3b8aa] mb-2">Choose an Event *</label>
                <select 
                  className="input w-full" 
                  value={selectedEventId} 
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select an upcoming event</option>
                  {events.map(e => (
                    <option key={e.id} value={e.id}>{e.title}</option>
                  ))}
                </select>
              </div>
              
              {selectedEvent && (
                <div className="bg-[#1a3028]/50 p-4 rounded-xl border border-[#224035] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#a3b8aa] uppercase font-bold tracking-wider mb-1">Registration Fee</div>
                    <div className="text-xl font-black text-white flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-[#22c55e]" />
                      {selectedEvent.fee === 0 ? "FREE" : `${selectedEvent.fee} BDT`}
                    </div>
                  </div>
                  <Wallet className="w-10 h-10 text-[#22c55e]/20" />
                </div>
              )}
            </div>

            {requiresPayment && (
              <div className="bg-yellow-500/5 border border-yellow-500/20 p-5 rounded-xl">
                 <h4 className="text-sm font-bold text-yellow-500 mb-2">Payment Required</h4>
                 <p className="text-xs text-[#a3b8aa] leading-relaxed mb-4">
                   This event has a registration fee. Please pay the amount to our <strong>Official bKash/Nagad Number: 01XXX-XXXXXX</strong> and provide the transaction ID below.
                 </p>
                 <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Transaction ID *</label>
                 <input type="text" name="transactionId" className="input bg-[#050d0a]" placeholder="TRX123MSD..." required />
              </div>
            )}
          </div>

          <div className="h-px bg-[#1a3028]" />

          {/* Step 2: Student Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#22c55e]" /> Student Information
            </h3>

            {/* Profile Pic */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-[#1a3028] border-2 border-dashed border-[#224035] flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-[#22c55e] transition-colors">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserPlus className="w-8 h-8 text-[#5a7a68] group-hover:text-[#22c55e] transition-colors" />
                )}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/jpeg, image/png" onChange={handleImageChange} />
              </div>
              <div className="text-sm text-[#a3b8aa]">
                <div className="font-medium text-white mb-1 flex items-center gap-2">
                   <Upload className="w-4 h-4"/> Profile Image 
                </div>
                Only JPG or PNG images. Max size 2MB.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Full Name (English) *</label>
                <input type="text" name="fullNameEn" className="input" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Full Name (Bangla) *</label>
                <input type="text" name="fullNameBn" className="input font-bn" placeholder="জন ডো" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Email Address *</label>
                <input type="email" name="email" className="input" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Mobile Number *</label>
                <input type="tel" name="mobileNumber" className="input" placeholder="01XXX-XXXXXX" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Guardian's Mobile Number *</label>
                <input type="tel" name="guardianNumber" className="input" placeholder="01XXX-XXXXXX" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Date of Birth *</label>
                <input type="date" name="dateOfBirth" className="input text-[#a3b8aa]" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">School Name *</label>
                <input type="text" name="schoolName" className="input" placeholder="Savar Cantonment Public School" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Class *</label>
                <select name="class" className="input text-[#a3b8aa]" required defaultValue="">
                  <option value="" disabled>Select class</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="SSC">SSC Candidate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Full Address *</label>
              <textarea name="address" className="input min-h-[100px] resize-y" placeholder="Your current residential address..." required></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#1a3028] pt-8">
            <div>
              <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Password *</label>
              <input type="password" name="password" className="input" placeholder="••••••••" required minLength={6} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Confirm Password *</label>
              <input type="password" name="confirmPassword" className="input" placeholder="••••••••" required minLength={6} />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Complete Registration"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-[#a3b8aa]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#22c55e] hover:text-white transition-colors group">
            Sign in here <ArrowRight className="inline-block w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </p>
      </div>
    </div>
  );
}
