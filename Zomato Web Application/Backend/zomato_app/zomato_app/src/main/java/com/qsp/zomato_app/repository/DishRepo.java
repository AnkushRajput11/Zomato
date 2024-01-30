package com.qsp.zomato_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.qsp.zomato_app.dto.Dish;

public interface DishRepo extends JpaRepository<Dish, Integer>{
	
//	@Query("select d from Dish d where d.dishName like %:value%")
//	List<Dish> findDishContainingValue(@Param("value") String value);
		
	@Query("select d from Dish d where d.dishName LIKE ?1%")
	List<Dish> findDishContainingValue(String value);
	
}
