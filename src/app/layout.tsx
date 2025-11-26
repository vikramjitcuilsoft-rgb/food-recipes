import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import "../styles/globals.css";

export const metadata = {
  title: "Food Recipes",
  description: "Browse free food recipes using public APIs.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Providers>
          <Navbar />

          {/* 👇 do NOT wrap with max-w here */}
          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
