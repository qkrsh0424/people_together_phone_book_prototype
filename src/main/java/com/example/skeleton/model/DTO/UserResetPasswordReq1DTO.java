package com.example.skeleton.model.DTO;

import lombok.Data;

@Data
public class UserResetPasswordReq1DTO {
    private UserJItemSizeGet1DTO member;
    private String newPassword;
}
