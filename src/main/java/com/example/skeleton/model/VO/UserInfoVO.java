package com.example.skeleton.model.VO;

import java.util.Date;

import lombok.Data;

@Data
public class UserInfoVO {
    private String username;
    private String role;
    private Date createdAt;
    private Date updatedAt;
}
