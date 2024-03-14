// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-green-200 ">
      <div className="flex justify-between max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-5">
        <Link to='/'><li className="font-bold">Home</li></Link>
        <Link to='/about'><li className="font-bold">About</li></Link>
        <Link to='/signin'><li className="font-bold">Sign in</li></Link>
        <Link to='/signup'><li className="font-bold">Sign up</li></Link>
        </ul>
      </div>
    </div>
  );
}
