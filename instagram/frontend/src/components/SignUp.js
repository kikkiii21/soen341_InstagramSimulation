import React, { useState } from "react";
import { Link as lin } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from '../../static/images/logo.svg';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {useForm} from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//declaring some package instances
const validator = require("email-validator");
const isValidBd = require('is-valid-birthdate') 

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
    },

    dropdown:{
    width: '100%',
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
        width: 200,
    },

}));




const SignUp = () => {

    //state
     const classes = useStyles();
     const {register, handleSubmit} = useForm();
     const [email, setEmail] = useState(1);
     const [date, setDate] = useState(1);
     const [isValidEmail, setIsValidEmail] = useState();
     const [isValidBirthday, setIsValidBirthday] = useState();

     //event handlers
     const emailChangeHandler = (e) => {
         const newEmail = e.target.value;
         setEmail(newEmail);
     }

     const dateChangeHandler = (e) => {
         const newDate = e.target.value;
        setDate(newDate);
    }

    const emailValidationHandler = () => {
        const result = validator.validate(email);
        if(result === true){
            setIsValidEmail(!true);
        }
        else{
            setIsValidEmail(!false);
        }
    }

    const birthdayValidationHandler = () => {
        const result = isValidBd(date);
        if(result === true){
            setIsValidBirthday(!true);
        }
        else{
            setIsValidBirthday(!false);
        }
    }

    //Submit to api endpoint
    const submitHandler = (dataObject) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(dataObject),
        }; // bad endpoint!! change it after configuring the backend!
        fetch('api/user', requestOptions).then((response) => 
        response.json).then((data) => console.log(data));
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
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="fname"
                name="firstName"
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
                name="lastName"
                
                autoComplete="lname"
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
                helperText={isValidEmail? "Please enter a valid email!": ""}
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
                
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel id="gender-select">Gender</InputLabel>
                <Select name="gender" className={classes.dropdown} labelId="gender-select" id="gender" inputRef={register} required>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                id="date"
                name="birthday"
                label="Birthday"
                type="date"
                required
                className={classes.textField}
                className={classes.dropdown}
                onChange={dateChangeHandler}
                onBlur={birthdayValidationHandler}
                error={isValidBirthday}
                helperText={isValidBirthday? "Please enter a valid birthday!": ""}
                inputRef={register}
                InputLabelProps={{
                shrink: true,
                }}
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
            <Link href="login" variant="body2" color="textPrimary">
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