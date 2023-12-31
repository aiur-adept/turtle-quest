import chalk from 'chalk';

const awaken_enterScene = {
    name: 'awaken_enterScene',
    description: [
        "You awaken in a mysterious forest.",
        "The air is enchanted with much memory.",
        "You hear faintly the leaves in the canopy dancing.",
    ],
    choices: [
        { name: "Explore", value: "awaken_exploreScene" },
        { name: "Talk to the trees", value: "awaken_talkScene" },
    ]
};

const awaken_exploreScene = {
    name: 'awaken_exploreScene',
    description: [
        "You walk, exploring the mysterious forest.",
        "Your mind seeks the way through the dream.",
        "As you walk, you see a vinegrown doorway to ancient ruins,",
        "And you sense hidden pathways.",
    ],
    choices: [
        { name: "Enter the ruins", value: "ruins_enterScene" },
        { name: "Follow the hidden path", value: "path_enterScene" },
        { name: "Talk to the trees", value: "awaken_talkScene" },
    ]
};

const awaken_talkScene = {
    name: 'awaken_talkScene',
    description: [
        "You attempt to communicate with the ancient trees,",
        "placing your hands on their trunks, asking them to speak.",
        "They say, " + chalk.yellow("'We will speak softly of forgotten secrets...'"),
    ],
    choices: [
        { name: "Ask about the forest's history", value: "trees_askHistoryScene" },
        { name: "Inquire about magical knowledge", value: "trees_askMagicScene" }
    ]
};

export {
    awaken_enterScene,
    awaken_exploreScene,
    awaken_talkScene
};