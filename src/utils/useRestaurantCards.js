import { useEffect, useState } from "react";

const useRestaurantCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Changed: Fetch from your own server proxy instead of Swiggy directly
      const response = await fetch("/menu"); 
      const json = await response.json();
      
      // Optional: Log to check structure, usually it's json.data or json.data.cards
      setData(json?.data); 
    } catch (err) {
      console.error("Failed to fetch restaurant cards:", err);
    }
  };

  return data;
};

export default useRestaurantCards;
