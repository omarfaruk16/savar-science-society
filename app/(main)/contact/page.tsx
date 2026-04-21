"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { submitContactMessage } from "@/app/actions/contact-actions";
import { useState } from "react";

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactMessage(formData);

    setIsPending(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge mb-4">Get In Touch</div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#22c55e] mb-6">
            Contact Us
          </h1>
          <p className="text-[#a3b8aa] text-lg">
            Have questions about our events, membership, or want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl flex items-start gap-5 group hover:border-[#22c55e]/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#1a3028] flex items-center justify-center flex-shrink-0 group-hover:bg-[#22c55e]/20 transition-colors">
                <MapPin className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Our Office</h3>
                <p className="text-[#a3b8aa]">72/C Birulia Road, Mojidpur,<br />Rajar bari, Savar, Dhaka</p>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl flex items-start gap-5 group hover:border-[#22c55e]/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#1a3028] flex items-center justify-center flex-shrink-0 group-hover:bg-[#22c55e]/20 transition-colors">
                <Phone className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-[#a3b8aa]">01522117318<br />01826101160<br />01518405600</p>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl flex items-start gap-5 group hover:border-[#22c55e]/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#1a3028] flex items-center justify-center flex-shrink-0 group-hover:bg-[#22c55e]/20 transition-colors">
                <Mail className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-[#a3b8aa]">savarsciencesociety@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8 md:p-10">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            {success ? (
              <div className="glass p-8 text-center rounded-2xl border-[#22c55e]/30">
                <div className="w-16 h-16 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#22c55e]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-[#a3b8aa]">Thank you for reaching out. We will get back to you as soon as possible.</p>
                <button onClick={() => setSuccess(false)} className="mt-6 text-[#22c55e] font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#a3b8aa] mb-2">Full Name</label>
                    <input type="text" name="name" required className="input" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#a3b8aa] mb-2">Email Address</label>
                    <input type="email" name="email" required className="input" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#a3b8aa] mb-2">Subject</label>
                  <input type="text" name="subject" required className="input" placeholder="How can we help you?" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#a3b8aa] mb-2">Message</label>
                  <textarea name="message" required className="input min-h-[150px] resize-y" placeholder="Type your message here..."></textarea>
                </div>

                {error && (
                  <div className="text-red-500 text-sm font-medium">{error}</div>
                )}

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="max-w-6xl mx-auto mt-16 rounded-2xl overflow-hidden border border-[#1a3028] h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3649.2031756122524!2d90.26187499999999!3d23.846918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDUwJzQ4LjkiTiA5MMKwMTUnNDIuOCJF!5e0!3m2!1sen!2sbd!4v1776530070617!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[50%] contrast-[1.2] opacity-80 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
