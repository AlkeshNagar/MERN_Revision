import { useContext, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../contextAPI/ContextCreate";
const AxiosApi = () => {
  const {data, setData} = useContext(DataContext);

  useEffect(() => {
    async function AxiosApi() {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        const response = res.data;
        setData(response);
      } catch (err) {
        console.error("error fetching data", err); // Use console.error for visibility
      }
    }
    AxiosApi();
  });

  return (
    <>
      <h1>Axios Api Component</h1>
      <h3>This data is first saved in context api and then rendered on the screen</h3>
      <ul>
        {data &&
          data.map((user) => {
            return <li key={user.id}>Email: {user.email}</li>;
          })}
      </ul>
    </>
  );
};

export default AxiosApi;
