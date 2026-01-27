import React, { useEffect } from "react";
import { Box } from "@mui/joy";
import Booking from "../components/Booking";

const BookingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box className="full-width-bg" id="booking-page">
      <Booking />
    </Box>
  );
};

export default BookingPage;
