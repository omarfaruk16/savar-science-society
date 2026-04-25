"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { updatePaymentStatus } from "@/app/actions/admin-actions";

interface PaymentStatusSelectProps {
  registrationId: string;
  initialStatus: string;
}

export default function PaymentStatusSelect({ registrationId, initialStatus }: PaymentStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    startTransition(async () => {
      await updatePaymentStatus(registrationId, newStatus);
    });
  };

  let bgColor = "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
  if (status === "PAID" || status === "COMPLETED") bgColor = "bg-green-500/10 text-green-500 border-green-500/20";
  if (status === "REJECTED") bgColor = "bg-red-500/10 text-red-500 border-red-500/20";

  return (
    <div className="relative inline-block text-left">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={isPending}
        className={`appearance-none text-xs font-bold px-3 py-1.5 pr-8 rounded-full border cursor-pointer outline-none transition-colors ${bgColor}`}
      >
        <option value="PENDING" className="bg-[#0a1410] text-yellow-500">PENDING</option>
        <option value="COMPLETED" className="bg-[#0a1410] text-green-500">COMPLETED</option>
        <option value="REJECTED" className="bg-[#0a1410] text-red-500">REJECTED</option>
      </select>
      {isPending && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Loader2 className="w-3 h-3 animate-spin text-current opacity-70" />
        </div>
      )}
    </div>
  );
}
