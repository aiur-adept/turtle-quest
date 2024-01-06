const { crowDream, bearDream, fishDream } = require('../dream/index.js');

const dreamScene = {
    name: 'dreamScene',
    description: [
        "You close your eyes, letting the world fade away as you enter a dreamlike state.",
        "In this realm of ethereal possibilities, your spirit feels it can dream as an animal..."
    ],
    isDream: true,
    choices: [
        { name: "Dream as a Crow", value: "crowDreamScene" },
        { name: "Dream as a Bear", value: "bearDreamScene" },
        { name: "Dream as a Fish", value: "fishDreamScene" },
        { name: "Return to waking life", value: null },
    ]
};

const crowDreamScene = {
    name: 'crowDreamScene',
    description: (self, state) => {
        const randomSight = crowDream.sights[Math.floor(Math.random() * crowDream.sights.length)];
        return [
            `You take on the perspective of a crow, soaring through the enchanted forest.`,
            randomSight,
            "The dreamworld beckons with mysteries.",
            "What will you do?",
        ];
    },
    isDream: true,
    choices: [
        { name: "Continue Dreaming as a Crow", value: "crowDreamScene" },
        { name: "Interact with the World", value: "crowInteractScene" },
    ],
    onEnd: (self, state, action) => {
        state.dreaming = Math.max(0, state.dreaming - 1);
    }
};

const bearDreamScene = {
    name: 'bearDreamScene',
    description: (self, state) => {
        const randomSight = bearDream.sights[Math.floor(Math.random() * bearDream.sights.length)];
        return [
            `You embody the spirit of a bear, ambling through the enchanted forest.`,
            randomSight,
            "The dreamworld unfolds its secrets before you.",
            "What will you do?",
        ];
    },
    isDream: true,
    choices: [
        { name: "Continue Dreaming as a Bear", value: "bearDreamScene" },
        { name: "Interact with the World", value: "bearInteractScene" },
    ],
    onEnd: (self, state, action) => {
        state.dreaming = Math.max(0, state.dreaming - 1);
    }
};

const fishDreamScene = {
    name: 'fishDreamScene',
    description: (self, state) => {
        const randomSight = fishDream.sights[Math.floor(Math.random() * fishDream.sights.length)];
        return [
            `You become one with a river-dwelling fish, gliding through the mystical waters.`,
            randomSight,
            "The dreamworld beneath the surface holds untold wonders.",
            "What will you do?",
        ];
    },
    isDream: true,
    choices: [
        { name: "Continue Dreaming as a Fish", value: "fishDreamScene" },
        { name: "Interact with the World", value: "fishInteractScene" },
    ],
    onEnd: (self, state, action) => {
        state.dreaming = Math.max(0, state.dreaming - 1);
    }
};

const crowInteractScene = {
    name: 'crowInteractScene',
    description: (self, state) => {
        const randomInteraction = crowDream.interactions[Math.floor(Math.random() * crowDream.interactions.length)];
        return [
            "You decide to interact with the dreamworld as a crow.",
            `The dreamworld responds with: "${randomInteraction}"`,
            "What will you do next?",
        ];
    },
    choices: [
        { name: "Continue Dreaming as a Crow", value: "crowDreamScene" },
        { name: "Return to the Forest", value: null },
    ]
};

const bearInteractScene = {
    name: 'bearInteractScene',
    description: (self, state) => {
        const randomInteraction = bearDream.interactions[Math.floor(Math.random() * bearDream.interactions.length)];
        return [
            "You choose to interact with the dreamworld as a bear.",
            `The dreamworld responds with: "${randomInteraction}"`,
            "What will you do next?",
        ]; from
    },
    choices: [
        { name: "Continue Dreaming as a Bear", value: "bearDreamScene" },
        { name: "Return to the Forest", value: null },
    ]
};

const fishInteractScene = {
    name: 'fishInteractScene',
    description: (self, state) => {
        const randomInteraction = fishDream.interactions[Math.floor(Math.random() * fishDream.interactions.length)];
        return [
            "You decide to interact with the dreamworld as a fish.",
            `The dreamworld responds with: "${randomInteraction}"`,
            "What will you do next?",
        ];
    },
    choices: [
        { name: "Continue Dreaming as a Fish", value: "fishDreamScene" },
        { name: "Return to the Forest", value: null },
    ]
};

module.exports = {
    dreamScene,
    crowDreamScene,
    bearDreamScene,
    fishDreamScene,
    crowInteractScene,
    bearInteractScene,
    fishInteractScene,
};
