

class Game {

    constructor(numberOfPlayers) {
        this._spicesOrder = ['yellow', 'red', 'green', 'brown'];
        this._numberOfPlayers = numberOfPlayers;
        this._numberOfPointsCards = 5;
        this._pointsCardsOnBoard = [];
        this._numberOfMerchantCards = 6;
        this._merchantCardsonBoard = [];

        this._domElement = null;

        this.handleRules=this.handleRules.bind(this);
    };

    addEventHandlers(){
        $('.rulesButton').click(this.handleRules);
    }

    handleRules(){
        $('.rulesModal').removeClass('hide');
        $('.game-container').toggleClass('hide');
    }

    
    init () {
        this.cardDealer = new CardDealer();


        for (let count = 0; count < this._numberOfPointsCards; count++) {
            const pointsCardData = this.cardDealer.dealAPointCard();
            console.log(pointsCardData)
            this._pointsCardsOnBoard.push(new PointCard(pointsCardData.requestSpices, pointsCardData.points, '','',this.cardClickHander));
        }

        for (let count = 0; count < this._numberOfMerchantCards; count++) {
            const pointsCardData = this.cardDealer.dealAMerchantCard();
            if (pointsCardData.requestSpices === undefined) {
                this._merchantCardsonBoard.push(new SpiceObtainCard(pointsCardData.obtainSpices, '','',this.cardClickHander));
            } 
            else {
                this._merchantCardsonBoard.push(new SpiceTradeCard(pointsCardData.requestSpices, pointsCardData.obtainSpices, '','',this.cardClickHander)); 
            }
        }

        this.player1 = new Player(1, playerInitialCards);
        this.player1.init();
        this.player1.render();

        

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

        for (let pointCardObj of this._pointsCardsOnBoard) {
            const pointCardElement = pointCardObj.render();
            $('.point-cards').append(pointCardElement);
        }
        for (let merchantCardObj of this._merchantCardsonBoard) {
            const merchantCardElement = merchantCardObj.render();
            $('.merchant-cards').append(merchantCardElement);
        }

    }
    

    


}