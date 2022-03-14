import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <ThreeDots color="00BFFF" height={50} width={50} className="m-5" />
      <p className="text-lg text-center px-2 "> {message}</p>
    </div>
  );
}

export default Spinner;
