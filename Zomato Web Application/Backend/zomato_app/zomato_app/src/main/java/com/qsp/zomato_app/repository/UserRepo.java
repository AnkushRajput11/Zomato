package com.qsp.zomato_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.qsp.zomato_app.dto.User;


public interface UserRepo extends JpaRepository<User, Integer>{
	
	@Query("select u from User u where u.email=?1 and u.password=?2")
	User findUser(String email,String password);

	User findUserByEmail(String email);
}
