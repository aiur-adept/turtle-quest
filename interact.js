import inquirer from 'inquirer';

import { choiceFilter } from './filters/choice.js';
import { elaborate }  from './elaborate.js';

async function interact(scene, state) {
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: elaborate(scene.description),
            choices: choiceFilter(scene.choices, state),
        },
    ]);
};

export {
    interact
};