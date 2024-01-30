package com.qsp.zomato_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class ZomatoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZomatoAppApplication.class, args);
	}

}
