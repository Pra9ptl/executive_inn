import React, { useEffect } from "react";
import { Box } from "@mui/joy";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import PhotoGallery from "../components/PhotoGallery";
import Amenities from "../components/Amenities";
import ThingsToDo from "../components/ThingsToDo";
import Contact from "../components/Contact";
import RoomTypes from "../components/RoomTypes";

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const targetId = (location.state as { targetId?: string } | null)?.targetId;
    const hashId = location.hash ? location.hash.substring(1) : undefined;
    const scrollId = targetId || hashId;

    if (scrollId) {
      // Slight delay to allow layout to paint before scrolling
      requestAnimationFrame(() => {
        const el = document.getElementById(scrollId);
        if (el) {
          const navHeight = 70;
          const { top } = el.getBoundingClientRect();
          const offset = top + window.pageYOffset - navHeight;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      });
    }
  }, [location]);

  return (
    <Box className="full-width-bg" id="home">
      <Header />
      <AboutUs />
      <PhotoGallery />
      <Amenities />
      <ThingsToDo />
      <RoomTypes />
      <Contact />
    </Box>
  );
};

export default Home;
