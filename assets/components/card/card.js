class Card {
    constructor (frontImgUrl, backImgUrl, callBack){
        this._frontImgUrl = frontImgUrl;
        this._backImgUrl = backImgUrl;
        this.callBack = callBack;
    }

    cardClickHandler = () => {
        if (this.callBack) this.callBack(this)
    }  
}