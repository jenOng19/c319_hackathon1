class Game {

    constructor(numberOfPlayers) {
        this._spicesOrder = ['yellow', 'red', 'green', 'brown'];
        this._numberOfPlayers = numberOfPlayers;
        this._numberOfPointsCards = 5;
        this._pointsCardsOnBoard = [];
        this._numberOfMerchantCards = 6;
        this._merchantCardsonBoard = [];
        this._playerInitialCards = [spiceObtainCards[0]];
        // this._playerInitialCards = [spiceObtainCards[0], spiceUpgradeCards[0]];
        this._currentPlayerIndex = 0;
        this._currentPlayer = null;
        this._playerObjList = [];

        this._domElement = null;
    };

    init () {
        this.cardDealer = new CardDealer();

        for (let count = 0; count < this._numberOfPointsCards; count++) {
            this._pointsCardsOnBoard.push(
                this.dealAPointCardObj(this.cardDealer.dealAPointCard())
            );
        }

        for (let count = 0; count < this._numberOfMerchantCards; count++) {
            const merchantCardData = this.cardDealer.dealAMerchantCard();
            if (merchantCardData.requestSpices === undefined) {
                this._merchantCardsonBoard.push(
                    this.dealASpiceObtainCardObj(merchantCardData)
                );
            } 
            else {
                this._merchantCardsonBoard.push(
                    this.dealASpiceTradeCardObj(merchantCardData)
                ); 
            }
        }

        for (let counter = 0; counter < this._numberOfPlayers; counter ++) {
            const player = new Player(counter, this._playerInitialCards);
            player.init();
            player.render();
            this._playerObjList.push(player);
        }

        $('.end-turn').click(this.switchPlayer);
        this._currentPlayer = this._playerObjList[0];
        $('.player1').addClass('active-player');
    }

    get currentPlayer () {
        return this._currentPlayer;
    }

    dealAPointCardObj (pointsCardData) {
        return new PointCard(pointsCardData.requestSpices, pointsCardData.points, '','',this.cardClickHander)
    }

    dealASpiceObtainCardObj (spiceObtainCardData) {
        return new SpiceObtainCard(spiceObtainCardData.obtainSpices, '','',this.cardClickHander)
    }

    dealASpiceTradeCardObj(spiceTradeCardData) {
        return new SpiceTradeCard(spiceTradeCardData.requestSpices, spiceTradeCardData.obtainSpices, '','',this.cardClickHander)
    }
    
    switchPlayer = () =>{
        this._currentPlayerIndex ++;
        if (this._currentPlayerIndex >= this._numberOfPlayers) {
            this._currentPlayerIndex = 0;
            $('.player1').addClass('active-player');
            $('.player2').removeClass('active-player');

        } else {
            $('.player2').addClass('active-player');
            $('.player1').removeClass('active-player');

        }
        this._currentPlayer = this._playerObjList[this._currentPlayerIndex];

    }
    cardClickHander = (cardObj) => {
        switch (cardObj.constructor) {
            case PointCard : 
            const afforable = this._currentPlayer.paySpices(cardObj.spiceList);
            if (afforable) {
                    this._currentPlayer.purchaseAPointCard(cardObj);
                    this._pointsCardsOnBoard = this._pointsCardsOnBoard.filter((card) => card !== cardObj);    

                    this._pointsCardsOnBoard.push(
                        this.dealAPointCardObj(this.cardDealer.dealAPointCard())
                    );
                    this._currentPlayer.render();
                    this.render();
                }

                break;
            case SpiceTradeCard :
                
                this._currentPlayer.acquireACard(cardObj);
                this._merchantCardsonBoard = this._merchantCardsonBoard.filter((card) => card !== cardObj);
                this._currentPlayer.render();
                this.render();
            
                break;
            case SpiceObtainCard :
                this._currentPlayer.acquireACard(cardObj);
                this._merchantCardsonBoard = this._merchantCardsonBoard.filter((card) => card !== cardObj);
                this._currentPlayer.render();
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