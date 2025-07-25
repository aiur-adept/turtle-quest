const path_enterScene = {
    name: 'path_enterScene',
    locationCrumb: 'hidden_forest',
    description: (self, state) => {
        const msgs = [
            "You step onto a path that wasn't there before,",
            "A subtle trail of moonlight on the forest floor.",
            "The trees seem to whisper ancient secrets as you pass.",
            "The air shimmers with an otherworldly quality."
        ];
        if (Math.random() < 0.5) {
            msgs.push("You notice strange symbols carved into the bark of nearby trees.");
        }
        return msgs;
    },
    choices: [
        { name: "Follow the path deeper", value: "path_deepForestScene" },
        { name: "Investigate the symbols", value: "path_symbolsScene" },
        { name: "Return to the main forest", value: "awaken_exploreScene" }
    ]
};

const path_deepForestScene = {
    name: 'path_deepForestScene',
    description: (self, state) => {
        const adjectives = ['ethereal', 'timeless', 'enchanted'];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        
        const msgs = [
            `The path leads you deeper into the ${adjective} forest.`,
            "The canopy above filters the light into dancing patterns.",
            "You feel a sense of ancient wisdom surrounding you."
        ];
        
        if (Math.random() < 0.4) {
            msgs.push("A gentle breeze carries the scent of unknown flowers.");
        }
        
        return msgs;
    },
    choices: (self, state) => {
        const choices = [
            { name: "Continue along the path", value: "path_clearingScene" },
            { name: "Return to the path entrance", value: "path_enterScene" }
        ];
        
        if (Math.random() < 0.3) {
            choices.push({ name: "Enter the misty grove", value: "path_mistyGroveScene" });
        }
        
        return choices;
    }
};

const path_symbolsScene = {
    name: 'path_symbolsScene',
    description: [
        "You examine the symbols carved into the tree bark.",
        "They seem to tell a story of the forest's creation,",
        "Of ancient beings who shaped this place with their dreams.",
        "The symbols glow faintly as you touch them."
    ],
    choices: [
        { name: "Follow the path deeper", value: "path_deepForestScene" },
        { name: "Return to the main forest", value: "awaken_exploreScene" }
    ],
    onEnd: (self, state, action) => {
        state.auras.add('ancient_knowledge');
    }
};

const path_clearingScene = {
    name: 'path_clearingScene',
    description: (self, state) => {
        const msgs = [
            "The path opens into a circular clearing,",
            "Where moonlight pools like liquid silver.",
            "In the center stands a single, ancient tree,",
            "Its branches reaching toward the stars."
        ];
        
        if (state.auras && state.auras.has('ancient_knowledge')) {
            msgs.push("The tree seems to recognize your newfound knowledge.");
        }
        
        return msgs;
    },
    choices: [
        { name: "Approach the ancient tree", value: "path_ancientTreeScene" },
        { name: "Continue beyond the clearing", value: "path_beyondClearingScene" },
        { name: "Return along the path", value: "path_deepForestScene" }
    ]
};

const path_mistyGroveScene = {
    name: 'path_mistyGroveScene',
    description: [
        "You step into a grove where mist curls around your feet.",
        "The air is thick with the scent of moss and earth.",
        "Strange lights dance between the trees,",
        "Leading you toward something hidden in the mist."
    ],
    choices: [
        { name: "Follow the lights", value: "path_lightsScene" },
        { name: "Return to the main path", value: "path_deepForestScene" }
    ]
};

const path_lightsScene = {
    name: 'path_lightsScene',
    description: [
        "The lights lead you to a small pool of crystal-clear water.",
        "Its surface reflects the stars above perfectly.",
        "You feel a deep sense of peace here,",
        "As if time itself has slowed to a gentle flow."
    ],
    choices: [
        { name: "Look into the water", value: "path_waterReflectionScene" },
        { name: "Return to the misty grove", value: "path_mistyGroveScene" }
    ]
};

const path_waterReflectionScene = {
    name: 'path_waterReflectionScene',
    description: [
        "As you gaze into the water, you see not your reflection,",
        "But scenes from other times and places.",
        "The water shows you glimpses of the forest's past,",
        "And perhaps hints of its future."
    ],
    choices: [
        { name: "Return to the pool", value: "path_lightsScene" },
        { name: "Continue your journey", value: "path_beyondClearingScene" }
    ],
    onEnd: (self, state, action) => {
        state.auras.add('foresight');
    }
};

const path_ancientTreeScene = {
    name: 'path_ancientTreeScene',
    description: (self, state) => {
        const msgs = [
            "You approach the ancient tree and place your hand on its trunk.",
            "A deep, resonant voice speaks directly into your mind:",
            "'Welcome, seeker. What wisdom do you seek?'"
        ];
        
        if (state.auras && state.auras.has('ancient_knowledge')) {
            msgs.push("The tree acknowledges your connection to the ancient symbols.");
        }
        
        return msgs;
    },
    choices: [
        { name: "Ask about the forest's secrets", value: "path_treeWisdomScene" },
        { name: "Ask about your journey", value: "path_treeJourneyScene" },
        { name: "Step back from the tree", value: "path_clearingScene" }
    ]
};

const path_treeWisdomScene = {
    name: 'path_treeWisdomScene',
    description: [
        "The tree's voice echoes through your mind:",
        "'The forest remembers all who have walked its paths.",
        "Every step you take has been taken before,",
        "And will be taken again. Seek not the destination,",
        "But the journey itself.'"
    ],
    choices: [
        { name: "Ask about your journey", value: "path_treeJourneyScene" },
        { name: "Step back from the tree", value: "path_clearingScene" }
    ],
    onEnd: (self, state, action) => {
        state.auras.add('forest_wisdom');
    }
};

const path_treeJourneyScene = {
    name: 'path_treeJourneyScene',
    description: [
        "The ancient tree speaks again:",
        "'Your path is your own, yet connected to all paths.",
        "The ruins hold ancient knowledge,",
        "But the forest holds the wisdom of growth and change.",
        "Choose your way with care.'"
    ],
    choices: [
        { name: "Ask about the forest's secrets", value: "path_treeWisdomScene" },
        { name: "Step back from the tree", value: "path_clearingScene" }
    ]
};

const path_beyondClearingScene = {
    name: 'path_beyondClearingScene',
    description: (self, state) => {
        const msgs = [
            "Beyond the clearing, the path continues,",
            "Leading you toward the distant ruins.",
            "The forest seems to guide your steps,",
            "As if it knows where you need to go."
        ];
        
        if (state.auras && state.auras.has('forest_wisdom')) {
            msgs.push("The path feels more familiar now, as if you've walked it in dreams.");
        }
        
        return msgs;
    },
    choices: [
        { name: "Continue to the ruins", value: "ruins_enterScene" },
        { name: "Return to the clearing", value: "path_clearingScene" },
        { name: "Return to the main forest", value: "awaken_exploreScene" }
    ]
};

module.exports = {
    path_enterScene,
    path_deepForestScene,
    path_symbolsScene,
    path_clearingScene,
    path_mistyGroveScene,
    path_lightsScene,
    path_waterReflectionScene,
    path_ancientTreeScene,
    path_treeWisdomScene,
    path_treeJourneyScene,
    path_beyondClearingScene
}; 