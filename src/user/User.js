class User {
    constructor(name, user, bithdate, email) {
        super();
        this.name = name;
        this.user = user;
        this.bithdate = bithdate;
        this.email = email;
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
}