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
const { consolelog, logChoice } = require('./io.js');
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
        const choice = await interact(scene, state);
        const action = choice.value;
        logChoice(choice);
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
                } else if (scene.interact) {
                    scene.interact(scene, state, action);
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

},{"./describeItem.js":2,"./describeScene.js":3,"./gameData.js":9,"./interact.js":11,"./io.js":12,"./scenes/index.js":16,"./storyTeller.js":21,"./utils.js":22}],11:[function(require,module,exports){
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

const logChoice = (choice) => {
    const p = document.createElement('p');
    p.classList.add('choice');
    p.textContent = choice.name;
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
            const choiceSpan = document.createElement('span');
            choiceSpan.textContent = choice.name;
            choiceDiv.appendChild(choiceSpan);
            choiceDiv.addEventListener('click', () => {
                resolve(choice);
                choicesContainer.innerHTML = '';
            });
            choicesContainer.appendChild(choiceDiv);
        };
    });
};


module.exports = {
    consolelog,
    logChoice,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJibGFja2JvYXJkLmpzIiwiZGVzY3JpYmVJdGVtLmpzIiwiZGVzY3JpYmVTY2VuZS5qcyIsImRyZWFtL2JlYXIuanMiLCJkcmVhbS9jcm93LmpzIiwiZHJlYW0vZmlzaC5qcyIsImRyZWFtL2luZGV4LmpzIiwiZmlsdGVycy9jaG9pY2UuanMiLCJnYW1lRGF0YS5qcyIsImluZGV4LmpzIiwiaW50ZXJhY3QuanMiLCJpby5qcyIsIml0ZW1EZXNjcmlwdGlvbnMuanMiLCJzY2VuZXMvYXdha2VuLmpzIiwic2NlbmVzL2RyZWFtLmpzIiwic2NlbmVzL2luZGV4LmpzIiwic2NlbmVzL21hZ2ljLmpzIiwic2NlbmVzL21lbnUuanMiLCJzY2VuZXMvcnVpbnMuanMiLCJzY2VuZXMvdHJlZXMuanMiLCJzdG9yeVRlbGxlci5qcyIsInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBibGFja2JvYXJkID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJsYWNrYm9hcmRcbn07IiwiY29uc3QgeyBpdGVtRGVzY3JpcHRpb25zIH0gPSByZXF1aXJlKCcuL2l0ZW1EZXNjcmlwdGlvbnMuanMnKTtcbmNvbnN0IHsgc3RvcnlUZWxsIH0gPSByZXF1aXJlKCcuL3N0b3J5VGVsbGVyLmpzJyk7XG5cbmNvbnN0IGRlc2NyaWJlSXRlbSA9IChpdGVtTmFtZSkgPT4ge1xuICAgIHN0b3J5VGVsbChpdGVtRGVzY3JpcHRpb25zW2l0ZW1OYW1lXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmliZUl0ZW1cbn07XG4iLCJjb25zdCB7IHN0b3J5VGVsbCB9ID0gcmVxdWlyZSgnLi9zdG9yeVRlbGxlci5qcycpO1xuY29uc3QgeyBzbGVlcCB9ID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuXG5jb25zdCBkZXNjcmliZVNjZW5lID0gYXN5bmMgKHNjZW5lLCBzdGF0ZSkgPT4ge1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IHNjZW5lLmRlc2NyaXB0aW9uO1xuICAgIC8vIGlmIGEgZnVuY3Rpb24sIGNhbGwgaXQgKGl0IHNob3VsZCByZXR1cm4gZWl0aGVyIGFuIGFycmF5IG9yIG9uZSBsaW5lKVxuICAgIGlmIChkZXNjcmlwdGlvbi5hcHBseSAmJiBkZXNjcmlwdGlvbi5jYWxsKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24oc2NlbmUsIHN0YXRlKTtcbiAgICB9XG4gICAgLy8gaWYgaXQncyBhbiBhcnJheSwgcHJpbnQgZWFjaCBsaW5lXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVzY3JpcHRpb24pKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgc3RvcnlUZWxsKGxpbmUpO1xuICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9yLCBwcmludCBpdCBzaW1wbHkgKG9uZSBsaW5lKVxuICAgICAgICBzdG9yeVRlbGwoZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICBhd2FpdCBzbGVlcCgyMDApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpYmVTY2VuZVxufTsiLCJjb25zdCBiZWFyRHJlYW0gPSB7XG5cbiAgICBwZXJzcGVjdGl2ZTogXCJJIGFtYmxlZCB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgZm9yZXN0LCBteSBmdXIgYnJ1c2hpbmcgYWdhaW5zdCB0aGUgdmlicmFudCBmb2xpYWdlIGFzIEkgZXhwbG9yZWQgdGhlIG1hZ2ljYWwgcmVhbG0uXCIsXG5cbiAgICBzaWdodHM6IFtcbiAgICAgICAgXCJUb3dlcmluZ2x5IGFuY2llbnQgdHJlZXMgc3Vycm91bmRlZCBtZSwgdGhlaXIgYnJhbmNoZXMgYWRvcm5lZCB3aXRoIGdsb3dpbmcgYmxvc3NvbXMgdGhhdCBpbGx1bWluYXRlZCB0aGUgc2hhZG93eSBncm92ZXMuXCIsXG4gICAgICAgIFwiQSBnZW50bGUgYnJlZXplIGNhcnJpZWQgdGhlIHdoaXNwZXJzIG9mIHRoZSBmb3Jlc3QsIHJldmVhbGluZyB0aGUgc2VjcmV0cyBoaWRkZW4gd2l0aGluIHRoZSBydXN0bGluZyBsZWF2ZXMuXCIsXG4gICAgICAgIFwiQmVzaWRlIGEgdHJhbnF1aWwgc3RyZWFtLCBJIGRpc2NvdmVyZWQgc2hpbW1lcmluZyBwb29scyByZWZsZWN0aW5nIHRoZSBtb29uIGFuZCBzdGFycywgY3JlYXRpbmcgYSBjYXB0aXZhdGluZyBjZWxlc3RpYWwgZGlzcGxheS5cIixcbiAgICAgICAgXCJNeSBqb3VybmV5IGxlZCBtZSB0byBteXN0aWNhbCBwb3J0YWxzLCB0aGVpciBzdXJmYWNlcyBzaGltbWVyaW5nIHdpdGggYW4gb3RoZXJ3b3JsZGx5IGxpZ2h0LCB0ZW1wdGluZyBtZSB0byBwZWVyIGludG8gdGhlIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIlRocm91Z2ggcG9ydGFscywgSSB3aXRuZXNzZWQgc3VycmVhbCBsYW5kc2NhcGVzIOKAkyBmbG9hdGluZyBpc2xhbmRzIGFkb3JuZWQgd2l0aCBiaW9sdW1pbmVzY2VudCBmbG9yYSBhbmQgd2F0ZXJmYWxscyBjYXNjYWRpbmcgd2l0aCBsaXF1aWQgc3RhcmR1c3QuXCIsXG4gICAgXSxcblxuICAgIGludGVyYWN0aW9uczogW1xuICAgICAgICBcIkkgYXBwcm9hY2hlZCBhIHBvcnRhbCwgZmVlbGluZyBhIHRpbmdsaW5nIHNlbnNhdGlvbiBhcyBJIHRvdWNoZWQgaXQsIGJyaWVmbHkgY29ubmVjdGluZyB3aXRoIHRoZSBkcmVhbXdvcmxkIGJleW9uZC5cIixcbiAgICAgICAgXCJJbiB0aGUgZHJlYW13b3JsZCwgSSBlbmNvdW50ZXJlZCBmYW50YXN0aWNhbCBiZWluZ3Mg4oCTIGx1bWluZXNjZW50IGZpcmVmbGllcyB0aGF0IGRhbmNlZCBpbiBpbnRyaWNhdGUgcGF0dGVybnMgYW5kIHdpc2Ugb3dscyB0aGF0IHNoYXJlZCBhbmNpZW50IHdpc2RvbS5cIixcbiAgICAgICAgXCJXaXRoIGVhY2ggaW50ZXJhY3Rpb24sIHRoZSBib3VuZGFyaWVzIGJldHdlZW4gcmVhbGl0eSBhbmQgZHJlYW1zIGJsdXJyZWQsIGNyZWF0aW5nIGEgdGFwZXN0cnkgb2YgZW5jaGFudG1lbnQgYW5kIHdvbmRlci5cIixcbiAgICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBiZWFyRHJlYW1cbn07IiwiY29uc3QgY3Jvd0RyZWFtID0ge1xuXG4gICAgcGVyc3BlY3RpdmU6IFwiSSBzb2FyZWQgdGhyb3VnaCB0aGUgZW5jaGFudGVkIGZvcmVzdCwgbXkgZWJvbnkgZmVhdGhlcnMgY2F0Y2hpbmcgdGhlIG1vb25saWdodCBhcyBJIG5hdmlnYXRlZCB0aGUgdHdpc3RlZCBicmFuY2hlcyBhbmQgZXRoZXJlYWwgZ2xvd3MuXCIsXG5cbiAgICBzaWdodHM6IFtcbiAgICAgICAgXCJCZW5lYXRoIG1lLCBhbmNpZW50IHRyZWVzIHN0b29kIHRhbGwsIHRoZWlyIGduYXJsZWQgcm9vdHMgZW50d2luZWQgd2l0aCBsdW1pbmVzY2VudCBtb3NzIHRoYXQgcHVsc2VkIHdpdGggYSBteXN0aWNhbCBlbmVyZ3kuXCIsXG4gICAgICAgIFwiQSBnZW50bGUgYnJlZXplIGNhcnJpZWQgdGhlIHdoaXNwZXJzIG9mIHRoZSBmb3Jlc3QsIHJldmVhbGluZyB0aGUgc2VjcmV0cyBoaWRkZW4gd2l0aGluIHRoZSBydXN0bGluZyBsZWF2ZXMuXCIsXG4gICAgICAgIFwiQXMgSSBnbGlkZWQgb3ZlciBhIGNyeXN0YWwtY2xlYXIgcG9uZCwgdGhlIHdhdGVyIHJlZmxlY3RlZCB0aGUgc3RhcnJ5IHNreSBhYm92ZSwgY3JlYXRpbmcgYSBtaXJyb3ItbGlrZSBzdXJmYWNlIHRoYXQgc2VlbWVkIHRvIGhvbGQgdGhlIGNvbnN0ZWxsYXRpb25zIHdpdGhpbiBpdHMgZGVwdGhzLlwiLFxuICAgICAgICBcIk9jY2FzaW9uYWxseSwgSSBlbmNvdW50ZXJlZCBzaGltbWVyaW5nIHBvcnRhbHMgdGhhdCBmbGlja2VyZWQgYXQgdGhlIGVkZ2Ugb2YgcmVhbGl0eSwgYmVja29uaW5nIHdpdGggcHJvbWlzZXMgb2YgYSBkcmVhbXdvcmxkIGJleW9uZC5cIixcbiAgICAgICAgXCJUaHJvdWdoIHBvcnRhbHMsIEkgZ2xpbXBzZWQgc3VycmVhbCBsYW5kc2NhcGVzIOKAkyBmbG9hdGluZyBpc2xhbmRzIGFkb3JuZWQgd2l0aCBmbG9hdGluZyBmbG93ZXJzLCBhbmQgY2FzY2FkaW5nIHdhdGVyZmFsbHMgdGhhdCBzcGFya2xlZCB3aXRoIGxpcXVpZCBzdGFyZHVzdC5cIixcbiAgICBdLFxuXG4gICAgaW50ZXJhY3Rpb25zOiBbXG4gICAgICAgIFwiSSBkaXBwZWQgZG93biB0byB0b3VjaCB0aGUgc3VyZmFjZSBvZiBhIHBvcnRhbCwgZmVlbGluZyBhIHRpbmdsaW5nIHNlbnNhdGlvbiBhcyBJIGJyaWVmbHkgY29ubmVjdGVkIHdpdGggdGhlIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIkluIHRoZSBkcmVhbXdvcmxkLCBJIGVuY291bnRlcmVkIGZhbnRhc3RpY2FsIGNyZWF0dXJlcyDigJMgc2hpbW1lcmluZyBidXR0ZXJmbGllcyB0aGF0IGxlZnQgdHJhaWxzIG9mIGlyaWRlc2NlbmNlIGluIHRoZWlyIHdha2UgYW5kIHRhbGtpbmcgdHJlZXMgdGhhdCBzaGFyZWQgYW5jaWVudCB0YWxlcy5cIixcbiAgICAgICAgXCJXaXRoIGVhY2ggaW50ZXJhY3Rpb24sIHRoZSBib3VuZGFyeSBiZXR3ZWVuIHJlYWxpdHkgYW5kIGRyZWFtcyBibHVycmVkLCBjcmVhdGluZyBhIGthbGVpZG9zY29waWMgdGFwZXN0cnkgb2Ygd29uZGVyIGFuZCBlbmNoYW50bWVudC5cIixcbiAgICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcm93RHJlYW1cbn07IiwiY29uc3QgZmlzaERyZWFtID0ge1xuXG4gICAgcGVyc3BlY3RpdmU6IFwiSSBnbGlkZWQgdGhyb3VnaCB0aGUgZW5jaGFudGVkIHJpdmVyLCBzY2FsZXMgc2hpbW1lcmluZyBpbiB0aGUgbW9vbmxpdCB3YXRlcnMgYXMgSSBleHBsb3JlZCB0aGUgaGlkZGVuIGRlcHRocyBvZiB0aGUgbXlzdGljYWwgZm9yZXN0LlwiLFxuXG4gICAgc2lnaHRzOiBbXG4gICAgICAgIFwiU3VubGlnaHQgZmlsdGVyZWQgdGhyb3VnaCB0aGUgd2F0ZXIsIGNhc3RpbmcgYSBtZXNtZXJpemluZyBkYW5jZSBvZiBzaGFkb3dzIG9uIHRoZSByaXZlcmJlZCwgcmV2ZWFsaW5nIGFuY2llbnQgc3RvbmVzIGFkb3JuZWQgd2l0aCBteXN0ZXJpb3VzIHJ1bmVzLlwiLFxuICAgICAgICBcIkFxdWF0aWMgcGxhbnRzIHN3YXllZCBnZW50bHkgaW4gdGhlIGN1cnJlbnQsIHRoZWlyIHZpYnJhbnQgY29sb3JzIGNyZWF0aW5nIGEga2FsZWlkb3Njb3BlIG9mIGh1ZXMgdGhhdCBtaXJyb3JlZCB0aGUgZW5jaGFudG1lbnQgb2YgdGhlIGZvcmVzdCBhYm92ZS5cIixcbiAgICAgICAgXCJJIG5hdmlnYXRlZCB0aHJvdWdoIGEgc3VibWVyZ2VkIGFyY2h3YXksIGl0cyBlbnRyYW5jZSBndWFyZGVkIGJ5IGV0aGVyZWFsIGZpc2ggdGhhdCBnbG93ZWQgd2l0aCBhbiBvdGhlcndvcmxkbHkgbGlnaHQsIGd1aWRpbmcgbWUgdG8gc2VjcmV0IGFxdWF0aWMgcmVhbG1zLlwiLFxuICAgICAgICBcIlJheXMgb2YgbW9vbmxpZ2h0IHBlbmV0cmF0ZWQgdGhlIHN1cmZhY2UsIGNyZWF0aW5nIGEgY2VsZXN0aWFsIHBhdHRlcm4gdGhhdCBkYW5jZWQgdXBvbiB0aGUgcml2ZXIncyBmbG9vciwgYXMgaWYgdGhlIHN0YXJzIHRoZW1zZWx2ZXMgd2VyZSBzdWJtZXJnZWQgaW4gdGhlIHVuZGVyd2F0ZXIgd29ybGQuXCIsXG4gICAgICAgIFwiQXQgdGhlIGhlYXJ0IG9mIHRoZSByaXZlciwgSSBkaXNjb3ZlcmVkIGEgbXlzdGljYWwgd2hpcmxwb29sLCBhIGdhdGV3YXkgdG8gYSBkcmVhbXdvcmxkIHdoZXJlIHRoZSBjdXJyZW50cyB3aGlzcGVyZWQgdGFsZXMgb2YgYW5jaWVudCBhcXVhdGljIGNpdmlsaXphdGlvbnMuXCIsXG4gICAgXSxcblxuICAgIGludGVyYWN0aW9uczogW1xuICAgICAgICBcIkkgc3dhbSBpbnRvIGEgcmFkaWFudCBwb29sLCBmZWVsaW5nIGEgc3VyZ2Ugb2YgZW5lcmd5IGFzIEkgY29tbXVuZWQgd2l0aCB0aGUgcml2ZXIncyBzcGlyaXQsIGdsaW1wc2luZyB2aXNpb25zIG9mIHRoZSBmb3Jlc3QncyBoaXN0b3J5IHRocm91Z2ggdGhlIGViYiBhbmQgZmxvdyBvZiB3YXRlci5cIixcbiAgICAgICAgXCJJbiB0aGUgZHJlYW13b3JsZCBiZW5lYXRoIHRoZSBzdXJmYWNlLCBJIGVuY291bnRlcmVkIGV0aGVyZWFsIHJpdmVyIHNwaXJpdHMg4oCTIGdyYWNlZnVsIHdhdGVyIG55bXBocyB3aG8gd2VhdmVkIHRhbGVzIG9mIGZvcmdvdHRlbiB1bmRlcndhdGVyIGtpbmdkb21zIGFuZCBvZmZlcmVkIGdsaW1wc2VzIGludG8gdGhlIGZ1dHVyZS5cIixcbiAgICAgICAgXCJBcyBJIGFwcHJvYWNoZWQgdGhlIG15c3RpY2FsIHdoaXJscG9vbCwgSSBmZWx0IGEgcHVsbCB0b3dhcmRzIHRoZSBkcmVhbXdvcmxkLCB3aGVyZSBzY2hvb2xzIG9mIHBob3NwaG9yZXNjZW50IGZpc2ggc3dpcmxlZCBpbiBpbnRyaWNhdGUgcGF0dGVybnMsIHN5bWJvbGl6aW5nIHRoZSBpbnRlcmNvbm5lY3RlZG5lc3Mgb2YgdGhlIHJpdmVyIGFuZCB0aGUgZm9yZXN0IGFib3ZlLlwiLFxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZpc2hEcmVhbVxufTsiLCJjb25zdCB7IGNyb3dEcmVhbSB9ID0gcmVxdWlyZSgnLi9jcm93LmpzJyk7XG5jb25zdCB7IGJlYXJEcmVhbSB9ID0gcmVxdWlyZSgnLi9iZWFyLmpzJyk7XG5jb25zdCB7IGZpc2hEcmVhbSB9ID0gcmVxdWlyZSgnLi9maXNoLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyb3dEcmVhbSxcbiAgICBiZWFyRHJlYW0sXG4gICAgZmlzaERyZWFtXG59O1xuIiwiY29uc3QgY2hvaWNlRmlsdGVyID0gKGNob2ljZXMsIHN0YXRlKSA9PiB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IGNob2ljZSBmaWx0ZXJpbmcgYnkgdXNpbmcgc3RhdGVcbiAgICByZXR1cm4gY2hvaWNlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNob2ljZUZpbHRlclxufTsiLCJjb25zdCBnYW1lRGF0YSA9IHtcbiAgICBhd2FrZW5TdGF0ZToge1xuICAgICAgICBuYW1lOiAnbnVsbCcsXG4gICAgICAgIG1pbmQ6ICdjYWxtJyxcbiAgICAgICAgaW52ZW50b3J5OiB7XG4gICAgICAgICAgICAnaGVhcnRTdXRyYSc6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWx0aDogMjAsXG4gICAgICAgIGF1cmFzOiBuZXcgU2V0KCksXG4gICAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdhbWVEYXRhXG59OyIsImNvbnN0IHsgY29uc29sZWxvZywgbG9nQ2hvaWNlIH0gPSByZXF1aXJlKCcuL2lvLmpzJyk7XG5jb25zdCB7IGRlc2NyaWJlU2NlbmUgfSA9IHJlcXVpcmUoJy4vZGVzY3JpYmVTY2VuZS5qcycpO1xuY29uc3QgeyBkZXNjcmliZUl0ZW0gfSA9IHJlcXVpcmUoJy4vZGVzY3JpYmVJdGVtLmpzJyk7XG5jb25zdCB7IGludGVyYWN0IH0gPSByZXF1aXJlKCcuL2ludGVyYWN0LmpzJyk7XG5jb25zdCB7IHNsZWVwIH0gPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5jb25zdCB7IGdhbWVEYXRhIH0gPSByZXF1aXJlKCcuL2dhbWVEYXRhLmpzJyk7XG5jb25zdCBzY2VuZXMgPSByZXF1aXJlKCcuL3NjZW5lcy9pbmRleC5qcycpO1xuY29uc3QgeyBzdG9yeVRlbGxNZXRhIH0gPSByZXF1aXJlKCcuL3N0b3J5VGVsbGVyLmpzJyk7XG5cblxuXG5jb25zdCBhd2FrZW4gPSAoKSA9PiAoXG4gICAgW1xuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBzY2VuZXMuYXdha2VuX2VudGVyU2NlbmUpLFxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBnYW1lRGF0YS5hd2FrZW5TdGF0ZSlcbiAgICBdXG4pO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuXG4gICAgLy8gYmVnaW4gdGhlIHNjZW5lIGFuZCB0aGUgc3RhdGVcbiAgICBjb25zdCBbZmlyc3RTY2VuZSwgc3RhdGVdID0gYXdha2VuKCk7XG4gICAgbGV0IHNjZW5lU3RhY2sgPSBbZmlyc3RTY2VuZV07XG5cbiAgICAvLyBnYW1lIGxvb3BcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAvLyBUT0RPOiBydW4gZ2xvYmFsIGxvZ2ljcyBlYWNoIGxvb3AsIGxpa2UgYSByYW5kb20gZW5jb3VudGVyIGNoYW5jZSwgb3IgdmFuaXNoIHN0YXRlLmV4dHJhU2Vuc2UgYWZ0ZXIgMyBzY2VuZXMsIGV0Yy5cblxuXG4gICAgICAgIC8vIGNvbnNpZGVyIHRoZSBjdXJyZW50IHNjZW5lXG4gICAgICAgIC8vIChidXQgZmlyc3QsIGd1YXJkIGFnYWluc3QgemVyby1zdGFjaylcbiAgICAgICAgaWYgKHNjZW5lU3RhY2subGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHNjZW5lU3RhY2sucHVzaChhd2FrZW4oKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2NlbmUgPSBzY2VuZVN0YWNrW3NjZW5lU3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIGNvbnNvbGUubG9nKHNjZW5lKTtcblxuXG4gICAgICAgIC8vIGF3YWtlbiBmcm9tIGFueSBkcmVhbSBzY2VuZSBpZiBzdGF0ZS5kcmVhbWluZyA9PSAwXG4gICAgICAgIGlmIChzY2VuZS5pc0RyZWFtICYmIHN0YXRlLmRyZWFtaW5nID09IDApIHtcbiAgICAgICAgICAgIHNjZW5lU3RhY2sgPSBbc2NlbmVzLmF3YWtlbl9lbnRlclNjZW5lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGRpc3BsYXkgdGhlIHNjZW5lXG4gICAgICAgIC8vXG4gICAgICAgIGF3YWl0IGRlc2NyaWJlU2NlbmUoc2NlbmUsIHN0YXRlKTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBpbnRlcmFjdCB3aXRoIHRoZSBzY2VuZSAoYW5kIGdldCB0aGUgbmV4dCBzY2VuZSlcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhlIENMSSBpbnRlcmFjdHMgd2l0aCB0aGUgdXNlciwgYW5kIHRoZVxuICAgICAgICAvLyB1c2VyJ3MgaW5wdXQgaW50ZXJhY3RzIHdpdGggdGhlIHNjZW5lXG4gICAgICAgIC8vIHdlIHVsdGltYXRlbHkgd2FudCB0byBrbm93IHdoYXQgc2NlbmUgaXMgbmV4dFxuICAgICAgICAvLyBnaXZlbiBpdHMgbmFtZSBhcyBhIGtleSAoZXZlcnkgbW9tZW50LCB3ZSB1bmxvY2tcbiAgICAgICAgLy8gYSBtYWdpYyBkb29yISA8MylcbiAgICAgICAgbGV0IHNjZW5lS2V5ID0gbnVsbDtcbiAgICAgICAgLy8gZXBoZW1lcmFsIHNjZW5lcyBoYXZlIG5vIGFjdGlvbiwgdGhleSBqdXN0IGRpc3BsYXkgdGhlaXIgZGVzY3JpcHRpb24gYW5kIHBvcCBvZmZcbiAgICAgICAgaWYgKHNjZW5lLmVwaGVtZXJhbCkge1xuICAgICAgICAgICAgc2NlbmVTdGFjay5wb3AoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNob2ljZSA9IGF3YWl0IGludGVyYWN0KHNjZW5lLCBzdGF0ZSk7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNob2ljZS52YWx1ZTtcbiAgICAgICAgbG9nQ2hvaWNlKGNob2ljZSk7XG4gICAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICgvLitTY2VuZS8udGVzdChhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBvZiB0aGUgY2hvaWNlIHdhcyBhIHNjZW5lIG5hbWUuLi5cbiAgICAgICAgICAgICAgICAgICAgc2NlbmVLZXkgPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvZGVzY3JpYmVJdGVtXy4rLy50ZXN0KGFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHZhbHVlIG9mIHRoZSBjaG9pY2Ugd2FzIHRvIGRlc2NyaWJlIGFuIGl0ZW0uLi5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBhY3Rpb24ubWF0Y2goL2Rlc2NyaWJlSXRlbV8oLispLylbMV07XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaWJlSXRlbShpdGVtTmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2VuZS5pbnRlcmFjdCkge1xuICAgICAgICAgICAgICAgICAgICBzY2VuZS5pbnRlcmFjdChzY2VuZSwgc3RhdGUsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndW5rbm93biBhY3Rpb24gJyArIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAgICAgLy8gc2NlbmUgaGFzIGVuZGVkLCBydW4gb25FbmQgaG9va1xuICAgICAgICBpZiAoc2NlbmUub25FbmQpIHtcbiAgICAgICAgICAgIHNjZW5lLm9uRW5kKHNjZW5lLCBzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc2NlbmVcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKCFzY2VuZUtleSkge1xuICAgICAgICAgICAgLy8gaWYgZ2l2ZW4gbm8gc2NlbmVLZXksIG5vdGhpbmcgaXMgbmV4dCwgc2ltcGx5IHBvcCB0aGlzIHNjZW5lXG4gICAgICAgICAgICBzY2VuZVN0YWNrLnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzY2VuZXNbc2NlbmVLZXldKSB7XG4gICAgICAgICAgICBzdG9yeVRlbGxNZXRhKCdUaGUgbXVzZXMgaGF2ZSBub3Qgc2VlbiB0aGF0IGZhciBpbnRvIHRoZSB0YWxlIHlldC4uLicsICd5ZWxsb3cnKTtcbiAgICAgICAgICAgIHN0b3J5VGVsbE1ldGEoJ35+ficsICdibHVlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2NlbmUgPSBPYmplY3QuYXNzaWduKHt9LCBzY2VuZXNbc2NlbmVLZXldKTtcbiAgICAgICAgICAgIGlmIChuZXh0U2NlbmUuc3RhY2spIHtcbiAgICAgICAgICAgICAgICBzY2VuZVN0YWNrLnB1c2gobmV4dFNjZW5lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NlbmVTdGFja1tzY2VuZVN0YWNrLmxlbmd0aCAtIDFdID0gbmV4dFNjZW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zb2xlLmxvZygnVFVSVExFIFFVRVNUIENPTlNPTEUnKTtcbm1haW4oKTtcbiIsImNvbnN0IHsgaW5xdWlyZSB9ID0gcmVxdWlyZSgnLi9pby5qcycpO1xuY29uc3QgeyBjaG9pY2VGaWx0ZXIgfSA9IHJlcXVpcmUoJy4vZmlsdGVycy9jaG9pY2UuanMnKTtcblxuYXN5bmMgZnVuY3Rpb24gaW50ZXJhY3Qoc2NlbmUsIHN0YXRlKSB7XG4gICAgLy9cbiAgICAvLyBjb25zdHJ1Y3QgY2hvaWNlc1xuICAgIC8vXG4gICAgLy8gY29weSBjaG9pY2VzIHdpdGggQXJyYXkuZnJvbSAod2Ugd2lsbCBtdXRhdGUgaXQpXG4gICAgLy8gKG5vdGU6IGNob2ljZXMgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkgb3Igbm90IGV2ZW4gcHJlc2VudClcbiAgICBsZXQgY2hvaWNlcyA9IHNjZW5lLmNob2ljZXMgP1xuICAgICAgICAoKHNjZW5lLmNob2ljZXMuY2FsbCAmJiBzY2VuZS5jaG9pY2VzLmFwcGx5KSA/XG4gICAgICAgICAgICBBcnJheS5mcm9tKHNjZW5lLmNob2ljZXMoc2NlbmUsIHN0YXRlKSkgOlxuICAgICAgICAgICAgQXJyYXkuZnJvbShzY2VuZS5jaG9pY2VzKSlcbiAgICAgICAgOiBbXTtcbiAgICBpZiAoIXNjZW5lLmV4Y2x1c2l2ZUNob2ljZXMpIHtcbiAgICAgICAgLy8gYWRkIG1hZ2ljIGNob2ljZSBpZiBub3QgYWxyZWFkeSBpbiBtYWdpY1NjZW5lXG4gICAgICAgIGlmIChzY2VuZS5uYW1lICE9PSAnbWFnaWNTY2VuZScgJiYgc2NlbmUubmFtZSAhPT0gJ21lbnVTY2VuZScpIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IFwiVXNlIG1hZ2ljXCIsIHZhbHVlOiBcIm1hZ2ljU2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGQgZHJlYW0gb3B0aW9uIGlmIHN0YXRlLmRyZWFtaW5nID4gMFxuICAgICAgICBpZiAoc3RhdGUuZHJlYW1pbmcgPiAwKSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBcIkRyZWFtXCIsIHZhbHVlOiBcImRyZWFtU2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGQgbWVudSBjaG9pY2UgaWYgbm90IGFscmVhZHkgaW4gbWVudVNjZW5lXG4gICAgICAgIGlmIChzY2VuZS5uYW1lICE9PSAnbWVudVNjZW5lJykge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogXCJPcGVuIG1lbnVcIiwgdmFsdWU6IFwibWVudVNjZW5lXCIgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gYXBwbHkgY2hvaWNlRmlsdGVyIGJhc2VkIG9uIHN0YXRlXG4gICAgY2hvaWNlcyA9IGNob2ljZUZpbHRlcihjaG9pY2VzLCBzdGF0ZSk7XG4gICAgLy8gaWYgYXBwbGljYWJsZSwgYXBwbHkgc2NlbmUgY2hvaWNlRmlsdGVyXG4gICAgaWYgKHNjZW5lLmNob2ljZUZpbHRlcikge1xuICAgICAgICBjaG9pY2VzID0gc2NlbmUuY2hvaWNlRmlsdGVyKGNob2ljZXMpO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gaW50ZXJhY3RcbiAgICAvL1xuICAgIC8vIHVzZSBpbnF1aXJlciB0byBnZXQgYWN0dWFsIGludGVyYWN0aW9uXG4gICAgcmV0dXJuIGlucXVpcmUoY2hvaWNlcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGludGVyYWN0XG59O1xuIiwiY29uc3QgY29uc29sZWxvZyA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICB0ZXJtaW5hbC5hcHBlbmRDaGlsZChwKTtcbiAgICB0ZXJtaW5hbC5zY3JvbGxUb3AgPSB0ZXJtaW5hbC5zY3JvbGxIZWlnaHQ7XG59O1xuXG5jb25zdCBsb2dDaG9pY2UgPSAoY2hvaWNlKSA9PiB7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwLmNsYXNzTGlzdC5hZGQoJ2Nob2ljZScpO1xuICAgIHAudGV4dENvbnRlbnQgPSBjaG9pY2UubmFtZTtcbiAgICB0ZXJtaW5hbC5hcHBlbmRDaGlsZChwKTtcbiAgICB0ZXJtaW5hbC5zY3JvbGxUb3AgPSB0ZXJtaW5hbC5zY3JvbGxIZWlnaHQ7XG59O1xuXG5jb25zdCBpbnF1aXJlID0gKGNob2ljZXMpID0+IHtcbiAgICBjb25zdCBjaG9pY2VzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nob2ljZXMtY29udGFpbmVyJyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNob2ljZXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgY2hvaWNlIG9mIGNob2ljZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2hvaWNlLnZhbHVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hvaWNlKTtcbiAgICAgICAgICAgIGNvbnN0IGNob2ljZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2hvaWNlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNob2ljZVNwYW4udGV4dENvbnRlbnQgPSBjaG9pY2UubmFtZTtcbiAgICAgICAgICAgIGNob2ljZURpdi5hcHBlbmRDaGlsZChjaG9pY2VTcGFuKTtcbiAgICAgICAgICAgIGNob2ljZURpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNob2ljZSk7XG4gICAgICAgICAgICAgICAgY2hvaWNlc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hvaWNlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjaG9pY2VEaXYpO1xuICAgICAgICB9O1xuICAgIH0pO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb25zb2xlbG9nLFxuICAgIGxvZ0Nob2ljZSxcbiAgICBpbnF1aXJlXG59OyIsImNvbnN0IGl0ZW1EZXNjcmlwdGlvbnMgPSB7XG4gICAgJ2hlYXJ0U3V0cmEnOiAnYSB3ZWF0aGVyZWQgY29weSBvZiB0aGUgaGVhcnQgc3V0cmEsIGdpdmVuIHRvIHlvdSBieSBhIGZyaWVuZCBsb25nIGFnbycsXG4gICAgJ2RpYW1vbmRTdXRyYSc6ICdhIGNvcHkgb2YgdGhlIGRpYW1vbmQgc3V0cmE7IHdoZXJlIGRpZCBpdCBjb21lIGZyb20uLi4/J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXRlbURlc2NyaXB0aW9uc1xufTsiLCJjb25zdCBhd2FrZW5fZW50ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAnYXdha2VuX2VudGVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbG9jYXRpb25zID0gWydnbGFkZScsICdncm92ZScsICdjbGVhcmluZycsICd2YWxsZXknXTtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbG9jYXRpb25zLmxlbmd0aCldO1xuXG4gICAgICAgIGNvbnN0IGluc2VjdHMgPSBbJ2J1dHRlcmZsaWVzJywgJ2ZpcmVmbGllcycsICdtYXlmbGllcyddO1xuICAgICAgICBjb25zdCBpbnNlY3QgPSBpbnNlY3RzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGluc2VjdHMubGVuZ3RoKV07XG5cbiAgICAgICAgY29uc3QgbXNnID0gW1xuICAgICAgICAgICAgYFlvdSBhd2FrZW4ke3N0YXRlLmF3YWtlbmVkID8gJyBhZ2FpbiAnIDogJyAnfWluIGEgbXlzdGVyaW91cyBmb3Jlc3QuYCxcbiAgICAgICAgICAgIGBZb3UgYXJlIGluIGEgJHtsb2NhdGlvbn0gd2hlcmUgJHtpbnNlY3R9IGdhdGhlcmAsXG4gICAgICAgICAgICBcIlRoZSBhaXIgaXMgZW5jaGFudGVkIHdpdGggbXVjaCBtZW1vcnkuXCIsXG4gICAgICAgICAgICBcIllvdSBoZWFyIGZhaW50bHkgdGhlIGxlYXZlcyBpbiB0aGUgY2Fub3B5IGRhbmNpbmcuXCIsXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBtc2c7XG4gICAgfSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuYXdha2VuZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiRXhwbG9yZVwiLCB2YWx1ZTogXCJhd2FrZW5fZXhwbG9yZVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRhbGsgdG8gdGhlIHRyZWVzXCIsIHZhbHVlOiBcInRyZWVzX3RhbGtFbnRlclNjZW5lXCIgfSxcbiAgICBdXG59O1xuXG5jb25zdCBhd2FrZW5fZXhwbG9yZVNjZW5lID0ge1xuICAgIG5hbWU6ICdhd2FrZW5fZXhwbG9yZVNjZW5lJyxcblxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgYWRqZWN0aXZlcyA9IFsnbXlzdGVyaW91cycsICdlbmNoYW50ZWQnLCAnYW5jaWVudCddO1xuICAgICAgICBjb25zdCBhZGplY3RpdmUgPSBhZGplY3RpdmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFkamVjdGl2ZXMubGVuZ3RoKV07XG5cbiAgICAgICAgY29uc3QgbWluZCA9IHN0YXRlLm1pbmQ7XG5cbiAgICAgICAgY29uc3QgbXNncyA9IFtcbiAgICAgICAgICAgIGBZb3Ugd2FsaywgZXhwbG9yaW5nIHRoZSAke2FkamVjdGl2ZX0gZm9yZXN0LmAsXG4gICAgICAgICAgICBgWW91ciBtaW5kIC0gJHttaW5kfSAtIHNlZWtzIHRoZSB3YXkgdGhyb3VnaCB0aGUgZHJlYW0uYCxcbiAgICAgICAgICAgIFwiQXMgeW91IHdhbGssIHlvdSBzZWUgYSB2aW5lZ3Jvd24gZG9vcndheSB0byBhbmNpZW50IHJ1aW5zLlwiXG4gICAgICAgIF07XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4zMykge1xuICAgICAgICAgICAgc3RhdGUuZXh0cmFTZW5zZSA9IHRydWU7XG4gICAgICAgICAgICBtc2dzLnB1c2goXCJZb3UgYWxzbyBzZW5zZSBhIGhpZGRlbiBwYXRod2F5LlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgY2hvaWNlczogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhlIHJ1aW5zXCIsIHZhbHVlOiBcInJ1aW5zX2VudGVyU2NlbmVcIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlRhbGsgdG8gdGhlIHRyZWVzXCIsIHZhbHVlOiBcInRyZWVzX3RhbGtFbnRlclNjZW5lXCIgfSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHN0YXRlLmV4dHJhU2Vuc2UpIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IFwiRm9sbG93IHRoZSBoaWRkZW4gcGF0aFwiLCB2YWx1ZTogXCJwYXRoX2VudGVyU2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlcztcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhd2FrZW5fZW50ZXJTY2VuZSxcbiAgICBhd2FrZW5fZXhwbG9yZVNjZW5lXG59OyIsImNvbnN0IHsgY3Jvd0RyZWFtLCBiZWFyRHJlYW0sIGZpc2hEcmVhbSB9ID0gcmVxdWlyZSgnLi4vZHJlYW0vaW5kZXguanMnKTtcblxuY29uc3QgZHJlYW1TY2VuZSA9IHtcbiAgICBuYW1lOiAnZHJlYW1TY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgY2xvc2UgeW91ciBleWVzLCBsZXR0aW5nIHRoZSB3b3JsZCBmYWRlIGF3YXkgYXMgeW91IGVudGVyIGEgZHJlYW1saWtlIHN0YXRlLlwiLFxuICAgICAgICBcIkluIHRoaXMgcmVhbG0gb2YgZXRoZXJlYWwgcG9zc2liaWxpdGllcywgeW91ciBzcGlyaXQgZmVlbHMgaXQgY2FuIGRyZWFtIGFzIGFuIGFuaW1hbC4uLlwiXG4gICAgXSxcbiAgICBpc0RyZWFtOiB0cnVlLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkRyZWFtIGFzIGEgQ3Jvd1wiLCB2YWx1ZTogXCJjcm93RHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJEcmVhbSBhcyBhIEJlYXJcIiwgdmFsdWU6IFwiYmVhckRyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiRHJlYW0gYXMgYSBGaXNoXCIsIHZhbHVlOiBcImZpc2hEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB3YWtpbmcgbGlmZVwiLCB2YWx1ZTogbnVsbCB9LFxuICAgIF1cbn07XG5cbmNvbnN0IGNyb3dEcmVhbVNjZW5lID0ge1xuICAgIG5hbWU6ICdjcm93RHJlYW1TY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21TaWdodCA9IGNyb3dEcmVhbS5zaWdodHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3Jvd0RyZWFtLnNpZ2h0cy5sZW5ndGgpXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGBZb3UgdGFrZSBvbiB0aGUgcGVyc3BlY3RpdmUgb2YgYSBjcm93LCBzb2FyaW5nIHRocm91Z2ggdGhlIGVuY2hhbnRlZCBmb3Jlc3QuYCxcbiAgICAgICAgICAgIHJhbmRvbVNpZ2h0LFxuICAgICAgICAgICAgXCJUaGUgZHJlYW13b3JsZCBiZWNrb25zIHdpdGggbXlzdGVyaWVzLlwiLFxuICAgICAgICAgICAgXCJXaGF0IHdpbGwgeW91IGRvP1wiLFxuICAgICAgICBdO1xuICAgIH0sXG4gICAgaXNEcmVhbTogdHJ1ZSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIENyb3dcIiwgdmFsdWU6IFwiY3Jvd0RyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiSW50ZXJhY3Qgd2l0aCB0aGUgV29ybGRcIiwgdmFsdWU6IFwiY3Jvd0ludGVyYWN0U2NlbmVcIiB9LFxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmRyZWFtaW5nID0gTWF0aC5tYXgoMCwgc3RhdGUuZHJlYW1pbmcgLSAxKTtcbiAgICB9XG59O1xuXG5jb25zdCBiZWFyRHJlYW1TY2VuZSA9IHtcbiAgICBuYW1lOiAnYmVhckRyZWFtU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tU2lnaHQgPSBiZWFyRHJlYW0uc2lnaHRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJlYXJEcmVhbS5zaWdodHMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBgWW91IGVtYm9keSB0aGUgc3Bpcml0IG9mIGEgYmVhciwgYW1ibGluZyB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgZm9yZXN0LmAsXG4gICAgICAgICAgICByYW5kb21TaWdodCxcbiAgICAgICAgICAgIFwiVGhlIGRyZWFtd29ybGQgdW5mb2xkcyBpdHMgc2VjcmV0cyBiZWZvcmUgeW91LlwiLFxuICAgICAgICAgICAgXCJXaGF0IHdpbGwgeW91IGRvP1wiLFxuICAgICAgICBdO1xuICAgIH0sXG4gICAgaXNEcmVhbTogdHJ1ZSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIEJlYXJcIiwgdmFsdWU6IFwiYmVhckRyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiSW50ZXJhY3Qgd2l0aCB0aGUgV29ybGRcIiwgdmFsdWU6IFwiYmVhckludGVyYWN0U2NlbmVcIiB9LFxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmRyZWFtaW5nID0gTWF0aC5tYXgoMCwgc3RhdGUuZHJlYW1pbmcgLSAxKTtcbiAgICB9XG59O1xuXG5jb25zdCBmaXNoRHJlYW1TY2VuZSA9IHtcbiAgICBuYW1lOiAnZmlzaERyZWFtU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tU2lnaHQgPSBmaXNoRHJlYW0uc2lnaHRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZpc2hEcmVhbS5zaWdodHMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBgWW91IGJlY29tZSBvbmUgd2l0aCBhIHJpdmVyLWR3ZWxsaW5nIGZpc2gsIGdsaWRpbmcgdGhyb3VnaCB0aGUgbXlzdGljYWwgd2F0ZXJzLmAsXG4gICAgICAgICAgICByYW5kb21TaWdodCxcbiAgICAgICAgICAgIFwiVGhlIGRyZWFtd29ybGQgYmVuZWF0aCB0aGUgc3VyZmFjZSBob2xkcyB1bnRvbGQgd29uZGVycy5cIixcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbz9cIixcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIGlzRHJlYW06IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBGaXNoXCIsIHZhbHVlOiBcImZpc2hEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkludGVyYWN0IHdpdGggdGhlIFdvcmxkXCIsIHZhbHVlOiBcImZpc2hJbnRlcmFjdFNjZW5lXCIgfSxcbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5kcmVhbWluZyA9IE1hdGgubWF4KDAsIHN0YXRlLmRyZWFtaW5nIC0gMSk7XG4gICAgfVxufTtcblxuY29uc3QgY3Jvd0ludGVyYWN0U2NlbmUgPSB7XG4gICAgbmFtZTogJ2Nyb3dJbnRlcmFjdFNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUludGVyYWN0aW9uID0gY3Jvd0RyZWFtLmludGVyYWN0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjcm93RHJlYW0uaW50ZXJhY3Rpb25zLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCJZb3UgZGVjaWRlIHRvIGludGVyYWN0IHdpdGggdGhlIGRyZWFtd29ybGQgYXMgYSBjcm93LlwiLFxuICAgICAgICAgICAgYFRoZSBkcmVhbXdvcmxkIHJlc3BvbmRzIHdpdGg6IFwiJHtyYW5kb21JbnRlcmFjdGlvbn1cImAsXG4gICAgICAgICAgICBcIldoYXQgd2lsbCB5b3UgZG8gbmV4dD9cIixcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNvbnRpbnVlIERyZWFtaW5nIGFzIGEgQ3Jvd1wiLCB2YWx1ZTogXCJjcm93RHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIEZvcmVzdFwiLCB2YWx1ZTogbnVsbCB9LFxuICAgIF1cbn07XG5cbmNvbnN0IGJlYXJJbnRlcmFjdFNjZW5lID0ge1xuICAgIG5hbWU6ICdiZWFySW50ZXJhY3RTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21JbnRlcmFjdGlvbiA9IGJlYXJEcmVhbS5pbnRlcmFjdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYmVhckRyZWFtLmludGVyYWN0aW9ucy5sZW5ndGgpXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiWW91IGNob29zZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBkcmVhbXdvcmxkIGFzIGEgYmVhci5cIixcbiAgICAgICAgICAgIGBUaGUgZHJlYW13b3JsZCByZXNwb25kcyB3aXRoOiBcIiR7cmFuZG9tSW50ZXJhY3Rpb259XCJgLFxuICAgICAgICAgICAgXCJXaGF0IHdpbGwgeW91IGRvIG5leHQ/XCIsXG4gICAgICAgIF07IGZyb21cbiAgICB9LFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNvbnRpbnVlIERyZWFtaW5nIGFzIGEgQmVhclwiLCB2YWx1ZTogXCJiZWFyRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIEZvcmVzdFwiLCB2YWx1ZTogbnVsbCB9LFxuICAgIF1cbn07XG5cbmNvbnN0IGZpc2hJbnRlcmFjdFNjZW5lID0ge1xuICAgIG5hbWU6ICdmaXNoSW50ZXJhY3RTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21JbnRlcmFjdGlvbiA9IGZpc2hEcmVhbS5pbnRlcmFjdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlzaERyZWFtLmludGVyYWN0aW9ucy5sZW5ndGgpXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiWW91IGRlY2lkZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBkcmVhbXdvcmxkIGFzIGEgZmlzaC5cIixcbiAgICAgICAgICAgIGBUaGUgZHJlYW13b3JsZCByZXNwb25kcyB3aXRoOiBcIiR7cmFuZG9tSW50ZXJhY3Rpb259XCJgLFxuICAgICAgICAgICAgXCJXaGF0IHdpbGwgeW91IGRvIG5leHQ/XCIsXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIEZpc2hcIiwgdmFsdWU6IFwiZmlzaERyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBGb3Jlc3RcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkcmVhbVNjZW5lLFxuICAgIGNyb3dEcmVhbVNjZW5lLFxuICAgIGJlYXJEcmVhbVNjZW5lLFxuICAgIGZpc2hEcmVhbVNjZW5lLFxuICAgIGNyb3dJbnRlcmFjdFNjZW5lLFxuICAgIGJlYXJJbnRlcmFjdFNjZW5lLFxuICAgIGZpc2hJbnRlcmFjdFNjZW5lLFxufTtcbiIsImNvbnN0IHtcbiAgICBhd2FrZW5fZW50ZXJTY2VuZSxcbiAgICBhd2FrZW5fZXhwbG9yZVNjZW5lXG59ID0gcmVxdWlyZSgnLi9hd2FrZW4uanMnKTtcblxuY29uc3Qge1xuICAgIGRyZWFtU2NlbmUsXG4gICAgY3Jvd0RyZWFtU2NlbmUsXG4gICAgYmVhckRyZWFtU2NlbmUsXG4gICAgZmlzaERyZWFtU2NlbmUsXG4gICAgY3Jvd0ludGVyYWN0U2NlbmUsXG4gICAgYmVhckludGVyYWN0U2NlbmUsXG4gICAgZmlzaEludGVyYWN0U2NlbmVcbn0gPSByZXF1aXJlKCcuL2RyZWFtLmpzJyk7XG5cbmNvbnN0IHtcbiAgICBtZW51U2NlbmUsXG4gICAgdmlld0ludmVudG9yeVNjZW5lLFxuICAgIGNoZWNrU3RhdHNTY2VuZVxufSA9IHJlcXVpcmUoJy4vbWVudS5qcycpO1xuXG5jb25zdCB7XG4gICAgbWFnaWNTY2VuZVxufSA9IHJlcXVpcmUoJy4vbWFnaWMuanMnKTtcblxuY29uc3Qge1xuICAgIHJ1aW5zX2VudGVyU2NlbmUsXG4gICAgcnVpbnNfZm95ZXJTY2VuZSxcblxuICAgIHJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZEJsdWVCb29rU2NlbmUsXG5cbiAgICBydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZFJlZEJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmVcbn0gPSByZXF1aXJlKCcuL3J1aW5zLmpzJyk7XG5cbmNvbnN0IHtcbiAgICB0cmVlc190YWxrRW50ZXJTY2VuZSxcblxuICAgIHRyZWVzX2Fza0hpc3RvcnlTY2VuZSxcbiAgICB0cmVlc19hc2tTZWVkbGluZ3NTY2VuZSxcbiAgICB0cmVlc19hc2tMb25nWWVhcnNTY2VuZSxcbiAgICB0cmVlc19hc2tDYW5vcHlTY2VuZSxcblxuICAgIHRyZWVzX2Fza01hZ2ljU2NlbmVcbn0gPSByZXF1aXJlKCcuL3RyZWVzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF3YWtlbl9lbnRlclNjZW5lLFxuICAgIGF3YWtlbl9leHBsb3JlU2NlbmUsXG5cbiAgICBkcmVhbVNjZW5lLFxuICAgIGNyb3dEcmVhbVNjZW5lLFxuICAgIGJlYXJEcmVhbVNjZW5lLFxuICAgIGZpc2hEcmVhbVNjZW5lLFxuICAgIGNyb3dJbnRlcmFjdFNjZW5lLFxuICAgIGJlYXJJbnRlcmFjdFNjZW5lLFxuICAgIGZpc2hJbnRlcmFjdFNjZW5lLFxuXG4gICAgbWVudVNjZW5lLFxuICAgIHZpZXdJbnZlbnRvcnlTY2VuZSxcbiAgICBjaGVja1N0YXRzU2NlbmUsXG5cbiAgICBtYWdpY1NjZW5lLFxuXG4gICAgcnVpbnNfZW50ZXJTY2VuZSxcbiAgICBydWluc19mb3llclNjZW5lLFxuXG4gICAgcnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZSxcbiAgICBydWluc19yZWFkQmx1ZUJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZSxcbiAgICBydWluc19yZWFkUmVkQm9va1NjZW5lLFxuXG4gICAgcnVpbnNfaGlkZGVuUGF0aF9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZSxcblxuICAgIHRyZWVzX3RhbGtFbnRlclNjZW5lLFxuXG4gICAgdHJlZXNfYXNrSGlzdG9yeVNjZW5lLFxuICAgIHRyZWVzX2Fza1NlZWRsaW5nc1NjZW5lLFxuICAgIHRyZWVzX2Fza0xvbmdZZWFyc1NjZW5lLFxuICAgIHRyZWVzX2Fza0Nhbm9weVNjZW5lLFxuXG4gICAgdHJlZXNfYXNrTWFnaWNTY2VuZVxufTtcbiIsImNvbnN0IHsgc3RvcnlUZWxsIH0gPSByZXF1aXJlKCcuLi9zdG9yeVRlbGxlci5qcycpO1xuXG5jb25zdCBtYWdpY1NjZW5lID0ge1xuICAgIG5hbWU6ICdtYWdpY1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBkZWNpZGUgdG8gaGFybmVzcyB0aGUgbWFnaWMgd2l0aGluIHlvdS5cIixcbiAgICAgICAgXCJCcmVhdGhlIGluIGRlZXBseSwgYW5kIGJyZWF0aGUgb3V0IGVuam95aW5nIGNhbG0uXCIsXG4gICAgICAgIFwiQSB3YXZlIG9mIGVuZXJneSB3aWxsIGZsb3cgdGhyb3VnaCB5b3VyIGJvZHkuXCIsXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDYXN0IGEgc3BlbGwgb2YgcHJvdGVjdGlvblwiLCB2YWx1ZTogXCJjYXN0UHJvdGVjdGlvblwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDYXN0IGEgc3BlbGwgb2YgdHJhdmVsXCIsIHZhbHVlOiBcImNhc3RUcmF2ZWxcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2FzdCBhIHNwZWxsIG9mIGRyZWFtaW5nXCIsIHZhbHVlOiBcImNhc3REcmVhbVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIHN0YXJ0IG9mIHRoZSB0YWxlXCIsIHZhbHVlOiBcInJldHVyblN0YXJ0XCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNhc3Qgbm8gbWFnaWNcIiwgdmFsdWU6IG51bGwgfVxuICAgIF0sXG4gICAgc3RhY2s6IHRydWUsXG4gICAgaW50ZXJhY3Q6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGxldCBuZXh0ID0gbnVsbDtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nhc3RQcm90ZWN0aW9uJzpcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJZb3UgY2FzdCBQcm90ZWN0aXZlIENpcmNsZTtcIik7XG4gICAgICAgICAgICAgICAgc3RvcnlUZWxsKFwiQSBzaGltbWVyaW5nIHZlaWwgb2YgYXVyYSBzdXJyb3VuZHMgeW91IH4qK3hvXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2FzdFRyYXZlbCc6XG4gICAgICAgICAgICAgICAgc3RvcnlUZWxsKFwiQSBsaXR0bGUgZmFpcnkgYXBwZWFycyBhbmQgc2F5cywgXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIidUT0RPOiBhc2sgZm9yIGEgdHJhdmVsIGtleSBoZXJlLi4uJ1wiKTtcbiAgICAgICAgICAgICAgICBuZXh0ID0gJ2F3YWtlblNjZW5lJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Nhc3REcmVhbSc6XG4gICAgICAgICAgICAgICAgc3RvcnlUZWxsKFwiWW91IGltYnVlIHlvdXIgbWluZGJvZHkgd2l0aCBkcmVhbWluZyBwb3dlcnMsIGVub3VnaCBmb3Igb25lIGRyZWFtLi4uXCIpO1xuICAgICAgICAgICAgICAgIHN0YXRlLmRyZWFtaW5nID0gNTtcbiAgICAgICAgICAgICAgICBuZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JldHVyblN0YXJ0JzpcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJZb3UgY2FzdCBBd2FrZW47XCIpO1xuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIkEgbWFnaWNhbCBzaG93ZXIgY292ZXJzIGFsbCwgYW5kIHlvdSByZXR1cm4uLi5cIik7XG4gICAgICAgICAgICAgICAgbmV4dCA9ICdhd2FrZW5fZW50ZXJTY2VuZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcnlUZWxsKFwifn5+fn5+fn5+fn5+fn5+fn5+Kn4qfip+fn5+fn5+fn5+fn5+fn5+fn5cIilcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWFnaWNTY2VuZSxcbn07IiwiY29uc3QgeyBibGFja2JvYXJkIH0gPSByZXF1aXJlKCcuLi9ibGFja2JvYXJkLmpzJyk7XG5cbmNvbnN0IG1lbnVTY2VuZSA9IHtcbiAgICBuYW1lOiAnbWVudVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogXCJZb3UgcmV2aWV3IHlvdXIgb3B0aW9ucy4uLlwiLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgLy8gVE9ETyB7IG5hbWU6IFwiSGF2ZSBhIGRyZWFtXCIsIHZhbHVlOiBcImRyZWFtXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlZpZXcgaW52ZW50b3J5XCIsIHZhbHVlOiBcInZpZXdJbnZlbnRvcnlTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDaGVjayBjaGFyYWN0ZXIgc3RhdHNcIiwgdmFsdWU6IFwiY2hlY2tTdGF0c1NjZW5lXCIgfSxcbiAgICAgICAgLy8gVE9ETyB7IG5hbWU6IFwiU2F2ZSBnYW1lXCIsIHZhbHVlOiBcInNhdmVHYW1lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNsb3NlIG1lbnVcIiwgdmFsdWU6IG51bGwgfVxuICAgIF0sXG59O1xuXG5jb25zdCB2aWV3SW52ZW50b3J5U2NlbmUgPSB7XG4gICAgbmFtZTogJ3ZpZXdJbnZlbnRvcnlTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBtc2dzID0gW1wiWW91IHNldCBkb3duIHlvdXIgcGFjayBhbmQgbG9vayB0aHJvdWdoIGl0LlwiXTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIHN0YXRlLmludmVudG9yeSkge1xuICAgICAgICAgICAgbXNncy5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBleGNsdXNpdmVDaG9pY2VzOiB0cnVlLFxuICAgIGNob2ljZXM6IChzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBzdGF0ZS5pbnZlbnRvcnkpIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IGl0ZW0sIHZhbHVlOiBgZGVzY3JpYmVJdGVtXyR7aXRlbX1gIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaG9pY2VzO1xuICAgIH0sXG59O1xuXG5jb25zdCBjaGVja1N0YXRzU2NlbmUgPSB7XG4gICAgbmFtZTogJ2NoZWNrU3RhdHNTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgJ0hlYWx0aDonLFxuICAgICAgICAgICAgYCAgbyAke3N0YXRlLmhlYWx0aH1gLFxuICAgICAgICAgICAgJ01pbmQ6JyxcbiAgICAgICAgICAgIGAgID0gJHtzdGF0ZS5taW5kfWBcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHN0YXRlLmF1cmFzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBtc2dzLnB1c2goXCJBdXJhczpcIik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF1cmEgaW4gc3RhdGUuYXVyYXMpIHtcbiAgICAgICAgICAgICAgICBtc2dzLnB1c2goYCAgKyAke2F1cmF9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgc3RhY2s6IHRydWUsXG4gICAgZXBoZW1lcmFsOiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtZW51U2NlbmUsXG4gICAgdmlld0ludmVudG9yeVNjZW5lLFxuICAgIGNoZWNrU3RhdHNTY2VuZVxufTsiLCJjb25zdCBydWluc19lbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19lbnRlclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBwYXNzIGJlbmVhdGggdGhlIHN0b25lIGdhdGV3YXksIGJydXNoZWQgYnkgb3Zlcmdyb3duIHZpbmVzLlwiLFxuICAgICAgICBcIlRoZSBhaXIgaXMgY29vbCBhbmQgYSBmcmVzaCB3aW5kIGZyb20gb3V0c2lkZSBibG93cyBpbndhcmQuXCIsXG4gICAgICAgIFwiQXMgeW91IHdhbGssIHRoZSBsaWdodCBmYWRlcyB0byBncmV5LCBuZXZlciBxdWl0ZSBnb2luZyBvdXQuXCIsXG4gICAgICAgIFwiWW91IGNvbWUgdG8gYSBibHVlIGRvb3J3YXkgYW5kIGEgZ3JlZW4gZG9vcndheVwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJFbnRlciB0aGUgYmx1ZSBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhlIHJlZCBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIGZvcmVzdFwiLCB2YWx1ZTogXCJhd2FrZW5fZXhwbG9yZVNjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHJ1aW5zX2ZveWVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2ZveWVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbXNncyA9IFtcbiAgICAgICAgICAgIFwiWW91IHJldHVybiB0byB0aGUgZW50cmFuY2UgdG8gdGhlIHJ1aW5zLiBTb2Z0IGxpZ2h0IHByb3ZpZGVzXCIsXG4gICAgICAgICAgICBcIlRoZSBiYXJlc3QgaWxsdW1pbmF0aW9uLCBhbmQgeW91IGNhbiBzZWUgdGhlIHdhbGxzIGFyZSBjYXJ2ZWRcIixcbiAgICAgICAgICAgIFwiV2l0aCBtYW55IHN0cmFuZ2UgZ2x5cGhzLiBZb3Ugc2VlIGEgYmx1ZSBkb29yd2F5IGFuZCBhIHJlZCBkb29yd2F5LlwiXG4gICAgICAgIF07XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4zMykge1xuICAgICAgICAgICAgc3RhdGUuZXh0cmFTZW5zZSA9IHRydWU7XG4gICAgICAgICAgICBtc2dzLnB1c2goXCJBbmQgeW91IHNlbnNlIGEgaGlkZGVuIHBhdGh3YXkgYXMgd2VsbC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBjaG9pY2VzOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJFbnRlciB0aGUgYmx1ZSBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmVcIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSByZWQgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19yZWREb29yd2F5X0VudGVyU2NlbmVcIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgZm9yZXN0XCIsIHZhbHVlOiBcImF3YWtlbl9leHBsb3JlU2NlbmVcIiB9XG4gICAgICAgIF07XG4gICAgICAgIGlmIChzdGF0ZS5leHRyYVNlbnNlKSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBcIkZvbGxvdyB0aGUgaGlkZGVuIHBhdGhcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aF9FbnRlclNjZW5lXCIgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5jb25zdCBydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBwYXNzIHRocm91Z2ggdGhlIGJsdWUgZG9vcndheSwgYW5kIGFzIHlvdSBkbyxcIixcbiAgICAgICAgXCJUaGUgc2NlbnQgb2YgbGF2ZW5kZXIgYXJpc2VzIGluIHlvdXIgbWluZC4gVGhlIGRvb3IgcGxheXMgYVwiLFxuICAgICAgICBcIk11c2ljYWwgdGhlbWUgbGlrZSBhIGZsdXRlIGZyb20gYW4gYW5jaWVudCB0aW1lLiBZb3UgZmluZFwiLFxuICAgICAgICBcIllvdXJzZWxmIGluIGEgY2lyY3VsYXIgY2hhbWJlciB3aXRoIHNvZnQgaWxsdW1pbmF0aW9uIGZyb21cIixcbiAgICAgICAgXCJBIHNreWxpZ2h0IGZhciBhYm92ZSBpbiB0aGUgdmF1bHRlZCBjZWlsaW5nLiBBIGJvb2sgaXMgb25cIixcbiAgICAgICAgXCJBIHN0b25lIHRhYmxlIGluIHRoZSBjZW50ZXIgb2YgdGhlIHJvb20uXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJlYWQgdGhlIGJvb2tcIiwgdmFsdWU6IFwicnVpbnNfcmVhZEJsdWVCb29rU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRocm91Z2ggdGhlIGJsdWUgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHJ1aW5zX3JlYWRCbHVlQm9va1NjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19yZWFkQmx1ZUJvb2tTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgYXBwcm9hY2ggdGhlIGJsdWUgYm9vayBhbmQgcmVhZCBmcm9tIGl0LCBub3RpY2luZ1wiLFxuICAgICAgICBcIkl0J3MgYWN0dWFsbHkgbWFkZSBvZiBibHVlIGphZGUgYW5kIGhhcyBvbmx5IG9uZSBwYWdlIHZpc2libGUuXCIsXG4gICAgICAgIFwiSXQgcmVhZHM6XCIsXG4gICAgICAgIFwiTXlzdGVyeSBhbmQgbWFuaWZlc3RhdGlvbnMgYXJpc2UgZnJvbSB0aGUgc2FtZSBzb3VyY2UuLi5cIixcbiAgICAgICAgXCJZb3UgZmVlbCBzZXJlbml0eSBhdCB0aGVzZSB3b3Jkcy5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRocm91Z2ggdGhlIGJsdWUgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF1cmFzLmFkZCgnc2VyZW5pdHknKTtcbiAgICB9XG59O1xuXG5jb25zdCBydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgcGFzcyB0aHJvdWdoIHRoZSByZWQgZG9vcndheSwgYW5kIGFzIHlvdSBkbyxcIixcbiAgICAgICAgXCJUaGUgc2NlbnQgb2YgbWludCBhcmlzZXMgaW4geW91ciBtaW5kLiBUaGUgZG9vciBwbGF5cyBhXCIsXG4gICAgICAgIFwiTXVzaWNhbCB0aGVtZSBsaWtlIGEgaGFycCBmcm9tIGFuIGFuY2llbnQgdGltZS4gWW91IGZpbmRcIixcbiAgICAgICAgXCJZb3Vyc2VsZiBpbiBhIGhleGFnb25hbCBjaGFtYmVyIHdpdGggc29mdCBpbGx1bWluYXRpb24gZnJvbVwiLFxuICAgICAgICBcIkEgbW9vbmxpZ2h0IGZhciBhYm92ZSBpbiB0aGUgYXJjaGVkIGNlaWxpbmcuIEEgYm9vayBpcyBvblwiLFxuICAgICAgICBcIkEgc3RvbmUgdGFibGUgaW4gdGhlIGNlbnRlciBvZiB0aGUgcm9vbS5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiUmVhZCB0aGUgYm9va1wiLCB2YWx1ZTogXCJydWluc19yZWFkUmVkQm9va1NjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0aHJvdWdoIHRoZSByZWQgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHJ1aW5zX3JlYWRSZWRCb29rU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX3JlYWRSZWRCb29rU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGFwcHJvYWNoIHRoZSByZWQgYm9vayBhbmQgcmVhZCBmcm9tIGl0LCBub3RpY2luZ1wiLFxuICAgICAgICBcIkl0J3MgYWN0dWFsbHkgbWFkZSBvZiByZWQgZ3Jhbml0ZSBhbmQgaGFzIG9ubHkgb25lIHBhZ2UgdmlzaWJsZS5cIixcbiAgICAgICAgXCJJdCByZWFkczpcIixcbiAgICAgICAgXCJSZXR1cm5pbmcgdG8gdGhlIHNvdXJjZSBpcyBjb21wbGV0aW9uIGFuZCB3aG9sZW5lc3MuLi5cIixcbiAgICAgICAgXCJZb3UgZmVlbCBzYWZldHkgYXQgdGhlc2Ugd29yZHMuXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0aHJvdWdoIHRoZSByZWQgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF1cmFzLmFkZCgnc2FmZXR5Jyk7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aF9FbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IHBhc3MgdGhyb3VnaCBhIHZlaWwgaW4gc3BhY2UsIGEgc2hpbW1lcmluZyBjdXJ0YWluIG9mIGRyZWFtcyxcIixcbiAgICAgICAgXCJBbmQgZW50ZXIgdGhlIGhpZGRlbiBwYXRod2F5IHRocm91Z2ggdGhlIHJ1aW5zLiBJdCB0YWtlcyB5b3UgdGhyb3VnaFwiLFxuICAgICAgICBcIk1hbnkgYnJhbmNoaW5nIHBhc3NhZ2VzLlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSBsZWZ0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIHJpZ2h0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZVwiIH0sXG5cbiAgICBdXG59O1xuXG5jb25zdCBydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBmb2xsb3cgdGhlIGhpZGRlbiBwYXRoIGFzIGl0IGJyYW5jaGVzIHRvIHRoZSBsZWZ0LlwiLFxuICAgIF0sXG4gICAgY2hvaWNlczogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3NpYmlsaXRpZXMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgcmlnaHQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lXCIgfSxcbiAgICAgICAgXVxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICAgICAgcG9zc2liaWxpdGllcy5wdXNoKFxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSBsZWZ0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lXCIgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMzMpIHtcbiAgICAgICAgICAgIHBvc3NpYmlsaXRpZXMucHVzaChcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhyb3VnaCB0aGUgZnJpZW5kc2hpcCBnYXRld2F5XCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmVcIiB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3NzaWJpbGl0aWVzO1xuICAgIH1cbn07XG5cbmNvbnN0IHJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgZm9sbG93IHRoZSBoaWRkZW4gcGF0aCBhcyBpdCBicmFuY2hlcyB0byB0aGUgcmlnaHQuXCIsXG5cbiAgICBdLFxuICAgIGNob2ljZXM6IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBwb3NzaWJpbGl0aWVzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIGxlZnQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmVcIiB9LFxuICAgICAgICBdXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgICBwb3NzaWJpbGl0aWVzLnB1c2goXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIHJpZ2h0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZVwiIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvc3NpYmlsaXRpZXM7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgcGFzcyB0aHJvdWdoIHRoZSBoaWRkZW4gZG9vcndheSwgYW5kIGFzIHlvdSBkbyxcIixcbiAgICAgICAgXCJUaGUgdm9pY2Ugb2YgYSB3b21hbiBzcGVha3MgaW50byB5b3VyIG1pbmQuIFNoZSBzcGVha3MsXCIsXG4gICAgICAgIFwiWW91IHNoYWxsIGZpbmQgd2hhdCB5b3Ugc2Vlay4uLlwiLFxuICAgICAgICBcIllvdSBwYXNzIHRocm91Z2ggc2hhZGUgYW5kIGN1cmxpbmcgaW5jZW5zZSBzbW9rZVwiLFxuICAgICAgICBcIkFuZCBoZWFyIHRoZSBzb3VuZCBvZiB0aGUgbW9vbiByaXNpbmcgYmV5b25kIHRoZSBob3Jpem9uXCIsXG4gICAgICAgIFwiQW5kIGZhciBhYm92ZSB5b3UgYSBtdXNpY2FsIGZsdXRlIHBsYXlzLiBZb3UgdGhlbiBhd2FrZW5cIixcbiAgICAgICAgXCJJbiBhIG1hZ2ljYWwgZm9yZXN0LiBZb3Ugbm90aWNlIGEgYm9vayBpbiB5b3VyIHBvY2tldC5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiRXhwbG9yZVwiLCB2YWx1ZTogXCJhd2FrZW5fZXhwbG9yZVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRhbGsgdG8gdGhlIHRyZWVzXCIsIHZhbHVlOiBcImF3YWtlbl90YWxrU2NlbmVcIiB9LFxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmludmVudG9yeVsnZGlhbW9uZFN1dHJhJ10gPSAxO1xuICAgIH1cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcnVpbnNfZW50ZXJTY2VuZSxcbiAgICBydWluc19mb3llclNjZW5lLFxuXG4gICAgcnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZSxcbiAgICBydWluc19yZWFkQmx1ZUJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZSxcbiAgICBydWluc19yZWFkUmVkQm9va1NjZW5lLFxuXG4gICAgcnVpbnNfaGlkZGVuUGF0aF9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZVxufSIsImNvbnN0IHRyZWVzX3RhbGtFbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdhd2FrZW5fdGFsa1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBjb21tdW5pY2F0ZSB3aXRoIHRoZSBhbmNpZW50IHRyZWVzLFwiLFxuICAgICAgICBcInBsYWNpbmcgeW91ciBoYW5kcyBvbiB0aGVpciB0cnVua3MsIGFza2luZyB0aGVtIHRvIHNwZWFrLlwiLFxuICAgICAgICBcIlRoZXkgc2F5LCBcIiArIFwiJ1dlIHdpbGwgc3BlYWsgc29mdGx5IG9mIGZvcmdvdHRlbiBzZWNyZXRzLi4uJ1wiLFxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBmb3Jlc3QncyBoaXN0b3J5XCIsIHZhbHVlOiBcInRyZWVzX2Fza0hpc3RvcnlTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJJbnF1aXJlIGFib3V0IG1hZ2ljYWwga25vd2xlZGdlXCIsIHZhbHVlOiBcInRyZWVzX2Fza01hZ2ljU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHlvdXIgc3Vycm91bmRpbmdzXCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxuY29uc3QgdHJlZXNfYXNrSGlzdG9yeVNjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tIaXN0b3J5U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJ0luIHRoZSBiZWdpbm5pbmcsIHRoZXJlIHdlcmUgdGhlIHNlZWRsaW5ncywgZmlyc3QgdG8gYXdha2VuLi4uJ1wiLFxuICAgICAgICBcIidUaGVuIHRoZSBsb25nIHllYXJzIG9mIG1hbnkgdHVybmluZ3Mgb2YgdGhlIHNreS13aGVlbC4uLidcIixcbiAgICAgICAgXCInQW5kIHRoZW4gdGhlIGJ1cm5pbmcgb2YgdGhlIGNhbm9weSwgd2hpY2ggbWFkZSB0aGlzIGZvcmVzdC4uLidcIixcblxuICAgIF0sXG4gICAgc3RhY2s6IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBzZWVkbGluZ3NcIiwgdmFsdWU6IFwidHJlZXNfYXNrU2VlZGxpbmdzU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBsb25nIHllYXJzXCIsIHZhbHVlOiBcInRyZWVzX2Fza0xvbmdZZWFyc1NjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkFzayBhYm91dCB0aGUgY2Fub3B5XCIsIHZhbHVlOiBcInRyZWVzX2Fza0Nhbm9weVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkFzayBzb21ldGhpbmcgZWxzZVwiLCB2YWx1ZTogbnVsbCB9LFxuICAgIF1cbn07XG5cbmNvbnN0IHRyZWVzX2Fza1NlZWRsaW5nc1NjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tTZWVkbGluZ3NTY2VuZScsXG4gICAgZXBoZW1lcmFsOiB0cnVlLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJy4uLidcIixcbiAgICAgICAgXCIndGhlIHNlZWRsaW5ncyB3ZXJlIGJlZm9yZSB1cywgYW5kIHRoZXkgYXJlIGFmdGVyIHVzLi4uJ1wiLFxuICAgICAgICBcIicuLi4nXCJcbiAgICBdXG59O1xuXG5jb25zdCB0cmVlc19hc2tMb25nWWVhcnNTY2VuZSA9IHtcbiAgICBuYW1lOiAndHJlZXNfYXNrTG9uZ1llYXJzU2NlbmUnLFxuICAgIGVwaGVtZXJhbDogdHJ1ZSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIicuLi4nXCIsXG4gICAgICAgIFwiJ3RoZSBsb25nIHllYXJzIHdlcmUgb2Ygd2VhcmluZXNzIGFuZCB3b2UuLi4nXCIsXG4gICAgICAgIFwiJy4uLidcIlxuICAgIF1cbn07XG5cbmNvbnN0IHRyZWVzX2Fza0Nhbm9weVNjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tDYW5vcHlTY2VuZScsXG4gICAgZXBoZW1lcmFsOiB0cnVlLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJy4uLidcIixcbiAgICAgICAgXCIndGhlIGNhbm9weSBhZmxhbWUsIGFsaXQsIGxpa2UgdG9yY2hlcyBibGF6aW5nIGluIG5pZ2h0Li4uJ1wiLFxuICAgICAgICBcIicuLi4nXCJcbiAgICBdXG59O1xuXG5jb25zdCB0cmVlc19hc2tNYWdpY1NjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tNYWdpY1NjZW5lJyxcbiAgICBlcGhlbWVyYWw6IHRydWUsXG4gICAgc3RhY2s6IHRydWUsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCInLi4uJ1wiLFxuICAgICAgICBcIid0cnVlIG1hZ2ljIGNhbiBuZXZlciBiZSB1c2VkIGZvciBldmlsLi4uJ1wiLFxuICAgICAgICBcIicuLi4nXCJcbiAgICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0cmVlc190YWxrRW50ZXJTY2VuZSxcblxuICAgIHRyZWVzX2Fza0hpc3RvcnlTY2VuZSxcbiAgICB0cmVlc19hc2tTZWVkbGluZ3NTY2VuZSxcbiAgICB0cmVlc19hc2tMb25nWWVhcnNTY2VuZSxcbiAgICB0cmVlc19hc2tDYW5vcHlTY2VuZSxcblxuICAgIHRyZWVzX2Fza01hZ2ljU2NlbmVcbn07IiwiY29uc3QgeyBjb25zb2xlbG9nIH0gPSByZXF1aXJlKCcuL2lvLmpzJyk7XG5cbi8vIFRPRE86IG1ha2UgdGhpcyB3b3JrIGluIGJyb3dzZXJcbmNvbnN0IHN0b3J5VGVsbCA9IChsaW5lKSA9PiB7XG4gICAgY29uc29sZWxvZyhsaW5lKTtcbiAgICAvLyBUT0RPOiB1c2UgbWFya292IHRleHQgKG9yIGdlbmVyYXRpdmUgQUk/KSB0byB3cml0ZSBtb3JlIHRleHQgaW4gcHVycGxlXG59O1xuXG5jb25zdCBzdG9yeVRlbGxNZXRhID0gKGxpbmUsIGNvbG9yKSA9PiB7XG4gICAgY29uc29sZWxvZyhsaW5lKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0b3J5VGVsbCxcbiAgICBzdG9yeVRlbGxNZXRhXG59OyIsImNvbnN0IHNsZWVwID0gKG1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHJlcywgbXMpO1xuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNsZWVwXG59OyJdfQ==
