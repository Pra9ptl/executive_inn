import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Button,
  Input,
  Textarea,
  Grid,
} from "@mui/joy";
import {
  Phone,
  Email,
  LocationOn,
  Send,
  CheckCircle,
} from "@mui/icons-material";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId =
      process.env.REACT_APP_EMAILJS_SERVICE_ID || "REPLACE_WITH_SERVICE_ID";
    const templateId =
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "REPLACE_WITH_TEMPLATE_ID";
    const publicKey =
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "REPLACE_WITH_PUBLIC_KEY";

    try {
      setIsSending(true);
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          email,
          subject,
          message,
          reply_to: email,
        },
        { publicKey }
      );
      console.log("EmailJS result:", result);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 1500);
    } catch (err) {
      console.error("Email send failed:", err);
    }
    setIsSending(false);
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            level="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: "32px", md: "44px" },
              fontWeight: "bold",
              color: "#0f172a",
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: "center",
              color: "#475569",
              maxWidth: "700px",
              fontSize: "16px",
              lineHeight: 1.7,
              px: 2,
            }}
          >
            Have questions or need more information? We'd love to hear from you.
            Contact us today and we'll get back to you shortly.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <Card
                sx={{
                  p: 4,
                  background: "white",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(30, 58, 138, 0.15)",
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <Phone sx={{ color: "#fbbf24", fontSize: 28 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      level="title-md"
                      sx={{ color: "#0f172a", fontWeight: "bold", mb: 1 }}
                    >
                      Phone
                    </Typography>
                    <Typography
                      component="a"
                      href="tel:+12257711123"
                      level="body-sm"
                      sx={{
                        color: "#3b82f6",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "15px",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      +1 (225) 771-1123
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Card
                sx={{
                  p: 4,
                  background: "white",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(30, 58, 138, 0.15)",
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <LocationOn sx={{ color: "#fbbf24", fontSize: 28 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      level="title-md"
                      sx={{ color: "#0f172a", fontWeight: "bold", mb: 1 }}
                    >
                      Address
                    </Typography>
                    <Typography
                      level="body-sm"
                      sx={{ color: "#64748b", fontSize: "14px", mb: 0.5 }}
                    >
                      430 Main St
                    </Typography>
                    <Typography
                      level="body-sm"
                      sx={{ color: "#64748b", fontSize: "14px" }}
                    >
                      Baker, Louisiana 70714, USA
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Card
                sx={{
                  p: 4,
                  background: "white",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(30, 58, 138, 0.15)",
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <Email sx={{ color: "#fbbf24", fontSize: 28 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      level="title-md"
                      sx={{ color: "#0f172a", fontWeight: "bold", mb: 1 }}
                    >
                      Email
                    </Typography>
                    <Typography
                      component="a"
                      href="mailto:exeinnbaker@gmail.com"
                      level="body-sm"
                      sx={{
                        color: "#3b82f6",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "15px",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      exeinnbaker@gmail.com
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            <Card
              sx={{
                p: 4,
                background: "white",
                border: "none",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Input
                    placeholder="Your Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    slotProps={{
                      input: { sx: { fontSize: "16px", py: "12px" } },
                    }}
                    sx={{
                      borderColor: "#e2e8f0",
                      background: "#f8fafc",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        borderColor: "#3b82f6",
                        background: "white",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  />

                  <Input
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    slotProps={{
                      input: { sx: { fontSize: "16px", py: "12px" } },
                    }}
                    sx={{
                      borderColor: "#e2e8f0",
                      background: "#f8fafc",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        borderColor: "#3b82f6",
                        background: "white",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  />

                  <Input
                    placeholder="Subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    slotProps={{
                      input: { sx: { fontSize: "16px", py: "12px" } },
                    }}
                    sx={{
                      borderColor: "#e2e8f0",
                      background: "#f8fafc",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        borderColor: "#3b82f6",
                        background: "white",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  />

                  <Textarea
                    placeholder="Your Message"
                    minRows={4}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      borderColor: "#e2e8f0",
                      background: "#f8fafc",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        borderColor: "#3b82f6",
                        background: "white",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    disabled={isSending}
                    sx={{
                      background: sentSuccess
                        ? "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
                        : "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "15px",
                      py: 1.5,
                      transition: "all 0.3s ease",
                      opacity: isSending ? 0.9 : 1,
                      "&:hover": {
                        transform: sentSuccess ? "none" : "translateY(-2px)",
                        boxShadow: sentSuccess
                          ? "0 0 0 rgba(0,0,0,0)"
                          : "0 8px 20px rgba(30, 58, 138, 0.3)",
                      },
                    }}
                    endDecorator={sentSuccess ? <CheckCircle /> : <Send />}
                  >
                    {sentSuccess
                      ? "Sent!"
                      : isSending
                      ? "Sending..."
                      : "Send Message"}
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
