import { useEffect, useState } from "react";

const useRestaurantCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetching from your Render backend proxy
      const response = await fetch("/menu"); 
      const json = await response.json();
      
      // Swiggy's collection data is usually nested here:
      setData(json?.data?.cards); 
    } catch (err) {
      console.error("Frontend fetch failed:", err);
    }
  };

  return data;
};

export default useRestaurantCards;
