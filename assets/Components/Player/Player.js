class Player {

    constructor( id, initialCards ) {
        this._id = id;
        this._cardsInHand = initialCards;
        this._cardsObjInHand = [];
        this._cardsObjPlayedOut = [];
        this._spiceList = ['yellow','yellow','yellow','red','red','green','brown']

        this._spiceObjList = [];
        this._points = 0;
        this._selectedSpice = null;
        this._selectedCards = null;
        this._domElement = [];
    }

    init () {
        this.updateSpiceObjList ();
        this.updateCardsObjInHand ();
    }

    updateSpiceObjList (){
        this._spiceObjList = [];
        for(let spice of this._spiceList){
            this._spiceObjList.push(new Spice(spice, null))
        }    
    }

    updateCardsObjInHand () {

        for (let card of this._cardsInHand) {

            if (card.upgradeTimes === undefined) {
                this._cardsObjInHand.push(new SpiceObtainCard(card.obtainSpices, '','',this.cardClickHander));
            } 
            else {
                this._cardsObjInHand.push(new SpiceUpgradeCard(card.upgradeTimes, '','',this.cardClickHander)); 
            }
        }
    }


    get spiceList (){
        return this._spiceList;
    }

    get points () {
        return this._points;
    }
    
    cardClickHander = (cardObj) => {
        switch (cardObj.constructor) {
            case SpiceObtainCard :
                this.acquireSpices(cardObj.spiceList);

                this._cardsObjPlayedOut.push(cardObj);
                this._cardsObjInHand = this._cardsObjInHand.filter((card) => card !== cardObj);
                cardObj.callBack = null;
                this.render();
                break;
            case SpiceUpgradeCard : 
                for (let i = 0; i < cardObj.upgradeTimes; i++){
                    this.spiceList.yellow--;
                    this.spiceList.red ++;
                }
                this._cardsObjPlayedOut.push(cardObj);
                this._cardsObjInHand = this._cardsObjInHand.filter((card) => card !== cardObj);
                cardObj.callBack = null;
                this.render();

                break;
            case SpiceTradeCard : 
                const afforable = this.paySpices(cardObj.requestSpiceList);
                if (afforable){
                    this.acquireSpices(cardObj.acquireSpiceList);
                    this._cardsObjPlayedOut.push(cardObj);
                    this._cardsObjInHand = this._cardsObjInHand.filter((card) => card !== cardObj);
                    cardObj.callBack = null;
                    this.render();
                }
                break;
        }

    }

    acquireSpices(spiceList) {
        for (let spice of spiceList) {
            this._spiceList.push(spice)
        }
    }

    paySpices(spiceList) {
        const tempSpiceList = [...this._spiceList]
        for (let spice of spiceList) {
            if (tempSpiceList.indexOf(spice) > -1) {
                tempSpiceList.splice(tempSpiceList.indexOf(spice) , 1 );

            } else {
                console.log('You cant afford it...')
                return false;
            }
        }
        this._spiceList = tempSpiceList;
        console.log('Purchased.')
        return true;
    }
    
    addPoints (points) {
        this._points += points;
    }

    acquireACard (cardObj) {

        cardObj.callBack = this.cardClickHander
        this._cardsObjInHand.push(cardObj);

    }

    render (){
        $('.spice-collection').empty();
        $('.active-cards').empty();
        $('.inactive-cards').empty();

        this.updateSpiceObjList ();


        for (let spiceObj of this._spiceObjList) {
            const spiceElement = spiceObj.render();
            $('.spice-collection').append(spiceElement);
        }
        
        for (let cardObj of this._cardsObjInHand) {
            const cardElement = cardObj.render();
            $('.active-cards').append(cardElement);
        }

        for (let cardObj of this._cardsObjPlayedOut) {
            const cardElement = cardObj.render();
            $('.inactive-cards').append(cardElement);
        }
    }
}

