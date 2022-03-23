document.querySelector("#chat-send").addEventListener("click", () => {

    let chatBox = document.querySelector("#chat-box");
    let msgBox = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";
    chatOutgoingBox.innerHTML = getMsg(msgBox.value);
    chatBox.append(chatOutgoingBox);
    msgBox.value = "";
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {

    if(e.keyCode === 13) {
        let chatBox = document.querySelector("#chat-box");
        let msgBox = document.querySelector("#chat-outgoing-msg");

        let chatOutgoingBox = document.createElement("div");
        chatOutgoingBox.className = "outgoing_msg";
        chatOutgoingBox.innerHTML = getMsg(msgBox.value);
        chatBox.append(chatOutgoingBox);
        msgBox.value = "";
    }
});

function getMsg(msg) {
    return `<div class="sent_msg">
                <p>${msg}</p>
                <span class="time_date"> 11:18 | Today</span>
            </div>`;
}