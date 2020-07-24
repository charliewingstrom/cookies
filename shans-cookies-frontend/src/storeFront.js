import React from 'react';
import cookie from './cookie.jpg';
import Cookie from './cookie.js';
export default 
class StoreFront extends React.Component {
    constructor(props) {
        super(props);
        
        var tmpCookies = [];
        tmpCookies.push(<Cookie name={'Vanilla'} pictureSrc={cookie} price={3} amount={34}/>);
        tmpCookies.push(<Cookie name={'Chocolate'} pictureSrc={cookie} price={5} amount={12}/>);
        this.state = {
            cookies: tmpCookies,
        };
        this.state.cookies.push(<Cookie name={'Strawberry'} pictureSrc={cookie} price={1} amount={37}/>);
        this.addACookie.bind(this);
    }
    addACookie(name, price, amount) {
        this.state.cookies.push(<Cookie name={name} pictureSrc={cookie} price={price} amount={amount}/>);
        this.setState({
            cookies: this.state.cookies
        })
    }
    render() {
        console.log("Here are the cookies  2222 ");
        console.log(this.props.cookies);
        
        return (
            <div>
                <div className={'storeFront'}>
                    {this.state.cookies.map((cookie, index) => <div className={'cookieListing'}
                    key={index}>{cookie}</div>)}
                </div>
                <button onClick={() => this.addACookie('yogurt', 2, 30)}>Add a cookie</button>
            </div>
        )}
}