import AboutComponent from "../components/HomeComponents/AboutComponent";
import Header from "../components/Header";
import Hero from "../components/HomeComponents/Hero";
import RecentOffers from "../components/HomeComponents/RecentOffers";
import BannerRegister from "../components/HomeComponents/BannerRegister";
import Testimonial from "../components/HomeComponents/Testimonial";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />  
      <AboutComponent />
      <RecentOffers />
      <Testimonial />
      <BannerRegister />
      <Footer />
    </div>
  )
}
