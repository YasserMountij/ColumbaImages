import React, { useEffect, useState } from "react";
// import { AiOutlineLogout } from "react-icons/ai";
import { useParams } from "react-router-dom";
// import { GoogleLogout } from "react-google-login";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
const activeBtnStyles =
  "bg-red-500 mr-4 text-white font-bold p-2 rounded-full w-20 outline-none text-white ";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none border-2 border-gray-400 text-white ";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("Created");
  // const navigate = useNavigate();
  const { userId } = useParams();

  // const handleFailure = (response) => {
  //   alert(response);
  // };
  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate('/login')
  // };
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading Profile... " />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center ">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.imageUrl}
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.username}
            </h1>
            {/* <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md px-6 flex items-center "
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout
                        color="red"
                        fontSize={21}
                        className=" "
                      />
                      <p className="px-1 ">Logout</p>
                    </button>
                  )}
                  onLogoutSuccess={handleLogout}
                  onLogoutFailure={handleFailure}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div> */}
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("Created");
              }}
              className={`${
                activeBtn === "Created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
