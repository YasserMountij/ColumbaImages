import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  NavBar,
  Feed,
  PinDetails,
  CreatePin,
  Search,
} from "../components/index";

function Pins({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-zinc-800">
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="pin-detail/:pinId"
            element={<PinDetails user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route path="*" element={<Feed />} />
        </Routes>
      </div>
    </div>
  );
}

export default Pins;
