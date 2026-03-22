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
    private String shortUrl;
    private String qrCode; // base64 encoded PNG image string
    private Long clickCount;
    private LocalDateTime createdAt;
}
