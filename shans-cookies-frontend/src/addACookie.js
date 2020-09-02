import React from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';

export default class AddACookie extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            price: "",
            amount: "",
            image: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.imageAddHandler = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    imageAddHandler(event) {
        this.setState({
            image: event.target.files[0]
        })
    }
    handleSubmit(event) {
        console.log(this.state.image)
        const { name, price, amount} = this.state;
        const fd = new FormData();
        fd.append('image', this.state.image)
        axios
            .post(
                "http://localhost:5000/addACookie", fd/*
                {
                    cookieListing: {
                        name: name,
                        price: price,
                        amount: amount,
                        image: fd,
                    }
                }*/
            )
            .then( response => {
                console.log(response)
                
            })
            .catch(error => {
                console.log("add cookie error error", error);
            });
        event.preventDefault();
    }
    render() {
        
        console.log(this.state.image)
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
                                onChange={this.imageAddHandler} 
                            />
                            <input type="submit" value="Submit" />
                        </form>
                    </Typography>
                </div>
            </div>
        )
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