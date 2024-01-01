import Login from "./components/Login";
import Profile from "./components/Profile";
import Quotes from "./components/Quotes";
import Signup from "./components/Signup";
import CreateNewQuote from "./components/CreateQuote";
import NotFound from "./components/NotFound";
import OtherUserProfile from "./components/OtherUserProfile";

export const routes = [
  { path: "/", element: <Quotes></Quotes> },
  { path: "/login", element: <Login></Login> },
  { path: "/profile", element: <Profile></Profile> },
  { path: "/signup", element: <Signup></Signup> },
  {
    path: "/create",
    element: <CreateNewQuote></CreateNewQuote>,
  },
  {
    path: "/profile/:userid",
    element: <OtherUserProfile></OtherUserProfile>,
  },
  { path: "*", element: <NotFound></NotFound> },
];
