import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../gqloperations/queries";
import Loader from "./Loader";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const OtherUserProfile = () => {
  const { userid } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userid },
  });

  if (loading) {
    return <Loader></Loader>;
  }
  if (error) {
    return <Error></Error>;
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="flex-row justify-center">
        <div className="user-detail">
          {data && data.user && data.user.firstName && (
            <>
              <img
                src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
                alt="pic"
              />
              <Typography variant="h6" component="h6">
                Name : {data.user.firstName + " " + data.user.lastName}
              </Typography>
              <Typography variant="h6" component="h6">
                Email : {data.user.email}
              </Typography>
            </>
          )}
        </div>

        <div className="user-quote">
          <List className="w-96">
            {(data &&
              data.user &&
              data.user.quotes &&
              data.user.quotes.length > 0 &&
              data.user.quotes.map((quote) => {
                return (
                  <>
                    <ListItem>
                      <ListItemText>{quote.name}</ListItemText>
                    </ListItem>
                    <Divider
                      variant="inset"
                      component="li"
                      style={{ marginLeft: "0px" }}
                    />
                  </>
                );
              })) ||
              "No Quotes available"}
          </List>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
