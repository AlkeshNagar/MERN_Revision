import { useEffect, useState } from "react";

const FetchApi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Network response was not ok");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("error fetching data", err); // Use console.error for visibility
      }
    }
    fetchApi();
  }, []);

  console.log("my data", data);
  return (
    <>
      <h1>Fetch Api Component</h1>
      <ul>
        {data &&
          data.map((user) => {
            return <li key={user.id}>Name: {user.name}</li>;
          })}
      </ul>
    </>
  );
};

export default FetchApi;
