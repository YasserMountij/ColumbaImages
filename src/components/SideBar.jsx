import React from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/Logo.svg";
import { GoogleLogout } from "react-google-login";
import { AiOutlineLogout } from "react-icons/ai";

import { categories } from "../utils/data";
const isNotActiveStyle =
  "flex items-center px-4 gap-3 text-white hover:font-bold transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-4 gap-3 font-bold border-r-4 border-black transition-all duration-200 ease-in-out capitalize bg-zinc-600 p-2 ";

function SideBar({ user, closeToggle }) {
  const navigate = useNavigate();
  const handleFailure = (response) => {
    alert(response);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between h-full bg-zinc-800 overflow-y-scroll min-w-210 hide-scrollbar  ">
      <div>
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex px-5 gap-2 my-6 pt-1 w-190 items-center z-20 "
            onClick={handleCloseSidebar}
          >
            <img src={logo} alt="logo" className="w-28  " />
          </Link>
        </div>
        <div className="flex flex-col gap-5 max-h-[calc(100vh_-_20rem)] overflow-y-auto bg-zinc-700 pt-4 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill color="white" />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl border-b-2 border-t-2 border-white p-2 ">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-10 h-10 rounded-full shadow-sm "
                alt=""
              />
              {category.name}
            </NavLink>
          ))}
          {/* -1 so we donc list others */}
        </div>
      </div>
      {user && (
        <div className=" mb-4 ">
          <Link
            to={`user-profile/${user._id}`}
            className=" flex my-5 gap-2 mx-3 mb-2 items-center bg-zinc-800 border-2 border-white rounded-lg p-2"
            onClick={handleCloseSidebar}
          >
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <p> {user.username} </p>
          </Link>
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                type="button"
                className="cursor-pointer outline-none shadow-md px-6 flex rounded-lg p-2 my-5 gap-2 mx-3 mb-2 items-center "
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <AiOutlineLogout color="red" fontSize={21} className=" " />
                <p className="px-1 text-white ">Logout</p>
              </button>
            )}
            onLogoutSuccess={handleLogout}
            onLogoutFailure={handleFailure}
            cookiePolicy="single_host_origin"
          />
        </div>
      )}
    </div>
  );
}

export default SideBar;
