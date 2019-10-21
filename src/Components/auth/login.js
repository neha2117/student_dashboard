import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                email: "",
                password: ""
            }
        }
    }

    goToDashboard = ()  =>{
        this.props.history.push({
            pathname: `/dashboard`
        })
    }

    render() {
        return(
            <div>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" value={this.state.userData.email} id="email" />
                <label>Password</label>
                <input type="password" value={this.state.userData.password} id="password"/>
                <button onClick={this.goToDashboard}>Login</button>

            </div>
        )
    }
}

export default Login