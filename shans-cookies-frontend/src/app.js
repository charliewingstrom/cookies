import React from 'react';
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
    Link,
    Switch,
    Route
  } from "react-router-dom";
import { createBrowserHistory } from "history";

import StoreFront from './storeFront';
import About from './about';

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
			  data: null,
			  cookiesJSON: null
    	}
  	};
	componentDidMount() {
		this.callBackEndAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));

		this.getCookiesFromBackend()
			.then(res => this.setState({cookiesJSON: res.cookies }))
			.catch(err => console.log(err));
	}

	callBackEndAPI = async () => {
		const response = await fetch('/express_backend');
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	};
	getCookiesFromBackend = async () => {
		const response = await fetch('/cookies_backend');
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	}
	orderMe(amount, name) {
		console.log(amount + " of " + name + " cookies ordered")
	}
    render() {
	  const { classes } = this.props;
	  /*
	  if (this.state.cookiesJSON)
	  {
		var cookiesList = this.state.cookiesJSON;
		for (var key in cookiesList) {
			console.log("here's a cookie");
			if (cookiesList.hasOwnProperty(key)) {
			  console.log(key);
			  console.log(cookiesList[key]);
			}
			}
	  }
	  */
      return (
        <div className={classes.root}>
			
            <Router history={customHistory}>
              	<CssBaseline />
              	<AppBar position="fixed" className={classes.appBar}>
                  	<Toolbar>
                      	<Typography variant="h6" noWrap>Shan's Cookies</Typography>
						  <p>{this.state.data}</p>
                  	</Toolbar>
              	</AppBar>
				<Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
					<Toolbar/>
					<div className={classes.drawerContainer}>
						<List>
						<Link to="/">
							<ListItem>
								<ListItemIcon><HomeIcon/></ListItemIcon>
								<ListItemText primary={"Home"}/>
							</ListItem>
						</Link>
						<Link to="/about">
							<ListItem>
								<ListItemIcon></ListItemIcon>
								<ListItemText primary={"About"}/>
							</ListItem>
						</Link>
						</List>
					</div>
				</Drawer>
				<Switch>
					<Route path="/about">
						<About/>
					</Route>
					<Route path="/">
						<StoreFront 
							cookies={ this.state.cookiesJSON }
							orderMe ={(amount, name) => this.orderMe(amount, name) }
						/>
					</Route>
				</Switch>
			</Router>
        </div>
        );
    }
  }
export default withStyles(useStyles, {withTheme: true })(App);
