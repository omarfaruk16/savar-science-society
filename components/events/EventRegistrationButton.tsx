"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, DollarSign, Wallet, CreditCard } from "lucide-react";
import { registerForEvent } from "@/app/(main)/events/actions";

interface EventRegistrationButtonProps {
  event: {
    id: string;
    title: string;
    slug: string;
    fee: number;
    isRegistrationOpen: boolean;
  };
  isLoggedIn: boolean;
}

export default function EventRegistrationButton({ event, isLoggedIn }: EventRegistrationButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegisterClick = () => {
    if (!isLoggedIn) {
      // Redirect to login with callback URL to return here
      router.push(`/login?callbackUrl=/events/${event.slug}`);
      return;
    }

    if (event.fee === 0) {
      // If free, just register immediately
      submitRegistration(new FormData());
    } else {
      // Show payment form
      setShowPaymentForm(true);
    }
  };

  const submitRegistration = (formData: FormData) => {
    setError(null);
    formData.set("eventId", event.id);

    startTransition(async () => {
      const result = await registerForEvent(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        // Redirect to profile
        router.push("/profile");
      }
    });
  };

  if (!event.isRegistrationOpen) {
    return (
      <button disabled className="btn-primary w-full justify-center text-lg py-4 opacity-50 cursor-not-allowed">
        Registration Closed
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {!showPaymentForm ? (
        <button 
          onClick={handleRegisterClick} 
          disabled={isPending}
          className="btn-primary w-full justify-center text-lg py-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "Register Now"}
        </button>
      ) : (
        <div className="bg-[#1a3028] p-5 rounded-xl border border-[#224035] space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#22c55e]" />
              Payment Details
            </h4>
            <button 
              onClick={() => setShowPaymentForm(false)}
              className="text-xs text-[#a3b8aa] hover:text-white"
            >
              Cancel
            </button>
          </div>
          
          <div className="bg-[#0a1410] p-3 rounded-lg text-sm text-[#a3b8aa] border border-[#1a3028]">
            Please send <strong className="text-[#22c55e]">{event.fee} BDT</strong> to our official number:<br/>
            <span className="text-white block mt-1 text-base">bKash/Nagad: <strong>017XXXXXXXX</strong></span>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-md">
              {error}
            </div>
          )}

          <form action={submitRegistration} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#f0fdf4] mb-1">Payment Method *</label>
              <select name="paymentMethod" required className="input w-full text-sm py-2">
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[#f0fdf4] mb-1">Sender Number *</label>
              <input type="tel" name="paymentNumber" required placeholder="017..." className="input w-full text-sm py-2" />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#f0fdf4] mb-1">Transaction ID *</label>
              <input type="text" name="transactionId" required placeholder="TrxID" className="input w-full text-sm py-2 uppercase" />
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Payment & Register"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
