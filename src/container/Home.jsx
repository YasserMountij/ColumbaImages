import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { SideBar, UserProfile } from "../components";
import { client } from "../client";
import Pins from "./Pins";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import Logo from "../assets/Logo.svg";
import { userQuery } from "./../utils/data";
import { fetchuser } from "./../utils/fetchUser";
function Home() {
  const [toggelSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfos = fetchuser();

  useEffect(() => {
    const query = userQuery(userInfos?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfos]);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-zinc-800 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row bg-zinc-800">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md ">
          <HiMenu
            color="white"
            fontSize={40}
            className="cursor-pointer"
            onClick={() => {
              setToggleSideBar((toggelSideBar) => !toggelSideBar);
            }}
          />
          <Link to="/">
            <img src={Logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.imageUrl} alt="logo" className="w-28" />
          </Link>
        </div>
        {toggelSideBar && (
          <div className="fixed w-4/5 bg-zinc-800 h-screen overflow-y-auto shadow-md z-10 animate-slide-in  ">
            <div className="absolute bg-zinc-800 w-full flex justify-end items-center p-2 z-10 ">
              <AiFillCloseCircle
                color="white"
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSideBar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
