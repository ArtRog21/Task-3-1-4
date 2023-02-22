package tech.ITM.spring.boot_security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tech.ITM.spring.boot_security.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("from User u inner JOIN FETCH u.roles as roles where u.username = :username")
    User getUserByUsername(@Param("username") String username);
}