package com.qsp.zomato_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.qsp.zomato_app.dto.LoggedUser;

public interface LoggedUserRepo extends JpaRepository<LoggedUser, Integer>{

	@Query("select u from LoggedUser u where email=?1")
	LoggedUser findLoggedUser(String email);
	
	

}
