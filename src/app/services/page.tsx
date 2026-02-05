import { PageWrapper } from "@/components/layout/page-wrapper";
import { ServicesContent } from "./services-content";

export const metadata = {
  title: "Services",
  description:
    "Launch Site, MVP Sprint, Startup Under Key, Web3 Add-on. Clear scope, fixed timeline, predictable outcomes. Based in Kyrgyzstan & Dubai.",
};

export default function ServicesPage() {
  return (
    <PageWrapper>
      <ServicesContent />
    </PageWrapper>
  );
}
