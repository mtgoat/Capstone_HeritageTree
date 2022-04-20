import React, { useContext, useEffect, Component, createRef} from 'react';
import { PostContext } from '../../providers/PostProvider'; 
import { PostMarker } from './PostMarker';
import { MapContainer, LayersControl, useMapEvents, TileLayer } from 'react-leaflet';

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

const MapEvents = () => {
	const map = useMapEvents({
		click: (e) => console.log(e.latlng, map.getZoom()),
	});
	return null;
};

// const  componentDidMount = () => {
// 	//   this is for geosearch
// 	this.mapContainerRef = React.createRef();
//   const map = this.mapContainerRef.current.leafletElement;
//   const searchControl = new ELG.Geosearch().addTo(map);
//   const results = new L.LayerGroup().addTo(map);
  
//   searchControl.on('results', function(data){
// 	  results.clearLayers();
// 	  for (let i = data.results.length - 1; i >= 0; i--) {
// 		  results.addLayer(L.marker(data.results[i].latlng));
// 	  }
//   });
//}
export const Map = ({ apikey }) => {
	const featureLayerRef = React.useRef();

    const testcordi = [38.92771909929851, -79.84325808489746]

	const { posts, getAllPosts, nonAppPosts, getAllNonAppPosts } = useContext(PostContext);


	
  useEffect(() => {
    getAllPosts().then(()=>getAllNonAppPosts());
  }, []);

  console.log(nonAppPosts)




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
			
			{nonAppPosts.map((p) => (
              <PostMarker key={p.id} post={p} />
            ))}

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
			<div className='pointer'></div>
			 <EsriLeafletGeoSearch
				position="topleft"
				useMapBounds={false}
				placeholder={
					apikey
						? 'Search for places or addresses'
						: 'Enter an API key in the upper right corner'
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
					results: (r) => console.log(r),
				}}
				key={apikey}
			/> 
			
		</MapContainer>
	);
};


