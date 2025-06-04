import React from "react";
// import "./LoadingSpinner.css";
import { keyframes, styled } from "@mui/material";

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Spinner = styled("div")({
  width: "200px",
  height: "200px",
  borderRight: "6px solid #fff",
  borderRadius: "50%",
  animation: `${rotation} 2s infinite linear`,
});

function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  );
}

export default LoadingSpinner;
