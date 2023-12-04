
function send(username, message, key, time) {
  fetch("/send", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      text: message,
      key: key,
      time: time
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}



async function submit() {
	let submission = document.getElementById('submitBox').value 
	const resetStatus = new Promise((resolve, reject) => {
		setTimeout(() => {
			document.getElementById('messageSentStatus').innerText = ""
		}, 1200)
	})

	await send('boykissinator 9000', submission, 'placeholder key', Date.now())
		
	// clears message box
	document.getElementById('submitBox').value = ""
	
	document.getElementById('messageSentStatus').innerText = "Message Sent!"
	resetStatus

}

let messages = ""

function fetchNewMessages() {
	let localUpdate = "skibidi"
	let messages = fetch("/messages", { method: "GET" })
	console.log("new messages fetched")
}


fetchNewMessages()

const updater = setInterval(() => {
	

	setTimeout(() => {
	let lastUpdate = fetch("/recent", {
		method: "GET"
	})

	if ( lastUpdate == localUpdate ) {
	} else { 
		fetchNewMessages()
	}

	let localUpdate = lastUpdate
	}, 10)
}, 50)

let localUpdate
console.log("uifhaesvdlkhzvbfi")

setTimeout(updater, 50)
