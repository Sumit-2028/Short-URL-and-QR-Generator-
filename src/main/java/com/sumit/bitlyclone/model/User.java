package com.sumit.bitlyclone.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity // tells JPA: "this class = a database table"
@Table(name = "users") // table will be named 'users' in MySQL
@Getter
@Setter // Lombok auto-generates getters and setters
@NoArgsConstructor // Lombok generates empty constructor (required by JPA)
@AllArgsConstructor // Lombok generates constructor with all fields
@Builder // Lombok gives us User.builder().email("...").build()
public class User {

    @Id // this is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // MySQL auto-increments it
    private Long id;

    @Column(nullable = false, unique = true) // email must be unique in the table
    private String email;

    @Column(nullable = false)
    private String password; // stored as bcrypt hash, never plaintext

    @Column(nullable = false)
    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // One user can have many URLs
    // mappedBy = "user" means the 'user' field in Url.java owns this relationship
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Url> urls;

    @PrePersist // runs automatically just before saving to DB for the first time
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}