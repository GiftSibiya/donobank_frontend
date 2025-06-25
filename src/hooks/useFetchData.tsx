import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionUser } from "../types/Types";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/stores/data/AuthStore";

type FetchFunction = (sessionUser: SessionUser) => void;

// Helper function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  const decoded: { exp: number } = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const useFetchData = (fetchFunction: FetchFunction) => {
  const { sessionUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionUser) {
      if (isTokenExpired(sessionUser.accessToken)) {
        console.error("Session token is expired");
        navigate("/"); // Redirect to login page
      } else {
        fetchFunction(sessionUser);
      }
    } else {
      navigate("/");
      console.error("No session user found");
    }
  }, [sessionUser, fetchFunction, navigate]);
};
