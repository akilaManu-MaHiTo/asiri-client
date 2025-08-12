import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { enqueueSnackbar } from "notistack";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to MyApp
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          This is a simple homepage built with Material UI and TypeScript.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button variant="contained" size="large">
            Get Started
          </Button>
          <Button variant="outlined" size="large">
            Learn More
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
