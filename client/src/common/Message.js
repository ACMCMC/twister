class Message {
    constructor(text, user, date, id, likes) {
        this.text = text;
        this.user = user;
        this.date = date;
        this.id = id;
        this.likes = likes;
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

    getLikes() {
        return this.likes;
    }
}

export { Message };