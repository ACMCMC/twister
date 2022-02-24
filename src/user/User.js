class User {
    constructor(name, user, bithdate, email) {
        this.name = name;
        this.user = user;
        this.bithdate = bithdate;
        this.email = email;
        this.friends = [];
    }

    getName() {
        return this.name;
    }

    getUser() {
        return this.user;
    }

    getBithdate() {
        return this.bithdate;
    }

    getEmail() {
        return this.email;
    }

    getFriends() {
        return this.friends;
    }

    addFriend(user) {
        this.friends.push(user);
    }
}

export { User };