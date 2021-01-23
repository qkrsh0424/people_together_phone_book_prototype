package com.example.skeleton.model.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class UserLoginSessionDTO {
    private String status;
    private String id;
    private String username;
    private String role;
    private Date createdAt;
    private Date updatedAt;
    private int deleted;
}
