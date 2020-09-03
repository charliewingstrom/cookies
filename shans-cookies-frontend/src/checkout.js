import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
export default
class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            cart: this.props.cart,
            total: this.props.total
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { name, email, phoneNumber, cart, total } = this.state;

    axios
      .post(
        "http://localhost:5000/checkout",
        {
          order: {
            name: name,
            email: email,
            phoneNumber: phoneNumber, 
            cart: cart,
            total: total
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response)
        if (response.status === 200) {
            console.log("nice.. Order went through")
        }
        else if (response.status === 203) {
            console.log("The cart was empty")
        }
        else if (response.status === 204) {
            console.log("You tried ordering too many of one type")
        }
      })
      .catch(error => {
        console.log("Checkout error", error);
      });
    event.preventDefault();
  }
    render() {
        return (
            <div>
                <div className={'cartStorefront'}>
                {
                    Object.entries(this.props.cart)
                    .map( ([key, value]) => <p className={"cartItem"} key={key}>{key}: {value}</p> )
                
                }
                <p className={"total"}>Total: ${this.props.total.toFixed(2)}</p>
                <Button variant="outlined" 
                    style={{
                        backgroundColor: "#00ccff",
                        fontSize: 16,
                        color: "white",
                        marginRight: 0,
                        marginLeft: "1em",
                    }}
                    onClick={() => this.props.clearCart()}>Clear Cart
                </Button>
                </div>
                <form id="myForm" onSubmit={this.handleSubmit} className={'checkoutBar'}>
                    <div className={'cookieListing'}>
                        <TextField
                            type="Text"
                            size="medium"
                            variant="filled"
                            name="name"
                            label="Name"
                            required={true}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "0.5em",
                            }}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className={'cookieListing'}>
                        <TextField
                            type="Text"
                            size="medium"
                            variant="filled"
                            name="email"
                            label="Email"
                            required={true}
                            style={{
                                backgroundColor: "white",
                                borderRadius: "0.5em",
                            }}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className={'cookieListing'}>
                        <TextField
                            type="Text"
                            size="medium"
                            variant="filled"
                            name="phoneNumber"
                            label="Phone Number"
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "0.5em",
                            }}
                            onChange={this.handleChange}
                        />
                    </div >
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}
/*
function checkout(props) {
    return (
        <div>
            <div className={'cartStorefront'}>
            {
                Object.entries(props.cart)
                .map( ([key, value]) => <p className={"cartItem"}>{key}: {value}</p> )
              
            }
            <p className={"total"}>Total: ${props.total.toFixed(2)}</p>
            <Button variant="outlined" 
                style={{
                    backgroundColor: "#00ccff",
                    fontSize: 16,
                    color: "white",
                    marginRight: 0,
                    marginLeft: "1em",
                }}
                onClick={() => props.clearCart()}>Clear Cart
            </Button>
            </div>
            <form id="myForm" method="POST" className={'checkoutBar'}>
                <div className={'cookieListing'}>
                    <TextField
                        type="Text"
                        size="medium"
                        variant="filled"
                        label="Name"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "0.5em",
                        }}
                    />
                </div>
                <div className={'cookieListing'}>
                    <p>Email: </p>
                    <input name="email" required/>
                </div>
                <div className={'cookieListing'}>
                    <p>Phone Number: </p>
                    <input name="phoneNumber"/>
                </div >
                    <input type="hidden" name="total" value={props.total} readOnly={true}/>
                <div>
                    <input name="cart" type="hidden" value={Object.entries(props.cart)} readOnly={true}/>
                    <input type="submit" value="Submit" onSubmit={() => props.clearCart()}/>
                </div>
            </form>
        </div>
    )
}*/