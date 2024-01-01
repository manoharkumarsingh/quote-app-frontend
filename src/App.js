import "./App.css";
import ResponsiveAppBar from "./components/Navbar";
import { routes } from "./routes";
import { useRoutes } from "react-router";

function App() {
  const element = useRoutes(routes);
  return (
    <div className="app-container">
      <ResponsiveAppBar></ResponsiveAppBar>
      <div className="page-conatiner">{element}</div>
    </div>
  );
}

export default App;
