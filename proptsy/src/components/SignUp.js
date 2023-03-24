import * as React from 'react';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, IconButton, Link, TextField, Typography } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.common.lightgoldenrodyellow,
  },
  root: {
    backgroundColor: theme.palette.background.dark,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    const registerObj = {
      name: fname + " " + lname,
      username: userName,
      password: password,
    };
    const loginObj = {
      username: userName,
      password: password,
    };
    console.log(registerObj);
    console.log("begin");
    try {
      const res = await axios.post("/register", registerObj);
      console.log("register success");
      try {
        const res = await axios.post("/login", loginObj);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userName", userName);
        console.log("login success");
        navigate("/");
      } catch (err) {
        console.log("err");
        localStorage.setItem("accessToken", null);
        localStorage.setItem("refreshToken", null);
        localStorage.setItem("userName", null);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("end");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setFname(e.target.value)}
                autoComplete="fname"
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setLname(e.target.value)}
                variant="filled"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setUserName(e.target.value)}
                variant="filled"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </form>
      </div>
    </Container>
  );
}
