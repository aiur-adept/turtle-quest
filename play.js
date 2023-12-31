import chalk from 'chalk';

import { printBanner } from './banner.js';
import { interact } from './interact.js';
import { storyTell } from './storyTeller.js';
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
        // (that is, prompt)
        //
        if (Array.isArray(scene.description)) {
            for (const line of scene.description) {
                storyTell(line);
                await sleep(100);
            }
        } else {
            storyTell(scene.description);
        }
        await sleep(1000);

        //
        // interact
        //
        // the CLI interacts with the user, and the
        // user's input interacts with the scene
        // we ultimately want to know what scene is next
        // given its name as a key (every moment, we unlock
        // a magic door! <3)
        let key = null;
        const { action } = await interact(scene, state);
        console.log();
        await sleep(500);
        switch (action) {
            case 'magic':
                key = 'magicScene'; break;
            case 'menu':
                key = 'menuScene'; break;
            default:
                // if the value of the choice was a scene name...
                if (/.+Scene/.test(action)) {
                    key = action;
                } else {
                    // else get it from the return value of .interact()
                    key = scene.interact(scene, state, action);
                }
                if (scene.event) {
                    scene.event(scene, state, action);
                }
        }
        await sleep(500);

        //
        // next scene
        //
        if (!key) {
            // if given no key, nothing is next, simply pop this scene
            sceneStack.pop();
        } else if (!scenes[key]) {
            console.log(chalk.yellow('The muses have not seen that far into the tale yet...'));
            console.log(chalk.blue('~~~'));
        } else {
            const nextScene = Object.assign({}, scenes[key]);
            if (nextScene.stack) {
                sceneStack.push(nextScene);
            } else {
                sceneStack[sceneStack.length - 1] = nextScene;
            }
        }
    }
}

main();
