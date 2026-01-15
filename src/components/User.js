const User = ({ data }) => {
  return (
    <div
      className="user-card"
      style={{ border: "2px solid black", padding: "10px", margin: "10px" }}
    >
      <h2>Name: {data.name}</h2>
      <h3>Location: {data.location}</h3>
      <h4>Contact: {data.contact}</h4>
    </div>
  );
};

export default User;
