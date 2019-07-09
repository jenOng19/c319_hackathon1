class Spice {

    constructor ( color, callBack ) {
        this._color = color;
        this.callBack= callBack;
        this._domElement = null;
    }

    spiceClickHandler= () => {
        this.callBack(this);
    }

    render(){
        this._domElement = $('<div>')
                            .addClass('spice '+ this._color)
                            .on({
                                'click': this.spiceClickHandler
                            })   
        return this._domElement;
    }
}


