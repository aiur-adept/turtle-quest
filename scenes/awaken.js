import chalk from 'chalk';

const awakenScene = {
    name: 'awakenScene',
    description: [
        "You awaken in a mysterious forest.",
        "The air is enchanted with much memory.",
        "You hear faintly the leaves in the canopy dancing.",
    ],
    choices: [
        { name: "Explore", value: "explore" },
        { name: "Talk to the trees", value: "talk" },
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'explore':
                return 'awakenExploreScene';
            case 'talk':
                return 'awakenTalkScene';
        }
    },
};

const awakenExploreScene = {
    name: 'awakenExploreScene',
    description: [
        "You walk explore the mysterious forest.",
        "Your mind seeks the way through the dream.",
        "As you walk, you discover ancient ruins and hidden pathways.",
    ],
    choices: [
        { name: "Enter the ruins", value: "enterRuins" },
        { name: "Follow the hidden path", value: "followPath" }
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'enterRuins':
                return 'enterRuinsScene';
            case 'followPath':
                return 'followPathScene';
        }
    }
};

const awakenTalkScene = {
    name: 'awakenTalkScene',
    description: [
        "You attempt to communicate with the ancient trees,",
        "placing your hands on their trunks, asking them to speak.",
        "They say, " + chalk.yellow("'We will speak softly of forgotten secrets...'"),
    ],
    choices: [
        { name: "Ask about the forest's history", value: "askHistory" },
        { name: "Inquire about magical knowledge", value: "askMagic" }
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'askHistory':
                return 'askHistoryScene';
            case 'askMagic':
                return 'askMagicScene';
        }
    }
};

export {
    awakenScene,
    awakenExploreScene,
    awakenTalkScene
};