import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import Loader from "./Loader";
import Error from "./Error";
import Alert from "@mui/material/Alert";

const Signup = () => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleUserInput = (e) => {
    const userInputState = { ...userInput };
    userInputState[e.target.id] = e.target.value;
    setUserInput(userInputState);
  };
  const handleSubmit = () => {
    signupUser({
      variables: {
        userNew: userInput,
      },
    });
  };
  if (loading) {
    return <Loader></Loader>;
  }
  if (error) {
    return <Error></Error>;
  }
  return (
    <div className="flex justify-center items-center  ">
      <div className="mt-8">
        {data && data.user && (
          <Alert severity="success">
            {data.user.firstName} is SignedUp. You can login now!
          </Alert>
        )}
        <Typography className="flex justify-center" variant="h4" gutterBottom>
          Signup!!
        </Typography>
        <div className="mb-3">
          <TextField
            className="w-96"
            id="firstName"
            label="First Name"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
        </div>

        <div className="mb-3">
          <TextField
            className="w-96"
            id="lastName"
            label="Last Name"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
        </div>

        <div className="mb-3">
          <TextField
            className="w-96"
            id="email"
            label="Email"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
        </div>

        <div className="mb-3">
          <TextField
            className="w-96"
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
        </div>
        <div className="mt-10 ">
          <Link className="text-[#039be5]" to={"/login"}>
            Already have an account ?
          </Link>
        </div>
        <div className="mt-4">
          <Button variant="contained" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
