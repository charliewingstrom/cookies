import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { password } = this.state;

    axios
      .post(
        "http://localhost:5000/sessions",
        {
          user: {
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.props.setLogin();
          this.props.refresh();
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    if (this.props.loggedIn) {
        return (
            <div className={"page aboutPage"}>
                <h1>You are Logged in</h1>    
            </div>
        )
    }
    else {
        return (
          <div className={"page aboutPage"}>
              <form onSubmit={this.handleSubmit}>
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
              />

              <button type="submit">Login</button>
              </form>
          </div>
        );
    }
  }
}