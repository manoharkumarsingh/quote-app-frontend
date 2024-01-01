import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CREATE_QUOTE } from "../gqloperations/mutations";
import { useMutation } from "@apollo/client";
import Loader from "./Loader";
import Error from "./Error";
import Alert from "@mui/material/Alert";
import { GET_ALL_QUOTES } from "../gqloperations/queries";

const CreateNewQuote = () => {
  const [userInput, setUserInput] = useState({
    name: "",
  });

  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: [GET_ALL_QUOTES, "getAllQuotes"],
  });

  const handleUserInput = (e) => {
    const userInputState = { ...userInput };
    userInputState[e.target.id] = e.target.value;
    setUserInput(userInputState);
  };
  const handleSubmit = () => {
    createQuote({
      variables: {
        name: userInput.name,
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
        {data && data.quote && <Alert severity="success">{data.quote}</Alert>}
        <Typography className="flex justify-center" variant="h4" gutterBottom>
          Create New Quote
        </Typography>
        <div className="mb-3">
          <TextField
            className="w-96"
            id="name"
            label="Quote Description"
            type="text"
            autoComplete="name"
            variant="filled"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
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

export default CreateNewQuote;
