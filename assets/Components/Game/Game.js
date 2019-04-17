

class Game {

    constructor(numberOfPlayers) {
        this.spicesOrder = ['yellow', 'red', 'green', 'brown'];
        this._numberOfPlayers = numberOfPlayers;
        this._pointCardsOnBoard = [];
        this._domElement = null;
    };

    init () {
        this.player1 = new Player(1, []);
        this.player1.init();
        this.player1.render();

        this.spiceTradeCard = new SpiceTradeCard(['yellow', 'yellow','yellow'], ['red', 'red'], '', '', this.cardClickHander)
        this.spiceTradeCardElement = this.spiceTradeCard.render();
        
        this.pointCard = new PointCard(['yellow','yellow'], 10, '','',this.cardClickHander)
        this.pointCardElement = this.pointCard.render();
    }

    cardClickHander = (cardObj) => {
        switch (cardObj.constructor) {
            case SpiceTradeCard :
                this.player1.paySpices(cardObj.requestSpiceList);
                this.player1.acquireSpices(cardObj.acquireSpiceList);
                break;
            case PointCard : 
                this.player1.paySpices(cardObj.spiceList);
                this.player1.addPoints(cardObj.points);
                break;
        }
        console.log(this.player1.spiceList);
        console.log(this.player1.points);

    }


    render (){
        $('.point-cards').append(this.pointCardElement);
        $('.merchant-cards').append(this.spiceTradeCardElement);

    }
    

    


}