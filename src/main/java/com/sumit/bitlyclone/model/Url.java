package com.sumit.bitlyclone.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "urls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "original_url", nullable = false, length = 2048)
    private String originalUrl;

    @Column(name = "short_code", nullable = false, unique = true)
    private String shortCode; // e.g. "abc123" — the unique 6-char code

    @Column(name = "click_count")
    private Long clickCount = 0L; // starts at 0, incremented on every redirect

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Many URLs belong to one user
    // @JoinColumn = foreign key column name in the 'urls' table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.clickCount == null)
            this.clickCount = 0L;
    }
}