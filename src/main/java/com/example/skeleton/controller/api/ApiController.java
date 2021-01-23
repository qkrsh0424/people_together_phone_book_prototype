package com.example.skeleton.controller.api;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import com.example.skeleton.model.DTO.AddItemDTO;
import com.example.skeleton.model.DTO.DeleteItemDTO;
import com.example.skeleton.model.DTO.ItemListDTO;
import com.example.skeleton.model.DTO.UpdateItemDTO;
import com.example.skeleton.model.DTO.UserLoginSessionDTO;
import com.example.skeleton.model.VO.UserInfoVO;
import com.example.skeleton.model.entity.ItemEntity;
import com.example.skeleton.service.AddItemService;
import com.example.skeleton.service.UserAuthService;
import com.example.skeleton.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class ApiController {
    @Autowired
    AddItemService addItemService;

    @Autowired
    UserService userService;
    
    @Autowired
    UserAuthService userAuthService;
    @PostMapping(value = "/additem")
    public String addItem(HttpServletRequest request, @RequestBody AddItemDTO item){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user == null){
            return "{\"message\":\"USER_INVALID\"}";
        }
        addItemService.addItem(user,item);
        return "{\"message\":\"success\"}";
    }

    // @GetMapping(value = "/get/list/all")
    // public List<ItemEntity> getAllItems(){
    //     List<ItemEntity> items = addItemService.getItemsAll();
    //     return items;
    // }

    @GetMapping(value = "/get/list/bynum")
    public ItemListDTO getAllItemsByNum(@RequestParam("number") int number, @RequestParam(name = "date") String startDateStr, @RequestParam(name = "name") String memberName){
        List<ItemEntity> itemList = addItemService.getItemsByNumber(number, startDateStr, memberName);
        int itemSize = addItemService.getItemsAll(startDateStr, memberName).size();
        ItemListDTO items = new ItemListDTO();
        items.setItems(itemList);
        items.setSize(itemSize);
        return items;
    }

    // @GetMapping(value = "/get/list/size")
    // public int getAllItemsSize(){
    //     return getAllItems().size();
    // }

    @GetMapping(value = "/get/list/bydate")
    public ItemListDTO getItemsByDate(@RequestParam("date") Date startDate){
        
        List<ItemEntity> itemList = addItemService.getItemsByDate(startDate);
        int itemSize = itemList.size();
        ItemListDTO items = new ItemListDTO();
        items.setItems(itemList);
        items.setSize(itemSize);
        return items;
    }

    // /api/get/list/addbytoday
    @GetMapping(value = "/get/list/addbytoday")
    public List<ItemEntity> getItemsAddByToday(HttpServletRequest request,@RequestParam("date") Date startDate){
        UserLoginSessionDTO user = userService.getUserInfoDTO(request);
        if(user == null){
            return new ArrayList<>();
        }
        List<ItemEntity> items = addItemService.getItemsByUserAndDate(user, startDate);
        return items;
    }

    @GetMapping(value = "/get/list/search")
    public List<ItemEntity> getItemsBySearch(@RequestParam("searchAddress") String searchAddress, @RequestParam("searchCompanyName") String searchCompanyName){
        List<ItemEntity> items = new ArrayList();
        if(searchAddress.equals("") && searchCompanyName.equals("")){
            return items;
        }
        items = addItemService.getItemsBySearch(searchAddress, searchCompanyName);
        return items;
    }

    @PostMapping(value = "/update/item/one")
    public String updateItemOne(@RequestBody UpdateItemDTO item){
        addItemService.updateItem(item);
        return "{\"message\":\"success\"}";
    }

    @PostMapping(value = "/delete/item/one")
    public String deleteItemOne(@RequestBody DeleteItemDTO deleteItemDto){
        addItemService.deleteItem(deleteItemDto);
        return "{\"message\":\"success\"}";
    }
}
