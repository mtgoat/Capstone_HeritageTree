import React, { useState } from 'react';



const UI = ({ setApikey, keyModalOpen, setKeyModalOpen }) => {
	const [input, setInput] = useState('');

	return (
		<div id="ui">
			{keyModalOpen && (
				<div id="key-modal">
					<div className="form">
						{/* <div className="icon-wrapper">
							<img src={ReactLogo} className="icon" />
							<img src={EsriLogo} className="icon" />
							<img src={LeafletLogo} className="icon" />
						</div> */}
						<h2>react-esri-leaflet</h2>
						<p>
							Enter a valid ArcGIS Developers apikey to use key-protected
							features, such as:
						</p>
						<ul>
							<li>VectorBasemapLayer</li>
							<li>esri-leaflet-geocoder's arcgisOnlineProvider provider</li>
						</ul>
						<textarea
							id="key-input"
							onChange={(e) => setInput(e.target.value)}
							placeholder="Enter a valid ArcGIS Developers api key or token"
							defaultValue={input}
						/>
						<div className="bottom">
							<button id="cancel-submit" onClick={() => setKeyModalOpen(false)}>
								Continue without API key
							</button>
							<button
								id="key-submit"
								onClick={() => {
									setApikey(input);
									setKeyModalOpen(false);
								}}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			)}
			<div id="codesandbox-container">
				<a
					href="https://codesandbox.io/s/github/slutske22/react-esri-leaflet/tree/master/example"
					target="_blank"
				>
					<img src="" />
				</a>
				<h4>
					Edit this demo
					<br />
					on CodeSandbox
				</h4>
			</div>
			<div id="key-container" onClick={() => setKeyModalOpen(true)}>
				<img src="" />
				<h4>Add your API key</h4>
			</div>
		</div>
	);
};

export default UI;
