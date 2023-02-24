package tech.ITM.spring.boot_security.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tech.ITM.spring.boot_security.model.Role;
import tech.ITM.spring.boot_security.model.User;
import tech.ITM.spring.boot_security.service.UserService;

import java.util.Set;

@Controller
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/")
    public String getLoginPage() {
        return "login";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/admin")
    public String showAllUsers(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        model.addAttribute("user", user);
        model.addAttribute("users", userService.allUsers());
        model.addAttribute("newUser", new User());
        Set<Role> roles = userService.getAllRoles();
        model.addAttribute("allRoles", roles);
        return "users";
    }
}