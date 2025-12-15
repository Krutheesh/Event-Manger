"use client"; 

import { useState } from "react";
import api from "@/"; // <-- your axios instance

export const useAction = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const action = async ({ url, method = "POST", body = {}, config = {} }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api({
        url,
        method,
        data: body,
        ...config,
      });

      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err; // allow caller to handle toast messages
    } finally {
      setIsLoading(false);
    }
  };

  return { action, data, isLoading, error };
};
