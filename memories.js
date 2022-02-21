let inputArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function shuffle(arr){
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

const cardGenerator = () => {
    const shuffleArray = shuffle(inputArray);
    // Generate the HTML
    const container = document.createElement('div');
    container.classList = 'container'
    document.body.append(container)
    for (let item of shuffleArray) {
        const card = document.createElement('div');
        const face = document.createElement('div');
        const back = document.createElement('img');
        card.classList = 'card';
        card.classList.add('active');
        face.classList = 'face';
        back.classList = 'back';
        face.textContent = item;
        back.src = 'img/js-badge.svg';
        card.setAttribute('name', item);
        container.append(card);
        card.append(face);
        card.append(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toogle-card');
            checkCards(e);
        });
    };
};

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            for (const item of flippedCards) {
                item.classList.add('disable');
                item.classList.remove('active');
                item.classList.remove('flipped');
                const disable = document.querySelectorAll('.disable');
                console.log(disable);
                if (disable.length === 16) {
                    restart ();
                };
            };
            let activeCards = document.querySelectorAll('.active');
            for (const item of activeCards) {
              item.classList.add('disable');
              setTimeout(() => item.classList.remove('disable'), 700)
            };
        } else {
            for (const item of flippedCards) {
                item.classList.remove('flipped');
                setTimeout(() => item.classList.remove('toogle-card'), 700);
            };
            let activeCards = document.querySelectorAll('.active');
            for (const item of activeCards) {
              item.classList.add('disable');
              setTimeout(() => item.classList.remove('disable'), 700)
            }
        };
    };
};

//Restart
const restart = () => {
    const container = document.querySelector('.container');
    const winContainer = document.createElement('div');
    const descrWin = document.createElement('span');
    const imageWin = document.createElement('img');
    const btnRestart = document.createElement('btn');
    winContainer.classList = 'win-container';
    descrWin.classList = 'win-descr';
    imageWin.classList = 'win-image';
    btnRestart.classList = 'restart';
    btnRestart.textContent = 'Сыграть ещё раз';
    imageWin.src = '/img/win.svg';
    descrWin.textContent = 'Поздравляем с победой!!! Хотите попробовать еще раз?'
    winContainer.append(imageWin);
    winContainer.append(descrWin);
    winContainer.append(btnRestart);
    container.append(winContainer);
    btnRestart.addEventListener('click', (el) => {
        container.remove();
        cardGenerator(inputArray);
        winContainer.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cardGenerator()

});

