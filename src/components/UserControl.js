import Login from "./Login";
import Signup from "./Signup";
import React, { useState } from "react";

export default function UserControl() {
  const [curPage, setPage] = useState(false);

  return (
    <div>
      <button onClick={() => setPage(!curPage)}>
        {curPage ? "signup" : "login"}
      </button>

      {curPage ? <Login setPage={setPage} /> : <Signup setPage={setPage} />}
    </div>
  );
}
