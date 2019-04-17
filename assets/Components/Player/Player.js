class Player {

    constructor( id, initialCards ) {
        this._id = id;
        this._cardsInHand = initialCards;
        
        this._spiceList = {
            yellow : 4
        };
        this._selectedSpice = null;
        this._selectedCards = null;
        this._domElement = null;

    }

    cardHandler (cardObj) {
        switch (cardObj.constructor) {
            case SpiceObtainCard.constructor :
                for (let spice in cardObj.spiceList) {
                    this._spiceList[spice] += cardObj.spiceList[spice];
                }
                break;
            case SpiceUpgradeCard.constructor : 
                for (let i = 0; i < cardObj.upgradeTimes; i++){
                    this.spiceList.yellow--;
                    this.spiceList.red ++;
                }
                break;
        }
    }




    render (){


    }
    


}