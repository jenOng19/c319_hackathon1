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
                                .addClass('card merchant-card upgrade-card')
                                .on({
                                    'click': this.cardClickHandler
                                })

        const cardFunctionElement = $('<div>').addClass('card-function');
        const arrow=$('<div>').addClass('upgrade-arrow arrow').html('<span>&uarr;</span>');
        const upgradeSpiceContainer=$('<div>').addClass('upgrade-spice');

        for(var upgrade=0; upgrade<this._upgradeTimes;upgrade++){
            const spiceElement=$('<div>').addClass('card-spice gray');
            upgradeSpiceContainer.append(spiceElement);
        }

        cardFunctionElement.append(arrow, upgradeSpiceContainer);
        cardElement.append(cardFunctionElement);

        return cardElement;
    }
}