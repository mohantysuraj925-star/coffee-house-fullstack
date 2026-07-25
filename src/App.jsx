import React from "react";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F17] text-white">
      <Navbar />
      <main className="flex-grow">
        <AllRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
