// src/main/java/com/sumit/bitlyclone/dto/UrlRequest.java
package com.sumit.bitlyclone.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data

public class UrlRequest {
    @NotBlank(message = "URL is required")
    private String originalUrl;

    public String getOriginalUrl() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}