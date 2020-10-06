package com.example.skeleton.controller.router;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class RouterController {
    @Value("${app.data.username}")
    String username;

    @Value("${app.data.password}")
    String password;

    @GetMapping(value = "/")
    public String HomePage(){
        return "view/dashboard";
    }

    @GetMapping(value = {"/list","/list?id={id}&pw={pw}"})
    public String ListPage(HttpServletRequest request, @PathParam("id") String id, @PathParam("pw") String pw){
        if(id!=null && pw != null && username.equals(id) && password.equals(pw)){
            return "view/list";
        }else{
            return "redirect:/";
        }
        
    }
}
