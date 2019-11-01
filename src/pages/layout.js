import React from "react";
import { withRouter } from "react-router";

import {
  AboutPage,
  CalendarPage,
  HomePage,
  LoginPage,
  ProfilePage,
  TasksPage
} from './index'

console.log({
  AboutPage,
  CalendarPage,
  HomePage,
  LoginPage,
  ProfilePage,
  TasksPage
});

const pageMapping = {
  'about': AboutPage,
  'calendar': CalendarPage,
  'home': HomePage,
  'login': LoginPage,
  'profile': ProfilePage,
  'tasks': TasksPage
}

console.log(pageMapping)

const getPageByLocation = (location) => {
  const path = (
    (location.pathname.split('/')[1]) ||
    'home'
  )
  const Page = pageMapping[path]
  console.log({Page, path})
  return <Page />
}

export default withRouter(({ location }) => {
  return (
  <div>
    This is Layout page
    {getPageByLocation(location)}
  </div>
  )
});
