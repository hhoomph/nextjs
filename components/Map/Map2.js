import React, { Fragment, useState, useContext, useRef, useEffect, memo } from "react";
import L from "leaflet";
import { Circle, LayerGroup, Map, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider, EsriProvider } from "leaflet-geosearch";
//import { ReactComponent as TargetSvg } from '../../public/static/svg/target.svg';
import { ReactComponent as TargetSvg } from "../../public/static/svg/aim.svg";
import Router from "next/router";
import "../../scss/components/map.scss";
const esriProvider = new EsriProvider();
const provider = new OpenStreetMapProvider();
/**
 *  Calculate distance between 2 GPS coordinates
 * @param !Array<string> first location [lat, lng]
 * @param !Array<string> second location [lat, lng]
 * @return {number} return distance in meter
 */
export const getDistance = (position1, position2) => {
  const latlng1 = new L.latLng(position1);
  const latlng2 = new L.latLng(position2);
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
  iconUrl: "/static/svg/placeholder-for-map.svg",
  shadowUrl: null,
  className: "current_pos_marker"
});
const myIcon = new L.Icon({
  iconUrl: "/static/svg/location-pointer2.png",
  iconRetinaUrl: null,
  iconSize: [60, 60],
  className: "my_marker"
  //shadowUrl: "/static/img/profile.png"
});
const Icon = new L.Icon({
  iconUrl: "/static/svg/location-pointer2.png",
  iconRetinaUrl: null,
  iconSize: [36, 36]
  //shadowUrl: "/static/img/user.png"
});
const MapComponent = props => {
  const [markPosition, setMarkPosition] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [currentLocationClass, setCurrentLocationClass] = useState("current_location");
  const markRef = useRef();
  const mapRef = useRef();
  const activeUser = props.activeUser;
  const updatePosition = () => {
    const marker = markRef.current;
    if (marker != null) {
      let latlng = marker.leafletElement.getLatLng();
      setMarkPosition(convertLatlngToArray(latlng));
      const map = mapRef.current.leafletElement;
      map.setView(convertLatlngToArray(latlng));
      // distance to position in meter
      //console.log(latlng.distanceTo(position));
    }
  };
  // geolocation Options
  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 5 * 60 * 1000,
    timeout: 10000
  };
  const getLocation = async () => {
    setCurrentLocationClass("current_location spinner_location");
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition, errorGetPosition, geoOptions);
    } else {
      await console.log("Geolocation is not supported by this browser.");
      setCurrentLocationClass("current_location");
    }
  };
  const showPosition = position => {
    //updatePosition();
    setMarkPosition([position.coords.latitude, position.coords.longitude]);
    setCurrentLocationClass("current_location");
    console.log(`More or less ${position.coords.accuracy} meters.`);
    const map = mapRef.current.leafletElement;
    L.marker([position.coords.latitude, position.coords.longitude], { icon: placeholderIcon }).addTo(map);
    map.setView([position.coords.latitude, position.coords.longitude]);
  };
  const errorGetPosition = err => {
    setCurrentLocationClass("current_location");
    console.warn(`Geolocation ERROR(${err.code}): ${err.message}`);
  };
  const handleLocationFound = e => {
    setMarkPosition([e.latlng.lat, e.latlng.lng]);
  };
  const currentMarker = () => {
    return markPosition.length > 1 ? (
      <>
        <Marker
          className="current_location_marker"
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
      </>
    ) : null;
  };
  // Calculating Map radius from center to borders
  // const handleMapChange = () => {
  //   const map = mapRef.current.leafletElement;
  //   const mapBoundSouthWest = map.getBounds().getSouthWest();
  //   const mapDistance = mapBoundSouthWest.distanceTo(map.getCenter()) / 1000;
  //   props.setMapRadius(mapDistance);
  // };
  return (
    <div id="map_id">
      <Map
        closePopupOnClick={true}
        animate={true}
        dragging={true}
        center={activeUser !== undefined && activeUser.lat !== undefined ? [activeUser.lat, activeUser.long] : props.center}
        zoom={16}
        maxZoom={18}
        ref={mapRef}
        tap={true}
        onLocationfound={handleLocationFound}
      >
        <TileLayer attribution="Qarun" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[activeUser.lat, activeUser.long]}
          icon={myIcon}
          draggable={false}
          key={activeUser.id}
          onClick={() =>
            Router.push({
              pathname: `/user/${activeUser.userName}`
            })
          }
        ></Marker>
      </Map>
    </div>
  );
};
export default MapComponent;