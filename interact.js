import inquirer from 'inquirer';

import { choiceFilter } from './filters/choice.js';

async function interact(scene, state) {
    //
    // construct choices
    //
    // copy choices (we will mutate it)
    let choices = scene.choices ?
        ((scene.choices.call && scene.choices.apply) ?
            Array.from(scene.choices(state)) :
            Array.from(scene.choices))
        : [];
    // .choiceFunc() is used to give nondeterministic or 
    // contextual options
    if (scene.choiceFunc) {
        choices = choices.concat(scene.choiceFunc(state));
    }
    if (!scene.exclusiveChoices) {
        // add magic choice if not already in magicScene
        if (scene.name !== 'magicScene' && scene.name !== 'menuScene') {
            choices.push({ name: "Use magic", value: "magicScene" });
        }
        // add menu choice if not already in menuScene
        if (scene.name !== 'menuScene') {
            choices.push({ name: "Open menu", value: "menuScene" });
        }
    }
    // apply choiceFilter based on state
    choices = choiceFilter(choices, state);
    // if applicable, apply scene choiceFilter
    if (scene.choiceFilter) {
        choices = scene.choiceFilter(choices);
    }

    //
    // interact
    //
    // use inquirer to get actual interaction
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: '>',
            choices,
        },
    ]);
};

export {
    interact
};