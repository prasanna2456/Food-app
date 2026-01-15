import { useEffect, useState } from "react";

const useRestaurantCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.0694457&lng=76.9971301&collection=80477&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );

      const json = await data.json();
      setData(json.data);
    };
    return data;
    
};

export default useRestaurantCards;
