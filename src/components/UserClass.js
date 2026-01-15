import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      count: 0,
      count1: 1,
    };
  }
  render() {
    const { name, location, contact } = this.props.props;
    const { count, count1 } = this.state;
    return (
      <div
        className="user-card"
        style={{ border: "2px solid black", padding: "10px", margin: "10px" }}
      >
        <h1>count: {count}</h1>
            <h1>count1: {count1}</h1>
            <button onClick={() => this.setState({ count: count + 1 })}>INC</button>
        <h1>User Class Component</h1>
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: {contact} </h4>
      </div>
    );
  }
}

export default UserClass;
