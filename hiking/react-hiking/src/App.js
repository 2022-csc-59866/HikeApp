import './App.css';
import React from 'react';
import Title from './views/components/Title';
import Router from './views/components/Router';

import { useState} from "react";

function App() {
  //pass hike results from search bar to body/home page
  const [hikes, setHikes] = useState([]);

  return( <div className="App">
             <Title setResults={setHikes}/>
             <Router hikesResults={hikes}/>
           </div>);
}

export default App;