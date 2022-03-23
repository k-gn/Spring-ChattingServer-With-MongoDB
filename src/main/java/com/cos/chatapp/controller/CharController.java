package com.cos.chatapp.controller;

import com.cos.chatapp.entity.Chat;
import com.cos.chatapp.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.awt.*;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class CharController {

    private final ChatRepository chatRepository;

    // 귓속말
    // consumes는 들어오는 데이터 타입을 정의
    // produces는 반환하는 데이터 타입을 정의
    @CrossOrigin // cors 허용
    @GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = MediaType.TEXT_EVENT_STREAM_VALUE) // SSE -> 이때 Return Type = Flux
    public Flux<Chat> getMsg(@PathVariable String sender, @PathVariable String receiver) {
        return chatRepository.msgFindBySender(sender, receiver)
                .subscribeOn(Schedulers.boundedElastic());
    }

    // 채팅방
    @CrossOrigin
    @GetMapping(value = "/chat/roomNum/{roomNum}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> findByRoomNum(@PathVariable Integer roomNum) {
        return chatRepository.msgFindByRoomNum(roomNum)
                .subscribeOn(Schedulers.boundedElastic());
    }

    @CrossOrigin
    @PostMapping("/chat")
    public Mono<Chat> setMsg(@RequestBody Chat chat) { // Mono : 데이터를 한번만 return
        chat.setCreatedAt(LocalDateTime.now());
        return chatRepository.save(chat);
    }
}
