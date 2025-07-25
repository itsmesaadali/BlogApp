import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

useEffect(() => {
  console.log("Checking user...");
  authService
    .getCurrentUser()
    .then((userData) => {
      console.log("User data from Appwrite:", userData);
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.error("getCurrentUser error:", error);
    })
    .finally(() => setLoading(false));
}, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 ">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
