const manager = require("./db/manager.js");

module.exports = function(app, io) {

    app.get('/api', (req, res) => {
        res.send(true);
    });

    io.on("connection", socket => {
        console.log("New client connected");
        console.log(socket.id);

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });

        socket.on("message", (data) => {
            let Manager = new manager();
            Manager.addMessage(data);
            io.emit("message", data);
        });
    });
}