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
let profile_drop_icon = document.getElementById("dropdown-icon");

let loggedIn = false;

let checkSession = () => {
  const queryString = window.location.search;
  if (queryString != "") {
    const urlParams = new URLSearchParams(queryString);
    const userid = urlParams.get("userid");
    console.log(userid);

    if (userid != null) {
      fetch("http://localhost:8080/checkSession?userid=" + userid)
        .then((resp) => resp.json())
        .then((data) => {
          let cust_name = document.getElementById("cust-name");
          cust_name.innerHTML = data.name;
        })
        .catch((error) => console.log(error));

      let listdiv = document.getElementById("listdiv");
      let profilediv = document.getElementById("profilediv");
      listdiv.style.display = "none";
      profilediv.style.display = "flex";
      loggedIn = true;
    }
  }
};

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

  let keepmeloggedin = document.getElementById("keepmeloggedin-input");
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

        if (keepmeloggedin.checked == true) {
          localStorage.setItem("userid", dbdata.id);
        }

        window.location.replace("PartnerWithUs.html?userid=" + dbdata.id);
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

document.getElementById("register-rest").addEventListener("click", (event) => {
  if (loggedIn == true) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userid = urlParams.get("userid");
    window.location.assign("CreateRestaurant.html?userid=" + userid);
  } else {
    popup.style.display = "block";
  }
});

document.getElementById("view-rest").addEventListener("click", (event) => {
  if (loggedIn == true) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userid = urlParams.get("userid");
    window.location.assign("ViewRestaurant.html?userid=" + userid);
  } else {
    popup.style.display = "block";
  }
});
