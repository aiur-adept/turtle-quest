import { blackboard } from '../blackboard.js';

const menuScene = {
    name: 'menuScene',
    description: "You open the menu and review your options.",
    stack: true,
    choices: [
        // TODO { name: "Have a dream", value: "dream" },
        { name: "View inventory", value: "viewInventoryScene" },
        { name: "Check character stats", value: "checkStatsScene" },
        // TODO { name: "Save game", value: "saveGame" },
        { name: "Close menu", value: null }
    ],
};

const viewInventoryScene = {
    name: 'viewInventoryScene',
    description: "You set down your pack and look through it.",
    stack: true,

};

export {
    menuScene
};