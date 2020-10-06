package com.example.skeleton.model.DTO;

import java.util.List;

import com.example.skeleton.model.entity.ItemEntity;

import lombok.Data;

@Data
public class ItemListDTO {
    private List<ItemEntity> items;
    private int size;
}
