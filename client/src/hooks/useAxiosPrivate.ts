import { APIPrivate } from "@/api/axios";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

export default function useAxiosPrivate() {
  const token = getCookie("token");
  useEffect(() => {
    const requestInterceptor = APIPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return () => {
      APIPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);
  return APIPrivate;
}
