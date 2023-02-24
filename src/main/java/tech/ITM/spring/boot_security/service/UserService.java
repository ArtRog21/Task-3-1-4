package tech.ITM.spring.boot_security.service;

import org.springframework.transaction.annotation.Transactional;
import tech.ITM.spring.boot_security.model.Role;
import tech.ITM.spring.boot_security.model.User;

import java.util.List;
import java.util.Set;

@Transactional
public interface UserService {
    List<User> allUsers();
    User showUser(Long id);
    User getUserByEmail(String email);
    void addUser(User user);
    void updateUser(User user, Long id);
    void deleteUser(Long id);
    Set<Role> getAllRoles();
    Role getRoleByName(String role);
}
