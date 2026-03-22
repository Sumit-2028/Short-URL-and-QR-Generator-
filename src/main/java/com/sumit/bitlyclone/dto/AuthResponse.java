// src/main/java/com/sumit/bitlyclone/dto/AuthResponse.java
package com.sumit.bitlyclone.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token; // JWT token sent back to React after login/register
    private String email;
    private String name;
}