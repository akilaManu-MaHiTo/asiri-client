import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import Logo from "../../assets/asiri-logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/userApi";
import queryClient from "../../state/queryClient";
import { enqueueSnackbar } from "notistack";
import useCurrentUser from "../../hooks/useCurrentUser";
import PageLoader from "../../components/PageLoader";
import useIsMobile from "../../customHooks/useIsMobile";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { isMobile, isTablet } = useIsMobile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      localStorage.setItem("token", data?.token);
      enqueueSnackbar("Welcome Back!", { variant: "success" });
      navigate("/home");
    },
    onError: () => {
      enqueueSnackbar(`Login Failed`, {
        variant: "error",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Login submitted:", data);
    loginMutation({ email: data.email, password: data.password });
  };

  const { user, status } = useCurrentUser();
  if (status === "loading" || status === "idle" || status === "pending") {
    return <PageLoader />;
  }
  if (user) {
    navigate("/home");
  }
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection={isMobile ? "column" : "row"}
          gap={isMobile ? 3  : ""}
        >
          <img src={Logo} alt="logo" height="60em" />
          <Typography ml={2} variant="h4" noWrap component="div">
            Asiri Mushrooms
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            color="secondary"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            color="secondary"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Log In
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                mt: 1,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot password?
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
