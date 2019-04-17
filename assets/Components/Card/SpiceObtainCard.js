class SpiceObtainCard extends Card {

    constructor (spiceList, ...extraArguments){
        super(...extraArguments);
        this._spiceList = spiceList;
        this._domElement = null;
    }

    get spiceList (){
        return this._spiceList;
    }

    render () {
        const cardElement = $('<div>')
                                .addClass('card merchant-card obtain-card')
                                .on({
                                    'click': this.cardClickHandler
                                });
        const cardFunctionElement = $('<div>').addClass('card-function');
        const obtainSpiceElement = $('<div>').addClass('obtain-spice');

        for (let spice of this._spiceList) {
            const spiceElement = $('<div>').addClass('card-spice ' + spice);
            obtainSpiceElement.append(spiceElement);
        }
        cardFunctionElement.append(obtainSpiceElement);
        cardElement.append(cardFunctionElement);
        
        
        return cardElement;
    
    }
}