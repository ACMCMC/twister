class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'feed',
            loggedIn: false
        };
        this.setConnected = this.setConnected.bind(this); // Bind the method to the class
        this.setLogout = this.setConnected.bind(this); // Bind the method to the class
    }

    setConnected() {

    }

    setLogout() {

    }

    render() {
        return ( <div> </div> );
    }
}