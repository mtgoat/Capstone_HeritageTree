import React, { useContext, useEffect} from 'react';
import { PostContext } from '../../providers/PostProvider'; 
import { MapContainer, LayersControl, useMapEvents, Marker, Popup, TileLayer } from 'react-leaflet';

import {
	BasemapLayer,
	FeatureLayer,
	DynamicMapLayer,
	TiledMapLayer,
	ImageMapLayer,
} from 'react-esri-leaflet';

import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';


const MapEvents = () => {
	const map = useMapEvents({
		click: (e) => console.log(e.latlng, map.getZoom()),
	});
	return null;
};

export const PostMarker = ({post}) => {
    var myIcon = null
    return (
        <div>
            <MapEvents eventKey={post.id} />
            <Marker position={[post.latitude, post.longitude]}>
                <Popup>
                Big tree in the wetland by the US Forestry Building <br /> This is a test
                </Popup>
            </Marker>
        </div>

    )
}