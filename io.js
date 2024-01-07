const consolelog = (message, color) => {
    const p = document.createElement('p');
    p.textContent = message;
    p.style['color'] = color;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
};

const logChoice = (choice) => {
    const p = document.createElement('p');
    p.classList.add('choice');
    p.textContent = choice.name;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
};

const inquire = (choices) => {
    const choicesContainer = document.getElementById('choices-container');
    return new Promise((resolve) => {
        choicesContainer.innerHTML = '';
        for (const choice of choices) {
            const value = choice.value;
            console.log(choice);
            const choiceDiv = document.createElement('div');
            const choiceSpan = document.createElement('span');
            choiceSpan.textContent = choice.name;
            choiceDiv.appendChild(choiceSpan);
            choiceDiv.addEventListener('click', () => {
                resolve(choice);
                choicesContainer.innerHTML = '';
            });
            choicesContainer.appendChild(choiceDiv);
        };
    });
};


module.exports = {
    consolelog,
    logChoice,
    inquire
};