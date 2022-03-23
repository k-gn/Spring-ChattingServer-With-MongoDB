let username = prompt("아이디를 입력하세요.");
let roomNum = prompt("채팅방 번호를 입력하세요.");

const eventSource = new EventSource(`http://localhost:8080/chat/roomNum/${roomNum}`);
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if(data.sender === username) {
        initMyMessage(data);
    }else {
        initYoursMessage(data);
    }
}

// const eventSource = new EventSource("http://localhost:8080/sender/ssar/receiver/cos");
// eventSource.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     console.log(data);
//     initMessage(data);
// }

document.querySelector("#chat-send").addEventListener("click", () => {

    addMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {

    if(e.keyCode === 13) {
        addMessage();
    }
});

// async function addMessage() { // async : 비동기 함수 처리
function addMessage() {
    // let chatBox = document.querySelector("#chat-box");
    let msgBox = document.querySelector("#chat-outgoing-msg");
    // let chatOutgoingBox = document.createElement("div");
    // chatOutgoingBox.className = "outgoing_msg";

    let chat = {
        sender : username,
        // receiver : "cos",
        roomNum : roomNum,
        msg: msgBox.value
    };

    // let response = await fetch("http://localhost:8080/chat", { // 응답 대기를 위한 await
    //     method: "post", 
    //     body: JSON.stringify(chat),
    //     headers: {
    //         "Content-Type":"application/json; charset=utf-8"
    //     }
    // });
    fetch("http://localhost:8080/chat", {
        method: "post", 
        body: JSON.stringify(chat),
        headers: {
            "Content-Type":"application/json; charset=utf-8"
        }
    });

    // let parseResponse = await response.json();
    // chatOutgoingBox.innerHTML = getSendMsgBox(msgBox.value, getNowDate());
    // chatBox.append(chatOutgoingBox);
    msgBox.value = "";
} 

function initMyMessage(data) {
    let chatBox = document.querySelector("#chat-box");
    // let msgBox = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";
    chatOutgoingBox.innerHTML = getSendMsgBox(data);
    chatBox.append(chatOutgoingBox);
    // msgBox.value = "";
} 

function initYoursMessage(data) {
    let chatBox = document.querySelector("#chat-box");

    let chatIncommingBox = document.createElement("div");
    chatIncommingBox.className = "received_msg";
    chatIncommingBox.innerHTML = getReceiveMsgBox(data);
    chatBox.append(chatIncommingBox);
} 

function getReceiveMsgBox(data) {
    let date = getParseNowDate(data.createdAt);
    return `<div class="received_withd_msg">
                <p>${data.msg}</p>
                <span class="time_date"> ${date} / ${data.sender} </span>
            </div>`;
}

function getSendMsgBox(data) {
    let date = getParseNowDate(data.createdAt);
    return `<div class="sent_msg">
                <p>${data.msg}</p>
                <span class="time_date"> ${date} / ${data.sender} </span>
            </div>`;
}

function getNowDate() {
    let date = new Date();
    let now = date.getHours() + ":" + date.getMinutes() + " | " + (date.getMonth() + 1) + "/" + date.getDate();
    return now;
}

function getParseNowDate(dateString) {
    let date = new Date(Date.parse(dateString));
    let now = date.getHours() + ":" + date.getMinutes() + " | " + (date.getMonth() + 1) + "/" + date.getDate();
    return now;
}