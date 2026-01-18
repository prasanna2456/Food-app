import { useEffect, useState } from "react";

const useRestaurantCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Step 1: Fetch from your OWN backend proxy route
      const response = await fetch("/menu"); 
      const json = await response.json();
      
      // Step 2: Extract the restaurant cards from the JSON response
      // Swiggy's collection API usually nests data here:
      const cards = json?.data?.cards || [];
      setData(cards);
    } catch (err) {
      console.error("CORS Proxy Fetch failed:", err);
    }
  };

  return data;
};

export default useRestaurantCards;
