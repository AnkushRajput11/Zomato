package com.qsp.zomato_app.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dish {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int dishId;
	private String dishName;
	private String dishDesc;
	
	@Lob
	@Column(length = 20971520)
	private byte[] dishImage;
	private double dishPrice;
	private String consumeType;
	private String menuType;
	private double dishRating;
}
