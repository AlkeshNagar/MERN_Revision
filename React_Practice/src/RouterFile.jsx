import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import User from "./components/User";
import College from "./components/College";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import Apis from "./Query_and_APIs/Apis";
import FetchApi from "./Query_and_APIs/FetchApi";
import AxiosApi from "./Query_and_APIs/AxiosApi";

export const RouterFile = () => {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {/*Using NavLink here to use Actice color change functionality. if the link is active/component is active it would change the color*/}
          <NavLink
            className={(e) => {
              return e.isActive ? "red" : "green";
            }}
            to="/user/:username"
          >
            User
          </NavLink>
          <NavLink
            className={(e) => {
              return e.isActive ? "red" : "green";
            }}
            to="/college"
          >
            College
          </NavLink>
          <NavLink
            className={(e) => {
              return e.isActive ? "red" : "green";
            }}
            to="/apis"
          >
            API's
          </NavLink>
        </nav>



        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:username" element={<User />} />

          {/* Exploring nested route concept, Syntax is bit different */}
          <Route path="/college" element={<College />}>
            <Route path="student" element={<Student />} />
            <Route path="teacher" element={<Teacher />} />
          </Route>

          {/* Api related routing here */}
          <Route path="/apis" element={<Apis />}>
            <Route path="fetchapi" element={<FetchApi />} />
            <Route path="axiosapi" element={<AxiosApi/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
