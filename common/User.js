class User {
    constructor(name, user, birthdate, email) {
        this.name = name;
        this.user = user;
        this.birthdate = birthdate;
        this.email = email;
        this.friends = [];
    }

    getName() {
        return this.name;
    }

    getUser() {
        return this.user;
    }

    getBirthdate() {
        return this.birthdate;
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