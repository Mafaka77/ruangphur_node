<template>
  <div class="relative">
    <!-- Origin Input Field (Clickable) -->
    <label class="block text-sm font-medium text-gray-700">
      Veng/Khua
    </label>
    <input
        v-model="formStore.second_step.destination_locality"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Ruang zalhna Veng/Khua"
        readonly
        type="text"
        @click="openMap"
    />

    <label class="block text-sm font-medium text-gray-700">
      Kilometer chhut dik a nih theih nan ruang dahna
      hmun dik tak map atangin thlan tur a ni.
    </label>
    <div v-if="showMap" class="fixed inset-0 bg-white z-50 flex flex-col">
      <div class="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h2 class="text-lg font-bold">Ruang zalhna hmun zawng/thlang rawh</h2>
        <button class="px-4 py-2 bg-red-500 rounded-md" @click="closeMap">Close</button>
      </div>

      <!-- Search Box with Clear Button -->
      <div class="p-4 flex items-center gap-2">
        <input
            ref="searchInput"
            v-model="formStore.second_step.destination_locality"
            class="p-2 flex-1 border rounded-md"
            placeholder="Search location"
            type="text"
        />
        <button v-if="formStore.second_step.destination_locality" class="px-4 py-2 bg-gray-300 rounded-md"
                @click="clearSearch">
          Clear
        </button>
      </div>

      <div id="map" class="flex-grow"></div>
    </div>
  </div>
</template>

<script setup>
import {nextTick, ref} from "vue";
import {useFormStore} from "@/stores/formStore.js";
import {useSnackbar} from "vue3-snackbar";

const snackbar = useSnackbar();
const formStore = useFormStore();
const showMap = ref(false);
const searchInput = ref(null);
const selectedAddress = ref("");
const map = ref(null);
let marker = null;
let geocoder = null;

const openMap = () => {
  showMap.value = true;
  nextTick(initMap);
};

const initMap = () => {
  // getUserLocation();
  if (!window.google || !google.maps) {
    alert("Google Maps API is not loaded!");
    return;
  }

  // ✅ Use previously selected location if available
  const initialLocation = {
    lat: formStore.second_step.destination_lng || 23.726168909115387,
    lng: formStore.second_step.destination_lng || 92.71900628064216,
  };

  map.value = new google.maps.Map(document.getElementById("map"), {
    center: initialLocation,
    zoom: 12,
    mapId: "f79edba3c30930ff",
  });

  geocoder = new google.maps.Geocoder();

  // ✅ Initialize Marker at the previous location
  setMarker(initialLocation);

  // ✅ Initialize Autocomplete
  const autocomplete = new google.maps.places.Autocomplete(searchInput.value);
  autocomplete.bindTo("bounds", map.value);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return alert("Invalid location!");

    const location = place.geometry.location;
    setMarker(location);

    formStore.second_step.destination_lat = location.lat();
    formStore.second_step.destination_lng = location.lng();
    formStore.second_step.destination_locality = place.formatted_address || "";

    // ✅ Zoom in to the selected location
    map.value.setCenter(location);
    map.value.setZoom(16);
  });

  // ✅ Click Event to Set Marker
  map.value.addListener("click", (event) => {
    setMarker(event.latLng);
    reverseGeocode(event.latLng);
  });
};


const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarker(userLocation);
        },
        (error) => {
          console.warn("Geolocation failed, using default location.");
          setMarker({lat: 23.726168909115387, lng: 92.71900628064216});
        }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
    setMarker({lat: 23.726168909115387, lng: 92.71900628064216});
  }
};

const setMarker = (location) => {
  if (!google.maps.Marker) {
    console.error("Marker class is not available.");
    return;
  }

  if (marker) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map.value,
      draggable: true,
    });

    marker.addListener("dragend", () => {
      reverseGeocode(marker.getPosition());
    });
  }

  marker.setMap(map.value);
  map.value.setCenter(location);
};


const reverseGeocode = (location) => {
  geocoder.geocode({location}, (results, status) => {
    if (status === "OK" && results[0]) {
      // ✅ Get correct lat & lng from marker's position
      formStore.second_step.destination_lng = location.lat();
      formStore.second_step.destination_lng = location.lng();
      formStore.second_step.destination_locality = results[0].formatted_address;
    } else {
      console.error("Geocoder failed due to: " + status);
    }
  });
};

// ✅ Clear Search Input and Remove Marker
const clearSearch = () => {
  formStore.second_step.destination_locality = "";
  if (marker) {
    marker.setMap(null);
    marker = null;
  }
};

const closeMap = () => {
  calculateDistance();
  showMap.value = false;
};
const calculateDistance = () => {
  console.log(formStore.second_step.destination_lng);
  console.log(formStore.second_step.destination_lat);
  if (formStore.second_step.source_lat === '' || formStore.second_step.destination_lat === '') {
    snackbar.add(
        {
          text: "Ruang chhuahna tur leh dahna tur thlang rawh.",
          type: "warning",
        }
    );
    return;
  }

  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
      {
        origins: [{
          lat: parseFloat(formStore.second_step.source_lat),
          lng: parseFloat(formStore.second_step.source_lng)
        }],
        destinations: [{
          lat: parseFloat(formStore.second_step.destination_lat),
          lng: parseFloat(formStore.second_step.destination_lng)
        }],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status !== "OK") {
          alert("Error with Distance Matrix API: " + status);
          return;
        }

        const result = response.rows[0].elements[0];
        if (result.status === "OK") {
          const distance = result.distance.text;
          formStore.second_step.distance = parseFloat(distance);
          formStore.second_step.transport_cost = formStore.second_step.distance * 80
          snackbar.add(
              {
                text: formStore.second_step.distance + 'KM',
                type: "success",
              }
          );
          // duration.value = result.duration.text;
        } else {
          alert("Could not calculate distance.");
        }
      }
  );
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
