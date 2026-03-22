// src/main/java/com/sumit/bitlyclone/dto/RegisterRequest.java
package com.sumit.bitlyclone.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data // Lombok: generates getters, setters, toString, equals, hashCode
public class RegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}