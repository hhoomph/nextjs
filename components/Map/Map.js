import React, { Fragment, useState, useContext, useRef, useEffect, memo } from 'react';
import L from 'leaflet';
import { Circle, FeatureGroup, LayerGroup, LayersControl, Map, TileLayer, WMSTileLayer, Marker, Popup, Polyline, Polygon, Rectangle, Tooltip } from 'react-leaflet';
import { ReactComponent as TargetSvg } from '../../static/svg/target.svg';
import '../../scss/components/map.scss';
const placeholderIcon = new L.Icon({
  iconUrl: '../../static/svg/placeholder-for-map.svg',
  iconRetinaUrl: null,
  shadowUrl: null,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
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
const Icon = new L.Icon({
  iconUrl: '../../static/svg/location-pointer2.png',
  iconRetinaUrl: null,
  shadowUrl: '../../static/img/user.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const MapComponent = props => {
  const [markPosition, setMarkPosition] = useState([]);
  const markRef = useRef();
  const updatePosition = () => {
    const marker = markRef.current;
    if (marker != null) {
      setMarkPosition(marker.leafletElement.getLatLng());
      console.log(markPosition);
    }
  };
  const position = [34.635059, 50.880823];
  const position1 = [34.635255, 50.876762];
  const position2 = [34.6327669608, 50.88060376];
  // geolocation Options
  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 10000
  };
  const getLocation = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition, errorGetPosition, geoOptions);
    } else {
      await console.log('Geolocation is not supported by this browser.');
    }
  };
  const showPosition = position => {
    updatePosition();
    setMarkPosition([position.coords.latitude, position.coords.longitude]);
    console.log(`More or less ${position.coords.accuracy} meters.`);
  };
  const errorGetPosition = err => {
    console.warn(`Geolocation ERROR(${err.code}): ${err.message}`);
  };
  const currentMarker = () => {
    return markPosition.length > 1 ? (
      <Marker
        position={markPosition}
        icon={placeholderIcon}
        draggable={true}
        onDragend={() => updatePosition()}
        ref={markRef}
        onclick={() => {
          // save the position
        }}
      >
        <Tooltip>مکان شما</Tooltip>
      </Marker>
    ) : (
      ''
    );
  };
  return (
    <div id="mapid">
      <Map animate={true} center={markPosition.length > 1 ? markPosition : position} zoom={15}>
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentMarker()}
        <Marker position={position} icon={myIcon} draggable={false}>
          <Popup>
            مجتمع ناشران <br /> شرکت سپهران
          </Popup>
          <Tooltip>سپهران</Tooltip>
        </Marker>
        <Marker position={position1} icon={Icon} draggable={false}>
          <Popup>نام کاربر</Popup>
        </Marker>
        <Marker position={position2} icon={Icon} draggable={false}>
          <Popup>نام کاربر</Popup>
          <Tooltip>مکان شما</Tooltip>
        </Marker>
        <div className="current_location" onClick={() => getLocation()} title="نمایش مکان شما">
          <TargetSvg className="svg_icon" />
        </div>
      </Map>
    </div>
  );
};
export default memo(MapComponent);