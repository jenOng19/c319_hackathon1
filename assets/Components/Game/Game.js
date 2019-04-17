

class Game {

    constructor(numberOfPlayers) {
        this.spicesOrder = ['yellow', 'red', 'green', 'brown'];
        this._numberOfPlayers = numberOfPlayers;
        this._pointCardsOnBoard = null;
        
        this._domElement = {


        };
    };

    init () {
        this.player1 = new Player(1, []);
        this.player1.init();
        this.player1.render();
    }

}