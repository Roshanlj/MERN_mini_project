import './Signup.css';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import axios from "axios";
import toast from 'react-simple-toasts';

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
    "fontWeightMedium": 500,
    color: "#FFFFFF"
   }
});

const Signup = () => {

  // const [show, setShow] = useState(false);
  // const handleClick = () => setShow(!show);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const history = useHistory();

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast('Please fill all the fields!');
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast("Password does not match!");
      return;
    }
    

    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast('Registeration successful!');
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/login");
    } catch (error) {
      toast('Error Occured!');
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast('Please select a picture!');
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast('Please select a picture!');
      setPicLoading(false);
      return;
    }
  };



    const classes = useStyles();
    return (
      <>
        <div>
        <Link to="/" onClick={() => {window.location.href="/"}}>
        <p className='reactin1'>Reactin</p>
        </Link>
        <p className="crat1">Create Account</p>
        <p className="already">Already have an account?</p>
        <Link to="/login" onClick={() => {window.location.href="/login"}}>
        <p className="log">Login</p>
        </Link>
        </div>
        <nblock>
        <MuiThemeProvider theme={THEME}>
            <div className='Name'>
            <p className='typo'>Name</p>
            <TextField 
             inputProps={{ className: classes.input }}
            id="Name" label="Enter Name" variant="filled"
            onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className='Email1'>
            <p className="typo">Email</p>
            <TextField 
             inputProps={{ className: classes.input }}
            id="Email" label="Enter Email" variant="filled"
            type="email"
            onChange={(e) => setEmail(e.target.value)} required
            />
            </div>
            <div className='Password1'>
            <p className="typo">Password</p>
            <TextField 
             inputProps={{ className: classes.input }}
            id="Password" label="Enter Password" variant="filled"
            type="password"
            onChange={(e) => setPassword(e.target.value)} required
            />
            </div>
            <div className='Confirm'>
            <p className="typo">Confirm Password</p>
            <TextField 
             inputProps={{ className: classes.input }}
            id="Confirm" label="Re-Type" variant="filled"
            type="password"
            onChange={(e) => setConfirmpassword(e.target.value)} required
            />
            <div className='pic'>
            <p>Upload your Picture</p>
        <TextField
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          inputProps={{ style: { color: "white" } }}
        />
        </div>
            </div>
            </MuiThemeProvider>
            <button className="s-btn1" onClick={submitHandler}
        isLoading={picLoading}>Submit</button>
        </nblock>
      </>
    );
  }


export default Signup;

//dxopei3ks
  