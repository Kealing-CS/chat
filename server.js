const express = require('express');
const cors = require("cors");
const path = require("path")
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const date = require('date-and-time');

const app = express();
const port = 4321;

fs.writeFile('./assets/messages.txt', "", { flag: 'wx' }, function (err) {
    if (err) { console.log("messages.txt already exists") } else { console.log("messages.txt created") };
});

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(express.json())

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.get("/changelog", function(req, res) {
    res.sendFile(path.join(__dirname, "/changelog.txt"))
})

app.get("/static/:name", function(req, res) {
    const name = req.params["name"]
    res.sendFile(path.join(__dirname, `/static/${name}`))
});

app.get("/assets/:assetName", function(req, res) {
    res.sendFile(path.join(__dirname, `/assets/${req.params["assetName"]}`))
})

app.get("/messages", function(req, res) {
	res.sendFile(path.join(__dirname, 'assets/messages.txt'))
});

app.post("/send", function(req, res) {
	console.log(req.body)

	let time = sanitizeHtml(req.body.time, {disallowedTagsMode: 'escape'})
	let username = sanitizeHtml(req.body.username, {disallowedTagsMode: 'escape'})
	let message = sanitizeHtml(req.body.text, {disallowedTagsMode: 'escape'})
	console.log(time)
	console.log(username)
	console.log(message)
	console.log("")

	let data = fs.readFileSync(path.join(__dirname, '/assets/messages.txt'))
	let fd = fs.openSync(path.join(__dirname, '/assets/messages.txt'), 'w+')
	let insert = Buffer.from(`{username: '${username}' time: '${time}' message: '${message}'}\n`)
	fs.writeSync(fd, insert, 0, insert.length, 0)
	fs.writeSync(fd, data, 0, data.length, insert.length)
	fs.close(fd, (err) => {
		if (err) throw err;
	});

	console.log('message written to text file')
})

// Working fetch
// fetch("/send", {
//   method: "POST",
//   body: JSON.stringify({
//     username: "doug",
//     text: "Ligma"
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8"
//   }
// });

app.listen(port);
console.log('Server started at http://localhost:' + port);
