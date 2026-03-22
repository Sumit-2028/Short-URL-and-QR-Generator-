// src/main/java/com/sumit/bitlyclone/dto/LoginRequest.java
package com.sumit.bitlyclone.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequest {
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}