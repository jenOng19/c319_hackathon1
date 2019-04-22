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
            this._spiceObjList.push(new Spice(spice, this.handleSpiceClick))
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
                    cardObj
                };
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

    // handleSpiceClick(color){
    //     switch(color){
    //         case 'yellow':
    //             for(let colorIndex=0; colorIndex<this._spiceObjList.length, colorIndex++){
    //                 this.indexPosition=this._spiceObjList.indexOf('yellow');
    //                 this._spiceObjList.splice(this.indexPosition, 1, 'red');
    //             }
    //             this._spiceObjList.yellow--;
    //             this._spiceObjList.red ++;
    //             break;
    //         case 'red':
    //             this._spiceList.red--;
    //             this._spiceList.green ++;
    //             break;
    //         case 'green':
    //             this._spiceList.green--;
    //             this._spiceList.brown ++;
    //             break;
    //     }
    // }

    handleSpiceClick = (spiceObj) => {

        //spicesOrder = ['yellow', 'red', 'green', 'brown'];
        // in the cardData.js 
        const index = spicesOrder.indexOf(spiceObj.color)
        if (index  < spicesOrder.length - 1 ) {
            const spiceObjIndex = this._spiceObjList.indexOf(spiceObj);
            this._spiceList[spiceObjIndex] = spicesOrder[index + 1]
            this.render();
        }

        //I realized that I did this class in the very bad way
        // this._spiceList is not nesseccery at all
        // all we need is spiceObjList 
        //so in this function, i can change the spiceObjList directly , instead of changing the this._spiceList
        //which is raw data, and then update to spiceObjList accordingly ....
        //this works for now but need to rewrite later.
        //continue to add the logic that only upate when the upgrade card is selected by user first 
        //which mean this._selectedCards has a spiceUpgradeCard in it..

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

    get numberOfPointsCards () {
        return this._numberOfPointsCards;
    }
}

