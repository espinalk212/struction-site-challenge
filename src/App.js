import { useLayoutEffect, useState, useRef, useMemo, useCallback } from 'react';
import './App.css';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import LoaderMessage from './LoaderMessage';
import Footer from './Footer';

function App() {
  const [image, setImage] = useState('');
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const markerRef = useRef(null);

  useLayoutEffect(() => {
    // fetch the data appended to my cors anywhere server (allows for CORS)
    fetch(
      'https://serene-beach-45833.herokuapp.com/https://front-end-programming-challenge.s3.amazonaws.com/floor_plans/1340/1340.json'
    )
      .then(res => res.json())
      .then(data => {
        // if for some reason we do not get back the data exit the fetch, otherwise set the image and markers provided by the API
        if (!data) return;
        // store image for the map in state
        setImage(data.image_url);
        // store markers in the state
        setMarkers(data.markers);
        // set loading to false as our data is now back
        setIsLoading(false);
      });
  }, []);

  // create the leaflet icon
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  // create the new icon by passing in asset
  const siteIcon = new LeafIcon({
    iconUrl: 'https://app.structionsite.com/assets/marker_flat.png',
  });

  // currying function that gets called on dragstart and dragend and passes in the previous and new position, it then checks the markers and once it finds one with the current x and y it replaces it .. not the best way to achieve this but it works for now
  const placeNewMarkers = useCallback(
    prevPos => {
      return function getNewPos(newPos) {
        setMarkers(
          markers.map(marker => {
            if (marker.x === prevPos[0] && marker.y === prevPos[1]) {
              marker.x = newPos[0];
              marker.y = newPos[1];
            }
            return marker;
          })
        );
      };
    },
    [markers]
  );

  const eventHandlers = useMemo(
    () => ({
      dragstart() {
        const prev = markerRef.current;
        placeNewMarkers(prev.getLatLng());
      },
      moveend() {
        const marker = markerRef.current;
        placeNewMarkers(marker.getLatLng());
      },
    }),
    [placeNewMarkers]
  );

  const handleMapClick = e => {
    const { lat: x, lng: y } = e.latlng; // get coordinates from event
    const id = Math.round(Math.random() * 10000); // create a bogus id
    const image_full = null;
    // 'https://front-end-programming-challenge.s3.amazonaws.com/photos/eb5afacd-7070-4426-a881-a4ea2be08ba0.jpg'; // set a default img
    const newMarker = { id, x, y, image_full };
    setMarkers([newMarker, ...markers]); // add new marker to state
  };

  // if we have not fetched our data yet we present the user with a loading spinner otherwise the map container
  return (
    <div className="App">
      <div className="titleContainer">
        <h1>StructionSite</h1>
      </div>
      {isLoading ? (
        <LoaderMessage>Loading map ...</LoaderMessage>
      ) : (
        <MapContainer
          className="mapContainer"
          center={[0.5, 0.85]}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          zoom={10}
        >
          <ImageOverlay
            className="map"
            attribution="Built for StructionSite challenge"
            url={image}
            interactive={true}
            bounds={[
              [0.15, 1.8],
              [0.85, 0],
            ]}
            eventHandlers={{ click: handleMapClick }}
          />
          {markers.map(marker => {
            return (
              <Marker
                key={marker.uuid}
                icon={siteIcon}
                draggable={true}
                position={[marker.x, marker.y]}
                eventHandlers={eventHandlers}
                ref={markerRef}
                // style={{
                //   transform: `rotate(${marker.rotation}deg)`,
                // }}
              >
                <Popup minWidth={100} autoPan={false}>
                  <img
                    className="popupImg"
                    src={marker.image_full}
                    alt={marker.image_id}
                  />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
      <div className="requirementsContainer">
        <h3>Requirements:</h3>
        <ul>
          <li>
            - Fetch the JSON data for a floor plan that includes its image URL
            and markers ✅
          </li>
          <li> - Render the floor plan image ✅</li>
          <li>
            - Render all of the markers on the floor plan image indicated by x
            and y values in JSON data ✅
          </li>
          <li>
            - Render each marker to point in the direction indicated by the
            rotation value in JSON data
          </li>
          <li>
            - Allow the user to click an existing marker and see its associated
            image ✅
          </li>
          <li>
            - Allow the user to move an existing marker around by clicking and
            dragging it ✅
          </li>
          <li>
            - Allow the user to click anywhere on the map to add a new marker ✅
          </li>
        </ul>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

/*
Issues I encountered:
Had difficulty rotating marker ended up using a library

issues when moving a marker => it moves but on click repositions itself

*/
