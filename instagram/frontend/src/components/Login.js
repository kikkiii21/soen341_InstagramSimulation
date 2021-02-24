import React, { useState, useEffect } from "react";
import { Link as lin } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from '../../static/images/logo.svg';
import {useForm} from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    layout: {
        backgroundColor: '#EDECF4',
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
    },

    imag:{
        maxWidth: '50%',  
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
        margin: '10px',
    },

}));




const Login = () => {

    //state
     const classes = useStyles();
     const {register, handleSubmit} = useForm();
    

    const submitHandler = (dataObject) => {
      const requestOptions = {
        body: JSON.stringify(dataObject),  
      };
      axios.post('/login', requestOptions.body, {headers: {'Content-Type' : 'application/json'}})
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    };

    return(
        <Container className={classes.layout} >
    <CssBaseline />
    <div className={classes.paper}>
    <Grid container spacing={1}>
        <Grid container justify="space-around" item  xs={12}><img className={classes.imag} src={logo}></img></Grid>
    </Grid>
        <form className={classes.form} onSubmit={handleSubmit((data) => submitHandler(data))}>
        <Grid container spacing={2}>
           
            </Grid>
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
            <Link href="signup" variant="body2" color="textPrimary">
              New to Instagram? Sign up
            </Link>
            </Grid>
        </Grid>
        </form>
    </div>
   
    </Container>
  
  );
   
    
};

  export default Login;