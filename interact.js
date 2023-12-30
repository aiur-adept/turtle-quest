import inquirer from 'inquirer';

import { choiceFilter } from './filters/choice.js';
import { storyTell } from './storyTeller.js';
import { sleep } from './utils.js';

async function interact(scene, state) {
    // give the prompt
    if (Array.isArray(scene.description)) {
        for (const line of scene.description) {
            storyTell(line);
        }
    } else {
        storyTell(scene.description);
    }
    await sleep(1000);
    // prepare options
    // copy choices (we will mutate it)
    let choices = Array.from(scene.choices);
    // add magic if not already in magicScene
    if (scene.name !== 'magicScene' && scene.name !== 'menuScene') {
        choices.push({ name: "Use magic", value: "magic" });
    }
    // add menu if not already in menuScene
    if (scene.name !== 'menuScene') {
        choices.push({ name: "Open menu", value: "menu" });
    }
    // apply choiceFilter based on state
    choices = choiceFilter(choices, state);
    // if applicable, apply scene choiceFilter
    if (scene.choiceFilter) {
        choices = scene.choiceFilter(choices);
    }
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