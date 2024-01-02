import chalk from 'chalk';

const ruins_enterScene = {
    name: 'ruins_enterScene',
    description: [
        "You pass beneath the stone gateway, brushed by overgrown vines.",
        "The air is cool and a fresh wind from outside blows inward.",
        "As you walk, the light fades to grey, never quite going out.",
        "You come to a blue doorway and a green doorway"
    ],
    choices: [
        { name: "Enter the blue doorway", value: "ruins_blueDoorway_EnterScene" },
        { name: "Enter the red doorway", value: "ruins_redDoorway_EnterScene" },
        { name: "Return to the forest", value: "awaken_exploreScene" }
    ]
};

const ruins_foyerScene = {
    name: 'ruins_foyerScene',
    description: [
        "You return to the entrance to the ruins. Soft light provides",
        "The barest illumination. You see a blue doorway and a red doorway,",
        "And you sense a hidden pathway as well."
    ],
    choices: [
        { name: "Enter the blue doorway", value: "ruins_blueDoorway_EnterScene" },
        { name: "Enter the red doorway", value: "ruins_redDoorway_EnterScene" },
        { name: "Follow the hidden path", value: "ruins_hiddenPath_EnterScene" },
        { name: "Return to the forest", value: "awaken_exploreScene" }

    ]
};

const ruins_blueDoorway_EnterScene = {
    name: 'ruins_blueDoorway_EnterScene',
    description: [
        "You pass through the blue doorway, and as you do,",
        "The scent of lavender arises in your mind. The door plays a",
        "Musical theme like a flute from an ancient time. You find",
        "Yourself in a circular chamber with soft illumination from",
        "A skylight far above in the vaulted ceiling. A book is on",
        "A stone table in the center of the room."
    ],
    choices: [
        { name: "Read the book", value: "ruins_readBlueBookScene" },
        { name: "Return through the blue doorway", value: "ruins_foyerScene" }
    ]
};

const ruins_readBlueBookScene = {
    name: 'ruins_readBlueBookScene',
    description: [
        "You approach the blue book and read from it, noticing",
        "It's actually made of blue jade and has only one page visible.",
        "It reads:",
        chalk.blue("Mystery and manifestations arise from the same source..."),
        "You feel serenity at these words."
    ],
    choices: [
        { name: "Return through the blue doorway", value: "ruins_foyerScene" }
    ],
    onEnd: (self, state, action) => {
        state.auras.add('serenity');
    }
};

const ruins_redDoorway_EnterScene = {
    name: 'ruins_redDoorway_EnterScene',
    description: [
        "You pass through the red doorway, and as you do,",
        "The scent of mint arises in your mind. The door plays a",
        "Musical theme like a harp from an ancient time. You find",
        "Yourself in a hexagonal chamber with soft illumination from",
        "A moonlight far above in the arched ceiling. A book is on",
        "A stone table in the center of the room."
    ],
    choices: [
        { name: "Read the book", value: "ruins_readRedBookScene" },
        { name: "Return through the red doorway", value: "ruins_foyerScene" }
    ]
};

const ruins_readRedBookScene = {
    name: 'ruins_readRedBookScene',
    description: [
        "You approach the red book and read from it, noticing",
        "It's actually made of red granite and has only one page visible.",
        "It reads:",
        chalk.red("Returning to the source is completion and wholeness..."),
        "You feel safety at these words."
    ],
    choices: [
        { name: "Return through the red doorway", value: "ruins_foyerScene" }
    ],
    onEnd: (self, state, action) => {
        state.auras.add('safety');
    }
};

const ruins_hiddenPath_EnterScene = {
    name: 'ruins_hiddenPath_EnterScene',
    description: [
        "You pass through a veil in space, a shimmering curtain of dreams,",
        "And enter the hidden pathway through the ruins. It takes you through",
        "Many branching passages."
    ],
    choices: [
        { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" },
        { name: "Take the right branch", value: "ruins_hiddenPathRightScene" },

    ]
};

const ruins_hiddenPathLeftScene = {
    name: 'ruins_hiddenPathLeftScene',
    description: [
        "You follow the hidden path as it branches to the left.",
    ],
    choices: [],
    choiceFunc: (state) => {
        const possibilities = [
            { name: "Take the right branch", value: "ruins_hiddenPathRightScene" },
        ]
        if (Math.random() < 0.5) {
            possibilities.push(
                { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" }
            );
        }
        if (Math.random() < 0.33) {
            possibilities.push(
                { name: "Enter through the friendship gateway", value: "ruins_hiddenPathGatewayScene" }
            );
        }
        return possibilities;
    }
};

const ruins_hiddenPathRightScene = {
    name: 'ruins_hiddenPathRightScene',
    description: [
        "You follow the hidden path as it branches to the right.",

    ],
    choices: [],
    choiceFunc: (state) => {
        const possibilities = [
            { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" },
        ]
        if (Math.random() < 0.5) {
            possibilities.push(
                { name: "Take the right branch", value: "ruins_hiddenPathRightScene" }
            );
        }
        return possibilities;
    }
};

const ruins_hiddenPathGatewayScene = {
    name: 'ruins_hiddenPathGatewayScene',
    description: [
        "You pass through the hidden doorway, and as you do,",
        "The voice of a woman speaks into your mind. She speaks,",
        chalk.yellow("You shall find what you seek..."),
        "You pass through shade and curling incense smoke",
        "And hear the sound of the moon rising beyond the horizon",
        "And far above you a musical flute plays. You then awaken",
        "In a magical forest. You notice a book in your pocket."
    ],
    choices: [
        { name: "Explore", value: "awaken_exploreScene" },
        { name: "Talk to the trees", value: "awaken_talkScene" },
    ],
    onEnd: (self, state, action) => {
        state.inventory['diamondSutra'] = 1;
    }
};


export {
    ruins_enterScene,
    ruins_foyerScene,

    ruins_blueDoorway_EnterScene,
    ruins_readBlueBookScene,

    ruins_redDoorway_EnterScene,
    ruins_readRedBookScene,

    ruins_hiddenPath_EnterScene,
    ruins_hiddenPathLeftScene,
    ruins_hiddenPathRightScene,
    ruins_hiddenPathGatewayScene
}