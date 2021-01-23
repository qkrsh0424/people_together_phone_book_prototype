package com.example.skeleton.model.repository;

import java.util.List;
import java.util.Optional;

import com.example.skeleton.model.entity.UserEntity;
import com.example.skeleton.model.entity.UserJItemProj;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserEntity, String>{
    public UserEntity findByUsername(String username);

    @Query(value = "SELECT * FROM user WHERE username=:username AND deleted=:isDeleted", nativeQuery=true)
    public Optional<UserEntity> findByUsername_Custom(String username, int isDeleted);

    @Query("SELECT u AS user, COUNT(i.id) AS itemCount FROM UserEntity u\n"
            + "LEFT OUTER JOIN ItemEntity i ON u.id=i.userId AND i.deleted=0\n"
            + "WHERE u.deleted=0 AND u.role=:role\n"
            + "GROUP BY u.id"
    )
    List<UserJItemProj> selectAllMembersAndItem(String role);
}
