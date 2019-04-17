class Player {

    constructor( id, initialCards ) {
        this._id = id;
        this._cardsInHand = initialCards;
        
        this._spiceList = {
            yellow : 4,
            red : 0,
            green: 0,
            brown: 0

        };
        this._selectedSpice = null;
        this._selectedCards = null;
        this._domElement = null;

    }

    init () {
        this.spiceObtainCard = new SpiceObtainCard(['yellow', 'yellow'],'','', this.cardHandler);
        this.spiceObtainCardElement = this.spiceObtainCard.render();

        this.spiceUpgradeCard = new SpiceUpgradeCard(2,'','', this.cardHandler);
        this.spiceUpgradeCard = this.spiceUpgradeCard.render();
    }

    get spiceList (){
        return this._spiceList;
    }

    cardHandler = (cardObj) => {
        debugger;
        switch (cardObj.constructor) {
            case SpiceObtainCard :
                for (let spice of cardObj.spiceList) {
                    this._spiceList[spice] += 1;
                }
                break;
            case SpiceUpgradeCard : 
                for (let i = 0; i < cardObj.upgradeTimes; i++){
                    this.spiceList.yellow--;
                    this.spiceList.red ++;
                }
                break;
        }
        debugger;
    }




    render (){
        $('.active-cards').append(this.spiceObtainCardElement);
        $('.active-cards').append(this.spiceUpgradeCard);

    }
    


}