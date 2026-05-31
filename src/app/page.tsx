import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <CinematicHero />
      </main>
      <Footer />
    </>
  );
}
