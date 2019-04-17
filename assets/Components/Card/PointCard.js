class PointCard extends Card {

    constructor (spiceList, point){
        super();
        this._spiceList = spiceList;
        this._point = point;
        this._isRevealed = true;
        
        this._domElement = {


        };
    }

    get spiceList () {
        return this._spiceList;
    }
}