
function send(username, message, key) {
  fetch("/send", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      text: message,
      key: key
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}



async function submit() {
	let submission = document.getElementById('submitBox').value 
	
	await send('boykissinator 9000', submission, 'placeholder key')
	alert(`Message (${submission}) sent!`)
}


//recieving messages
const socket = new Websocket('wss://10.44.151.11:4322')

socket.onopen = function(e) {
	alert('Connection to server established.')
}

socket.onmessage = function(event) {
	console.log(event)
	console.log("---------")
	console.log(event.data)
}
