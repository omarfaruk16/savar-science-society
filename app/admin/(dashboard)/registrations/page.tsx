import prisma from "@/lib/prisma";
import { DollarSign, CheckCircle, XCircle, Clock } from "lucide-react";
import PaymentStatusSelect from "./PaymentStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      event: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Event Registrations</h1>
          <p className="text-[#a3b8aa]">{registrations.length} total registration{registrations.length !== 1 ? "s" : ""}.</p>
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="card p-16 bg-[#0a1410] text-center">
          <DollarSign className="w-12 h-12 text-[#a3b8aa] mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No Registrations Yet</h3>
          <p className="text-[#a3b8aa] text-sm">When users register for events, they will appear here.</p>
        </div>
      ) : (
        <div className="card bg-[#0a1410] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a3028]">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Student</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Event</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Transaction Info</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3028]">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#0f1d17] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white text-sm">{reg.user.fullNameEn}</div>
                      <div className="text-xs text-[#5a7a68]">{reg.user.mobileNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#a3b8aa] text-sm line-clamp-1">{reg.event.title}</div>
                      <div className="text-xs text-[#22c55e] font-bold mt-1">
                        {reg.event.fee === 0 ? "FREE" : `${reg.event.fee} BDT`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {reg.transactionId ? (
                        <div className="text-xs font-mono bg-[#1a3028] text-[#a3b8aa] px-2 py-1 rounded inline-block">
                          {reg.transactionId}
                        </div>
                      ) : (
                        <span className="text-xs text-[#5a7a68] italic">No transaction data</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#a3b8aa]">
                      {new Date(reg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {reg.event.fee === 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#1a3028] text-gray-400">
                          N/A (Free)
                        </span>
                      ) : (
                        <PaymentStatusSelect registrationId={reg.id} initialStatus={reg.paymentStatus} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
