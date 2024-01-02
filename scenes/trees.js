import chalk from 'chalk';

const trees_talkEnterScene = {
    name: 'awaken_talkScene',
    description: [
        "You attempt to communicate with the ancient trees,",
        "placing your hands on their trunks, asking them to speak.",
        "They say, " + chalk.yellow("'We will speak softly of forgotten secrets...'"),
    ],
    stack: true,
    choices: [
        { name: "Ask about the forest's history", value: "trees_askHistoryScene" },
        { name: "Inquire about magical knowledge", value: "trees_askMagicScene" },
        { name: "Return to your surroundings", value: null },
    ]
};

const trees_askHistoryScene = {
    name: 'trees_askHistoryScene',
    description: [
        chalk.yellow("'In the beginning, there were the seedlings, first to awaken...'"),
        chalk.yellow("'Then the long years of many turnings of the sky-wheel...'"),
        chalk.yellow("'And then the burning of the canopy, which made this forest...'"),

    ],
    choices: [
        { name: "Ask about the seedlings", value: "trees_askSeedlingsScene" },
        { name: "Ask about the long years", value: "trees_askLongYearsScene" },
        { name: "Ask about the canopy", value: "trees_askCanopyScene" },
    ]
};

const trees_askSeedlingsScene = {
    name: 'trees_askSeedlingsScene',
    ephemeral: true,
    description: [
        chalk.yellow("'...'")
    ]
};

const trees_askLongYearsScene = {
    name: 'trees_askLongYearsScene',
    ephemeral: true,
    description: [
        chalk.yellow("'...'")
    ]
};

const trees_askCanopyScene = {
    name: 'trees_askCanopyScene',
    ephemeral: true,
    description: [
        chalk.yellow("'...'")
    ]
};

const trees_askMagicScene = {
    name: 'trees_askMagicScene',
    ephemeral: true,
    description: [
        chalk.yellow("'...'")
    ]
};

export {
    trees_talkEnterScene,

    trees_askHistoryScene,
    trees_askSeedlingsScene,
    trees_askLongYearsScene,
    trees_askCanopyScene,

    trees_askMagicScene
};