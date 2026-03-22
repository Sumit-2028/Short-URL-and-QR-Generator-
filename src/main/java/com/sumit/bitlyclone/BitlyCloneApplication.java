// src/main/java/com/sumit/bitlyclone/BitlyCloneApplication.java

package com.sumit.bitlyclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication = 3 annotations in one:
//   @Configuration      → this class can define Spring beans
//   @EnableAutoConfiguration → Spring Boot auto-configures everything it detects
//   @ComponentScan      → scans this package and sub-packages for @Component, @Service, etc.
@SpringBootApplication
public class BitlyCloneApplication {
	public static void main(String[] args) {
		SpringApplication.run(BitlyCloneApplication.class, args);
	}
}