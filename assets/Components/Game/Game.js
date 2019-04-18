class Game {

    constructor(numberOfPlayers) {
        this._spicesOrder = ['yellow', 'red', 'green', 'brown'];
        this._numberOfPlayers = numberOfPlayers;
        this._numberOfPointsCards = 5;
        this._pointsCardsOnBoard = [];
        this._numberOfMerchantCards = 6;
        this._merchantCardsonBoard = [];
        this._playerInitialCards = [spiceObtainCards[0], spiceUpgradeCards[0]];
        this._currentPlayerIndex = 0;
        this._playerObjList = [];

        this._domElement = null;
    };

    init () {
        this.cardDealer = new CardDealer();

        for (let count = 0; count < this._numberOfPointsCards; count++) {
            const pointsCardData = this.cardDealer.dealAPointCard();
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

        for (let counter = 0; counter < this._numberOfPlayers; counter ++) {
            const player = new Player(counter, this._playerInitialCards);
            this.player.init();
            this.player.render();
            this._playerObjList.push(player);
        }

        $('.end-turn').click(this.)
    }

    get currentPlayer () {
        return this._currentPlayer;
    }

    
    switchPlayer = () =>{
        
    }
    active-player
    cardClickHander = (cardObj) => {
        switch (cardObj.constructor) {
            case PointCard : 
            const afforable = this.player1.paySpices(cardObj.spiceList);
            if (afforable) {
                    this.player1.addPoints(cardObj.points);
                    this._pointsCardsOnBoard = this._pointsCardsOnBoard.filter((card) => card !== cardObj);                
                    this.player1.render();
                    this.render();
                }

                break;
            case SpiceTradeCard :
                
                this.player1.acquireACard(cardObj);
                this._merchantCardsonBoard = this._merchantCardsonBoard.filter((card) => card !== cardObj);
                this.player1.render();
                this.render();
            
                break;
            case SpiceObtainCard :
                this.player1.acquireACard(cardObj);
                this._merchantCardsonBoard = this._merchantCardsonBoard.filter((card) => card !== cardObj);
                this.player1.render();
                this.render();
                break;
        }
    }

    render (){
        $('.merchant-cards').empty();
        $('.point-cards').empty();
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