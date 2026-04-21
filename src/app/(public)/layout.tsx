import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <main className="flex-grow pt-[88px]">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
