//for now

import React, {useState} from "react";
import Map from './Map';
import UI from './UI';
import './styles.css';
import { APIKey } from "./APIKey";

export default function Home() {
  const [apikey, setApikey] = useState(APIKey);
	const [keyModalOpen, setKeyModalOpen] = useState(true);

	return (
		<div className="App">
			<Map apikey={apikey } />
			<UI
				setApikey={setApikey}
				keyModalOpen={keyModalOpen}
				setKeyModalOpen={setKeyModalOpen}
			/>
		</div>
	);
}