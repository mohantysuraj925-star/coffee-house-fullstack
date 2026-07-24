import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <AllRoutes />
      {!isAdminRoute && <Footer />}
      <Analytics />
    </>
  );
}

export default App;
