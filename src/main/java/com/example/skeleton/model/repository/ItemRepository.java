package com.example.skeleton.model.repository;

import java.util.Date;
import java.util.List;

import com.example.skeleton.model.entity.ItemEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<ItemEntity, Long>{
    List<ItemEntity> findByCompanyNameAndCompanyAddress(String companyName,String companyAddress);

    @Query(value = "SELECT * FROM items WHERE deleted=:deleted ORDER BY created_at DESC", nativeQuery=true)
    List<ItemEntity> customFindAll(int deleted);

    @Query(value = "SELECT * FROM items WHERE deleted=:deleted AND company_full_address LIKE CONCAT('%',:aa,'%') ORDER BY created_at DESC", nativeQuery=true)
    List<ItemEntity> findByCompa(String aa, int deleted);

    @Query(value = "SELECT * FROM items WHERE deleted=:deleted AND talk_time BETWEEN :start AND :end ORDER BY created_at DESC", nativeQuery=true)
    List<ItemEntity> findItemByDate(Date start, Date end, int deleted);

    @Query(value = "SELECT * FROM items WHERE deleted=:deleted AND company_full_address LIKE CONCAT('%',:address,'%') AND company_name LIKE CONCAT('%',:name,'%') ORDER BY created_at DESC", nativeQuery=true)
    List<ItemEntity> findItemByAddressAndSearch(String address, String name, int deleted);

    @Query(value = "SELECT * FROM items WHERE deleted=:deleted ORDER BY created_at DESC LIMIT :startNum, :endNum", nativeQuery=true)
    List<ItemEntity> findItemByListNumber(int startNum, int endNum, int deleted);
}
