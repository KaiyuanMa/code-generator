import Login from "./Login";
import Signup from "./Signup";
import React, { useState } from "react";

export default function UserControl() {
  const [curPage, setPage] = useState(true);

  return (
    <div>
      {curPage ? <Login setPage={setPage} /> : <Signup setPage={setPage} />}
      {curPage ? 
        <p className='account'>Don't have an account? <a onClick={() => setPage(!curPage)}>Sign Up</a></p> :
        <p className='account'>Already have an account? <a onClick={() => setPage(!curPage)}>Login</a></p>
      }
    </div>
  );
}
