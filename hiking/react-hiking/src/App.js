import './App.css';
import React from 'react';
import Title from './views/components/Title';
import Body from './views/components/Body';

import { useState} from "react";

function App() {
  //pass hike results from search bar to body/home page
  const [hikes, setHikes] = useState([]);

  return( <div className="App">
            <Title setResults={setHikes}/>
            <Body hikesResults={hikes}/>
          </div>);
}

export default App;