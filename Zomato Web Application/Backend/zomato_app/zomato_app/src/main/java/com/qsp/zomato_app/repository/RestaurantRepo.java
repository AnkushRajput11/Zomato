package com.qsp.zomato_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.qsp.zomato_app.dto.Restaurant;

public interface RestaurantRepo extends JpaRepository<Restaurant, Integer>{
	
	List<Restaurant> findRestaurantByrestaurantAddressContainingIgnoreCase(String city);
	
	@Query("select r from Restaurant r where r.restaurantAddress like %:city% and establishmentType='delivery'")
	List<Restaurant> findRestaurantByrestaurantAddress(@Param("city") String city);
	
	@Query("select r from Restaurant r where r.restaurantName LIKE ?1% and r.restaurantAddress like %?2% and establishmentType='delivery'")
	List<Restaurant> findRestaurantContainingValue(String value, String city);
}
