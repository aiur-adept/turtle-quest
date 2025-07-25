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
},{}]},{},[10]);
