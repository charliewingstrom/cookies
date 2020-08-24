import Cookies from 'universal-cookie';
var UserInfo = (function() {
    const cookies = new Cookies();

    var userInfoConstruct = function() {
        cookies.set('email', 'some email', {path: '/'});
        cookies.set('cart', [], {path: '/'});
    }
    var getEmail = function() {
        // Or pull this from cookie/localStorage
        return cookies.get('email');
    };
  
    var setEmail = function(inputEmail) {
        cookies.set('email', inputEmail, {path: '/'});
        // Also set this in cookie/localStorage
    };

    var getCart = function() {
        return cookies.get('cart');
    }
    var setCart = function(inputCart) {
        cookies.set('cart', inputCart, {path: '/'});
        console.log("Input Cart: ")
        console.log(cookies.get('cart'))
    }
    return {
        userInfoConstruct: userInfoConstruct,
        getEmail: getEmail,
        setEmail: setEmail,
        getCart: getCart,
        setCart: setCart,
    }
  
  })();
  
export default UserInfo;