class SpiceTradeCard extends Card {
    constructor (requestSpiceList, acquireSpiceList, ...extraArguments){
        super(...extraArguments);
        this._requestSpiceList = requestSpiceList;
        this._acquireSpiceList = acquireSpiceList;
        this._domElement = null;
    }

    get requestSpiceList(){
        return this._requestSpiceList;
    }

    get acquireSpiceList(){
        return this._acquireSpiceList;
    }
    
    render () {
        const cardElement = $('<div>')
                                .addClass('card merchant-card trade-card')
                                .on({
                                    'click': this.cardClickHandler
                                })
        const cardFunctionElement = $('<div>').addClass('card-function');
        const tradeSpiceRequestElement = $('<div>').addClass('trade-spice');
        const tradeSpiceObtainedElement= $('<div>').addClass('trade-obtained');
        const arrow=$('<div>').addClass('trade-arrow arrow').html('<span>&darr;</span>');
        
        for(let spice of this._requestSpiceList){
            const spiceElement=$('<div>').addClass('card-spice ' + spice);
            tradeSpiceRequestElement.append(spiceElement);
        }

        for(let spice of this._acquireSpiceList){
            const spiceElement=$('<div>').addClass('card-spice ' + spice);
            tradeSpiceObtainedElement.append(spiceElement);
        }

        cardFunctionElement.append(tradeSpiceRequestElement);
        cardFunctionElement.append(arrow);
        cardFunctionElement.append(tradeSpiceObtainedElement);
        cardElement.append(cardFunctionElement);
        return cardElement;
    }
}

