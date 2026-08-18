// Nested route concept is here. Route component inside another component.

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const College = () => {
  const navigate = useNavigate();
  // Will be used for conditional rendering
  const [delayMessage, setDelayMessage] = useState(false);

  function HandleClick() {
// enable waiting message to render
    setDelayMessage(true);

    // delay nevidation for 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <p>Please wait</p>;
  }
  return (
    <>
      <h1>Welcome to the College</h1>
      <p>Let's Learn Nested Routing . . .</p>

      {/* sytntax is bit different in "to" where we are providing path */}
      <NavLink
        className={(e) => {
          return e.isActive ? "nestedActive" : "nestedInActive";
        }}
        to="student"
      >
        Student
      </NavLink>
      <NavLink
        className={(e) => {
          return e.isActive ? "nestedActive" : "nestedInActive";
        }}
        to="teacher"
      >
        Teacher
      </NavLink>
      <Outlet />

      {/* Button Will Trigger programmatic routing */}
      {/* Also applied condiotional Rendering */}
      {delayMessage  ? (
        <h2>Please wait . . . </h2>
      ) : (
        <button onClick={HandleClick}>Back to Home</button>
      )}
    </>
  );
};

export default College;
