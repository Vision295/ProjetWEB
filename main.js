let counter = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;
const counterDisplay = document.getElementById('counter');
const antenne = document.getElementById('antenne');

counterDisplay.textContent = counter;

antenne.addEventListener('click', () => {
    counter++;
    counterDisplay.textContent = counter;
    localStorage.setItem('counter', counter);
});