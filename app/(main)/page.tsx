import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import LatestEvents from "@/components/home/LatestEvents";
import OlympiadHistory from "@/components/home/OlympiadHistory";
import AboutOrg from "@/components/home/AboutOrg";
import FounderMessage from "@/components/home/FounderMessage";
import PresidentMessage from "@/components/home/PresidentMessage";
import LeadershipSection from "@/components/home/LeadershipSection";
import GallerySection from "@/components/home/GallerySection";
import ReviewSection from "@/components/home/ReviewSection";
import MissionVision from "@/components/home/MissionVision";
import BlogPreview from "@/components/home/BlogPreview";
import { getPublishedEvents } from "@/lib/events";
import prisma from "@/lib/prisma";

export default async function Home() {
  const events = await getPublishedEvents().catch(() => []);
  const latestBlogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  }).catch(() => []);

  return (
    <div className="pt-20">
      <HeroSection />
      <StatsSection />
      <LatestEvents events={events} />
      <OlympiadHistory />
      <AboutOrg />
      <FounderMessage />
      <PresidentMessage />
      <LeadershipSection />
      <MissionVision />
      <GallerySection />
      <ReviewSection />
      <BlogPreview blogs={latestBlogs} />
    </div>
  );
}
