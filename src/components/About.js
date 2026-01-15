import User from "./User";  
import UserClass from "./UserClass";


const About = () => {
    return (
        <div>
            <h1>About Us</h1>
            <p>This is the About page of our application.</p>
            <User data={{ "name": "Prasanna", "location": "India", "contact": "9876543210" }} />
            <UserClass props={{ "name": "RajuBhai", "location": "Mumbai", "contact": "9876543210" }} />
        </div>
        );
}


export default About;   