import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from '../pages'

function App() {
  return (
    <div className="text-center bg-white">
      <Router>
        <Route path="/*" component={Layout} />
      </Router>
    </div>
  );
}

export default App;
