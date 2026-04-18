import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import LatestEvents from "@/components/home/LatestEvents";
import AboutOrg from "@/components/home/AboutOrg";
import FounderMessage from "@/components/home/FounderMessage";
import PresidentMessage from "@/components/home/PresidentMessage";
import GallerySection from "@/components/home/GallerySection";
import ReviewSection from "@/components/home/ReviewSection";
import MissionVision from "@/components/home/MissionVision";
import BlogPreview from "@/components/home/BlogPreview";
import { getPublishedEvents } from "@/lib/events";
import prisma from "@/lib/prisma";

export default async function Home() {
  const events = await getPublishedEvents();
  const latestBlogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="pt-20">
      <HeroSection />
      <StatsSection />
      <LatestEvents events={events} />
      <AboutOrg />
      <FounderMessage />
      <PresidentMessage />
      <MissionVision />
      <GallerySection />
      <ReviewSection />
      <BlogPreview blogs={latestBlogs} />
    </div>
  );
}
