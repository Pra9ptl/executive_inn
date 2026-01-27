import emailjs from "@emailjs/browser";
import {
  ArrowBack,
  ArrowForward,
  Check,
  CheckCircle,
  Email,
  Phone
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Textarea,
  Typography
} from "@mui/joy";
import React, { useState } from "react";

interface BookingData {
  checkIn: string;
  checkOut: string;
  roomType: string;
  smokingPreference: "smoking" | "non-smoking";
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  zipCode: string;
}

interface BookingProps {
  isModal?: boolean;
  open?: boolean;
  onClose?: () => void;
  preselectedRoom?: string;
}

const Booking: React.FC<BookingProps> = ({
  isModal = false,
  open = false,
  onClose,
  preselectedRoom = "",
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Get today's date in YYYY-MM-DD format for date input min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get the minimum checkout date (day after checkin or today, whichever is later)
  const getMinCheckoutDate = () => {
    if (bookingData.checkIn) {
      const checkinDate = new Date(bookingData.checkIn);
      checkinDate.setDate(checkinDate.getDate() + 1); // Add one day
      const nextDay = checkinDate.toISOString().split("T")[0];
      const today = getTodayDate();
      return nextDay > today ? nextDay : today;
    }
    return getTodayDate();
  };

  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    roomType: preselectedRoom,
    smokingPreference: "non-smoking",
    guests: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    zipCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBillingErrors, setShowBillingErrors] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Stay Details",
      description: "Select dates and room preferences",
    },
    {
      id: 2,
      title: "Guest Information",
      description: "Enter your personal details",
    },
    {
      id: 3,
      title: "Pricing Details",
      description: "Review pricing breakdown",
    },
    {
      id: 4,
      title: "Billing Details",
      description: "Complete your payment information",
    },
  ];

  // Send booking details using EmailJS (client-side)
  const sendBookingEmail = async (payload: {
    booking: BookingData;
    pricing: ReturnType<typeof calculatePricing>;
  }) => {
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const templateId = process.env.REACT_APP_EMAILJS_BOOKING_TEMPLATE_ID;

    if (!serviceId || !publicKey || !templateId) {
      const missingVars = [];
      if (!serviceId) missingVars.push("REACT_APP_EMAILJS_SERVICE_ID");
      if (!publicKey) missingVars.push("REACT_APP_EMAILJS_PUBLIC_KEY");
      if (!templateId) missingVars.push("REACT_APP_EMAILJS_BOOKING_TEMPLATE_ID");
      const errorMsg = `EmailJS configuration incomplete. Missing: ${missingVars.join(", ")}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      const { booking, pricing } = payload;
      const roomLabel =
        roomTypes
          .find((r) => r.value === booking.roomType)
          ?.label.split(" - ")[0] || booking.roomType;

      // Format dates for template
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      };

      const templateParams = {
        // Routing
        to_email: 'exeinnbaker@gmail.com',
        from_email: booking.email,

        // Stay Details
        checkInDate: formatDate(booking.checkIn),
        checkOutDate: formatDate(booking.checkOut),
        nights: pricing?.nights ?? 1,
        roomType: roomLabel,
        guests: booking.guests,
        preference:
          booking.smokingPreference === "non-smoking"
            ? "Non-Smoking"
            : "Smoking",

        // Guest Information
        guestName: `${booking.firstName} ${booking.lastName}`,
        guestEmail: booking.email,
        guestPhone: booking.phone,
        specialRequests: booking.specialRequests || "None",

        // Pricing
        basePrice: pricing ? `$${pricing.baseAmount.toFixed(2)}` : "$0.00",
        subtotal: pricing ? `$${pricing.subtotal.toFixed(2)}` : "$0.00",
        tax: pricing ? `$${pricing.tax.toFixed(2)}` : "$0.00",
        total: pricing ? `$${pricing.total.toFixed(2)}` : "$0.00",

        // Billing Details
        cardHolderName: booking.cardName,
        cardNumber: booking.cardNumber,
        cardExpiry: booking.cardExpiry,
        authorizationCode: booking.cardCvv,
        billingZip: booking.zipCode,
      } as Record<string, any>;

      console.log("Sending booking email with params:", templateParams);
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey },
      );

      if (response.status !== 200) {
        throw new Error(`EmailJS send failed with status ${response.status}`);
      }

      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Error in sendBookingEmail:", error);
      throw error;
    }
  };

  const isValidExpiry = (exp: string) => {
    const match = exp.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;

    const month = Number(match[1]);
    const year = Number(match[2]);
    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          bookingData.checkIn &&
          bookingData.checkOut &&
          bookingData.roomType
        );
      case 2:
        return !!(
          bookingData.firstName &&
          bookingData.lastName &&
          bookingData.email &&
          bookingData.phone
        );
      case 3:
        return true; // Pricing step is always valid
      case 4:
        return !!(
          bookingData.cardName.trim() &&
          bookingData.cardNumber.replace(/\D/g, "").length === 16 &&
          isValidExpiry(bookingData.cardExpiry.trim()) &&
          bookingData.cardCvv.trim().length === 3 &&
          bookingData.zipCode.trim().length === 5 &&
          calculatePricing()
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CustomStepper = () => (
    <Box sx={{ mb: { xs: 0.5, sm: 1 }, px: { xs: 0.5, sm: 1 } }}>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 24, sm: 28 },
                height: { xs: 24, sm: 28 },
                borderRadius: "50%",
                backgroundColor:
                  currentStep > step.id
                    ? "#10b981"
                    : currentStep === step.id
                      ? "#3b82f6"
                      : "#f1f5f9",
                color: currentStep >= step.id ? "white" : "#64748b",
                fontSize: { xs: "11px", sm: "12px" },
                fontWeight: "bold",
                transition: "all 0.3s ease",
                boxShadow:
                  currentStep === step.id
                    ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                    : "none",
              }}
            >
              {currentStep > step.id ? (
                <Check sx={{ fontSize: { xs: 12, sm: 14 } }} />
              ) : (
                step.id
              )}
            </Box>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  height: 2,
                  width: { xs: 20, sm: 32 },
                  backgroundColor:
                    currentStep > step.id ? "#10b981" : "#e2e8f0",
                  transition: "background-color 0.3s ease",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Stack>
      <Typography
        level="body-sm"
        sx={{
          textAlign: "center",
          color: "#64748b",
          mt: 0.5,
          fontSize: { xs: "11px", sm: "12px" },
          fontWeight: 500,
        }}
      >
        {steps.find((step) => step.id === currentStep)?.description}
      </Typography>
    </Box>
  );

  const handleInputChange = (
    field: keyof BookingData,
    value: string | number,
  ) => {
    setBookingData((prev) => {
      const newData = {
        ...prev,
        [field]: value,
      };

      // If checkin date changed, validate checkout date
      if (field === "checkIn" && value && prev.checkOut) {
        const checkinDate = new Date(value as string);
        const checkoutDate = new Date(prev.checkOut);

        // If checkout is not after checkin, clear it
        if (checkoutDate <= checkinDate) {
          newData.checkOut = "";
        }
      }

      // If room type changed, validate guest count
      if (field === "roomType" && value) {
        const guestOptions =
          value === "king-single"
            ? [{ value: 1 }, { value: 2 }]
            : [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

        // If current guest count exceeds new room capacity, reset to max allowed
        const maxGuests = Math.max(...guestOptions.map((opt) => opt.value));
        if (prev.guests > maxGuests) {
          newData.guests = maxGuests;
        }
      }

      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only submit if on the final step
    if (currentStep !== totalSteps) {
      return;
    }

    // Re-validate billing fields on submit
    if (!validateStep(4)) {
      setShowBillingErrors(true);
      return;
    }

    // Basic validation
    if (
      !bookingData.checkIn ||
      !bookingData.checkOut ||
      !bookingData.roomType ||
      !bookingData.firstName ||
      !bookingData.lastName ||
      !bookingData.email ||
      !bookingData.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const pricing = calculatePricing();
    if (!pricing) {
      alert("Please complete your stay details to calculate pricing.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendBookingEmail({ booking: bookingData, pricing });

      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log("Booking submitted:", bookingData);

      // Close modal after successful submission if in modal mode
      if (isModal && onClose) {
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(1); // Reset to first step
              setShowBillingErrors(false);
          onClose();
          // Reset form
          setBookingData({
            checkIn: "",
            checkOut: "",
            roomType: "",
            smokingPreference: "non-smoking",
            guests: 1,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            specialRequests: "",
            cardName: "",
            cardNumber: "",
            cardExpiry: "",
            cardCvv: "",
            zipCode: "",
          });
        }, 3000); // Show success message for 3 seconds
      }
    } catch (error) {
      console.error("Error sending booking email:", error);
      setIsSubmitting(false);
      alert("There was an issue sending your booking email. Please try again.");
    }
  };

  const roomTypes = [
    {
      value: "king-single",
      label: "King / Single Bed - $75/night",
    },
    {
      value: "full-double",
      label: "Full / Double Bed - $82/night",
    },
  ];

  // Get available guest options based on room type
  const getGuestOptions = () => {
    if (bookingData.roomType === "king-single") {
      return [
        { value: 1, label: "1 Guest" },
        { value: 2, label: "2 Guests" },
      ];
    }
    // Default to full options for double bed and when no room is selected
    return [
      { value: 1, label: "1 Guest" },
      { value: 2, label: "2 Guests" },
      { value: 3, label: "3 Guests" },
      { value: 4, label: "4 Guests" },
    ];
  };

  if (isSubmitted) {
    if (isModal) {
      return (
        <Modal open={true} onClose={() => {}}>
          <ModalDialog>
            <ModalClose
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                if (onClose) onClose();
              }}
            />
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CheckCircle sx={{ fontSize: 64, color: "#10b981", mb: 3 }} />
              <Typography level="h4" sx={{ color: "#0f172a", mb: 2 }}>
                Booking Request Submitted!
              </Typography>
            </Box>
          </ModalDialog>
        </Modal>
      );
    }

    return (
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        }}
      >
        <Container maxWidth="md">
          <Card sx={{ p: 6, textAlign: "center", background: "white" }}>
            <CheckCircle sx={{ fontSize: 64, color: "#10b981", mb: 3 }} />
            <Typography level="h2" sx={{ color: "#0f172a", mb: 2 }}>
              Booking Request Submitted!
            </Typography>
            <Typography level="body-lg" sx={{ color: "#64748b", mb: 4 }}>
              Thank you for your booking request. We'll contact you within 24
              hours to confirm your reservation.
            </Typography>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setBookingData({
                  checkIn: "",
                  checkOut: "",
                  roomType: "",
                  smokingPreference: "non-smoking",
                  guests: 1,
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  specialRequests: "",
                  cardName: "",
                  cardNumber: "",
                  cardExpiry: "",
                  cardCvv: "",
                  zipCode: "",
                });
              }}
              sx={{ px: 4, py: 2 }}
            >
              Make Another Booking
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  const calculatePricing = () => {
    if (
      !bookingData.checkIn ||
      !bookingData.checkOut ||
      !bookingData.roomType
    ) {
      return null;
    }

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (nights <= 0) return null;

    const roomRate = bookingData.roomType === "king-single" ? 75 : 82;
    const baseAmount = roomRate * nights;

    let extraGuestsAmount = 0;
    if (bookingData.roomType === "full-double" && bookingData.guests > 2) {
      extraGuestsAmount = (bookingData.guests - 2) * 10;
    }

    const subtotal = baseAmount + extraGuestsAmount;
    const tax = subtotal * 0.2;
    const total = subtotal + tax;

    return {
      nights,
      baseAmount,
      extraGuestsAmount,
      subtotal,
      tax,
      total,
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // STEP 1: STAY DETAILS
        return (
          <Stack spacing={2.5}>
            <Typography
              level="h4"
              sx={{ color: "#1e293b", fontWeight: 700, textAlign: "center" }}
            >
              📅 Stay Details
            </Typography>

            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <FormControl required>
                  <FormLabel
                    sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}
                  >
                    Check-In Date
                  </FormLabel>
                  <Input
                    type="date"
                    value={bookingData.checkIn}
                    onChange={(e) =>
                      handleInputChange("checkIn", e.target.value)
                    }
                    slotProps={{
                      input: { min: getTodayDate() },
                    }}
                    sx={{
                      fontSize: "15px",
                      "& input": { fontSize: "15px" },
                      borderRadius: "8px",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl required>
                  <FormLabel
                    sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}
                  >
                    Check-Out Date
                  </FormLabel>
                  <Input
                    type="date"
                    value={bookingData.checkOut}
                    onChange={(e) =>
                      handleInputChange("checkOut", e.target.value)
                    }
                    slotProps={{
                      input: { min: getMinCheckoutDate() },
                    }}
                    sx={{
                      fontSize: "15px",
                      "& input": { fontSize: "15px" },
                      borderRadius: "8px",
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <FormControl required>
                  <FormLabel
                    sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}
                  >
                    Room Type
                  </FormLabel>
                  <Select
                    value={bookingData.roomType}
                    onChange={(_, value) =>
                      handleInputChange("roomType", value || "")
                    }
                    placeholder="Select a room"
                    sx={{ fontSize: "15px", borderRadius: "8px" }}
                  >
                    {roomTypes.map((room) => (
                      <Option
                        key={room.value}
                        value={room.value}
                        sx={{ fontSize: "15px" }}
                      >
                        {room.label}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl required>
                  <FormLabel
                    sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}
                  >
                    Number of Guests
                  </FormLabel>
                  <Select
                    value={bookingData.guests}
                    onChange={(_, value) =>
                      handleInputChange("guests", value || 1)
                    }
                    sx={{ fontSize: "15px", borderRadius: "8px" }}
                  >
                    {getGuestOptions().map((option) => (
                      <Option
                        key={option.value}
                        value={option.value}
                        sx={{ fontSize: "15px" }}
                      >
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                  <Typography
                    level="body-xs"
                    sx={{ color: "#94a3b8", mt: 0.75 }}
                  >
                    {bookingData.roomType === "full-double" &&
                      "NOTE: 3rd and 4th guests incur a $10/night/head surcharge."}
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>

            <Box
              sx={{
                p: 2.5,
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    size="sm"
                    color="primary"
                    variant="soft"
                    sx={{ fontWeight: 700 }}
                  >
                    🛌 Room Preference
                  </Chip>
                </Box>
              </Stack>

              <Grid container spacing={1.5}>
                {[
                  {
                    value: "non-smoking",
                    label: "Non-Smoking",
                    icon: "🏠",
                    detail: "Fresh air, no indoor smoking",
                    accent: "#10b981",
                  },
                  {
                    value: "smoking",
                    label: "Smoking",
                    icon: "🚬",
                    detail: "Designated smoking rooms",
                    accent: "#f59e0b",
                  },
                ].map((option) => {
                  const isSelected =
                    bookingData.smokingPreference === option.value;
                  return (
                    <Grid xs={12} sm={6} key={option.value}>
                      <Box
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          handleInputChange("smokingPreference", option.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleInputChange(
                              "smokingPreference",
                              option.value,
                            );
                          }
                        }}
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          borderRadius: "10px",
                          border: "2px solid",
                          borderColor: isSelected ? option.accent : "#e2e8f0",
                          backgroundColor: isSelected
                            ? "rgba(16, 185, 129, 0.06)"
                            : "white",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: isSelected
                            ? "0 10px 30px rgba(16, 185, 129, 0.15)"
                            : "none",
                          "&:hover": {
                            borderColor: option.accent,
                            boxShadow: "0 8px 24px rgba(99, 102, 241, 0.08)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            backgroundColor: isSelected
                              ? option.accent
                              : "#e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          {option.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            level="body-md"
                            sx={{ fontWeight: 700, color: "#0f172a" }}
                          >
                            {option.label}
                          </Typography>
                          <Typography level="body-sm" sx={{ color: "#475569" }}>
                            {option.detail}
                          </Typography>
                        </Box>
                        {isSelected && (
                          <Chip
                            size="sm"
                            color="success"
                            variant="soft"
                            sx={{ fontWeight: 700 }}
                          >
                            Selected
                          </Chip>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              <Typography level="body-xs" sx={{ color: "#94a3b8", mt: 1.5 }}>
                We do our best to honor your preference. Non-smoking rooms are
                prioritized when available.
              </Typography>
            </Box>
          </Stack>
        );

      case 2:
        // STEP 2: GUEST INFORMATION
        return (
          <Stack spacing={2.5}>
            <Typography
              level="h4"
              sx={{ color: "#1e293b", fontWeight: 700, textAlign: "center" }}
            >
              👤 Guest Information
            </Typography>

            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <FormControl required>
                  <FormLabel
                    sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}
                  >
                    First Name
                  </FormLabel>
                  <Input
                    value={bookingData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="John"
                    sx={{ fontSize: "15px", borderRadius: "8px" }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl required>
                  <FormLabel
                    sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}
                  >
                    Last Name
                  </FormLabel>
                  <Input
                    value={bookingData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Doe"
                    sx={{ fontSize: "15px", borderRadius: "8px" }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControl required>
              <FormLabel sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}>
                Email Address
              </FormLabel>
              <Input
                type="email"
                value={bookingData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                startDecorator={
                  <Email sx={{ color: "#64748b", fontSize: "18px" }} />
                }
                sx={{ fontSize: "15px", borderRadius: "8px" }}
              />
            </FormControl>

            <FormControl required>
              <FormLabel sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}>
                Phone Number
              </FormLabel>
              <Input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(225) 555-0123"
                startDecorator={
                  <Phone sx={{ color: "#64748b", fontSize: "18px" }} />
                }
                sx={{ fontSize: "15px", borderRadius: "8px" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ fontSize: "14px", fontWeight: 600, mb: 0.75 }}>
                Special Requests
              </FormLabel>
              <Textarea
                value={bookingData.specialRequests}
                onChange={(e) =>
                  handleInputChange("specialRequests", e.target.value)
                }
                placeholder="Any special requests or notes..."
                minRows={3}
                sx={{ fontSize: "15px", borderRadius: "8px" }}
              />
              <Typography level="body-xs" sx={{ color: "#94a3b8", mt: 0.75 }}>
                (Optional) Let us know if you have any special requests
              </Typography>
            </FormControl>
          </Stack>
        );

      case 3: {
        // STEP 3: PRICING DETAILS (Auto-calculated)
        const pricing = calculatePricing();
        const roomLabel =
          roomTypes
            .find((r) => r.value === bookingData.roomType)
            ?.label.split(" - ")[0] || "N/A";
        const nights = pricing?.nights || 0;

        return (
          <Stack spacing={2.5}>
            <Typography
              level="h4"
              sx={{ color: "#1e293b", fontWeight: 700, textAlign: "center" }}
            >
              💰 Pricing Details
            </Typography>

            {pricing ? (
              <Stack spacing={1.5}>
                {/* Summary Card */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f0f9ff",
                    borderRadius: "8px",
                    border: "2px solid #0ea5e9",
                    mb: 1,
                  }}
                >
                  <Grid container spacing={1.5}>
                    <Grid xs={6}>
                      <Box>
                        <Typography
                          level="body-xs"
                          sx={{ color: "#0284c7", fontWeight: 700, mb: 0.5 }}
                        >
                          Room Type
                        </Typography>
                        <Typography
                          level="body-md"
                          sx={{ color: "#0f172a", fontWeight: 700 }}
                        >
                          {roomLabel}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box>
                        <Typography
                          level="body-xs"
                          sx={{ color: "#0284c7", fontWeight: 700, mb: 0.5 }}
                        >
                          Number of Nights
                        </Typography>
                        <Typography
                          level="body-md"
                          sx={{ color: "#0f172a", fontWeight: 700 }}
                        >
                          {nights} {nights === 1 ? "night" : "nights"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box>
                        <Typography
                          level="body-xs"
                          sx={{ color: "#0284c7", fontWeight: 700, mb: 0.5 }}
                        >
                          Number of Guests
                        </Typography>
                        <Typography
                          level="body-md"
                          sx={{ color: "#0f172a", fontWeight: 700 }}
                        >
                          {bookingData.guests}{" "}
                          {bookingData.guests === 1 ? "guest" : "guests"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box>
                        <Typography
                          level="body-xs"
                          sx={{ color: "#0284c7", fontWeight: 700, mb: 0.5 }}
                        >
                          Preference
                        </Typography>
                        <Typography
                          level="body-md"
                          sx={{ color: "#0f172a", fontWeight: 700 }}
                        >
                          {bookingData.smokingPreference === "non-smoking"
                            ? "🏠 Non-Smoking"
                            : "🚬 Smoking"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Base Price */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    level="body-md"
                    sx={{ color: "#475569", fontWeight: 500 }}
                  >
                    Base Price ({roomLabel} × {nights}{" "}
                    {nights === 1 ? "night" : "nights"})
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "#0f172a", fontWeight: 700 }}
                  >
                    ${pricing.baseAmount.toFixed(2)}
                  </Typography>
                </Box>

                {/* Extra Guests */}
                {pricing.extraGuestsAmount > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      level="body-md"
                      sx={{ color: "#475569", fontWeight: 500 }}
                    >
                      Extra Guests ({bookingData.guests - 2} × $10)
                    </Typography>
                    <Typography
                      level="body-md"
                      sx={{ color: "#0f172a", fontWeight: 700 }}
                    >
                      +${pricing.extraGuestsAmount.toFixed(2)}
                    </Typography>
                  </Box>
                )}

                {/* Subtotal */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <Typography
                    level="body-md"
                    sx={{ color: "#475569", fontWeight: 600 }}
                  >
                    Subtotal
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "#0f172a", fontWeight: 700 }}
                  >
                    ${pricing.subtotal.toFixed(2)}
                  </Typography>
                </Box>

                {/* Tax */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    level="body-md"
                    sx={{ color: "#475569", fontWeight: 500 }}
                  >
                    Tax (20%)
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "#0f172a", fontWeight: 700 }}
                  >
                    +${pricing.tax.toFixed(2)}
                  </Typography>
                </Box>

                {/* Total */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                    px: 2,
                    mt: 1,
                    bgcolor: "#f0fdf4",
                    borderRadius: "8px",
                    border: "2px solid #10b981",
                  }}
                >
                  <Typography
                    level="body-md"
                    sx={{ color: "#0f172a", fontWeight: 800 }}
                  >
                    Total
                  </Typography>
                  <Typography
                    level="h4"
                    sx={{ color: "#10b981", fontWeight: 900 }}
                  >
                    ${pricing.total.toFixed(2)}
                  </Typography>
                </Box>

                <Alert variant="soft" color="primary" sx={{ mt: 1.5 }}>
                  <Typography level="body-xs" sx={{ color: "#0c4a6e" }}>
                    ℹ️ The total amount will be charged after confirming your
                    booking. You will receive a confirmation email shortly.
                  </Typography>
                </Alert>
              </Stack>
            ) : (
              <Alert variant="soft" color="warning">
                <Typography level="body-sm">
                  Please complete Step 1 to calculate pricing.
                </Typography>
              </Alert>
            )}
          </Stack>
        );
      }

      case 4: {
        // STEP 4: BILLING DETAILS
        return (
          <Stack spacing={2}>
            <Box sx={{ textAlign: "center", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography level="h4">💳</Typography>
                <Typography
                  level="h4"
                  sx={{
                    color: "#0f172a",
                    fontWeight: 800,
                    alignItems: "center",
                  }}
                >
                  Secure Checkout
                </Typography>
              </Box>
              <Typography level="body-sm" sx={{ color: "#64748b" }}>
                Payment details · No charge until we confirm your booking
              </Typography>
            </Box>

            <Box
              sx={{
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                backgroundColor: "white",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
              }}
            >
              <Grid container spacing={{ xs: 1.25, sm: 1.75 }}>
                <Grid xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#0f172a",
                      }}
                    >
                      Name on Card
                    </FormLabel>
                    <Input
                      required
                      error={
                        (showBillingErrors || bookingData.cardName.length > 0) &&
                        !bookingData.cardName.trim()
                      }
                      value={bookingData.cardName}
                      onChange={(e) =>
                        handleInputChange("cardName", e.target.value)
                      }
                      placeholder="Full name"
                      sx={{ fontSize: "15px", borderRadius: "8px", py: 1.25 }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#0f172a",
                      }}
                    >
                      Card Number
                    </FormLabel>
                    <Input
                      required
                      error={(() => {
                        const digits = bookingData.cardNumber.replace(/\D/g, "");
                        return (showBillingErrors || digits.length > 0) && digits.length !== 16;
                      })()}
                      value={bookingData.cardNumber}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                        const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
                        handleInputChange("cardNumber", formatted);
                      }}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      slotProps={{ input: { maxLength: 19 } }}
                      sx={{
                        fontSize: "15px",
                        borderRadius: "8px",
                        py: 1.25,
                        fontFamily: "monospace",
                        letterSpacing: "2px",
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#0f172a",
                      }}
                    >
                      Expiration (MM/YY)
                    </FormLabel>
                    <Input
                      required
                      error={(() => {
                        const exp = bookingData.cardExpiry.trim();
                        return (showBillingErrors || exp.length > 0) && !isValidExpiry(exp);
                      })()}
                      value={bookingData.cardExpiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        handleInputChange("cardExpiry", value);
                      }}
                      placeholder="09/28"
                      inputMode="numeric"
                      sx={{
                        fontSize: "15px",
                        borderRadius: "8px",
                        py: 1.25,
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#0f172a",
                      }}
                    >
                      CVV
                    </FormLabel>
                    <Input
                      required
                      error={(() => {
                        const cvv = bookingData.cardCvv.trim();
                        return (showBillingErrors || cvv.length > 0) && cvv.length !== 3;
                      })()}
                      value={bookingData.cardCvv}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 3);
                        handleInputChange("cardCvv", value);
                      }}
                      placeholder="123"
                      inputMode="numeric"
                      slotProps={{ input: { maxLength: 3 } }}
                      sx={{
                        fontSize: "15px",
                        borderRadius: "8px",
                        py: 1.25,
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        mb: 0.5,
                        color: "#0f172a",
                      }}
                    >
                      Billing ZIP
                    </FormLabel>
                    <Input
                      required
                      error={(() => {
                        const zip = bookingData.zipCode.trim();
                        return (showBillingErrors || zip.length > 0) && zip.length !== 5;
                      })()}
                      value={bookingData.zipCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                        handleInputChange("zipCode", value);
                      }}
                      placeholder="12345"
                      slotProps={{ input: { maxLength: 5 } }}
                      sx={{ fontSize: "15px", borderRadius: "8px", py: 1.25 }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ mt: 1.25, color: "#475569" }}
              >
                <Typography level="body-xs" sx={{ flex: 1 }}>
                  We verify your card securely. Charges apply only after we
                  confirm availability.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        );
      }

      default:
        return null;
    }
  };

  const bookingForm = (
    <Box sx={{ p: isModal ? 0 : 2, height: "auto", overflow: "visible" }}>
      {!isModal && <CustomStepper />}
      {renderStepContent()}

      {!isModal && (
        <>
          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 1.25, sm: 0 },
              mt: 4,
              pt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={currentStep === 1}
              startDecorator={<ArrowBack />}
              sx={{ px: 3, width: { xs: "100%", sm: "auto" } }}
            >
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                endDecorator={<ArrowForward />}
                sx={{
                  px: 3,
                  width: { xs: "100%", sm: "auto" },
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                  },
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={!validateStep(totalSteps)}
                sx={{
                  px: 4,
                  width: { xs: "100%", sm: "auto" },
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  },
                  "&:disabled": {
                    background: "#f1f5f9",
                    color: "#94a3b8",
                  },
                }}
              >
                {isSubmitting ? "Submitting..." : "Confirm Booking"}
              </Button>
            )}
          </Box>

          {currentStep === totalSteps && (
            <Alert variant="soft" color="neutral" sx={{ mt: 2 }}>
              <Typography level="body-sm">
                <strong>Note:</strong> This is a booking request. We'll contact
                you within 24 hours to confirm availability and process your
                reservation.
              </Typography>
            </Alert>
          )}
        </>
      )}
    </Box>
  );

  if (isModal) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        disableScrollLock
        keepMounted
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        sx={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
          p: 0,
        }}
      >
        <ModalDialog
          sx={{
            maxWidth: { xs: "100vw", sm: "800px", md: "900px" },
            width: { xs: "100vw", sm: "900px", md: "900px" },
            height: { xs: "100vh", sm: "auto" },
            maxHeight: { xs: "100vh", sm: "95vh" },
            overflow: "hidden",
            borderRadius: { xs: 0, sm: "20px" },
            boxShadow: {
              xs: "none",
              sm: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
            },
            m: { xs: 0, sm: 1 },
            background: "white",
            display: "flex",
            flexDirection: "column",
            pb: { xs: "env(safe-area-inset-bottom)", sm: 0 },
          }}
        >
          <ModalClose
            sx={{
              top: { xs: 12, sm: 16 },
              right: { xs: 12, sm: 16 },
              bgcolor: "rgba(0, 0, 0, 0.04)",
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              borderRadius: "50%",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.08)" },
            }}
          />
          <Box sx={{ p: 0, display: "flex", flexDirection: "column", height: "100%" }}>
            <CustomStepper />
            <Box
              sx={{
                px: { xs: 1.25, sm: 2.5 },
                pb: { xs: 1.25, sm: 2 },
                overflowY: "auto",
                maxHeight: { xs: "calc(100vh - 190px)", sm: "auto" },
                scrollBehavior: "smooth",
                scrollbarGutter: "stable both-edges",
              }}
            >
              {renderStepContent()}
            </Box>
            <Box
              sx={{
                px: { xs: 1.25, sm: 2 },
                pb: { xs: 1.25, sm: 2 },
                pt: { xs: 1, sm: 0 },
                bgcolor: {
                  xs: "linear-gradient(180deg, #0f172a 0%, #111827 60%, #0f172a 100%)",
                  sm: "#fafbfc",
                },
                borderRadius: { xs: 0, sm: "0 0 20px 20px" },
                position: { xs: "sticky", sm: "static" },
                bottom: 0,
                zIndex: 2,
                boxShadow: {
                  xs: "0 -16px 40px rgba(15, 23, 42, 0.45)",
                  sm: "none",
                },
                borderTop: {
                  xs: "1px solid rgba(255, 255, 255, 0.08)",
                  sm: "none",
                },
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent:
                    currentStep === 1 ? "flex-end" : "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: { xs: 1.5, sm: 0 },
                }}
              >
                {currentStep > 1 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    startDecorator={<ArrowBack />}
                    sx={{
                      px: { xs: 2, sm: 3 },
                      py: { xs: 1.25, sm: 1 },
                      order: { xs: 2, sm: 1 },
                      borderColor: "#e2e8f0",
                      color: "#64748b",
                      "&:hover": {
                        borderColor: "#cbd5e1",
                        bgcolor: "rgba(100, 116, 139, 0.04)",
                      },
                    }}
                  >
                    Back
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    endDecorator={<ArrowForward />}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 1.5 },
                      order: { xs: 1, sm: 1 },
                      borderRadius: "8px",
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 14px 0 rgba(102, 126, 234, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                      },
                      "&:disabled": {
                        background: "#f1f5f9",
                        color: "#94a3b8",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    disabled={!validateStep(totalSteps)}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 1.5 },
                      order: { xs: 1, sm: 1 },
                      borderRadius: "8px",
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #059669 0%, #047857 100%)",
                        boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
                      },
                      "&:disabled": {
                        background: "#f1f5f9",
                        color: "#94a3b8",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    );
  }

  return (
    <Box
      id="booking"
      sx={{
        py: { xs: 8, md: 10 },
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1.25, sm: 1.75, md: 2 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            level="h1"
            sx={{
              fontSize: { xs: "28px", md: "48px" },
              fontWeight: 800,
              color: "#0f172a",
              mb: 2,
            }}
          >
            Book Your Stay
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "#64748b",
              maxWidth: "640px",
              mx: "auto",
              fontSize: { xs: "15px", md: "16px" },
            }}
          >
            Reserve your perfect room at Executive Inn and Suites. Choose your
            dates, room type, and preferences below.
          </Typography>
        </Box>

        <Card
          sx={{
            p: { xs: 1.5, sm: 2.5 },
            background: "white",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            borderRadius: { xs: 12, md: 16 },
            maxWidth: { xs: "100%", md: "960px" },
            mx: "auto",
          }}
        >
          <form onSubmit={handleSubmit}>{bookingForm}</form>
        </Card>
      </Container>
    </Box>
  );
};
// Export both named and default to satisfy consumers expecting either style
export { Booking };
export default Booking;
