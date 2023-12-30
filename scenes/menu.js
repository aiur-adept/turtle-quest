import { blackboard } from '../blackboard.js'; 

const menuScene = {
    name: 'menuScene',
    description: "You open the menu and review your options.",
    choices: [
        { name: "Have a dream", value: "dream" },
        { name: "View inventory", value: "viewInventory" },
        { name: "Check character stats", value: "checkStats" },
        { name: "Save game", value: "saveGame" },
        { name: "Close menu", value: "closeMenu"}
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'viewInventory':
                return 'viewInventoryScene';
            case 'checkStats':
                return 'checkStatsScene';
            case 'saveGame':
                return 'saveGameScene';
            case 'dream':
                return 'dreamScene';
            case 'closeMenu':
                return blackboard.currentScene.name;
        }
    }
};

export {
    menuScene
};