class PointCard extends Card {

    constructor (spiceList, point){
        super();
        this._spiceList = spiceList;
        this._point = point;
        this.callBack = callBack;
        this._isRevealed = true;
        
        this._domElement = null;
    }

    get spiceList () {
        return this._spiceList;
    }



    render () {
        const cardElement = $('<div>')
                                .addClass('card point-card')
                                .on({
                                    'click': this.cardClickHandler
                                });
    
    }
}