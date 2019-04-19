class Player {

    constructor( id, initialCards ) {
        this._id = id;
        this._cardsInHand = initialCards;
        this._cardsObjInHand = [];
        this._cardsObjPlayedOut = [];
        this._spiceList = ['yellow','yellow','red', 'red','green','brown', 'brown']

        this._spiceObjList = [];
        this._points = 0;
        this._numberOfPointsCards = 0;
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
                const messageElement=$('.message-area');
                messageElement.html("<div class='message-text'>You can't afford it...</div>");
                setTimeout(function(){
                    messageElement.html(""); 
                }, 1000);
                return false;
            }
        }
        this._spiceList = tempSpiceList;
        const messageElement=$('.message-area');
                messageElement.html("<div class='message-text'>Purchased</div>");
                setTimeout(function(){
                    messageElement.html(""); 
                }, 1000);
        return true;
    }
    
    purchaseAPointCard (cardObj) {
        this._points += cardObj.points;
        this._numberOfPointsCards ++;
    }

    acquireACard (cardObj) {

        cardObj.callBack = this.cardClickHander
        this._cardsObjInHand.push(cardObj);

    }

    render (){
        let player = this._id === 0 ? '.player1 ' : '.player2 ';
        $(player + '.spice-collection').empty();
        $(player +'.active-cards').empty();
        $(player +'.inactive-cards').empty();

        this.updateSpiceObjList ();

        $('.total-points span').text(this._points);
        $('.total-cards span').text(this._numberOfPointsCards);

        for (let spiceObj of this._spiceObjList) {
            const spiceElement = spiceObj.render();
            $(player +'.spice-collection').append(spiceElement);
        }
        
        for (let cardObj of this._cardsObjInHand) {
            const cardElement = cardObj.render();
            $(player +'.active-cards').append(cardElement);
        }

        for (let cardObj of this._cardsObjPlayedOut) {
            const cardElement = cardObj.render();
            $(player +'.inactive-cards').append(cardElement);
        }
    }


    
    get spiceList (){
        return this._spiceList;
    }

    get points () {
        return this._points;
    }
}

