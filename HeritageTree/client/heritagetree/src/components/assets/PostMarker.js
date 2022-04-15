import React, { useContext, useEffect} from 'react';
import { PostContext } from '../../providers/PostProvider'; 
import { MapContainer, LayersControl, useMapEvents, Marker, Popup, } from 'react-leaflet';
import L from 'leaflet';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./PostMaker.css";
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"

const MapEvents = () => {
	const map = useMapEvents({
		click: (e) => console.log(e.latlng, map.getZoom()),
	});
	return null;
};
//All pictures needs to be in the public folder for react.  Relative path for the pic is set at the public holder location 

export const PostMarker = ({post}) => {
    let myIcon = L.icon({
        iconUrl: '/images/treeIcon.png',
        iconSize: [20, 30],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        // shadowUrl: '/images/treeIcon.png',
        // shadowSize: [10, 10],
        // shadowAnchor: [22, 94]
    });

if(!post.isApproved){
//    console.log(myIcon)
    myIcon.options.iconUrl = '/images/redtreeicon.png' 
}

    return (
        <div>
            <MapEvents eventKey={post.id} />
            <Marker position={[post.latitude, post.longitude]} icon={myIcon}>
                <Popup>
                    <div className='mapPopup_border'>
                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Body>
                           <Card.Title>{post.treeCommonNameName}</Card.Title> 
                           <Card.Subtitle>{post.heritageStatusName} tree</Card.Subtitle> 
                        <Card.Text>
                            <Row>
                              <Col>Lat: {post.latitude.toFixed(3)}</Col> 
                              <Col> Lon: {post.longitude.toFixed(3)}
                              </Col> </Row>
                               <Row>
                                 <Col> Tree Health:  { post.healthStatusName }
                                 </Col>  
                                </Row>
                                <Row>
                                    <Col> Property Type: { post.ownershipName }
                                    </Col>
                                   
                                    </Row>
                        </Card.Text>
                        <Link to={`/posts/${post.id}`}>
                    <Button className="mt-2" variant="secondary">More Info</Button>
                    </Link>
                        </Card.Body>
                        
                    </Card>
                    </div>
                </Popup>
            </Marker>
        </div>

    )
}