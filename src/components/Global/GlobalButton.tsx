import React from "react";
import { ReactComponent as Spinner } from "../../SVGIcons/spinner.svg";

type Props = {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  setStatus: any;
  status: string;
  classNames?: string;
  onClick?: any;
};

const GlobalButton = ({ text, type, setStatus, status, classNames , onClick}: Props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <button
      className={`w-full flex bg-primary rounded-full items-center justify-center py-3 text-white font-medium relative overflow-hidden outline-none
            after:bg-gradient-to-r after:from-primary after:via-primaryLight after:via-80% after:to-primaryLight after:w-96 after:h-96 after:-rotate-45 after:absolute after:-right-96 hover:after:right-10 after:transition-all after:ease-in-out after:duration-700
            ${loading && "after:right-10 after:animate-pulse"} ${classNames}
        `}
      type={type ? type : "button"}
      onClick={() => {
        // setLoading(!loading);
        // setStatus(status);
        // console.log("status", status);
        onClick()
      }}
    >
      <span className="relative !z-10">
        {loading ? <Spinner className="animate-spin h-6" /> : text}
      </span>
    </button>
  );
};

export default GlobalButton;
