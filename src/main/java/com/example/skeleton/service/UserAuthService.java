package com.example.skeleton.service;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.example.skeleton.model.DTO.UserLoginDTO;
import com.example.skeleton.model.DTO.UserLoginSessionDTO;
import com.example.skeleton.model.DTO.UserSignupDTO;
import com.example.skeleton.model.entity.UserEntity;
import com.example.skeleton.model.repository.UserRepository;
import com.example.skeleton.model.type.DeletedType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

enum ROLE {
    ROLE_ADMIN, ROLE_USER, ROLE_MANAGER, ROLE_USERA, ROLE_USERB, ROLE_USERC, ROLE_USERP
}

@Service
public class UserAuthService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CredentialExtendService credentialExtendService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    ConvertService convert;
    
    public String insertUserOne(UserSignupDTO userSignupDto) {
        UserEntity user = new UserEntity();

        // Create DB user identity UUID
        UUID uuid = UUID.randomUUID();
        // Create password salt UUID
        UUID uuidSalt = UUID.randomUUID();

        Calendar currentCalendar = Calendar.getInstance();
        Date currentDate = currentCalendar.getTime();

        String salt = uuidSalt.toString();
        // Encode password is String (input password string data of signup user +
        // created password of salt UUID).
        String encPassword = encoder.encode(userSignupDto.getPassword() + salt);

        user.setId(uuid.toString());
        user.setUsername(userSignupDto.getUsername());
        user.setPassword(encPassword);
        user.setSalt(salt);
        user.setRole(ROLE.ROLE_USER.toString());
        user.setCreatedAt(currentDate);
        user.setUpdatedAt(currentDate);

        if (userRepository.save(user).getId() != null) {
            return "{\"message\":\"success\"}";
        } else {
            return "{\"message\":\"failure\"}";
        }
    }

    public Boolean checkUserLogin(UserLoginDTO userLoginDto, HttpServletRequest request) {
        Optional<UserEntity> userOpt = userRepository.findByUsername_Custom(userLoginDto.getUsername(), DeletedType.EXIST);
        if (userOpt.isEmpty()) {
            return false;
        }
        UserEntity user = userOpt.get();

        String mergePassword = userLoginDto.getPassword() + user.getSalt();
        
        if (encoder.matches(mergePassword, user.getPassword())) {
            UserLoginSessionDTO sessionDataSet = setUserEntityToSessionDTO(user);
            String dto2String = convert.objectClass2JsonStringConvert(sessionDataSet);
            redisTemplate.opsForValue().set("spring:session:sessions:expires:" + request.getSession().getId(),dto2String);
            return true;
        }
        return false;
    }

    public Boolean isUserExist(String username) {
        Optional<UserEntity> userOpt = userRepository.findByUsername_Custom(username,DeletedType.EXIST);
        if (userOpt.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public Boolean isUserSessionValid(HttpServletRequest request){
        String session = (String) redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId());
        if( session != null && !session.isEmpty() ){
            UserLoginSessionDTO sessionData = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert(session, UserLoginSessionDTO.class);
            if(sessionData.getStatus().equals("loged")){
                return true;
            }
            return false;
        }
        return false;
    }

    // Handler
    private UserLoginSessionDTO setUserEntityToSessionDTO(UserEntity entity){
        UserLoginSessionDTO sessionData = new UserLoginSessionDTO();
        sessionData.setStatus("loged");
        sessionData.setId(entity.getId());
        sessionData.setUsername(entity.getUsername());
        sessionData.setRole(entity.getRole());
        sessionData.setCreatedAt(entity.getCreatedAt());
        sessionData.setUpdatedAt(entity.getUpdatedAt());
        sessionData.setDeleted(entity.getDeleted());
        return sessionData;
    }

    public void logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        redisTemplate.delete("spring:session:sessions:" + session.getId());
    }
}
