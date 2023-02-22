package tech.ITM.spring.boot_security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import tech.ITM.spring.boot_security.model.User;
import tech.ITM.spring.boot_security.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public String showUser(Principal principal, Model model){
        User username = userService.getUserByName(principal.getName());
        model.addAttribute("user", username);
        return "user";
    }
}
