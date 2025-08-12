import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/userApi";
import queryClient from "../../state/queryClient";
import { enqueueSnackbar } from "notistack";
import useCurrentUser from "../../hooks/useCurrentUser";
import PageLoader from "../../components/PageLoader";
import groupLogo from "../../assets/react.svg";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

type FormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
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
    loginMutation({ username: data.username, password: data.password });
  };

  const { user, status } = useCurrentUser();
  if (status === "loading" || status === "idle" || status === "pending") {
    return <PageLoader />;
  }

  if (user) {
    window.location.reload();
    navigate("/home");
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle, #12AB68 20%, #101724 100%)",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "var(--primary-color)",
          borderRadius: 5,
        }}
      >
        <Stack sx={{ padding: 4 }} gap={3}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <img src={groupLogo} alt="logo" height="45em" />
            <Typography
              variant="subtitle1"
              noWrap
              component="div"
              sx={{ color: "var(--primary-light)" }}
            >
              GroceryFlow
            </Typography>
          </Box>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            mt={1}
            sx={{
              color: "white",
            }}
          >
            Login
          </Typography>
          <Stack
            gap={3}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              label="User Name"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              margin="normal"
              {...register("username", { required: "User Name is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{
                "& label": {
                  color: "000",
                },
                "& label.Mui-focused": {
                  color: "var(--primary-light)",
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--primary-light)",
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              size="small"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& label": {
                  color: "000",
                },
                "& label.Mui-focused": {
                  color: "var(--primary-light)",
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--primary-light)",
                  },
                },
              }}
            />

            <a
              href="#"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "1rem",
                color: "gray",
              }}
            >
              Forgot Password ?
            </a>
            <Box display="flex" justifyContent="center" my={4}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "var(--primary-light)", width: "50%" }}
                endIcon={<LoginOutlinedIcon />}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;
