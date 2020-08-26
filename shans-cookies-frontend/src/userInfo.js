
var UserInfo = (function() {

    var getEmail = function() {
        sessionStorage.getItem("email")
    };
  
    var setEmail = function(inputEmail) {
        // Also set this in cookie/localStorage
        sessionStorage.setItem("email", inputEmail)
    };

    var getCart = function() {
        return JSON.parse(sessionStorage.getItem("cart"))
    }
    var setCart = function(inputCart) {
        sessionStorage.setItem("cart", JSON.stringify(inputCart))
    }
    var getTotal = function() {
        return Number(sessionStorage.getItem("total"))
    }
    var setTotal = function(total) {
        sessionStorage.setItem("total", total)
    }
    return {
        getEmail: getEmail,
        setEmail: setEmail,
        getCart: getCart,
        setCart: setCart,
        getTotal: getTotal,
        setTotal: setTotal,
    }
  
  })();
  
export default UserInfo;