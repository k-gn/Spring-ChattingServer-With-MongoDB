package com.cos.chatapp.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "chat")
public class Chat {

    // MongoDB의 PK 값은 해쉬값 -> 타입이 bson 타입인데 이걸 자바에서 String 으로 받으면 객체가 아니라 해시값만 받아진다.
    @Id
    private String id;

    private String msg;

    private String sender;

    private String receiver;

    private LocalDateTime createdAt;
}
