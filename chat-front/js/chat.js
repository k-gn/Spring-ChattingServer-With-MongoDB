document.querySelector("#chat-send").addEventListener("click", () => {
    
    alert("클릭됨");
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {

    if(e.keyCode === 13) {
        alert("엔터");
    }
});