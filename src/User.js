import React from 'react';
import './App.css';
import './Login.css';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {UserName: "", UserType: "", Email: "", FirstName: "", LastName: "", Password: "", GroupID: ""}
    }

    updateUser(username, userType, email, firstName, lastName, password, groupId) {
        this.setState({
            UserName: username,
            UserType: userType,
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            Password: password,
            GroupID: groupId});
    }
}

export default User;