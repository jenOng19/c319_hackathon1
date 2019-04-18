class Player {

    constructor( id, initialCards ) {
        this._id = id;
        this._cardsInHand = initialCards;
        this._cardsObjInHand = [];
        this._cardsObjPlayedOut = [];
        
        this._spiceList = {
            yellow : 4,
            red : 0,
            green: 0,
            brown: 0
        };
        this._points = 0;
        this._selectedSpice = null;
        this._selectedCards = null;
        this._domElement = [];

    }

    init () {
        debugger;
        this.spices=new Spice(this._spiceList);
        this.arrayOfSpices=this.spices.render();
        for(let colorSpices of this.arrayOfSpices){
            this._domElement.push(colorSpices);
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
        return this._points
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

    render (){

        $('.spice-collection').append(this._domElement);


        for (let cardObj of this._cardsObjInHand) {
            console.log(cardObj)
            const cardElement = cardObj.render();
            $('.active-cards').append(cardElement);
        }


    }
    


}

