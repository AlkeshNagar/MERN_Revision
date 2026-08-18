import { NavLink, Outlet } from "react-router-dom";

const Apis = () => {
  return (
    <>
      <NavLink
        className={(e) => {
          return e.isActive ? "nestedActive" : "nestedInActive";
        }}
        to="fetchapi"
      >
        Fetch API
      </NavLink>
      <NavLink
        className={(e) => {
          return e.isActive ? "nestedActive" : "nestedInActive";
        }}
        to="axiosapi"
      >
        Axios API
      </NavLink>
      <Outlet />
    </>
  );
};

export default Apis;
