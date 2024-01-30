package com.qsp.zomato_app.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qsp.zomato_app.dto.Address;
import com.qsp.zomato_app.dto.Dish;
import com.qsp.zomato_app.dto.LoggedUser;
import com.qsp.zomato_app.dto.Restaurant;
import com.qsp.zomato_app.dto.User;
import com.qsp.zomato_app.repository.DishRepo;
import com.qsp.zomato_app.repository.LoggedUserRepo;
import com.qsp.zomato_app.repository.RestaurantRepo;
import com.qsp.zomato_app.repository.UserRepo;

@RestController
public class UserController {

	@Autowired
	UserRepo userRepo;
	@Autowired
	RestaurantRepo restaurantRepo;

	@Autowired
	LoggedUserRepo loggedUserRepo;

	@Autowired
	DishRepo dishRepo;

	@CrossOrigin
	@GetMapping("/checkSession")
	public User getSessionStatus(@RequestParam("userid") String id) {

		Optional<User> optional = userRepo.findById(Integer.parseInt(id));
		if (optional.isPresent()) {
			LoggedUser loggedUser = loggedUserRepo.findLoggedUser(optional.get().getEmail());
			if (loggedUser != null)
				return userRepo.findUserByEmail(loggedUser.getEmail());
		}

		return null;

	}

	@CrossOrigin
	@PostMapping("/signup")
	public User saveUser(@RequestBody User user) {
		return userRepo.save(user);
	}

	@CrossOrigin
	@GetMapping("/login")
	public User getUser(@RequestParam String email, @RequestParam String password) {

		User user = userRepo.findUser(email, password);
		System.out.println(user);
		if (user != null) {

			LoggedUser dbloggedUser = loggedUserRepo.findLoggedUser(email);
			if (dbloggedUser == null) {
				LoggedUser loggedUser = new LoggedUser();
				loggedUser.setEmail(email);
				loggedUserRepo.save(loggedUser);
				System.out.println("User saved to logged user table");
			}

			return user;

		}

		return null;
	}

	@CrossOrigin
	@PostMapping(value = "/createRestaurant", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public Restaurant createRestaurant(@RequestPart("restaurantName") String restaurantName,
			@RequestPart("restaurantAddress") String restaurantAddress, @RequestPart("latitude") String latitude,
			@RequestPart("longitude") String longitude, @RequestPart("restaurantPhone") String restaurantPhone,
			@RequestPart("restaurantOwnerPhone") String restaurantOwnerPhone,
			@RequestPart("establishmentType") String establishmentType,
			@RequestPart("restaurantCuisines") String restaurantCuisines,
			@RequestPart("menuImage") MultipartFile menuImage,
			@RequestPart("restautantImage") MultipartFile restaurantImage, @RequestPart("userid") String userid)
			throws IOException {

		byte[] menuImageByteArray = getImageByteArray(menuImage);
		byte[] restaurantImageByteArray = getImageByteArray(restaurantImage);

		Restaurant restaurant = new Restaurant(0, restaurantName.toLowerCase(), restaurantAddress.toLowerCase(),
				Long.parseLong(restaurantPhone), Long.parseLong(restaurantOwnerPhone), establishmentType.toLowerCase(),
				restaurantCuisines.toLowerCase(), menuImageByteArray, restaurantImageByteArray,
				Double.parseDouble(latitude), Double.parseDouble(longitude), null);

		Optional<User> optional = userRepo.findById(Integer.parseInt(userid));
		if (optional.isPresent()) {
			User dbuser = optional.get();
			dbuser.setRestaurant(restaurant);
			userRepo.save(dbuser);
			System.out.println("User & restaurant saved successfully");
		}
		return restaurant;
	}

	@CrossOrigin
	@GetMapping("/getAllRestaurants")
	public List<Restaurant> getAllRestaurants(@RequestParam("city") String city) {
//		city = city.toUpperCase();
//		System.out.println(restaurantRepo.findRestaurantByrestaurantAddressContainingIgnoreCase("%"+city+"%"));
//		return restaurantRepo.findRestaurantByrestaurantAddressContainingIgnoreCase("%"+city+"%");
		city = city.toLowerCase();
		System.out.println(restaurantRepo.findRestaurantByrestaurantAddress(city));
		return restaurantRepo.findRestaurantByrestaurantAddress(city);
	}

	public byte[] getImageByteArray(MultipartFile file) throws IOException {
		InputStream imageInputStream = file.getInputStream();
		byte[] data = new byte[imageInputStream.available()];
		imageInputStream.read(data);
		return data;
	}

	@CrossOrigin
	@PostMapping("/saveAddress")
	public Address saveAddress(@RequestParam("userid") String id, @RequestBody Address address) {

//		Optional<User> optional=userRepo.findById(id);
//		if(optional.isPresent()) {
//			User user=optional.get();
//			List<Address> addresses=user.getAddress();
//			addresses.add(address);
//			user.setAddress(addresses);
//			return userRepo.save(user);
//		}
//		return null;

		Optional<User> optional = userRepo.findById(Integer.parseInt(id));
		if (optional.isPresent()) {
			User user = optional.get();
			List<Address> addresses = user.getAddress();
			addresses.add(address);
			user.setAddress(addresses);
			userRepo.save(user);
			return address;
		}
		return null;

	}

	@CrossOrigin
	@PostMapping(value = "/saveDish", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public List<Dish> saveDish(@RequestPart("dishName") String dishName, @RequestPart("dishDesc") String dishDesc,
			@RequestPart("dishImage") MultipartFile dishImage, @RequestPart("dishPrice") String dishPrice,
			@RequestPart("consumeType") String consumeType, @RequestPart("menuType") String menuType,
			@RequestPart("userid") String userid) throws IOException {

		Optional<User> optional = userRepo.findById(Integer.parseInt(userid));

		User user = optional.get();
		Restaurant restaurant = user.getRestaurant();
		List<Dish> dishes = restaurant.getDishes();

		Dish dish = new Dish();
		dish.setDishName(dishName);
		dish.setDishDesc(dishDesc);
		dish.setDishPrice(Double.parseDouble(dishPrice));
		dish.setDishImage(getImageByteArray(dishImage));
		dish.setConsumeType(consumeType);
		dish.setMenuType(menuType);

		dishes.add(dish);

		restaurant.setDishes(dishes);

		return restaurantRepo.save(restaurant).getDishes();

	}
	
	@CrossOrigin
	@GetMapping("/getSearchValue")
	public List<Object> searchValue(@RequestParam("search") String value,@RequestParam("city") String city){
		
		if(value!="") {
			city = city.toLowerCase();
			List<Dish> dishes = dishRepo.findDishContainingValue(value);
			List<Restaurant> restaurants = restaurantRepo.findRestaurantContainingValue(value,city);
			
			List<Object> list = new ArrayList<>();
			list.addAll(dishes);
			list.addAll(restaurants);
			
			return list;
		}else {
			return new ArrayList<Object>();
		}
	}

}
//krushi mart application - 
