$(document).ready(startApp);

var game;

function startApp(){
    game=new Game(2);
    game.init();
    game.render();
}