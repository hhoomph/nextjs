import React, { Fragment, useState, useContext, useRef, useEffect, memo } from 'react';
import L from 'leaflet';
import { Circle, FeatureGroup, LayerGroup, LayersControl, Map, TileLayer, WMSTileLayer, Marker, Popup, Polyline, Polygon, Rectangle, Tooltip } from 'react-leaflet';
import '../../scss/components/map.scss';
const myIcon = new L.Icon({
  iconUrl: '../../static/svg/location-pointer2.png',
  iconRetinaUrl: null,
  shadowUrl: '../../static/img/profile.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const MapComponent = props => {
  const [markPosition, setMarkPosition] = useState([34.635059, 50.880823]);
  const markRef = useRef();
  const updatePosition = () => {
    const marker = markRef.current;
    if (marker != null) {
      setMarkPosition(marker.leafletElement.getLatLng());
    }
  };
  const position = [34.635059, 50.880823];
  return (
    <div id="mapid">
      <Map animate={true} center={markPosition} zoom={16}>
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={markPosition} icon={myIcon} draggable={true} onDragend={() => updatePosition()} ref={markRef}>
          <Popup>
            مجتمع ناشران <br /> شرکت سپهران
          </Popup>
          <Tooltip>مکان شما</Tooltip>
        </Marker>
      </Map>
    </div>
  );
};
export default memo(MapComponent);