package com.example.skeleton.controller.api;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.skeleton.model.DTO.UserJItemSizeGet1DTO;
import com.example.skeleton.model.DTO.UserJItemSizeRes1DTO;
import com.example.skeleton.model.DTO.UserLoginDTO;
import com.example.skeleton.model.DTO.UserResetPasswordReq1DTO;
import com.example.skeleton.model.DTO.UserSignupDTO;
import com.example.skeleton.model.VO.UserInfoVO;
import com.example.skeleton.service.UserAuthService;
import com.example.skeleton.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserApiController {
    @Value("${app.environment}")
    private String myEnvironment;

    @Value("${app.environment.development.main.url}")
    private String myEnvDevMainUrl;

    @Value("${app.environment.production.main.url}")
    private String myEnvProdMainUrl;
    
    @Autowired
    UserAuthService userAuthService;

    @Autowired
    UserService userService;


    @PostMapping(value = "/signup")
    public String SignupDo(@RequestBody UserSignupDTO userSignupDto, HttpServletRequest request){
        if(userAuthService.isUserExist(userSignupDto.getUsername())){
            return "{\"message\":\"exist\"}";
        }
        return userAuthService.insertUserOne(userSignupDto);
    }

    @PostMapping(value = "/login")
    public String LoginDo(@RequestBody UserLoginDTO userLoginDto, HttpServletRequest request, HttpServletResponse response){
        if(userAuthService.isUserSessionValid(request)){
            return "{\"message\":\"error\"}";
        }
        if(userAuthService.checkUserLogin(userLoginDto, request)){
            return "{\"message\":\"success\"}";
        }
        return "{\"message\":\"failure\"}";
    }

    // TODO LOGOUT AJAX 로 넘기기
    @PostMapping(value = "/logout")
    public String LogoutDo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        userAuthService.logout(request);
        return "{\"message\":\"SUCCESS\"}";
    }

    @GetMapping(value = "/logout")
    public void LogoutGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.sendRedirect("/");
    }
    // /api/user/get/member/all
    @GetMapping(value="/user/get/member/all")
    public UserJItemSizeRes1DTO GetMemberAll(){
        UserJItemSizeRes1DTO userRes = new UserJItemSizeRes1DTO();
        List<UserJItemSizeGet1DTO> userDtos = userService.getMembersInfo();
        userRes.setMessage("SUCCESS");
        userRes.setData(userDtos);

        return userRes;
    }

    // /api/user/get/admin/all
    @GetMapping(value="/user/get/admin/all")
    public UserJItemSizeRes1DTO GetAdminAll(HttpServletRequest request){
        UserJItemSizeRes1DTO userRes = new UserJItemSizeRes1DTO();
        List<UserJItemSizeGet1DTO> userDtos = userService.getAdminsInfo(request);
        userRes.setMessage("SUCCESS");
        userRes.setData(userDtos);

        return userRes;
    }

    // /api/user/delete/member/one
    @PostMapping(value="/user/delete/member/one")
    public String DeleteMemberOne(HttpServletRequest request, @RequestBody UserJItemSizeGet1DTO member) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user ==null){
            return "{\"message\":\"USER_INVALID\"}";
        }
        if (userService.isAdmin(user)) {
            return userService.deleteMemberOne(request ,member);
        } else {
            return "{\"message\":\"ERROR\"}";
        }
    }

    // /api/user/update/member/password
    @PostMapping(value="/user/update/member/password")
    public String UpdateMemberPassword(HttpServletRequest request, @RequestBody UserResetPasswordReq1DTO reqDto) {
        UserInfoVO user = userService.getUserInfo(request);
        if(user ==null){
            return "{\"message\":\"USER_INVALID\"}";
        }
        if (userService.isAdmin(user)) {
            return userService.updateMemberPassword(request ,reqDto);
        } else {
            return "{\"message\":\"ERROR\"}";
        }
    }
}
