# StructionSite Challenge

## Objective

Given requirements and an API from StructionSite for their challenge. The requirements were as follows:

- Fetch the JSON data for a floor plan that includes its image URL and markers
- Render the floor plan image
- Render all of the markers on the floor plan image indicated by x and y values in JSON data
- Render each marker to point in the direction indicated by the rotation value in JSON data
- Allow the user to click an existing marker and see its associated image
- Allow the user to move an existing marker around by clicking and dragging it
- Allow the user to click anywhere on the map to add a new marker.

## Packages Used

- React
- React Leaflet
- Leaflet
- React Loading Spinner

## Code Snippet

./app.js

```javascript
const handleMapClick = e => {
  const { lat: x, lng: y } = e.latlng; // get coordinates from event
  const uuid = Math.round(Math.random() * 10000).toString(); // create a bogus id
  const image_full = null;
  // 'https://front-end-programming-challenge.s3.amazonaws.com/photos/eb5afacd-7070-4426-a881-a4ea2be08ba0.jpg'; // set a default img
  const newMarker = { uuid, x, y, image_full };
  setMarkers([newMarker, ...markers]); // add new marker to state
};
```

## ScreenShots

- Light Theme
  <img width="1917" alt="Screen Shot 2021-08-04 at 12 48 57 PM" src="https://user-images.githubusercontent.com/6837172/128222452-31182280-c766-48c6-8a8e-8b6a1919d80f.png">

- Dark Theme
  <img width="1918" alt="Screen Shot 2021-08-04 at 12 53 26 PM" src="https://user-images.githubusercontent.com/6837172/128222421-efa1cc8a-f1ac-4c8c-9183-c267df9f1aef.png">

## Challenges Faced

- Issue when moving a Marker and then clicking on the map, the Marker returns back to it's original position
- Tried styling the Marker Icon and adding `transform: rotate()` but unable to do so
- Issue setting the bounds of the ImageOverlay so user is still able to click outside to a certain extent

## Additional Features

- Dark and Light mode based on user's system preferences
- Loading message that renders a spinner if data cannot be fetched
- Footer with Links to Portfolio, Github, Angellist, LinkedIn

## How to run this project:

- Clone to your own local machine by running `git clone https://github.com/espinalk212/struction-site-challenge.git` in the terminal

- Run `npm install` to install dependencies

- Run `npm start` 

#### _Overall I had a great experience completing this challenge. It was great a great experience to work with a library I have never used before, spend time reading over the documentation and execute the requirements._
