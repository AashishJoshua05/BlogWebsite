import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(async () => {
    const response = await fetch("http://localhost:3000/profile", {
      credentials: "include",
    });
    const userInformation = await response.json();
    setUserInfo(userInformation);
  }, []);

  function logout() {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username

  return (
    <header className="flex flex-row justify-between py-8">
      <NavLink to="/" exact>
        <h1 className="font-black text-4xl">Blogs</h1>
      </NavLink>
      {username && (
        <nav className="flex space-x-4 font-semibold">
          <Link to="/create" className="hover:underline">
            Create New Post
          </Link>
          <Link onClick={logout} className="hover:underline">
            Logout
          </Link>
        </nav>
      )}
      {!username && (
        <nav className="flex space-x-4 font-semibold">
          <NavLink to="/login" exact>
            <p className="hover:underline">Login</p>
          </NavLink>
          <NavLink to="/Register" exact>
            <p className="hover:underline">Register</p>
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
