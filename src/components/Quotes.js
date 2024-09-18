import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import Loader from "./Loader";
import Error from "./Error";
import { gql, useSubscription } from '@apollo/client';

const QUOTE_CREATED_SUBSCRIPTION = gql`
  subscription OnQuoteCreated {
    quoteCreated {
      name
      by {
        _id
        firstName
      }
    }
  }
`;

const Quotes = () => {
   // Fetch initial list of quotes
  const { loading, error, data, refetch } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: "cache-and-network",
  });

  // Listen for new quote creations
  const { data: subscriptionData } = useSubscription(QUOTE_CREATED_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData.data) {
        refetch();  // Refetch the quotes to get the latest data, or you can update the cache manually
      }
    },
  });


  return (
    <div className="flex justify-center">
      <List className="w-5/6">
        {data &&
          data.quotes &&
          data.quotes.map((quote) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Link to={"/profile/" + quote.by._id}>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            className="text-[#039be5]"
                          >
                            ~{quote.by.firstName}
                          </Typography>
                        </Link>
                        — {quote.name}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          })}

        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
};

export default Quotes;
