import React from "react";
import { Typography, Container } from "@mui/material";
import Logo from "../assets/asiri-logo.png";

const HomePage: React.FC = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <img src={Logo} alt="logo" height="100rem" />
        <Typography variant="h3" gutterBottom>
          Welcome to Asiri Mushrooms
        </Typography>
      </Container>
    </>
  );
};

export default HomePage;
