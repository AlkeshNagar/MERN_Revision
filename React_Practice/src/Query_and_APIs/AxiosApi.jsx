import { useEffect, useState } from "react";
import axios from "axios";
const AxiosApi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function AxiosApi() {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        setData(res.data);
      } catch (err) {
        console.error("error fetching data", err); // Use console.error for visibility
      }
    }
    AxiosApi();
  }, []);

  console.log("my data", data);
  return (
    <>
      <h1>Axios Api Component</h1>
      <ul>
        {data &&
          data.map((user) => {
            return <li key={user.id}>Name: {user.name}</li>;
          })}
      </ul>
    </>
  );
};

export default AxiosApi;
