import React, { Fragment, useState, useContext, useRef, useEffect, memo } from "react";
import L from "leaflet";
import fetch from "isomorphic-unfetch";
import { Circle, LayerGroup, Map, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider, EsriProvider } from "leaflet-geosearch";
import { ReactComponent as TargetSvg } from "../../public/static/svg/aim.svg";
import { FaSearch } from "react-icons/fa";
import "../../scss/components/map.scss";
import { setTimeout } from "core-js";
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
const MapComponent = props => {
  //const [markPosition, setMarkPosition] = useState(props.laLong);
  const { markPosition, setMarkPosition, draggable, setCity, setState } = props;
  const [searchResult, setSearchResult] = useState([]);
  const [loadingGetLocation, setLoadingGetLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [mapZoom, setMapZoom] = useState(13);
  const markRef = useRef();
  const mapRef = useRef();
  const handleSearch = () => {
    if (searchValue != "" && searchValue.length >= 2) {
      provider.search({ query: searchValue }).then(function(result) {
        setSearchResult(result);
      });
    } else {
      setSearchResult("");
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchValue]);
  const showSearchResult = () => {
    return searchResult.length >= 1 ? (
      <div className="location_search_results">
        {searchResult.map(v => (
          <a
            key={v.raw.place_id}
            title={v.label}
            onClick={() => {
              setMarkPosition([v.y, v.x]);
              setSearchResult([]);
            }}
          >
            {v.label}
          </a>
        ))}
      </div>
    ) : null;
  };
  const updatePosition = async () => {
    const marker = markRef.current;
    const map = mapRef.current.leafletElement;
    const zoom = map.getZoom();
    setMapZoom(zoom);
    if (marker != null) {
      let latlng = marker.leafletElement.getLatLng();
      setMarkPosition(convertLatlngToArray(latlng));
      map.setView(convertLatlngToArray(latlng));
      // Get City Name From Lat & Long (https://nominatim.openstreetmap.org)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${convertLatlngToArray(latlng)[0]}&lon=${
          convertLatlngToArray(latlng)[1]
        }&zoom=10&addressdetails=1&extratags=1`,
        {
          method: "GET"
          //credentials: 'include'
        }
      );
      if (res !== undefined && res.ok) {
        const result = await res.json();
        if (result !== undefined && result.name !== undefined) {
          setCity(result.name);
        }
        if (result !== undefined && result.address !== undefined && result.address.state !== undefined) {
          setState(result.address.state.replace("استان ", ""));
        }
      } else {
        // network error
      }
    }
  };
  // geolocation Options
  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 10000
  };
  const getLocation = async () => {
    /*
     * Get Current Location With Direct web Api
     */
    setLoadingGetLocation("spinner_location");
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition, errorGetPosition, geoOptions);
    } else {
      await console.log("Geolocation is not supported by this browser.");
      setLoadingGetLocation("");
    }
  };
  const showPosition = position => {
    setLoadingGetLocation("");
    setMarkPosition([position.coords.latitude, position.coords.longitude]);
    updatePosition();
  };
  const errorGetPosition = err => {
    console.warn(`Geolocation ERROR(${err.code}): ${err.message}`);
  };
  const currentMarker = () => {
    return markPosition.length > 1 ? (
      <>
        <Marker
          className="current_location_marker"
          position={markPosition}
          icon={placeholderIcon}
          draggable={draggable}
          onDragend={() => updatePosition()}
          ref={markRef}
          onclick={() => {
            // save the position
          }}
        >
          <Tooltip>مکان نما را روی موقعیت خود تنظیم کنید</Tooltip>
        </Marker>
        {draggable && <Circle center={markPosition} radius={1000} className="circle_radius" />}
      </>
    ) : null;
  };
  useEffect(() => {
    if (!draggable) return;
    getLocation();
  }, [draggable]);
  return (
    <>
      {draggable && (
        <div className="row map_search m-auto">
          <div className="col d-block text-center">
            <input
              onChange={e => setSearchValue(e.target.value)}
              value={searchValue}
              type="text"
              className="form-control text-center m-auto d-inline-block"
              placeholder="کجا هستید؟"
              onBlur={() => {
                setTimeout(() => {
                  setSearchValue("");
                }, 250);
              }}
            />
            <FaSearch className="position-relative d-inline-block search_icon" />
          </div>
        </div>
      )}
      <div id="map_2" hidden={props.hidden}>
        <Map
          closePopupOnClick={true}
          animate={true}
          center={markPosition}
          zoom={mapZoom}
          maxZoom={18}
          ref={mapRef}
          dragging={draggable}
          //whenReady={() => getLocation()}
        >
          <TileLayer attribution="Qarun" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxNativeZoom={19} minZoom={0} maxZoom={22} />
          {currentMarker()}
          {draggable && (
            <div className="current_location" onClick={() => getLocation()} title="نمایش مکان شما">
              <TargetSvg className={`svg_icon ${loadingGetLocation}`} />
            </div>
          )}
          {showSearchResult()}
        </Map>
      </div>
    </>
  );
};
export default memo(MapComponent);