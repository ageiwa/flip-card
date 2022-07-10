const playingField = document.querySelector('.playing-field');
const btnStart = document.querySelector('#btn-start');

btnStart.addEventListener('click', () => {
    for (let i = 0; i < 12; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        playingField.appendChild(card);
    }


});