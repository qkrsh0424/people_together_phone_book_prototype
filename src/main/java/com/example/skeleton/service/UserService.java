package com.example.skeleton.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.example.skeleton.model.DTO.UserJItemSizeGet1DTO;
import com.example.skeleton.model.DTO.UserLoginSessionDTO;
import com.example.skeleton.model.DTO.UserResetPasswordReq1DTO;
import com.example.skeleton.model.VO.UserInfoVO;
import com.example.skeleton.model.entity.UserEntity;
import com.example.skeleton.model.entity.UserJItemProj;
import com.example.skeleton.model.repository.UserRepository;
import com.example.skeleton.service.handler.DateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    UserAuthService userAuthService;

    @Autowired
    ConvertService convert;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DateService dateService;

    @Autowired
    PasswordEncoder encoder;
    public UserInfoVO getUserInfo(HttpServletRequest request){
        if(userAuthService.isUserSessionValid(request)){
            UserLoginSessionDTO userLoginSessionDTO = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert((String)redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId()), UserLoginSessionDTO.class);
            return getUserSessionDtoToVo(userLoginSessionDTO);
        }
        return null;
    }

    public UserLoginSessionDTO getUserInfoDTO(HttpServletRequest request){
        if(userAuthService.isUserSessionValid(request)){
            UserLoginSessionDTO userLoginSessionDTO = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert((String)redisTemplate.opsForValue().get("spring:session:sessions:expires:" + request.getSession().getId()), UserLoginSessionDTO.class);
            return userLoginSessionDTO;
        }
        return null;
    }

    public UserInfoVO getUserSessionDtoToVo(UserLoginSessionDTO userSessionData){
        UserInfoVO user = new UserInfoVO();
        user.setUsername(userSessionData.getUsername());
        user.setRole(userSessionData.getRole());
        user.setCreatedAt(userSessionData.getCreatedAt());
        user.setUpdatedAt(userSessionData.getUpdatedAt());
        return user;
    }

    public Boolean isAdmin(UserInfoVO user){
        if(user.getRole().equals("ROLE_ADMIN")){
            return true;
        }else{
            return false;
        }
    }

    public List<UserJItemSizeGet1DTO> getMembersInfo(){
        List<UserJItemProj> membersProj = userRepository.selectAllMembersAndItem("ROLE_USER");
        List<UserJItemSizeGet1DTO> userGetDtos = new ArrayList<>();
        for(UserJItemProj proj : membersProj){
            UserJItemSizeGet1DTO dto = new UserJItemSizeGet1DTO();
            dto.setUserId(proj.getUser().getId());
            dto.setUsername(proj.getUser().getUsername());
            dto.setCreatedAt(proj.getUser().getCreatedAt());
            dto.setItemSize(proj.getItemCount());
            userGetDtos.add(dto);
        }
        return userGetDtos;
    }

    public List<UserJItemSizeGet1DTO> getAdminsInfo(HttpServletRequest request){
        UserLoginSessionDTO user = this.getUserInfoDTO(request);
        List<UserJItemProj> membersProj = userRepository.selectAllMembersAndItem("ROLE_ADMIN");
        List<UserJItemSizeGet1DTO> userGetDtos = new ArrayList<>();
        for(UserJItemProj proj : membersProj){
            UserJItemSizeGet1DTO dto = new UserJItemSizeGet1DTO();
            dto.setUserId(proj.getUser().getId());
            dto.setUsername(proj.getUser().getUsername());
            dto.setCreatedAt(proj.getUser().getCreatedAt());
            dto.setItemSize(proj.getItemCount());
            if(user.getId().equals(proj.getUser().getId())){
                dto.setOwn("OWNER"); 
            }
            userGetDtos.add(dto);
        }
        return userGetDtos;
    }

	public String deleteMemberOne(HttpServletRequest request, UserJItemSizeGet1DTO member) {
        Optional<UserEntity> memberEntityOpt = userRepository.findById(member.getUserId());
        if(memberEntityOpt.isPresent()){
            memberEntityOpt.ifPresent(r->{
                r.setDeleted(EXIST_OR_NOT.IS_DELETED);
                r.setUpdatedAt(dateService.getCurrentDate());
                userRepository.save(r);
            });
            sessionFindAndDelete(member);
            return "{\"message\":\"SUCCESS\"}";
        }else{
            return "{\"message\":\"ERROR\"}";
        }
    }

	public String updateMemberPassword(HttpServletRequest request, UserResetPasswordReq1DTO reqDto) {
        UserJItemSizeGet1DTO member = reqDto.getMember();
        String newPassword = reqDto.getNewPassword();
        Optional<UserEntity> userOp = userRepository.findById(member.getUserId());

        if(userOp.isPresent()){
            UUID uuidSalt = UUID.randomUUID();
            String salt = uuidSalt.toString();
            String encPassword = encoder.encode(newPassword + salt);

            userOp.ifPresent(newuser->{
                newuser.setPassword(encPassword);
                newuser.setSalt(salt);
                newuser.setUpdatedAt(dateService.getCurrentDate());
                userRepository.save(newuser);
            });

            // "spring:session:sessions:expires:"
            sessionFindAndDelete(member);
            return "{\"message\":\"SUCCESS\"}";
        }
		return "{\"message\":\"ERROR\"}";
    }
    
    private void sessionFindAndDelete(UserJItemSizeGet1DTO member){
        redisTemplate.keys("*").forEach(r->{
            String dataSession = (String) r;
            if(dataSession.contains("spring:session:sessions:expires:")){
                if(redisTemplate.opsForValue().get(r).equals("") || redisTemplate.opsForValue().get(r) == null){
                    return;
                }
                UserLoginSessionDTO userLoginSessionDTO = (UserLoginSessionDTO) convert.jsonString2ObjectClassConvert((String)redisTemplate.opsForValue().get(r), UserLoginSessionDTO.class);
                if(userLoginSessionDTO!=null && userLoginSessionDTO.getId().equals(member.getUserId())){
                    System.out.println("logout");
                    redisTemplate.delete(r);
                }
            }
        });
    }
}
