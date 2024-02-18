import React from "react";
import axios from "axios";

export const GetRequest = async (url, header) => {
  let response = "";

  await axios
    .get(url, { headers: header })
    .then((res) => {
      // console.log(res.data.businesses);
      response = res;
    })
    .catch((e) => {
      console.log(e);
    });

  return response.data;
};

export const PostRequest = async (url) => {
  let response = "";

  await axios
    .post(url)
    .then(async (res) => {
      // console.log(res.data.access_token);

      response = res;
    })
    .catch((e) => {
      console.log(e);
    });

  return response.data;
};
