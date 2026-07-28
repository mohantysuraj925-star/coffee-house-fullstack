import React from "react";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#120B07] text-amber-50">
      <Navbar />
      <main className="flex-grow flex flex-col pt-14 md:pt-16">
        <AllRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
