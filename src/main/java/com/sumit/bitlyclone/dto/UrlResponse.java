// src/main/java/com/sumit/bitlyclone/dto/UrlResponse.java
package com.sumit.bitlyclone.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlResponse {
    private Long id;
    private String originalUrl;
    private String shortCode;
    private String shortUrl; // full short URL: http://localhost:8080/r/abc123
    private String qrCode; // base64 encoded PNG image string
    private Long clickCount;
    private LocalDateTime createdAt;
}