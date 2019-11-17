import React, { useEffect } from "react";
import { withRouter } from "react-router";

import NavLayout from "../components/common/nav-layout"
import { isLoggedIn } from "../utils/constants";
import { pageMapping, masterRedirectUrl } from "../utils/constants"
import { setCookie, getCookie, deleteCookie } from "../utils/cookie";

const getPathFromPathName = (pathname) => (
  (pathname.split('/')[1]) ||
  'home'
)

const getSearchObjectFromString = (searchStr) => {
  let search = {}
  const kvPairs = searchStr.slice(1).split('&')
  for (let kv of kvPairs) {
    const [key, value] = kv.split('=')
    if(key !== '')
      search[key] = value;
  }
  return search
}

const getPageByLocation = (path, search, isLoggedIn) => {
  const { page, isPrivate, redirectUrl } = pageMapping[path]
  const Page = page
  console.log({
    page, isLoggedIn, isPrivate, redirectUrl
  })
  if (isPrivate) {
    // console.log('is private')
    if(isLoggedIn) {
      // console.log('is logged in')
      return (
        <Page
          search={getSearchObjectFromString(search)}
          isLoggedIn={isLoggedIn}
        />
      );
    } else {
      // console.log('redirecting')
      window.location = redirectUrl || masterRedirectUrl;
    }
  } else {
    return (
      <Page
        search={getSearchObjectFromString(search)}
        isLoggedIn={isLoggedIn}
      />
    );
  }
}

const handleComponentMountEffect = () => {
  fetch("https://gragitty.herokuapp.com/", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://gragitty.netlify.com/",
      "x-token": getCookie("x-token", "")
    },
    method: "GET"
  })
    .then(res => res.json())
    .then(({ auth, token, newToken }) => {
      if (newToken) {
        setCookie("x-token", token);
      }
      if (auth) {
        console.log("Token valid", { auth, newToken });
      } else {
        deleteCookie("x-token");
        deleteCookie("bearer-auth-id");
        console.log("Token expired", { auth, newToken });
      }
    })
    .catch(console.error);
};

export default withRouter(({ location: {pathname, search} }) => {
  const path = getPathFromPathName(pathname)
  useEffect(handleComponentMountEffect)
  return (
    <div className="m-0">
      <NavLayout page={path} isLoggedIn={isLoggedIn()}/>
      <div className="lg:p-4 sm:p-2 lg:mx-64">
        {getPageByLocation(path, search, isLoggedIn())}
      </div>
    </div>
  );
});
