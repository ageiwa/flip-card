const cards = [
    {src:'./img/icons/angular.png', bColor:'#e4002b'},
    {src:'./img/icons/atom.png', bColor:'#00b779'},
    {src:'./img/icons/babel.png', bColor:'#2e2f2b'},
    {src:'./img/icons/bootstrap.png', bColor:'#683782'},
    {src:'./img/icons/cordova.png', bColor:'#fff'},
    {src:'./img/icons/css.png', bColor:'#0097f7'},
    {src:'./img/icons/git.png', bColor:'#fff'},
    {src:'./img/icons/github.png', bColor:'#fff'},
    {src:'./img/icons/gulp.png', bColor:'#ff4849'},
    {src:'./img/icons/html.png', bColor:'#ff4700'},
    {src:'./img/icons/jquery.png', bColor:'#0068af'},
    {src:'./img/icons/js.png', bColor:'#fdd000'},
    {src:'./img/icons/mongodb.png', bColor:'#00ab41'},
    {src:'./img/icons/nodejs.png', bColor:'#68ca3d'},
    {src:'./img/icons/npm.png', bColor:'#ed3434'},
    {src:'./img/icons/react.png', bColor:'#33393c'},
    {src:'./img/icons/redux.png', bColor:'#9241c9'},
    {src:'./img/icons/sass.png', bColor:'#d8608e'},
    {src:'./img/icons/sublime.png', bColor:'#4b4b4c'},
    {src:'./img/icons/svelte.png', bColor:'#ff3900'},
    {src:'./img/icons/ts.png', bColor:'#007bd0'},
    {src:'./img/icons/vscode.png', bColor:'#0090d9'},
    {src:'./img/icons/vue.png', bColor:'#00b980'},
    {src:'./img/icons/webpack.png', bColor:'#0073de'}
];

/*--------------------------------------------------------------*/

randomSort(cards);

/*states*/
let difficulty = 6,
    timeValue = 180,
    timeIsStart = false,
    cardsForGame = [];

/*elem*/
const playingField = document.querySelector('.playing-field');
const btnStart = document.querySelector('#btn-start');
const radioBtns = document.querySelectorAll('.radio-btn');

/*action on btn*/
btnStart.addEventListener('click', startGame);
for (let i = 0; i < radioBtns.length; i++) {
    radioBtns[i].addEventListener('click', () => chooseDifficulty(i));
}

function startGame() {
    clearField();

    cardsForGame = selectingCardsByDifficulty(cards);
    outputCards(cardsForGame);
    setStylesForPlayingField(difficulty);

    timeValue = 180;
    if (!timeIsStart) tikTakTime();
    timeIsStart = true;

    btnStart.textContent = 'RESTART';
}

function chooseDifficulty(i) {
    difficulty = parseInt(radioBtns[i].value);
}

function tikTakTime() {
    timeValue -= 1/60;

    const timeline = document.querySelector('.timeline');
    let progress = (100 * timeValue) / 180;

    timeline.style.backgroundImage = 'linear-gradient(90deg, #FF6347 ' + progress + '%, #ffcc73 ' + progress +'%)';

    setTimeout(() => tikTakTime(), 1000/60);
    
}

function clearField() {
    const card = document.querySelectorAll('.card');

    for (let i = 0; i < card.length; i++) {
        card[i].remove();
    }
}

function setStylesForPlayingField(difficulty) {
    if (difficulty === 6) playingField.className = 'playing-field easy-mode';
    else if (difficulty === 12) playingField.className = 'playing-field medium-mode';
    else playingField.className = 'playing-field hard-mode';
}

function outputCards(cardsForGame) {
    for (let i = 0; i < 2; i++) {
        for (let i = 0; i < difficulty; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            playingField.append(card);
    
            const frontCard = document.createElement('div');
            frontCard.className = 'front-card';
            card.append(frontCard);
    
            const backCard = document.createElement('div');
            backCard.className = 'back-card';
            backCard.style.backgroundColor = cardsForGame[i].bColor;
            card.append(backCard);

            const icon = document.createElement('img');
            icon.className = 'icon-card';
            icon.src = cardsForGame[i].src;
            backCard.append(icon);
        }

        cardsForGame = randomSort(cardsForGame);
    }
}

function selectingCardsByDifficulty(array) {
    randomSort(array);

    const cards = [];

    for (let i = 0; i < difficulty; i++) {
        cards.push(array[i]);
    }

    return cards;
}

function randomSort(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
    
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}