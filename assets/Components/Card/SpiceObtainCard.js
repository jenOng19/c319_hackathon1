class SpiceObtainCard extends Card {

    constructor (spiceList){
        this._spiceList = spiceList;

        this._domElement = null;
    }

    get spiceList (){
        return this._spiceList;
    }

    render () {
        const cardElement = $('<div>')
                                .addClass('card spice-obtain-card')
                                .on({
                                    'click': this.cardClickHandler
                                });
    
    }
}