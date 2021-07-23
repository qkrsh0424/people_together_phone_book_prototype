package com.example.skeleton.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.example.skeleton.model.DTO.AddItemDTO;
import com.example.skeleton.model.DTO.DeleteItemDTO;
import com.example.skeleton.model.DTO.UpdateItemDTO;
import com.example.skeleton.model.DTO.UserLoginSessionDTO;
import com.example.skeleton.model.VO.UserInfoVO;
import com.example.skeleton.model.entity.ItemEntity;
import com.example.skeleton.model.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddItemService {
    @Autowired
    ItemRepository itemRepository;

    private int ITEM_LIST_SIZE = 20;

    public void addItem(UserLoginSessionDTO user, AddItemDTO addItemDto){

        ItemEntity item = setAddItemEntity(user, addItemDto);
        itemRepository.save(item);
    }

    public void updateItem(UpdateItemDTO updateItemDto){
        Optional<ItemEntity> item = itemRepository.findById(updateItemDto.getId());
        Calendar currentCalendar = Calendar.getInstance();
        Date currentDate = currentCalendar.getTime();
        item.ifPresent(r->{
            r.setRegEmp(updateItemDto.getRegEmp());
            r.setCompanyName(updateItemDto.getCompanyName());
            r.setCompanyAddress(updateItemDto.getCompanyAddress());
            r.setCompanyDetailAddress(updateItemDto.getCompanyDetailAddress());
            r.setCompanyFullAddress(updateItemDto.getCompanyAddress() + " " + updateItemDto.getCompanyDetailAddress());
            r.setCompanyContact(updateItemDto.getCompanyContact());
            r.setInfoUrl(updateItemDto.getInfoUrl());
            r.setPhoneNumber(updateItemDto.getPhoneNumber());
            r.setServiceTime(updateItemDto.getServiceTime());
            r.setBestMenu(updateItemDto.getBestMenu());
            r.setTalkPeople(updateItemDto.getTalkPeople());
            r.setManagerName(updateItemDto.getManagerName());
            r.setTalkDesc(updateItemDto.getTalkDesc());
            r.setAnyDesc(updateItemDto.getAnyDesc());
            r.setUpdatedAt(currentDate);
            itemRepository.save(r);
        });
    }

    public void deleteItem(DeleteItemDTO deleteItemDto){
        Optional<ItemEntity> item = itemRepository.findById(deleteItemDto.getId());
        item.ifPresent(r->{
            r.setDeleted(1);
            itemRepository.save(r);
        });
    }

    public ItemEntity setAddItemEntity(UserLoginSessionDTO user, AddItemDTO addItemDto){
        ItemEntity addItemEntity = new ItemEntity();

        Calendar currentCalendar = Calendar.getInstance();
        Date currentDate = currentCalendar.getTime();
        
        addItemEntity.setUserId(user.getId());
        addItemEntity.setRegEmp(addItemDto.getRegEmp());
        addItemEntity.setCompanyName(addItemDto.getCompanyName());
        addItemEntity.setCompanyAddress(addItemDto.getCompanyAddress());
        addItemEntity.setCompanyDetailAddress(addItemDto.getCompanyDetailAddress());
        addItemEntity.setCompanyFullAddress(addItemDto.getCompanyAddress() + " " + addItemDto.getCompanyDetailAddress());
        addItemEntity.setCompanyContact(addItemDto.getCompanyContact());
        addItemEntity.setInfoUrl(addItemDto.getInfoUrl());
        addItemEntity.setPhoneNumber(addItemDto.getPhoneNumber());
        addItemEntity.setServiceTime(addItemDto.getServiceTime());
        addItemEntity.setBestMenu(addItemDto.getBestMenu());
        addItemEntity.setTalkTime(currentDate);
        addItemEntity.setTalkPeople(addItemDto.getTalkPeople());
        addItemEntity.setManagerName(addItemDto.getManagerName());
        addItemEntity.setTalkDesc(addItemDto.getTalkDesc());
        addItemEntity.setAnyDesc(addItemDto.getAnyDesc());
        addItemEntity.setCreatedAt(currentDate);
        addItemEntity.setUpdatedAt(currentDate);
        return addItemEntity;
    }

    public List<ItemEntity> getItemsAll(String startDateStr, String memberName, String companyName){
        Date startDate = null;
        Date endDate = null;
        if(startDateStr.equals("none")){
            startDate = null;
            endDate = null;
        }else{
            startDate = new Date(startDateStr);
            Calendar c = Calendar.getInstance();
            c.setTime(startDate);
            c.add(Calendar.DATE, 1);
            c.add(Calendar.SECOND, -1);
            endDate = c.getTime();
        }
        return itemRepository.customFindAll(startDate, endDate, memberName, companyName, 0);
    }

    public List<ItemEntity> getItemsByNumber(int number, String startDateStr, String memberName, String companyName){
        
        int startNum = number * ITEM_LIST_SIZE;
        int endNum = ITEM_LIST_SIZE;
        Date startDate = null;
        Date endDate = null;
        if(startDateStr.equals("none")){
            startDate = null;
            endDate = null;
        }else{
            startDate = new Date(startDateStr);
            Calendar c = Calendar.getInstance();
            c.setTime(startDate);
            c.add(Calendar.DATE, 1);
            c.add(Calendar.SECOND, -1);
            endDate = c.getTime();
        }
        return itemRepository.findItemByListNumber(startNum, endNum, startDate, endDate, memberName, companyName, 0);
    }

    // public int getItemsCount(){
    //     return itemRepository.customFindAll(0).size();
    // }

    public List<ItemEntity> getItemsByUserAndDate(UserLoginSessionDTO user ,Date start){
        Calendar c = Calendar.getInstance();
        c.setTime(start);
        c.add(Calendar.DATE, 1);
        c.add(Calendar.SECOND, -1);
        Date end = c.getTime();
        return itemRepository.findItemByUserAndDate(user.getId() ,start,end, 0);
    }

    public List<ItemEntity> getItemsByDate(Date start){
        Calendar c = Calendar.getInstance();
        c.setTime(start);
        c.add(Calendar.DATE, 1);
        c.add(Calendar.SECOND, -1);
        Date end = c.getTime();
        return itemRepository.findItemByDate(start,end, 0);
    }

    public List<ItemEntity> getItemsBySearch(String address, String name){
        return itemRepository.findItemByAddressAndSearch(address,name,0);
    }
}
