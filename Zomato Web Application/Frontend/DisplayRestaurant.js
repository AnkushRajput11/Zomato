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
