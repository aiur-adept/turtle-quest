import chalk from 'chalk';

import { printBanner } from './banner.js';
import { interact } from './interact.js';
import { sleep } from './utils.js';

import { gameData } from './gameData.js';
import * as scenes from './scenes/index.js';
import { blackboard } from './blackboard.js';

async function main() {
    // welcome the player
    printBanner();

    // set the scene
    let scene = scenes.awakenScene;
    blackboard.currentScene = scene;

    // set the state
    let state = gameData.awakenState;

    // game loop
    while (true) {

        // get the user's action (interact displays the situation for an informed choice)
        const { action } = await interact(scene, state);

        // echo action
        console.log(chalk.grey(`You chose: ${action}`));
        console.log();
        await sleep(1000);

        switch (action) {
            case 'magic':
                scene = scenes.magicScene;
                break;
            case 'menu':
                scene = scenes.menuScene;
                break;
            default:
                // NOTE: scene is "self" for .transition()
                const newSceneKey = scene.transition(scene, state, action);
                blackboard.currentScene = newSceneKey;
                // transition to the new scene
                if (!scenes[newSceneKey]) {
                    console.log(chalk.yellow("The muses have not seen this far into the tale yet..."));
                    await sleep(1000);
                } else {
                    scene = scenes[newSceneKey];
                }
        }
    }
}

main();
