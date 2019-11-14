import React from "react";
import { withRouter } from "react-router";

import NavLayout from "../components/common/nav-layout"
import { getCookie } from "../utils/cookie";
import { pageMapping, masterRedirectUrl } from "../utils/constants"

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

  if (isPrivate) {
    if(isLoggedIn) {
      return (
        <Page
          search={getSearchObjectFromString(search)}
          isLoggedIn={isLoggedIn}
        />
      );
    } else {
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

export default withRouter(({ location: {pathname, search} }) => {
  const path = getPathFromPathName(pathname)
  const isLoggedIn = (
    getCookie("bearer-auth-id", false) &&
    getCookie("x-token", false)
  );
  return (
    <div className="m-0">
      <NavLayout page={path} isLoggedIn={isLoggedIn}/>
      <div className="lg:p-4 sm:p-2 lg:mx-64">{getPageByLocation(path, search, isLoggedIn)}</div>
    </div>
  );
});
