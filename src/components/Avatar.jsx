import React from "react";
import { FaUserCircle } from "react-icons/fa";

export const Avatar = ({ imageUrl, asLink }) => {
  return (
    <span>
      {imageUrl ? (
        <img
          src={imageUrl}
          width="50px"
          height="50px"
          alt="User avatar"
          style={{ borderRadius: "50px" }}
        />
      ) : (
        <FaUserCircle
          size={50}
          style={{
            display: "flex",
            alignSelf: "center",
            opacity: 0.25,
            cursor: asLink ? "pointer" : "context-menu",
          }}
        />
      )}
    </span>
  );
};
