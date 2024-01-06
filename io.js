const consolelog = (message) => {
    const p = document.createElement('p');
    p.textContent = message;
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
            choiceDiv.textContent = choice.name;
            choiceDiv.addEventListener('click', () => {
                resolve(value);
                choicesContainer.innerHTML = '';
            });
            choicesContainer.appendChild(choiceDiv);
        };
    });
};

module.exports = {
    consolelog,
    inquire
};