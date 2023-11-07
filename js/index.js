import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase.
firebase.initializeApp({
    apiKey: "AIzaSyCbjoZLt0xCmwEpi_36hB-E4whGx45iSS4",
    authDomain: "quest-mark-ebd37.firebaseapp.com",
    projectId: "quest-mark-ebd37",
});
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

async function initMap() {
  const kathmandu = { lat: 27.7172, lng: 85.3240 };
  const map = new google.maps.Map(
    document.getElementById("map"),
    {
      zoom: 12,
      center: kathmandu,
    }
  );

  google.maps.event.addListener(map, "click", async function(event) {
    const questId = await addMarker(event.latLng, map);
    new google.maps.Marker({
      position: event.latLng,
      label: `Quest ${questId}`,
      map: map,
    });
  });

  addMarker(kathmandu, map);
}

async function addMarker(location, map) {
  const db = firebase.firestore();

  const questRef = await db.collection('quests').add({
    location,
    timestamp: new Date(),
  });

  return questRef.id;
}

window.initMap = initMap;
