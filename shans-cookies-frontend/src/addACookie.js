import React from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';

export default class AddACookie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: "",
            amount: "",
            image: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { name, price, amount, image } = this.state;
        console.log(typeof this.state.image)
        axios
            .post(
                "http://localhost:5000/addACookie",
                {
                    cookieListing: {
                        name: name,
                        price: price,
                        amount: amount,
                        image: image,
                    }
                }
            )
            .then( response => {
                console.log(response)
                
            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }
    render() {
        if (this.props.loggedIn) {
            return (
                <div className={'page'}>
                    <div className={'cookieListing'}>
                        <Typography variant="h6">
                            Here is where you can add a cookie to the store.
                        
                            <form onSubmit={this.handleSubmit}>
                                <Typography variant="h6">
                                    Name of Cookie
                                </Typography>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Typography variant="h6">
                                    Price per Cookie
                                </Typography>
                                <input 
                                    type="text" 
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    required 
                                />
                                <Typography variant="h6">
                                    Amount to sell
                                </Typography>
                                <input 
                                    type="text" 
                                    name="amount" 
                                    value={this.state.amount}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Typography variant="h6">
                                    Upload Image
                                </Typography>
                                <input 
                                    type="file" 
                                    name="image"
                                    value={this.state.image}
                                    onChange={this.handleChange} 
                                />
                                <input type="submit" value="Submit" />
                            </form>
                        </Typography>
                    </div>
                </div>
            )
        }
        else return(null);
    }
}
/*
export default function addACookie(props) {
    if (props.loggedIn) {
        return (
            <div className={'page'}>
                <div className={'cookieListing'}>
                    <Typography variant="h6">
                        Here is where you can add a cookie to the store.
                    
                        <form method="POST">
                            <Typography variant="h6">
                                Name of Cookie
                            </Typography>
                            <input type="text" name="cookieName" />
                            <Typography variant="h6">
                                Price per Cookie
                            </Typography>
                            <input type="text" name="price" />
                            <Typography variant="h6">
                                Amount to sell
                            </Typography>
                            <input type="text" name="amount" />
                            <Typography variant="h6">
                                Upload Image
                            </Typography>
                            <input type="file" name="cookieImage" />
                            <input type="submit" value="Submit" />
                        </form>
                    </Typography>
                </div>
            </div>
        )
    }
    else return(null);
}*/