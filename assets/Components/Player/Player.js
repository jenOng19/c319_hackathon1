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
        this._points = 0;
        this._selectedSpice = null;
        this._selectedCards = null;
        this._domElement = null;

    }

    init () {

        // this.spiceObtainCard = new SpiceObtainCard(['yellow', 'yellow','green'],'','', this.cardHandler);
        // this.spiceObtainCardElement = this.spiceObtainCard.render();

        // this.spiceUpgradeCard = new SpiceUpgradeCard(2,'','', this.cardHandler);
        // this.spiceUpgradeCardElement = this.spiceUpgradeCard.render();
    }

    get spiceList (){
        return this._spiceList;
    }

    get points () {
        return this._points
    }

    cardHandler = (cardObj) => {
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
        console.log(this._spiceList);
        console.log(this._points);
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
        $('.active-cards').append(this.spiceObtainCardElement);
        $('.active-cards').append(this.spiceUpgradeCardElement);

    }
    


}

