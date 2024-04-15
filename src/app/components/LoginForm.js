import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  InputLabel,
  Input,
} from "@mui/material";
import axelorlogo from "../assets/Images/axelor.png";
import { useNavigate } from "react-router-dom";
import useAuth from "app/Contexts/AuthContext";
import { login } from "../services/rest";
import "../../index.css";

function LoginForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const { logIn, AuthStatus } = useAuth();

  useEffect(() => {
    if (AuthStatus) {
      // If user is already authenticated, redirect to home page
      navigate("/home");
    }
  }, [AuthStatus, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.username && formState.password) {
      try {
        await login(formState);
        logIn(true);
        localStorage.setItem("user-credential", JSON.stringify(formState));
        navigate("/home");
      } catch (error) {
        setLoginError(true);
      }
    } else {
      setLoginError(true);
    }
  };

  useEffect(() => {
    const credential = JSON.parse(localStorage.getItem("user-credential"));
    if (credential) {
      logIn(true);
    }
  }, [logIn]);

  return (
    <Container maxWidth="xs">
      <Grid container justifyContent="center">
        <Paper elevation={15} className="login-container">
          <div>
            <div className="Axelor-logo">
              <img
                src={axelorlogo}
                className="img-logo"
                alt="Axelor Open Suite"
              />
            </div>
            <form onSubmit={handleSubmit} id="LoginForm">
              <div className="mb-3 input">
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  fullWidth
                  underline="true"
                  color="primary"
                  type="text"
                  value={formState.username}
                  onChange={(e) =>
                    setFormState({ ...formState, username: e.target.value })
                  }
                  autoComplete="on"
                />
              </div>
              <div className="mb-3 input">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  fullWidth
                  underline="true"
                  color="primary"
                  type="password"
                  value={formState.password}
                  onChange={(e) =>
                    setFormState({ ...formState, password: e.target.value })
                  }
                  autoComplete="on"
                />
              </div>
              <div className="mb-3">
                <FormControlLabel
                  control={<Checkbox color="info" />}
                  label="Remember Me"
                />
              </div>
              {loginError && (
                <div className="login-error">Wrong username or password</div>
              )}
              <Button variant="contained" fullWidth type="submit" id="login">
                Log in
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
      <Grid container justifyContent="center" id="copyright">
        <p className="">
          Copyright (c) {new Date().getFullYear()} Axelor. All Rights Reserved.
        </p>
      </Grid>
    </Container>
  );
}

export default LoginForm;
