class Player {

    constructor( id, initialCards ) {
        this._id = id;
        this._cardsInHand = initialCards;
        this._cardsObjInHand = [];
        this._cardsObjPlayedOut = [];
        
        this._spiceList = {
            yellow : 2,
            red : 1,
            green: 1,
            brown: 1
        };
        this._spiceObjList = [];
        this._points = 0;
        this._selectedSpice = null;
        this._selectedCards = null;
        this._domElement = [];

    }

    init () {
        
        for(let spice in this._spiceList){
            for (let count = 0; count < this._spiceList[spice]; count ++) {
                this._spiceObjList.push(new Spice(spice, null))
            }
        }


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

    }

    acquireSpices(spiceList) {
        for (let spice of spiceList) {
            this._spiceList[spice] += 1;
        }
    }

    paySpices(spiceList) {
        for (let spice of spiceList) {
            this._spiceList[spice] -= 1;
        }
    }
    
    addPoints (points) {
        this._points += points;
    }

    acquireACard (cardObj) {
        this._cardsObjInHand.push(cardObj);
    }

    render (){
        $('.spice-collection').empty();
        $('.active-cards').empty();
        $('.inactive-cards').empty();

        for (let spiceObj of this._spiceObjList) {
            const spiceElement = spiceObj.render();
            $('.spice-collection').append(spiceElement);
        }
        
        for (let cardObj of this._cardsObjInHand) {
            const cardElement = cardObj.render();
            $('.active-cards').append(cardElement);
        }
    }
    


}

