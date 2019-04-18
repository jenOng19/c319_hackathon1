class CardDealer {

    constructor (){
        this.randomGenerator = new RandomGenerator();
        this.merchantCards = spiceObtainCards.concat(spiceTradeCards);
    }
    

    dealAPointCard () {
        return  pointCards[this.randomGenerator.generate(pointCards.length)];
    }

    dealAMerchantCard (){
        return this.merchantCards[this.randomGenerator.generate(this.merchantCards.length)];
    }



}