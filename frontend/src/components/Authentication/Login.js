import { useState } from "react";
import axios from "axios";
import './Login.css';
import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import toast from 'react-simple-toasts';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
  input: {
    background: "grey",
    border: 0,
    borderRadius: 15,
    color: "White"
  }
});

const THEME = createTheme({
   typography: {
    "fontFamily": `'Avenir LT Std'`,
    "fontSize": 16,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
});


const Login = () => {
  // const [show, setShow] = useState(false);
  // const handleClick = () => setShow(!show);
  // const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast("Please fill all the fields");
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast("Login successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push({
        'pathname': '/chats',
        'key': 'value'
    })
    document.location.reload()
    } catch (error) {
      toast("Error Occured");
      setLoading(false);
    }
  };


  const classes = useStyles();
  return (
    <>
        <div>
        <Link to="/" onClick={() => {window.location.href="/"}}>
        <p className='reactin1'>Reactin</p>
        </Link>
        <p className="crat">Login Account</p>
        <p className="already">Don't have an account?</p>
        <Link to="/signup" onClick={() => {window.location.href="/signup"}}>
        <p className="login">Sign Up</p>
        </Link>
        </div>
        <block>
        <MuiThemeProvider theme={THEME}>
            <div className='Email'>
            <p className="typo">Email</p>
            <TextField 
             inputProps={{ className: classes.input }}
            id="Email" label="Enter Email" variant="filled"
            onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='Password'>
            <p className="typo">Password</p>
            <TextField a
             inputProps={{ className: classes.input }}
            id="Password" label="Enter Password" variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            type="password"/>
            </div>
            </MuiThemeProvider>
            <button 
            onClick={submitHandler}
            isLoading={loading}
            className="s-btn">Submit</button>
        </block>
      </>
  );
};

export default Login;
