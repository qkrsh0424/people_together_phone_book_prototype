package com.example.skeleton.controller.router;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import com.example.skeleton.model.VO.UserInfoVO;
import com.example.skeleton.service.UserAuthService;
import com.example.skeleton.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    UserAuthService userAuthService;

    @Autowired
    UserService userService;
    
    @GetMapping(value = "/")
    public String HomePage(HttpServletRequest request, Model model) {
        if(!userAuthService.isUserSessionValid(request)){
            return "redirect:/login";
        }
        model.addAttribute("user", userService.getUserInfo(request));
        return "view/dashboard";
    }

    @GetMapping(value = "/login")
    public String LoginPage(HttpServletRequest request){
        // System.out.println(request.getSession().getId());
        if(userAuthService.isUserSessionValid(request)){
            return "redirect:/";
        }
        return "view/login";
    }

    @GetMapping(value = "/signup")
    public String SignupPage(HttpServletRequest request){
        UserInfoVO user = userService.getUserInfo(request);
        if(user ==null){
            return "redirect:/";
        }

        if(userService.isAdmin(user)){
            return "view/signup";
        }else{
            return "redirect:/";
        }

    }

    @GetMapping(value = { "/list", "/list?id={id}&pw={pw}" })
    public String ListPage(HttpServletRequest request, @PathParam("id") String id, @PathParam("pw") String pw) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user ==null){
            return "redirect:/";
        }

        if (id != null && pw != null && username.equals(decodeBase64(id)) && password.equals(decodeBase64(pw)) && userService.isAdmin(user)) {
            return "view/list";
        } else {
            return "redirect:/";
        }
    }

    @GetMapping(value = "/memberlist")
    public String MemberListPage(HttpServletRequest request) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user ==null){
            return "redirect:/";
        }
        if (userService.isAdmin(user)) {
            return "view/memberList";
        } else {
            return "redirect:/";
        }
    }

    private String decodeBase64(String target) {
        String decodedString = "";
        try {
            // Base64 디코딩 ///////////////////////////////////////////////////
            Decoder decoder = Base64.getDecoder();

            // Decoder#decode(bytes[] src)
            byte[] decodedBytes1 = decoder.decode(target);

            // 디코딩한 문자열을 표시
            decodedString = new String(decodedBytes1, "UTF-8");

        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return decodedString;
    }
}
