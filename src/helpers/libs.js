const helpers = {};

helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz01232456789';
    let randoNumber = 0;
    for(let i = 0; i < 10;i++){
        randoNumber+= possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return randoNumber;
}

module.exports = helpers;