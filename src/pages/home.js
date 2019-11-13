import React from "react";
import styled from "styled-components";

import BearerAuthButton from "../components/common/bearer-auth-button";

const NoteSection = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;

  p {
    margin: 0 auto;
    color: black;
  }
`;

export default ({search}) => (
  <NoteSection>
    <p>
      Welcome to <i>Gragitty</i>. This site is currently under development,
      please visit back us after some time.
    </p>
    <p>
      You must have email and name set for your profile to access this service.
      Make sure that you have those set by checking it{" "}
      <a
        className="bg-green-100 border-b-1 hover:bg-green-400 hover:border-red-200"
        href="https://github.com/settings/profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      .{" "}
    </p>
    <BearerAuthButton />
  </NoteSection>
);
