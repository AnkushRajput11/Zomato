package com.qsp.zomato_app.dto;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	@Column(unique = true)
	private long phone;
	
	@Column(unique = true)
	private String email;
	
	@Column(unique=true)
	private String password;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Address> address;
	
	@OneToOne(cascade = CascadeType.ALL)
	Restaurant restaurant;
	
}
