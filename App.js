import React from "react";
import ReactDOM from "react-dom/client";

//React createElement => Object =>HTMLElement (render)


//JSX

const jsxheading = (
  <h1 className="head" id="head">
    RENDER BY JSXx``
    </h1>
    
);
const jsx = ReactDOM.createRoot(document.getElementById("jsxroot"));
jsx.render(jsxheading);





//React functional Component

const Title = () => (
  <div>
    
    <h1>Title🚀</h1>
  </div>
);



// Component compositions
const Headingcomponent = () => {
  return (
    <div>
      <Title />
      <h1>React Component</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Headingcomponent />);
