import RestaurantCard from "./RestaurantCard";
import { resObj } from "../utils/data";
import { use, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import useRestaurantCards from "../utils/useRestaurantCards";

const Body = () => {
  const [list, setlist] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");


  const json =useRestaurantCards();
  

     useEffect(() => {
       const restaurantCards =
         json?.cards?.filter(
           (item) =>
             item?.card?.card?.["@type"] ===
             "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
         )||[];

       setlist(restaurantCards);
       setFilteredList(restaurantCards);
     }, [json]); 

if (list.length === 0) {
    return <Shimmer />;
  }
  

  const fiterfun = () => {
    const filtersearch = list.filter((item) =>
      item?.card?.card?.info.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredList(filtersearch);
  };

  return (
    <div className="body">
      <input
        type="text"
        placeholder="Search"
        className="search-box"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <button
        className="search-btn"
        onClick={() => {
          fiterfun();
        }}
      >
        Search
      </button>
      <button
        className="filter-btn"
        onClick={() => {
          const filteredList = list.filter(
            (res) => res.card.card.info.avgRating > 4.4
          );
          setFilteredList(filteredList);
        }}
      >
        Top Rated Restaurants
      </button>
      <div className="res-container">
        {filteredList.map((restaurant) => (
          <RestaurantCard
            key={restaurant.card.card.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

{
  /* <RestaurantCard
          resName="Shree Anandhaas"
          rating="4.7 (5.2K+ ratings).9"
          price="₹250 for two"
          cuisine="South Indian, Snacks, Biryani Sai Baba Colony"
        /> */
}
{
  /* <RestaurantCard
          resName="Annapoorana"
          rating="4.9"
          price="₹300"
          cuisine="Veg South Indian items"
        /> */
}

export default Body;
