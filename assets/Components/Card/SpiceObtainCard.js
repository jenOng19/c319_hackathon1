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
                                .addClass('card obtain-card')
                                .on({
                                    'click': this.cardClickHandler
                                })
                                .text('spice-obtain-card');
        return cardElement;
    
    }
}