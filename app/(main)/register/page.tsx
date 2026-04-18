import { getPublishedEvents } from "@/lib/events";
import RegistrationForm from "@/components/auth/RegistrationForm";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const events = await getPublishedEvents();
  const openEvents = events.filter(e => e.isRegistrationOpen);

  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto px-4">
        <Suspense fallback={
          <div className="flex items-center justify-center p-20">
            <Loader2 className="w-10 h-10 text-[#22c55e] animate-spin" />
          </div>
        }>
          <RegistrationForm events={openEvents} />
        </Suspense>
      </div>
    </div>
  );
}
