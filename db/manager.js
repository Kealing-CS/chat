const Database = require("easy-json-database")

module.exports = class Manager {
    login(username, password) {
        const db = new Database("users.json")

        if (!db.has(username)) {
            return false
        }

        const user = db.get(username)

        if (user.password === password) {
            return true
        }

        return false
    }

    register(username, password) {
        const db = new Database("users.json")

        if (db.has(username)) {
            return false
        }

        db.set(username, {
            password: password
        })

        return true
    }

    getMessages() {
        const db = new Database("db/messages.json")

        return db.all()
    }

    addMessage(message) {
        const db = new Database("db/messages.json") 

        db.push("messages", {user: message})
    }
}