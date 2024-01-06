(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const blackboard = {};

module.exports = {
    blackboard
};
},{}],2:[function(require,module,exports){
const { itemDescriptions } = require('./itemDescriptions.js');
const { storyTell } = require('./storyTeller.js');

const describeItem = (itemName) => {
    storyTell(itemDescriptions[itemName]);
};

module.exports = {
    describeItem
};

},{"./itemDescriptions.js":13,"./storyTeller.js":21}],3:[function(require,module,exports){
const { storyTell } = require('./storyTeller.js');
const { sleep } = require('./utils.js');

const describeScene = async (scene, state) => {
    let description = scene.description;
    // if a function, call it (it should return either an array or one line)
    if (description.apply && description.call) {
        description = description(scene, state);
    }
    // if it's an array, print each line
    if (Array.isArray(description)) {
        for (const line of description) {
            storyTell(line);
            await sleep(100);
        }
    } else {
        // or, print it simply (one line)
        storyTell(description);
    }
    await sleep(200);
};

module.exports = {
    describeScene
};
},{"./storyTeller.js":21,"./utils.js":22}],4:[function(require,module,exports){
const bearDream = {

    perspective: "I ambled through the enchanted forest, my fur brushing against the vibrant foliage as I explored the magical realm.",

    sights: [
        "Toweringly ancient trees surrounded me, their branches adorned with glowing blossoms that illuminated the shadowy groves.",
        "A gentle breeze carried the whispers of the forest, revealing the secrets hidden within the rustling leaves.",
        "Beside a tranquil stream, I discovered shimmering pools reflecting the moon and stars, creating a captivating celestial display.",
        "My journey led me to mystical portals, their surfaces shimmering with an otherworldly light, tempting me to peer into the dreamworld beyond.",
        "Through portals, I witnessed surreal landscapes – floating islands adorned with bioluminescent flora and waterfalls cascading with liquid stardust.",
    ],

    interactions: [
        "I approached a portal, feeling a tingling sensation as I touched it, briefly connecting with the dreamworld beyond.",
        "In the dreamworld, I encountered fantastical beings – luminescent fireflies that danced in intricate patterns and wise owls that shared ancient wisdom.",
        "With each interaction, the boundaries between reality and dreams blurred, creating a tapestry of enchantment and wonder.",
    ]
};

module.exports = {
    bearDream
};
},{}],5:[function(require,module,exports){
const crowDream = {

    perspective: "I soared through the enchanted forest, my ebony feathers catching the moonlight as I navigated the twisted branches and ethereal glows.",

    sights: [
        "Beneath me, ancient trees stood tall, their gnarled roots entwined with luminescent moss that pulsed with a mystical energy.",
        "A gentle breeze carried the whispers of the forest, revealing the secrets hidden within the rustling leaves.",
        "As I glided over a crystal-clear pond, the water reflected the starry sky above, creating a mirror-like surface that seemed to hold the constellations within its depths.",
        "Occasionally, I encountered shimmering portals that flickered at the edge of reality, beckoning with promises of a dreamworld beyond.",
        "Through portals, I glimpsed surreal landscapes – floating islands adorned with floating flowers, and cascading waterfalls that sparkled with liquid stardust.",
    ],

    interactions: [
        "I dipped down to touch the surface of a portal, feeling a tingling sensation as I briefly connected with the dreamworld beyond.",
        "In the dreamworld, I encountered fantastical creatures – shimmering butterflies that left trails of iridescence in their wake and talking trees that shared ancient tales.",
        "With each interaction, the boundary between reality and dreams blurred, creating a kaleidoscopic tapestry of wonder and enchantment.",
    ]
};

module.exports = {
    crowDream
};
},{}],6:[function(require,module,exports){
const fishDream = {

    perspective: "I glided through the enchanted river, scales shimmering in the moonlit waters as I explored the hidden depths of the mystical forest.",

    sights: [
        "Sunlight filtered through the water, casting a mesmerizing dance of shadows on the riverbed, revealing ancient stones adorned with mysterious runes.",
        "Aquatic plants swayed gently in the current, their vibrant colors creating a kaleidoscope of hues that mirrored the enchantment of the forest above.",
        "I navigated through a submerged archway, its entrance guarded by ethereal fish that glowed with an otherworldly light, guiding me to secret aquatic realms.",
        "Rays of moonlight penetrated the surface, creating a celestial pattern that danced upon the river's floor, as if the stars themselves were submerged in the underwater world.",
        "At the heart of the river, I discovered a mystical whirlpool, a gateway to a dreamworld where the currents whispered tales of ancient aquatic civilizations.",
    ],

    interactions: [
        "I swam into a radiant pool, feeling a surge of energy as I communed with the river's spirit, glimpsing visions of the forest's history through the ebb and flow of water.",
        "In the dreamworld beneath the surface, I encountered ethereal river spirits – graceful water nymphs who weaved tales of forgotten underwater kingdoms and offered glimpses into the future.",
        "As I approached the mystical whirlpool, I felt a pull towards the dreamworld, where schools of phosphorescent fish swirled in intricate patterns, symbolizing the interconnectedness of the river and the forest above.",
    ]
};

module.exports = {
    fishDream
};
},{}],7:[function(require,module,exports){
const { crowDream } = require('./crow.js');
const { bearDream } = require('./bear.js');
const { fishDream } = require('./fish.js');

module.exports = {
    crowDream,
    bearDream,
    fishDream
};

},{"./bear.js":4,"./crow.js":5,"./fish.js":6}],8:[function(require,module,exports){
const choiceFilter = (choices, state) => {
    // TODO: implement choice filtering by using state
    return choices;
};

module.exports = {
    choiceFilter
};
},{}],9:[function(require,module,exports){
const gameData = {
    awakenState: {
        name: 'null',
        mind: 'calm',
        inventory: {
            'heartSutra': 1,
        },
        health: 20,
        auras: new Set(),
    },
};

module.exports = {
    gameData
};
},{}],10:[function(require,module,exports){
const { describeScene } = require('./describeScene.js');
const { describeItem } = require('./describeItem.js');
const { interact } = require('./interact.js');
const { sleep } = require('./utils.js');
const { gameData } = require('./gameData.js');
const scenes = require('./scenes/index.js');
const { storyTellMeta } = require('./storyTeller.js');



const awaken = () => (
    [
        Object.assign({}, scenes.awaken_enterScene),
        Object.assign({}, gameData.awakenState)
    ]
);

async function main() {

    // begin the scene and the state
    const [firstScene, state] = awaken();
    let sceneStack = [firstScene];

    // game loop
    while (true) {
        // TODO: run global logics each loop, like a random encounter chance, or vanish state.extraSense after 3 scenes, etc.


        // consider the current scene
        // (but first, guard against zero-stack)
        if (sceneStack.length == 0) {
            sceneStack.push(awaken()[0]);
        }
        const scene = sceneStack[sceneStack.length - 1];
        console.log(scene);


        // awaken from any dream scene if state.dreaming == 0
        if (scene.isDream && state.dreaming == 0) {
            sceneStack = [scenes.awaken_enterScene];
        }

        //
        // display the scene
        //
        await describeScene(scene, state);

        //
        // interact with the scene (and get the next scene)
        //
        // the CLI interacts with the user, and the
        // user's input interacts with the scene
        // we ultimately want to know what scene is next
        // given its name as a key (every moment, we unlock
        // a magic door! <3)
        let sceneKey = null;
        // ephemeral scenes have no action, they just display their description and pop off
        if (scene.ephemeral) {
            sceneStack.pop();
            continue;
        }
        const action = await interact(scene, state);
        console.log(action);
        await sleep(200);
        switch (action) {
            case null:
                break;
            default:
                if (/.+Scene/.test(action)) {
                    // if the value of the choice was a scene name...
                    sceneKey = action;
                } else if (/describeItem_.+/.test(action)) {
                    // if the value of the choice was to describe an item...
                    const itemName = action.match(/describeItem_(.+)/)[1];
                    describeItem(itemName);
                } else {
                    console.error('unknown action ' + action);
                }
        }
        await sleep(200);

        // scene has ended, run onEnd hook
        if (scene.onEnd) {
            scene.onEnd(scene, state, action);
        }

        //
        // transition to the next scene
        //
        if (!sceneKey) {
            // if given no sceneKey, nothing is next, simply pop this scene
            sceneStack.pop();
        } else if (!scenes[sceneKey]) {
            storyTellMeta('The muses have not seen that far into the tale yet...', 'yellow');
            storyTellMeta('~~~', 'blue');
        } else {
            const nextScene = Object.assign({}, scenes[sceneKey]);
            if (nextScene.stack) {
                sceneStack.push(nextScene);
            } else {
                sceneStack[sceneStack.length - 1] = nextScene;
            }
        }
    }
}

console.log('TURTLE QUEST CONSOLE');
main();

},{"./describeItem.js":2,"./describeScene.js":3,"./gameData.js":9,"./interact.js":11,"./scenes/index.js":16,"./storyTeller.js":21,"./utils.js":22}],11:[function(require,module,exports){
const { inquire } = require('./io.js');
const { choiceFilter } = require('./filters/choice.js');

async function interact(scene, state) {
    //
    // construct choices
    //
    // copy choices with Array.from (we will mutate it)
    // (note: choices can be a function or an array or not even present)
    let choices = scene.choices ?
        ((scene.choices.call && scene.choices.apply) ?
            Array.from(scene.choices(scene, state)) :
            Array.from(scene.choices))
        : [];
    if (!scene.exclusiveChoices) {
        // add magic choice if not already in magicScene
        if (scene.name !== 'magicScene' && scene.name !== 'menuScene') {
            choices.push({ name: "Use magic", value: "magicScene" });
        }
        // add dream option if state.dreaming > 0
        if (state.dreaming > 0) {
            choices.push({ name: "Dream", value: "dreamScene" });
        }
        // add menu choice if not already in menuScene
        if (scene.name !== 'menuScene') {
            choices.push({ name: "Open menu", value: "menuScene" });
        }
    }
    // apply choiceFilter based on state
    choices = choiceFilter(choices, state);
    // if applicable, apply scene choiceFilter
    if (scene.choiceFilter) {
        choices = scene.choiceFilter(choices);
    }

    //
    // interact
    //
    // use inquirer to get actual interaction
    return inquire(choices);
}

module.exports = {
    interact
};

},{"./filters/choice.js":8,"./io.js":12}],12:[function(require,module,exports){
const consolelog = (message) => {
    const p = document.createElement('p');
    p.textContent = message;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
};

const inquire = (choices) => {
    const choicesContainer = document.getElementById('choices-container');
    return new Promise((resolve) => {
        choicesContainer.innerHTML = '';

        for (const choice of choices) {
            const value = choice.value;
            console.log(choice);
            const choiceDiv = document.createElement('div');
            choiceDiv.textContent = choice.name;
            choiceDiv.addEventListener('click', () => {
                resolve(value);
                choicesContainer.innerHTML = '';
            });
            choicesContainer.appendChild(choiceDiv);
        };
    });
};

module.exports = {
    consolelog,
    inquire
};
},{}],13:[function(require,module,exports){
const itemDescriptions = {
    'heartSutra': 'a weathered copy of the heart sutra, given to you by a friend long ago',
    'diamondSutra': 'a copy of the diamond sutra; where did it come from...?'
};

module.exports = {
    itemDescriptions
};
},{}],14:[function(require,module,exports){
const awaken_enterScene = {
    name: 'awaken_enterScene',
    description: (self, state) => {
        const locations = ['glade', 'grove', 'clearing', 'valley'];
        const location = locations[Math.floor(Math.random() * locations.length)];

        const insects = ['butterflies', 'fireflies', 'mayflies'];
        const insect = insects[Math.floor(Math.random() * insects.length)];

        const msg = [
            `You awaken${state.awakened ? ' again ' : ' '}in a mysterious forest.`,
            `You are in a ${location} where ${insect} gather`,
            "The air is enchanted with much memory.",
            "You hear faintly the leaves in the canopy dancing.",
        ];
        return msg;
    },
    onEnd: (self, state, action) => {
        state.awakened = true;
    },
    choices: [
        { name: "Explore", value: "awaken_exploreScene" },
        { name: "Talk to the trees", value: "trees_talkEnterScene" },
    ]
};

const awaken_exploreScene = {
    name: 'awaken_exploreScene',

    description: (self, state) => {
        const adjectives = ['mysterious', 'enchanted', 'ancient'];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

        const mind = state.mind;

        const msgs = [
            `You walk, exploring the ${adjective} forest.`,
            `Your mind - ${mind} - seeks the way through the dream.`,
            "As you walk, you see a vinegrown doorway to ancient ruins."
        ];
        if (Math.random() < 0.33) {
            state.extraSense = true;
            msgs.push("You also sense a hidden pathway.");
        }

        return msgs;
    },
    choices: (self, state) => {
        const choices = [
            { name: "Enter the ruins", value: "ruins_enterScene" },
            { name: "Talk to the trees", value: "trees_talkEnterScene" },
        ];
        if (state.extraSense) {
            choices.push({ name: "Follow the hidden path", value: "path_enterScene" });
        }
        return choices;
    }
};

module.exports = {
    awaken_enterScene,
    awaken_exploreScene
};
},{}],15:[function(require,module,exports){
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

},{"../dream/index.js":7}],16:[function(require,module,exports){
const {
    awaken_enterScene,
    awaken_exploreScene
} = require('./awaken.js');

const {
    dreamScene,
    crowDreamScene,
    bearDreamScene,
    fishDreamScene,
    crowInteractScene,
    bearInteractScene,
    fishInteractScene
} = require('./dream.js');

const {
    menuScene,
    viewInventoryScene,
    checkStatsScene
} = require('./menu.js');

const {
    magicScene
} = require('./magic.js');

const {
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
} = require('./ruins.js');

const {
    trees_talkEnterScene,

    trees_askHistoryScene,
    trees_askSeedlingsScene,
    trees_askLongYearsScene,
    trees_askCanopyScene,

    trees_askMagicScene
} = require('./trees.js');

module.exports = {
    awaken_enterScene,
    awaken_exploreScene,

    dreamScene,
    crowDreamScene,
    bearDreamScene,
    fishDreamScene,
    crowInteractScene,
    bearInteractScene,
    fishInteractScene,

    menuScene,
    viewInventoryScene,
    checkStatsScene,

    magicScene,

    ruins_enterScene,
    ruins_foyerScene,

    ruins_blueDoorway_EnterScene,
    ruins_readBlueBookScene,

    ruins_redDoorway_EnterScene,
    ruins_readRedBookScene,

    ruins_hiddenPath_EnterScene,
    ruins_hiddenPathLeftScene,
    ruins_hiddenPathRightScene,
    ruins_hiddenPathGatewayScene,

    trees_talkEnterScene,

    trees_askHistoryScene,
    trees_askSeedlingsScene,
    trees_askLongYearsScene,
    trees_askCanopyScene,

    trees_askMagicScene
};

},{"./awaken.js":14,"./dream.js":15,"./magic.js":17,"./menu.js":18,"./ruins.js":19,"./trees.js":20}],17:[function(require,module,exports){
const { storyTell } = require('../storyTeller.js');

const magicScene = {
    name: 'magicScene',
    description: [
        "You decide to harness the magic within you.",
        "Breathe in deeply, and breathe out enjoying calm.",
        "A wave of energy will flow through your body.",
    ],
    choices: [
        { name: "Cast a spell of protection", value: "castProtection" },
        { name: "Cast a spell of travel", value: "castTravel" },
        { name: "Cast a spell of dreaming", value: "castDream" },
        { name: "Return to the start of the tale", value: "returnStart" },
        { name: "Cast no magic", value: null }
    ],
    stack: true,
    interact: (self, state, action) => {
        let next = null;
        switch (action) {
            case 'castProtection':
                storyTell("You cast Protective Circle;");
                storyTell("A shimmering veil of aura surrounds you ~*+xo");
                break;
            case 'castTravel':
                storyTell("A little fairy appears and says, "
                    + "'TODO: ask for a travel key here...'");
                next = 'awakenScene';
                break;
            case 'castDream':
                storyTell("You imbue your mindbody with dreaming powers, enough for one dream...");
                state.dreaming = 5;
                next = null;
                break;
            case 'returnStart':
                storyTell("You cast Awaken;");
                storyTell("A magical shower covers all, and you return...");
                next = 'awaken_enterScene';
                break;
        }
        storyTell("~~~~~~~~~~~~~~~~~~*~*~*~~~~~~~~~~~~~~~~~~")
        return next;
    }
};

module.exports = {
    magicScene,
};
},{"../storyTeller.js":21}],18:[function(require,module,exports){
const { blackboard } = require('../blackboard.js');

const menuScene = {
    name: 'menuScene',
    description: "You review your options...",
    stack: true,
    choices: [
        // TODO { name: "Have a dream", value: "dream" },
        { name: "View inventory", value: "viewInventoryScene" },
        { name: "Check character stats", value: "checkStatsScene" },
        // TODO { name: "Save game", value: "saveGame" },
        { name: "Close menu", value: null }
    ],
};

const viewInventoryScene = {
    name: 'viewInventoryScene',
    description: (state) => {
        const msgs = ["You set down your pack and look through it."];
        for (const item in state.inventory) {
            msgs.push(item)
        }
        return msgs;
    },
    stack: true,
    exclusiveChoices: true,
    choices: (state) => {
        const choices = [];
        for (const item in state.inventory) {
            choices.push({ name: item, value: `describeItem_${item}` });
        }
        return choices;
    },
};

const checkStatsScene = {
    name: 'checkStatsScene',
    description: (state) => {
        const msgs = [
            'Health:',
            `  o ${state.health}`,
            'Mind:',
            `  = ${state.mind}`
        ];
        if (state.auras.size > 0) {
            msgs.push("Auras:");
            for (const aura in state.auras) {
                msgs.push(`  + ${aura}`)
            }
        }

        return msgs;
    },
    stack: true,
    ephemeral: true
};

module.exports = {
    menuScene,
    viewInventoryScene,
    checkStatsScene
};
},{"../blackboard.js":1}],19:[function(require,module,exports){
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
    choices: (self, state) => {
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
    choices: (self, state) => {
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
        "You shall find what you seek...",
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
    ruins_hiddenPathGatewayScene
}
},{}],20:[function(require,module,exports){
const trees_talkEnterScene = {
    name: 'awaken_talkScene',
    description: [
        "You communicate with the ancient trees,",
        "placing your hands on their trunks, asking them to speak.",
        "They say, " + "'We will speak softly of forgotten secrets...'",
    ],
    choices: [
        { name: "Ask about the forest's history", value: "trees_askHistoryScene" },
        { name: "Inquire about magical knowledge", value: "trees_askMagicScene" },
        { name: "Return to your surroundings", value: null },
    ]
};

const trees_askHistoryScene = {
    name: 'trees_askHistoryScene',
    description: [
        "'In the beginning, there were the seedlings, first to awaken...'",
        "'Then the long years of many turnings of the sky-wheel...'",
        "'And then the burning of the canopy, which made this forest...'",

    ],
    stack: true,
    choices: [
        { name: "Ask about the seedlings", value: "trees_askSeedlingsScene" },
        { name: "Ask about the long years", value: "trees_askLongYearsScene" },
        { name: "Ask about the canopy", value: "trees_askCanopyScene" },
        { name: "Ask something else", value: null },
    ]
};

const trees_askSeedlingsScene = {
    name: 'trees_askSeedlingsScene',
    ephemeral: true,
    stack: true,
    description: [
        "'...'",
        "'the seedlings were before us, and they are after us...'",
        "'...'"
    ]
};

const trees_askLongYearsScene = {
    name: 'trees_askLongYearsScene',
    ephemeral: true,
    stack: true,
    description: [
        "'...'",
        "'the long years were of weariness and woe...'",
        "'...'"
    ]
};

const trees_askCanopyScene = {
    name: 'trees_askCanopyScene',
    ephemeral: true,
    stack: true,
    description: [
        "'...'",
        "'the canopy aflame, alit, like torches blazing in night...'",
        "'...'"
    ]
};

const trees_askMagicScene = {
    name: 'trees_askMagicScene',
    ephemeral: true,
    stack: true,
    description: [
        "'...'",
        "'true magic can never be used for evil...'",
        "'...'"
    ]
};

module.exports = {
    trees_talkEnterScene,

    trees_askHistoryScene,
    trees_askSeedlingsScene,
    trees_askLongYearsScene,
    trees_askCanopyScene,

    trees_askMagicScene
};
},{}],21:[function(require,module,exports){
const { consolelog } = require('./io.js');

// TODO: make this work in browser
const storyTell = (line) => {
    consolelog(line);
    // TODO: use markov text (or generative AI?) to write more text in purple
};

const storyTellMeta = (line, color) => {
    consolelog(line);
};

module.exports = {
    storyTell,
    storyTellMeta
};
},{"./io.js":12}],22:[function(require,module,exports){
const sleep = (ms) => {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    })
}

module.exports = {
    sleep
};
},{}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJibGFja2JvYXJkLmpzIiwiZGVzY3JpYmVJdGVtLmpzIiwiZGVzY3JpYmVTY2VuZS5qcyIsImRyZWFtL2JlYXIuanMiLCJkcmVhbS9jcm93LmpzIiwiZHJlYW0vZmlzaC5qcyIsImRyZWFtL2luZGV4LmpzIiwiZmlsdGVycy9jaG9pY2UuanMiLCJnYW1lRGF0YS5qcyIsImluZGV4LmpzIiwiaW50ZXJhY3QuanMiLCJpby5qcyIsIml0ZW1EZXNjcmlwdGlvbnMuanMiLCJzY2VuZXMvYXdha2VuLmpzIiwic2NlbmVzL2RyZWFtLmpzIiwic2NlbmVzL2luZGV4LmpzIiwic2NlbmVzL21hZ2ljLmpzIiwic2NlbmVzL21lbnUuanMiLCJzY2VuZXMvcnVpbnMuanMiLCJzY2VuZXMvdHJlZXMuanMiLCJzdG9yeVRlbGxlci5qcyIsInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBibGFja2JvYXJkID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJsYWNrYm9hcmRcbn07IiwiY29uc3QgeyBpdGVtRGVzY3JpcHRpb25zIH0gPSByZXF1aXJlKCcuL2l0ZW1EZXNjcmlwdGlvbnMuanMnKTtcbmNvbnN0IHsgc3RvcnlUZWxsIH0gPSByZXF1aXJlKCcuL3N0b3J5VGVsbGVyLmpzJyk7XG5cbmNvbnN0IGRlc2NyaWJlSXRlbSA9IChpdGVtTmFtZSkgPT4ge1xuICAgIHN0b3J5VGVsbChpdGVtRGVzY3JpcHRpb25zW2l0ZW1OYW1lXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmliZUl0ZW1cbn07XG4iLCJjb25zdCB7IHN0b3J5VGVsbCB9ID0gcmVxdWlyZSgnLi9zdG9yeVRlbGxlci5qcycpO1xuY29uc3QgeyBzbGVlcCB9ID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG5jb25zdCBkZXNjcmliZVNjZW5lID0gYXN5bmMgKHNjZW5lLCBzdGF0ZSkgPT4ge1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IHNjZW5lLmRlc2NyaXB0aW9uO1xuICAgIC8vIGlmIGEgZnVuY3Rpb24sIGNhbGwgaXQgKGl0IHNob3VsZCByZXR1cm4gZWl0aGVyIGFuIGFycmF5IG9yIG9uZSBsaW5lKVxuICAgIGlmIChkZXNjcmlwdGlvbi5hcHBseSAmJiBkZXNjcmlwdGlvbi5jYWxsKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24oc2NlbmUsIHN0YXRlKTtcbiAgICB9XG4gICAgLy8gaWYgaXQncyBhbiBhcnJheSwgcHJpbnQgZWFjaCBsaW5lXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRpb24pKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgc3RvcnlUZWxsKGxpbmUpO1xuICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9yLCBwcmludCBpdCBzaW1wbHkgKG9uZSBsaW5lKVxuICAgICAgICBzdG9yeVRlbGwoZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICBhd2FpdCBzbGVlcCgyMDApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpYmVTY2VuZVxufTsiLCJjb25zdCBiZWFyRHJlYW0gPSB7XG5cbiAgICBwZXJzcGVjdGl2ZTogXCJJIGFtYmxlZCB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgZm9yZXN0LCBteSBmdXIgYnJ1c2hpbmcgYWdhaW5zdCB0aGUgdmlicmFudCBmb2xpYWdlIGFzIEkgZXhwbG9yZWQgdGhlIG1hZ2ljYWwgcmVhbG0uXCIsXG5cbiAgICBzaWdodHM6IFtcbiAgICAgICAgXCJUb3dlcmluZ2x5IGFuY2llbnQgdHJlZXMgc3Vycm91bmRlZCBtZSwgdGhlaXIgYnJhbmNoZXMgYWRvcm5lZCB3aXRoIGdsb3dpbmcgYmxvc3NvbXMgdGhhdCBpbGx1bWluYXRlZCB0aGUgc2hhZG93eSBncm92ZXMuXCIsXG4gICAgICAgIFwiQSBnZW50bGUgYnJlZXplIGNhcnJpZWQgdGhlIHdoaXNwZXJzIG9mIHRoZSBmb3Jlc3QsIHJldmVhbGluZyB0aGUgc2VjcmV0cyBoaWRkZW4gd2l0aGluIHRoZSBydXN0bGluZyBsZWF2ZXMuXCIsXG4gICAgICAgIFwiQmVzaWRlIGEgdHJhbnF1aWwgc3RyZWFtLCBJIGRpc2NvdmVyZWQgc2hpbW1lcmluZyBwb29scyByZWZsZWN0aW5nIHRoZSBtb29uIGFuZCBzdGFycywgY3JlYXRpbmcgYSBjYXB0aXZhdGluZyBjZWxlc3RpYWwgZGlzcGxheS5cIixcbiAgICAgICAgXCJNeSBqb3VybmV5IGxlZCBtZSB0byBteXN0aWNhbCBwb3J0YWxzLCB0aGVpciBzdXJmYWNlcyBzaGltbWVyaW5nIHdpdGggYW4gb3RoZXJ3b3JsZGx5IGxpZ2h0LCB0ZW1wdGluZyBtZSB0byBwZWVyIGludG8gdGhlIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIlRocm91Z2ggcG9ydGFscywgSSB3aXRuZXNzZWQgc3VycmVhbCBsYW5kc2NhcGVzIOKAkyBmbG9hdGluZyBpc2xhbmRzIGFkb3JuZWQgd2l0aCBiaW9sdW1pbmVzY2VudCBmbG9yYSBhbmQgd2F0ZXJmYWxscyBjYXNjYWRpbmcgd2l0aCBsaXF1aWQgc3RhcmR1c3QuXCIsXG4gICAgXSxcblxuICAgIGludGVyYWN0aW9uczogW1xuICAgICAgICBcIkkgYXBwcm9hY2hlZCBhIHBvcnRhbCwgZmVlbGluZyBhIHRpbmdsaW5nIHNlbnNhdGlvbiBhcyBJIHRvdWNoZWQgaXQsIGJyaWVmbHkgY29ubmVjdGluZyB3aXRoIHRoZSBkcmVhbXdvcmxkIGJleW9uZC5cIixcbiAgICAgICAgXCJJbiB0aGUgZHJlYW13b3JsZCwgSSBlbmNvdW50ZXJlZCBmYW50YXN0aWNhbCBiZWluZ3Mg4oCTIGx1bWluZXNjZW50IGZpcmVmbGllcyB0aGF0IGRhbmNlZCBpbiBpbnRyaWNhdGUgcGF0dGVybnMgYW5kIHdpc2Ugb3dscyB0aGF0IHNoYXJlZCBhbmNpZW50IHdpc2RvbS5cIixcbiAgICAgICAgXCJXaXRoIGVhY2ggaW50ZXJhY3Rpb24sIHRoZSBib3VuZGFyaWVzIGJldHdlZW4gcmVhbGl0eSBhbmQgZHJlYW1zIGJsdXJyZWQsIGNyZWF0aW5nIGEgdGFwZXN0cnkgb2YgZW5jaGFudG1lbnQgYW5kIHdvbmRlci5cIixcbiAgICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBiZWFyRHJlYW1cbn07IiwiY29uc3QgY3Jvd0RyZWFtID0ge1xuXG4gICAgcGVyc3BlY3RpdmU6IFwiSSBzb2FyZWQgdGhyb3VnaCB0aGUgZW5jaGFudGVkIGZvcmVzdCwgbXkgZWJvbnkgZmVhdGhlcnMgY2F0Y2hpbmcgdGhlIG1vb25saWdodCBhcyBJIG5hdmlnYXRlZCB0aGUgdHdpc3RlZCBicmFuY2hlcyBhbmQgZXRoZXJlYWwgZ2xvd3MuXCIsXG5cbiAgICBzaWdodHM6IFtcbiAgICAgICAgXCJCZW5lYXRoIG1lLCBhbmNpZW50IHRyZWVzIHN0b29kIHRhbGwsIHRoZWlyIGduYXJsZWQgcm9vdHMgZW50d2luZWQgd2l0aCBsdW1pbmVzY2VudCBtb3NzIHRoYXQgcHVsc2VkIHdpdGggYSBteXN0aWNhbCBlbmVyZ3kuXCIsXG4gICAgICAgIFwiQSBnZW50bGUgYnJlZXplIGNhcnJpZWQgdGhlIHdoaXNwZXJzIG9mIHRoZSBmb3Jlc3QsIHJldmVhbGluZyB0aGUgc2VjcmV0cyBoaWRkZW4gd2l0aGluIHRoZSBydXN0bGluZyBsZWF2ZXMuXCIsXG4gICAgICAgIFwiQXMgSSBnbGlkZWQgb3ZlciBhIGNyeXN0YWwtY2xlYXIgcG9uZCwgdGhlIHdhdGVyIHJlZmxlY3RlZCB0aGUgc3RhcnJ5IHNreSBhYm92ZSwgY3JlYXRpbmcgYSBtaXJyb3ItbGlrZSBzdXJmYWNlIHRoYXQgc2VlbWVkIHRvIGhvbGQgdGhlIGNvbnN0ZWxsYXRpb25zIHdpdGhpbiBpdHMgZGVwdGhzLlwiLFxuICAgICAgICBcIk9jY2FzaW9uYWxseSwgSSBlbmNvdW50ZXJlZCBzaGltbWVyaW5nIHBvcnRhbHMgdGhhdCBmbGlja2VyZWQgYXQgdGhlIGVkZ2Ugb2YgcmVhbGl0eSwgYmVja29uaW5nIHdpdGggcHJvbWlzZXMgb2YgYSBkcmVhbXdvcmxkIGJleW9uZC5cIixcbiAgICAgICAgXCJUaHJvdWdoIHBvcnRhbHMsIEkgZ2xpbXBzZWQgc3VycmVhbCBsYW5kc2NhcGVzIOKAkyBmbG9hdGluZyBpc2xhbmRzIGFkb3JuZWQgd2l0aCBmbG9hdGluZyBmbG93ZXJzLCBhbmQgY2FzY2FkaW5nIHdhdGVyZmFsbHMgdGhhdCBzcGFya2xlZCB3aXRoIGxpcXVpZCBzdGFyZHVzdC5cIixcbiAgICBdLFxuXG4gICAgaW50ZXJhY3Rpb25zOiBbXG4gICAgICAgIFwiSSBkaXBwZWQgZG93biB0byB0b3VjaCB0aGUgc3VyZmFjZSBvZiBhIHBvcnRhbCwgZmVlbGluZyBhIHRpbmdsaW5nIHNlbnNhdGlvbiBhcyBJIGJyaWVmbHkgY29ubmVjdGVkIHdpdGggdGhlIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIkluIHRoZSBkcmVhbXdvcmxkLCBJIGVuY291bnRlcmVkIGZhbnRhc3RpY2FsIGNyZWF0dXJlcyDigJMgc2hpbW1lcmluZyBidXR0ZXJmbGllcyB0aGF0IGxlZnQgdHJhaWxzIG9mIGlyaWRlc2NlbmNlIGluIHRoZWlyIHdha2UgYW5kIHRhbGtpbmcgdHJlZXMgdGhhdCBzaGFyZWQgYW5jaWVudCB0YWxlcy5cIixcbiAgICAgICAgXCJXaXRoIGVhY2ggaW50ZXJhY3Rpb24sIHRoZSBib3VuZGFyeSBiZXR3ZWVuIHJlYWxpdHkgYW5kIGRyZWFtcyBibHVycmVkLCBjcmVhdGluZyBhIGthbGVpZG9zY29waWMgdGFwZXN0cnkgb2Ygd29uZGVyIGFuZCBlbmNoYW50bWVudC5cIixcbiAgICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcm93RHJlYW1cbn07IiwiY29uc3QgZmlzaERyZWFtID0ge1xuXG4gICAgcGVyc3BlY3RpdmU6IFwiSSBnbGlkZWQgdGhyb3VnaCB0aGUgZW5jaGFudGVkIHJpdmVyLCBzY2FsZXMgc2hpbW1lcmluZyBpbiB0aGUgbW9vbmxpdCB3YXRlcnMgYXMgSSBleHBsb3JlZCB0aGUgaGlkZGVuIGRlcHRocyBvZiB0aGUgbXlzdGljYWwgZm9yZXN0LlwiLFxuXG4gICAgc2lnaHRzOiBbXG4gICAgICAgIFwiU3VubGlnaHQgZmlsdGVyZWQgdGhyb3VnaCB0aGUgd2F0ZXIsIGNhc3RpbmcgYSBtZXNtZXJpemluZyBkYW5jZSBvZiBzaGFkb3dzIG9uIHRoZSByaXZlcmJlZCwgcmV2ZWFsaW5nIGFuY2llbnQgc3RvbmVzIGFkb3JuZWQgd2l0aCBteXN0ZXJpb3VzIHJ1bmVzLlwiLFxuICAgICAgICBcIkFxdWF0aWMgcGxhbnRzIHN3YXllZCBnZW50bHkgaW4gdGhlIGN1cnJlbnQsIHRoZWlyIHZpYnJhbnQgY29sb3JzIGNyZWF0aW5nIGEga2FsZWlkb3Njb3BlIG9mIGh1ZXMgdGhhdCBtaXJyb3JlZCB0aGUgZW5jaGFudG1lbnQgb2YgdGhlIGZvcmVzdCBhYm92ZS5cIixcbiAgICAgICAgXCJJIG5hdmlnYXRlZCB0aHJvdWdoIGEgc3VibWVyZ2VkIGFyY2h3YXksIGl0cyBlbnRyYW5jZSBndWFyZGVkIGJ5IGV0aGVyZWFsIGZpc2ggdGhhdCBnbG93ZWQgd2l0aCBhbiBvdGhlcndvcmxkbHkgbGlnaHQsIGd1aWRpbmcgbWUgdG8gc2VjcmV0IGFxdWF0aWMgcmVhbG1zLlwiLFxuICAgICAgICBcIlJheXMgb2YgbW9vbmxpZ2h0IHBlbmV0cmF0ZWQgdGhlIHN1cmZhY2UsIGNyZWF0aW5nIGEgY2VsZXN0aWFsIHBhdHRlcm4gdGhhdCBkYW5jZWQgdXBvbiB0aGUgcml2ZXIncyBmbG9vciwgYXMgaWYgdGhlIHN0YXJzIHRoZW1zZWx2ZXMgd2VyZSBzdWJtZXJnZWQgaW4gdGhlIHVuZGVyd2F0ZXIgd29ybGQuXCIsXG4gICAgICAgIFwiQXQgdGhlIGhlYXJ0IG9mIHRoZSByaXZlciwgSSBkaXNjb3ZlcmVkIGEgbXlzdGljYWwgd2hpcmxwb29sLCBhIGdhdGV3YXkgdG8gYSBkcmVhbXdvcmxkIHdoZXJlIHRoZSBjdXJyZW50cyB3aGlzcGVyZWQgdGFsZXMgb2YgYW5jaWVudCBhcXVhdGljIGNpdmlsaXphdGlvbnMuXCIsXG4gICAgXSxcblxuICAgIGludGVyYWN0aW9uczogW1xuICAgICAgICBcIkkgc3dhbSBpbnRvIGEgcmFkaWFudCBwb29sLCBmZWVsaW5nIGEgc3VyZ2Ugb2YgZW5lcmd5IGFzIEkgY29tbXVuZWQgd2l0aCB0aGUgcml2ZXIncyBzcGlyaXQsIGdsaW1wc2luZyB2aXNpb25zIG9mIHRoZSBmb3Jlc3QncyBoaXN0b3J5IHRocm91Z2ggdGhlIGViYiBhbmQgZmxvdyBvZiB3YXRlci5cIixcbiAgICAgICAgXCJJbiB0aGUgZHJlYW13b3JsZCBiZW5lYXRoIHRoZSBzdXJmYWNlLCBJIGVuY291bnRlcmVkIGV0aGVyZWFsIHJpdmVyIHNwaXJpdHMg4oCTIGdyYWNlZnVsIHdhdGVyIG55bXBocyB3aG8gd2VhdmVkIHRhbGVzIG9mIGZvcmdvdHRlbiB1bmRlcndhdGVyIGtpbmdkb21zIGFuZCBvZmZlcmVkIGdsaW1wc2VzIGludG8gdGhlIGZ1dHVyZS5cIixcbiAgICAgICAgXCJBcyBJIGFwcHJvYWNoZWQgdGhlIG15c3RpY2FsIHdoaXJscG9vbCwgSSBmZWx0IGEgcHVsbCB0b3dhcmRzIHRoZSBkcmVhbXdvcmxkLCB3aGVyZSBzY2hvb2xzIG9mIHBob3NwaG9yZXNjZW50IGZpc2ggc3dpcmxlZCBpbiBpbnRyaWNhdGUgcGF0dGVybnMsIHN5bWJvbGl6aW5nIHRoZSBpbnRlcmNvbm5lY3RlZG5lc3Mgb2YgdGhlIHJpdmVyIGFuZCB0aGUgZm9yZXN0IGFib3ZlLlwiLFxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZpc2hEcmVhbVxufTsiLCJjb25zdCB7IGNyb3dEcmVhbSB9ID0gcmVxdWlyZSgnLi9jcm93LmpzJyk7XG5jb25zdCB7IGJlYXJEcmVhbSB9ID0gcmVxdWlyZSgnLi9iZWFyLmpzJyk7XG5jb25zdCB7IGZpc2hEcmVhbSB9ID0gcmVxdWlyZSgnLi9maXNoLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyb3dEcmVhbSxcbiAgICBiZWFyRHJlYW0sXG4gICAgZmlzaERyZWFtXG59O1xuIiwiY29uc3QgY2hvaWNlRmlsdGVyID0gKGNob2ljZXMsIHN0YXRlKSA9PiB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IGNob2ljZSBmaWx0ZXJpbmcgYnkgdXNpbmcgc3RhdGVcbiAgICByZXR1cm4gY2hvaWNlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNob2ljZUZpbHRlclxufTsiLCJjb25zdCBnYW1lRGF0YSA9IHtcbiAgICBhd2FrZW5TdGF0ZToge1xuICAgICAgICBuYW1lOiAnbnVsbCcsXG4gICAgICAgIG1pbmQ6ICdjYWxtJyxcbiAgICAgICAgaW52ZW50b3J5OiB7XG4gICAgICAgICAgICAnaGVhcnRTdXRyYSc6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWx0aDogMjAsXG4gICAgICAgIGF1cmFzOiBuZXcgU2V0KCksXG4gICAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdhbWVEYXRhXG59OyIsImNvbnN0IHsgZGVzY3JpYmVTY2VuZSB9ID0gcmVxdWlyZSgnLi9kZXNjcmliZVNjZW5lLmpzJyk7XG5jb25zdCB7IGRlc2NyaWJlSXRlbSB9ID0gcmVxdWlyZSgnLi9kZXNjcmliZUl0ZW0uanMnKTtcbmNvbnN0IHsgaW50ZXJhY3QgfSA9IHJlcXVpcmUoJy4vaW50ZXJhY3QuanMnKTtcbmNvbnN0IHsgc2xlZXAgfSA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcbmNvbnN0IHsgZ2FtZURhdGEgfSA9IHJlcXVpcmUoJy4vZ2FtZURhdGEuanMnKTtcbmNvbnN0IHNjZW5lcyA9IHJlcXVpcmUoJy4vc2NlbmVzL2luZGV4LmpzJyk7XG5jb25zdCB7IHN0b3J5VGVsbE1ldGEgfSA9IHJlcXVpcmUoJy4vc3RvcnlUZWxsZXIuanMnKTtcblxuXG5cbmNvbnN0IGF3YWtlbiA9ICgpID0+IChcbiAgICBbXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHNjZW5lcy5hd2FrZW5fZW50ZXJTY2VuZSksXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGdhbWVEYXRhLmF3YWtlblN0YXRlKVxuICAgIF1cbik7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICAvLyBiZWdpbiB0aGUgc2NlbmUgYW5kIHRoZSBzdGF0ZVxuICAgIGNvbnN0IFtmaXJzdFNjZW5lLCBzdGF0ZV0gPSBhd2FrZW4oKTtcbiAgICBsZXQgc2NlbmVTdGFjayA9IFtmaXJzdFNjZW5lXTtcblxuICAgIC8vIGdhbWUgbG9vcFxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIC8vIFRPRE86IHJ1biBnbG9iYWwgbG9naWNzIGVhY2ggbG9vcCwgbGlrZSBhIHJhbmRvbSBlbmNvdW50ZXIgY2hhbmNlLCBvciB2YW5pc2ggc3RhdGUuZXh0cmFTZW5zZSBhZnRlciAzIHNjZW5lcywgZXRjLlxuXG5cbiAgICAgICAgLy8gY29uc2lkZXIgdGhlIGN1cnJlbnQgc2NlbmVcbiAgICAgICAgLy8gKGJ1dCBmaXJzdCwgZ3VhcmQgYWdhaW5zdCB6ZXJvLXN0YWNrKVxuICAgICAgICBpZiAoc2NlbmVTdGFjay5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgc2NlbmVTdGFjay5wdXNoKGF3YWtlbigpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY2VuZSA9IHNjZW5lU3RhY2tbc2NlbmVTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc29sZS5sb2coc2NlbmUpO1xuXG5cbiAgICAgICAgLy8gYXdha2VuIGZyb20gYW55IGRyZWFtIHNjZW5lIGlmIHN0YXRlLmRyZWFtaW5nID09IDBcbiAgICAgICAgaWYgKHNjZW5lLmlzRHJlYW0gJiYgc3RhdGUuZHJlYW1pbmcgPT0gMCkge1xuICAgICAgICAgICAgc2NlbmVTdGFjayA9IFtzY2VuZXMuYXdha2VuX2VudGVyU2NlbmVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZGlzcGxheSB0aGUgc2NlbmVcbiAgICAgICAgLy9cbiAgICAgICAgYXdhaXQgZGVzY3JpYmVTY2VuZShzY2VuZSwgc3RhdGUpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGludGVyYWN0IHdpdGggdGhlIHNjZW5lIChhbmQgZ2V0IHRoZSBuZXh0IHNjZW5lKVxuICAgICAgICAvL1xuICAgICAgICAvLyB0aGUgQ0xJIGludGVyYWN0cyB3aXRoIHRoZSB1c2VyLCBhbmQgdGhlXG4gICAgICAgIC8vIHVzZXIncyBpbnB1dCBpbnRlcmFjdHMgd2l0aCB0aGUgc2NlbmVcbiAgICAgICAgLy8gd2UgdWx0aW1hdGVseSB3YW50IHRvIGtub3cgd2hhdCBzY2VuZSBpcyBuZXh0XG4gICAgICAgIC8vIGdpdmVuIGl0cyBuYW1lIGFzIGEga2V5IChldmVyeSBtb21lbnQsIHdlIHVubG9ja1xuICAgICAgICAvLyBhIG1hZ2ljIGRvb3IhIDwzKVxuICAgICAgICBsZXQgc2NlbmVLZXkgPSBudWxsO1xuICAgICAgICAvLyBlcGhlbWVyYWwgc2NlbmVzIGhhdmUgbm8gYWN0aW9uLCB0aGV5IGp1c3QgZGlzcGxheSB0aGVpciBkZXNjcmlwdGlvbiBhbmQgcG9wIG9mZlxuICAgICAgICBpZiAoc2NlbmUuZXBoZW1lcmFsKSB7XG4gICAgICAgICAgICBzY2VuZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aW9uID0gYXdhaXQgaW50ZXJhY3Qoc2NlbmUsIHN0YXRlKTtcbiAgICAgICAgY29uc29sZS5sb2coYWN0aW9uKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKC8uK1NjZW5lLy50ZXN0KGFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHZhbHVlIG9mIHRoZSBjaG9pY2Ugd2FzIGEgc2NlbmUgbmFtZS4uLlxuICAgICAgICAgICAgICAgICAgICBzY2VuZUtleSA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9kZXNjcmliZUl0ZW1fLisvLnRlc3QoYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmFsdWUgb2YgdGhlIGNob2ljZSB3YXMgdG8gZGVzY3JpYmUgYW4gaXRlbS4uLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTmFtZSA9IGFjdGlvbi5tYXRjaCgvZGVzY3JpYmVJdGVtXyguKykvKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpYmVJdGVtKGl0ZW1OYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1bmtub3duIGFjdGlvbiAnICsgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgICAgICAvLyBzY2VuZSBoYXMgZW5kZWQsIHJ1biBvbkVuZCBob29rXG4gICAgICAgIGlmIChzY2VuZS5vbkVuZCkge1xuICAgICAgICAgICAgc2NlbmUub25FbmQoc2NlbmUsIHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzY2VuZVxuICAgICAgICAvL1xuICAgICAgICBpZiAoIXNjZW5lS2V5KSB7XG4gICAgICAgICAgICAvLyBpZiBnaXZlbiBubyBzY2VuZUtleSwgbm90aGluZyBpcyBuZXh0LCBzaW1wbHkgcG9wIHRoaXMgc2NlbmVcbiAgICAgICAgICAgIHNjZW5lU3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXNjZW5lc1tzY2VuZUtleV0pIHtcbiAgICAgICAgICAgIHN0b3J5VGVsbE1ldGEoJ1RoZSBtdXNlcyBoYXZlIG5vdCBzZWVuIHRoYXQgZmFyIGludG8gdGhlIHRhbGUgeWV0Li4uJywgJ3llbGxvdycpO1xuICAgICAgICAgICAgc3RvcnlUZWxsTWV0YSgnfn5+JywgJ2JsdWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTY2VuZSA9IE9iamVjdC5hc3NpZ24oe30sIHNjZW5lc1tzY2VuZUtleV0pO1xuICAgICAgICAgICAgaWYgKG5leHRTY2VuZS5zdGFjaykge1xuICAgICAgICAgICAgICAgIHNjZW5lU3RhY2sucHVzaChuZXh0U2NlbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY2VuZVN0YWNrW3NjZW5lU3RhY2subGVuZ3RoIC0gMV0gPSBuZXh0U2NlbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnNvbGUubG9nKCdUVVJUTEUgUVVFU1QgQ09OU09MRScpO1xubWFpbigpO1xuIiwiY29uc3QgeyBpbnF1aXJlIH0gPSByZXF1aXJlKCcuL2lvLmpzJyk7XG5jb25zdCB7IGNob2ljZUZpbHRlciB9ID0gcmVxdWlyZSgnLi9maWx0ZXJzL2Nob2ljZS5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBpbnRlcmFjdChzY2VuZSwgc3RhdGUpIHtcbiAgICAvL1xuICAgIC8vIGNvbnN0cnVjdCBjaG9pY2VzXG4gICAgLy9cbiAgICAvLyBjb3B5IGNob2ljZXMgd2l0aCBBcnJheS5mcm9tICh3ZSB3aWxsIG11dGF0ZSBpdClcbiAgICAvLyAobm90ZTogY2hvaWNlcyBjYW4gYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheSBvciBub3QgZXZlbiBwcmVzZW50KVxuICAgIGxldCBjaG9pY2VzID0gc2NlbmUuY2hvaWNlcyA/XG4gICAgICAgICgoc2NlbmUuY2hvaWNlcy5jYWxsICYmIHNjZW5lLmNob2ljZXMuYXBwbHkpID9cbiAgICAgICAgICAgIEFycmF5LmZyb20oc2NlbmUuY2hvaWNlcyhzY2VuZSwgc3RhdGUpKSA6XG4gICAgICAgICAgICBBcnJheS5mcm9tKHNjZW5lLmNob2ljZXMpKVxuICAgICAgICA6IFtdO1xuICAgIGlmICghc2NlbmUuZXhjbHVzaXZlQ2hvaWNlcykge1xuICAgICAgICAvLyBhZGQgbWFnaWMgY2hvaWNlIGlmIG5vdCBhbHJlYWR5IGluIG1hZ2ljU2NlbmVcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgIT09ICdtYWdpY1NjZW5lJyAmJiBzY2VuZS5uYW1lICE9PSAnbWVudVNjZW5lJykge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogXCJVc2UgbWFnaWNcIiwgdmFsdWU6IFwibWFnaWNTY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBkcmVhbSBvcHRpb24gaWYgc3RhdGUuZHJlYW1pbmcgPiAwXG4gICAgICAgIGlmIChzdGF0ZS5kcmVhbWluZyA+IDApIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IFwiRHJlYW1cIiwgdmFsdWU6IFwiZHJlYW1TY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBtZW51IGNob2ljZSBpZiBub3QgYWxyZWFkeSBpbiBtZW51U2NlbmVcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgIT09ICdtZW51U2NlbmUnKSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBcIk9wZW4gbWVudVwiLCB2YWx1ZTogXCJtZW51U2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhcHBseSBjaG9pY2VGaWx0ZXIgYmFzZWQgb24gc3RhdGVcbiAgICBjaG9pY2VzID0gY2hvaWNlRmlsdGVyKGNob2ljZXMsIHN0YXRlKTtcbiAgICAvLyBpZiBhcHBsaWNhYmxlLCBhcHBseSBzY2VuZSBjaG9pY2VGaWx0ZXJcbiAgICBpZiAoc2NlbmUuY2hvaWNlRmlsdGVyKSB7XG4gICAgICAgIGNob2ljZXMgPSBzY2VuZS5jaG9pY2VGaWx0ZXIoY2hvaWNlcyk7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBpbnRlcmFjdFxuICAgIC8vXG4gICAgLy8gdXNlIGlucXVpcmVyIHRvIGdldCBhY3R1YWwgaW50ZXJhY3Rpb25cbiAgICByZXR1cm4gaW5xdWlyZShjaG9pY2VzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW50ZXJhY3Rcbn07XG4iLCJjb25zdCBjb25zb2xlbG9nID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHAudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIHRlcm1pbmFsLmFwcGVuZENoaWxkKHApO1xuICAgIHRlcm1pbmFsLnNjcm9sbFRvcCA9IHRlcm1pbmFsLnNjcm9sbEhlaWdodDtcbn07XG5cbmNvbnN0IGlucXVpcmUgPSAoY2hvaWNlcykgPT4ge1xuICAgIGNvbnN0IGNob2ljZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hvaWNlcy1jb250YWluZXInKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgY2hvaWNlc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBmb3IgKGNvbnN0IGNob2ljZSBvZiBjaG9pY2VzKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNob2ljZS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNob2ljZSk7XG4gICAgICAgICAgICBjb25zdCBjaG9pY2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNob2ljZURpdi50ZXh0Q29udGVudCA9IGNob2ljZS5uYW1lO1xuICAgICAgICAgICAgY2hvaWNlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGNob2ljZXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNob2ljZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hvaWNlRGl2KTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnNvbGVsb2csXG4gICAgaW5xdWlyZVxufTsiLCJjb25zdCBpdGVtRGVzY3JpcHRpb25zID0ge1xuICAgICdoZWFydFN1dHJhJzogJ2Egd2VhdGhlcmVkIGNvcHkgb2YgdGhlIGhlYXJ0IHN1dHJhLCBnaXZlbiB0byB5b3UgYnkgYSBmcmllbmQgbG9uZyBhZ28nLFxuICAgICdkaWFtb25kU3V0cmEnOiAnYSBjb3B5IG9mIHRoZSBkaWFtb25kIHN1dHJhOyB3aGVyZSBkaWQgaXQgY29tZSBmcm9tLi4uPydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGl0ZW1EZXNjcmlwdGlvbnNcbn07IiwiY29uc3QgYXdha2VuX2VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ2F3YWtlbl9lbnRlclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFsnZ2xhZGUnLCAnZ3JvdmUnLCAnY2xlYXJpbmcnLCAndmFsbGV5J107XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbG9jYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxvY2F0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICBjb25zdCBpbnNlY3RzID0gWydidXR0ZXJmbGllcycsICdmaXJlZmxpZXMnLCAnbWF5ZmxpZXMnXTtcbiAgICAgICAgY29uc3QgaW5zZWN0ID0gaW5zZWN0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpbnNlY3RzLmxlbmd0aCldO1xuXG4gICAgICAgIGNvbnN0IG1zZyA9IFtcbiAgICAgICAgICAgIGBZb3UgYXdha2VuJHtzdGF0ZS5hd2FrZW5lZCA/ICcgYWdhaW4gJyA6ICcgJ31pbiBhIG15c3RlcmlvdXMgZm9yZXN0LmAsXG4gICAgICAgICAgICBgWW91IGFyZSBpbiBhICR7bG9jYXRpb259IHdoZXJlICR7aW5zZWN0fSBnYXRoZXJgLFxuICAgICAgICAgICAgXCJUaGUgYWlyIGlzIGVuY2hhbnRlZCB3aXRoIG11Y2ggbWVtb3J5LlwiLFxuICAgICAgICAgICAgXCJZb3UgaGVhciBmYWludGx5IHRoZSBsZWF2ZXMgaW4gdGhlIGNhbm9weSBkYW5jaW5nLlwiLFxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gbXNnO1xuICAgIH0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF3YWtlbmVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkV4cGxvcmVcIiwgdmFsdWU6IFwiYXdha2VuX2V4cGxvcmVTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJUYWxrIHRvIHRoZSB0cmVlc1wiLCB2YWx1ZTogXCJ0cmVlc190YWxrRW50ZXJTY2VuZVwiIH0sXG4gICAgXVxufTtcblxuY29uc3QgYXdha2VuX2V4cGxvcmVTY2VuZSA9IHtcbiAgICBuYW1lOiAnYXdha2VuX2V4cGxvcmVTY2VuZScsXG5cbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkamVjdGl2ZXMgPSBbJ215c3RlcmlvdXMnLCAnZW5jaGFudGVkJywgJ2FuY2llbnQnXTtcbiAgICAgICAgY29uc3QgYWRqZWN0aXZlID0gYWRqZWN0aXZlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhZGplY3RpdmVzLmxlbmd0aCldO1xuXG4gICAgICAgIGNvbnN0IG1pbmQgPSBzdGF0ZS5taW5kO1xuXG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXG4gICAgICAgICAgICBgWW91IHdhbGssIGV4cGxvcmluZyB0aGUgJHthZGplY3RpdmV9IGZvcmVzdC5gLFxuICAgICAgICAgICAgYFlvdXIgbWluZCAtICR7bWluZH0gLSBzZWVrcyB0aGUgd2F5IHRocm91Z2ggdGhlIGRyZWFtLmAsXG4gICAgICAgICAgICBcIkFzIHlvdSB3YWxrLCB5b3Ugc2VlIGEgdmluZWdyb3duIGRvb3J3YXkgdG8gYW5jaWVudCBydWlucy5cIlxuICAgICAgICBdO1xuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMzMpIHtcbiAgICAgICAgICAgIHN0YXRlLmV4dHJhU2Vuc2UgPSB0cnVlO1xuICAgICAgICAgICAgbXNncy5wdXNoKFwiWW91IGFsc28gc2Vuc2UgYSBoaWRkZW4gcGF0aHdheS5cIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIGNob2ljZXM6IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSBydWluc1wiLCB2YWx1ZTogXCJydWluc19lbnRlclNjZW5lXCIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUYWxrIHRvIHRoZSB0cmVlc1wiLCB2YWx1ZTogXCJ0cmVlc190YWxrRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgIF07XG4gICAgICAgIGlmIChzdGF0ZS5leHRyYVNlbnNlKSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBcIkZvbGxvdyB0aGUgaGlkZGVuIHBhdGhcIiwgdmFsdWU6IFwicGF0aF9lbnRlclNjZW5lXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXdha2VuX2VudGVyU2NlbmUsXG4gICAgYXdha2VuX2V4cGxvcmVTY2VuZVxufTsiLCJjb25zdCB7IGNyb3dEcmVhbSwgYmVhckRyZWFtLCBmaXNoRHJlYW0gfSA9IHJlcXVpcmUoJy4uL2RyZWFtL2luZGV4LmpzJyk7XG5cbmNvbnN0IGRyZWFtU2NlbmUgPSB7XG4gICAgbmFtZTogJ2RyZWFtU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGNsb3NlIHlvdXIgZXllcywgbGV0dGluZyB0aGUgd29ybGQgZmFkZSBhd2F5IGFzIHlvdSBlbnRlciBhIGRyZWFtbGlrZSBzdGF0ZS5cIixcbiAgICAgICAgXCJJbiB0aGlzIHJlYWxtIG9mIGV0aGVyZWFsIHBvc3NpYmlsaXRpZXMsIHlvdXIgc3Bpcml0IGZlZWxzIGl0IGNhbiBkcmVhbSBhcyBhbiBhbmltYWwuLi5cIlxuICAgIF0sXG4gICAgaXNEcmVhbTogdHJ1ZSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJEcmVhbSBhcyBhIENyb3dcIiwgdmFsdWU6IFwiY3Jvd0RyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiRHJlYW0gYXMgYSBCZWFyXCIsIHZhbHVlOiBcImJlYXJEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkRyZWFtIGFzIGEgRmlzaFwiLCB2YWx1ZTogXCJmaXNoRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gd2FraW5nIGxpZmVcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCBjcm93RHJlYW1TY2VuZSA9IHtcbiAgICBuYW1lOiAnY3Jvd0RyZWFtU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tU2lnaHQgPSBjcm93RHJlYW0uc2lnaHRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNyb3dEcmVhbS5zaWdodHMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBgWW91IHRha2Ugb24gdGhlIHBlcnNwZWN0aXZlIG9mIGEgY3Jvdywgc29hcmluZyB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgZm9yZXN0LmAsXG4gICAgICAgICAgICByYW5kb21TaWdodCxcbiAgICAgICAgICAgIFwiVGhlIGRyZWFtd29ybGQgYmVja29ucyB3aXRoIG15c3Rlcmllcy5cIixcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbz9cIixcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIGlzRHJlYW06IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBDcm93XCIsIHZhbHVlOiBcImNyb3dEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkludGVyYWN0IHdpdGggdGhlIFdvcmxkXCIsIHZhbHVlOiBcImNyb3dJbnRlcmFjdFNjZW5lXCIgfSxcbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5kcmVhbWluZyA9IE1hdGgubWF4KDAsIHN0YXRlLmRyZWFtaW5nIC0gMSk7XG4gICAgfVxufTtcblxuY29uc3QgYmVhckRyZWFtU2NlbmUgPSB7XG4gICAgbmFtZTogJ2JlYXJEcmVhbVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVNpZ2h0ID0gYmVhckRyZWFtLnNpZ2h0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiZWFyRHJlYW0uc2lnaHRzLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYFlvdSBlbWJvZHkgdGhlIHNwaXJpdCBvZiBhIGJlYXIsIGFtYmxpbmcgdGhyb3VnaCB0aGUgZW5jaGFudGVkIGZvcmVzdC5gLFxuICAgICAgICAgICAgcmFuZG9tU2lnaHQsXG4gICAgICAgICAgICBcIlRoZSBkcmVhbXdvcmxkIHVuZm9sZHMgaXRzIHNlY3JldHMgYmVmb3JlIHlvdS5cIixcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbz9cIixcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIGlzRHJlYW06IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBCZWFyXCIsIHZhbHVlOiBcImJlYXJEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkludGVyYWN0IHdpdGggdGhlIFdvcmxkXCIsIHZhbHVlOiBcImJlYXJJbnRlcmFjdFNjZW5lXCIgfSxcbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5kcmVhbWluZyA9IE1hdGgubWF4KDAsIHN0YXRlLmRyZWFtaW5nIC0gMSk7XG4gICAgfVxufTtcblxuY29uc3QgZmlzaERyZWFtU2NlbmUgPSB7XG4gICAgbmFtZTogJ2Zpc2hEcmVhbVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVNpZ2h0ID0gZmlzaERyZWFtLnNpZ2h0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaXNoRHJlYW0uc2lnaHRzLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYFlvdSBiZWNvbWUgb25lIHdpdGggYSByaXZlci1kd2VsbGluZyBmaXNoLCBnbGlkaW5nIHRocm91Z2ggdGhlIG15c3RpY2FsIHdhdGVycy5gLFxuICAgICAgICAgICAgcmFuZG9tU2lnaHQsXG4gICAgICAgICAgICBcIlRoZSBkcmVhbXdvcmxkIGJlbmVhdGggdGhlIHN1cmZhY2UgaG9sZHMgdW50b2xkIHdvbmRlcnMuXCIsXG4gICAgICAgICAgICBcIldoYXQgd2lsbCB5b3UgZG8/XCIsXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBpc0RyZWFtOiB0cnVlLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNvbnRpbnVlIERyZWFtaW5nIGFzIGEgRmlzaFwiLCB2YWx1ZTogXCJmaXNoRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJJbnRlcmFjdCB3aXRoIHRoZSBXb3JsZFwiLCB2YWx1ZTogXCJmaXNoSW50ZXJhY3RTY2VuZVwiIH0sXG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuZHJlYW1pbmcgPSBNYXRoLm1heCgwLCBzdGF0ZS5kcmVhbWluZyAtIDEpO1xuICAgIH1cbn07XG5cbmNvbnN0IGNyb3dJbnRlcmFjdFNjZW5lID0ge1xuICAgIG5hbWU6ICdjcm93SW50ZXJhY3RTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21JbnRlcmFjdGlvbiA9IGNyb3dEcmVhbS5pbnRlcmFjdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3Jvd0RyZWFtLmludGVyYWN0aW9ucy5sZW5ndGgpXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiWW91IGRlY2lkZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBkcmVhbXdvcmxkIGFzIGEgY3Jvdy5cIixcbiAgICAgICAgICAgIGBUaGUgZHJlYW13b3JsZCByZXNwb25kcyB3aXRoOiBcIiR7cmFuZG9tSW50ZXJhY3Rpb259XCJgLFxuICAgICAgICAgICAgXCJXaGF0IHdpbGwgeW91IGRvIG5leHQ/XCIsXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIENyb3dcIiwgdmFsdWU6IFwiY3Jvd0RyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBGb3Jlc3RcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCBiZWFySW50ZXJhY3RTY2VuZSA9IHtcbiAgICBuYW1lOiAnYmVhckludGVyYWN0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tSW50ZXJhY3Rpb24gPSBiZWFyRHJlYW0uaW50ZXJhY3Rpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJlYXJEcmVhbS5pbnRlcmFjdGlvbnMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIllvdSBjaG9vc2UgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgZHJlYW13b3JsZCBhcyBhIGJlYXIuXCIsXG4gICAgICAgICAgICBgVGhlIGRyZWFtd29ybGQgcmVzcG9uZHMgd2l0aDogXCIke3JhbmRvbUludGVyYWN0aW9ufVwiYCxcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbyBuZXh0P1wiLFxuICAgICAgICBdOyBmcm9tXG4gICAgfSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIEJlYXJcIiwgdmFsdWU6IFwiYmVhckRyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBGb3Jlc3RcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCBmaXNoSW50ZXJhY3RTY2VuZSA9IHtcbiAgICBuYW1lOiAnZmlzaEludGVyYWN0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tSW50ZXJhY3Rpb24gPSBmaXNoRHJlYW0uaW50ZXJhY3Rpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZpc2hEcmVhbS5pbnRlcmFjdGlvbnMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIllvdSBkZWNpZGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgZHJlYW13b3JsZCBhcyBhIGZpc2guXCIsXG4gICAgICAgICAgICBgVGhlIGRyZWFtd29ybGQgcmVzcG9uZHMgd2l0aDogXCIke3JhbmRvbUludGVyYWN0aW9ufVwiYCxcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbyBuZXh0P1wiLFxuICAgICAgICBdO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBGaXNoXCIsIHZhbHVlOiBcImZpc2hEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgRm9yZXN0XCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZHJlYW1TY2VuZSxcbiAgICBjcm93RHJlYW1TY2VuZSxcbiAgICBiZWFyRHJlYW1TY2VuZSxcbiAgICBmaXNoRHJlYW1TY2VuZSxcbiAgICBjcm93SW50ZXJhY3RTY2VuZSxcbiAgICBiZWFySW50ZXJhY3RTY2VuZSxcbiAgICBmaXNoSW50ZXJhY3RTY2VuZSxcbn07XG4iLCJjb25zdCB7XG4gICAgYXdha2VuX2VudGVyU2NlbmUsXG4gICAgYXdha2VuX2V4cGxvcmVTY2VuZVxufSA9IHJlcXVpcmUoJy4vYXdha2VuLmpzJyk7XG5cbmNvbnN0IHtcbiAgICBkcmVhbVNjZW5lLFxuICAgIGNyb3dEcmVhbVNjZW5lLFxuICAgIGJlYXJEcmVhbVNjZW5lLFxuICAgIGZpc2hEcmVhbVNjZW5lLFxuICAgIGNyb3dJbnRlcmFjdFNjZW5lLFxuICAgIGJlYXJJbnRlcmFjdFNjZW5lLFxuICAgIGZpc2hJbnRlcmFjdFNjZW5lXG59ID0gcmVxdWlyZSgnLi9kcmVhbS5qcycpO1xuXG5jb25zdCB7XG4gICAgbWVudVNjZW5lLFxuICAgIHZpZXdJbnZlbnRvcnlTY2VuZSxcbiAgICBjaGVja1N0YXRzU2NlbmVcbn0gPSByZXF1aXJlKCcuL21lbnUuanMnKTtcblxuY29uc3Qge1xuICAgIG1hZ2ljU2NlbmVcbn0gPSByZXF1aXJlKCcuL21hZ2ljLmpzJyk7XG5cbmNvbnN0IHtcbiAgICBydWluc19lbnRlclNjZW5lLFxuICAgIHJ1aW5zX2ZveWVyU2NlbmUsXG5cbiAgICBydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRCbHVlQm9va1NjZW5lLFxuXG4gICAgcnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRSZWRCb29rU2NlbmUsXG5cbiAgICBydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoR2F0ZXdheVNjZW5lXG59ID0gcmVxdWlyZSgnLi9ydWlucy5qcycpO1xuXG5jb25zdCB7XG4gICAgdHJlZXNfdGFsa0VudGVyU2NlbmUsXG5cbiAgICB0cmVlc19hc2tIaXN0b3J5U2NlbmUsXG4gICAgdHJlZXNfYXNrU2VlZGxpbmdzU2NlbmUsXG4gICAgdHJlZXNfYXNrTG9uZ1llYXJzU2NlbmUsXG4gICAgdHJlZXNfYXNrQ2Fub3B5U2NlbmUsXG5cbiAgICB0cmVlc19hc2tNYWdpY1NjZW5lXG59ID0gcmVxdWlyZSgnLi90cmVlcy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhd2FrZW5fZW50ZXJTY2VuZSxcbiAgICBhd2FrZW5fZXhwbG9yZVNjZW5lLFxuXG4gICAgZHJlYW1TY2VuZSxcbiAgICBjcm93RHJlYW1TY2VuZSxcbiAgICBiZWFyRHJlYW1TY2VuZSxcbiAgICBmaXNoRHJlYW1TY2VuZSxcbiAgICBjcm93SW50ZXJhY3RTY2VuZSxcbiAgICBiZWFySW50ZXJhY3RTY2VuZSxcbiAgICBmaXNoSW50ZXJhY3RTY2VuZSxcblxuICAgIG1lbnVTY2VuZSxcbiAgICB2aWV3SW52ZW50b3J5U2NlbmUsXG4gICAgY2hlY2tTdGF0c1NjZW5lLFxuXG4gICAgbWFnaWNTY2VuZSxcblxuICAgIHJ1aW5zX2VudGVyU2NlbmUsXG4gICAgcnVpbnNfZm95ZXJTY2VuZSxcblxuICAgIHJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZEJsdWVCb29rU2NlbmUsXG5cbiAgICBydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZFJlZEJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmUsXG5cbiAgICB0cmVlc190YWxrRW50ZXJTY2VuZSxcblxuICAgIHRyZWVzX2Fza0hpc3RvcnlTY2VuZSxcbiAgICB0cmVlc19hc2tTZWVkbGluZ3NTY2VuZSxcbiAgICB0cmVlc19hc2tMb25nWWVhcnNTY2VuZSxcbiAgICB0cmVlc19hc2tDYW5vcHlTY2VuZSxcblxuICAgIHRyZWVzX2Fza01hZ2ljU2NlbmVcbn07XG4iLCJjb25zdCB7IHN0b3J5VGVsbCB9ID0gcmVxdWlyZSgnLi4vc3RvcnlUZWxsZXIuanMnKTtcblxuY29uc3QgbWFnaWNTY2VuZSA9IHtcbiAgICBuYW1lOiAnbWFnaWNTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgZGVjaWRlIHRvIGhhcm5lc3MgdGhlIG1hZ2ljIHdpdGhpbiB5b3UuXCIsXG4gICAgICAgIFwiQnJlYXRoZSBpbiBkZWVwbHksIGFuZCBicmVhdGhlIG91dCBlbmpveWluZyBjYWxtLlwiLFxuICAgICAgICBcIkEgd2F2ZSBvZiBlbmVyZ3kgd2lsbCBmbG93IHRocm91Z2ggeW91ciBib2R5LlwiLFxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ2FzdCBhIHNwZWxsIG9mIHByb3RlY3Rpb25cIiwgdmFsdWU6IFwiY2FzdFByb3RlY3Rpb25cIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2FzdCBhIHNwZWxsIG9mIHRyYXZlbFwiLCB2YWx1ZTogXCJjYXN0VHJhdmVsXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNhc3QgYSBzcGVsbCBvZiBkcmVhbWluZ1wiLCB2YWx1ZTogXCJjYXN0RHJlYW1cIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBzdGFydCBvZiB0aGUgdGFsZVwiLCB2YWx1ZTogXCJyZXR1cm5TdGFydFwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDYXN0IG5vIG1hZ2ljXCIsIHZhbHVlOiBudWxsIH1cbiAgICBdLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGludGVyYWN0OiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBsZXQgbmV4dCA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdjYXN0UHJvdGVjdGlvbic6XG4gICAgICAgICAgICAgICAgc3RvcnlUZWxsKFwiWW91IGNhc3QgUHJvdGVjdGl2ZSBDaXJjbGU7XCIpO1xuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIkEgc2hpbW1lcmluZyB2ZWlsIG9mIGF1cmEgc3Vycm91bmRzIHlvdSB+Kit4b1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Nhc3RUcmF2ZWwnOlxuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIkEgbGl0dGxlIGZhaXJ5IGFwcGVhcnMgYW5kIHNheXMsIFwiXG4gICAgICAgICAgICAgICAgICAgICsgXCInVE9ETzogYXNrIGZvciBhIHRyYXZlbCBrZXkgaGVyZS4uLidcIik7XG4gICAgICAgICAgICAgICAgbmV4dCA9ICdhd2FrZW5TY2VuZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYXN0RHJlYW0nOlxuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIllvdSBpbWJ1ZSB5b3VyIG1pbmRib2R5IHdpdGggZHJlYW1pbmcgcG93ZXJzLCBlbm91Z2ggZm9yIG9uZSBkcmVhbS4uLlwiKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5kcmVhbWluZyA9IDU7XG4gICAgICAgICAgICAgICAgbmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXR1cm5TdGFydCc6XG4gICAgICAgICAgICAgICAgc3RvcnlUZWxsKFwiWW91IGNhc3QgQXdha2VuO1wiKTtcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJBIG1hZ2ljYWwgc2hvd2VyIGNvdmVycyBhbGwsIGFuZCB5b3UgcmV0dXJuLi4uXCIpO1xuICAgICAgICAgICAgICAgIG5leHQgPSAnYXdha2VuX2VudGVyU2NlbmUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0b3J5VGVsbChcIn5+fn5+fn5+fn5+fn5+fn5+fip+Kn4qfn5+fn5+fn5+fn5+fn5+fn5+XCIpXG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1hZ2ljU2NlbmUsXG59OyIsImNvbnN0IHsgYmxhY2tib2FyZCB9ID0gcmVxdWlyZSgnLi4vYmxhY2tib2FyZC5qcycpO1xuXG5jb25zdCBtZW51U2NlbmUgPSB7XG4gICAgbmFtZTogJ21lbnVTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFwiWW91IHJldmlldyB5b3VyIG9wdGlvbnMuLi5cIixcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIC8vIFRPRE8geyBuYW1lOiBcIkhhdmUgYSBkcmVhbVwiLCB2YWx1ZTogXCJkcmVhbVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJWaWV3IGludmVudG9yeVwiLCB2YWx1ZTogXCJ2aWV3SW52ZW50b3J5U2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2hlY2sgY2hhcmFjdGVyIHN0YXRzXCIsIHZhbHVlOiBcImNoZWNrU3RhdHNTY2VuZVwiIH0sXG4gICAgICAgIC8vIFRPRE8geyBuYW1lOiBcIlNhdmUgZ2FtZVwiLCB2YWx1ZTogXCJzYXZlR2FtZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDbG9zZSBtZW51XCIsIHZhbHVlOiBudWxsIH1cbiAgICBdLFxufTtcblxuY29uc3Qgdmlld0ludmVudG9yeVNjZW5lID0ge1xuICAgIG5hbWU6ICd2aWV3SW52ZW50b3J5U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbXNncyA9IFtcIllvdSBzZXQgZG93biB5b3VyIHBhY2sgYW5kIGxvb2sgdGhyb3VnaCBpdC5cIl07XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBzdGF0ZS5pbnZlbnRvcnkpIHtcbiAgICAgICAgICAgIG1zZ3MucHVzaChpdGVtKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgc3RhY2s6IHRydWUsXG4gICAgZXhjbHVzaXZlQ2hvaWNlczogdHJ1ZSxcbiAgICBjaG9pY2VzOiAoc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gc3RhdGUuaW52ZW50b3J5KSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBpdGVtLCB2YWx1ZTogYGRlc2NyaWJlSXRlbV8ke2l0ZW19YCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlcztcbiAgICB9LFxufTtcblxuY29uc3QgY2hlY2tTdGF0c1NjZW5lID0ge1xuICAgIG5hbWU6ICdjaGVja1N0YXRzU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbXNncyA9IFtcbiAgICAgICAgICAgICdIZWFsdGg6JyxcbiAgICAgICAgICAgIGAgIG8gJHtzdGF0ZS5oZWFsdGh9YCxcbiAgICAgICAgICAgICdNaW5kOicsXG4gICAgICAgICAgICBgICA9ICR7c3RhdGUubWluZH1gXG4gICAgICAgIF07XG4gICAgICAgIGlmIChzdGF0ZS5hdXJhcy5zaXplID4gMCkge1xuICAgICAgICAgICAgbXNncy5wdXNoKFwiQXVyYXM6XCIpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdXJhIGluIHN0YXRlLmF1cmFzKSB7XG4gICAgICAgICAgICAgICAgbXNncy5wdXNoKGAgICsgJHthdXJhfWApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGVwaGVtZXJhbDogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWVudVNjZW5lLFxuICAgIHZpZXdJbnZlbnRvcnlTY2VuZSxcbiAgICBjaGVja1N0YXRzU2NlbmVcbn07IiwiY29uc3QgcnVpbnNfZW50ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfZW50ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgcGFzcyBiZW5lYXRoIHRoZSBzdG9uZSBnYXRld2F5LCBicnVzaGVkIGJ5IG92ZXJncm93biB2aW5lcy5cIixcbiAgICAgICAgXCJUaGUgYWlyIGlzIGNvb2wgYW5kIGEgZnJlc2ggd2luZCBmcm9tIG91dHNpZGUgYmxvd3MgaW53YXJkLlwiLFxuICAgICAgICBcIkFzIHlvdSB3YWxrLCB0aGUgbGlnaHQgZmFkZXMgdG8gZ3JleSwgbmV2ZXIgcXVpdGUgZ29pbmcgb3V0LlwiLFxuICAgICAgICBcIllvdSBjb21lIHRvIGEgYmx1ZSBkb29yd2F5IGFuZCBhIGdyZWVuIGRvb3J3YXlcIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhlIGJsdWUgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSByZWQgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19yZWREb29yd2F5X0VudGVyU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBmb3Jlc3RcIiwgdmFsdWU6IFwiYXdha2VuX2V4cGxvcmVTY2VuZVwiIH1cbiAgICBdXG59O1xuXG5jb25zdCBydWluc19mb3llclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19mb3llclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXG4gICAgICAgICAgICBcIllvdSByZXR1cm4gdG8gdGhlIGVudHJhbmNlIHRvIHRoZSBydWlucy4gU29mdCBsaWdodCBwcm92aWRlc1wiLFxuICAgICAgICAgICAgXCJUaGUgYmFyZXN0IGlsbHVtaW5hdGlvbiwgYW5kIHlvdSBjYW4gc2VlIHRoZSB3YWxscyBhcmUgY2FydmVkXCIsXG4gICAgICAgICAgICBcIldpdGggbWFueSBzdHJhbmdlIGdseXBocy4gWW91IHNlZSBhIGJsdWUgZG9vcndheSBhbmQgYSByZWQgZG9vcndheS5cIlxuICAgICAgICBdO1xuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMzMpIHtcbiAgICAgICAgICAgIHN0YXRlLmV4dHJhU2Vuc2UgPSB0cnVlO1xuICAgICAgICAgICAgbXNncy5wdXNoKFwiQW5kIHlvdSBzZW5zZSBhIGhpZGRlbiBwYXRod2F5IGFzIHdlbGwuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgY2hvaWNlczogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhlIGJsdWUgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lXCIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFbnRlciB0aGUgcmVkIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lXCIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIGZvcmVzdFwiLCB2YWx1ZTogXCJhd2FrZW5fZXhwbG9yZVNjZW5lXCIgfVxuICAgICAgICBdO1xuICAgICAgICBpZiAoc3RhdGUuZXh0cmFTZW5zZSkge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogXCJGb2xsb3cgdGhlIGhpZGRlbiBwYXRoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgcGFzcyB0aHJvdWdoIHRoZSBibHVlIGRvb3J3YXksIGFuZCBhcyB5b3UgZG8sXCIsXG4gICAgICAgIFwiVGhlIHNjZW50IG9mIGxhdmVuZGVyIGFyaXNlcyBpbiB5b3VyIG1pbmQuIFRoZSBkb29yIHBsYXlzIGFcIixcbiAgICAgICAgXCJNdXNpY2FsIHRoZW1lIGxpa2UgYSBmbHV0ZSBmcm9tIGFuIGFuY2llbnQgdGltZS4gWW91IGZpbmRcIixcbiAgICAgICAgXCJZb3Vyc2VsZiBpbiBhIGNpcmN1bGFyIGNoYW1iZXIgd2l0aCBzb2Z0IGlsbHVtaW5hdGlvbiBmcm9tXCIsXG4gICAgICAgIFwiQSBza3lsaWdodCBmYXIgYWJvdmUgaW4gdGhlIHZhdWx0ZWQgY2VpbGluZy4gQSBib29rIGlzIG9uXCIsXG4gICAgICAgIFwiQSBzdG9uZSB0YWJsZSBpbiB0aGUgY2VudGVyIG9mIHRoZSByb29tLlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJSZWFkIHRoZSBib29rXCIsIHZhbHVlOiBcInJ1aW5zX3JlYWRCbHVlQm9va1NjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0aHJvdWdoIHRoZSBibHVlIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfZm95ZXJTY2VuZVwiIH1cbiAgICBdXG59O1xuXG5jb25zdCBydWluc19yZWFkQmx1ZUJvb2tTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfcmVhZEJsdWVCb29rU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGFwcHJvYWNoIHRoZSBibHVlIGJvb2sgYW5kIHJlYWQgZnJvbSBpdCwgbm90aWNpbmdcIixcbiAgICAgICAgXCJJdCdzIGFjdHVhbGx5IG1hZGUgb2YgYmx1ZSBqYWRlIGFuZCBoYXMgb25seSBvbmUgcGFnZSB2aXNpYmxlLlwiLFxuICAgICAgICBcIkl0IHJlYWRzOlwiLFxuICAgICAgICBcIk15c3RlcnkgYW5kIG1hbmlmZXN0YXRpb25zIGFyaXNlIGZyb20gdGhlIHNhbWUgc291cmNlLi4uXCIsXG4gICAgICAgIFwiWW91IGZlZWwgc2VyZW5pdHkgYXQgdGhlc2Ugd29yZHMuXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0aHJvdWdoIHRoZSBibHVlIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfZm95ZXJTY2VuZVwiIH1cbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5hdXJhcy5hZGQoJ3NlcmVuaXR5Jyk7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IHBhc3MgdGhyb3VnaCB0aGUgcmVkIGRvb3J3YXksIGFuZCBhcyB5b3UgZG8sXCIsXG4gICAgICAgIFwiVGhlIHNjZW50IG9mIG1pbnQgYXJpc2VzIGluIHlvdXIgbWluZC4gVGhlIGRvb3IgcGxheXMgYVwiLFxuICAgICAgICBcIk11c2ljYWwgdGhlbWUgbGlrZSBhIGhhcnAgZnJvbSBhbiBhbmNpZW50IHRpbWUuIFlvdSBmaW5kXCIsXG4gICAgICAgIFwiWW91cnNlbGYgaW4gYSBoZXhhZ29uYWwgY2hhbWJlciB3aXRoIHNvZnQgaWxsdW1pbmF0aW9uIGZyb21cIixcbiAgICAgICAgXCJBIG1vb25saWdodCBmYXIgYWJvdmUgaW4gdGhlIGFyY2hlZCBjZWlsaW5nLiBBIGJvb2sgaXMgb25cIixcbiAgICAgICAgXCJBIHN0b25lIHRhYmxlIGluIHRoZSBjZW50ZXIgb2YgdGhlIHJvb20uXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJlYWQgdGhlIGJvb2tcIiwgdmFsdWU6IFwicnVpbnNfcmVhZFJlZEJvb2tTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdGhyb3VnaCB0aGUgcmVkIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfZm95ZXJTY2VuZVwiIH1cbiAgICBdXG59O1xuXG5jb25zdCBydWluc19yZWFkUmVkQm9va1NjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19yZWFkUmVkQm9va1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBhcHByb2FjaCB0aGUgcmVkIGJvb2sgYW5kIHJlYWQgZnJvbSBpdCwgbm90aWNpbmdcIixcbiAgICAgICAgXCJJdCdzIGFjdHVhbGx5IG1hZGUgb2YgcmVkIGdyYW5pdGUgYW5kIGhhcyBvbmx5IG9uZSBwYWdlIHZpc2libGUuXCIsXG4gICAgICAgIFwiSXQgcmVhZHM6XCIsXG4gICAgICAgIFwiUmV0dXJuaW5nIHRvIHRoZSBzb3VyY2UgaXMgY29tcGxldGlvbiBhbmQgd2hvbGVuZXNzLi4uXCIsXG4gICAgICAgIFwiWW91IGZlZWwgc2FmZXR5IGF0IHRoZXNlIHdvcmRzLlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdGhyb3VnaCB0aGUgcmVkIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfZm95ZXJTY2VuZVwiIH1cbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5hdXJhcy5hZGQoJ3NhZmV0eScpO1xuICAgIH1cbn07XG5cbmNvbnN0IHJ1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aF9FbnRlclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBwYXNzIHRocm91Z2ggYSB2ZWlsIGluIHNwYWNlLCBhIHNoaW1tZXJpbmcgY3VydGFpbiBvZiBkcmVhbXMsXCIsXG4gICAgICAgIFwiQW5kIGVudGVyIHRoZSBoaWRkZW4gcGF0aHdheSB0aHJvdWdoIHRoZSBydWlucy4gSXQgdGFrZXMgeW91IHRocm91Z2hcIixcbiAgICAgICAgXCJNYW55IGJyYW5jaGluZyBwYXNzYWdlcy5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgbGVmdCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSByaWdodCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmVcIiB9LFxuXG4gICAgXVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgZm9sbG93IHRoZSBoaWRkZW4gcGF0aCBhcyBpdCBicmFuY2hlcyB0byB0aGUgbGVmdC5cIixcbiAgICBdLFxuICAgIGNob2ljZXM6IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBwb3NzaWJpbGl0aWVzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIHJpZ2h0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZVwiIH0sXG4gICAgICAgIF1cbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjUpIHtcbiAgICAgICAgICAgIHBvc3NpYmlsaXRpZXMucHVzaChcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgbGVmdCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZVwiIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjMzKSB7XG4gICAgICAgICAgICBwb3NzaWJpbGl0aWVzLnB1c2goXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRocm91Z2ggdGhlIGZyaWVuZHNoaXAgZ2F0ZXdheVwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoR2F0ZXdheVNjZW5lXCIgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zc2liaWxpdGllcztcbiAgICB9XG59O1xuXG5jb25zdCBydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGZvbGxvdyB0aGUgaGlkZGVuIHBhdGggYXMgaXQgYnJhbmNoZXMgdG8gdGhlIHJpZ2h0LlwiLFxuXG4gICAgXSxcbiAgICBjaG9pY2VzOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSBsZWZ0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lXCIgfSxcbiAgICAgICAgXVxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICAgICAgcG9zc2liaWxpdGllcy5wdXNoKFxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSByaWdodCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmVcIiB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3NzaWJpbGl0aWVzO1xuICAgIH1cbn07XG5cbmNvbnN0IHJ1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IHBhc3MgdGhyb3VnaCB0aGUgaGlkZGVuIGRvb3J3YXksIGFuZCBhcyB5b3UgZG8sXCIsXG4gICAgICAgIFwiVGhlIHZvaWNlIG9mIGEgd29tYW4gc3BlYWtzIGludG8geW91ciBtaW5kLiBTaGUgc3BlYWtzLFwiLFxuICAgICAgICBcIllvdSBzaGFsbCBmaW5kIHdoYXQgeW91IHNlZWsuLi5cIixcbiAgICAgICAgXCJZb3UgcGFzcyB0aHJvdWdoIHNoYWRlIGFuZCBjdXJsaW5nIGluY2Vuc2Ugc21va2VcIixcbiAgICAgICAgXCJBbmQgaGVhciB0aGUgc291bmQgb2YgdGhlIG1vb24gcmlzaW5nIGJleW9uZCB0aGUgaG9yaXpvblwiLFxuICAgICAgICBcIkFuZCBmYXIgYWJvdmUgeW91IGEgbXVzaWNhbCBmbHV0ZSBwbGF5cy4gWW91IHRoZW4gYXdha2VuXCIsXG4gICAgICAgIFwiSW4gYSBtYWdpY2FsIGZvcmVzdC4gWW91IG5vdGljZSBhIGJvb2sgaW4geW91ciBwb2NrZXQuXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkV4cGxvcmVcIiwgdmFsdWU6IFwiYXdha2VuX2V4cGxvcmVTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJUYWxrIHRvIHRoZSB0cmVlc1wiLCB2YWx1ZTogXCJhd2FrZW5fdGFsa1NjZW5lXCIgfSxcbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5pbnZlbnRvcnlbJ2RpYW1vbmRTdXRyYSddID0gMTtcbiAgICB9XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJ1aW5zX2VudGVyU2NlbmUsXG4gICAgcnVpbnNfZm95ZXJTY2VuZSxcblxuICAgIHJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZEJsdWVCb29rU2NlbmUsXG5cbiAgICBydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZFJlZEJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmVcbn0iLCJjb25zdCB0cmVlc190YWxrRW50ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAnYXdha2VuX3RhbGtTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgY29tbXVuaWNhdGUgd2l0aCB0aGUgYW5jaWVudCB0cmVlcyxcIixcbiAgICAgICAgXCJwbGFjaW5nIHlvdXIgaGFuZHMgb24gdGhlaXIgdHJ1bmtzLCBhc2tpbmcgdGhlbSB0byBzcGVhay5cIixcbiAgICAgICAgXCJUaGV5IHNheSwgXCIgKyBcIidXZSB3aWxsIHNwZWFrIHNvZnRseSBvZiBmb3Jnb3R0ZW4gc2VjcmV0cy4uLidcIixcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkFzayBhYm91dCB0aGUgZm9yZXN0J3MgaGlzdG9yeVwiLCB2YWx1ZTogXCJ0cmVlc19hc2tIaXN0b3J5U2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiSW5xdWlyZSBhYm91dCBtYWdpY2FsIGtub3dsZWRnZVwiLCB2YWx1ZTogXCJ0cmVlc19hc2tNYWdpY1NjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB5b3VyIHN1cnJvdW5kaW5nc1wiLCB2YWx1ZTogbnVsbCB9LFxuICAgIF1cbn07XG5cbmNvbnN0IHRyZWVzX2Fza0hpc3RvcnlTY2VuZSA9IHtcbiAgICBuYW1lOiAndHJlZXNfYXNrSGlzdG9yeVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIidJbiB0aGUgYmVnaW5uaW5nLCB0aGVyZSB3ZXJlIHRoZSBzZWVkbGluZ3MsIGZpcnN0IHRvIGF3YWtlbi4uLidcIixcbiAgICAgICAgXCInVGhlbiB0aGUgbG9uZyB5ZWFycyBvZiBtYW55IHR1cm5pbmdzIG9mIHRoZSBza3ktd2hlZWwuLi4nXCIsXG4gICAgICAgIFwiJ0FuZCB0aGVuIHRoZSBidXJuaW5nIG9mIHRoZSBjYW5vcHksIHdoaWNoIG1hZGUgdGhpcyBmb3Jlc3QuLi4nXCIsXG5cbiAgICBdLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkFzayBhYm91dCB0aGUgc2VlZGxpbmdzXCIsIHZhbHVlOiBcInRyZWVzX2Fza1NlZWRsaW5nc1NjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkFzayBhYm91dCB0aGUgbG9uZyB5ZWFyc1wiLCB2YWx1ZTogXCJ0cmVlc19hc2tMb25nWWVhcnNTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJBc2sgYWJvdXQgdGhlIGNhbm9weVwiLCB2YWx1ZTogXCJ0cmVlc19hc2tDYW5vcHlTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJBc2sgc29tZXRoaW5nIGVsc2VcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCB0cmVlc19hc2tTZWVkbGluZ3NTY2VuZSA9IHtcbiAgICBuYW1lOiAndHJlZXNfYXNrU2VlZGxpbmdzU2NlbmUnLFxuICAgIGVwaGVtZXJhbDogdHJ1ZSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIicuLi4nXCIsXG4gICAgICAgIFwiJ3RoZSBzZWVkbGluZ3Mgd2VyZSBiZWZvcmUgdXMsIGFuZCB0aGV5IGFyZSBhZnRlciB1cy4uLidcIixcbiAgICAgICAgXCInLi4uJ1wiXG4gICAgXVxufTtcblxuY29uc3QgdHJlZXNfYXNrTG9uZ1llYXJzU2NlbmUgPSB7XG4gICAgbmFtZTogJ3RyZWVzX2Fza0xvbmdZZWFyc1NjZW5lJyxcbiAgICBlcGhlbWVyYWw6IHRydWUsXG4gICAgc3RhY2s6IHRydWUsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCInLi4uJ1wiLFxuICAgICAgICBcIid0aGUgbG9uZyB5ZWFycyB3ZXJlIG9mIHdlYXJpbmVzcyBhbmQgd29lLi4uJ1wiLFxuICAgICAgICBcIicuLi4nXCJcbiAgICBdXG59O1xuXG5jb25zdCB0cmVlc19hc2tDYW5vcHlTY2VuZSA9IHtcbiAgICBuYW1lOiAndHJlZXNfYXNrQ2Fub3B5U2NlbmUnLFxuICAgIGVwaGVtZXJhbDogdHJ1ZSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIicuLi4nXCIsXG4gICAgICAgIFwiJ3RoZSBjYW5vcHkgYWZsYW1lLCBhbGl0LCBsaWtlIHRvcmNoZXMgYmxhemluZyBpbiBuaWdodC4uLidcIixcbiAgICAgICAgXCInLi4uJ1wiXG4gICAgXVxufTtcblxuY29uc3QgdHJlZXNfYXNrTWFnaWNTY2VuZSA9IHtcbiAgICBuYW1lOiAndHJlZXNfYXNrTWFnaWNTY2VuZScsXG4gICAgZXBoZW1lcmFsOiB0cnVlLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJy4uLidcIixcbiAgICAgICAgXCIndHJ1ZSBtYWdpYyBjYW4gbmV2ZXIgYmUgdXNlZCBmb3IgZXZpbC4uLidcIixcbiAgICAgICAgXCInLi4uJ1wiXG4gICAgXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdHJlZXNfdGFsa0VudGVyU2NlbmUsXG5cbiAgICB0cmVlc19hc2tIaXN0b3J5U2NlbmUsXG4gICAgdHJlZXNfYXNrU2VlZGxpbmdzU2NlbmUsXG4gICAgdHJlZXNfYXNrTG9uZ1llYXJzU2NlbmUsXG4gICAgdHJlZXNfYXNrQ2Fub3B5U2NlbmUsXG5cbiAgICB0cmVlc19hc2tNYWdpY1NjZW5lXG59OyIsImNvbnN0IHsgY29uc29sZWxvZyB9ID0gcmVxdWlyZSgnLi9pby5qcycpO1xuXG4vLyBUT0RPOiBtYWtlIHRoaXMgd29yayBpbiBicm93c2VyXG5jb25zdCBzdG9yeVRlbGwgPSAobGluZSkgPT4ge1xuICAgIGNvbnNvbGVsb2cobGluZSk7XG4gICAgLy8gVE9ETzogdXNlIG1hcmtvdiB0ZXh0IChvciBnZW5lcmF0aXZlIEFJPykgdG8gd3JpdGUgbW9yZSB0ZXh0IGluIHB1cnBsZVxufTtcblxuY29uc3Qgc3RvcnlUZWxsTWV0YSA9IChsaW5lLCBjb2xvcikgPT4ge1xuICAgIGNvbnNvbGVsb2cobGluZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdG9yeVRlbGwsXG4gICAgc3RvcnlUZWxsTWV0YVxufTsiLCJjb25zdCBzbGVlcCA9IChtcykgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgc2V0VGltZW91dChyZXMsIG1zKTtcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzbGVlcFxufTsiXX0=
