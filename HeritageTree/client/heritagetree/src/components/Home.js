//To Do: css

import React, {useState} from "react";
import { Map } from './assets/Map';
import UI from './assets/UI';
import './styles.css';
import { APIKey } from "./assets/APIKey";



export default function Home() {
  const [apikey, setApikey] = useState(APIKey);
	const [keyModalOpen, setKeyModalOpen] = useState(true);




	return (
    <>
    <div><p className="mapTitle"></p></div>
		<div className="App">
			 <Map 
			apikey={apikey } 
			/>
			{/* <UI
				setApikey={setApikey}
				keyModalOpen={keyModalOpen}
				setKeyModalOpen={setKeyModalOpen}
			/>  */} 
		 </div>
    </>
	);
}