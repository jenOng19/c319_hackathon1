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
                                })
                                .text('PointCard');
        return cardElement;
    }
}