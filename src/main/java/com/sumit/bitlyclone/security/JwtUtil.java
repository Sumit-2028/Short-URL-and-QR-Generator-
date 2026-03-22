// src/main/java/com/sumit/bitlyclone/security/JwtUtil.java

package com.sumit.bitlyclone.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

// @Component = Spring manages this as a bean — you can @Autowired it anywhere
@Component
public class JwtUtil {

    @Value("${jwt.secret}") // reads from application.properties
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    // Converts the string secret into a cryptographic key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Called on login — creates a JWT token containing the user's email
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // stores email inside token
                .setIssuedAt(new Date()) // when was it created
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // expires in 24h
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // signs it
                .compact();
    }

    // Extracts the email from a token (used in every protected request)
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Checks if token is valid and not expired
    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}