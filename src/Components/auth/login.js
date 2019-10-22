import React from "react";
import "./login.css";
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

    getUserInfo = (e) => {
        var input = e.target.value
        if (input && input.length !== 0) {
            var obj = Object.assign({}, this.state.userData)
            var field = e.target.id
            obj[field] = input
            this.setState({
                userData: obj
            }, () => {
                console.log("user", this.state.userData)
            })
        }
    }

    goToDashboard = ()  => {
        if(this.state.userData && this.state.userData.email && this.state.userData.email.length !== 0 && this.state.userData.password && this.state.userData.password.length !== 0) {
            this.props.history.push({
                pathname: `/dashboard`
            })
        }
    }

    render() {
        return(
            <div className="student-auth-main-container">
                <div className="student-auth-nav row">
                    Student Dashboard
                </div>
                <div className="row student-auth-container">
                    <div className="col-sm-8 col-md-6 col-lg-6 student-auth-container-wrapper">
                    <label>Email</label>
                <input type="email" placeholder="Enter your email" id="email" onChange={this.getUserInfo}/>
                <label>Password</label>
                <input type="password" id="password" onChange={this.getUserInfo}/>
                <button onClick={this.goToDashboard} className="login-btn">Login</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Login