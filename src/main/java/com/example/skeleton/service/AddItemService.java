package com.example.skeleton.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.skeleton.model.DTO.AddItemDTO;
import com.example.skeleton.model.DTO.DeleteItemDTO;
import com.example.skeleton.model.DTO.UpdateItemDTO;
import com.example.skeleton.model.entity.ItemEntity;
import com.example.skeleton.model.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddItemService {
    @Autowired
    ItemRepository itemRepository;

    private int ITEM_LIST_SIZE = 10;

    public void addItem(AddItemDTO addItemDto){
        ItemEntity item = setAddItemEntity(addItemDto);
        itemRepository.save(item);
    }

    public void updateItem(UpdateItemDTO updateItemDto){
        Optional<ItemEntity> item = itemRepository.findById(updateItemDto.getId());
        Calendar currentCalendar = Calendar.getInstance();
        Date currentDate = currentCalendar.getTime();
        item.ifPresent(r->{
            r.setCompanyName(updateItemDto.getCompanyName());
            r.setCompanyAddress(updateItemDto.getCompanyAddress());
            r.setCompanyDetailAddress(updateItemDto.getCompanyDetailAddress());
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

    public ItemEntity setAddItemEntity(AddItemDTO addItemDto){
        ItemEntity addItemEntity = new ItemEntity();

        Calendar currentCalendar = Calendar.getInstance();
        Date currentDate = currentCalendar.getTime();
        
        addItemEntity.setCompanyName(addItemDto.getCompanyName());
        addItemEntity.setCompanyAddress(addItemDto.getCompanyAddress());
        addItemEntity.setCompanyDetailAddress(addItemDto.getCompanyDetailAddress());
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

    public List<ItemEntity> getItemsAll(){
        return itemRepository.customFindAll(0);
    }

    public List<ItemEntity> getItemsByNumber(int number){
        int startNum = number * ITEM_LIST_SIZE;
        int endNum = ITEM_LIST_SIZE;
        return itemRepository.findItemByListNumber(startNum, endNum, 0);
    }

    public int getItemsCount(){
        return itemRepository.customFindAll(0).size();
    }

    public List<ItemEntity> getItemsByDate(Date start){
        Calendar c = Calendar.getInstance();
        c.setTime(start);
        c.add(Calendar.DATE, 1);
        Date end = c.getTime();
        return itemRepository.findItemByDate(start,end, 0);
    }

    public List<ItemEntity> getItemsBySearch(String address, String name){
        return itemRepository.findItemByAddressAndSearch(address,name,0);
    }
}
