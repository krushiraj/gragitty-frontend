import {
  AboutPage,
  CalendarPage,
  HomePage,
  LoginPage,
  ProfilePage,
  TasksPage
} from "../pages/index";
import { getCookie, deleteCookie, setCookie } from "./cookie";

export const anonymousProfilePicSrc = "data:image/jpeg;base64,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"

export const CLIENT_ID =
  "pk_production_153995bec82bc38944048fc2d0e8d9f5b16ce9654f287c11dd";
export const GRAPHQL_URL = "https://gragitty.herokuapp.com/graphql";
export const AUTH_URL = "https://gragitty.herokuapp.com/auth";

export const pageNameToPathMapping = [
  { name: "Home", path: "/" },
  { name: "Calendar", path: "/calendar" },
  { name: "Tasks", path: "/tasks" },
  { name: "About", path: "/about" }
];

export const pageMapping = {
  about: { page: AboutPage, isPrivate: false, redirectUrl: "" },
  calendar: { page: CalendarPage, isPrivate: true, redirectUrl: "" },
  home: { page: HomePage, isPrivate: false, redirectUrl: "" },
  login: { page: LoginPage, isPrivate: false, redirectUrl: "" },
  profile: { page: ProfilePage, isPrivate: true, redirectUrl: "" },
  tasks: { page: TasksPage, isPrivate: true, redirectUrl: "" }
};

export const masterRedirectUrl = "/login";

export const checkLoggedIn = (setLoggedIn) => (
  fetch("https://gragitty.herokuapp.com/", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://gragitty.netlify.com/",
      "x-token": getCookie("x-token")
    },
    method: "GET"
  }).then(res => res.json())
    .then(({ auth, token, newToken }) => {
      if (auth && newToken) {
        setCookie('x-token', token)
        setLoggedIn(true)
        console.log('Token valid', {auth, newToken})
      } else {
        deleteCookie('x-token')
        deleteCookie('bearer-auth-id')
        setLoggedIn(false)
        console.log('Token expired', {auth, newToken})
      }
    })
    .catch(console.error)
)