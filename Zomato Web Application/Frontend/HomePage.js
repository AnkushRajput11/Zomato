let delivery = document.getElementById("delivery");
let dineout = document.getElementById("dining-out");
let location_input = document.getElementById("location-input");
let body = document.getElementsByTagName("body")[0];
let drop_icon = document.getElementById("drop-icon");
let left = document.getElementById("left-button");
let right = document.getElementById("right-button");
let foodList1 = document.getElementById("sub-carousal-div1");
let foodList2 = document.getElementById("sub-carousal-div2");
let filter_button = document.getElementById("filter");
let filter_popup = document.getElementById("filter-popup");
let super_maindiv = document.getElementById("super-maindiv");
let cancel_button = document.getElementById("cancel-button");
let profile_drop_icon = document.getElementById("dropdown-icon");
let dineout_restaurant_div = document.getElementById("dineout-restaurant-div");
let restaurant_div = document.getElementById("restaurants");
let detect_location = document.getElementById("detect-location");
let add_address = document.getElementById("add-address");
let add_address_popup = document.getElementById("add-address-popup");
let add_address_cancel = document.getElementById("add-address-cancel");
let lat_loc = document.getElementById("lat-loc");
let long_loc = document.getElementById("long-loc");
let confirm_address_button = document.getElementById("confirm-address-button");
let nd1 = document.getElementById("nd1");
let nd2 = document.getElementById("nd2");
let search = document.getElementById("search");
//login,signup popup

let login = document.getElementById("login");
let signup = document.getElementById("signup");
let scancel = document.getElementById("scancel");

let cancel = document.getElementById("cancel");
let popup = document.getElementById("popup");
let signupPopup = document.getElementById("signup-popup");
let maindiv = document.getElementById("maindiv");
let div2 = document.getElementById("div2");
let signup_form = document.getElementById("signup_form");
let login_form = document.getElementById("login_form");
let toast = document.getElementById("toast");
let ul_list = document.getElementById("addressList-ul");

console.log(login);
console.log(signup);

let getAllRestaurants = (city) => {
  let restaurant_div = document.getElementById("restaurants");
  restaurant_div.innerHTML = "";
  fetch("http://localhost:8080/getAllRestaurants?city=" + city)
    .then((resp) => resp.json())
    .then((restaurantList) => {
      console.log(restaurantList);
      // var convertedRestList = JSON.parse(restaurantList);
      restaurantList.forEach((restaurant) => {
        // var json = JSON.parse(restaurant);
        // let restaurant_div = document.getElementById("restaurants");
        let restaurant_card = document.createElement("div");
        restaurant_card.setAttribute("class", "restaurant-card");

        let restaurant_img_div = document.createElement("div");
        restaurant_img_div.setAttribute("class", "restaurant-img");
        let restaurant_image_tag = document.createElement("img");
        //convert bytearray into image
        let src_value = "data:image/jpeg;base64," + restaurant.restautantImage;
        restaurant_image_tag.setAttribute("src", src_value);
        restaurant_img_div.appendChild(restaurant_image_tag);

        let restaurant_name_div = document.createElement("div");
        restaurant_name_div.setAttribute("class", "restaurant-name");
        restaurant_name_div.innerHTML = restaurant.restaurantName;

        let restaurant_desc_div = document.createElement("div");
        restaurant_desc_div.setAttribute("class", "restaurant-descp");
        restaurant_desc_div.innerHTML = restaurant.restaurantCuisines;

        let restaurant_rating_div = document.createElement("div");
        restaurant_rating_div.setAttribute("class", "restaurant-rating");
        restaurant_rating_div.innerHTML = "4.0" + "<span> &#x2605; </span>";

        restaurant_card.appendChild(restaurant_img_div);
        restaurant_card.appendChild(restaurant_name_div);
        restaurant_card.appendChild(restaurant_desc_div);
        restaurant_card.appendChild(restaurant_rating_div);

        restaurant_div.appendChild(restaurant_card);
      });
    })
    .catch((error) => console.log(error));
};

let showLocation = async (position) => {
  let response =
    await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json
    `);
  console.log(response);
  let data = await response.json();
  console.log(data);
  console.log(data.address.city);
  let delivery_location_name = document.getElementById(
    "delivery-location-name"
  );
  delivery_location_name.innerHTML =
    "Delivery Restaurants in " + data.display_name;
  //change the name in location field
  location_input.value = data.address.city;
  //fetch all restaurants with this city name
  getAllRestaurants(data.address.city);

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
    .bindPopup(
      "Your food will be delivered here,Please place the pin accurately on the map"
    )
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
    let delivery_location_name = document.getElementById(
      "delivery-location-name"
    );
    delivery_location_name.innerHTML = "Delivery Restaurants in Pune";
    getAllRestaurants("pune");
  }
};

let fetchFromDB = () => {
  console.log("body loaded");
  // console.log(L);

  //get email of the user logged in
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const userid = urlParams.get("userid");
  console.log(userid);

  if (userid != null) {
    //check user login session
    let listdiv = document.getElementById("listdiv");
    listdiv.style.display = "none";
    profilediv.style.display = "flex";
    fetch("http://localhost:8080/checkSession?userid=" + userid)
      .then((resp) => resp.json())
      .then((data) => {
        let cust_name = document.getElementById("cust-name");
        cust_name.innerHTML = data.name;
        //add address list from db
        let listOfAddress = data.address;
        for (var i = 0; i < listOfAddress.length; i++) {
          let list_item = document.createElement("li");
          list_item.innerHTML = listOfAddress[i].completeAddress;
          list_item.setAttribute("class", "list-item");

          //set city attribute in list element
          //first get city name from latitude and longitude

          //////
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(
            listOfAddress[i].latitude
          )}&lon=${parseFloat(listOfAddress[i].longitude)}&format=json
  `)
            .then((resp) => resp.json())
            .then((data) => list_item.setAttribute("city", data.address.city))
            .catch((error) => console.log(error));
          list_item.setAttribute("city", data.address.city);
          let ul_list = document.getElementById("addressList-ul");
          ul_list.appendChild(list_item);
        }
      })
      .catch((error) => console.log(error));
  } else {
    let profilediv = document.getElementById("profilediv");
    profilediv.style.display = "none";
    listdiv.style.display = "block";
    // profilediv.innerHTML =
    //   "<div id='listdiv'><ul id='navlist'><li id='login'>Login</li><li id='signup'>Sign up</li><li><a href='PartnerWithUs.html'>Add Restaurant</a></li></ul></div>";
  }

  //get current location when page loads
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

delivery.addEventListener(
  "click",
  (event) => {
    delivery.style.borderBottom = "3px solid salmon";
    delivery.style.color = "rgb(239, 79, 95)";
    dineout.style.border = "none";
    dineout.style.color = "rgb(105, 105, 105)";

    dineout_restaurant_div.style.display = "none";
    restaurant_div.style.display = "flex";
  },
  false
);
dineout.addEventListener(
  "click",
  (event) => {
    dineout.style.borderBottom = "3px solid salmon";
    dineout.style.color = "rgb(239, 79, 95)";
    delivery.style.border = "none";
    delivery.style.color = "rgb(105, 105, 105)";

    dineout_restaurant_div.style.display = "flex";
    restaurant_div.style.display = "none";
  },
  false
);
location_input.addEventListener(
  "click",
  (event) => {
    let dropdown = document.getElementById("location-dropdown");
    drop_icon.innerHTML = "<img src='up.png' />";
    drop_icon.setAttribute("status", "up");
    dropdown.style.display = "block";
  },
  false
);
location_input.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    let city = location_input.value;
    getAllRestaurants(city);
    document.getElementById("delivery-location-name").innerHTML =
      "Delivery Restaurants in " + city;
    let dropdown = document.getElementById("location-dropdown");
    drop_icon.innerHTML = "<img src='drop.png' />";
    drop_icon.setAttribute("status", "down");
    dropdown.style.display = "none";
  }
});
body.addEventListener(
  "click",
  (event) => {
    if (event.target.parentElement.id != "drop-icon") {
      console.log(event.target.parentElement.id);
      let dropdown = document.getElementById("location-dropdown");
      drop_icon.innerHTML = "<img src='drop.png' />";
      drop_icon.setAttribute("status", "down");
      dropdown.style.display = "none";
    }
    if (event.target.parentElement.id != "dropdown-icon") {
      console.log(event.target.parentElement.id);
      let dropdown = document.getElementById("profile-popup");
      profile_drop_icon.setAttribute("status", "down");
      profile_drop_icon.innerHTML = "<img src='drop.png' />";
      dropdown.style.display = "none";
    }
    if (event.target.id != "search") {
      document.getElementById("search-popup").style.display = "none";
    }
  },
  true
);
drop_icon.addEventListener(
  "click",
  (event) => {
    let dropdown = document.getElementById("location-dropdown");

    if (drop_icon.getAttribute("status") == "down") {
      console.log("hii");
      drop_icon.innerHTML = "<img src='up.png' />";
      drop_icon.setAttribute("status", "up");
      dropdown.style.display = "block";
    } else {
      console.log("bye");
      drop_icon.innerHTML = "<img src='drop.png' />";
      drop_icon.setAttribute("status", "down");
      dropdown.style.display = "none";
    }

    // let dropdown = document.getElementById("location-dropdown");
    // if (dropdown.style.display == "block") {
    //   dropdown.style.display = "none";
    // } else {
    //   dropdown.style.display = "block";
    // }
  },
  false
);
right.addEventListener(
  "click",
  (event) => {
    foodList1.style.display = "none";
    foodList2.style.display = "flex";
    left.style.display = "block";
    right.style.display = "none";
  },
  false
);
left.addEventListener(
  "click",
  (event) => {
    foodList1.style.display = "flex";
    foodList2.style.display = "none";
    left.style.display = "none";
    right.style.display = "block";
  },
  false
);
filter_button.addEventListener(
  "click",
  (event) => {
    filter_popup.style.display = "block";
    body.style.overflow = "hidden";
    // super_maindiv.style.filter = "brightness(20%)";
  },
  false
);
cancel_button.addEventListener(
  "click",
  (event) => {
    filter_popup.style.display = "none";
    body.style.overflow = "auto";
  },
  false
);
add_address_cancel.addEventListener(
  "click",
  (event) => {
    add_address_popup.style.display = "none";
  },
  false
);
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

confirm_address_button.addEventListener("click", () => {
  let complete_address = document.getElementById("complete-address").value;
  let latitude = lat_loc.value;
  let logitude = long_loc.value;
  console.log(latitude);
  console.log(logitude);
  let data = {
    completeAddress: complete_address,
    latitude: latitude,
    longitude: logitude,
  };

  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const userid = urlParams.get("userid");
  console.log(userid);
  if (userid != null) {
    fetch("http://localhost:8080/saveAddress?userid=" + userid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((rdata) => {
        console.log(rdata);
        if (rdata != null) {
          add_address_popup.style.display = "none";
          let location_dropdown = document.getElementById("location-dropdown");
          location_dropdown.style.display = "block";
          drop_icon.innerHTML = "<img src='up.png' />";
          drop_icon.setAttribute("status", "up");

          let list_item = document.createElement("li");
          list_item.innerHTML = rdata.completeAddress;
          list_item.setAttribute("class", "list-item");
          let ul_list = document.getElementById("addressList-ul");
          ul_list.appendChild(list_item);
        }
      })
      .catch((error) => console.log(error));
  } else {
    //login first
  }
});

add_address.addEventListener("click", (event) => {
  setTimeout(function () {
    console.log("Timeout completed");
    window.dispatchEvent(new Event("resize"));
  }, 500);
  add_address_popup.style.display = "block";
});

//sign up popup, login js code from welcm.js

scancel.addEventListener(
  "click",
  (event) => {
    popup.style.display = "none";
    signupPopup.style.display = "none";
    maindiv.style.filter = "brightness(100%)";
  },
  false
);

cancel.addEventListener(
  "click",
  (event) => {
    popup.style.display = "none";
    signupPopup.style.display = "none";
    maindiv.style.filter = "brightness(100%)";
  },
  false
);

let change = (type) => {
  if (type == "login") {
    signupPopup.style.display = "none";
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
    signupPopup.style.display = "block";
  }
};

signup_form.addEventListener("submit", (event) => {
  event.preventDefault();

  let formData = new FormData(document.getElementById("signup_form"));
  let data = Object.fromEntries(formData);

  fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((dbdata) => {
      console.log(dbdata);
      if (dbdata != null) {
        toast.innerHTML = "<div>Signup Success!!!, Please Login</div>";
        signupPopup.style.display = "none";
        popup.style.display = "block";
        toast.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () {
          toast.className = toast.className.replace("show", "");
        }, 2000);
      } else {
        toast.innerHTML = "<div>Signup Failed</div>";
        toast.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () {
          toast.className = toast.className.replace("show", "");
        }, 2000);
      }
    })
    .catch((error) => console.log(error));
});

login_form.addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  fetch(
    "http://localhost:8080/login?email=" +
      email.value +
      "&password=" +
      password.value
  )
    .then((resp) => resp.json())
    .then((dbdata) => {
      console.log(dbdata);

      if (dbdata != null) {
        // toast.innerHTML = "<div>Login Success!!!</div>";
        // popup.style.display = "none";
        // toast.className = "show";
        // // After 3 seconds, remove the show class from DIV
        // setTimeout(function () {
        //   toast.className = toast.className.replace("show", "");
        // }, 2000);
        //verify session
        //then display toast on next page
        // document.cookie = "email=" + email.value;
        window.location.replace("HomePage.html?email=" + email.value);
      } else {
        toast.innerHTML = "<div>Login Failed</div>";
        toast.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () {
          toast.className = toast.className.replace("show", "");
        }, 2000);
      }
    })
    .catch((error) => console.log(error));
});

login.addEventListener(
  "click",
  function (event) {
    popup.style.display = "block";
    maindiv.style.filter = "brightness(20%)";

    // maindiv.style.filter = "blur(12px)";
    // maindiv.style.backgroundImage =
    //   "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url('https://www.herofincorp.com/public/admin_assets/upload/blog/64b91a06ab1c8_food%20business%20ideas.webp')";
    // maindiv.style.filter = "blur(50%)";
  },
  false
);

signup.addEventListener(
  "click",
  function (event) {
    signupPopup.style.display = "block";
    maindiv.style.filter = "brightness(20%)";

    // maindiv.style.filter = "blur(12px)";
    // maindiv.style.backgroundImage =
    //   "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url('https://www.herofincorp.com/public/admin_assets/upload/blog/64b91a06ab1c8_food%20business%20ideas.webp')";
    // maindiv.style.filter = "blur(50%)";
  },
  false
);

ul_list.addEventListener("click", (event) => {
  let list_item = document.getElementsByClassName("list-item");
  for (var i = 0; i < list_item.length; i++) {
    if (event.target == list_item[i]) {
      console.log("listItem If : " + list_item[i]);
      console.log(event.target);
      list_item[i].style.color = "black";
      list_item[i].setAttribute("selected", "true");
      location_input.value = list_item[i].getAttribute("city");
      getAllRestaurants(list_item[i].getAttribute("city"));
    } else {
      console.log("listItem Else: " + list_item[i]);
      list_item[i].style.color = "rgb(180, 179, 179)";
      list_item[i].setAttribute("selected", "false");
    }
  }
});

detect_location.addEventListener("click", (event) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation, checkError, {
      enableHighAccuracy: true,
      // maximumAge: 10000,
      // timeout: 5000,
    });
  } else {
    //toast
  }
});

let getLocation = async (position) => {
  let response =
    await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json
    `);
  console.log(response);
  let data = await response.json();
  console.log(data);
  console.log(data.address.city);
  let delivery_location_name = document.getElementById(
    "delivery-location-name"
  );
  delivery_location_name.innerHTML =
    "Delivery Restaurants in " + data.display_name;
  //change the name in location field
  location_input.value = data.display_name;
  //fetch all restaurants with this city name
  getAllRestaurants(data.address.city);
};

search.addEventListener("click", (event) => {
  document.getElementById("search-popup").style.display = "block";
});

document.getElementById("search-input").addEventListener("keyup", (event) => {
  document.getElementById("search-dish-div").innerHTML = "";
  document.getElementById("search-restaurant-div").innerHTML = "";

  let searchValue = document.getElementById("search-input").value;
  console.log(searchValue);
  let city = document.getElementById("location-input").value;
  fetch(
    "http://localhost:8080/getSearchValue?search=" +
      searchValue +
      "&city=" +
      city
  )
    .then((resp) => resp.json())
    .then((objdata) => {
      for (let index in objdata) {
        let data = objdata[index];
        console.log(data);
        if (data.hasOwnProperty("dishId")) {
          //create dish

          let search_dish = document.createElement("div");
          search_dish.setAttribute("class", "search-dish");

          let search_dish_image = document.createElement("div");
          search_dish_image.setAttribute("class", "search-dish-image");

          let dish_image = document.createElement("img");
          dish_image.src = "data:image/jpeg;base64," + data.dishImage;

          let search_dish_title = document.createElement("div");
          search_dish_title.setAttribute("class", "search-dish-title");
          search_dish_title.innerHTML = data.dishName;

          search_dish_image.appendChild(dish_image);
          search_dish.appendChild(search_dish_image);
          search_dish.appendChild(search_dish_title);

          document.getElementById("search-dish-div").appendChild(search_dish);
        } else {
          //create restaurant

          let search_restaurant = document.createElement("div");
          search_restaurant.setAttribute("class", "search-restaurant");

          let search_restaurant_image = document.createElement("div");
          search_restaurant_image.setAttribute(
            "class",
            "search-restaurant-image"
          );

          let restaurant_image = document.createElement("img");
          restaurant_image.src =
            "data:image/jpeg;base64," + data.restautantImage;

          let search_restaurant_title = document.createElement("div");
          search_restaurant_title.setAttribute(
            "class",
            "search-restaurant-title"
          );
          search_restaurant_title.innerHTML = data.restaurantName;

          let search_restaurant_rating = document.createElement("div");
          search_restaurant_rating.setAttribute(
            "class",
            "search-restaurant-rating"
          );
          search_restaurant_rating.innerHTML = "Rating : 4";

          search_restaurant_image.appendChild(restaurant_image);
          search_restaurant.appendChild(search_restaurant_image);
          search_restaurant.appendChild(search_restaurant_title);
          search_restaurant.appendChild(search_restaurant_rating);

          document
            .getElementById("search-restaurant-div")
            .appendChild(search_restaurant);
        }
      }
    })
    .catch((error) => console.log(error));
});
