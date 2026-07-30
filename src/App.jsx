import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  const [apiLoading, setApiLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Connecting to Coffee House Server...");

  useEffect(() => {
    let reqTimer;

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setApiLoading(true);
        setLoadingText("Connecting to Coffee House Server...");

        reqTimer = setTimeout(() => {
          setLoadingText("Waking up free backend server, please wait a moment...");
        }, 4000);

        return config;
      },
      (error) => {
        setApiLoading(false);
        clearTimeout(reqTimer);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setApiLoading(false);
        clearTimeout(reqTimer);
        return response;
      },
      (error) => {
        setApiLoading(false);
        clearTimeout(reqTimer);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
      clearTimeout(reqTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#120B07] text-amber-50 relative">
      <Navbar />
      <main className="flex-grow flex flex-col pt-14 md:pt-16">
        <AllRoutes />
      </main>
      <Footer />

      {/* Global API Cold-Start Loader Overlay */}
      {apiLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="bg-gradient-to-b from-[#2a170a] to-[#180e0a] border-2 border-amber-500/50 rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-5 border-amber-500/60">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-amber-600/30 border-t-amber-400 rounded-full animate-spin" />
              <span className="text-2xl animate-pulse">☕</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-amber-50 tracking-wide">
                Coffee House Server
              </h3>
              <p className="text-xs font-bold text-amber-300/90 leading-relaxed animate-pulse">
                {loadingText}
              </p>
            </div>

            <div className="pt-2 border-t border-amber-600/30">
              <p className="text-[10px] text-amber-200/50 font-mono">
                Please hold tight while we fetch your live data...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
