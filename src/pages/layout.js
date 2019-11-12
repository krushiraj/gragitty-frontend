import React from "react";
import { withRouter } from "react-router";

import NavLayout from "../components/common/nav-layout"

import {
  AboutPage,
  CalendarPage,
  HomePage,
  LoginPage,
  ProfilePage,
  TasksPage
} from './index'

const pageMapping = {
  'about': AboutPage,
  'calendar': CalendarPage,
  'home': HomePage,
  'login': LoginPage,
  'profile': ProfilePage,
  'tasks': TasksPage
}

const getPageByLocation = (location) => {
  const path = (
    (location.pathname.split('/')[1]) ||
    'home'
  )
  const Page = pageMapping[path]
  return <Page />
}

export default withRouter(({ location }) => {
  return (
    <div className="m-0">
      <NavLayout />
      <div className="p-4 mx-64">{getPageByLocation(location)}</div>
    </div>
  );
});
