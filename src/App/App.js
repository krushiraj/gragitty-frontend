import React from 'react';
import styled from 'styled-components';

import './App.css';

const NoteSection = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: black;

  p {
    margin: auto;
    color: yellow;
  }
`

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <NoteSection>
        <p>
          Welcome to <i>Gragitty</i>. This site is currently under development,
          please visit back us after some time.
        </p>
      </NoteSection>
    </div>
  );
}

export default App;
