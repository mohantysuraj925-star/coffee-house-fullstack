import React, { useEffect } from "react";
import axios from "axios";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const API_BASE_URL = "https://coffeehouse-backend-xtle.onrender.com";

function App() {
  useEffect(() => {
    // Keep backend alive silently without blocking UI
    const keepAlivePing = () => {
      axios.get(`${API_BASE_URL}/menu/`, { timeout: 3000 }).catch(() => {});
    };

    keepAlivePing();
    const pingInterval = setInterval(keepAlivePing, 480000);

    return () => clearInterval(pingInterval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#120B07] text-amber-50 overflow-x-hidden antialiased">
      <Navbar />
      <main className="flex-grow w-full pt-16 md:pt-20">
        <AllRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
