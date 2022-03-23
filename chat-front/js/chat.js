const eventSource = new EventSource("http://localhost:8080/sender/ssar/receiver/cos");
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    initMessage(data);
}

document.querySelector("#chat-send").addEventListener("click", () => {

    addMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {

    if(e.keyCode === 13) {
        addMessage();
    }
});

async function addMessage() { // async : 비동기 함수 처리
    let chatBox = document.querySelector("#chat-box");
    let msgBox = document.querySelector("#chat-outgoing-msg");
    
    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    let chat = {
        sender : "ssar",
        receiver : "cos",
        msg: msgBox.value
    };

    let response = await fetch("http://localhost:8080/chat", { // 응답 대기를 위한 await
        method: "post", 
        body: JSON.stringify(chat),
        headers: {
            "Content-Type":"application/json; charset=utf-8"
        }
    });

    let parseResponse = await response.json();
    chatOutgoingBox.innerHTML = getSendMsgBox(msgBox.value, getNowDate());
    chatBox.append(chatOutgoingBox);
    msgBox.value = "";
} 

function initMessage(historyMsg) {
    let chatBox = document.querySelector("#chat-box");
    let msgBox = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";
    chatOutgoingBox.innerHTML = getSendMsgBox(historyMsg.msg, getParseNowDate(historyMsg.createdAt));
    chatBox.append(chatOutgoingBox);
    msgBox.value = "";
} 


function getSendMsgBox(msg, time) {
    return `<div class="sent_msg">
                <p>${msg}</p>
                <span class="time_date"> ${time} </span>
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