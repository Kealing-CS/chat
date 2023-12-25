const socket = io();

function handleClick() {
    let message = document.getElementById("message").value;

    console.log("hi!!!")
    socket.emit("message", message);

    return false;
}

socket.on("message", (data) => {
    console.log(data);
    let p = document.createElement("p");
    p.innerText = data;
    let md = document.getElementById("messages");
    md.appendChild(p);
});