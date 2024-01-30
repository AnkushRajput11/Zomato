package com.qsp.zomato_app.dto;

import java.sql.Clob;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String restaurantName;
	
	private String restaurantAddress;
	@Column(unique = true)
	private long restaurantPhone;
	@Column(unique = true)
	private long restaurantOwnerPhone;
	private String establishmentType;
	private String restaurantCuisines;
	
	@Lob
	@Column(length = 20971520)
	private byte[] menuImage;
	
	@Lob
	@Column(length = 20971520)
	private byte[] restautantImage;
	
	private double latitude;
	private double longitude;
	
	@OneToMany(cascade = CascadeType.ALL)
	List<Dish> dishes;
}
