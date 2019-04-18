class Spice {

    constructor ( color ) {
        this._color = color;
        this._domElement = null;
    }

}

//player property initial spice in hands(yellow, yellow, yellow, yellow) the spices they have
//player init method loop through array in first step, initiate spice object pass in the colors array
//store in spice list (player object)
//1.)render, return dom element
//in player class, call spice render 
//add one more parameter called callback in the constructor of the spice 
//in render method of splice, append the spice click handler function defined in the spice(call callback) pass this back