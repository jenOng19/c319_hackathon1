class CardDealer {

    constructor (){
        this.randomGenerator = new RandomGenerator()
    }
    

    dealAPointCard () {
        return pointCards[randomGenerator.generate(pointCards.length)]
    }

    // dealASpiceObtainOrTradeCard (){
    //     return 
    // }



}