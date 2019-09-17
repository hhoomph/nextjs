import React, { Fragment, useState, useContext, useRef, useEffect, memo } from 'react';
import L from 'leaflet';
import { Circle, LayerGroup, Map, TileLayer, Marker, Popup, Polyline, Polygon, Rectangle, Tooltip } from 'react-leaflet';
import { ReactComponent as TargetSvg } from '../../static/svg/target.svg';
import '../../scss/components/map.scss';
/**
 *  Calculate distance between 2 GPS coordinates
 * @param !Array<string> first location [lat, lng]
 * @param !Array<string> second location [lat, lng]
 * @return {number} return distance in meter
 */
export const getDistance = (position1, position2) => {
  latlng1 = new L.latLng(position1);
  latlng2 = new L.latLng(position2);
  return latlng1.distanceTo(latlng2);
};
/**
 *  Convert Leaflet latLng object to GPS coordinates (lat lng) array
 * @ param {object} return Leaflet latLng object
 * @return  !Array<string> GPS location [lat, lng]
 */
export const convertLatlngToArray = position => {
  return [position.lat, position.lng];
};
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
  const mapRef = useRef();
  const updatePosition = () => {
    const marker = markRef.current;
    if (marker != null) {
      let latlng = marker.leafletElement.getLatLng();
      setMarkPosition(convertLatlngToArray(latlng));
      const map = mapRef.current.leafletElement;
      map.setView(convertLatlngToArray(latlng));
      // distance to position in meter
      console.log(latlng.distanceTo(position));
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
    /*
     * Get Current Location With Leaflet Function
     */
    // const map = mapRef.current;
    // if (map != null) {
    //   map.leafletElement.locate({
    //     setView: true,
    //     maxZoom: 18,
    //     maximumAge: 3000,
    //     enableHighAccuracy: true
    //   });
    // }
    /*
     * Get Current Location With Direct web Api
     */
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition, errorGetPosition, geoOptions);
    } else {
      await console.log('Geolocation is not supported by this browser.');
    }
  };
  const showPosition = position => {
    //updatePosition();
    setMarkPosition([position.coords.latitude, position.coords.longitude]);
    console.log(`More or less ${position.coords.accuracy} meters.`);
    // const map = mapRef.current.leafletElement;
    // L.marker([position.coords.latitude, position.coords.longitude], { icon: placeholderIcon }).addTo(map);
    // map.setView([position.coords.latitude, position.coords.longitude]);
  };
  const errorGetPosition = err => {
    console.warn(`Geolocation ERROR(${err.code}): ${err.message}`);
  };
  const handleLocationFound = e => {
    console.log(e.latlng);
    setMarkPosition([e.latlng.lat, e.latlng.lng]);
  };
  const currentMarker = () => {
    return markPosition.length > 1 ? (
      <LayerGroup>
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
        <Circle center={markPosition} radius={1000} className="circle_radius" />
      </LayerGroup>
    ) : null;
  };
  return (
    <div id="mapid">
      <Map animate={true} center={markPosition.length > 1 ? markPosition : position} zoom={15} maxZoom={18} ref={mapRef} onLocationfound={handleLocationFound}>
        <TileLayer attribution="Qarun" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentMarker()}
        <Marker position={position} icon={myIcon} draggable={false}>
          <Popup>
            مجتمع ناشران <br /> شرکت سپهران
          </Popup>
          <Tooltip>سپهران</Tooltip>
        </Marker>
        <Marker position={position1} icon={Icon} draggable={false}>
          <Popup>نام کاربر 1</Popup>
        </Marker>
        <Marker position={position2} icon={Icon} draggable={false}>
          <Popup>نام کاربر 2</Popup>
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