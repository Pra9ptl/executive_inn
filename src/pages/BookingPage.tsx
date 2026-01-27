import React from "react";
import { Box } from "@mui/joy";
import Booking from "../components/Booking";

const BookingPage: React.FC = () => {
  return (
    <Box className="full-width-bg" id="booking-page">
      <Booking />
    </Box>
  );
};

export default BookingPage;
