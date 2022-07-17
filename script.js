const playingField = document.querySelector('.playing-field');
const btnStart = document.querySelector('#btn-start');
const radioBtns = document.querySelectorAll('.radio-btn');

let difficulty = 6,
    cardsForChecking = [],
    timeoutClick = false,
    timeValue = 180,
    cardsCount = 0,
    gameStart = false,
    gameOver = '';

function randomSort(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
    
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}

function selectingCardsForGame(difficulty) {
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
    
    randomSort(cards);
    
    const cardsByDifficulty = [];

    //selecting cards by difficulty
    for (let i = 0; i < difficulty; i++) {
        cardsByDifficulty.push(cards[i]);
    }

    return cardsByDifficulty;
}

function startTime() {
    timeValue -= 1/60;

    const timeline = document.querySelector('.timeline');
    let progress = (100 * timeValue) / 180;

    timeline.style.backgroundImage = 'linear-gradient(90deg, #47aadd ' + progress + '%, #fff ' + progress +'%)';

    if (timeValue <= 0) gameOver = "ПОРАЖЕНИЕ!";

    if (gameOver !== '') {
        alert(gameOver);
        clearField();
        gameOver = '';
        gameStart = false;
        timeValue = 180;
        btnStart.textContent = 'START';
    }
    else setTimeout(() => startTime(), 1000/60);
}

function clearField() {
    const numCards = playingField.childElementCount;

    for (let i = 0; i < numCards; i++) {
        playingField.firstChild.remove();
    }
}

btnStart.addEventListener('click', () => {
    btnStart.textContent = 'RESTART';

    if (gameStart) {
        clearField();
        timeValue = 180;
    }
    else {
        startTime();
    }

    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            difficulty = parseInt(radioBtns[i].value);
        }
    }

    let randomSortCards = selectingCardsForGame(difficulty);

    if (difficulty === 6) playingField.className = 'playing-field easy-mode';
    else if (difficulty === 12) playingField.className = 'playing-field medium-mode';
    else playingField.className = 'playing-field hard-mode';

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
            backCard.style.backgroundColor = randomSortCards[i].bColor;
            card.append(backCard);

            const icon = document.createElement('img');
            icon.className = 'icon-card';
            icon.src = randomSortCards[i].src;
            backCard.append(icon);
        }

        randomSortCards = randomSort(randomSortCards);
    }

    gameStart = true;
});

document.addEventListener('click', (e) => {
    const frontCard = e.target;

    if (frontCard.classList.contains('front-card') && !frontCard.classList.contains('front-rotate') && cardsForChecking.length < 2) {
        const backCard = frontCard.nextSibling;
        rotatingCard(frontCard, backCard);

        cardsForChecking.push(backCard);
    }

    if (cardsForChecking.length === 2 && !timeoutClick) {
        timeoutClick = true;

        const isSame = checkCards(cardsForChecking[0], cardsForChecking[1]);

        const frontCheckingCard1 = cardsForChecking[0].previousElementSibling;
        const backChekingCard1 = cardsForChecking[0];

        const frontCheckingCard2 = cardsForChecking[1].previousElementSibling;
        const backChekingCard2 = cardsForChecking[1];

        if (isSame) {
            fadingCards(frontCheckingCard1, backChekingCard1);
            fadingCards(frontCheckingCard2, backChekingCard2);

            cardsCount++;

            if (difficulty === cardsCount) {
                clearField();
                gameOver = '';
                gameStart = false;
                timeValue = 180;
                btnStart.textContent = 'START';
                gameOver = 'ПОБЕДА!';
            }
        }
        else {
            setTimeout(() => {
                rotatingCard(frontCheckingCard1, backChekingCard1);
                rotatingCard(frontCheckingCard2, backChekingCard2);

                cardsForChecking = [];
                timeoutClick = false;
            }, 1000);
        }
    }

    
});

function fadingCards(frontCard, backCard) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            frontCard.classList.add('fading');
            backCard.classList.add('fading');

            cardsForChecking = [];
            timeoutClick = false;

            resolve();
        }, 1000)
    });

    promise.then(
        result => {
            setTimeout(() => {
                frontCard.remove();
                backCard.remove();
            }, 1000);
        }
    );
}

function chooseCards(e) {
    const frontCard = e.target;

    if (frontCard.classList.contains('front-card') && !timeoutClick) {
        const backCard = frontCard.nextSibling;

        rotatingCard(frontCard, backCard);

        return document.querySelectorAll('.back-rotate');
    }
}

function rotatingCard(frontCard, backCard) {
    frontCard.classList.toggle('front-rotate');
    backCard.classList.toggle('back-rotate');
}

function checkCards(card1, card2) {
    const icon1 = card1.firstChild;
    const icon2 = card2.firstChild;

    return icon1.src === icon2.src;
}