import { CDN_URL } from "../utils/constants";




const RestaurantCard = ({ resData }) => {
  const { name, avgRating, costForTwo, cuisines, cloudinaryImageId } =
    resData.card.card.info;

  return (
    <div className="res-card ">
      <img className="rescard-logo" src={CDN_URL + cloudinaryImageId} />
      <h2 style={{ color: "rgba(2, 6, 12, 0.92)", fontFamily: "Gilroy" }}>{name}</h2>
      <h3>{avgRating}</h3>
      <h3>{costForTwo}</h3>
      <h4 style={{ color: "rgba(2, 6, 12, 0.6)", fontFamily: "Gilroy" }}>
        {cuisines.join(", ")}
      </h4>
    </div>
  );
};
export default RestaurantCard;
 

// const RestaurantCard = ({resName,rating,price,cuisine}) => {
//     return (<div className="res-card">
//         <img
//             className="rescard-logo"
//             src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/efoshdukb4z46gbknxxr"
//         />
//         <h2 >{ resName}</h2>
//         <h3>{ rating}</h3>
//         <h3>{ price}</h3>
//         <h4>{ cuisine}</h4>
//     </div>
//     )
// };