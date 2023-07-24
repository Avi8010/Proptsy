import * as React from 'react';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { useState, } from 'react';
import { makeStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // https://source.unsplash.com/random
    backgroundImage:
      "url(https://blog.ipleaders.in/wp-content/uploads/2018/12/real_estate.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center right",
  },
  paper: {
    margin: theme.spacing(8, 8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2), //(t,r,b,l);
  },
}));

function LoginPage(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  async function loginUser(e) {
    e.preventDefault();
    const loginObj = { username: userName, password: password };
    console.log(loginObj);
    console.log("begin");
    try {
      const res = await axios.post("http://localhost:5000/login", loginObj);
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
    console.log("end");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={loginUser}>
            <TextField
              onChange={(e) => setUserName(e.target.value)}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginPage;