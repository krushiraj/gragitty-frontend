import React from "react";

import { GET_CURRENT_USER } from "../graphql"
import { Query } from "react-apollo";
import errorSvg from "../static/error.svg"
import Loading from "../components/common/loading"

import { deleteCookie } from "../utils/cookie";

const handleLogout = () => {
  deleteCookie("bearer-auth-id");
  deleteCookie("x-token");
};

const ProfileDetails = ({
  name,
  username,
  email,
  profilePic,
  gitProfile,
  createdAt
}) => {
  return (
    <>
      <div className="flex flex-row justify-between w-full border-b-2">
        <span className="my-auto mx-4 text-lg">
          <span className="font-bold">Gragitty</span> profile
        </span>
        <a
          className="bg-orange-500 hover:bg-orange-700 text-white font-normal py-2 px-4 m-4"
          onClick={handleLogout}
          href="/"
        >
          Logout
        </a>
      </div>
      <div className="flex items-center flex-col mx-auto h-auto lg:w-1/3 sm:w-full">
        <img src={profilePic} alt={username} className="rounded-full m-2" />
        <table className="table-auto text-left my-2">
          <tbody>
            <tr>
              <td className="font-medium py-2">Username: </td>
              <td className="px-2 py-2">{username}</td>
            </tr>
            <tr>
              <td className="font-medium py-2">Name: </td>
              <td className="px-2 py-2">{name}</td>
            </tr>
            <tr>
              <td className="font-medium py-2">Email: </td>
              <td className="px-2 py-2">{email}</td>
            </tr>
            <tr>
              <td className="font-medium py-2">Github Profile: </td>
              <td className="px-2 py-2 green-500">
                <a
                  className="bg-green-100 border-b-1 hover:bg-green-400 hover:border-red-200"
                  href="https://github.com/settings/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {gitProfile}
                </a>
              </td>
            </tr>
            <tr>
              <td className="font-medium py-2">Created On: </td>
              <td className="px-2 py-2">
                {new Date(Number.parseInt(createdAt)).toLocaleTimeString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};

export default () => (
  <div className="flex items-center flex-col h-auto w-full">
    <Query query={GET_CURRENT_USER}>
      {
        ({ data, loading, error}) => {
          if (error) {
            return <div className="m-auto flex flex-col">
              <img src={errorSvg} alt="error" className="m-auto"/>
              <p>There is an error fetching the details</p>
            </div>
          } else if (loading) {
            return (
              <div className="m-auto flex flex-col">
                <Loading />
                <p>Please wait while we fetch your profile details</p>
              </div>
            );
          } else if (data.currentUser) {
            return <ProfileDetails {...data.currentUser} />
          }
        }
      }
    </Query>
  </div>
)
