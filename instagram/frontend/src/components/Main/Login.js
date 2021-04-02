import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import logo from "../../../static/images/logo.svg";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { UserContext } from "../Context/AppContext";
import { UserStatusContext } from "../Context/UserStatusContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  layout: {
    backgroundColor: "#EDECF4",
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%,-50%)",
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
    width: "100%",
    margin: "10px",
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

  success: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4EDDA",
    border: "solid 0.5px #CDEAD3",
    borderRadius: "2px",
    color: "#155724",
    padding: "10px",
  },
}));

const Login = () => {
  //state
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const [allSet, setAllSet] = useState(false);
  const [badLoginInfo, setBadLoginInfo] = useState(false); // set to false on bad username/password to display error message
  const [newlyRegistered, setNewlyRegistered] = useState(
    JSON.parse(localStorage.getItem("registrationSuccess")) || false
  );

  const submitHandler = (dataObject) => {
    const requestOptions = {
      body: JSON.stringify(dataObject),
    };
    axios
      .post("/loginEndpoint/", requestOptions.body, {
        headers: { "Content-Type": "application/json" },
      })
      .then(async (response) => {
        const username = response.data.user.username;
        const token = response.data.token;
        const userId = response.data.user.id;
        const firstName = response.data.user.first_name;
        const lastName = response.data.user.last_name;
        const email = response.data.user.email;
        const newInfo = {
          author: username,
          first_name:firstName,
          last_name:lastName,
          email:email,
          avatar: "../../static/images/arthur.jpg",
          id: userId,
          token: token,
        };
        setLoggedInUserInfo(newInfo);
        setIsLoggedIn(true);
        setBadLoginInfo(false);
        setNewlyRegistered(false);
        localStorage.removeItem("registrationSuccess");
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 400) {
          setBadLoginInfo(true); //now error message will display
          setNewlyRegistered(false);
          localStorage.removeItem("registrationSuccess");
        }
      });
  };

  useEffect(() => {
    if (isLoggedIn === true && LoggedInUserInfo.name !== null) {
      setAllSet(true);
      localStorage.setItem("userInfo", JSON.stringify(LoggedInUserInfo));
      localStorage.setItem("userStatus", JSON.stringify(isLoggedIn));
    }
  }, [LoggedInUserInfo, isLoggedIn]);

  return (
    <Container className={classes.layout}>
      <Route>{allSet ? <Redirect to="/homepage" /> : ""}</Route>
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
            {badLoginInfo && (
              <Grid item xs={12}>
                <div className={classes.error}>
                  username and/or password do not match any registered user!
                </div>
              </Grid>
            )}
            {newlyRegistered && (
              <Grid item xs={12}>
                <div className={classes.success}>
                  Your account has been created successfully! please sign in
                  below!
                </div>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                className={classes.textField}
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
                className={classes.textField}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="register" variant="body2" color="textPrimary">
                  New to Instagram? Sign up
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
