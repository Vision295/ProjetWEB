let counter = 0;
const counterDisplay = document.getElementById('counter');
const antenne = document.getElementById('antenne');

antenne.addEventListener('click', () => {
    counter++;
    counterDisplay.textContent = counter;
});