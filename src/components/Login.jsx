import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import Video from "../assets/loginVideo.mp4";
import FullLogo from "../assets/FullLogo.svg";
import { FcGoogle } from "react-icons/fc";
import { client } from "../client";

function Login() {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const handleSuccess = (response) => {
    setloginData(response.profileObj);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    navigate("/");

    //sanity
    const doc = {
      _id: googleId,
      _type: "user", //type of document sanity
      username: name,
      imageUrl: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      // navigate("/", { replace: true });
    });
  };
  const handleFailure = (response) => {
    alert(response);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setloginData(null);
  };

  return (
    <div
      className="flex
     justify-start
     items-center
     flex-col
     h-screen"
    >
      <div
        className="relative 
      w-full
      h-full"
      >
        <video
          src={Video}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div
          className="absolute 
        flex
        flex-col
        justify-center
        items-center
        top-0 right-0
        bottom-0
        left-0
        bg-black/50 "
        >
          <div className="p-5">
            <img src={FullLogo} alt="Logo" width="180px" />
          </div>
          <div className="shadow-2xl">
            {loginData ? (
              <div className="bg-gray-300 flex flex-col justify-center items-center p-3 rounded-lg outline-none  ">
                <div className="flex ">
                  <FcGoogle className="mr-4 text-2xl " />
                  Logged as {loginData.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="outline-1 p-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-gray-300 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none text-black "
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4 text-2xl  " />
                    Login with Google
                  </button>
                )}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
