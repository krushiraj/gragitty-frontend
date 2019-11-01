import React from "react";
import styled from "styled-components";

import BearerAuthButton from "../components/bearer-auth-button";
import LoginButton from "../components/login-button";

const NoteSection = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: black;
  flex-direction: column;

  p {
    margin: 0 auto;
    color: yellow;
  }
`;

export default () => (
  <NoteSection>
    <p>
      Welcome to <i>Gragitty</i>. This site is currently under development,
      please visit back us after some time.
    </p>
    <p>
      You must have email and name set for your profile to access this service.
      Make sure that you have those set by checking it{" "}
      <a
        href="https://github.com/settings/profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      .{" "}
    </p>
    <LoginButton />
    <BearerAuthButton />
  </NoteSection>
);
