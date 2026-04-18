"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });

      if (res?.error) {
        setError("Invalid admin credentials.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred during login.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050d0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#16a34a]/20 flex items-center justify-center mx-auto mb-4 border border-[#22c55e]/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <Lock className="w-8 h-8 text-[#22c55e]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin CMS</h1>
          <p className="text-[#a3b8aa]">Savar Science Society</p>
        </div>

        <div className="card p-8 bg-[#0a1410] border-[#1a3028]">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#5a7a68]" />
                </div>
                <input 
                  type="text" 
                  name="identifier"
                  className="input pl-10" 
                  placeholder="admin_username" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#f0fdf4] mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#5a7a68]" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  className="input pl-10" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
