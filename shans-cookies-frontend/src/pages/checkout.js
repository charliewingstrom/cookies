import React from 'react';
import CartDisplay from '../cartDisplayTemplate'
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
            total: this.props.total,
            
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
            this.props.clearCart();
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
        if (this.props.inventory && this.props.cart) {
            // combining my two tables
            var inventory = this.props.inventory
            var cart = this.props.cart
            var displayObjects = []
            for (var cookie in cart) {
                for (var i in inventory) {
                    if (inventory[i].name === cookie) {
                        displayObjects.push({
                            "name": cookie,
                            "imageLocation": inventory[i].imageLocation,
                            "amount": cart[cookie],
                            "price": inventory[i].price
                        })
                    }
                }
            }
            var checkoutDisplay = <div></div>
            if (this.props.cart) {
                checkoutDisplay = (
                    <div className={'checkoutDisplay'}>
                        {
                            displayObjects.map((cookie) => (
                                <CartDisplay
                                    key={cookie.name}
                                    name={cookie.name} 
                                    imageLocation={cookie.imageLocation} 
                                    price={cookie.price} 
                                    amount={cookie.amount}
                                />
                            ))
                        }
                        <h2>Total: ${this.state.total}</h2>
                    </div>
                )
            }
            return (
                <div className={'page'}>
                    <div className={'cartBar'}>
                        <p className={"cartItem"}>Cart:</p>
                        {
                            Object.entries(this.props.cart)
                            .map( ([key, value]) => <p className={"cartItem"} key={key}>{key}: {value}</p> )
                        
                        }
                        <p className={"total"}>Total: ${this.props.total.toFixed(2)}</p>
                        <Button variant="contained" 
                            style={{
                                backgroundColor: "#00ccff",
                                fontSize: 16,
                                color: "white",
                                marginRight: '1em',
                                marginLeft: "1em",
                                height: '3em',
                                marginTop:'0.75em'
                            }}
                            onClick={() => this.props.clearCart()}>Clear Cart
                        </Button>
                    </div>
                    <form onSubmit={this.handleSubmit} className={'checkoutBar'}>
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
                        </div>
                        <div>
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                    <div></div>
                    {checkoutDisplay}
                </div>
            )
        }
        else return <h1>Loading...</h1>;
    }
}