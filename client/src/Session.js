import { User } from "./common/User";

class Session {
    constructor() {
        this.user = new User("", "", "", "");
    }

    login(user) {
        this.user = user;
    }

    isConnected() {
        return this.user != null;
    }

    disconnect() {
        this.user = null;
        console.log(this.user);
    }
}

export { Session };