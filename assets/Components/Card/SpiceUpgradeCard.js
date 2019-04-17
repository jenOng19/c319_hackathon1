class SpiceUpgradeCard extends Card {

    constructor (upgradeTimes){
        this._upgradeTimes = upgradeTimes;
        this._domElement = null;
    }

    render () {
        const cardElement = $('<div>')
                                .addClass('card spice-upgrade-card')
                                .on({
                                    'click': this.cardClickHandler
                                });
    
    }
}