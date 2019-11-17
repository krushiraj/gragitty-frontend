import React from 'react'
import { Query } from "react-apollo";

import "../../styles/my-styles.css";
import {
  anonymousProfilePicSrc,
  pageNameToPathMapping
} from "../../utils/constants";
import { GET_CURRENT_USER__USERNAME_PROPIC } from "../../graphql";

const GragittyNavLogo = () => (
  <div className="flex-1 flex items-center">
    <a href="/" className="flex">
      <svg
        width="32"
        height="36"
        viewBox="0 0 32 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.922 35.798c-.946 0-1.852-.228-2.549-.638l-10.825-6.379c-1.428-.843-2.549-2.82-2.549-4.501v-12.762c0-1.681 1.12-3.663 2.549-4.501l10.825-6.379c.696-.41 1.602-.638 2.549-.638.946 0 1.852.228 2.549.638l10.825 6.379c1.428.843 2.549 2.82 2.549 4.501v12.762c0 1.681-1.12 3.663-2.549 4.501l-10.825 6.379c-.696.41-1.602.638-2.549.638zm0-33.474c-.545 0-1.058.118-1.406.323l-10.825 6.383c-.737.433-1.406 1.617-1.406 2.488v12.762c0 .866.67 2.05 1.406 2.488l10.825 6.379c.348.205.862.323 1.406.323.545 0 1.058-.118 1.406-.323l10.825-6.383c.737-.433 1.406-1.617 1.406-2.488v-12.757c0-.866-.67-2.05-1.406-2.488l-10.825-6.379c-.348-.21-.862-.328-1.406-.328zM26.024 13.104l-7.205 13.258-3.053-5.777-3.071 5.777-7.187-13.258h4.343l2.803 5.189 3.107-5.832 3.089 5.832 2.821-5.189h4.352z"></path>
      </svg>
      <span className="mx-4 font-semibold text-2xl">Gragitty</span>
    </a>
  </div>
);

const NavToggleButton = () => (
  <>
    <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
      <svg
        className="fill-current text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </label>
    <input className="hidden" type="checkbox" id="menu-toggle" />
  </>
);

const ProfileMenuItem = ({ isLoggedIn }) => {
  return (
    <a
      id="profile"
      href={`/${isLoggedIn ? "profile" : "login"}`}
      className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor"
    >
      {isLoggedIn ? (
        <Query query={GET_CURRENT_USER__USERNAME_PROPIC}>
          {({ data, loading, error }) => {
            if (error) {
              console.error(error)
            }
            return !loading && !error &&
              data.currentUser && (
                <img
                  id="profile-pic"
                  className="menu-item m-auto rounded-full w-10 h-10 border-2 border-transparent hover:border-green-400"
                  src={data.currentUser.profilePic}
                  alt={data.currentUser.name}
                />
              )
            }
          }
        </Query>
      ) : (
        <img
          id="login-pic"
          className="menu-item m-auto rounded-full w-10 h-10 border-2 border-transparent hover:border-green-400"
          src={anonymousProfilePicSrc}
          alt="Gragitty User"
        />
      )}
    </a>
  );
};

const NavMenuItems = ({ isLoggedIn }) => (
  <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
    <nav>
      <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
        {pageNameToPathMapping.map(({ path, name}, key) => (
          <li key={key}>
            <a
              id={path.slice(1) || "home"}
              className="menu-item lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-green-400"
              href={path}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <ProfileMenuItem isLoggedIn={isLoggedIn} />
  </div>
);

class NavLayout extends React.Component {
  componentDidMount() {
    const { page } = this.props
    const menuItems = document.getElementsByClassName("menu-item")
    for (let menuItem of menuItems) {
      if (menuItem.id.startsWith(page)) {
        menuItem.classList.add("border-green-400")
      } else {
        menuItem.classList.remove("border-green-400")
      }
    }
  }

  render() {
    return (
      <header className="shadow-md lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
        <GragittyNavLogo />
        <NavToggleButton />
        <NavMenuItems isLoggedIn={this.props.isLoggedIn} />
      </header>
    );
  }
}

export default NavLayout