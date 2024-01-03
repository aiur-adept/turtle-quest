import chalk from 'chalk';

import { printBanner } from './banner.js';
import { describeScene } from './describeScene.js';
import { describeItem } from './describeItem.js';
import { interact } from './interact.js';
import { sleep } from './utils.js';

import { gameData } from './gameData.js';
import * as scenes from './scenes/index.js';

const awaken = () => (
    [
        Object.assign({}, scenes.awaken_enterScene),
        Object.assign({}, gameData.awakenState)
    ]
);

async function main() {
    // welcome the player
    printBanner();

    // begin the scene and the state
    const [firstScene, state] = awaken();
    const sceneStack = [firstScene];

    // game loop
    while (true) {
        // consider the current scene
        // (but first, guard against zero-stack)
        if (sceneStack.length == 0) {
            sceneStack.push(awaken()[0]);
        }
        const scene = sceneStack[sceneStack.length - 1];

        //
        // display the scene
        //
        await describeScene(scene.description, state);

        //
        // interact with the scene (and get the next scene)
        //
        // the CLI interacts with the user, and the
        // user's input interacts with the scene
        // we ultimately want to know what scene is next
        // given its name as a key (every moment, we unlock
        // a magic door! <3)
        let sceneKey = null;
        // ephemeral scenes have no action, they just display their description and pop off
        if (scene.ephemeral) {
            sceneStack.pop();
            continue;
        }
        const { action } = await interact(scene, state);
        console.log();
        await sleep(200);
        switch (action) {
            case null:
                break;
            default:
                if (/.+Scene/.test(action)) {
                    // if the value of the choice was a scene name...
                    sceneKey = action;
                } else if (/describeItem_.+/.test(action)) {
                    // if the value of the choice was to describe an item...
                    const itemName = action.match(/describeItem_(.+)/)[1];
                    describeItem(itemName);
                } else {
                    // else get it from the return value of .interact()
                    sceneKey = scene.interact(scene, state, action);
                }
        }
        await sleep(200);

        // scene has ended, run onEnd hook
        if (scene.onEnd) {
            scene.onEnd(state);
        }

        //
        // transition to the next scene
        //
        if (!sceneKey) {
            // if given no sceneKey, nothing is next, simply pop this scene
            sceneStack.pop();
        } else if (!scenes[sceneKey]) {
            console.log(chalk.yellow('The muses have not seen that far into the tale yet...'));
            console.log(chalk.blue('~~~'));
        } else {
            const nextScene = Object.assign({}, scenes[sceneKey]);
            if (nextScene.stack) {
                sceneStack.push(nextScene);
            } else {
                sceneStack[sceneStack.length - 1] = nextScene;
            }
        }
    }
}

main();
