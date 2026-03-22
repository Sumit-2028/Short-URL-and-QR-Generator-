// src/main/java/com/sumit/bitlyclone/config/SecurityConfig.java

package com.sumit.bitlyclone.config;

import com.sumit.bitlyclone.security.JwtAuthFilter;
import com.sumit.bitlyclone.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable()) // disable CSRF — we use JWT, not sessions

                .authorizeHttpRequests(auth -> auth
                        // These endpoints are PUBLIC — no token needed
                        .requestMatchers("/api/auth/**").permitAll() // login, register
                        .requestMatchers("/r/**").permitAll() // redirect short URLs
                        // Everything else REQUIRES a valid JWT token
                        .anyRequest().authenticated())

                // STATELESS = no server-side sessions, JWT handles auth state
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Add our JWT filter BEFORE Spring's default login filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // BCrypt = secure password hashing algorithm — never store plain passwords!
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager is used by AuthService to verify login credentials
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}
