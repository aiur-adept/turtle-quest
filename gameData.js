import {
    awakenScene,
    awakenExploreScene,
    awakenTalkScene,
    awakenMagicScene
} from './scenes/awaken.js';

import {
    menuScene
} from './scenes/menu.js';



const gameData = {
    awakenState: {
        name: 'null',
        mind: 'calm',
        inventory: {
            'heartSutra': 1,
        },
        health: 20,
        mana: 20,
    },

    // awaken scene
    awakenScene,
    awakenExploreScene,
    awakenTalkScene,
    awakenMagicScene,

    // menu scene
    menuScene,
};

export {
    gameData
};