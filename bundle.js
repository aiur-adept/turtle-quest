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

},{"./itemDescriptions.js":13,"./storyTeller.js":22}],3:[function(require,module,exports){
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
},{"./storyTeller.js":22,"./utils.js":23}],4:[function(require,module,exports){
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
        knownLocations: {},
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
        if (scene.locationCrumb) {
            state.knownLocations[scene.locationCrumb] = scene.name;
        }


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
                    // if the scene has an interact method, call it and get the next scene
                    const interactResult = scene.interact(scene, state, action);
                    if (interactResult && typeof interactResult === 'object' && interactResult.name) {
                        const nextScene = Object.assign({}, interactResult);
                        if (nextScene.stack) {
                            sceneStack.push(nextScene);
                        } else {
                            sceneStack[sceneStack.length - 1] = nextScene;
                        }
                        continue;
                    } else if (interactResult && typeof interactResult === 'string') {
                        sceneKey = interactResult;
                    }
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

},{"./describeItem.js":2,"./describeScene.js":3,"./gameData.js":9,"./interact.js":11,"./io.js":12,"./scenes/index.js":16,"./storyTeller.js":22,"./utils.js":23}],11:[function(require,module,exports){
const { inquire } = require('./io.js');
const { choiceFilter } = require('./filters/choice.js');

async function interact(scene, state) {
    //
    // construct choices
    //
    // copy choices with Array.from (we will mutate it)
    // (note: choices can be a function or an array or not even present)
    let choices;
    if (scene.choices.call && scene.choices.apply) {
        choices = Array.from(scene.choices(scene, state));
    } else if (scene.choices) {
        choices = Array.from(scene.choices);
    } else {
        choices = [];
    }

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
const consolelog = (message, color) => {
    const p = document.createElement('p');
    p.textContent = message;
    p.style['color'] = color;
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
    locationCrumb: 'forest',

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
    ruins_hiddenPathCenterScene,
    ruins_hiddenPathTomeScene,
    ruins_hiddenPathCrystalScene,
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

const {
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
} = require('./path.js');

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
    ruins_hiddenPathCenterScene,
    ruins_hiddenPathTomeScene,
    ruins_hiddenPathCrystalScene,
    ruins_hiddenPathGatewayScene,

    trees_talkEnterScene,

    trees_askHistoryScene,
    trees_askSeedlingsScene,
    trees_askLongYearsScene,
    trees_askCanopyScene,

    trees_askMagicScene,

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

},{"./awaken.js":14,"./dream.js":15,"./magic.js":17,"./menu.js":18,"./path.js":19,"./ruins.js":20,"./trees.js":21}],17:[function(require,module,exports){
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
                storyTell("A little fairy appears and says, 'you may travel where you have been...'");
                const travelChoices = Object.entries(state.knownLocations).map(([crumb, sceneName]) => ({
                    name: `Travel to ${crumb}`,
                    value: sceneName
                }));
                travelChoices.push({ name: "Cancel travel", value: null });
                
                const travelScene = {
                    name: 'travelScene',
                    description: ["Choose your destination:"],
                    choices: travelChoices,
                    interact: (travelSelf, travelState, travelAction) => {
                        if (travelAction && travelAction !== 'null') {
                            return travelAction;
                        }
                        return null;
                    }
                };
                
                return travelScene;
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
        storyTell("~~~~~~~~~*~*~*~~~~~~~~")
        return next;
    }
};

module.exports = {
    magicScene,
};
},{"../storyTeller.js":22}],18:[function(require,module,exports){
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
    description: (self, state) => {
        const msgs = ["You set down your pack and look through it."];
        for (const item in state.inventory) {
            msgs.push(item)
        }
        return msgs;
    },
    stack: true,
    exclusiveChoices: true,
    choices: (self, state) => {
        const choices = [];
        for (const item in state.inventory) {
            choices.push({ name: item, value: `describeItem_${item}` });
        }
        return choices;
    },
};

const checkStatsScene = {
    name: 'checkStatsScene',
    description: (self, state) => {
        const msgs = [
            'Health:',
            `  o ${state.health}`,
            'Mind:',
            `  = ${state.mind}`
        ];
        if (state.auras && state.auras.size > 0) {
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
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
const { consolelog } = require('./io.js');

// TODO: make this work in browser
const storyTell = (line) => {
    consolelog(line, "green");
    // TODO: use markov text (or generative AI?) to write more text in purple
};

const storyTellMeta = (line, color) => {
    consolelog(line);
};

module.exports = {
    storyTell,
    storyTellMeta
};
},{"./io.js":12}],23:[function(require,module,exports){
const sleep = (ms) => {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    })
}

module.exports = {
    sleep
};
},{}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJibGFja2JvYXJkLmpzIiwiZGVzY3JpYmVJdGVtLmpzIiwiZGVzY3JpYmVTY2VuZS5qcyIsImRyZWFtL2JlYXIuanMiLCJkcmVhbS9jcm93LmpzIiwiZHJlYW0vZmlzaC5qcyIsImRyZWFtL2luZGV4LmpzIiwiZmlsdGVycy9jaG9pY2UuanMiLCJnYW1lRGF0YS5qcyIsImluZGV4LmpzIiwiaW50ZXJhY3QuanMiLCJpby5qcyIsIml0ZW1EZXNjcmlwdGlvbnMuanMiLCJzY2VuZXMvYXdha2VuLmpzIiwic2NlbmVzL2RyZWFtLmpzIiwic2NlbmVzL2luZGV4LmpzIiwic2NlbmVzL21hZ2ljLmpzIiwic2NlbmVzL21lbnUuanMiLCJzY2VuZXMvcGF0aC5qcyIsInNjZW5lcy9ydWlucy5qcyIsInNjZW5lcy90cmVlcy5qcyIsInN0b3J5VGVsbGVyLmpzIiwidXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGJsYWNrYm9hcmQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmxhY2tib2FyZFxufTsiLCJjb25zdCB7IGl0ZW1EZXNjcmlwdGlvbnMgfSA9IHJlcXVpcmUoJy4vaXRlbURlc2NyaXB0aW9ucy5qcycpO1xuY29uc3QgeyBzdG9yeVRlbGwgfSA9IHJlcXVpcmUoJy4vc3RvcnlUZWxsZXIuanMnKTtcblxuY29uc3QgZGVzY3JpYmVJdGVtID0gKGl0ZW1OYW1lKSA9PiB7XG4gICAgc3RvcnlUZWxsKGl0ZW1EZXNjcmlwdGlvbnNbaXRlbU5hbWVdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaWJlSXRlbVxufTtcbiIsImNvbnN0IHsgc3RvcnlUZWxsIH0gPSByZXF1aXJlKCcuL3N0b3J5VGVsbGVyLmpzJyk7XG5jb25zdCB7IHNsZWVwIH0gPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbmNvbnN0IGRlc2NyaWJlU2NlbmUgPSBhc3luYyAoc2NlbmUsIHN0YXRlKSA9PiB7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gc2NlbmUuZGVzY3JpcHRpb247XG4gICAgLy8gaWYgYSBmdW5jdGlvbiwgY2FsbCBpdCAoaXQgc2hvdWxkIHJldHVybiBlaXRoZXIgYW4gYXJyYXkgb3Igb25lIGxpbmUpXG4gICAgaWYgKGRlc2NyaXB0aW9uLmFwcGx5ICYmIGRlc2NyaXB0aW9uLmNhbGwpIHtcbiAgICAgICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbihzY2VuZSwgc3RhdGUpO1xuICAgIH1cbiAgICAvLyBpZiBpdCdzIGFuIGFycmF5LCBwcmludCBlYWNoIGxpbmVcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZXNjcmlwdGlvbikpIHtcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBzdG9yeVRlbGwobGluZSk7XG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3IsIHByaW50IGl0IHNpbXBseSAob25lIGxpbmUpXG4gICAgICAgIHN0b3J5VGVsbChkZXNjcmlwdGlvbik7XG4gICAgfVxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmliZVNjZW5lXG59OyIsImNvbnN0IGJlYXJEcmVhbSA9IHtcblxuICAgIHBlcnNwZWN0aXZlOiBcIkkgYW1ibGVkIHRocm91Z2ggdGhlIGVuY2hhbnRlZCBmb3Jlc3QsIG15IGZ1ciBicnVzaGluZyBhZ2FpbnN0IHRoZSB2aWJyYW50IGZvbGlhZ2UgYXMgSSBleHBsb3JlZCB0aGUgbWFnaWNhbCByZWFsbS5cIixcblxuICAgIHNpZ2h0czogW1xuICAgICAgICBcIlRvd2VyaW5nbHkgYW5jaWVudCB0cmVlcyBzdXJyb3VuZGVkIG1lLCB0aGVpciBicmFuY2hlcyBhZG9ybmVkIHdpdGggZ2xvd2luZyBibG9zc29tcyB0aGF0IGlsbHVtaW5hdGVkIHRoZSBzaGFkb3d5IGdyb3Zlcy5cIixcbiAgICAgICAgXCJBIGdlbnRsZSBicmVlemUgY2FycmllZCB0aGUgd2hpc3BlcnMgb2YgdGhlIGZvcmVzdCwgcmV2ZWFsaW5nIHRoZSBzZWNyZXRzIGhpZGRlbiB3aXRoaW4gdGhlIHJ1c3RsaW5nIGxlYXZlcy5cIixcbiAgICAgICAgXCJCZXNpZGUgYSB0cmFucXVpbCBzdHJlYW0sIEkgZGlzY292ZXJlZCBzaGltbWVyaW5nIHBvb2xzIHJlZmxlY3RpbmcgdGhlIG1vb24gYW5kIHN0YXJzLCBjcmVhdGluZyBhIGNhcHRpdmF0aW5nIGNlbGVzdGlhbCBkaXNwbGF5LlwiLFxuICAgICAgICBcIk15IGpvdXJuZXkgbGVkIG1lIHRvIG15c3RpY2FsIHBvcnRhbHMsIHRoZWlyIHN1cmZhY2VzIHNoaW1tZXJpbmcgd2l0aCBhbiBvdGhlcndvcmxkbHkgbGlnaHQsIHRlbXB0aW5nIG1lIHRvIHBlZXIgaW50byB0aGUgZHJlYW13b3JsZCBiZXlvbmQuXCIsXG4gICAgICAgIFwiVGhyb3VnaCBwb3J0YWxzLCBJIHdpdG5lc3NlZCBzdXJyZWFsIGxhbmRzY2FwZXMg4oCTIGZsb2F0aW5nIGlzbGFuZHMgYWRvcm5lZCB3aXRoIGJpb2x1bWluZXNjZW50IGZsb3JhIGFuZCB3YXRlcmZhbGxzIGNhc2NhZGluZyB3aXRoIGxpcXVpZCBzdGFyZHVzdC5cIixcbiAgICBdLFxuXG4gICAgaW50ZXJhY3Rpb25zOiBbXG4gICAgICAgIFwiSSBhcHByb2FjaGVkIGEgcG9ydGFsLCBmZWVsaW5nIGEgdGluZ2xpbmcgc2Vuc2F0aW9uIGFzIEkgdG91Y2hlZCBpdCwgYnJpZWZseSBjb25uZWN0aW5nIHdpdGggdGhlIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIkluIHRoZSBkcmVhbXdvcmxkLCBJIGVuY291bnRlcmVkIGZhbnRhc3RpY2FsIGJlaW5ncyDigJMgbHVtaW5lc2NlbnQgZmlyZWZsaWVzIHRoYXQgZGFuY2VkIGluIGludHJpY2F0ZSBwYXR0ZXJucyBhbmQgd2lzZSBvd2xzIHRoYXQgc2hhcmVkIGFuY2llbnQgd2lzZG9tLlwiLFxuICAgICAgICBcIldpdGggZWFjaCBpbnRlcmFjdGlvbiwgdGhlIGJvdW5kYXJpZXMgYmV0d2VlbiByZWFsaXR5IGFuZCBkcmVhbXMgYmx1cnJlZCwgY3JlYXRpbmcgYSB0YXBlc3RyeSBvZiBlbmNoYW50bWVudCBhbmQgd29uZGVyLlwiLFxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJlYXJEcmVhbVxufTsiLCJjb25zdCBjcm93RHJlYW0gPSB7XG5cbiAgICBwZXJzcGVjdGl2ZTogXCJJIHNvYXJlZCB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgZm9yZXN0LCBteSBlYm9ueSBmZWF0aGVycyBjYXRjaGluZyB0aGUgbW9vbmxpZ2h0IGFzIEkgbmF2aWdhdGVkIHRoZSB0d2lzdGVkIGJyYW5jaGVzIGFuZCBldGhlcmVhbCBnbG93cy5cIixcblxuICAgIHNpZ2h0czogW1xuICAgICAgICBcIkJlbmVhdGggbWUsIGFuY2llbnQgdHJlZXMgc3Rvb2QgdGFsbCwgdGhlaXIgZ25hcmxlZCByb290cyBlbnR3aW5lZCB3aXRoIGx1bWluZXNjZW50IG1vc3MgdGhhdCBwdWxzZWQgd2l0aCBhIG15c3RpY2FsIGVuZXJneS5cIixcbiAgICAgICAgXCJBIGdlbnRsZSBicmVlemUgY2FycmllZCB0aGUgd2hpc3BlcnMgb2YgdGhlIGZvcmVzdCwgcmV2ZWFsaW5nIHRoZSBzZWNyZXRzIGhpZGRlbiB3aXRoaW4gdGhlIHJ1c3RsaW5nIGxlYXZlcy5cIixcbiAgICAgICAgXCJBcyBJIGdsaWRlZCBvdmVyIGEgY3J5c3RhbC1jbGVhciBwb25kLCB0aGUgd2F0ZXIgcmVmbGVjdGVkIHRoZSBzdGFycnkgc2t5IGFib3ZlLCBjcmVhdGluZyBhIG1pcnJvci1saWtlIHN1cmZhY2UgdGhhdCBzZWVtZWQgdG8gaG9sZCB0aGUgY29uc3RlbGxhdGlvbnMgd2l0aGluIGl0cyBkZXB0aHMuXCIsXG4gICAgICAgIFwiT2NjYXNpb25hbGx5LCBJIGVuY291bnRlcmVkIHNoaW1tZXJpbmcgcG9ydGFscyB0aGF0IGZsaWNrZXJlZCBhdCB0aGUgZWRnZSBvZiByZWFsaXR5LCBiZWNrb25pbmcgd2l0aCBwcm9taXNlcyBvZiBhIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIlRocm91Z2ggcG9ydGFscywgSSBnbGltcHNlZCBzdXJyZWFsIGxhbmRzY2FwZXMg4oCTIGZsb2F0aW5nIGlzbGFuZHMgYWRvcm5lZCB3aXRoIGZsb2F0aW5nIGZsb3dlcnMsIGFuZCBjYXNjYWRpbmcgd2F0ZXJmYWxscyB0aGF0IHNwYXJrbGVkIHdpdGggbGlxdWlkIHN0YXJkdXN0LlwiLFxuICAgIF0sXG5cbiAgICBpbnRlcmFjdGlvbnM6IFtcbiAgICAgICAgXCJJIGRpcHBlZCBkb3duIHRvIHRvdWNoIHRoZSBzdXJmYWNlIG9mIGEgcG9ydGFsLCBmZWVsaW5nIGEgdGluZ2xpbmcgc2Vuc2F0aW9uIGFzIEkgYnJpZWZseSBjb25uZWN0ZWQgd2l0aCB0aGUgZHJlYW13b3JsZCBiZXlvbmQuXCIsXG4gICAgICAgIFwiSW4gdGhlIGRyZWFtd29ybGQsIEkgZW5jb3VudGVyZWQgZmFudGFzdGljYWwgY3JlYXR1cmVzIOKAkyBzaGltbWVyaW5nIGJ1dHRlcmZsaWVzIHRoYXQgbGVmdCB0cmFpbHMgb2YgaXJpZGVzY2VuY2UgaW4gdGhlaXIgd2FrZSBhbmQgdGFsa2luZyB0cmVlcyB0aGF0IHNoYXJlZCBhbmNpZW50IHRhbGVzLlwiLFxuICAgICAgICBcIldpdGggZWFjaCBpbnRlcmFjdGlvbiwgdGhlIGJvdW5kYXJ5IGJldHdlZW4gcmVhbGl0eSBhbmQgZHJlYW1zIGJsdXJyZWQsIGNyZWF0aW5nIGEga2FsZWlkb3Njb3BpYyB0YXBlc3RyeSBvZiB3b25kZXIgYW5kIGVuY2hhbnRtZW50LlwiLFxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyb3dEcmVhbVxufTsiLCJjb25zdCBmaXNoRHJlYW0gPSB7XG5cbiAgICBwZXJzcGVjdGl2ZTogXCJJIGdsaWRlZCB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgcml2ZXIsIHNjYWxlcyBzaGltbWVyaW5nIGluIHRoZSBtb29ubGl0IHdhdGVycyBhcyBJIGV4cGxvcmVkIHRoZSBoaWRkZW4gZGVwdGhzIG9mIHRoZSBteXN0aWNhbCBmb3Jlc3QuXCIsXG5cbiAgICBzaWdodHM6IFtcbiAgICAgICAgXCJTdW5saWdodCBmaWx0ZXJlZCB0aHJvdWdoIHRoZSB3YXRlciwgY2FzdGluZyBhIG1lc21lcml6aW5nIGRhbmNlIG9mIHNoYWRvd3Mgb24gdGhlIHJpdmVyYmVkLCByZXZlYWxpbmcgYW5jaWVudCBzdG9uZXMgYWRvcm5lZCB3aXRoIG15c3RlcmlvdXMgcnVuZXMuXCIsXG4gICAgICAgIFwiQXF1YXRpYyBwbGFudHMgc3dheWVkIGdlbnRseSBpbiB0aGUgY3VycmVudCwgdGhlaXIgdmlicmFudCBjb2xvcnMgY3JlYXRpbmcgYSBrYWxlaWRvc2NvcGUgb2YgaHVlcyB0aGF0IG1pcnJvcmVkIHRoZSBlbmNoYW50bWVudCBvZiB0aGUgZm9yZXN0IGFib3ZlLlwiLFxuICAgICAgICBcIkkgbmF2aWdhdGVkIHRocm91Z2ggYSBzdWJtZXJnZWQgYXJjaHdheSwgaXRzIGVudHJhbmNlIGd1YXJkZWQgYnkgZXRoZXJlYWwgZmlzaCB0aGF0IGdsb3dlZCB3aXRoIGFuIG90aGVyd29ybGRseSBsaWdodCwgZ3VpZGluZyBtZSB0byBzZWNyZXQgYXF1YXRpYyByZWFsbXMuXCIsXG4gICAgICAgIFwiUmF5cyBvZiBtb29ubGlnaHQgcGVuZXRyYXRlZCB0aGUgc3VyZmFjZSwgY3JlYXRpbmcgYSBjZWxlc3RpYWwgcGF0dGVybiB0aGF0IGRhbmNlZCB1cG9uIHRoZSByaXZlcidzIGZsb29yLCBhcyBpZiB0aGUgc3RhcnMgdGhlbXNlbHZlcyB3ZXJlIHN1Ym1lcmdlZCBpbiB0aGUgdW5kZXJ3YXRlciB3b3JsZC5cIixcbiAgICAgICAgXCJBdCB0aGUgaGVhcnQgb2YgdGhlIHJpdmVyLCBJIGRpc2NvdmVyZWQgYSBteXN0aWNhbCB3aGlybHBvb2wsIGEgZ2F0ZXdheSB0byBhIGRyZWFtd29ybGQgd2hlcmUgdGhlIGN1cnJlbnRzIHdoaXNwZXJlZCB0YWxlcyBvZiBhbmNpZW50IGFxdWF0aWMgY2l2aWxpemF0aW9ucy5cIixcbiAgICBdLFxuXG4gICAgaW50ZXJhY3Rpb25zOiBbXG4gICAgICAgIFwiSSBzd2FtIGludG8gYSByYWRpYW50IHBvb2wsIGZlZWxpbmcgYSBzdXJnZSBvZiBlbmVyZ3kgYXMgSSBjb21tdW5lZCB3aXRoIHRoZSByaXZlcidzIHNwaXJpdCwgZ2xpbXBzaW5nIHZpc2lvbnMgb2YgdGhlIGZvcmVzdCdzIGhpc3RvcnkgdGhyb3VnaCB0aGUgZWJiIGFuZCBmbG93IG9mIHdhdGVyLlwiLFxuICAgICAgICBcIkluIHRoZSBkcmVhbXdvcmxkIGJlbmVhdGggdGhlIHN1cmZhY2UsIEkgZW5jb3VudGVyZWQgZXRoZXJlYWwgcml2ZXIgc3Bpcml0cyDigJMgZ3JhY2VmdWwgd2F0ZXIgbnltcGhzIHdobyB3ZWF2ZWQgdGFsZXMgb2YgZm9yZ290dGVuIHVuZGVyd2F0ZXIga2luZ2RvbXMgYW5kIG9mZmVyZWQgZ2xpbXBzZXMgaW50byB0aGUgZnV0dXJlLlwiLFxuICAgICAgICBcIkFzIEkgYXBwcm9hY2hlZCB0aGUgbXlzdGljYWwgd2hpcmxwb29sLCBJIGZlbHQgYSBwdWxsIHRvd2FyZHMgdGhlIGRyZWFtd29ybGQsIHdoZXJlIHNjaG9vbHMgb2YgcGhvc3Bob3Jlc2NlbnQgZmlzaCBzd2lybGVkIGluIGludHJpY2F0ZSBwYXR0ZXJucywgc3ltYm9saXppbmcgdGhlIGludGVyY29ubmVjdGVkbmVzcyBvZiB0aGUgcml2ZXIgYW5kIHRoZSBmb3Jlc3QgYWJvdmUuXCIsXG4gICAgXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZmlzaERyZWFtXG59OyIsImNvbnN0IHsgY3Jvd0RyZWFtIH0gPSByZXF1aXJlKCcuL2Nyb3cuanMnKTtcbmNvbnN0IHsgYmVhckRyZWFtIH0gPSByZXF1aXJlKCcuL2JlYXIuanMnKTtcbmNvbnN0IHsgZmlzaERyZWFtIH0gPSByZXF1aXJlKCcuL2Zpc2guanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3Jvd0RyZWFtLFxuICAgIGJlYXJEcmVhbSxcbiAgICBmaXNoRHJlYW1cbn07XG4iLCJjb25zdCBjaG9pY2VGaWx0ZXIgPSAoY2hvaWNlcywgc3RhdGUpID0+IHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgY2hvaWNlIGZpbHRlcmluZyBieSB1c2luZyBzdGF0ZVxuICAgIHJldHVybiBjaG9pY2VzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2hvaWNlRmlsdGVyXG59OyIsImNvbnN0IGdhbWVEYXRhID0ge1xuICAgIGF3YWtlblN0YXRlOiB7XG4gICAgICAgIG5hbWU6ICdudWxsJyxcbiAgICAgICAgbWluZDogJ2NhbG0nLFxuICAgICAgICBpbnZlbnRvcnk6IHtcbiAgICAgICAgICAgICdoZWFydFN1dHJhJzogMSxcbiAgICAgICAgfSxcbiAgICAgICAgaGVhbHRoOiAyMCxcbiAgICAgICAgYXVyYXM6IG5ldyBTZXQoKSxcbiAgICAgICAga25vd25Mb2NhdGlvbnM6IHt9LFxuICAgIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnYW1lRGF0YVxufTsiLCJjb25zdCB7IGNvbnNvbGVsb2csIGxvZ0Nob2ljZSB9ID0gcmVxdWlyZSgnLi9pby5qcycpO1xuY29uc3QgeyBkZXNjcmliZVNjZW5lIH0gPSByZXF1aXJlKCcuL2Rlc2NyaWJlU2NlbmUuanMnKTtcbmNvbnN0IHsgZGVzY3JpYmVJdGVtIH0gPSByZXF1aXJlKCcuL2Rlc2NyaWJlSXRlbS5qcycpO1xuY29uc3QgeyBpbnRlcmFjdCB9ID0gcmVxdWlyZSgnLi9pbnRlcmFjdC5qcycpO1xuY29uc3QgeyBzbGVlcCB9ID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xuY29uc3QgeyBnYW1lRGF0YSB9ID0gcmVxdWlyZSgnLi9nYW1lRGF0YS5qcycpO1xuY29uc3Qgc2NlbmVzID0gcmVxdWlyZSgnLi9zY2VuZXMvaW5kZXguanMnKTtcbmNvbnN0IHsgc3RvcnlUZWxsTWV0YSB9ID0gcmVxdWlyZSgnLi9zdG9yeVRlbGxlci5qcycpO1xuXG5cblxuY29uc3QgYXdha2VuID0gKCkgPT4gKFxuICAgIFtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgc2NlbmVzLmF3YWtlbl9lbnRlclNjZW5lKSxcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgZ2FtZURhdGEuYXdha2VuU3RhdGUpXG4gICAgXVxuKTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIC8vIGJlZ2luIHRoZSBzY2VuZSBhbmQgdGhlIHN0YXRlXG4gICAgY29uc3QgW2ZpcnN0U2NlbmUsIHN0YXRlXSA9IGF3YWtlbigpO1xuICAgIGxldCBzY2VuZVN0YWNrID0gW2ZpcnN0U2NlbmVdO1xuXG4gICAgLy8gZ2FtZSBsb29wXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgLy8gVE9ETzogcnVuIGdsb2JhbCBsb2dpY3MgZWFjaCBsb29wLCBsaWtlIGEgcmFuZG9tIGVuY291bnRlciBjaGFuY2UsIG9yIHZhbmlzaCBzdGF0ZS5leHRyYVNlbnNlIGFmdGVyIDMgc2NlbmVzLCBldGMuXG5cblxuICAgICAgICAvLyBjb25zaWRlciB0aGUgY3VycmVudCBzY2VuZVxuICAgICAgICAvLyAoYnV0IGZpcnN0LCBndWFyZCBhZ2FpbnN0IHplcm8tc3RhY2spXG4gICAgICAgIGlmIChzY2VuZVN0YWNrLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBzY2VuZVN0YWNrLnB1c2goYXdha2VuKClbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjZW5lID0gc2NlbmVTdGFja1tzY2VuZVN0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoc2NlbmUubG9jYXRpb25DcnVtYikge1xuICAgICAgICAgICAgc3RhdGUua25vd25Mb2NhdGlvbnNbc2NlbmUubG9jYXRpb25DcnVtYl0gPSBzY2VuZS5uYW1lO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBhd2FrZW4gZnJvbSBhbnkgZHJlYW0gc2NlbmUgaWYgc3RhdGUuZHJlYW1pbmcgPT0gMFxuICAgICAgICBpZiAoc2NlbmUuaXNEcmVhbSAmJiBzdGF0ZS5kcmVhbWluZyA9PSAwKSB7XG4gICAgICAgICAgICBzY2VuZVN0YWNrID0gW3NjZW5lcy5hd2FrZW5fZW50ZXJTY2VuZV07XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBkaXNwbGF5IHRoZSBzY2VuZVxuICAgICAgICAvL1xuICAgICAgICBhd2FpdCBkZXNjcmliZVNjZW5lKHNjZW5lLCBzdGF0ZSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaW50ZXJhY3Qgd2l0aCB0aGUgc2NlbmUgKGFuZCBnZXQgdGhlIG5leHQgc2NlbmUpXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoZSBDTEkgaW50ZXJhY3RzIHdpdGggdGhlIHVzZXIsIGFuZCB0aGVcbiAgICAgICAgLy8gdXNlcidzIGlucHV0IGludGVyYWN0cyB3aXRoIHRoZSBzY2VuZVxuICAgICAgICAvLyB3ZSB1bHRpbWF0ZWx5IHdhbnQgdG8ga25vdyB3aGF0IHNjZW5lIGlzIG5leHRcbiAgICAgICAgLy8gZ2l2ZW4gaXRzIG5hbWUgYXMgYSBrZXkgKGV2ZXJ5IG1vbWVudCwgd2UgdW5sb2NrXG4gICAgICAgIC8vIGEgbWFnaWMgZG9vciEgPDMpXG4gICAgICAgIGxldCBzY2VuZUtleSA9IG51bGw7XG4gICAgICAgIC8vIGVwaGVtZXJhbCBzY2VuZXMgaGF2ZSBubyBhY3Rpb24sIHRoZXkganVzdCBkaXNwbGF5IHRoZWlyIGRlc2NyaXB0aW9uIGFuZCBwb3Agb2ZmXG4gICAgICAgIGlmIChzY2VuZS5lcGhlbWVyYWwpIHtcbiAgICAgICAgICAgIHNjZW5lU3RhY2sucG9wKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaG9pY2UgPSBhd2FpdCBpbnRlcmFjdChzY2VuZSwgc3RhdGUpO1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjaG9pY2UudmFsdWU7XG4gICAgICAgIGxvZ0Nob2ljZShjaG9pY2UpO1xuICAgICAgICBhd2FpdCBzbGVlcCgyMDApO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoLy4rU2NlbmUvLnRlc3QoYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmFsdWUgb2YgdGhlIGNob2ljZSB3YXMgYSBzY2VuZSBuYW1lLi4uXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lS2V5ID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoL2Rlc2NyaWJlSXRlbV8uKy8udGVzdChhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBvZiB0aGUgY2hvaWNlIHdhcyB0byBkZXNjcmliZSBhbiBpdGVtLi4uXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1OYW1lID0gYWN0aW9uLm1hdGNoKC9kZXNjcmliZUl0ZW1fKC4rKS8pWzFdO1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmliZUl0ZW0oaXRlbU5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NlbmUuaW50ZXJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHNjZW5lIGhhcyBhbiBpbnRlcmFjdCBtZXRob2QsIGNhbGwgaXQgYW5kIGdldCB0aGUgbmV4dCBzY2VuZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnRlcmFjdFJlc3VsdCA9IHNjZW5lLmludGVyYWN0KHNjZW5lLCBzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludGVyYWN0UmVzdWx0ICYmIHR5cGVvZiBpbnRlcmFjdFJlc3VsdCA9PT0gJ29iamVjdCcgJiYgaW50ZXJhY3RSZXN1bHQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNjZW5lID0gT2JqZWN0LmFzc2lnbih7fSwgaW50ZXJhY3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTY2VuZS5zdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lU3RhY2sucHVzaChuZXh0U2NlbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZVN0YWNrW3NjZW5lU3RhY2subGVuZ3RoIC0gMV0gPSBuZXh0U2NlbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnRlcmFjdFJlc3VsdCAmJiB0eXBlb2YgaW50ZXJhY3RSZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZUtleSA9IGludGVyYWN0UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndW5rbm93biBhY3Rpb24gJyArIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAgICAgLy8gc2NlbmUgaGFzIGVuZGVkLCBydW4gb25FbmQgaG9va1xuICAgICAgICBpZiAoc2NlbmUub25FbmQpIHtcbiAgICAgICAgICAgIHNjZW5lLm9uRW5kKHNjZW5lLCBzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc2NlbmVcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKCFzY2VuZUtleSkge1xuICAgICAgICAgICAgLy8gaWYgZ2l2ZW4gbm8gc2NlbmVLZXksIG5vdGhpbmcgaXMgbmV4dCwgc2ltcGx5IHBvcCB0aGlzIHNjZW5lXG4gICAgICAgICAgICBzY2VuZVN0YWNrLnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzY2VuZXNbc2NlbmVLZXldKSB7XG4gICAgICAgICAgICBzdG9yeVRlbGxNZXRhKCdUaGUgbXVzZXMgaGF2ZSBub3Qgc2VlbiB0aGF0IGZhciBpbnRvIHRoZSB0YWxlIHlldC4uLicsICd5ZWxsb3cnKTtcbiAgICAgICAgICAgIHN0b3J5VGVsbE1ldGEoJ35+ficsICdibHVlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2NlbmUgPSBPYmplY3QuYXNzaWduKHt9LCBzY2VuZXNbc2NlbmVLZXldKTtcbiAgICAgICAgICAgIGlmIChuZXh0U2NlbmUuc3RhY2spIHtcbiAgICAgICAgICAgICAgICBzY2VuZVN0YWNrLnB1c2gobmV4dFNjZW5lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NlbmVTdGFja1tzY2VuZVN0YWNrLmxlbmd0aCAtIDFdID0gbmV4dFNjZW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zb2xlLmxvZygnVFVSVExFIFFVRVNUIENPTlNPTEUnKTtcbm1haW4oKTtcbiIsImNvbnN0IHsgaW5xdWlyZSB9ID0gcmVxdWlyZSgnLi9pby5qcycpO1xuY29uc3QgeyBjaG9pY2VGaWx0ZXIgfSA9IHJlcXVpcmUoJy4vZmlsdGVycy9jaG9pY2UuanMnKTtcblxuYXN5bmMgZnVuY3Rpb24gaW50ZXJhY3Qoc2NlbmUsIHN0YXRlKSB7XG4gICAgLy9cbiAgICAvLyBjb25zdHJ1Y3QgY2hvaWNlc1xuICAgIC8vXG4gICAgLy8gY29weSBjaG9pY2VzIHdpdGggQXJyYXkuZnJvbSAod2Ugd2lsbCBtdXRhdGUgaXQpXG4gICAgLy8gKG5vdGU6IGNob2ljZXMgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkgb3Igbm90IGV2ZW4gcHJlc2VudClcbiAgICBsZXQgY2hvaWNlcztcbiAgICBpZiAoc2NlbmUuY2hvaWNlcy5jYWxsICYmIHNjZW5lLmNob2ljZXMuYXBwbHkpIHtcbiAgICAgICAgY2hvaWNlcyA9IEFycmF5LmZyb20oc2NlbmUuY2hvaWNlcyhzY2VuZSwgc3RhdGUpKTtcbiAgICB9IGVsc2UgaWYgKHNjZW5lLmNob2ljZXMpIHtcbiAgICAgICAgY2hvaWNlcyA9IEFycmF5LmZyb20oc2NlbmUuY2hvaWNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hvaWNlcyA9IFtdO1xuICAgIH1cblxuICAgIGlmICghc2NlbmUuZXhjbHVzaXZlQ2hvaWNlcykge1xuICAgICAgICAvLyBhZGQgbWFnaWMgY2hvaWNlIGlmIG5vdCBhbHJlYWR5IGluIG1hZ2ljU2NlbmVcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgIT09ICdtYWdpY1NjZW5lJyAmJiBzY2VuZS5uYW1lICE9PSAnbWVudVNjZW5lJykge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogXCJVc2UgbWFnaWNcIiwgdmFsdWU6IFwibWFnaWNTY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBkcmVhbSBvcHRpb24gaWYgc3RhdGUuZHJlYW1pbmcgPiAwXG4gICAgICAgIGlmIChzdGF0ZS5kcmVhbWluZyA+IDApIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IFwiRHJlYW1cIiwgdmFsdWU6IFwiZHJlYW1TY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBtZW51IGNob2ljZSBpZiBub3QgYWxyZWFkeSBpbiBtZW51U2NlbmVcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgIT09ICdtZW51U2NlbmUnKSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBcIk9wZW4gbWVudVwiLCB2YWx1ZTogXCJtZW51U2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhcHBseSBjaG9pY2VGaWx0ZXIgYmFzZWQgb24gc3RhdGVcbiAgICBjaG9pY2VzID0gY2hvaWNlRmlsdGVyKGNob2ljZXMsIHN0YXRlKTtcbiAgICAvLyBpZiBhcHBsaWNhYmxlLCBhcHBseSBzY2VuZSBjaG9pY2VGaWx0ZXJcbiAgICBpZiAoc2NlbmUuY2hvaWNlRmlsdGVyKSB7XG4gICAgICAgIGNob2ljZXMgPSBzY2VuZS5jaG9pY2VGaWx0ZXIoY2hvaWNlcyk7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBpbnRlcmFjdFxuICAgIC8vXG4gICAgLy8gdXNlIGlucXVpcmVyIHRvIGdldCBhY3R1YWwgaW50ZXJhY3Rpb25cbiAgICByZXR1cm4gaW5xdWlyZShjaG9pY2VzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW50ZXJhY3Rcbn07XG4iLCJjb25zdCBjb25zb2xlbG9nID0gKG1lc3NhZ2UsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBwLnN0eWxlWydjb2xvciddID0gY29sb3I7XG4gICAgdGVybWluYWwuYXBwZW5kQ2hpbGQocCk7XG4gICAgdGVybWluYWwuc2Nyb2xsVG9wID0gdGVybWluYWwuc2Nyb2xsSGVpZ2h0O1xufTtcblxuY29uc3QgbG9nQ2hvaWNlID0gKGNob2ljZSkgPT4ge1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcC5jbGFzc0xpc3QuYWRkKCdjaG9pY2UnKTtcbiAgICBwLnRleHRDb250ZW50ID0gY2hvaWNlLm5hbWU7XG4gICAgdGVybWluYWwuYXBwZW5kQ2hpbGQocCk7XG4gICAgdGVybWluYWwuc2Nyb2xsVG9wID0gdGVybWluYWwuc2Nyb2xsSGVpZ2h0O1xufTtcblxuY29uc3QgaW5xdWlyZSA9IChjaG9pY2VzKSA9PiB7XG4gICAgY29uc3QgY2hvaWNlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaG9pY2VzLWNvbnRhaW5lcicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjaG9pY2VzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IGNob2ljZSBvZiBjaG9pY2VzKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNob2ljZS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNob2ljZSk7XG4gICAgICAgICAgICBjb25zdCBjaG9pY2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNob2ljZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjaG9pY2VTcGFuLnRleHRDb250ZW50ID0gY2hvaWNlLm5hbWU7XG4gICAgICAgICAgICBjaG9pY2VEaXYuYXBwZW5kQ2hpbGQoY2hvaWNlU3Bhbik7XG4gICAgICAgICAgICBjaG9pY2VEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjaG9pY2UpO1xuICAgICAgICAgICAgICAgIGNob2ljZXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNob2ljZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hvaWNlRGl2KTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29uc29sZWxvZyxcbiAgICBsb2dDaG9pY2UsXG4gICAgaW5xdWlyZVxufTsiLCJjb25zdCBpdGVtRGVzY3JpcHRpb25zID0ge1xuICAgICdoZWFydFN1dHJhJzogJ2Egd2VhdGhlcmVkIGNvcHkgb2YgdGhlIGhlYXJ0IHN1dHJhLCBnaXZlbiB0byB5b3UgYnkgYSBmcmllbmQgbG9uZyBhZ28nLFxuICAgICdkaWFtb25kU3V0cmEnOiAnYSBjb3B5IG9mIHRoZSBkaWFtb25kIHN1dHJhOyB3aGVyZSBkaWQgaXQgY29tZSBmcm9tLi4uPydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGl0ZW1EZXNjcmlwdGlvbnNcbn07IiwiY29uc3QgYXdha2VuX2VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ2F3YWtlbl9lbnRlclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFsnZ2xhZGUnLCAnZ3JvdmUnLCAnY2xlYXJpbmcnLCAndmFsbGV5J107XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbG9jYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxvY2F0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICBjb25zdCBpbnNlY3RzID0gWydidXR0ZXJmbGllcycsICdmaXJlZmxpZXMnLCAnbWF5ZmxpZXMnXTtcbiAgICAgICAgY29uc3QgaW5zZWN0ID0gaW5zZWN0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpbnNlY3RzLmxlbmd0aCldO1xuXG4gICAgICAgIGNvbnN0IG1zZyA9IFtcbiAgICAgICAgICAgIGBZb3UgYXdha2VuJHtzdGF0ZS5hd2FrZW5lZCA/ICcgYWdhaW4gJyA6ICcgJ31pbiBhIG15c3RlcmlvdXMgZm9yZXN0LmAsXG4gICAgICAgICAgICBgWW91IGFyZSBpbiBhICR7bG9jYXRpb259IHdoZXJlICR7aW5zZWN0fSBnYXRoZXJgLFxuICAgICAgICAgICAgXCJUaGUgYWlyIGlzIGVuY2hhbnRlZCB3aXRoIG11Y2ggbWVtb3J5LlwiLFxuICAgICAgICAgICAgXCJZb3UgaGVhciBmYWludGx5IHRoZSBsZWF2ZXMgaW4gdGhlIGNhbm9weSBkYW5jaW5nLlwiLFxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gbXNnO1xuICAgIH0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF3YWtlbmVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkV4cGxvcmVcIiwgdmFsdWU6IFwiYXdha2VuX2V4cGxvcmVTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJUYWxrIHRvIHRoZSB0cmVlc1wiLCB2YWx1ZTogXCJ0cmVlc190YWxrRW50ZXJTY2VuZVwiIH0sXG4gICAgXVxufTtcblxuY29uc3QgYXdha2VuX2V4cGxvcmVTY2VuZSA9IHtcbiAgICBuYW1lOiAnYXdha2VuX2V4cGxvcmVTY2VuZScsXG4gICAgbG9jYXRpb25DcnVtYjogJ2ZvcmVzdCcsXG5cbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkamVjdGl2ZXMgPSBbJ215c3RlcmlvdXMnLCAnZW5jaGFudGVkJywgJ2FuY2llbnQnXTtcbiAgICAgICAgY29uc3QgYWRqZWN0aXZlID0gYWRqZWN0aXZlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhZGplY3RpdmVzLmxlbmd0aCldO1xuXG4gICAgICAgIGNvbnN0IG1pbmQgPSBzdGF0ZS5taW5kO1xuXG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXG4gICAgICAgICAgICBgWW91IHdhbGssIGV4cGxvcmluZyB0aGUgJHthZGplY3RpdmV9IGZvcmVzdC5gLFxuICAgICAgICAgICAgYFlvdXIgbWluZCAtICR7bWluZH0gLSBzZWVrcyB0aGUgd2F5IHRocm91Z2ggdGhlIGRyZWFtLmAsXG4gICAgICAgICAgICBcIkFzIHlvdSB3YWxrLCB5b3Ugc2VlIGEgdmluZWdyb3duIGRvb3J3YXkgdG8gYW5jaWVudCBydWlucy5cIlxuICAgICAgICBdO1xuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMzMpIHtcbiAgICAgICAgICAgIHN0YXRlLmV4dHJhU2Vuc2UgPSB0cnVlO1xuICAgICAgICAgICAgbXNncy5wdXNoKFwiWW91IGFsc28gc2Vuc2UgYSBoaWRkZW4gcGF0aHdheS5cIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIGNob2ljZXM6IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSBydWluc1wiLCB2YWx1ZTogXCJydWluc19lbnRlclNjZW5lXCIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUYWxrIHRvIHRoZSB0cmVlc1wiLCB2YWx1ZTogXCJ0cmVlc190YWxrRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgIF07XG4gICAgICAgIGlmIChzdGF0ZS5leHRyYVNlbnNlKSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBcIkZvbGxvdyB0aGUgaGlkZGVuIHBhdGhcIiwgdmFsdWU6IFwicGF0aF9lbnRlclNjZW5lXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXdha2VuX2VudGVyU2NlbmUsXG4gICAgYXdha2VuX2V4cGxvcmVTY2VuZVxufTsiLCJjb25zdCB7IGNyb3dEcmVhbSwgYmVhckRyZWFtLCBmaXNoRHJlYW0gfSA9IHJlcXVpcmUoJy4uL2RyZWFtL2luZGV4LmpzJyk7XG5cbmNvbnN0IGRyZWFtU2NlbmUgPSB7XG4gICAgbmFtZTogJ2RyZWFtU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGNsb3NlIHlvdXIgZXllcywgbGV0dGluZyB0aGUgd29ybGQgZmFkZSBhd2F5IGFzIHlvdSBlbnRlciBhIGRyZWFtbGlrZSBzdGF0ZS5cIixcbiAgICAgICAgXCJJbiB0aGlzIHJlYWxtIG9mIGV0aGVyZWFsIHBvc3NpYmlsaXRpZXMsIHlvdXIgc3Bpcml0IGZlZWxzIGl0IGNhbiBkcmVhbSBhcyBhbiBhbmltYWwuLi5cIlxuICAgIF0sXG4gICAgaXNEcmVhbTogdHJ1ZSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJEcmVhbSBhcyBhIENyb3dcIiwgdmFsdWU6IFwiY3Jvd0RyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiRHJlYW0gYXMgYSBCZWFyXCIsIHZhbHVlOiBcImJlYXJEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkRyZWFtIGFzIGEgRmlzaFwiLCB2YWx1ZTogXCJmaXNoRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gd2FraW5nIGxpZmVcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCBjcm93RHJlYW1TY2VuZSA9IHtcbiAgICBuYW1lOiAnY3Jvd0RyZWFtU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tU2lnaHQgPSBjcm93RHJlYW0uc2lnaHRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNyb3dEcmVhbS5zaWdodHMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBgWW91IHRha2Ugb24gdGhlIHBlcnNwZWN0aXZlIG9mIGEgY3Jvdywgc29hcmluZyB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgZm9yZXN0LmAsXG4gICAgICAgICAgICByYW5kb21TaWdodCxcbiAgICAgICAgICAgIFwiVGhlIGRyZWFtd29ybGQgYmVja29ucyB3aXRoIG15c3Rlcmllcy5cIixcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbz9cIixcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIGlzRHJlYW06IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBDcm93XCIsIHZhbHVlOiBcImNyb3dEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkludGVyYWN0IHdpdGggdGhlIFdvcmxkXCIsIHZhbHVlOiBcImNyb3dJbnRlcmFjdFNjZW5lXCIgfSxcbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5kcmVhbWluZyA9IE1hdGgubWF4KDAsIHN0YXRlLmRyZWFtaW5nIC0gMSk7XG4gICAgfVxufTtcblxuY29uc3QgYmVhckRyZWFtU2NlbmUgPSB7XG4gICAgbmFtZTogJ2JlYXJEcmVhbVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVNpZ2h0ID0gYmVhckRyZWFtLnNpZ2h0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiZWFyRHJlYW0uc2lnaHRzLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYFlvdSBlbWJvZHkgdGhlIHNwaXJpdCBvZiBhIGJlYXIsIGFtYmxpbmcgdGhyb3VnaCB0aGUgZW5jaGFudGVkIGZvcmVzdC5gLFxuICAgICAgICAgICAgcmFuZG9tU2lnaHQsXG4gICAgICAgICAgICBcIlRoZSBkcmVhbXdvcmxkIHVuZm9sZHMgaXRzIHNlY3JldHMgYmVmb3JlIHlvdS5cIixcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbz9cIixcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIGlzRHJlYW06IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBCZWFyXCIsIHZhbHVlOiBcImJlYXJEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkludGVyYWN0IHdpdGggdGhlIFdvcmxkXCIsIHZhbHVlOiBcImJlYXJJbnRlcmFjdFNjZW5lXCIgfSxcbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5kcmVhbWluZyA9IE1hdGgubWF4KDAsIHN0YXRlLmRyZWFtaW5nIC0gMSk7XG4gICAgfVxufTtcblxuY29uc3QgZmlzaERyZWFtU2NlbmUgPSB7XG4gICAgbmFtZTogJ2Zpc2hEcmVhbVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVNpZ2h0ID0gZmlzaERyZWFtLnNpZ2h0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaXNoRHJlYW0uc2lnaHRzLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYFlvdSBiZWNvbWUgb25lIHdpdGggYSByaXZlci1kd2VsbGluZyBmaXNoLCBnbGlkaW5nIHRocm91Z2ggdGhlIG15c3RpY2FsIHdhdGVycy5gLFxuICAgICAgICAgICAgcmFuZG9tU2lnaHQsXG4gICAgICAgICAgICBcIlRoZSBkcmVhbXdvcmxkIGJlbmVhdGggdGhlIHN1cmZhY2UgaG9sZHMgdW50b2xkIHdvbmRlcnMuXCIsXG4gICAgICAgICAgICBcIldoYXQgd2lsbCB5b3UgZG8/XCIsXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBpc0RyZWFtOiB0cnVlLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNvbnRpbnVlIERyZWFtaW5nIGFzIGEgRmlzaFwiLCB2YWx1ZTogXCJmaXNoRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJJbnRlcmFjdCB3aXRoIHRoZSBXb3JsZFwiLCB2YWx1ZTogXCJmaXNoSW50ZXJhY3RTY2VuZVwiIH0sXG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuZHJlYW1pbmcgPSBNYXRoLm1heCgwLCBzdGF0ZS5kcmVhbWluZyAtIDEpO1xuICAgIH1cbn07XG5cbmNvbnN0IGNyb3dJbnRlcmFjdFNjZW5lID0ge1xuICAgIG5hbWU6ICdjcm93SW50ZXJhY3RTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21JbnRlcmFjdGlvbiA9IGNyb3dEcmVhbS5pbnRlcmFjdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3Jvd0RyZWFtLmludGVyYWN0aW9ucy5sZW5ndGgpXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiWW91IGRlY2lkZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBkcmVhbXdvcmxkIGFzIGEgY3Jvdy5cIixcbiAgICAgICAgICAgIGBUaGUgZHJlYW13b3JsZCByZXNwb25kcyB3aXRoOiBcIiR7cmFuZG9tSW50ZXJhY3Rpb259XCJgLFxuICAgICAgICAgICAgXCJXaGF0IHdpbGwgeW91IGRvIG5leHQ/XCIsXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIENyb3dcIiwgdmFsdWU6IFwiY3Jvd0RyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBGb3Jlc3RcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCBiZWFySW50ZXJhY3RTY2VuZSA9IHtcbiAgICBuYW1lOiAnYmVhckludGVyYWN0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tSW50ZXJhY3Rpb24gPSBiZWFyRHJlYW0uaW50ZXJhY3Rpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJlYXJEcmVhbS5pbnRlcmFjdGlvbnMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIllvdSBjaG9vc2UgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgZHJlYW13b3JsZCBhcyBhIGJlYXIuXCIsXG4gICAgICAgICAgICBgVGhlIGRyZWFtd29ybGQgcmVzcG9uZHMgd2l0aDogXCIke3JhbmRvbUludGVyYWN0aW9ufVwiYCxcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbyBuZXh0P1wiLFxuICAgICAgICBdOyBmcm9tXG4gICAgfSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIEJlYXJcIiwgdmFsdWU6IFwiYmVhckRyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBGb3Jlc3RcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCBmaXNoSW50ZXJhY3RTY2VuZSA9IHtcbiAgICBuYW1lOiAnZmlzaEludGVyYWN0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tSW50ZXJhY3Rpb24gPSBmaXNoRHJlYW0uaW50ZXJhY3Rpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZpc2hEcmVhbS5pbnRlcmFjdGlvbnMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIllvdSBkZWNpZGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgZHJlYW13b3JsZCBhcyBhIGZpc2guXCIsXG4gICAgICAgICAgICBgVGhlIGRyZWFtd29ybGQgcmVzcG9uZHMgd2l0aDogXCIke3JhbmRvbUludGVyYWN0aW9ufVwiYCxcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbyBuZXh0P1wiLFxuICAgICAgICBdO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBGaXNoXCIsIHZhbHVlOiBcImZpc2hEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgRm9yZXN0XCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZHJlYW1TY2VuZSxcbiAgICBjcm93RHJlYW1TY2VuZSxcbiAgICBiZWFyRHJlYW1TY2VuZSxcbiAgICBmaXNoRHJlYW1TY2VuZSxcbiAgICBjcm93SW50ZXJhY3RTY2VuZSxcbiAgICBiZWFySW50ZXJhY3RTY2VuZSxcbiAgICBmaXNoSW50ZXJhY3RTY2VuZSxcbn07XG4iLCJjb25zdCB7XG4gICAgYXdha2VuX2VudGVyU2NlbmUsXG4gICAgYXdha2VuX2V4cGxvcmVTY2VuZVxufSA9IHJlcXVpcmUoJy4vYXdha2VuLmpzJyk7XG5cbmNvbnN0IHtcbiAgICBkcmVhbVNjZW5lLFxuICAgIGNyb3dEcmVhbVNjZW5lLFxuICAgIGJlYXJEcmVhbVNjZW5lLFxuICAgIGZpc2hEcmVhbVNjZW5lLFxuICAgIGNyb3dJbnRlcmFjdFNjZW5lLFxuICAgIGJlYXJJbnRlcmFjdFNjZW5lLFxuICAgIGZpc2hJbnRlcmFjdFNjZW5lXG59ID0gcmVxdWlyZSgnLi9kcmVhbS5qcycpO1xuXG5jb25zdCB7XG4gICAgbWVudVNjZW5lLFxuICAgIHZpZXdJbnZlbnRvcnlTY2VuZSxcbiAgICBjaGVja1N0YXRzU2NlbmVcbn0gPSByZXF1aXJlKCcuL21lbnUuanMnKTtcblxuY29uc3Qge1xuICAgIG1hZ2ljU2NlbmVcbn0gPSByZXF1aXJlKCcuL21hZ2ljLmpzJyk7XG5cbmNvbnN0IHtcbiAgICBydWluc19lbnRlclNjZW5lLFxuICAgIHJ1aW5zX2ZveWVyU2NlbmUsXG5cbiAgICBydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRCbHVlQm9va1NjZW5lLFxuXG4gICAgcnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRSZWRCb29rU2NlbmUsXG5cbiAgICBydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoQ2VudGVyU2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aFRvbWVTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoQ3J5c3RhbFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmVcbn0gPSByZXF1aXJlKCcuL3J1aW5zLmpzJyk7XG5cbmNvbnN0IHtcbiAgICB0cmVlc190YWxrRW50ZXJTY2VuZSxcblxuICAgIHRyZWVzX2Fza0hpc3RvcnlTY2VuZSxcbiAgICB0cmVlc19hc2tTZWVkbGluZ3NTY2VuZSxcbiAgICB0cmVlc19hc2tMb25nWWVhcnNTY2VuZSxcbiAgICB0cmVlc19hc2tDYW5vcHlTY2VuZSxcblxuICAgIHRyZWVzX2Fza01hZ2ljU2NlbmVcbn0gPSByZXF1aXJlKCcuL3RyZWVzLmpzJyk7XG5cbmNvbnN0IHtcbiAgICBwYXRoX2VudGVyU2NlbmUsXG4gICAgcGF0aF9kZWVwRm9yZXN0U2NlbmUsXG4gICAgcGF0aF9zeW1ib2xzU2NlbmUsXG4gICAgcGF0aF9jbGVhcmluZ1NjZW5lLFxuICAgIHBhdGhfbWlzdHlHcm92ZVNjZW5lLFxuICAgIHBhdGhfbGlnaHRzU2NlbmUsXG4gICAgcGF0aF93YXRlclJlZmxlY3Rpb25TY2VuZSxcbiAgICBwYXRoX2FuY2llbnRUcmVlU2NlbmUsXG4gICAgcGF0aF90cmVlV2lzZG9tU2NlbmUsXG4gICAgcGF0aF90cmVlSm91cm5leVNjZW5lLFxuICAgIHBhdGhfYmV5b25kQ2xlYXJpbmdTY2VuZVxufSA9IHJlcXVpcmUoJy4vcGF0aC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhd2FrZW5fZW50ZXJTY2VuZSxcbiAgICBhd2FrZW5fZXhwbG9yZVNjZW5lLFxuXG4gICAgZHJlYW1TY2VuZSxcbiAgICBjcm93RHJlYW1TY2VuZSxcbiAgICBiZWFyRHJlYW1TY2VuZSxcbiAgICBmaXNoRHJlYW1TY2VuZSxcbiAgICBjcm93SW50ZXJhY3RTY2VuZSxcbiAgICBiZWFySW50ZXJhY3RTY2VuZSxcbiAgICBmaXNoSW50ZXJhY3RTY2VuZSxcblxuICAgIG1lbnVTY2VuZSxcbiAgICB2aWV3SW52ZW50b3J5U2NlbmUsXG4gICAgY2hlY2tTdGF0c1NjZW5lLFxuXG4gICAgbWFnaWNTY2VuZSxcblxuICAgIHJ1aW5zX2VudGVyU2NlbmUsXG4gICAgcnVpbnNfZm95ZXJTY2VuZSxcblxuICAgIHJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZEJsdWVCb29rU2NlbmUsXG5cbiAgICBydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZFJlZEJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhDZW50ZXJTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoVG9tZVNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhDcnlzdGFsU2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZSxcblxuICAgIHRyZWVzX3RhbGtFbnRlclNjZW5lLFxuXG4gICAgdHJlZXNfYXNrSGlzdG9yeVNjZW5lLFxuICAgIHRyZWVzX2Fza1NlZWRsaW5nc1NjZW5lLFxuICAgIHRyZWVzX2Fza0xvbmdZZWFyc1NjZW5lLFxuICAgIHRyZWVzX2Fza0Nhbm9weVNjZW5lLFxuXG4gICAgdHJlZXNfYXNrTWFnaWNTY2VuZSxcblxuICAgIHBhdGhfZW50ZXJTY2VuZSxcbiAgICBwYXRoX2RlZXBGb3Jlc3RTY2VuZSxcbiAgICBwYXRoX3N5bWJvbHNTY2VuZSxcbiAgICBwYXRoX2NsZWFyaW5nU2NlbmUsXG4gICAgcGF0aF9taXN0eUdyb3ZlU2NlbmUsXG4gICAgcGF0aF9saWdodHNTY2VuZSxcbiAgICBwYXRoX3dhdGVyUmVmbGVjdGlvblNjZW5lLFxuICAgIHBhdGhfYW5jaWVudFRyZWVTY2VuZSxcbiAgICBwYXRoX3RyZWVXaXNkb21TY2VuZSxcbiAgICBwYXRoX3RyZWVKb3VybmV5U2NlbmUsXG4gICAgcGF0aF9iZXlvbmRDbGVhcmluZ1NjZW5lXG59O1xuIiwiY29uc3QgeyBzdG9yeVRlbGwgfSA9IHJlcXVpcmUoJy4uL3N0b3J5VGVsbGVyLmpzJyk7XG5cbmNvbnN0IG1hZ2ljU2NlbmUgPSB7XG4gICAgbmFtZTogJ21hZ2ljU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGRlY2lkZSB0byBoYXJuZXNzIHRoZSBtYWdpYyB3aXRoaW4geW91LlwiLFxuICAgICAgICBcIkJyZWF0aGUgaW4gZGVlcGx5LCBhbmQgYnJlYXRoZSBvdXQgZW5qb3lpbmcgY2FsbS5cIixcbiAgICAgICAgXCJBIHdhdmUgb2YgZW5lcmd5IHdpbGwgZmxvdyB0aHJvdWdoIHlvdXIgYm9keS5cIixcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNhc3QgYSBzcGVsbCBvZiBwcm90ZWN0aW9uXCIsIHZhbHVlOiBcImNhc3RQcm90ZWN0aW9uXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNhc3QgYSBzcGVsbCBvZiB0cmF2ZWxcIiwgdmFsdWU6IFwiY2FzdFRyYXZlbFwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDYXN0IGEgc3BlbGwgb2YgZHJlYW1pbmdcIiwgdmFsdWU6IFwiY2FzdERyZWFtXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgc3RhcnQgb2YgdGhlIHRhbGVcIiwgdmFsdWU6IFwicmV0dXJuU3RhcnRcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2FzdCBubyBtYWdpY1wiLCB2YWx1ZTogbnVsbCB9XG4gICAgXSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBpbnRlcmFjdDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgbGV0IG5leHQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnY2FzdFByb3RlY3Rpb24nOlxuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIllvdSBjYXN0IFByb3RlY3RpdmUgQ2lyY2xlO1wiKTtcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJBIHNoaW1tZXJpbmcgdmVpbCBvZiBhdXJhIHN1cnJvdW5kcyB5b3UgfioreG9cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYXN0VHJhdmVsJzpcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJBIGxpdHRsZSBmYWlyeSBhcHBlYXJzIGFuZCBzYXlzLCAneW91IG1heSB0cmF2ZWwgd2hlcmUgeW91IGhhdmUgYmVlbi4uLidcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhdmVsQ2hvaWNlcyA9IE9iamVjdC5lbnRyaWVzKHN0YXRlLmtub3duTG9jYXRpb25zKS5tYXAoKFtjcnVtYiwgc2NlbmVOYW1lXSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYFRyYXZlbCB0byAke2NydW1ifWAsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzY2VuZU5hbWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdHJhdmVsQ2hvaWNlcy5wdXNoKHsgbmFtZTogXCJDYW5jZWwgdHJhdmVsXCIsIHZhbHVlOiBudWxsIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYXZlbFNjZW5lID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAndHJhdmVsU2NlbmUnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogW1wiQ2hvb3NlIHlvdXIgZGVzdGluYXRpb246XCJdLFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiB0cmF2ZWxDaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdDogKHRyYXZlbFNlbGYsIHRyYXZlbFN0YXRlLCB0cmF2ZWxBY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmF2ZWxBY3Rpb24gJiYgdHJhdmVsQWN0aW9uICE9PSAnbnVsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhdmVsQWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0cmF2ZWxTY2VuZTtcbiAgICAgICAgICAgIGNhc2UgJ2Nhc3REcmVhbSc6XG4gICAgICAgICAgICAgICAgc3RvcnlUZWxsKFwiWW91IGltYnVlIHlvdXIgbWluZGJvZHkgd2l0aCBkcmVhbWluZyBwb3dlcnMsIGVub3VnaCBmb3Igb25lIGRyZWFtLi4uXCIpO1xuICAgICAgICAgICAgICAgIHN0YXRlLmRyZWFtaW5nID0gNTtcbiAgICAgICAgICAgICAgICBuZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JldHVyblN0YXJ0JzpcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJZb3UgY2FzdCBBd2FrZW47XCIpO1xuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIkEgbWFnaWNhbCBzaG93ZXIgY292ZXJzIGFsbCwgYW5kIHlvdSByZXR1cm4uLi5cIik7XG4gICAgICAgICAgICAgICAgbmV4dCA9ICdhd2FrZW5fZW50ZXJTY2VuZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcnlUZWxsKFwifn5+fn5+fn5+Kn4qfip+fn5+fn5+flwiKVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWdpY1NjZW5lLFxufTsiLCJjb25zdCB7IGJsYWNrYm9hcmQgfSA9IHJlcXVpcmUoJy4uL2JsYWNrYm9hcmQuanMnKTtcblxuY29uc3QgbWVudVNjZW5lID0ge1xuICAgIG5hbWU6ICdtZW51U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBcIllvdSByZXZpZXcgeW91ciBvcHRpb25zLi4uXCIsXG4gICAgc3RhY2s6IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICAvLyBUT0RPIHsgbmFtZTogXCJIYXZlIGEgZHJlYW1cIiwgdmFsdWU6IFwiZHJlYW1cIiB9LFxuICAgICAgICB7IG5hbWU6IFwiVmlldyBpbnZlbnRvcnlcIiwgdmFsdWU6IFwidmlld0ludmVudG9yeVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNoZWNrIGNoYXJhY3RlciBzdGF0c1wiLCB2YWx1ZTogXCJjaGVja1N0YXRzU2NlbmVcIiB9LFxuICAgICAgICAvLyBUT0RPIHsgbmFtZTogXCJTYXZlIGdhbWVcIiwgdmFsdWU6IFwic2F2ZUdhbWVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2xvc2UgbWVudVwiLCB2YWx1ZTogbnVsbCB9XG4gICAgXSxcbn07XG5cbmNvbnN0IHZpZXdJbnZlbnRvcnlTY2VuZSA9IHtcbiAgICBuYW1lOiAndmlld0ludmVudG9yeVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXCJZb3Ugc2V0IGRvd24geW91ciBwYWNrIGFuZCBsb29rIHRocm91Z2ggaXQuXCJdO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gc3RhdGUuaW52ZW50b3J5KSB7XG4gICAgICAgICAgICBtc2dzLnB1c2goaXRlbSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGV4Y2x1c2l2ZUNob2ljZXM6IHRydWUsXG4gICAgY2hvaWNlczogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIHN0YXRlLmludmVudG9yeSkge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogaXRlbSwgdmFsdWU6IGBkZXNjcmliZUl0ZW1fJHtpdGVtfWAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXM7XG4gICAgfSxcbn07XG5cbmNvbnN0IGNoZWNrU3RhdHNTY2VuZSA9IHtcbiAgICBuYW1lOiAnY2hlY2tTdGF0c1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXG4gICAgICAgICAgICAnSGVhbHRoOicsXG4gICAgICAgICAgICBgICBvICR7c3RhdGUuaGVhbHRofWAsXG4gICAgICAgICAgICAnTWluZDonLFxuICAgICAgICAgICAgYCAgPSAke3N0YXRlLm1pbmR9YFxuICAgICAgICBdO1xuICAgICAgICBpZiAoc3RhdGUuYXVyYXMgJiYgc3RhdGUuYXVyYXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIkF1cmFzOlwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXVyYSBpbiBzdGF0ZS5hdXJhcykge1xuICAgICAgICAgICAgICAgIG1zZ3MucHVzaChgICArICR7YXVyYX1gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBlcGhlbWVyYWw6IHRydWVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1lbnVTY2VuZSxcbiAgICB2aWV3SW52ZW50b3J5U2NlbmUsXG4gICAgY2hlY2tTdGF0c1NjZW5lXG59OyIsImNvbnN0IHBhdGhfZW50ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAncGF0aF9lbnRlclNjZW5lJyxcbiAgICBsb2NhdGlvbkNydW1iOiAnaGlkZGVuX2ZvcmVzdCcsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgXCJZb3Ugc3RlcCBvbnRvIGEgcGF0aCB0aGF0IHdhc24ndCB0aGVyZSBiZWZvcmUsXCIsXG4gICAgICAgICAgICBcIkEgc3VidGxlIHRyYWlsIG9mIG1vb25saWdodCBvbiB0aGUgZm9yZXN0IGZsb29yLlwiLFxuICAgICAgICAgICAgXCJUaGUgdHJlZXMgc2VlbSB0byB3aGlzcGVyIGFuY2llbnQgc2VjcmV0cyBhcyB5b3UgcGFzcy5cIixcbiAgICAgICAgICAgIFwiVGhlIGFpciBzaGltbWVycyB3aXRoIGFuIG90aGVyd29ybGRseSBxdWFsaXR5LlwiXG4gICAgICAgIF07XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgICBtc2dzLnB1c2goXCJZb3Ugbm90aWNlIHN0cmFuZ2Ugc3ltYm9scyBjYXJ2ZWQgaW50byB0aGUgYmFyayBvZiBuZWFyYnkgdHJlZXMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiRm9sbG93IHRoZSBwYXRoIGRlZXBlclwiLCB2YWx1ZTogXCJwYXRoX2RlZXBGb3Jlc3RTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJJbnZlc3RpZ2F0ZSB0aGUgc3ltYm9sc1wiLCB2YWx1ZTogXCJwYXRoX3N5bWJvbHNTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIG1haW4gZm9yZXN0XCIsIHZhbHVlOiBcImF3YWtlbl9leHBsb3JlU2NlbmVcIiB9XG4gICAgXVxufTtcblxuY29uc3QgcGF0aF9kZWVwRm9yZXN0U2NlbmUgPSB7XG4gICAgbmFtZTogJ3BhdGhfZGVlcEZvcmVzdFNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkamVjdGl2ZXMgPSBbJ2V0aGVyZWFsJywgJ3RpbWVsZXNzJywgJ2VuY2hhbnRlZCddO1xuICAgICAgICBjb25zdCBhZGplY3RpdmUgPSBhZGplY3RpdmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFkamVjdGl2ZXMubGVuZ3RoKV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgYFRoZSBwYXRoIGxlYWRzIHlvdSBkZWVwZXIgaW50byB0aGUgJHthZGplY3RpdmV9IGZvcmVzdC5gLFxuICAgICAgICAgICAgXCJUaGUgY2Fub3B5IGFib3ZlIGZpbHRlcnMgdGhlIGxpZ2h0IGludG8gZGFuY2luZyBwYXR0ZXJucy5cIixcbiAgICAgICAgICAgIFwiWW91IGZlZWwgYSBzZW5zZSBvZiBhbmNpZW50IHdpc2RvbSBzdXJyb3VuZGluZyB5b3UuXCJcbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC40KSB7XG4gICAgICAgICAgICBtc2dzLnB1c2goXCJBIGdlbnRsZSBicmVlemUgY2FycmllcyB0aGUgc2NlbnQgb2YgdW5rbm93biBmbG93ZXJzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBjaG9pY2VzOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBhbG9uZyB0aGUgcGF0aFwiLCB2YWx1ZTogXCJwYXRoX2NsZWFyaW5nU2NlbmVcIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgcGF0aCBlbnRyYW5jZVwiLCB2YWx1ZTogXCJwYXRoX2VudGVyU2NlbmVcIiB9XG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMykge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogXCJFbnRlciB0aGUgbWlzdHkgZ3JvdmVcIiwgdmFsdWU6IFwicGF0aF9taXN0eUdyb3ZlU2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNob2ljZXM7XG4gICAgfVxufTtcblxuY29uc3QgcGF0aF9zeW1ib2xzU2NlbmUgPSB7XG4gICAgbmFtZTogJ3BhdGhfc3ltYm9sc1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBleGFtaW5lIHRoZSBzeW1ib2xzIGNhcnZlZCBpbnRvIHRoZSB0cmVlIGJhcmsuXCIsXG4gICAgICAgIFwiVGhleSBzZWVtIHRvIHRlbGwgYSBzdG9yeSBvZiB0aGUgZm9yZXN0J3MgY3JlYXRpb24sXCIsXG4gICAgICAgIFwiT2YgYW5jaWVudCBiZWluZ3Mgd2hvIHNoYXBlZCB0aGlzIHBsYWNlIHdpdGggdGhlaXIgZHJlYW1zLlwiLFxuICAgICAgICBcIlRoZSBzeW1ib2xzIGdsb3cgZmFpbnRseSBhcyB5b3UgdG91Y2ggdGhlbS5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiRm9sbG93IHRoZSBwYXRoIGRlZXBlclwiLCB2YWx1ZTogXCJwYXRoX2RlZXBGb3Jlc3RTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIG1haW4gZm9yZXN0XCIsIHZhbHVlOiBcImF3YWtlbl9leHBsb3JlU2NlbmVcIiB9XG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuYXVyYXMuYWRkKCdhbmNpZW50X2tub3dsZWRnZScpO1xuICAgIH1cbn07XG5cbmNvbnN0IHBhdGhfY2xlYXJpbmdTY2VuZSA9IHtcbiAgICBuYW1lOiAncGF0aF9jbGVhcmluZ1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXG4gICAgICAgICAgICBcIlRoZSBwYXRoIG9wZW5zIGludG8gYSBjaXJjdWxhciBjbGVhcmluZyxcIixcbiAgICAgICAgICAgIFwiV2hlcmUgbW9vbmxpZ2h0IHBvb2xzIGxpa2UgbGlxdWlkIHNpbHZlci5cIixcbiAgICAgICAgICAgIFwiSW4gdGhlIGNlbnRlciBzdGFuZHMgYSBzaW5nbGUsIGFuY2llbnQgdHJlZSxcIixcbiAgICAgICAgICAgIFwiSXRzIGJyYW5jaGVzIHJlYWNoaW5nIHRvd2FyZCB0aGUgc3RhcnMuXCJcbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzdGF0ZS5hdXJhcyAmJiBzdGF0ZS5hdXJhcy5oYXMoJ2FuY2llbnRfa25vd2xlZGdlJykpIHtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIlRoZSB0cmVlIHNlZW1zIHRvIHJlY29nbml6ZSB5b3VyIG5ld2ZvdW5kIGtub3dsZWRnZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQXBwcm9hY2ggdGhlIGFuY2llbnQgdHJlZVwiLCB2YWx1ZTogXCJwYXRoX2FuY2llbnRUcmVlU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgYmV5b25kIHRoZSBjbGVhcmluZ1wiLCB2YWx1ZTogXCJwYXRoX2JleW9uZENsZWFyaW5nU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIGFsb25nIHRoZSBwYXRoXCIsIHZhbHVlOiBcInBhdGhfZGVlcEZvcmVzdFNjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHBhdGhfbWlzdHlHcm92ZVNjZW5lID0ge1xuICAgIG5hbWU6ICdwYXRoX21pc3R5R3JvdmVTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3Ugc3RlcCBpbnRvIGEgZ3JvdmUgd2hlcmUgbWlzdCBjdXJscyBhcm91bmQgeW91ciBmZWV0LlwiLFxuICAgICAgICBcIlRoZSBhaXIgaXMgdGhpY2sgd2l0aCB0aGUgc2NlbnQgb2YgbW9zcyBhbmQgZWFydGguXCIsXG4gICAgICAgIFwiU3RyYW5nZSBsaWdodHMgZGFuY2UgYmV0d2VlbiB0aGUgdHJlZXMsXCIsXG4gICAgICAgIFwiTGVhZGluZyB5b3UgdG93YXJkIHNvbWV0aGluZyBoaWRkZW4gaW4gdGhlIG1pc3QuXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkZvbGxvdyB0aGUgbGlnaHRzXCIsIHZhbHVlOiBcInBhdGhfbGlnaHRzU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBtYWluIHBhdGhcIiwgdmFsdWU6IFwicGF0aF9kZWVwRm9yZXN0U2NlbmVcIiB9XG4gICAgXVxufTtcblxuY29uc3QgcGF0aF9saWdodHNTY2VuZSA9IHtcbiAgICBuYW1lOiAncGF0aF9saWdodHNTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJUaGUgbGlnaHRzIGxlYWQgeW91IHRvIGEgc21hbGwgcG9vbCBvZiBjcnlzdGFsLWNsZWFyIHdhdGVyLlwiLFxuICAgICAgICBcIkl0cyBzdXJmYWNlIHJlZmxlY3RzIHRoZSBzdGFycyBhYm92ZSBwZXJmZWN0bHkuXCIsXG4gICAgICAgIFwiWW91IGZlZWwgYSBkZWVwIHNlbnNlIG9mIHBlYWNlIGhlcmUsXCIsXG4gICAgICAgIFwiQXMgaWYgdGltZSBpdHNlbGYgaGFzIHNsb3dlZCB0byBhIGdlbnRsZSBmbG93LlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJMb29rIGludG8gdGhlIHdhdGVyXCIsIHZhbHVlOiBcInBhdGhfd2F0ZXJSZWZsZWN0aW9uU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBtaXN0eSBncm92ZVwiLCB2YWx1ZTogXCJwYXRoX21pc3R5R3JvdmVTY2VuZVwiIH1cbiAgICBdXG59O1xuXG5jb25zdCBwYXRoX3dhdGVyUmVmbGVjdGlvblNjZW5lID0ge1xuICAgIG5hbWU6ICdwYXRoX3dhdGVyUmVmbGVjdGlvblNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIkFzIHlvdSBnYXplIGludG8gdGhlIHdhdGVyLCB5b3Ugc2VlIG5vdCB5b3VyIHJlZmxlY3Rpb24sXCIsXG4gICAgICAgIFwiQnV0IHNjZW5lcyBmcm9tIG90aGVyIHRpbWVzIGFuZCBwbGFjZXMuXCIsXG4gICAgICAgIFwiVGhlIHdhdGVyIHNob3dzIHlvdSBnbGltcHNlcyBvZiB0aGUgZm9yZXN0J3MgcGFzdCxcIixcbiAgICAgICAgXCJBbmQgcGVyaGFwcyBoaW50cyBvZiBpdHMgZnV0dXJlLlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIHBvb2xcIiwgdmFsdWU6IFwicGF0aF9saWdodHNTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSB5b3VyIGpvdXJuZXlcIiwgdmFsdWU6IFwicGF0aF9iZXlvbmRDbGVhcmluZ1NjZW5lXCIgfVxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF1cmFzLmFkZCgnZm9yZXNpZ2h0Jyk7XG4gICAgfVxufTtcblxuY29uc3QgcGF0aF9hbmNpZW50VHJlZVNjZW5lID0ge1xuICAgIG5hbWU6ICdwYXRoX2FuY2llbnRUcmVlU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbXNncyA9IFtcbiAgICAgICAgICAgIFwiWW91IGFwcHJvYWNoIHRoZSBhbmNpZW50IHRyZWUgYW5kIHBsYWNlIHlvdXIgaGFuZCBvbiBpdHMgdHJ1bmsuXCIsXG4gICAgICAgICAgICBcIkEgZGVlcCwgcmVzb25hbnQgdm9pY2Ugc3BlYWtzIGRpcmVjdGx5IGludG8geW91ciBtaW5kOlwiLFxuICAgICAgICAgICAgXCInV2VsY29tZSwgc2Vla2VyLiBXaGF0IHdpc2RvbSBkbyB5b3Ugc2Vlaz8nXCJcbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzdGF0ZS5hdXJhcyAmJiBzdGF0ZS5hdXJhcy5oYXMoJ2FuY2llbnRfa25vd2xlZGdlJykpIHtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIlRoZSB0cmVlIGFja25vd2xlZGdlcyB5b3VyIGNvbm5lY3Rpb24gdG8gdGhlIGFuY2llbnQgc3ltYm9scy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBmb3Jlc3QncyBzZWNyZXRzXCIsIHZhbHVlOiBcInBhdGhfdHJlZVdpc2RvbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkFzayBhYm91dCB5b3VyIGpvdXJuZXlcIiwgdmFsdWU6IFwicGF0aF90cmVlSm91cm5leVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlN0ZXAgYmFjayBmcm9tIHRoZSB0cmVlXCIsIHZhbHVlOiBcInBhdGhfY2xlYXJpbmdTY2VuZVwiIH1cbiAgICBdXG59O1xuXG5jb25zdCBwYXRoX3RyZWVXaXNkb21TY2VuZSA9IHtcbiAgICBuYW1lOiAncGF0aF90cmVlV2lzZG9tU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiVGhlIHRyZWUncyB2b2ljZSBlY2hvZXMgdGhyb3VnaCB5b3VyIG1pbmQ6XCIsXG4gICAgICAgIFwiJ1RoZSBmb3Jlc3QgcmVtZW1iZXJzIGFsbCB3aG8gaGF2ZSB3YWxrZWQgaXRzIHBhdGhzLlwiLFxuICAgICAgICBcIkV2ZXJ5IHN0ZXAgeW91IHRha2UgaGFzIGJlZW4gdGFrZW4gYmVmb3JlLFwiLFxuICAgICAgICBcIkFuZCB3aWxsIGJlIHRha2VuIGFnYWluLiBTZWVrIG5vdCB0aGUgZGVzdGluYXRpb24sXCIsXG4gICAgICAgIFwiQnV0IHRoZSBqb3VybmV5IGl0c2VsZi4nXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkFzayBhYm91dCB5b3VyIGpvdXJuZXlcIiwgdmFsdWU6IFwicGF0aF90cmVlSm91cm5leVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlN0ZXAgYmFjayBmcm9tIHRoZSB0cmVlXCIsIHZhbHVlOiBcInBhdGhfY2xlYXJpbmdTY2VuZVwiIH1cbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5hdXJhcy5hZGQoJ2ZvcmVzdF93aXNkb20nKTtcbiAgICB9XG59O1xuXG5jb25zdCBwYXRoX3RyZWVKb3VybmV5U2NlbmUgPSB7XG4gICAgbmFtZTogJ3BhdGhfdHJlZUpvdXJuZXlTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJUaGUgYW5jaWVudCB0cmVlIHNwZWFrcyBhZ2FpbjpcIixcbiAgICAgICAgXCInWW91ciBwYXRoIGlzIHlvdXIgb3duLCB5ZXQgY29ubmVjdGVkIHRvIGFsbCBwYXRocy5cIixcbiAgICAgICAgXCJUaGUgcnVpbnMgaG9sZCBhbmNpZW50IGtub3dsZWRnZSxcIixcbiAgICAgICAgXCJCdXQgdGhlIGZvcmVzdCBob2xkcyB0aGUgd2lzZG9tIG9mIGdyb3d0aCBhbmQgY2hhbmdlLlwiLFxuICAgICAgICBcIkNob29zZSB5b3VyIHdheSB3aXRoIGNhcmUuJ1wiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJBc2sgYWJvdXQgdGhlIGZvcmVzdCdzIHNlY3JldHNcIiwgdmFsdWU6IFwicGF0aF90cmVlV2lzZG9tU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiU3RlcCBiYWNrIGZyb20gdGhlIHRyZWVcIiwgdmFsdWU6IFwicGF0aF9jbGVhcmluZ1NjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHBhdGhfYmV5b25kQ2xlYXJpbmdTY2VuZSA9IHtcbiAgICBuYW1lOiAncGF0aF9iZXlvbmRDbGVhcmluZ1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXG4gICAgICAgICAgICBcIkJleW9uZCB0aGUgY2xlYXJpbmcsIHRoZSBwYXRoIGNvbnRpbnVlcyxcIixcbiAgICAgICAgICAgIFwiTGVhZGluZyB5b3UgdG93YXJkIHRoZSBkaXN0YW50IHJ1aW5zLlwiLFxuICAgICAgICAgICAgXCJUaGUgZm9yZXN0IHNlZW1zIHRvIGd1aWRlIHlvdXIgc3RlcHMsXCIsXG4gICAgICAgICAgICBcIkFzIGlmIGl0IGtub3dzIHdoZXJlIHlvdSBuZWVkIHRvIGdvLlwiXG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBpZiAoc3RhdGUuYXVyYXMgJiYgc3RhdGUuYXVyYXMuaGFzKCdmb3Jlc3Rfd2lzZG9tJykpIHtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIlRoZSBwYXRoIGZlZWxzIG1vcmUgZmFtaWxpYXIgbm93LCBhcyBpZiB5b3UndmUgd2Fsa2VkIGl0IGluIGRyZWFtcy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgdG8gdGhlIHJ1aW5zXCIsIHZhbHVlOiBcInJ1aW5zX2VudGVyU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBjbGVhcmluZ1wiLCB2YWx1ZTogXCJwYXRoX2NsZWFyaW5nU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBtYWluIGZvcmVzdFwiLCB2YWx1ZTogXCJhd2FrZW5fZXhwbG9yZVNjZW5lXCIgfVxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhdGhfZW50ZXJTY2VuZSxcbiAgICBwYXRoX2RlZXBGb3Jlc3RTY2VuZSxcbiAgICBwYXRoX3N5bWJvbHNTY2VuZSxcbiAgICBwYXRoX2NsZWFyaW5nU2NlbmUsXG4gICAgcGF0aF9taXN0eUdyb3ZlU2NlbmUsXG4gICAgcGF0aF9saWdodHNTY2VuZSxcbiAgICBwYXRoX3dhdGVyUmVmbGVjdGlvblNjZW5lLFxuICAgIHBhdGhfYW5jaWVudFRyZWVTY2VuZSxcbiAgICBwYXRoX3RyZWVXaXNkb21TY2VuZSxcbiAgICBwYXRoX3RyZWVKb3VybmV5U2NlbmUsXG4gICAgcGF0aF9iZXlvbmRDbGVhcmluZ1NjZW5lXG59OyAiLCJjb25zdCBydWluc19lbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19lbnRlclNjZW5lJyxcbiAgICBsb2NhdGlvbkNydW1iOiAncnVpbnMnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IHBhc3MgYmVuZWF0aCB0aGUgc3RvbmUgZ2F0ZXdheSwgYnJ1c2hlZCBieSBvdmVyZ3Jvd24gdmluZXMuXCIsXG4gICAgICAgIFwiVGhlIGFpciBpcyBjb29sIGFuZCBhIGZyZXNoIHdpbmQgZnJvbSBvdXRzaWRlIGJsb3dzIGlud2FyZC5cIixcbiAgICAgICAgXCJBcyB5b3Ugd2FsaywgdGhlIGxpZ2h0IGZhZGVzIHRvIGdyZXksIG5ldmVyIHF1aXRlIGdvaW5nIG91dC5cIixcbiAgICAgICAgXCJZb3UgY29tZSB0byBhIGJsdWUgZG9vcndheSBhbmQgYSBncmVlbiBkb29yd2F5XCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSBibHVlIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJFbnRlciB0aGUgcmVkIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgZm9yZXN0XCIsIHZhbHVlOiBcImF3YWtlbl9leHBsb3JlU2NlbmVcIiB9XG4gICAgXVxufTtcblxuY29uc3QgcnVpbnNfZm95ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfZm95ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgXCJZb3UgcmV0dXJuIHRvIHRoZSBlbnRyYW5jZSB0byB0aGUgcnVpbnMuIFNvZnQgbGlnaHQgcHJvdmlkZXNcIixcbiAgICAgICAgICAgIFwiVGhlIGJhcmVzdCBpbGx1bWluYXRpb24sIGFuZCB5b3UgY2FuIHNlZSB0aGUgd2FsbHMgYXJlIGNhcnZlZFwiLFxuICAgICAgICAgICAgXCJXaXRoIG1hbnkgc3RyYW5nZSBnbHlwaHMuIFlvdSBzZWUgYSBibHVlIGRvb3J3YXkgYW5kIGEgcmVkIGRvb3J3YXkuXCJcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjMzKSB7XG4gICAgICAgICAgICBzdGF0ZS5leHRyYVNlbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIkFuZCB5b3Ugc2Vuc2UgYSBoaWRkZW4gcGF0aHdheSBhcyB3ZWxsLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIGNob2ljZXM6IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSBibHVlIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhlIHJlZCBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBmb3Jlc3RcIiwgdmFsdWU6IFwiYXdha2VuX2V4cGxvcmVTY2VuZVwiIH1cbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHN0YXRlLmV4dHJhU2Vuc2UpIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IFwiRm9sbG93IHRoZSBoaWRkZW4gcGF0aFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlcztcbiAgICB9XG59O1xuXG5jb25zdCBydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBwYXNzIHRocm91Z2ggdGhlIGJsdWUgZG9vcndheSwgYW5kIGFzIHlvdSBkbyxcIixcbiAgICAgICAgXCJUaGUgc2NlbnQgb2YgbGF2ZW5kZXIgYXJpc2VzIGluIHlvdXIgbWluZC4gVGhlIGRvb3IgcGxheXMgYVwiLFxuICAgICAgICBcIk11c2ljYWwgdGhlbWUgbGlrZSBhIGZsdXRlIGZyb20gYW4gYW5jaWVudCB0aW1lLiBZb3UgZmluZFwiLFxuICAgICAgICBcIllvdXJzZWxmIGluIGEgY2lyY3VsYXIgY2hhbWJlciB3aXRoIHNvZnQgaWxsdW1pbmF0aW9uIGZyb21cIixcbiAgICAgICAgXCJBIHNreWxpZ2h0IGZhciBhYm92ZSBpbiB0aGUgdmF1bHRlZCBjZWlsaW5nLiBBIGJvb2sgaXMgb25cIixcbiAgICAgICAgXCJBIHN0b25lIHRhYmxlIGluIHRoZSBjZW50ZXIgb2YgdGhlIHJvb20uXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJlYWQgdGhlIGJvb2tcIiwgdmFsdWU6IFwicnVpbnNfcmVhZEJsdWVCb29rU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRocm91Z2ggdGhlIGJsdWUgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHJ1aW5zX3JlYWRCbHVlQm9va1NjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19yZWFkQmx1ZUJvb2tTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgYXBwcm9hY2ggdGhlIGJsdWUgYm9vayBhbmQgcmVhZCBmcm9tIGl0LCBub3RpY2luZ1wiLFxuICAgICAgICBcIkl0J3MgYWN0dWFsbHkgbWFkZSBvZiBibHVlIGphZGUgYW5kIGhhcyBvbmx5IG9uZSBwYWdlIHZpc2libGUuXCIsXG4gICAgICAgIFwiSXQgcmVhZHM6XCIsXG4gICAgICAgIFwiTXlzdGVyeSBhbmQgbWFuaWZlc3RhdGlvbnMgYXJpc2UgZnJvbSB0aGUgc2FtZSBzb3VyY2UuLi5cIixcbiAgICAgICAgXCJZb3UgZmVlbCBzZXJlbml0eSBhdCB0aGVzZSB3b3Jkcy5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRocm91Z2ggdGhlIGJsdWUgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF1cmFzLmFkZCgnc2VyZW5pdHknKTtcbiAgICB9XG59O1xuXG5jb25zdCBydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgcGFzcyB0aHJvdWdoIHRoZSByZWQgZG9vcndheSwgYW5kIGFzIHlvdSBkbyxcIixcbiAgICAgICAgXCJUaGUgc2NlbnQgb2YgbWludCBhcmlzZXMgaW4geW91ciBtaW5kLiBUaGUgZG9vciBwbGF5cyBhXCIsXG4gICAgICAgIFwiTXVzaWNhbCB0aGVtZSBsaWtlIGEgaGFycCBmcm9tIGFuIGFuY2llbnQgdGltZS4gWW91IGZpbmRcIixcbiAgICAgICAgXCJZb3Vyc2VsZiBpbiBhIGhleGFnb25hbCBjaGFtYmVyIHdpdGggc29mdCBpbGx1bWluYXRpb24gZnJvbVwiLFxuICAgICAgICBcIkEgbW9vbmxpZ2h0IGZhciBhYm92ZSBpbiB0aGUgYXJjaGVkIGNlaWxpbmcuIEEgYm9vayBpcyBvblwiLFxuICAgICAgICBcIkEgc3RvbmUgdGFibGUgaW4gdGhlIGNlbnRlciBvZiB0aGUgcm9vbS5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiUmVhZCB0aGUgYm9va1wiLCB2YWx1ZTogXCJydWluc19yZWFkUmVkQm9va1NjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0aHJvdWdoIHRoZSByZWQgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHJ1aW5zX3JlYWRSZWRCb29rU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX3JlYWRSZWRCb29rU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGFwcHJvYWNoIHRoZSByZWQgYm9vayBhbmQgcmVhZCBmcm9tIGl0LCBub3RpY2luZ1wiLFxuICAgICAgICBcIkl0J3MgYWN0dWFsbHkgbWFkZSBvZiByZWQgZ3Jhbml0ZSBhbmQgaGFzIG9ubHkgb25lIHBhZ2UgdmlzaWJsZS5cIixcbiAgICAgICAgXCJJdCByZWFkczpcIixcbiAgICAgICAgXCJSZXR1cm5pbmcgdG8gdGhlIHNvdXJjZSBpcyBjb21wbGV0aW9uIGFuZCB3aG9sZW5lc3MuLi5cIixcbiAgICAgICAgXCJZb3UgZmVlbCBzYWZldHkgYXQgdGhlc2Ugd29yZHMuXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0aHJvdWdoIHRoZSByZWQgZG9vcndheVwiLCB2YWx1ZTogXCJydWluc19mb3llclNjZW5lXCIgfVxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF1cmFzLmFkZCgnc2FmZXR5Jyk7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aF9FbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbXNncyA9IFtcbiAgICAgICAgICAgIFwiWW91IHBhc3MgdGhyb3VnaCBhIHZlaWwgaW4gc3BhY2UsIGEgc2hpbW1lcmluZyBjdXJ0YWluIG9mIGRyZWFtcyxcIixcbiAgICAgICAgICAgIFwiQW5kIGVudGVyIHRoZSBoaWRkZW4gcGF0aHdheSB0aHJvdWdoIHRoZSBydWlucy5cIixcbiAgICAgICAgICAgIFwiVGhlIGFpciBoZXJlIGlzIHRoaWNrIHdpdGggYW5jaWVudCBtYWdpYyxcIixcbiAgICAgICAgICAgIFwiQW5kIHRoZSB3YWxscyBzZWVtIHRvIHB1bHNlIHdpdGggdGhlaXIgb3duIGlubmVyIGxpZ2h0LlwiXG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNCkge1xuICAgICAgICAgICAgbXNncy5wdXNoKFwiWW91IGhlYXIgZGlzdGFudCBlY2hvZXMgb2Ygdm9pY2VzIHNwZWFraW5nIGluIGZvcmdvdHRlbiB0b25ndWVzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSBsZWZ0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIHJpZ2h0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJGb2xsb3cgdGhlIGNlbnRyYWwgcGFzc2FnZVwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoQ2VudGVyU2NlbmVcIiB9XG4gICAgXVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgXCJZb3UgZm9sbG93IHRoZSBoaWRkZW4gcGF0aCBhcyBpdCBicmFuY2hlcyB0byB0aGUgbGVmdC5cIixcbiAgICAgICAgICAgIFwiVGhlIHBhc3NhZ2UgbmFycm93cyBhbmQgdGhlIGFpciBncm93cyBjb29sZXIuXCIsXG4gICAgICAgICAgICBcIkFuY2llbnQgcnVuZXMgZ2xvdyBmYWludGx5IGFsb25nIHRoZSB3YWxscyxcIixcbiAgICAgICAgICAgIFwiVGVsbGluZyBzdG9yaWVzIG9mIHRob3NlIHdobyB3YWxrZWQgdGhlc2UgaGFsbHMgbG9uZyBhZ28uXCJcbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgICBtc2dzLnB1c2goXCJBIGdlbnRsZSBicmVlemUgY2FycmllcyB0aGUgc2NlbnQgb2Ygb2xkIHBhcmNobWVudCBhbmQgaW5rLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBjaG9pY2VzOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSByaWdodCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmVcIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkZvbGxvdyB0aGUgY2VudHJhbCBwYXNzYWdlXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhDZW50ZXJTY2VuZVwiIH1cbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC40KSB7XG4gICAgICAgICAgICBwb3NzaWJpbGl0aWVzLnB1c2goXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIGxlZnQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmVcIiB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMjUpIHtcbiAgICAgICAgICAgIHBvc3NpYmlsaXRpZXMucHVzaChcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhyb3VnaCB0aGUgZnJpZW5kc2hpcCBnYXRld2F5XCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhHYXRld2F5U2NlbmVcIiB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcG9zc2liaWxpdGllcztcbiAgICB9XG59O1xuXG5jb25zdCBydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbXNncyA9IFtcbiAgICAgICAgICAgIFwiWW91IGZvbGxvdyB0aGUgaGlkZGVuIHBhdGggYXMgaXQgYnJhbmNoZXMgdG8gdGhlIHJpZ2h0LlwiLFxuICAgICAgICAgICAgXCJUaGUgcGFzc2FnZSB3aWRlbnMgYW5kIHlvdSBoZWFyIHRoZSBzb3VuZCBvZiBmbG93aW5nIHdhdGVyLlwiLFxuICAgICAgICAgICAgXCJDcnlzdGFsIGZvcm1hdGlvbnMgc3BhcmtsZSBpbiB0aGUgd2FsbHMsXCIsXG4gICAgICAgICAgICBcIlJlZmxlY3RpbmcgbGlnaHQgaW4gcGF0dGVybnMgdGhhdCBzZWVtIHRvIGRhbmNlLlwiXG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNCkge1xuICAgICAgICAgICAgbXNncy5wdXNoKFwiVGhlIGFpciBoZXJlIGZlZWxzIGNoYXJnZWQgd2l0aCBhbmNpZW50IGVuZXJneS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtc2dzO1xuICAgIH0sXG4gICAgY2hvaWNlczogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3NpYmlsaXRpZXMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgbGVmdCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRm9sbG93IHRoZSBjZW50cmFsIHBhc3NhZ2VcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aENlbnRlclNjZW5lXCIgfVxuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjQpIHtcbiAgICAgICAgICAgIHBvc3NpYmlsaXRpZXMucHVzaChcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgcmlnaHQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lXCIgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjMpIHtcbiAgICAgICAgICAgIHBvc3NpYmlsaXRpZXMucHVzaChcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiSW52ZXN0aWdhdGUgdGhlIGNyeXN0YWwgZm9ybWF0aW9uc1wiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoQ3J5c3RhbFNjZW5lXCIgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHBvc3NpYmlsaXRpZXM7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aENlbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19oaWRkZW5QYXRoQ2VudGVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbXNncyA9IFtcbiAgICAgICAgICAgIFwiWW91IGZvbGxvdyB0aGUgY2VudHJhbCBwYXNzYWdlLCB3aGljaCBsZWFkcyB0byBhIGdyYW5kIGNoYW1iZXIuXCIsXG4gICAgICAgICAgICBcIlRoZSBjZWlsaW5nIHNvYXJzIGhpZ2ggYWJvdmUsIHN1cHBvcnRlZCBieSBwaWxsYXJzIG9mIGFuY2llbnQgc3RvbmUuXCIsXG4gICAgICAgICAgICBcIkluIHRoZSBjZW50ZXIgb2YgdGhlIHJvb20gc3RhbmRzIGEgcGVkZXN0YWwsXCIsXG4gICAgICAgICAgICBcIlVwb24gd2hpY2ggcmVzdHMgYW4gYW5jaWVudCB0b21lIGJvdW5kIGluIGxlYXRoZXIuXCJcbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgICBtc2dzLnB1c2goXCJUaGUgYWlyIGhlcmUgZmVlbHMgaGVhdnkgd2l0aCB0aGUgd2VpZ2h0IG9mIGZvcmdvdHRlbiBrbm93bGVkZ2UuXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkV4YW1pbmUgdGhlIGFuY2llbnQgdG9tZVwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoVG9tZVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIGxlZnQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgcmlnaHQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lXCIgfVxuICAgIF1cbn07XG5cbmNvbnN0IHJ1aW5zX2hpZGRlblBhdGhUb21lU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2hpZGRlblBhdGhUb21lU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGFwcHJvYWNoIHRoZSBhbmNpZW50IHRvbWUgYW5kIGNhcmVmdWxseSBvcGVuIGl0cyBwYWdlcy5cIixcbiAgICAgICAgXCJUaGUgdGV4dCBpcyB3cml0dGVuIGluIGEgc2NyaXB0IHlvdSBjYW5ub3QgcmVhZCxcIixcbiAgICAgICAgXCJCdXQgYXMgeW91IHRvdWNoIHRoZSBwYWdlcywga25vd2xlZGdlIGZsb3dzIGludG8geW91ciBtaW5kLlwiLFxuICAgICAgICBcIllvdSBsZWFybiBvZiBhbmNpZW50IHNlY3JldHMgYW5kIGZvcmdvdHRlbiB3aXNkb20uXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgY2VudHJhbCBjaGFtYmVyXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhDZW50ZXJTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSBsZWZ0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIHJpZ2h0IGJyYW5jaFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZVwiIH1cbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5hdXJhcy5hZGQoJ2FuY2llbnRfd2lzZG9tJyk7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aENyeXN0YWxTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aENyeXN0YWxTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgXCJZb3UgZXhhbWluZSB0aGUgY3J5c3RhbCBmb3JtYXRpb25zIG1vcmUgY2xvc2VseS5cIixcbiAgICAgICAgICAgIFwiVGhleSBzZWVtIHRvIHB1bHNlIHdpdGggaW5uZXIgbGlnaHQsXCIsXG4gICAgICAgICAgICBcIkFuZCBhcyB5b3UgdG91Y2ggdGhlbSwgdmlzaW9ucyBmbGFzaCB0aHJvdWdoIHlvdXIgbWluZC5cIlxuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgaWYgKHN0YXRlLmF1cmFzICYmIHN0YXRlLmF1cmFzLmhhcygnYW5jaWVudF93aXNkb20nKSkge1xuICAgICAgICAgICAgbXNncy5wdXNoKFwiVGhlIGNyeXN0YWxzIHJlc29uYXRlIHdpdGggeW91ciBuZXdmb3VuZCBrbm93bGVkZ2UuXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgcmlnaHQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIGxlZnQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiRm9sbG93IHRoZSBjZW50cmFsIHBhc3NhZ2VcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aENlbnRlclNjZW5lXCIgfVxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmF1cmFzLmFkZCgnY3J5c3RhbF9pbnNpZ2h0Jyk7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgcGFzcyB0aHJvdWdoIHRoZSBoaWRkZW4gZG9vcndheSwgYW5kIGFzIHlvdSBkbyxcIixcbiAgICAgICAgXCJUaGUgdm9pY2Ugb2YgYSB3b21hbiBzcGVha3MgaW50byB5b3VyIG1pbmQuIFNoZSBzcGVha3MsXCIsXG4gICAgICAgIFwiWW91IHNoYWxsIGZpbmQgd2hhdCB5b3Ugc2Vlay4uLlwiLFxuICAgICAgICBcIllvdSBwYXNzIHRocm91Z2ggc2hhZGUgYW5kIGN1cmxpbmcgaW5jZW5zZSBzbW9rZVwiLFxuICAgICAgICBcIkFuZCBoZWFyIHRoZSBzb3VuZCBvZiB0aGUgbW9vbiByaXNpbmcgYmV5b25kIHRoZSBob3Jpem9uXCIsXG4gICAgICAgIFwiQW5kIGZhciBhYm92ZSB5b3UgYSBtdXNpY2FsIGZsdXRlIHBsYXlzLiBZb3UgdGhlbiBhd2FrZW5cIixcbiAgICAgICAgXCJJbiBhIG1hZ2ljYWwgZm9yZXN0LiBZb3Ugbm90aWNlIGEgYm9vayBpbiB5b3VyIHBvY2tldC5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiRXhwbG9yZVwiLCB2YWx1ZTogXCJhd2FrZW5fZXhwbG9yZVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRhbGsgdG8gdGhlIHRyZWVzXCIsIHZhbHVlOiBcInRyZWVzX3RhbGtFbnRlclNjZW5lXCIgfSxcbiAgICBdLFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5pbnZlbnRvcnlbJ2RpYW1vbmRTdXRyYSddID0gMTtcbiAgICB9XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJ1aW5zX2VudGVyU2NlbmUsXG4gICAgcnVpbnNfZm95ZXJTY2VuZSxcblxuICAgIHJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZEJsdWVCb29rU2NlbmUsXG5cbiAgICBydWluc19yZWREb29yd2F5X0VudGVyU2NlbmUsXG4gICAgcnVpbnNfcmVhZFJlZEJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoTGVmdFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhDZW50ZXJTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoVG9tZVNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhDcnlzdGFsU2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZVxufSIsImNvbnN0IHRyZWVzX3RhbGtFbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdhd2FrZW5fdGFsa1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBjb21tdW5pY2F0ZSB3aXRoIHRoZSBhbmNpZW50IHRyZWVzLFwiLFxuICAgICAgICBcInBsYWNpbmcgeW91ciBoYW5kcyBvbiB0aGVpciB0cnVua3MsIGFza2luZyB0aGVtIHRvIHNwZWFrLlwiLFxuICAgICAgICBcIlRoZXkgc2F5LCBcIiArIFwiJ1dlIHdpbGwgc3BlYWsgc29mdGx5IG9mIGZvcmdvdHRlbiBzZWNyZXRzLi4uJ1wiLFxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBmb3Jlc3QncyBoaXN0b3J5XCIsIHZhbHVlOiBcInRyZWVzX2Fza0hpc3RvcnlTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJJbnF1aXJlIGFib3V0IG1hZ2ljYWwga25vd2xlZGdlXCIsIHZhbHVlOiBcInRyZWVzX2Fza01hZ2ljU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHlvdXIgc3Vycm91bmRpbmdzXCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxuY29uc3QgdHJlZXNfYXNrSGlzdG9yeVNjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tIaXN0b3J5U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJ0luIHRoZSBiZWdpbm5pbmcsIHRoZXJlIHdlcmUgdGhlIHNlZWRsaW5ncywgZmlyc3QgdG8gYXdha2VuLi4uJ1wiLFxuICAgICAgICBcIidUaGVuIHRoZSBsb25nIHllYXJzIG9mIG1hbnkgdHVybmluZ3Mgb2YgdGhlIHNreS13aGVlbC4uLidcIixcbiAgICAgICAgXCInQW5kIHRoZW4gdGhlIGJ1cm5pbmcgb2YgdGhlIGNhbm9weSwgd2hpY2ggbWFkZSB0aGlzIGZvcmVzdC4uLidcIixcblxuICAgIF0sXG4gICAgc3RhY2s6IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBzZWVkbGluZ3NcIiwgdmFsdWU6IFwidHJlZXNfYXNrU2VlZGxpbmdzU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBsb25nIHllYXJzXCIsIHZhbHVlOiBcInRyZWVzX2Fza0xvbmdZZWFyc1NjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkFzayBhYm91dCB0aGUgY2Fub3B5XCIsIHZhbHVlOiBcInRyZWVzX2Fza0Nhbm9weVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkFzayBzb21ldGhpbmcgZWxzZVwiLCB2YWx1ZTogbnVsbCB9LFxuICAgIF1cbn07XG5cbmNvbnN0IHRyZWVzX2Fza1NlZWRsaW5nc1NjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tTZWVkbGluZ3NTY2VuZScsXG4gICAgZXBoZW1lcmFsOiB0cnVlLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJy4uLidcIixcbiAgICAgICAgXCIndGhlIHNlZWRsaW5ncyB3ZXJlIGJlZm9yZSB1cywgYW5kIHRoZXkgYXJlIGFmdGVyIHVzLi4uJ1wiLFxuICAgICAgICBcIicuLi4nXCJcbiAgICBdXG59O1xuXG5jb25zdCB0cmVlc19hc2tMb25nWWVhcnNTY2VuZSA9IHtcbiAgICBuYW1lOiAndHJlZXNfYXNrTG9uZ1llYXJzU2NlbmUnLFxuICAgIGVwaGVtZXJhbDogdHJ1ZSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIicuLi4nXCIsXG4gICAgICAgIFwiJ3RoZSBsb25nIHllYXJzIHdlcmUgb2Ygd2VhcmluZXNzIGFuZCB3b2UuLi4nXCIsXG4gICAgICAgIFwiJy4uLidcIlxuICAgIF1cbn07XG5cbmNvbnN0IHRyZWVzX2Fza0Nhbm9weVNjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tDYW5vcHlTY2VuZScsXG4gICAgZXBoZW1lcmFsOiB0cnVlLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJy4uLidcIixcbiAgICAgICAgXCIndGhlIGNhbm9weSBhZmxhbWUsIGFsaXQsIGxpa2UgdG9yY2hlcyBibGF6aW5nIGluIG5pZ2h0Li4uJ1wiLFxuICAgICAgICBcIicuLi4nXCJcbiAgICBdXG59O1xuXG5jb25zdCB0cmVlc19hc2tNYWdpY1NjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tNYWdpY1NjZW5lJyxcbiAgICBlcGhlbWVyYWw6IHRydWUsXG4gICAgc3RhY2s6IHRydWUsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCInLi4uJ1wiLFxuICAgICAgICBcIid0cnVlIG1hZ2ljIGNhbiBuZXZlciBiZSB1c2VkIGZvciBldmlsLi4uJ1wiLFxuICAgICAgICBcIicuLi4nXCJcbiAgICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0cmVlc190YWxrRW50ZXJTY2VuZSxcblxuICAgIHRyZWVzX2Fza0hpc3RvcnlTY2VuZSxcbiAgICB0cmVlc19hc2tTZWVkbGluZ3NTY2VuZSxcbiAgICB0cmVlc19hc2tMb25nWWVhcnNTY2VuZSxcbiAgICB0cmVlc19hc2tDYW5vcHlTY2VuZSxcblxuICAgIHRyZWVzX2Fza01hZ2ljU2NlbmVcbn07IiwiY29uc3QgeyBjb25zb2xlbG9nIH0gPSByZXF1aXJlKCcuL2lvLmpzJyk7XG5cbi8vIFRPRE86IG1ha2UgdGhpcyB3b3JrIGluIGJyb3dzZXJcbmNvbnN0IHN0b3J5VGVsbCA9IChsaW5lKSA9PiB7XG4gICAgY29uc29sZWxvZyhsaW5lLCBcImdyZWVuXCIpO1xuICAgIC8vIFRPRE86IHVzZSBtYXJrb3YgdGV4dCAob3IgZ2VuZXJhdGl2ZSBBST8pIHRvIHdyaXRlIG1vcmUgdGV4dCBpbiBwdXJwbGVcbn07XG5cbmNvbnN0IHN0b3J5VGVsbE1ldGEgPSAobGluZSwgY29sb3IpID0+IHtcbiAgICBjb25zb2xlbG9nKGxpbmUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RvcnlUZWxsLFxuICAgIHN0b3J5VGVsbE1ldGFcbn07IiwiY29uc3Qgc2xlZXAgPSAobXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzLCBtcyk7XG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2xlZXBcbn07Il19
