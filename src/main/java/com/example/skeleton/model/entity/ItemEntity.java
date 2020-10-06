package com.example.skeleton.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "items")
public class ItemEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "company_name")
    private String companyName;
    @Column(name = "company_address")
    private String companyAddress;
    @Column(name = "company_detail_address")
    private String companyDetailAddress;
    @Column(name = "company_contact")
    private String companyContact;
    @Column(name = "info_url")
    private String infoUrl;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "service_time")
    private String serviceTime;
    @Column(name = "best_menu")
    private String bestMenu;
    @Column(name = "talk_time")
    private Date talkTime;
    @Column(name = "talk_people")
    private String talkPeople;
    @Column(name = "manager_name")
    private String managerName;
    @Column(name = "talk_desc")
    private String talkDesc;
    @Column(name = "any_desc")
    private String anyDesc;
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "updated_at")
    private Date updatedAt;
    @GeneratedValue
    @Column(name = "deleted")
    private int deleted;
    
}
