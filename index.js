import chalk from 'chalk';

import { printBanner } from './banner.js';
import { gameData } from './gameData.js';
import { interact } from './interact.js';
import * as scenes from './scenes/index.js';

async function main() {
    // print the banner and awaken in the forest
    printBanner();
    let scene = gameData.awakenScene;
    let state = gameData.awakenState;
    // game loop
    while (true) {
        // get the user's action (interact displays the situation for an informed choice)
        const { action } = await interact(scene, state);
        // echo action
        console.log(chalk.green(`You chose: ${action}`));
        try {
            // try to transition
            // NOTE: scene is "self" for .transition()
            const newSceneKey = scene.transition(scene, state, action);
            if (!scenes[newSceneKey]) {
                console.log(chalk.yellow("The muses have not seen this far into the tale yet..."));
            } else {
                scene = scenes[newSceneKey];
            }
        } catch (error) {
            console.error(chalk.red(error));
        }
    }
}

main();
