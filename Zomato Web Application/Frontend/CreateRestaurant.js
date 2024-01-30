let profile_drop_icon = document.getElementById("dropdown-icon");
let rest_form = document.getElementById("rest-info-form");
let lat_loc = document.getElementById("lat-loc");
let long_loc = document.getElementById("long-loc");

profile_drop_icon.addEventListener(
  "click",
  () => {
    let profile_popup = document.getElementById("profile-popup");
    if (profile_drop_icon.getAttribute("status") == "down") {
      profile_drop_icon.setAttribute("status", "up");
      profile_drop_icon.innerHTML = "<img src='up.png' />";
      profile_popup.style.display = "block";
    } else {
      profile_drop_icon.setAttribute("status", "down");
      profile_drop_icon.innerHTML = "<img src='drop.png' />";
      profile_popup.style.display = "none";
    }
  },
  false
);
const menuUpload = (event) => {
  const files = event.target.files;
  const filesLength = files.length;
  if (filesLength > 0) {
    const imageSrc = URL.createObjectURL(files[0]);
    const imagePreviewElement = document.getElementById("image");
    imagePreviewElement.src = imageSrc;
    document.getElementById("menu-img").style.display = "block";
  }
};
const restaurantUpload = (event) => {
  const files = event.target.files;
  const filesLength = files.length;
  if (filesLength > 0) {
    const imageSrc = URL.createObjectURL(files[0]);
    const imagePreviewElement = document.getElementById("rest-image");
    imagePreviewElement.src = imageSrc;
    document.getElementById("restaurant-img").style.display = "block";
  }
};

rest_form.addEventListener("submit", (event) => {
  event.preventDefault();

  let restaurant_name = document.getElementById("restaurant-name").value;
  let restaurant_address = document.getElementById("restaurant-address").value;
  let restaurant_phone = document.getElementById("restaurant-phone").value;
  let restaurant_owner_phone = document.getElementById(
    "restaurant-owner-phone"
  ).value;
  let establishment_type = document.getElementById("establishment-type").value;
  let restaurant_cuisines = document.getElementById(
    "restaurant-cuisines"
  ).value;

  let menu_image = document.getElementById("menu-image").files[0];

  let restaurant_image = document.getElementById("restaurant-image").files[0];

  //get user id from url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userid = urlParams.get("userid");

  //get lat long position
  let latitude = document.getElementById("lat-loc").value;
  let longitude = document.getElementById("long-loc").value;

  let formData = new FormData();
  formData.append("restaurantName", restaurant_name);
  formData.append("restaurantAddress", restaurant_address);
  formData.append("restaurantPhone", restaurant_phone);
  formData.append("restaurantOwnerPhone", restaurant_owner_phone);
  formData.append("establishmentType", establishment_type);
  formData.append("restaurantCuisines", restaurant_cuisines);
  formData.append("menuImage", menu_image);
  formData.append("restautantImage", restaurant_image);
  formData.append("userid", userid);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  fetch("http://localhost:8080/createRestaurant", {
    method: "POST",
    body: formData,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (data != null) {
        // window.location.replace("HomePage.html");
        window.location.assign("PartnerWithUs.html?userid=" + userid);
      }
    })
    .catch((error) => console.log(error));
});

let loadMap = () => {
  //get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    });
  } else {
    //toast
  }
};

let showLocation = async (position) => {
  // map api implementation
  const map = L.map("map");
  map.setView([position.coords.latitude, position.coords.longitude], 15);

  // open street map
  // let osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map);

  //google street map
  googleStreets = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    {
      maxZoom: 30,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );
  googleStreets.addTo(map);

  //change the icon
  var myIcon = L.icon({
    iconUrl: "loc.png",
    iconSize: [45, 45],
    popupAnchor: [0, -15],
  });
  //add marker to map at a specific coordinate
  let marker = L.marker([position.coords.latitude, position.coords.longitude], {
    icon: myIcon,
    draggable: true,
  }).addTo(map);
  lat_loc.value = marker.getLatLng().lat;
  long_loc.value = marker.getLatLng().lng;
  let popup = marker
    .bindPopup("Please place the pin accurately on the map")
    .openPopup();

  marker.on("dragend", function (e) {
    lat_loc.value = marker.getLatLng().lat;
    long_loc.value = marker.getLatLng().lng;
    console.log(marker.getLatLng().lat);
    console.log(marker.getLatLng().lng);
  });
};

let checkError = (error) => {
  if (error.code == error.PERMISSION_DENIED) {
    //TOAST - set default location as delhi
    console.log("failed to load position");
  }
};
