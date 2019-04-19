class Game {

    constructor(numberOfPlayers) {
        this._spicesOrder = ['yellow', 'red', 'green', 'brown'];

        this._numberOfPlayers = numberOfPlayers;
        this._maxPointsCards = 1;
        this._lastTurn = false;

        this._numberOfPointsCards = 5;
        this._pointsCardsOnBoard = [];

        this._numberOfMerchantCards = 6;
        this._merchantCardsonBoard = [];

        this._playerInitialCards = [spiceObtainCards[0]];
        // this._playerInitialCards = [spiceObtainCards[0], spiceUpgradeCards[0]];

        this._currentPlayerIndex = 0;
        this._currentPlayer = null;
        this._playerObjList = [];

        this.cardDealer = new CardDealer();
        this._domElement = null;
    };

    addEventHandlers(){
       $('.playButton').click(this.handlePlayButton);
    }

    handlePlayButton(){
        $('.playButton').addClass('hide');
        $('.player1').removeClass('hide');
        $('.game-container').removeClass('hide');
        $('.available-spices').removeClass('hide');
        $('.help-btn').removeClass('hide');
    }

    init () {

        this._lastTurn = false;

        for (let count = 0; count < this._numberOfPointsCards; count++) {
            this.shuffleANewPointsCardToBoard();
        }

        for (let count = 0; count < this._numberOfMerchantCards; count++) {
            this.shuffleANewMerchantCardToBoard();
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



    shuffleANewPointsCardToBoard (){
        this._pointsCardsOnBoard.push(
            this.transferAPointCardObj(this.cardDealer.dealAPointCard())
        );
    }

    shuffleANewMerchantCardToBoard (){
        const merchantCardData = this.cardDealer.dealAMerchantCard();
        if (merchantCardData.requestSpices === undefined) {
            this._merchantCardsonBoard.push(
                this.transferASpiceObtainCardObj(merchantCardData)
            );
        } 
        else {
            this._merchantCardsonBoard.push(
                this.transferASpiceTradeCardObj(merchantCardData)
            ); 
        }
    }

    endGame (){
        if (this._playerObjList[0].points > this._playerObjList[1].points) {
            console.log("Player 1 is the winner");
        }
        else if (this._playerObjList[0].points < this._playerObjList[1].points){
            console.log("Player 2 is the winner");
        } else {
            console.log("It's a tie game");
        }
    }
    
    switchPlayer = () => {
        debugger;
        if (this._lastTurn) this.endGame();
        if (this._currentPlayer.numberOfPointsCards === this._maxPointsCards ) this._lastTurn = true;

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
                        this.transferAPointCardObj(this.cardDealer.dealAPointCard())
                    );
                    this._currentPlayer.render();
                    this.render();
                }

                break;
            case SpiceTradeCard :
                
                this._currentPlayer.acquireACard(cardObj);
                this._merchantCardsonBoard = this._merchantCardsonBoard.filter((card) => card !== cardObj);
                this.shuffleANewMerchantCardToBoard();
                this._currentPlayer.render();
                this.render();
            
                break;
            case SpiceObtainCard :
                this._currentPlayer.acquireACard(cardObj);
                this._merchantCardsonBoard = this._merchantCardsonBoard.filter((card) => card !== cardObj);
                this.shuffleANewMerchantCardToBoard();                
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

    get currentPlayer () {
        return this._currentPlayer;
    }

    transferAPointCardObj (pointsCardData) {
        return new PointCard(pointsCardData.requestSpices, pointsCardData.points, '','',this.cardClickHander)
    }

    transferASpiceObtainCardObj (spiceObtainCardData) {
        return new SpiceObtainCard(spiceObtainCardData.obtainSpices, '','',this.cardClickHander)
    }

    transferASpiceTradeCardObj(spiceTradeCardData) {
        return new SpiceTradeCard(spiceTradeCardData.requestSpices, spiceTradeCardData.obtainSpices, '','',this.cardClickHander)
    }
}