import { getContactMessages, deleteContactMessage } from "@/app/actions/contact-actions";
import { Mail, Calendar, Trash2, User, FileText } from "lucide-react";
import DeleteButton from "../DeleteButton";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-[#a3b8aa]">Manage incoming inquiries from the contact form.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.length === 0 ? (
          <div className="glass p-12 text-center rounded-3xl border-[#1a3028]">
            <Mail className="w-12 h-12 text-[#1a3028] mx-auto mb-4" />
            <p className="text-[#a3b8aa]">No messages yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="glass p-8 rounded-3xl border-[#1a3028] hover:border-[#22c55e]/30 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <User className="w-4 h-4 text-[#22c55e]" /> {msg.name}
                    </div>
                    <div className="flex items-center gap-2 text-[#a3b8aa]">
                      <Mail className="w-4 h-4 text-[#22c55e]" /> {msg.email}
                    </div>
                    <div className="flex items-center gap-2 text-[#a3b8aa]">
                      <Calendar className="w-4 h-4 text-[#22c55e]" /> {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#22c55e]" /> {msg.subject}
                    </h3>
                    <p className="text-[#a3b8aa] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DeleteButton 
                    label="message"
                    action={async () => {
                      "use server";
                      await deleteContactMessage(msg.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
