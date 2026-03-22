// src/main/java/com/sumit/bitlyclone/repository/UrlRepository.java

package com.sumit.bitlyclone.repository;

import com.sumit.bitlyclone.model.Url;
import com.sumit.bitlyclone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {

    // Used when someone visits the short link — finds the original URL
    Optional<Url> findByShortCode(String shortCode);

    // Gets all URLs belonging to a specific user (for their dashboard)
    List<Url> findByUser(User user);

    Optional<Url> findByIdAndUser(Long id, User user);

    // Custom JPQL query — increments click count without loading the entity
    // @Modifying = tells Spring this query changes data (UPDATE/DELETE)
    // @Query uses JPQL (Java Persistence Query Language), not SQL
    @Modifying
    @Query("UPDATE Url u SET u.clickCount = u.clickCount + 1 WHERE u.shortCode = :shortCode")
    void incrementClickCount(String shortCode);
}
