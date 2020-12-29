package com.example.skeleton.model.DTO;

import lombok.Data;

@Data
public class UpdateItemDTO {
    private Long id;
    private String regEmp;
    private String companyName;
    private String companyAddress;
    private String companyDetailAddress;
    private String companyContact;
    private String infoUrl;
    private String phoneNumber;
    private String serviceTime;
    private String bestMenu;
    private String talkPeople;
    private String managerName;
    private String talkDesc;
    private String anyDesc;
}