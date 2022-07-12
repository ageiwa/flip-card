const playingField = document.querySelector('.playing-field');
const btnStart = document.querySelector('#btn-start');
const radioBtns = document.querySelectorAll('.radio-btn');

btnStart.addEventListener('click', () => {
    let difficulty = 12;

    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            difficulty = parseInt(radioBtns[i].value);
        }
    }

    if (difficulty === 12) playingField.className = 'playing-field easy-mode';
    else if (difficulty === 24) playingField.className = 'playing-field medium-mode';
    else playingField.className = 'playing-field hard-mode';

    for (let i = 0; i < difficulty; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        playingField.append(card);

        const frontCard = document.createElement('div');
        frontCard.className = 'front-card';
        card.append(frontCard);

        const backCard = document.createElement('div');
        backCard.className = 'back-card';
        card.append(backCard);
    }


});