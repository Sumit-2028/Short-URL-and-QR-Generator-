// src/main/java/com/sumit/bitlyclone/repository/UserRepository.java

package com.sumit.bitlyclone.repository;

import com.sumit.bitlyclone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// JpaRepository<User, Long>:
//   User  = which entity this repository manages
//   Long  = the type of the primary key (id field)
// This gives us free methods: save(), findById(), findAll(), delete() etc.
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring reads the method name and builds:
    // SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);

    // SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END FROM users WHERE email
    // = ?
    boolean existsByEmail(String email);
}