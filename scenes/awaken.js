const awakenScene = {
    description: "You awaken in a mysterious forest.",
    choices: [
        { name: "Explore", value: "explore" },
        { name: "Talk to the trees", value: "talk" },
        { name: "Use magic", value: "magic" },
        { name: "Open menu", value: "menu" },
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'explore':
                return 'awakenExploreScene';
            case 'talk':
                return 'awakenTalkScene';
            case 'magic':
                return 'awakenMagicScene';
            case 'menu':
                return 'menuScene';
        }
    }
};

const awakenExploreScene = {
    description: "You decide to explore the mysterious forest. As you walk, you discover ancient ruins and hidden pathways.",
    choices: [
        { name: "Enter the ruins", value: "enterRuins" },
        { name: "Follow the hidden path", value: "followPath" },
        { name: "Open menu", value: "menu" },
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'enterRuins':
                return 'enterRuinsScene';
            case 'followPath':
                return 'followPathScene';
            case 'menu':
                return 'menuScene';
        }
    }
};

const awakenTalkScene = {
    description: "You attempt to communicate with the ancient trees. Surprisingly, they respond with whispers of forgotten secrets.",
    choices: [
        { name: "Ask about the forest's history", value: "askHistory" },
        { name: "Inquire about magical knowledge", value: "askMagic" },
        { name: "Return to the starting point", value: "returnStart" },
        { name: "Open menu", value: "menu" },
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'askHistory':
                return 'askHistoryScene';
            case 'askMagic':
                return 'askMagicScene';
            case 'returnStart':
                return 'awakenScene';
            case 'menu':
                return 'menuScene';
        }
    }
};

const awakenMagicScene = {
    description: "You decide to harness the magic within you. A surge of power flows through your veins.",
    choices: [
        { name: "Cast a spell of protection", value: "castProtection" },
        { name: "Channel elemental magic", value: "channelElemental" },
        { name: "Return to the starting point", value: "returnStart" },
        { name: "Open menu", value: "menu" },
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'castProtection':
                return 'castProtectionScene';
            case 'channelElemental':
                return 'channelElementalScene';
            case 'returnStart':
                return 'awakenScene';
            case 'menu':
                return 'menuScene';
        }
    }
};

export {
    awakenScene,
    awakenExploreScene,
    awakenTalkScene,
    awakenMagicScene
};