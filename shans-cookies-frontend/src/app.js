import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SvgIcon from '@material-ui/core/SvgIcon';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Router,
    Switch,
    Route
  } from "react-router-dom";
import { createBrowserHistory } from "history";

import StoreFront from './storeFront';
import About from './about';
import Error from './error';
import AddACookie from './addACookie';
import Checkout from './checkout';
import UserInfo from './userInfo';
import ViewOrders from './viewOrders';
const drawerWidth = 240;

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
	display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
	background: '#00ccff',
	color: '#000000'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});
const customHistory = createBrowserHistory();

class App extends React.Component {
  	constructor() {
    	super();
    	this.state = {
			  cookiesJSON: null,
			  ordersJSON: null,
			  cart: {},
			  total: 0
		}
		//UserInfo.userInfoConstruct();
		this.clearCart = this.clearCart.bind(this)
  	};
	componentDidMount() {
		this.getCookiesFromBackend()
			.then(res => this.setState({cookiesJSON: res.cookies }))
			.catch(err => console.log(err));

		this.getOrdersFromBackend()
			.then(res => this.setState({ordersJSON: res.orders }))
			.catch(err => console.log(err));
	}

	getCookiesFromBackend = async () => {
		const response = await fetch('/cookies_backend');
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	}

	getOrdersFromBackend = async () => {
		const response = await fetch('/get_orders');
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	}


	// adds the amount of cookies to the cart state
	orderMe(amount, name, price) {
		var tmpCart = this.state.cart;
		if (tmpCart[name]) {
			tmpCart[name] += amount;
		}
		else {
			tmpCart[name] = amount;
		}
		UserInfo.setCart(tmpCart);
		var currTotal = this.state.total
		this.setState({
			cart: tmpCart,
			total: currTotal + price*amount
		})
		
	}

	clearCart() {
		this.setState({
			cart: {},
			total: 0
		})
	}
	
    render() {
	  const { classes } = this.props;
	  const HomePage = () => (
		    <Fragment>
			    <StoreFront 
					cookies={ this.state.cookiesJSON }
					orderMe ={(amount, name, price) => this.orderMe(amount, name, price) }
					cart = {this.state.cart}
					total = {this.state.total}
					clearCart = {this.clearCart}
				/>
		  </Fragment>
	  )
	  const AboutPage = () => (
		  <Fragment>
			  <About/>
		  </Fragment>
	  )
	  const OrdersPage = () => (
		  <Fragment>
			  <ViewOrders
			  	orders = {this.state.ordersJSON}
			  />
		  </Fragment>
	  )
	  const ErrorPage = () => (
		<Fragment>
			<Error/>
		</Fragment>
	)
	  const AddACookiePage = () => (
		  <Fragment>
			  <AddACookie/>
		  </Fragment>
	  )
	  const CheckoutPage = () => (
		  <Fragment>
			  <Checkout
			  	cart={this.state.cart}
			  />
		  </Fragment>
	  )
      return (
        <div className={classes.root}> 
            <Router history={customHistory}>
              	<CssBaseline />
              	<AppBar position="fixed" className={classes.appBar}>
                  	<Toolbar>
                      	<Typography variant="h6">Shan's Cookies</Typography>
						<a href="/checkout" className={"checkout"}><Typography variant="h6">Checkout</Typography></a>
                  	</Toolbar>
					  
              	</AppBar>
				<Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
					<Toolbar/>
					<div className={classes.drawerContainer}>
						<List>
						<a href="/">
							<ListItem>
								<ListItemIcon><HomeIcon/></ListItemIcon>
								<ListItemText primary={"Home"}/>
							</ListItem>
						</a>
						<a href="/about">
							<ListItem>
								<ListItemIcon></ListItemIcon>
								<ListItemText primary={"About"}/>
							</ListItem>
						</a>
						<a href="/addACookie">
							<ListItem>
								<ListItemIcon></ListItemIcon>
								<ListItemText primary={"Add a Cookie"}/>
							</ListItem>
						</a>
						<a href="/orders">
							<ListItem>
								<ListItemIcon></ListItemIcon>
								<ListItemText primary={"View Orders"}/>
							</ListItem>
						</a>
						</List>
					</div>
				</Drawer>
				<Switch>
					<Route path="/about" component={AboutPage}/>
					<Route path="/addACookie" component={AddACookiePage}/>
					<Route path="/checkout" component={CheckoutPage}/>
					<Route path="/error" component={ErrorPage}/>
					<Route path="/orders" component={OrdersPage}/>
					<Route path="/" exact component={HomePage}/>
				</Switch>
			</Router>
        </div>
        );
    }
  }
export default withStyles(useStyles, {withTheme: true })(App);
