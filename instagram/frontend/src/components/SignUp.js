import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import logo from "../../static/images/logo.svg";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as Lin,
  Redirect,
} from "react-router-dom";
import Login from "./Login";

//declaring some package instances
const validator = require("email-validator");
const isValidBd = require("is-valid-birthdate");

const useStyles = makeStyles((theme) => ({
  layout: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#EDECF4",
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  dropdown: {
    width: "100%",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },

  imag: {
    maxWidth: "50%",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

  centerContents: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%,-50%)",
  },

  error: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8D7DA",
    border: "solid 0.5px #F5C6CB",
    borderRadius: "2px",
    color: "#722D36",
    padding: "10px",
  },
}));

const SignUp = () => {
  //state
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState(1);
  const [isValidEmail, setIsValidEmail] = useState();
  const [isExistingUser, setIsExistingUser] = useState(false);

  //event handlers
  const emailChangeHandler = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const emailValidationHandler = () => {
    const result = validator.validate(email);
    if (result === true) {
      setIsValidEmail(!true);
    } else {
      setIsValidEmail(!false);
    }
  };

  //Submit to api endpoint
  const submitHandler = (dataObject) => {
    const requestOptions = {
      body: JSON.stringify(dataObject),
    };
    axios
      .post("/join", requestOptions.body, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (response) => {
          localStorage.setItem("registrationSuccess", JSON.stringify(true));
          setIsExistingUser(false);
          window.location = "/signin";
        },
        (error) => {
          console.log(error.response.status);
          setIsExistingUser(true);
        }
      );
  };

  return (
    <Container className={classes.layout}>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid container justify="space-around" item xs={12}>
            <img className={classes.imag} src={logo}></img>
          </Grid>
        </Grid>
        <form
          className={classes.form}
          onSubmit={handleSubmit((data) => submitHandler(data))}
        >
          <Grid container spacing={2}>
            {isExistingUser && (
              <Grid item xs={12}>
                <div className={classes.error}>
                  username is already taken! please try a different one!
                </div>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailChangeHandler}
                onBlur={emailValidationHandler}
                inputRef={register}
                error={isValidEmail}
                helperText={isValidEmail ? "Please enter a valid email!" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="signin" variant="body2" color="textPrimary">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
