import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

export const LoadingHighlight = () => {
  return (
    <Spinner
      animation="fade"
      visible={true}
      color="#002f67"
      // overlayColor="white"
      size="large"
      textContent=""
      textStyle={{ color: "#0047AB" }}
    />
  );
};

const Loading = () => {
  return (
    <Spinner
      animation="fade"
      visible={true}
      color="#0047AB"
      overlayColor="white"
      size="large"
      textContent="Loading...Please wait"
      textStyle={{ color: "#0047AB" }}
    />
  );
};

export default Loading;
