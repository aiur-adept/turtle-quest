const ruins_enterScene = {
    name: 'ruins_enterScene',
    locationCrumb: 'ruins',
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
    description: (self, state) => {
        const msgs = [
            "You return to the entrance to the ruins. Soft light provides",
            "The barest illumination, and you can see the walls are carved",
            "With many strange glyphs. You see a blue doorway and a red doorway."
        ];
        if (Math.random() < 0.33) {
            state.extraSense = true;
            msgs.push("And you sense a hidden pathway as well.");
        }
        return msgs;
    },
    choices: (self, state) => {
        const choices = [
            { name: "Enter the blue doorway", value: "ruins_blueDoorway_EnterScene" },
            { name: "Enter the red doorway", value: "ruins_redDoorway_EnterScene" },
            { name: "Return to the forest", value: "awaken_exploreScene" }
        ];
        if (state.extraSense) {
            choices.push({ name: "Follow the hidden path", value: "ruins_hiddenPath_EnterScene" });
        }
        return choices;
    }
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
        "Mystery and manifestations arise from the same source...",
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
        "Returning to the source is completion and wholeness...",
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
    description: (self, state) => {
        const msgs = [
            "You pass through a veil in space, a shimmering curtain of dreams,",
            "And enter the hidden pathway through the ruins.",
            "The air here is thick with ancient magic,",
            "And the walls seem to pulse with their own inner light."
        ];
        
        if (Math.random() < 0.4) {
            msgs.push("You hear distant echoes of voices speaking in forgotten tongues.");
        }
        
        return msgs;
    },
    choices: [
        { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" },
        { name: "Take the right branch", value: "ruins_hiddenPathRightScene" },
        { name: "Follow the central passage", value: "ruins_hiddenPathCenterScene" }
    ]
};

const ruins_hiddenPathLeftScene = {
    name: 'ruins_hiddenPathLeftScene',
    description: (self, state) => {
        const msgs = [
            "You follow the hidden path as it branches to the left.",
            "The passage narrows and the air grows cooler.",
            "Ancient runes glow faintly along the walls,",
            "Telling stories of those who walked these halls long ago."
        ];
        
        if (Math.random() < 0.5) {
            msgs.push("A gentle breeze carries the scent of old parchment and ink.");
        }
        
        return msgs;
    },
    choices: (self, state) => {
        const possibilities = [
            { name: "Take the right branch", value: "ruins_hiddenPathRightScene" },
            { name: "Follow the central passage", value: "ruins_hiddenPathCenterScene" }
        ];
        
        if (Math.random() < 0.4) {
            possibilities.push(
                { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" }
            );
        }
        
        if (Math.random() < 0.25) {
            possibilities.push(
                { name: "Enter through the friendship gateway", value: "ruins_hiddenPathGatewayScene" }
            );
        }
        
        return possibilities;
    }
};

const ruins_hiddenPathRightScene = {
    name: 'ruins_hiddenPathRightScene',
    description: (self, state) => {
        const msgs = [
            "You follow the hidden path as it branches to the right.",
            "The passage widens and you hear the sound of flowing water.",
            "Crystal formations sparkle in the walls,",
            "Reflecting light in patterns that seem to dance."
        ];
        
        if (Math.random() < 0.4) {
            msgs.push("The air here feels charged with ancient energy.");
        }
        
        return msgs;
    },
    choices: (self, state) => {
        const possibilities = [
            { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" },
            { name: "Follow the central passage", value: "ruins_hiddenPathCenterScene" }
        ];
        
        if (Math.random() < 0.4) {
            possibilities.push(
                { name: "Take the right branch", value: "ruins_hiddenPathRightScene" }
            );
        }
        
        if (Math.random() < 0.3) {
            possibilities.push(
                { name: "Investigate the crystal formations", value: "ruins_hiddenPathCrystalScene" }
            );
        }
        
        return possibilities;
    }
};

const ruins_hiddenPathCenterScene = {
    name: 'ruins_hiddenPathCenterScene',
    description: (self, state) => {
        const msgs = [
            "You follow the central passage, which leads to a grand chamber.",
            "The ceiling soars high above, supported by pillars of ancient stone.",
            "In the center of the room stands a pedestal,",
            "Upon which rests an ancient tome bound in leather."
        ];
        
        if (Math.random() < 0.5) {
            msgs.push("The air here feels heavy with the weight of forgotten knowledge.");
        }
        
        return msgs;
    },
    choices: [
        { name: "Examine the ancient tome", value: "ruins_hiddenPathTomeScene" },
        { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" },
        { name: "Take the right branch", value: "ruins_hiddenPathRightScene" }
    ]
};

const ruins_hiddenPathTomeScene = {
    name: 'ruins_hiddenPathTomeScene',
    description: [
        "You approach the ancient tome and carefully open its pages.",
        "The text is written in a script you cannot read,",
        "But as you touch the pages, knowledge flows into your mind.",
        "You learn of ancient secrets and forgotten wisdom."
    ],
    choices: [
        { name: "Return to the central chamber", value: "ruins_hiddenPathCenterScene" },
        { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" },
        { name: "Take the right branch", value: "ruins_hiddenPathRightScene" }
    ],
    onEnd: (self, state, action) => {
        state.auras.add('ancient_wisdom');
    }
};

const ruins_hiddenPathCrystalScene = {
    name: 'ruins_hiddenPathCrystalScene',
    description: (self, state) => {
        const msgs = [
            "You examine the crystal formations more closely.",
            "They seem to pulse with inner light,",
            "And as you touch them, visions flash through your mind."
        ];
        
        if (state.auras && state.auras.has('ancient_wisdom')) {
            msgs.push("The crystals resonate with your newfound knowledge.");
        }
        
        return msgs;
    },
    choices: [
        { name: "Return to the right branch", value: "ruins_hiddenPathRightScene" },
        { name: "Take the left branch", value: "ruins_hiddenPathLeftScene" },
        { name: "Follow the central passage", value: "ruins_hiddenPathCenterScene" }
    ],
    onEnd: (self, state, action) => {
        state.auras.add('crystal_insight');
    }
};

const ruins_hiddenPathGatewayScene = {
    name: 'ruins_hiddenPathGatewayScene',
    description: [
        "You pass through the hidden doorway, and as you do,",
        "The voice of a woman speaks into your mind. She speaks,",
        "You shall find what you seek...",
        "You pass through shade and curling incense smoke",
        "And hear the sound of the moon rising beyond the horizon",
        "And far above you a musical flute plays. You then awaken",
        "In a magical forest. You notice a book in your pocket."
    ],
    choices: [
        { name: "Explore", value: "awaken_exploreScene" },
        { name: "Talk to the trees", value: "trees_talkEnterScene" },
    ],
    onEnd: (self, state, action) => {
        state.inventory['diamondSutra'] = 1;
    }
};


module.exports = {
    ruins_enterScene,
    ruins_foyerScene,

    ruins_blueDoorway_EnterScene,
    ruins_readBlueBookScene,

    ruins_redDoorway_EnterScene,
    ruins_readRedBookScene,

    ruins_hiddenPath_EnterScene,
    ruins_hiddenPathLeftScene,
    ruins_hiddenPathRightScene,
    ruins_hiddenPathCenterScene,
    ruins_hiddenPathTomeScene,
    ruins_hiddenPathCrystalScene,
    ruins_hiddenPathGatewayScene
}