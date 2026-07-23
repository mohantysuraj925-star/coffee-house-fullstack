import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <AllRoutes />
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
