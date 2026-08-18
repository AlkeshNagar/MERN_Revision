import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const params = useParams();

  return (
    <>
      <h1>I am {params.username}</h1>
      <p>Use URL write any name in place of username to see dynamic routing . . .</p>
    </>
  );
};

export default User;
