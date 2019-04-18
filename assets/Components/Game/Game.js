

class Game {

    constructor(numberOfPlayers) {
        this._spicesOrder = ['yellow', 'red', 'green', 'brown'];
        this._numberOfPlayers = numberOfPlayers;
        this._numberOfPointsCards = 5;
        this._pointsCardsOnBoard = [];
        this._numberOfMerchantCards = 6;
        this._merchantCardsonBoard = [];
        this._playerInitialCards = [spiceObtainCards[0], spiceUpgradeCards[0]];


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

        this.player1 = new Player(1, this._playerInitialCards);
        this.player1.init();
        this.player1.render();

        

    }

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