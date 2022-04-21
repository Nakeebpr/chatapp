const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector('.container');


const append=(message,position)=>{
    const messageEle = document.createElement("div");
    messageEle.innerText = message;
    messageEle.classList.add("message");
    messageEle.classList.add(position);
    messageContainer.append(messageEle)
}

const name = prompt("Enter you name to join");

socket.emit("new-user-joined", name );

socket.on('user-joined',name=>{
    append(`${name} has joined the chat`,'right')
})


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageInput.value;

    if(message==""){
        return
    }

    append(`You:
    ${message}`,"right");

    socket.emit("send",message)

    messageInput.value= ""

})

socket.on("receive",data=>{
    if(data.message==""){
        return
    }
    append(`${data.name}:
    ${data.message}`,"left")
})

socket.on("left",name=>{
    append(`${name} has left the chat`,"right")
})
