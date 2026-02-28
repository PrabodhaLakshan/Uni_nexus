// src/app/(protected)/startup-connect/layout.tsx
import { Navbar } from "@/modules/startup-connect/components/Navbar";
import { Footer } from "@/modules/startup-connect/components/Footer";

export default function StartupConnectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20"> {/* Navbar ekata ida thiyanna */}
        {children}
      </main>
      <Footer />
    </div>
  );
  
}
