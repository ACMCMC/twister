class Message {
    constructor(text, user, date) {
        this.text = text;
        this.user = user;
        this.date = date;
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
}

export { Message };