class Spice {

    constructor ( color, callBack ) {
        this._color = color;
        this.callBack=this.callBack;
        this._domElement = [];
    }

    spiceClickHandler= () => {
        this.callBack(this);
    }

    render(){
        // const spiceContainer=$('<div>')
        //                         .addClass('spice-collection flex flex-left')
        //                         .on({
        //                             'click': this.callBack
        //                         });
        let color;
        for(color in this._color){
            for(var colorIndex=this._color[color]; colorIndex>0;colorIndex--){
                this._domElement.push($('<div>').addClass('spice '+ color))     
            }
        }
        return this._domElement;
    }

}


