// src/main/java/com/sumit/bitlyclone/controller/UrlController.java

package com.sumit.bitlyclone.controller;

import com.sumit.bitlyclone.dto.*;
import com.sumit.bitlyclone.service.UrlService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
public class UrlController {

    @Autowired
    private UrlService urlService;

    // POST /api/urls/shorten — requires JWT token
    // @AuthenticationPrincipal gives us the logged-in user from the JWT filter
    @PostMapping("/api/urls/shorten")
    public ResponseEntity<UrlResponse> shorten(
            @Valid @RequestBody UrlRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        UrlResponse response = urlService.shortenUrl(
                request.getOriginalUrl(),
                userDetails.getUsername() // username = email in our setup
        );
        return ResponseEntity.ok(response);
    }

    // GET /api/urls — returns all URLs for the logged-in user
    @GetMapping("/api/urls")
    public ResponseEntity<List<UrlResponse>> getUserUrls(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(urlService.getUserUrls(userDetails.getUsername()));
    }

    @DeleteMapping("/api/urls/{id}")
    public ResponseEntity<Void> deleteUrl(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        urlService.deleteUserUrl(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    // GET /r/{shortCode} — PUBLIC endpoint — redirects to original URL
    // ResponseEntity.status(302) sends an HTTP redirect to the browser
    @GetMapping("/r/{shortCode}")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode) {
        String originalUrl = urlService.redirect(shortCode);
        return ResponseEntity.status(302)
                .location(URI.create(originalUrl))
                .build();
    }
}
