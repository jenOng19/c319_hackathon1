class PointCard extends Card {

    constructor (spiceList, points, ...extraArguments){
        super(...extraArguments);
        this._spiceList = spiceList;
        this._points = points;
        this._isRevealed = true;
        this._domElement = null;
    }

    get spiceList () {
        return this._spiceList;
    }
    get points () {
        return this._points
    }



    render () {
        const cardElement = $('<div>')
                                .addClass('card point-card')
                                .on({
                                    'click': this.cardClickHandler
                                });

        const cardPointDisplayElement = $("<div>").addClass("points-display").text("15");
        const cardPriceElement = $("<div>").addClass("price flex flex-center");

        for (let spice of this._spiceList) {
            const spiceElement = $('<div>').addClass('card-spice ' + spice);
            cardPriceElement.append(spiceElement);
        }

        cardElement.append(cardPointDisplayElement, cardPriceElement);

        return cardElement;
    }
}



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