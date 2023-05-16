import React from 'react';
import './App.css';

//routing
import { useState} from "react";

//components
import Title from './views/components/Title/Title';
import Router from './views/components/Router/Router';

function App() {
  //pass hike results from search bar to body/home page
  const [hikes, setHikes] = useState([]);

  return( <div className="App">
             <Title setResults={setHikes}/>
             <Router hikesResults={hikes}/>
           </div>);
}

export default App;