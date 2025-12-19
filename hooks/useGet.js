"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const fetchData = async () => {
    setIsLoading(true);
    //("fetching data from useGet", url);
    try {
      const res = await api.get(url);
     
        // //("response from useGet", res);
        setData(res.data.data);
      
    } catch (err) {
      
        setError(err?.message || err || "Something went wrong");
      
    } finally {
      
        setIsLoading(false);
      
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
export default useGet;

// import { useState } from "react";
// import { useEffect } from "react";
// export const useGet = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const fetchEvents = async () => {
//     try {
//       setIsLoading(true);
//       const result = await fetch("/api/event");
//       const data = await result.json();
//       //("dat", data);
//       setData(data.data);
//       setError(null);
//     } catch (error) {
//       setError(error.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return {
//     data,
//     isLoading,
//     error,
//   };
// };
