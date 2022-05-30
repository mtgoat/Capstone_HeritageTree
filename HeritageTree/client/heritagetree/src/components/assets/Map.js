import React, { useContext, useEffect, Component, createRef} from 'react';
import { PostContext } from '../../providers/PostProvider'; 
import { PostMarker } from './PostMarker';
import { MapContainer, LayersControl, useMapEvents, TileLayer, Marker, Popup} from 'react-leaflet';

import {
	BasemapLayer,
	FeatureLayer,
	DynamicMapLayer,
	TiledMapLayer,
	ImageMapLayer,
} from 'react-esri-leaflet';

import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import "./PostMaker.css";
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';




// import HeatmapLayer from 'react-esri-leaflet/plugins/HeatmapLayer';
// import ClusterLayer from 'react-esri-leaflet/plugins/ClusterLayer';
// import VectorBasemapLayer from 'react-esri-leaflet/plugins/VectorBasemapLayer';
// import VectorTileLayer from 'react-esri-leaflet/plugins/VectorTileLayer';

// Alternative imports for local build tests:

// import 'leaflet';

// import {
// 	MapContainer,
// 	LayersControl,
// 	useMapEvents,
// } from '../../../node_modules/react-leaflet';

// import {
// 	BasemapLayer,
// 	FeatureLayer,
// 	DynamicMapLayer,
// 	TiledMapLayer,
// 	ImageMapLayer,
// } from '../../../build';

//import EsriLeafletGeoSearch from '../../../plugins/EsriLeafletGeoSearch';
// import HeatmapLayer from '../../../plugins/HeatmapLayer';
// import ClusterLayer from '../../../plugins/ClusterLayer';
// import VectorBasemapLayer from '../../../plugins/VectorBasemapLayer';
// import VectorTileLayer from '../../../plugins/VectorTileLayer';

// const MapEvents = () => {
// 	const map = useMapEvents({
// 		click: (e) => console.log(e.latlng, map.getZoom()),
// 	});
// 	return null;
// };


export const Map = ({ apikey }) => {
	const featureLayerRef = React.useRef();

	const { posts, getAllPosts, nonAppPosts, getAllNonAppPosts, setPosts, result, setResult } = useContext(PostContext);


	
  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getAllNonAppPosts();
  }, []);

  console.log(nonAppPosts)
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const currentUserType = currentUser?.userTypeId;
//   const addToState = (response) => {
// 	console.log(response)
// 	let copyOfState = result
// 	console.log(copyOfState)
// 	let newObjectToAdd = {
// 		latitude: response.latlng.lat,
// 		longitude:response.latlng.lng,
// 		address: response
// 	}
// 	copyOfState.push(newObjectToAdd)
// 	console.log("thisis copy of state after you added something", copyOfState)
// 	setPosts(copyOfState)
//   }




	return (
		
		<MapContainer
		    // ref={this.mapContainerRef}
			id="mapId"
			zoom={13}
			scrollWheelZoom={true}
			center={{ lat: 38.92667399199813, lng: -79.85139309567089 }}
		>
			 
			{posts.map((p) => (
              <PostMarker key={p.id} post={p} />
            ))}
			
			{
			currentUserType !== 2 ? nonAppPosts.map((p) => (
              <PostMarker key={p.id} post={p} />
            ))
			:<></> 		
			}
			
			{/* this is for a map search result*/}
			{/*<Marker position={[result.lat, result.lng]}>
				<Popup>
					{result.address}
				</Popup>
			</Marker> */}

			<LayersControl position="topleft" collapsed={false}>
				<LayersControl.BaseLayer name="Tiled Map Layer">
					<TiledMapLayer url="https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_WUI_2010_01/MapServer" />
                </LayersControl.BaseLayer>



				<LayersControl.BaseLayer name="Base Map Layer" checked>
					<BasemapLayer name="DarkGray" />
				</LayersControl.BaseLayer>
				{/* <LayersControl.BaseLayer name="Dynamic Map Layer">
					<DynamicMapLayer url="https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer" />
				</LayersControl.BaseLayer> */}
				<LayersControl.BaseLayer name="Image Map Layer">
					<ImageMapLayer
						url="https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer"
						attribution="United States Geological Survey (USGS), National Aeronautics and Space Administration (NASA)"
					/>
				</LayersControl.BaseLayer>

				<LayersControl.BaseLayer name="Street Map Layer">
				<TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
				</LayersControl.BaseLayer>
				{/* <LayersControl.BaseLayer name="Vector Basemap Layer (token required)">
					{apikey && (
						<VectorBasemapLayer name="ArcGIS:Streets" token={apikey} />
					)}
				</LayersControl.BaseLayer> */}
				<LayersControl.Overlay name="Esri Feature Layer">
					<FeatureLayer
						ref={featureLayerRef}
						url="https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer/0"
						eventHandlers={{
							loading: () => console.log('featurelayer loading'),
							load: () => {
								console.log('featurelayer loaded');
								if (featureLayerRef && featureLayerRef.current) {
									featureLayerRef.current.metadata((error, data) => {
										console.log('featurelayer metadata:', data);
									});
								}
							},
						}}
					/>
				</LayersControl.Overlay>
				{/* <LayersControl.Overlay name="Esri Heatmap Layer">
					<HeatmapLayer
						url="https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer/0"
						radius={20}
						eventHandlers={{
							loading: () => console.log('loading heatmap'),
						}}
					/>
				</LayersControl.Overlay> */}
				{/* <LayersControl.Overlay name="Esri Cluster Layer">
					<ClusterLayer url="https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer/0" />
				</LayersControl.Overlay> */}
				{/* <LayersControl.Overlay name="Vector Tile Layer">
					<VectorTileLayer url="https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer" />
				</LayersControl.Overlay> */}
			</LayersControl>
		
			 {/* <EsriLeafletGeoSearch
				position="topleft"
				useMapBounds={false}
				placeholder={
					'Search for places or addresses'
				}
				providers={{
					arcgisOnlineProvider: {
						apikey,
					},
					featureLayerProvider: {
						url: 'https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GIS_Day_Registration_Form_2019_Hosted_View_Layer/FeatureServer/0',
						searchFields: ['event_name', 'host_organization'],
						label: 'GIS Day Events 2019',
						bufferRadius: 5000,
						formatSuggestion: function (feature) {
							return (
								feature.properties.event_name +
								' - ' +
								feature.properties.host_organization
							);
						},
					},
				}}
				eventHandlers={{
					requeststart: () => console.log('Started request...'),
					requestend: () => console.log('Ended request...'),
					results: (r) => console.log(r)
					// results: (r) => addToState(r)
				}}
				key={apikey}
			/>  */}
		</MapContainer>
	);
};


