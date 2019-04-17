class SpiceUpgradeCard extends Card {

    constructor (upgradeTimes, ...extraArguments){
        super(...extraArguments);
        this._upgradeTimes = upgradeTimes;
        this._domElement = null;
    }

    get upgradeTimes(){
        return this._upgradeTimes;
    }

    render () {
        const cardElement = $('<div>')
                                .addClass('card spice-upgrade-card')
                                .on({
                                    'click': this.cardClickHandler
                                })
                                .text('SpiceUpgradeCard');
        return cardElement;
    
    }
}