import { use, useEffect } from "react";

const RestaurantMenu = () => {
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=11.0694457&lng=76.9971301&restaurantId=79607&catalog_qa=undefined&query=PAROTTA&submitAction=ENTER"
    );
    const json = await data.json();
    console.log(json);

    return <div>RestaurantMenu</div>;
  };
};

export default RestaurantMenu;
