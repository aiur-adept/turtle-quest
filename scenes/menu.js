const menuScene = {
    description: "You open the menu and review your options.",
    choices: [
        { name: "View inventory", value: "viewInventory" },
        { name: "Check character stats", value: "checkStats" },
        { name: "Save game", value: "saveGame" },
        { name: "Have a dream", value: "dream" },
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
        }
    }
};

export {
    menuScene
};