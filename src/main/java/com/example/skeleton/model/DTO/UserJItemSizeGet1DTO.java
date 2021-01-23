package com.example.skeleton.model.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class UserJItemSizeGet1DTO {
    private String userId;
    private String username;
    private Date createdAt;
    private Long itemSize;
    private String own;
}
