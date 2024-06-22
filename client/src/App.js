import React, { Fragment } from 'react';
import './App.css';


//components

import InputTeam from "./components/IntputTeam";
import InputMatch from "./components/InputMatch";
import ListTeams from "./components/ListTeams";
import ListMatches from "./components/ListMatches";


function App() {
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center mt-5" >TEAMS</h1>
        <InputTeam />
        <ListTeams />
        <h1 className="text-center mt-5">MATCHES</h1>
        <InputMatch />
        <ListMatches/>
      </div>
    </Fragment>
  );
}

export default App;
