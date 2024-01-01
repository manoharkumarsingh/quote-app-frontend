import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import Loader from "./Loader";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/");
    },
  });

  const handleUserInput = (e) => {
    const userInputState = { ...userInput };
    userInputState[e.target.id] = e.target.value;
    setUserInput(userInputState);
  };

  const handleSubmit = () => {
    signinUser({
      variables: {
        userSignin: userInput,
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
    <div className="flex justify-center items-center">
      <div className="mt-8">
        <Typography className="flex justify-center" variant="h4" gutterBottom>
          Login!!
        </Typography>
        <div className="mb-2 bg-white">
          <TextField
            className="w-96 bg-white"
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

        <div>
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
          <Link className="text-[#039be5]" to={"/signup"}>
            Don't have an account ?
          </Link>
        </div>
        <div className="mt-4">
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
