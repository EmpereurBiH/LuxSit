import React from "react";
import './App.css';
import Armors from "./Pages/Armors";
import Weapons from "./Pages/Weapons";
import Main from "./Pages/Main";
import Players from "./Pages/Players";
import ArmorDetails from "./Pages/ArmorDetails";
import Enemies from "./Pages/Enemies";
import EnemyDetails from "./Pages/EnemyDetails";
import WeaponDetails from "./Pages/WeaponDetails";

import{ BrowserRouter as Router, link, Route, Switch } from "react-router-dom";

//"npm start" in terminal to start it

function App(){
  return (   
  <Router> 
   <Route path="/" exact render={(props) => <Main />} />
   <Route path="/weapons" render={(props) => <Weapons />} />
   <Route path="/armors" render={(props) => <Armors />} />
   <Route path="/players" render={(props) => <Players />} />
   <Route path="/armordetails" render={(props) => <ArmorDetails />} />
   <Route path="/enemies" render={(props) => <Enemies />} />
   <Route path="/enemydetails" render={(props) => <EnemyDetails />} />
   <Route path="/weapondetails" render={(props) => <WeaponDetails />} />
  </Router>
);
}

export default App;
