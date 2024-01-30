let feature_div = document.getElementById("feature-div");
let preparing = document.getElementById("preparing");
let ready = document.getElementById("ready");
let menu_type = document.getElementsByClassName("select-menu-type");
let dish_image_div = document.getElementById("dish-image-div");
let consume_type = document.getElementsByClassName("consume-type");
let order_feature = document.getElementById("order-feature");
let menu_feature = document.getElementById("menu-feature");

order_feature.addEventListener("click", (event) => {
  document.getElementById("order-details-div").style.display = "block";
  document.getElementById("menu-details-div").style.display = "none";
});

menu_feature.addEventListener("click", (event) => {
  document.getElementById("order-details-div").style.display = "none";
  document.getElementById("menu-details-div").style.display = "flex";
});

feature_div.addEventListener(
  "click",
  (event) => {
    let sub_feature_div = document.getElementsByClassName("sub-feature-div");
    console.log("hello");

    if (event.target.className == "sub-feature-div") {
      for (var i = 0; i < sub_feature_div.length; i++) {
        if (event.target == sub_feature_div[i]) {
          sub_feature_div[i].setAttribute("selected", "true");
          sub_feature_div[i].style.filter =
            "invert(37%) sepia(55%) saturate(1768%) hue-rotate(198deg) brightness(95%) contrast(98%)";

          console.log(sub_feature_div[i]);
        } else {
          sub_feature_div[i].setAttribute("selected", "false");
          sub_feature_div[i].style.filter = "";
          console.log(sub_feature_div[i]);
        }
      }
    } else if (event.target.className == "feature-item") {
      for (var i = 0; i < sub_feature_div.length; i++) {
        if (event.target.parentElement == sub_feature_div[i]) {
          event.target.parentElement.setAttribute("selected", "true");
          console.log(event.target.parentElement);
          event.target.parentElement.style.filter =
            "invert(37%) sepia(55%) saturate(1768%) hue-rotate(198deg) brightness(95%) contrast(98%)";
        } else {
          sub_feature_div[i].setAttribute("selected", "false");
          sub_feature_div[i].style.filter = "";
          console.log(sub_feature_div[i]);
        }
      }
    }
  },
  false
);

preparing.addEventListener("click", (event) => {
  preparing.style.color = "rgb(239, 79, 95)";
  ready.style.color = "#a2a2a2";
  let preparing_order_div = document.getElementById("preparing-order-div");
  let ready_order_div = document.getElementById("ready-order-div");

  preparing_order_div.style.display = "block";
  ready_order_div.style.display = "none";
});
ready.addEventListener("click", (event) => {
  ready.style.color = "rgb(239, 79, 95)";
  preparing.style.color = "#a2a2a2";

  let preparing_order_div = document.getElementById("preparing-order-div");
  let ready_order_div = document.getElementById("ready-order-div");

  preparing_order_div.style.display = "none";
  ready_order_div.style.display = "block";
});

document.body.addEventListener("click", (event) => {
  if (event.target.className == "order-ready") {
    let card = event.target.parentElement.parentElement;

    let ready_order_div = document.getElementById("ready-order-div");

    let newcard = document.createElement("div");
    newcard.setAttribute("class", "card");
    newcard.innerHTML = card.innerHTML;

    //disable the ready order button
    newcard.childNodes[3].childNodes[5].remove();
    console.log();
    //append card to ready list
    ready_order_div.appendChild(newcard);

    //remove card from preparing list
    card.remove();
  }
});

menu_type[0].addEventListener("click", (event) => {
  console.log("hiii");
  menu_type[0].setAttribute("selected", "true");
  menu_type[0].style.backgroundColor = "salmon";
  menu_type[0].style.color = "white";
  menu_type[1].setAttribute("selected", "flase");
  menu_type[1].style.backgroundColor = "";
  menu_type[1].style.color = "black";
  menu_type[2].setAttribute("selected", "flase");
  menu_type[2].style.backgroundColor = "";
  menu_type[2].style.color = "black";
});
menu_type[1].addEventListener("click", (event) => {
  console.log("hiii");
  menu_type[1].setAttribute("selected", "true");
  menu_type[1].style.backgroundColor = "salmon";
  menu_type[1].style.color = "white";
  menu_type[0].setAttribute("selected", "flase");
  menu_type[0].style.backgroundColor = "";
  menu_type[0].style.color = "black";
  menu_type[2].setAttribute("selected", "flase");
  menu_type[2].style.backgroundColor = "";
  menu_type[2].style.color = "black";
});

menu_type[2].addEventListener("click", (event) => {
  console.log("hiii");
  menu_type[2].setAttribute("selected", "true");
  menu_type[2].style.backgroundColor = "salmon";
  menu_type[2].style.color = "white";
  menu_type[0].setAttribute("selected", "flase");
  menu_type[0].style.backgroundColor = "";
  menu_type[0].style.color = "black";
  menu_type[1].setAttribute("selected", "flase");
  menu_type[1].style.backgroundColor = "";
  menu_type[1].style.color = "black";
});

dish_image_div.addEventListener("click", (event) => {
  document.getElementById("image-input").click();
});

let imgUpload = (event) => {
  if (document.getElementById("image")) {
    document.getElementById("image").remove();
  }
  const files = event.target.files;
  const filesLength = files.length;
  if (filesLength > 0) {
    const imageSrc = URL.createObjectURL(files[0]);

    const imagePreviewElement = document.createElement("img");
    imagePreviewElement.setAttribute("id", "image");
    imagePreviewElement.src = imageSrc;
    dish_image_div.appendChild(imagePreviewElement);
    document.getElementById("upload-image-text").style.display = "none";
  }
};

consume_type[0].addEventListener("click", (event) => {
  consume_type[0].setAttribute("selected", "true");
  consume_type[0].style.backgroundColor = "#404a87";
  consume_type[0].style.color = "white";

  consume_type[1].setAttribute("selected", "false");
  consume_type[1].style.backgroundColor = "";
  consume_type[1].style.color = "black";
});

consume_type[1].addEventListener("click", (event) => {
  consume_type[1].setAttribute("selected", "true");
  consume_type[1].style.backgroundColor = "#404a87";
  consume_type[1].style.color = "white";

  consume_type[0].setAttribute("selected", "false");
  consume_type[0].style.backgroundColor = "";
  consume_type[0].style.color = "black";
});

document.getElementById("dish-submit").addEventListener("click", (event) => {
  let menu_type_list = document.getElementsByClassName("select-menu-type");
  let menuType;
  for (var i = 0; i < menu_type_list.length; i++) {
    if (menu_type_list[i].getAttribute("selected") == "true") {
      menuType = menu_type_list[i].innerHTML.toLowerCase();
    }
    //clear the form after submit
    menu_type_list[i].setAttribute("selected", "false");
    menu_type_list[i].style.color = "black";
    menu_type_list[i].style.backgroundColor = "";
  }
  let dishName = document.getElementById("dish-name-input").value;
  document.getElementById("dish-name-input").value = "";

  let dishDesc = document.getElementById("dish-desc-input").value;
  document.getElementById("dish-desc-input").value = "";

  let dishImage = document.getElementById("image-input").files[0];
  document.getElementById("image").remove();
  document.getElementById("upload-image-text").style.display = "block";

  let consumeType;
  let consume_type_list = document.getElementsByClassName("consume-type");
  if (consume_type_list[0].getAttribute("selected") == "true") {
    consumeType = "veg";
  } else if (consume_type_list[1].getAttribute("selected") == "true") {
    consumeType = "nonveg";
  }
  consume_type_list[0].setAttribute("selected", "false");
  consume_type_list[0].style.color = "black";
  consume_type_list[0].style.backgroundColor = "";

  consume_type_list[1].setAttribute("selected", "false");
  consume_type_list[1].style.color = "black";
  consume_type_list[1].style.backgroundColor = "";

  let dishPrice = document.getElementById("dish-price-input").value;
  document.getElementById("dish-price-input").value = "";

  //get userid
  let queryString = window.location.search;
  let urlParam = new URLSearchParams(queryString);
  let userid = urlParam.get("userid");

  let formData = new FormData();
  formData.append("menuType", menuType);
  formData.append("dishName", dishName);
  formData.append("dishDesc", dishDesc);
  formData.append("dishImage", dishImage);
  formData.append("consumeType", consumeType);
  formData.append("dishPrice", dishPrice);
  formData.append("userid", userid);

  fetch("http://localhost:8080/saveDish", {
    method: "POST",
    body: formData,
  })
    .then((resp) => resp.json())
    .then((dbdata) => {
      console.log(dbdata);

      if (dbdata != null) {
        for (var i = 0; i < dbdata.length; i++) {
          let data = dbdata[i];

          //create item
          let item = document.createElement("div");
          item.setAttribute("class", "item");

          let item_image_div = document.createElement("div");
          item_image_div.setAttribute("class", "item-image-div");

          let item_image = document.createElement("img");
          item_image.src = "data:image/jpeg;base64," + data.dishImage;

          let item_content_div = document.createElement("div");
          item_content_div.setAttribute("class", "item-content-div");

          let veg_nonveg = document.createElement("div");
          veg_nonveg.setAttribute("class", "veg-nonveg");

          let veg_image = document.createElement("img");
          if (data.consumeType == "veg") veg_image.src = "veg.png";
          else veg_image.src = "nonveg.svg";

          let item_title = document.createElement("div");
          item_title.setAttribute("class", "item-title");
          item_title.innerHTML = data.dishName;

          let item_rating = document.createElement("div");
          item_rating.setAttribute("class", "item-rating");
          item_rating.innerHTML = "Rating : " + data.dishRating;

          let item_price = document.createElement("div");
          item_price.setAttribute("class", "item-price");
          item_price.innerHTML = "&#x20B9;" + data.dishPrice;

          let item_desc = document.createElement("div");
          item_desc.setAttribute("class", "item-desc");
          item_desc.innerHTML = data.dishDesc;

          let item_id = document.createElement("div");
          item_id.setAttribute("class", "item-id");
          item_id.innerHTML = data.dishId;

          let edit_item = document.createElement("div");
          edit_item.setAttribute("class", "edit-item");

          let edit_image = document.createElement("img");
          edit_image.src = "edit.png";

          //join
          item_image_div.appendChild(item_image);
          item.appendChild(item_image_div);

          veg_nonveg.appendChild(veg_image);
          item_content_div.appendChild(veg_nonveg);
          item_content_div.appendChild(item_title);
          item_content_div.appendChild(item_rating);
          item_content_div.appendChild(item_price);
          item_content_div.appendChild(item_desc);
          item_content_div.appendChild(item_id);

          edit_item.appendChild(edit_image);
          item_content_div.appendChild(edit_item);

          item.appendChild(item_content_div);

          //append based on type
          if (data.menuType == "breakfast") {
            let breakfast_item_list = document.getElementById(
              "breakfast-item-list"
            );
            breakfast_item_list.appendChild(item);
          } else if (data.menuType == "lunch") {
            let lunch_item_list = document.getElementById("lunch-item-list");
            lunch_item_list.appendChild(item);
          } else if (data.menuType == "dinner") {
            let dinner_item_list = document.getElementById("dinner-item-list");
            dinner_item_list.appendChild(item);
          }
        }
      }
    })
    .catch((error) => console.log(error));
});
