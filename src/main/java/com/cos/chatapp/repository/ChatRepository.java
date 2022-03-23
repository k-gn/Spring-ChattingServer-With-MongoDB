package com.cos.chatapp.repository;

import com.cos.chatapp.entity.Chat;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {

    // Flux 흐름 -> 연결을 끊지 않고 지속적으로 연결하겠다는 의미 => response를 유지하면서 데이터를 계속 흘려보낼 수 있다.
    // 이때 http 프로토콜을 사용하면 지속적인 처리가 안되서 SSE 프로토콜을 사용해야 한다. (응답 연결을 유지시킨다.)
    @Tailable // 커서를 안닫고 계속 유지한다. 이 때 DB에 버퍼 크기를 늘려줘야 한다. (db.runCommand({convertToCapped: 'chat', size: 8192});)
    @Query("{sender: ?0, receiver: ?1}")
    Flux<Chat> msgFindBySender(String sender, String receiver);

    @Tailable
    @Query("{roomNum: ?0}")
    Flux<Chat> msgFindByRoomNum(Integer roomNum);
}
