class Message {
    constructor(text, user, date, id) {
        this.text = text;
        this.user = user;
        this.date = date;
        this.id = id;
    }

    getText() {
        return this.text;
    }

    getUser() {
        return this.user;
    }

    getDate() {
        return this.date;
    }

    getId() {
        return this.id;
    }
}

export { Message };