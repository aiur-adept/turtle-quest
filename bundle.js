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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJibGFja2JvYXJkLmpzIiwiZGVzY3JpYmVJdGVtLmpzIiwiZGVzY3JpYmVTY2VuZS5qcyIsImRyZWFtL2JlYXIuanMiLCJkcmVhbS9jcm93LmpzIiwiZHJlYW0vZmlzaC5qcyIsImRyZWFtL2luZGV4LmpzIiwiZmlsdGVycy9jaG9pY2UuanMiLCJnYW1lRGF0YS5qcyIsImluZGV4LmpzIiwiaW50ZXJhY3QuanMiLCJpby5qcyIsIml0ZW1EZXNjcmlwdGlvbnMuanMiLCJzY2VuZXMvYXdha2VuLmpzIiwic2NlbmVzL2RyZWFtLmpzIiwic2NlbmVzL2luZGV4LmpzIiwic2NlbmVzL21hZ2ljLmpzIiwic2NlbmVzL21lbnUuanMiLCJzY2VuZXMvcnVpbnMuanMiLCJzY2VuZXMvdHJlZXMuanMiLCJzdG9yeVRlbGxlci5qcyIsInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGJsYWNrYm9hcmQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmxhY2tib2FyZFxufTsiLCJjb25zdCB7IGl0ZW1EZXNjcmlwdGlvbnMgfSA9IHJlcXVpcmUoJy4vaXRlbURlc2NyaXB0aW9ucy5qcycpO1xuY29uc3QgeyBzdG9yeVRlbGwgfSA9IHJlcXVpcmUoJy4vc3RvcnlUZWxsZXIuanMnKTtcblxuY29uc3QgZGVzY3JpYmVJdGVtID0gKGl0ZW1OYW1lKSA9PiB7XG4gICAgc3RvcnlUZWxsKGl0ZW1EZXNjcmlwdGlvbnNbaXRlbU5hbWVdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaWJlSXRlbVxufTtcbiIsImNvbnN0IHsgc3RvcnlUZWxsIH0gPSByZXF1aXJlKCcuL3N0b3J5VGVsbGVyLmpzJyk7XG5jb25zdCB7IHNsZWVwIH0gPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG5cbmNvbnN0IGRlc2NyaWJlU2NlbmUgPSBhc3luYyAoc2NlbmUsIHN0YXRlKSA9PiB7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gc2NlbmUuZGVzY3JpcHRpb247XG4gICAgLy8gaWYgYSBmdW5jdGlvbiwgY2FsbCBpdCAoaXQgc2hvdWxkIHJldHVybiBlaXRoZXIgYW4gYXJyYXkgb3Igb25lIGxpbmUpXG4gICAgaWYgKGRlc2NyaXB0aW9uLmFwcGx5ICYmIGRlc2NyaXB0aW9uLmNhbGwpIHtcbiAgICAgICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbihzY2VuZSwgc3RhdGUpO1xuICAgIH1cbiAgICAvLyBpZiBpdCdzIGFuIGFycmF5LCBwcmludCBlYWNoIGxpbmVcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZXNjcmlwdGlvbikpIHtcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBzdG9yeVRlbGwobGluZSk7XG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3IsIHByaW50IGl0IHNpbXBseSAob25lIGxpbmUpXG4gICAgICAgIHN0b3J5VGVsbChkZXNjcmlwdGlvbik7XG4gICAgfVxuICAgIGF3YWl0IHNsZWVwKDIwMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmliZVNjZW5lXG59OyIsImNvbnN0IGJlYXJEcmVhbSA9IHtcblxuICAgIHBlcnNwZWN0aXZlOiBcIkkgYW1ibGVkIHRocm91Z2ggdGhlIGVuY2hhbnRlZCBmb3Jlc3QsIG15IGZ1ciBicnVzaGluZyBhZ2FpbnN0IHRoZSB2aWJyYW50IGZvbGlhZ2UgYXMgSSBleHBsb3JlZCB0aGUgbWFnaWNhbCByZWFsbS5cIixcblxuICAgIHNpZ2h0czogW1xuICAgICAgICBcIlRvd2VyaW5nbHkgYW5jaWVudCB0cmVlcyBzdXJyb3VuZGVkIG1lLCB0aGVpciBicmFuY2hlcyBhZG9ybmVkIHdpdGggZ2xvd2luZyBibG9zc29tcyB0aGF0IGlsbHVtaW5hdGVkIHRoZSBzaGFkb3d5IGdyb3Zlcy5cIixcbiAgICAgICAgXCJBIGdlbnRsZSBicmVlemUgY2FycmllZCB0aGUgd2hpc3BlcnMgb2YgdGhlIGZvcmVzdCwgcmV2ZWFsaW5nIHRoZSBzZWNyZXRzIGhpZGRlbiB3aXRoaW4gdGhlIHJ1c3RsaW5nIGxlYXZlcy5cIixcbiAgICAgICAgXCJCZXNpZGUgYSB0cmFucXVpbCBzdHJlYW0sIEkgZGlzY292ZXJlZCBzaGltbWVyaW5nIHBvb2xzIHJlZmxlY3RpbmcgdGhlIG1vb24gYW5kIHN0YXJzLCBjcmVhdGluZyBhIGNhcHRpdmF0aW5nIGNlbGVzdGlhbCBkaXNwbGF5LlwiLFxuICAgICAgICBcIk15IGpvdXJuZXkgbGVkIG1lIHRvIG15c3RpY2FsIHBvcnRhbHMsIHRoZWlyIHN1cmZhY2VzIHNoaW1tZXJpbmcgd2l0aCBhbiBvdGhlcndvcmxkbHkgbGlnaHQsIHRlbXB0aW5nIG1lIHRvIHBlZXIgaW50byB0aGUgZHJlYW13b3JsZCBiZXlvbmQuXCIsXG4gICAgICAgIFwiVGhyb3VnaCBwb3J0YWxzLCBJIHdpdG5lc3NlZCBzdXJyZWFsIGxhbmRzY2FwZXMg4oCTIGZsb2F0aW5nIGlzbGFuZHMgYWRvcm5lZCB3aXRoIGJpb2x1bWluZXNjZW50IGZsb3JhIGFuZCB3YXRlcmZhbGxzIGNhc2NhZGluZyB3aXRoIGxpcXVpZCBzdGFyZHVzdC5cIixcbiAgICBdLFxuXG4gICAgaW50ZXJhY3Rpb25zOiBbXG4gICAgICAgIFwiSSBhcHByb2FjaGVkIGEgcG9ydGFsLCBmZWVsaW5nIGEgdGluZ2xpbmcgc2Vuc2F0aW9uIGFzIEkgdG91Y2hlZCBpdCwgYnJpZWZseSBjb25uZWN0aW5nIHdpdGggdGhlIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIkluIHRoZSBkcmVhbXdvcmxkLCBJIGVuY291bnRlcmVkIGZhbnRhc3RpY2FsIGJlaW5ncyDigJMgbHVtaW5lc2NlbnQgZmlyZWZsaWVzIHRoYXQgZGFuY2VkIGluIGludHJpY2F0ZSBwYXR0ZXJucyBhbmQgd2lzZSBvd2xzIHRoYXQgc2hhcmVkIGFuY2llbnQgd2lzZG9tLlwiLFxuICAgICAgICBcIldpdGggZWFjaCBpbnRlcmFjdGlvbiwgdGhlIGJvdW5kYXJpZXMgYmV0d2VlbiByZWFsaXR5IGFuZCBkcmVhbXMgYmx1cnJlZCwgY3JlYXRpbmcgYSB0YXBlc3RyeSBvZiBlbmNoYW50bWVudCBhbmQgd29uZGVyLlwiLFxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJlYXJEcmVhbVxufTsiLCJjb25zdCBjcm93RHJlYW0gPSB7XG5cbiAgICBwZXJzcGVjdGl2ZTogXCJJIHNvYXJlZCB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgZm9yZXN0LCBteSBlYm9ueSBmZWF0aGVycyBjYXRjaGluZyB0aGUgbW9vbmxpZ2h0IGFzIEkgbmF2aWdhdGVkIHRoZSB0d2lzdGVkIGJyYW5jaGVzIGFuZCBldGhlcmVhbCBnbG93cy5cIixcblxuICAgIHNpZ2h0czogW1xuICAgICAgICBcIkJlbmVhdGggbWUsIGFuY2llbnQgdHJlZXMgc3Rvb2QgdGFsbCwgdGhlaXIgZ25hcmxlZCByb290cyBlbnR3aW5lZCB3aXRoIGx1bWluZXNjZW50IG1vc3MgdGhhdCBwdWxzZWQgd2l0aCBhIG15c3RpY2FsIGVuZXJneS5cIixcbiAgICAgICAgXCJBIGdlbnRsZSBicmVlemUgY2FycmllZCB0aGUgd2hpc3BlcnMgb2YgdGhlIGZvcmVzdCwgcmV2ZWFsaW5nIHRoZSBzZWNyZXRzIGhpZGRlbiB3aXRoaW4gdGhlIHJ1c3RsaW5nIGxlYXZlcy5cIixcbiAgICAgICAgXCJBcyBJIGdsaWRlZCBvdmVyIGEgY3J5c3RhbC1jbGVhciBwb25kLCB0aGUgd2F0ZXIgcmVmbGVjdGVkIHRoZSBzdGFycnkgc2t5IGFib3ZlLCBjcmVhdGluZyBhIG1pcnJvci1saWtlIHN1cmZhY2UgdGhhdCBzZWVtZWQgdG8gaG9sZCB0aGUgY29uc3RlbGxhdGlvbnMgd2l0aGluIGl0cyBkZXB0aHMuXCIsXG4gICAgICAgIFwiT2NjYXNpb25hbGx5LCBJIGVuY291bnRlcmVkIHNoaW1tZXJpbmcgcG9ydGFscyB0aGF0IGZsaWNrZXJlZCBhdCB0aGUgZWRnZSBvZiByZWFsaXR5LCBiZWNrb25pbmcgd2l0aCBwcm9taXNlcyBvZiBhIGRyZWFtd29ybGQgYmV5b25kLlwiLFxuICAgICAgICBcIlRocm91Z2ggcG9ydGFscywgSSBnbGltcHNlZCBzdXJyZWFsIGxhbmRzY2FwZXMg4oCTIGZsb2F0aW5nIGlzbGFuZHMgYWRvcm5lZCB3aXRoIGZsb2F0aW5nIGZsb3dlcnMsIGFuZCBjYXNjYWRpbmcgd2F0ZXJmYWxscyB0aGF0IHNwYXJrbGVkIHdpdGggbGlxdWlkIHN0YXJkdXN0LlwiLFxuICAgIF0sXG5cbiAgICBpbnRlcmFjdGlvbnM6IFtcbiAgICAgICAgXCJJIGRpcHBlZCBkb3duIHRvIHRvdWNoIHRoZSBzdXJmYWNlIG9mIGEgcG9ydGFsLCBmZWVsaW5nIGEgdGluZ2xpbmcgc2Vuc2F0aW9uIGFzIEkgYnJpZWZseSBjb25uZWN0ZWQgd2l0aCB0aGUgZHJlYW13b3JsZCBiZXlvbmQuXCIsXG4gICAgICAgIFwiSW4gdGhlIGRyZWFtd29ybGQsIEkgZW5jb3VudGVyZWQgZmFudGFzdGljYWwgY3JlYXR1cmVzIOKAkyBzaGltbWVyaW5nIGJ1dHRlcmZsaWVzIHRoYXQgbGVmdCB0cmFpbHMgb2YgaXJpZGVzY2VuY2UgaW4gdGhlaXIgd2FrZSBhbmQgdGFsa2luZyB0cmVlcyB0aGF0IHNoYXJlZCBhbmNpZW50IHRhbGVzLlwiLFxuICAgICAgICBcIldpdGggZWFjaCBpbnRlcmFjdGlvbiwgdGhlIGJvdW5kYXJ5IGJldHdlZW4gcmVhbGl0eSBhbmQgZHJlYW1zIGJsdXJyZWQsIGNyZWF0aW5nIGEga2FsZWlkb3Njb3BpYyB0YXBlc3RyeSBvZiB3b25kZXIgYW5kIGVuY2hhbnRtZW50LlwiLFxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyb3dEcmVhbVxufTsiLCJjb25zdCBmaXNoRHJlYW0gPSB7XG5cbiAgICBwZXJzcGVjdGl2ZTogXCJJIGdsaWRlZCB0aHJvdWdoIHRoZSBlbmNoYW50ZWQgcml2ZXIsIHNjYWxlcyBzaGltbWVyaW5nIGluIHRoZSBtb29ubGl0IHdhdGVycyBhcyBJIGV4cGxvcmVkIHRoZSBoaWRkZW4gZGVwdGhzIG9mIHRoZSBteXN0aWNhbCBmb3Jlc3QuXCIsXG5cbiAgICBzaWdodHM6IFtcbiAgICAgICAgXCJTdW5saWdodCBmaWx0ZXJlZCB0aHJvdWdoIHRoZSB3YXRlciwgY2FzdGluZyBhIG1lc21lcml6aW5nIGRhbmNlIG9mIHNoYWRvd3Mgb24gdGhlIHJpdmVyYmVkLCByZXZlYWxpbmcgYW5jaWVudCBzdG9uZXMgYWRvcm5lZCB3aXRoIG15c3RlcmlvdXMgcnVuZXMuXCIsXG4gICAgICAgIFwiQXF1YXRpYyBwbGFudHMgc3dheWVkIGdlbnRseSBpbiB0aGUgY3VycmVudCwgdGhlaXIgdmlicmFudCBjb2xvcnMgY3JlYXRpbmcgYSBrYWxlaWRvc2NvcGUgb2YgaHVlcyB0aGF0IG1pcnJvcmVkIHRoZSBlbmNoYW50bWVudCBvZiB0aGUgZm9yZXN0IGFib3ZlLlwiLFxuICAgICAgICBcIkkgbmF2aWdhdGVkIHRocm91Z2ggYSBzdWJtZXJnZWQgYXJjaHdheSwgaXRzIGVudHJhbmNlIGd1YXJkZWQgYnkgZXRoZXJlYWwgZmlzaCB0aGF0IGdsb3dlZCB3aXRoIGFuIG90aGVyd29ybGRseSBsaWdodCwgZ3VpZGluZyBtZSB0byBzZWNyZXQgYXF1YXRpYyByZWFsbXMuXCIsXG4gICAgICAgIFwiUmF5cyBvZiBtb29ubGlnaHQgcGVuZXRyYXRlZCB0aGUgc3VyZmFjZSwgY3JlYXRpbmcgYSBjZWxlc3RpYWwgcGF0dGVybiB0aGF0IGRhbmNlZCB1cG9uIHRoZSByaXZlcidzIGZsb29yLCBhcyBpZiB0aGUgc3RhcnMgdGhlbXNlbHZlcyB3ZXJlIHN1Ym1lcmdlZCBpbiB0aGUgdW5kZXJ3YXRlciB3b3JsZC5cIixcbiAgICAgICAgXCJBdCB0aGUgaGVhcnQgb2YgdGhlIHJpdmVyLCBJIGRpc2NvdmVyZWQgYSBteXN0aWNhbCB3aGlybHBvb2wsIGEgZ2F0ZXdheSB0byBhIGRyZWFtd29ybGQgd2hlcmUgdGhlIGN1cnJlbnRzIHdoaXNwZXJlZCB0YWxlcyBvZiBhbmNpZW50IGFxdWF0aWMgY2l2aWxpemF0aW9ucy5cIixcbiAgICBdLFxuXG4gICAgaW50ZXJhY3Rpb25zOiBbXG4gICAgICAgIFwiSSBzd2FtIGludG8gYSByYWRpYW50IHBvb2wsIGZlZWxpbmcgYSBzdXJnZSBvZiBlbmVyZ3kgYXMgSSBjb21tdW5lZCB3aXRoIHRoZSByaXZlcidzIHNwaXJpdCwgZ2xpbXBzaW5nIHZpc2lvbnMgb2YgdGhlIGZvcmVzdCdzIGhpc3RvcnkgdGhyb3VnaCB0aGUgZWJiIGFuZCBmbG93IG9mIHdhdGVyLlwiLFxuICAgICAgICBcIkluIHRoZSBkcmVhbXdvcmxkIGJlbmVhdGggdGhlIHN1cmZhY2UsIEkgZW5jb3VudGVyZWQgZXRoZXJlYWwgcml2ZXIgc3Bpcml0cyDigJMgZ3JhY2VmdWwgd2F0ZXIgbnltcGhzIHdobyB3ZWF2ZWQgdGFsZXMgb2YgZm9yZ290dGVuIHVuZGVyd2F0ZXIga2luZ2RvbXMgYW5kIG9mZmVyZWQgZ2xpbXBzZXMgaW50byB0aGUgZnV0dXJlLlwiLFxuICAgICAgICBcIkFzIEkgYXBwcm9hY2hlZCB0aGUgbXlzdGljYWwgd2hpcmxwb29sLCBJIGZlbHQgYSBwdWxsIHRvd2FyZHMgdGhlIGRyZWFtd29ybGQsIHdoZXJlIHNjaG9vbHMgb2YgcGhvc3Bob3Jlc2NlbnQgZmlzaCBzd2lybGVkIGluIGludHJpY2F0ZSBwYXR0ZXJucywgc3ltYm9saXppbmcgdGhlIGludGVyY29ubmVjdGVkbmVzcyBvZiB0aGUgcml2ZXIgYW5kIHRoZSBmb3Jlc3QgYWJvdmUuXCIsXG4gICAgXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZmlzaERyZWFtXG59OyIsImNvbnN0IHsgY3Jvd0RyZWFtIH0gPSByZXF1aXJlKCcuL2Nyb3cuanMnKTtcbmNvbnN0IHsgYmVhckRyZWFtIH0gPSByZXF1aXJlKCcuL2JlYXIuanMnKTtcbmNvbnN0IHsgZmlzaERyZWFtIH0gPSByZXF1aXJlKCcuL2Zpc2guanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3Jvd0RyZWFtLFxuICAgIGJlYXJEcmVhbSxcbiAgICBmaXNoRHJlYW1cbn07XG4iLCJjb25zdCBjaG9pY2VGaWx0ZXIgPSAoY2hvaWNlcywgc3RhdGUpID0+IHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgY2hvaWNlIGZpbHRlcmluZyBieSB1c2luZyBzdGF0ZVxuICAgIHJldHVybiBjaG9pY2VzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2hvaWNlRmlsdGVyXG59OyIsImNvbnN0IGdhbWVEYXRhID0ge1xuICAgIGF3YWtlblN0YXRlOiB7XG4gICAgICAgIG5hbWU6ICdudWxsJyxcbiAgICAgICAgbWluZDogJ2NhbG0nLFxuICAgICAgICBpbnZlbnRvcnk6IHtcbiAgICAgICAgICAgICdoZWFydFN1dHJhJzogMSxcbiAgICAgICAgfSxcbiAgICAgICAgaGVhbHRoOiAyMCxcbiAgICAgICAgYXVyYXM6IG5ldyBTZXQoKSxcbiAgICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2FtZURhdGFcbn07IiwiY29uc3QgeyBjb25zb2xlbG9nLCBsb2dDaG9pY2UgfSA9IHJlcXVpcmUoJy4vaW8uanMnKTtcbmNvbnN0IHsgZGVzY3JpYmVTY2VuZSB9ID0gcmVxdWlyZSgnLi9kZXNjcmliZVNjZW5lLmpzJyk7XG5jb25zdCB7IGRlc2NyaWJlSXRlbSB9ID0gcmVxdWlyZSgnLi9kZXNjcmliZUl0ZW0uanMnKTtcbmNvbnN0IHsgaW50ZXJhY3QgfSA9IHJlcXVpcmUoJy4vaW50ZXJhY3QuanMnKTtcbmNvbnN0IHsgc2xlZXAgfSA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcbmNvbnN0IHsgZ2FtZURhdGEgfSA9IHJlcXVpcmUoJy4vZ2FtZURhdGEuanMnKTtcbmNvbnN0IHNjZW5lcyA9IHJlcXVpcmUoJy4vc2NlbmVzL2luZGV4LmpzJyk7XG5jb25zdCB7IHN0b3J5VGVsbE1ldGEgfSA9IHJlcXVpcmUoJy4vc3RvcnlUZWxsZXIuanMnKTtcblxuXG5cbmNvbnN0IGF3YWtlbiA9ICgpID0+IChcbiAgICBbXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHNjZW5lcy5hd2FrZW5fZW50ZXJTY2VuZSksXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIGdhbWVEYXRhLmF3YWtlblN0YXRlKVxuICAgIF1cbik7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICAvLyBiZWdpbiB0aGUgc2NlbmUgYW5kIHRoZSBzdGF0ZVxuICAgIGNvbnN0IFtmaXJzdFNjZW5lLCBzdGF0ZV0gPSBhd2FrZW4oKTtcbiAgICBsZXQgc2NlbmVTdGFjayA9IFtmaXJzdFNjZW5lXTtcblxuICAgIC8vIGdhbWUgbG9vcFxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIC8vIFRPRE86IHJ1biBnbG9iYWwgbG9naWNzIGVhY2ggbG9vcCwgbGlrZSBhIHJhbmRvbSBlbmNvdW50ZXIgY2hhbmNlLCBvciB2YW5pc2ggc3RhdGUuZXh0cmFTZW5zZSBhZnRlciAzIHNjZW5lcywgZXRjLlxuXG5cbiAgICAgICAgLy8gY29uc2lkZXIgdGhlIGN1cnJlbnQgc2NlbmVcbiAgICAgICAgLy8gKGJ1dCBmaXJzdCwgZ3VhcmQgYWdhaW5zdCB6ZXJvLXN0YWNrKVxuICAgICAgICBpZiAoc2NlbmVTdGFjay5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgc2NlbmVTdGFjay5wdXNoKGF3YWtlbigpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY2VuZSA9IHNjZW5lU3RhY2tbc2NlbmVTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc29sZS5sb2coc2NlbmUpO1xuXG5cbiAgICAgICAgLy8gYXdha2VuIGZyb20gYW55IGRyZWFtIHNjZW5lIGlmIHN0YXRlLmRyZWFtaW5nID09IDBcbiAgICAgICAgaWYgKHNjZW5lLmlzRHJlYW0gJiYgc3RhdGUuZHJlYW1pbmcgPT0gMCkge1xuICAgICAgICAgICAgc2NlbmVTdGFjayA9IFtzY2VuZXMuYXdha2VuX2VudGVyU2NlbmVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZGlzcGxheSB0aGUgc2NlbmVcbiAgICAgICAgLy9cbiAgICAgICAgYXdhaXQgZGVzY3JpYmVTY2VuZShzY2VuZSwgc3RhdGUpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGludGVyYWN0IHdpdGggdGhlIHNjZW5lIChhbmQgZ2V0IHRoZSBuZXh0IHNjZW5lKVxuICAgICAgICAvL1xuICAgICAgICAvLyB0aGUgQ0xJIGludGVyYWN0cyB3aXRoIHRoZSB1c2VyLCBhbmQgdGhlXG4gICAgICAgIC8vIHVzZXIncyBpbnB1dCBpbnRlcmFjdHMgd2l0aCB0aGUgc2NlbmVcbiAgICAgICAgLy8gd2UgdWx0aW1hdGVseSB3YW50IHRvIGtub3cgd2hhdCBzY2VuZSBpcyBuZXh0XG4gICAgICAgIC8vIGdpdmVuIGl0cyBuYW1lIGFzIGEga2V5IChldmVyeSBtb21lbnQsIHdlIHVubG9ja1xuICAgICAgICAvLyBhIG1hZ2ljIGRvb3IhIDwzKVxuICAgICAgICBsZXQgc2NlbmVLZXkgPSBudWxsO1xuICAgICAgICAvLyBlcGhlbWVyYWwgc2NlbmVzIGhhdmUgbm8gYWN0aW9uLCB0aGV5IGp1c3QgZGlzcGxheSB0aGVpciBkZXNjcmlwdGlvbiBhbmQgcG9wIG9mZlxuICAgICAgICBpZiAoc2NlbmUuZXBoZW1lcmFsKSB7XG4gICAgICAgICAgICBzY2VuZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hvaWNlID0gYXdhaXQgaW50ZXJhY3Qoc2NlbmUsIHN0YXRlKTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2hvaWNlLnZhbHVlO1xuICAgICAgICBsb2dDaG9pY2UoY2hvaWNlKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKC8uK1NjZW5lLy50ZXN0KGFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHZhbHVlIG9mIHRoZSBjaG9pY2Ugd2FzIGEgc2NlbmUgbmFtZS4uLlxuICAgICAgICAgICAgICAgICAgICBzY2VuZUtleSA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9kZXNjcmliZUl0ZW1fLisvLnRlc3QoYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmFsdWUgb2YgdGhlIGNob2ljZSB3YXMgdG8gZGVzY3JpYmUgYW4gaXRlbS4uLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTmFtZSA9IGFjdGlvbi5tYXRjaCgvZGVzY3JpYmVJdGVtXyguKykvKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpYmVJdGVtKGl0ZW1OYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1bmtub3duIGFjdGlvbiAnICsgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgICAgICAvLyBzY2VuZSBoYXMgZW5kZWQsIHJ1biBvbkVuZCBob29rXG4gICAgICAgIGlmIChzY2VuZS5vbkVuZCkge1xuICAgICAgICAgICAgc2NlbmUub25FbmQoc2NlbmUsIHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzY2VuZVxuICAgICAgICAvL1xuICAgICAgICBpZiAoIXNjZW5lS2V5KSB7XG4gICAgICAgICAgICAvLyBpZiBnaXZlbiBubyBzY2VuZUtleSwgbm90aGluZyBpcyBuZXh0LCBzaW1wbHkgcG9wIHRoaXMgc2NlbmVcbiAgICAgICAgICAgIHNjZW5lU3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXNjZW5lc1tzY2VuZUtleV0pIHtcbiAgICAgICAgICAgIHN0b3J5VGVsbE1ldGEoJ1RoZSBtdXNlcyBoYXZlIG5vdCBzZWVuIHRoYXQgZmFyIGludG8gdGhlIHRhbGUgeWV0Li4uJywgJ3llbGxvdycpO1xuICAgICAgICAgICAgc3RvcnlUZWxsTWV0YSgnfn5+JywgJ2JsdWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTY2VuZSA9IE9iamVjdC5hc3NpZ24oe30sIHNjZW5lc1tzY2VuZUtleV0pO1xuICAgICAgICAgICAgaWYgKG5leHRTY2VuZS5zdGFjaykge1xuICAgICAgICAgICAgICAgIHNjZW5lU3RhY2sucHVzaChuZXh0U2NlbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY2VuZVN0YWNrW3NjZW5lU3RhY2subGVuZ3RoIC0gMV0gPSBuZXh0U2NlbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnNvbGUubG9nKCdUVVJUTEUgUVVFU1QgQ09OU09MRScpO1xubWFpbigpO1xuIiwiY29uc3QgeyBpbnF1aXJlIH0gPSByZXF1aXJlKCcuL2lvLmpzJyk7XG5jb25zdCB7IGNob2ljZUZpbHRlciB9ID0gcmVxdWlyZSgnLi9maWx0ZXJzL2Nob2ljZS5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBpbnRlcmFjdChzY2VuZSwgc3RhdGUpIHtcbiAgICAvL1xuICAgIC8vIGNvbnN0cnVjdCBjaG9pY2VzXG4gICAgLy9cbiAgICAvLyBjb3B5IGNob2ljZXMgd2l0aCBBcnJheS5mcm9tICh3ZSB3aWxsIG11dGF0ZSBpdClcbiAgICAvLyAobm90ZTogY2hvaWNlcyBjYW4gYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheSBvciBub3QgZXZlbiBwcmVzZW50KVxuICAgIGxldCBjaG9pY2VzID0gc2NlbmUuY2hvaWNlcyA/XG4gICAgICAgICgoc2NlbmUuY2hvaWNlcy5jYWxsICYmIHNjZW5lLmNob2ljZXMuYXBwbHkpID9cbiAgICAgICAgICAgIEFycmF5LmZyb20oc2NlbmUuY2hvaWNlcyhzY2VuZSwgc3RhdGUpKSA6XG4gICAgICAgICAgICBBcnJheS5mcm9tKHNjZW5lLmNob2ljZXMpKVxuICAgICAgICA6IFtdO1xuICAgIGlmICghc2NlbmUuZXhjbHVzaXZlQ2hvaWNlcykge1xuICAgICAgICAvLyBhZGQgbWFnaWMgY2hvaWNlIGlmIG5vdCBhbHJlYWR5IGluIG1hZ2ljU2NlbmVcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgIT09ICdtYWdpY1NjZW5lJyAmJiBzY2VuZS5uYW1lICE9PSAnbWVudVNjZW5lJykge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogXCJVc2UgbWFnaWNcIiwgdmFsdWU6IFwibWFnaWNTY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBkcmVhbSBvcHRpb24gaWYgc3RhdGUuZHJlYW1pbmcgPiAwXG4gICAgICAgIGlmIChzdGF0ZS5kcmVhbWluZyA+IDApIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IFwiRHJlYW1cIiwgdmFsdWU6IFwiZHJlYW1TY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBtZW51IGNob2ljZSBpZiBub3QgYWxyZWFkeSBpbiBtZW51U2NlbmVcbiAgICAgICAgaWYgKHNjZW5lLm5hbWUgIT09ICdtZW51U2NlbmUnKSB7XG4gICAgICAgICAgICBjaG9pY2VzLnB1c2goeyBuYW1lOiBcIk9wZW4gbWVudVwiLCB2YWx1ZTogXCJtZW51U2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhcHBseSBjaG9pY2VGaWx0ZXIgYmFzZWQgb24gc3RhdGVcbiAgICBjaG9pY2VzID0gY2hvaWNlRmlsdGVyKGNob2ljZXMsIHN0YXRlKTtcbiAgICAvLyBpZiBhcHBsaWNhYmxlLCBhcHBseSBzY2VuZSBjaG9pY2VGaWx0ZXJcbiAgICBpZiAoc2NlbmUuY2hvaWNlRmlsdGVyKSB7XG4gICAgICAgIGNob2ljZXMgPSBzY2VuZS5jaG9pY2VGaWx0ZXIoY2hvaWNlcyk7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBpbnRlcmFjdFxuICAgIC8vXG4gICAgLy8gdXNlIGlucXVpcmVyIHRvIGdldCBhY3R1YWwgaW50ZXJhY3Rpb25cbiAgICByZXR1cm4gaW5xdWlyZShjaG9pY2VzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW50ZXJhY3Rcbn07XG4iLCJjb25zdCBjb25zb2xlbG9nID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHAudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIHRlcm1pbmFsLmFwcGVuZENoaWxkKHApO1xuICAgIHRlcm1pbmFsLnNjcm9sbFRvcCA9IHRlcm1pbmFsLnNjcm9sbEhlaWdodDtcbn07XG5cbmNvbnN0IGxvZ0Nob2ljZSA9IChjaG9pY2UpID0+IHtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHAuY2xhc3NMaXN0LmFkZCgnY2hvaWNlJyk7XG4gICAgcC50ZXh0Q29udGVudCA9IGNob2ljZS5uYW1lO1xuICAgIHRlcm1pbmFsLmFwcGVuZENoaWxkKHApO1xuICAgIHRlcm1pbmFsLnNjcm9sbFRvcCA9IHRlcm1pbmFsLnNjcm9sbEhlaWdodDtcbn07XG5cbmNvbnN0IGlucXVpcmUgPSAoY2hvaWNlcykgPT4ge1xuICAgIGNvbnN0IGNob2ljZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hvaWNlcy1jb250YWluZXInKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgY2hvaWNlc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCBjaG9pY2Ugb2YgY2hvaWNlcykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjaG9pY2UudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjaG9pY2UpO1xuICAgICAgICAgICAgY29uc3QgY2hvaWNlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjaG9pY2VTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY2hvaWNlU3Bhbi50ZXh0Q29udGVudCA9IGNob2ljZS5uYW1lO1xuICAgICAgICAgICAgY2hvaWNlRGl2LmFwcGVuZENoaWxkKGNob2ljZVNwYW4pO1xuICAgICAgICAgICAgY2hvaWNlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY2hvaWNlKTtcbiAgICAgICAgICAgICAgICBjaG9pY2VzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaG9pY2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNob2ljZURpdik7XG4gICAgICAgIH07XG4gICAgfSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnNvbGVsb2csXG4gICAgbG9nQ2hvaWNlLFxuICAgIGlucXVpcmVcbn07IiwiY29uc3QgaXRlbURlc2NyaXB0aW9ucyA9IHtcbiAgICAnaGVhcnRTdXRyYSc6ICdhIHdlYXRoZXJlZCBjb3B5IG9mIHRoZSBoZWFydCBzdXRyYSwgZ2l2ZW4gdG8geW91IGJ5IGEgZnJpZW5kIGxvbmcgYWdvJyxcbiAgICAnZGlhbW9uZFN1dHJhJzogJ2EgY29weSBvZiB0aGUgZGlhbW9uZCBzdXRyYTsgd2hlcmUgZGlkIGl0IGNvbWUgZnJvbS4uLj8nXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpdGVtRGVzY3JpcHRpb25zXG59OyIsImNvbnN0IGF3YWtlbl9lbnRlclNjZW5lID0ge1xuICAgIG5hbWU6ICdhd2FrZW5fZW50ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBsb2NhdGlvbnMgPSBbJ2dsYWRlJywgJ2dyb3ZlJywgJ2NsZWFyaW5nJywgJ3ZhbGxleSddO1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGxvY2F0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsb2NhdGlvbnMubGVuZ3RoKV07XG5cbiAgICAgICAgY29uc3QgaW5zZWN0cyA9IFsnYnV0dGVyZmxpZXMnLCAnZmlyZWZsaWVzJywgJ21heWZsaWVzJ107XG4gICAgICAgIGNvbnN0IGluc2VjdCA9IGluc2VjdHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaW5zZWN0cy5sZW5ndGgpXTtcblxuICAgICAgICBjb25zdCBtc2cgPSBbXG4gICAgICAgICAgICBgWW91IGF3YWtlbiR7c3RhdGUuYXdha2VuZWQgPyAnIGFnYWluICcgOiAnICd9aW4gYSBteXN0ZXJpb3VzIGZvcmVzdC5gLFxuICAgICAgICAgICAgYFlvdSBhcmUgaW4gYSAke2xvY2F0aW9ufSB3aGVyZSAke2luc2VjdH0gZ2F0aGVyYCxcbiAgICAgICAgICAgIFwiVGhlIGFpciBpcyBlbmNoYW50ZWQgd2l0aCBtdWNoIG1lbW9yeS5cIixcbiAgICAgICAgICAgIFwiWW91IGhlYXIgZmFpbnRseSB0aGUgbGVhdmVzIGluIHRoZSBjYW5vcHkgZGFuY2luZy5cIixcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIG1zZztcbiAgICB9LFxuICAgIG9uRW5kOiAoc2VsZiwgc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBzdGF0ZS5hd2FrZW5lZCA9IHRydWU7XG4gICAgfSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJFeHBsb3JlXCIsIHZhbHVlOiBcImF3YWtlbl9leHBsb3JlU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiVGFsayB0byB0aGUgdHJlZXNcIiwgdmFsdWU6IFwidHJlZXNfdGFsa0VudGVyU2NlbmVcIiB9LFxuICAgIF1cbn07XG5cbmNvbnN0IGF3YWtlbl9leHBsb3JlU2NlbmUgPSB7XG4gICAgbmFtZTogJ2F3YWtlbl9leHBsb3JlU2NlbmUnLFxuXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBhZGplY3RpdmVzID0gWydteXN0ZXJpb3VzJywgJ2VuY2hhbnRlZCcsICdhbmNpZW50J107XG4gICAgICAgIGNvbnN0IGFkamVjdGl2ZSA9IGFkamVjdGl2ZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWRqZWN0aXZlcy5sZW5ndGgpXTtcblxuICAgICAgICBjb25zdCBtaW5kID0gc3RhdGUubWluZDtcblxuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgYFlvdSB3YWxrLCBleHBsb3JpbmcgdGhlICR7YWRqZWN0aXZlfSBmb3Jlc3QuYCxcbiAgICAgICAgICAgIGBZb3VyIG1pbmQgLSAke21pbmR9IC0gc2Vla3MgdGhlIHdheSB0aHJvdWdoIHRoZSBkcmVhbS5gLFxuICAgICAgICAgICAgXCJBcyB5b3Ugd2FsaywgeW91IHNlZSBhIHZpbmVncm93biBkb29yd2F5IHRvIGFuY2llbnQgcnVpbnMuXCJcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjMzKSB7XG4gICAgICAgICAgICBzdGF0ZS5leHRyYVNlbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIllvdSBhbHNvIHNlbnNlIGEgaGlkZGVuIHBhdGh3YXkuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBjaG9pY2VzOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJFbnRlciB0aGUgcnVpbnNcIiwgdmFsdWU6IFwicnVpbnNfZW50ZXJTY2VuZVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiVGFsayB0byB0aGUgdHJlZXNcIiwgdmFsdWU6IFwidHJlZXNfdGFsa0VudGVyU2NlbmVcIiB9LFxuICAgICAgICBdO1xuICAgICAgICBpZiAoc3RhdGUuZXh0cmFTZW5zZSkge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogXCJGb2xsb3cgdGhlIGhpZGRlbiBwYXRoXCIsIHZhbHVlOiBcInBhdGhfZW50ZXJTY2VuZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaG9pY2VzO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF3YWtlbl9lbnRlclNjZW5lLFxuICAgIGF3YWtlbl9leHBsb3JlU2NlbmVcbn07IiwiY29uc3QgeyBjcm93RHJlYW0sIGJlYXJEcmVhbSwgZmlzaERyZWFtIH0gPSByZXF1aXJlKCcuLi9kcmVhbS9pbmRleC5qcycpO1xuXG5jb25zdCBkcmVhbVNjZW5lID0ge1xuICAgIG5hbWU6ICdkcmVhbVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBjbG9zZSB5b3VyIGV5ZXMsIGxldHRpbmcgdGhlIHdvcmxkIGZhZGUgYXdheSBhcyB5b3UgZW50ZXIgYSBkcmVhbWxpa2Ugc3RhdGUuXCIsXG4gICAgICAgIFwiSW4gdGhpcyByZWFsbSBvZiBldGhlcmVhbCBwb3NzaWJpbGl0aWVzLCB5b3VyIHNwaXJpdCBmZWVscyBpdCBjYW4gZHJlYW0gYXMgYW4gYW5pbWFsLi4uXCJcbiAgICBdLFxuICAgIGlzRHJlYW06IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiRHJlYW0gYXMgYSBDcm93XCIsIHZhbHVlOiBcImNyb3dEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkRyZWFtIGFzIGEgQmVhclwiLCB2YWx1ZTogXCJiZWFyRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJEcmVhbSBhcyBhIEZpc2hcIiwgdmFsdWU6IFwiZmlzaERyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHdha2luZyBsaWZlXCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxuY29uc3QgY3Jvd0RyZWFtU2NlbmUgPSB7XG4gICAgbmFtZTogJ2Nyb3dEcmVhbVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVNpZ2h0ID0gY3Jvd0RyZWFtLnNpZ2h0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjcm93RHJlYW0uc2lnaHRzLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYFlvdSB0YWtlIG9uIHRoZSBwZXJzcGVjdGl2ZSBvZiBhIGNyb3csIHNvYXJpbmcgdGhyb3VnaCB0aGUgZW5jaGFudGVkIGZvcmVzdC5gLFxuICAgICAgICAgICAgcmFuZG9tU2lnaHQsXG4gICAgICAgICAgICBcIlRoZSBkcmVhbXdvcmxkIGJlY2tvbnMgd2l0aCBteXN0ZXJpZXMuXCIsXG4gICAgICAgICAgICBcIldoYXQgd2lsbCB5b3UgZG8/XCIsXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBpc0RyZWFtOiB0cnVlLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNvbnRpbnVlIERyZWFtaW5nIGFzIGEgQ3Jvd1wiLCB2YWx1ZTogXCJjcm93RHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJJbnRlcmFjdCB3aXRoIHRoZSBXb3JsZFwiLCB2YWx1ZTogXCJjcm93SW50ZXJhY3RTY2VuZVwiIH0sXG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuZHJlYW1pbmcgPSBNYXRoLm1heCgwLCBzdGF0ZS5kcmVhbWluZyAtIDEpO1xuICAgIH1cbn07XG5cbmNvbnN0IGJlYXJEcmVhbVNjZW5lID0ge1xuICAgIG5hbWU6ICdiZWFyRHJlYW1TY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21TaWdodCA9IGJlYXJEcmVhbS5zaWdodHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYmVhckRyZWFtLnNpZ2h0cy5sZW5ndGgpXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGBZb3UgZW1ib2R5IHRoZSBzcGlyaXQgb2YgYSBiZWFyLCBhbWJsaW5nIHRocm91Z2ggdGhlIGVuY2hhbnRlZCBmb3Jlc3QuYCxcbiAgICAgICAgICAgIHJhbmRvbVNpZ2h0LFxuICAgICAgICAgICAgXCJUaGUgZHJlYW13b3JsZCB1bmZvbGRzIGl0cyBzZWNyZXRzIGJlZm9yZSB5b3UuXCIsXG4gICAgICAgICAgICBcIldoYXQgd2lsbCB5b3UgZG8/XCIsXG4gICAgICAgIF07XG4gICAgfSxcbiAgICBpc0RyZWFtOiB0cnVlLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNvbnRpbnVlIERyZWFtaW5nIGFzIGEgQmVhclwiLCB2YWx1ZTogXCJiZWFyRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJJbnRlcmFjdCB3aXRoIHRoZSBXb3JsZFwiLCB2YWx1ZTogXCJiZWFySW50ZXJhY3RTY2VuZVwiIH0sXG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuZHJlYW1pbmcgPSBNYXRoLm1heCgwLCBzdGF0ZS5kcmVhbWluZyAtIDEpO1xuICAgIH1cbn07XG5cbmNvbnN0IGZpc2hEcmVhbVNjZW5lID0ge1xuICAgIG5hbWU6ICdmaXNoRHJlYW1TY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21TaWdodCA9IGZpc2hEcmVhbS5zaWdodHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlzaERyZWFtLnNpZ2h0cy5sZW5ndGgpXTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGBZb3UgYmVjb21lIG9uZSB3aXRoIGEgcml2ZXItZHdlbGxpbmcgZmlzaCwgZ2xpZGluZyB0aHJvdWdoIHRoZSBteXN0aWNhbCB3YXRlcnMuYCxcbiAgICAgICAgICAgIHJhbmRvbVNpZ2h0LFxuICAgICAgICAgICAgXCJUaGUgZHJlYW13b3JsZCBiZW5lYXRoIHRoZSBzdXJmYWNlIGhvbGRzIHVudG9sZCB3b25kZXJzLlwiLFxuICAgICAgICAgICAgXCJXaGF0IHdpbGwgeW91IGRvP1wiLFxuICAgICAgICBdO1xuICAgIH0sXG4gICAgaXNEcmVhbTogdHJ1ZSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJDb250aW51ZSBEcmVhbWluZyBhcyBhIEZpc2hcIiwgdmFsdWU6IFwiZmlzaERyZWFtU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiSW50ZXJhY3Qgd2l0aCB0aGUgV29ybGRcIiwgdmFsdWU6IFwiZmlzaEludGVyYWN0U2NlbmVcIiB9LFxuICAgIF0sXG4gICAgb25FbmQ6IChzZWxmLCBzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmRyZWFtaW5nID0gTWF0aC5tYXgoMCwgc3RhdGUuZHJlYW1pbmcgLSAxKTtcbiAgICB9XG59O1xuXG5jb25zdCBjcm93SW50ZXJhY3RTY2VuZSA9IHtcbiAgICBuYW1lOiAnY3Jvd0ludGVyYWN0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tSW50ZXJhY3Rpb24gPSBjcm93RHJlYW0uaW50ZXJhY3Rpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNyb3dEcmVhbS5pbnRlcmFjdGlvbnMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIllvdSBkZWNpZGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgZHJlYW13b3JsZCBhcyBhIGNyb3cuXCIsXG4gICAgICAgICAgICBgVGhlIGRyZWFtd29ybGQgcmVzcG9uZHMgd2l0aDogXCIke3JhbmRvbUludGVyYWN0aW9ufVwiYCxcbiAgICAgICAgICAgIFwiV2hhdCB3aWxsIHlvdSBkbyBuZXh0P1wiLFxuICAgICAgICBdO1xuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBDcm93XCIsIHZhbHVlOiBcImNyb3dEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgRm9yZXN0XCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxuY29uc3QgYmVhckludGVyYWN0U2NlbmUgPSB7XG4gICAgbmFtZTogJ2JlYXJJbnRlcmFjdFNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUludGVyYWN0aW9uID0gYmVhckRyZWFtLmludGVyYWN0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiZWFyRHJlYW0uaW50ZXJhY3Rpb25zLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCJZb3UgY2hvb3NlIHRvIGludGVyYWN0IHdpdGggdGhlIGRyZWFtd29ybGQgYXMgYSBiZWFyLlwiLFxuICAgICAgICAgICAgYFRoZSBkcmVhbXdvcmxkIHJlc3BvbmRzIHdpdGg6IFwiJHtyYW5kb21JbnRlcmFjdGlvbn1cImAsXG4gICAgICAgICAgICBcIldoYXQgd2lsbCB5b3UgZG8gbmV4dD9cIixcbiAgICAgICAgXTsgZnJvbVxuICAgIH0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiQ29udGludWUgRHJlYW1pbmcgYXMgYSBCZWFyXCIsIHZhbHVlOiBcImJlYXJEcmVhbVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgRm9yZXN0XCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxuY29uc3QgZmlzaEludGVyYWN0U2NlbmUgPSB7XG4gICAgbmFtZTogJ2Zpc2hJbnRlcmFjdFNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUludGVyYWN0aW9uID0gZmlzaERyZWFtLmludGVyYWN0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaXNoRHJlYW0uaW50ZXJhY3Rpb25zLmxlbmd0aCldO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCJZb3UgZGVjaWRlIHRvIGludGVyYWN0IHdpdGggdGhlIGRyZWFtd29ybGQgYXMgYSBmaXNoLlwiLFxuICAgICAgICAgICAgYFRoZSBkcmVhbXdvcmxkIHJlc3BvbmRzIHdpdGg6IFwiJHtyYW5kb21JbnRlcmFjdGlvbn1cImAsXG4gICAgICAgICAgICBcIldoYXQgd2lsbCB5b3UgZG8gbmV4dD9cIixcbiAgICAgICAgXTtcbiAgICB9LFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNvbnRpbnVlIERyZWFtaW5nIGFzIGEgRmlzaFwiLCB2YWx1ZTogXCJmaXNoRHJlYW1TY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8gdGhlIEZvcmVzdFwiLCB2YWx1ZTogbnVsbCB9LFxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRyZWFtU2NlbmUsXG4gICAgY3Jvd0RyZWFtU2NlbmUsXG4gICAgYmVhckRyZWFtU2NlbmUsXG4gICAgZmlzaERyZWFtU2NlbmUsXG4gICAgY3Jvd0ludGVyYWN0U2NlbmUsXG4gICAgYmVhckludGVyYWN0U2NlbmUsXG4gICAgZmlzaEludGVyYWN0U2NlbmUsXG59O1xuIiwiY29uc3Qge1xuICAgIGF3YWtlbl9lbnRlclNjZW5lLFxuICAgIGF3YWtlbl9leHBsb3JlU2NlbmVcbn0gPSByZXF1aXJlKCcuL2F3YWtlbi5qcycpO1xuXG5jb25zdCB7XG4gICAgZHJlYW1TY2VuZSxcbiAgICBjcm93RHJlYW1TY2VuZSxcbiAgICBiZWFyRHJlYW1TY2VuZSxcbiAgICBmaXNoRHJlYW1TY2VuZSxcbiAgICBjcm93SW50ZXJhY3RTY2VuZSxcbiAgICBiZWFySW50ZXJhY3RTY2VuZSxcbiAgICBmaXNoSW50ZXJhY3RTY2VuZVxufSA9IHJlcXVpcmUoJy4vZHJlYW0uanMnKTtcblxuY29uc3Qge1xuICAgIG1lbnVTY2VuZSxcbiAgICB2aWV3SW52ZW50b3J5U2NlbmUsXG4gICAgY2hlY2tTdGF0c1NjZW5lXG59ID0gcmVxdWlyZSgnLi9tZW51LmpzJyk7XG5cbmNvbnN0IHtcbiAgICBtYWdpY1NjZW5lXG59ID0gcmVxdWlyZSgnLi9tYWdpYy5qcycpO1xuXG5jb25zdCB7XG4gICAgcnVpbnNfZW50ZXJTY2VuZSxcbiAgICBydWluc19mb3llclNjZW5lLFxuXG4gICAgcnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZSxcbiAgICBydWluc19yZWFkQmx1ZUJvb2tTY2VuZSxcblxuICAgIHJ1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZSxcbiAgICBydWluc19yZWFkUmVkQm9va1NjZW5lLFxuXG4gICAgcnVpbnNfaGlkZGVuUGF0aF9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZVxufSA9IHJlcXVpcmUoJy4vcnVpbnMuanMnKTtcblxuY29uc3Qge1xuICAgIHRyZWVzX3RhbGtFbnRlclNjZW5lLFxuXG4gICAgdHJlZXNfYXNrSGlzdG9yeVNjZW5lLFxuICAgIHRyZWVzX2Fza1NlZWRsaW5nc1NjZW5lLFxuICAgIHRyZWVzX2Fza0xvbmdZZWFyc1NjZW5lLFxuICAgIHRyZWVzX2Fza0Nhbm9weVNjZW5lLFxuXG4gICAgdHJlZXNfYXNrTWFnaWNTY2VuZVxufSA9IHJlcXVpcmUoJy4vdHJlZXMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXdha2VuX2VudGVyU2NlbmUsXG4gICAgYXdha2VuX2V4cGxvcmVTY2VuZSxcblxuICAgIGRyZWFtU2NlbmUsXG4gICAgY3Jvd0RyZWFtU2NlbmUsXG4gICAgYmVhckRyZWFtU2NlbmUsXG4gICAgZmlzaERyZWFtU2NlbmUsXG4gICAgY3Jvd0ludGVyYWN0U2NlbmUsXG4gICAgYmVhckludGVyYWN0U2NlbmUsXG4gICAgZmlzaEludGVyYWN0U2NlbmUsXG5cbiAgICBtZW51U2NlbmUsXG4gICAgdmlld0ludmVudG9yeVNjZW5lLFxuICAgIGNoZWNrU3RhdHNTY2VuZSxcblxuICAgIG1hZ2ljU2NlbmUsXG5cbiAgICBydWluc19lbnRlclNjZW5lLFxuICAgIHJ1aW5zX2ZveWVyU2NlbmUsXG5cbiAgICBydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRCbHVlQm9va1NjZW5lLFxuXG4gICAgcnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRSZWRCb29rU2NlbmUsXG5cbiAgICBydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoR2F0ZXdheVNjZW5lLFxuXG4gICAgdHJlZXNfdGFsa0VudGVyU2NlbmUsXG5cbiAgICB0cmVlc19hc2tIaXN0b3J5U2NlbmUsXG4gICAgdHJlZXNfYXNrU2VlZGxpbmdzU2NlbmUsXG4gICAgdHJlZXNfYXNrTG9uZ1llYXJzU2NlbmUsXG4gICAgdHJlZXNfYXNrQ2Fub3B5U2NlbmUsXG5cbiAgICB0cmVlc19hc2tNYWdpY1NjZW5lXG59O1xuIiwiY29uc3QgeyBzdG9yeVRlbGwgfSA9IHJlcXVpcmUoJy4uL3N0b3J5VGVsbGVyLmpzJyk7XG5cbmNvbnN0IG1hZ2ljU2NlbmUgPSB7XG4gICAgbmFtZTogJ21hZ2ljU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGRlY2lkZSB0byBoYXJuZXNzIHRoZSBtYWdpYyB3aXRoaW4geW91LlwiLFxuICAgICAgICBcIkJyZWF0aGUgaW4gZGVlcGx5LCBhbmQgYnJlYXRoZSBvdXQgZW5qb3lpbmcgY2FsbS5cIixcbiAgICAgICAgXCJBIHdhdmUgb2YgZW5lcmd5IHdpbGwgZmxvdyB0aHJvdWdoIHlvdXIgYm9keS5cIixcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkNhc3QgYSBzcGVsbCBvZiBwcm90ZWN0aW9uXCIsIHZhbHVlOiBcImNhc3RQcm90ZWN0aW9uXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNhc3QgYSBzcGVsbCBvZiB0cmF2ZWxcIiwgdmFsdWU6IFwiY2FzdFRyYXZlbFwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDYXN0IGEgc3BlbGwgb2YgZHJlYW1pbmdcIiwgdmFsdWU6IFwiY2FzdERyZWFtXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgc3RhcnQgb2YgdGhlIHRhbGVcIiwgdmFsdWU6IFwicmV0dXJuU3RhcnRcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2FzdCBubyBtYWdpY1wiLCB2YWx1ZTogbnVsbCB9XG4gICAgXSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBpbnRlcmFjdDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgbGV0IG5leHQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnY2FzdFByb3RlY3Rpb24nOlxuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIllvdSBjYXN0IFByb3RlY3RpdmUgQ2lyY2xlO1wiKTtcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJBIHNoaW1tZXJpbmcgdmVpbCBvZiBhdXJhIHN1cnJvdW5kcyB5b3UgfioreG9cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYXN0VHJhdmVsJzpcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJBIGxpdHRsZSBmYWlyeSBhcHBlYXJzIGFuZCBzYXlzLCBcIlxuICAgICAgICAgICAgICAgICAgICArIFwiJ1RPRE86IGFzayBmb3IgYSB0cmF2ZWwga2V5IGhlcmUuLi4nXCIpO1xuICAgICAgICAgICAgICAgIG5leHQgPSAnYXdha2VuU2NlbmUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2FzdERyZWFtJzpcbiAgICAgICAgICAgICAgICBzdG9yeVRlbGwoXCJZb3UgaW1idWUgeW91ciBtaW5kYm9keSB3aXRoIGRyZWFtaW5nIHBvd2VycywgZW5vdWdoIGZvciBvbmUgZHJlYW0uLi5cIik7XG4gICAgICAgICAgICAgICAgc3RhdGUuZHJlYW1pbmcgPSA1O1xuICAgICAgICAgICAgICAgIG5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmV0dXJuU3RhcnQnOlxuICAgICAgICAgICAgICAgIHN0b3J5VGVsbChcIllvdSBjYXN0IEF3YWtlbjtcIik7XG4gICAgICAgICAgICAgICAgc3RvcnlUZWxsKFwiQSBtYWdpY2FsIHNob3dlciBjb3ZlcnMgYWxsLCBhbmQgeW91IHJldHVybi4uLlwiKTtcbiAgICAgICAgICAgICAgICBuZXh0ID0gJ2F3YWtlbl9lbnRlclNjZW5lJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzdG9yeVRlbGwoXCJ+fn5+fn5+fn5+fn5+fn5+fn4qfip+Kn5+fn5+fn5+fn5+fn5+fn5+flwiKVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWdpY1NjZW5lLFxufTsiLCJjb25zdCB7IGJsYWNrYm9hcmQgfSA9IHJlcXVpcmUoJy4uL2JsYWNrYm9hcmQuanMnKTtcblxuY29uc3QgbWVudVNjZW5lID0ge1xuICAgIG5hbWU6ICdtZW51U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBcIllvdSByZXZpZXcgeW91ciBvcHRpb25zLi4uXCIsXG4gICAgc3RhY2s6IHRydWUsXG4gICAgY2hvaWNlczogW1xuICAgICAgICAvLyBUT0RPIHsgbmFtZTogXCJIYXZlIGEgZHJlYW1cIiwgdmFsdWU6IFwiZHJlYW1cIiB9LFxuICAgICAgICB7IG5hbWU6IFwiVmlldyBpbnZlbnRvcnlcIiwgdmFsdWU6IFwidmlld0ludmVudG9yeVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNoZWNrIGNoYXJhY3RlciBzdGF0c1wiLCB2YWx1ZTogXCJjaGVja1N0YXRzU2NlbmVcIiB9LFxuICAgICAgICAvLyBUT0RPIHsgbmFtZTogXCJTYXZlIGdhbWVcIiwgdmFsdWU6IFwic2F2ZUdhbWVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2xvc2UgbWVudVwiLCB2YWx1ZTogbnVsbCB9XG4gICAgXSxcbn07XG5cbmNvbnN0IHZpZXdJbnZlbnRvcnlTY2VuZSA9IHtcbiAgICBuYW1lOiAndmlld0ludmVudG9yeVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXCJZb3Ugc2V0IGRvd24geW91ciBwYWNrIGFuZCBsb29rIHRocm91Z2ggaXQuXCJdO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gc3RhdGUuaW52ZW50b3J5KSB7XG4gICAgICAgICAgICBtc2dzLnB1c2goaXRlbSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGV4Y2x1c2l2ZUNob2ljZXM6IHRydWUsXG4gICAgY2hvaWNlczogKHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIHN0YXRlLmludmVudG9yeSkge1xuICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgbmFtZTogaXRlbSwgdmFsdWU6IGBkZXNjcmliZUl0ZW1fJHtpdGVtfWAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXM7XG4gICAgfSxcbn07XG5cbmNvbnN0IGNoZWNrU3RhdHNTY2VuZSA9IHtcbiAgICBuYW1lOiAnY2hlY2tTdGF0c1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogKHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1zZ3MgPSBbXG4gICAgICAgICAgICAnSGVhbHRoOicsXG4gICAgICAgICAgICBgICBvICR7c3RhdGUuaGVhbHRofWAsXG4gICAgICAgICAgICAnTWluZDonLFxuICAgICAgICAgICAgYCAgPSAke3N0YXRlLm1pbmR9YFxuICAgICAgICBdO1xuICAgICAgICBpZiAoc3RhdGUuYXVyYXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIkF1cmFzOlwiKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXVyYSBpbiBzdGF0ZS5hdXJhcykge1xuICAgICAgICAgICAgICAgIG1zZ3MucHVzaChgICArICR7YXVyYX1gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1zZ3M7XG4gICAgfSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBlcGhlbWVyYWw6IHRydWVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1lbnVTY2VuZSxcbiAgICB2aWV3SW52ZW50b3J5U2NlbmUsXG4gICAgY2hlY2tTdGF0c1NjZW5lXG59OyIsImNvbnN0IHJ1aW5zX2VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2VudGVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IHBhc3MgYmVuZWF0aCB0aGUgc3RvbmUgZ2F0ZXdheSwgYnJ1c2hlZCBieSBvdmVyZ3Jvd24gdmluZXMuXCIsXG4gICAgICAgIFwiVGhlIGFpciBpcyBjb29sIGFuZCBhIGZyZXNoIHdpbmQgZnJvbSBvdXRzaWRlIGJsb3dzIGlud2FyZC5cIixcbiAgICAgICAgXCJBcyB5b3Ugd2FsaywgdGhlIGxpZ2h0IGZhZGVzIHRvIGdyZXksIG5ldmVyIHF1aXRlIGdvaW5nIG91dC5cIixcbiAgICAgICAgXCJZb3UgY29tZSB0byBhIGJsdWUgZG9vcndheSBhbmQgYSBncmVlbiBkb29yd2F5XCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSBibHVlIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJFbnRlciB0aGUgcmVkIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJldHVybiB0byB0aGUgZm9yZXN0XCIsIHZhbHVlOiBcImF3YWtlbl9leHBsb3JlU2NlbmVcIiB9XG4gICAgXVxufTtcblxuY29uc3QgcnVpbnNfZm95ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfZm95ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBtc2dzID0gW1xuICAgICAgICAgICAgXCJZb3UgcmV0dXJuIHRvIHRoZSBlbnRyYW5jZSB0byB0aGUgcnVpbnMuIFNvZnQgbGlnaHQgcHJvdmlkZXNcIixcbiAgICAgICAgICAgIFwiVGhlIGJhcmVzdCBpbGx1bWluYXRpb24sIGFuZCB5b3UgY2FuIHNlZSB0aGUgd2FsbHMgYXJlIGNhcnZlZFwiLFxuICAgICAgICAgICAgXCJXaXRoIG1hbnkgc3RyYW5nZSBnbHlwaHMuIFlvdSBzZWUgYSBibHVlIGRvb3J3YXkgYW5kIGEgcmVkIGRvb3J3YXkuXCJcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjMzKSB7XG4gICAgICAgICAgICBzdGF0ZS5leHRyYVNlbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgIG1zZ3MucHVzaChcIkFuZCB5b3Ugc2Vuc2UgYSBoaWRkZW4gcGF0aHdheSBhcyB3ZWxsLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXNncztcbiAgICB9LFxuICAgIGNob2ljZXM6IChzZWxmLCBzdGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIkVudGVyIHRoZSBibHVlIGRvb3J3YXlcIiwgdmFsdWU6IFwicnVpbnNfYmx1ZURvb3J3YXlfRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRW50ZXIgdGhlIHJlZCBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRvIHRoZSBmb3Jlc3RcIiwgdmFsdWU6IFwiYXdha2VuX2V4cGxvcmVTY2VuZVwiIH1cbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHN0YXRlLmV4dHJhU2Vuc2UpIHtcbiAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IG5hbWU6IFwiRm9sbG93IHRoZSBoaWRkZW4gcGF0aFwiLCB2YWx1ZTogXCJydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmVcIiB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmNvbnN0IHJ1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2JsdWVEb29yd2F5X0VudGVyU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IHBhc3MgdGhyb3VnaCB0aGUgYmx1ZSBkb29yd2F5LCBhbmQgYXMgeW91IGRvLFwiLFxuICAgICAgICBcIlRoZSBzY2VudCBvZiBsYXZlbmRlciBhcmlzZXMgaW4geW91ciBtaW5kLiBUaGUgZG9vciBwbGF5cyBhXCIsXG4gICAgICAgIFwiTXVzaWNhbCB0aGVtZSBsaWtlIGEgZmx1dGUgZnJvbSBhbiBhbmNpZW50IHRpbWUuIFlvdSBmaW5kXCIsXG4gICAgICAgIFwiWW91cnNlbGYgaW4gYSBjaXJjdWxhciBjaGFtYmVyIHdpdGggc29mdCBpbGx1bWluYXRpb24gZnJvbVwiLFxuICAgICAgICBcIkEgc2t5bGlnaHQgZmFyIGFib3ZlIGluIHRoZSB2YXVsdGVkIGNlaWxpbmcuIEEgYm9vayBpcyBvblwiLFxuICAgICAgICBcIkEgc3RvbmUgdGFibGUgaW4gdGhlIGNlbnRlciBvZiB0aGUgcm9vbS5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiUmVhZCB0aGUgYm9va1wiLCB2YWx1ZTogXCJydWluc19yZWFkQmx1ZUJvb2tTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdGhyb3VnaCB0aGUgYmx1ZSBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX2ZveWVyU2NlbmVcIiB9XG4gICAgXVxufTtcblxuY29uc3QgcnVpbnNfcmVhZEJsdWVCb29rU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX3JlYWRCbHVlQm9va1NjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBhcHByb2FjaCB0aGUgYmx1ZSBib29rIGFuZCByZWFkIGZyb20gaXQsIG5vdGljaW5nXCIsXG4gICAgICAgIFwiSXQncyBhY3R1YWxseSBtYWRlIG9mIGJsdWUgamFkZSBhbmQgaGFzIG9ubHkgb25lIHBhZ2UgdmlzaWJsZS5cIixcbiAgICAgICAgXCJJdCByZWFkczpcIixcbiAgICAgICAgXCJNeXN0ZXJ5IGFuZCBtYW5pZmVzdGF0aW9ucyBhcmlzZSBmcm9tIHRoZSBzYW1lIHNvdXJjZS4uLlwiLFxuICAgICAgICBcIllvdSBmZWVsIHNlcmVuaXR5IGF0IHRoZXNlIHdvcmRzLlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdGhyb3VnaCB0aGUgYmx1ZSBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX2ZveWVyU2NlbmVcIiB9XG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuYXVyYXMuYWRkKCdzZXJlbml0eScpO1xuICAgIH1cbn07XG5cbmNvbnN0IHJ1aW5zX3JlZERvb3J3YXlfRW50ZXJTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBwYXNzIHRocm91Z2ggdGhlIHJlZCBkb29yd2F5LCBhbmQgYXMgeW91IGRvLFwiLFxuICAgICAgICBcIlRoZSBzY2VudCBvZiBtaW50IGFyaXNlcyBpbiB5b3VyIG1pbmQuIFRoZSBkb29yIHBsYXlzIGFcIixcbiAgICAgICAgXCJNdXNpY2FsIHRoZW1lIGxpa2UgYSBoYXJwIGZyb20gYW4gYW5jaWVudCB0aW1lLiBZb3UgZmluZFwiLFxuICAgICAgICBcIllvdXJzZWxmIGluIGEgaGV4YWdvbmFsIGNoYW1iZXIgd2l0aCBzb2Z0IGlsbHVtaW5hdGlvbiBmcm9tXCIsXG4gICAgICAgIFwiQSBtb29ubGlnaHQgZmFyIGFib3ZlIGluIHRoZSBhcmNoZWQgY2VpbGluZy4gQSBib29rIGlzIG9uXCIsXG4gICAgICAgIFwiQSBzdG9uZSB0YWJsZSBpbiB0aGUgY2VudGVyIG9mIHRoZSByb29tLlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJSZWFkIHRoZSBib29rXCIsIHZhbHVlOiBcInJ1aW5zX3JlYWRSZWRCb29rU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRocm91Z2ggdGhlIHJlZCBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX2ZveWVyU2NlbmVcIiB9XG4gICAgXVxufTtcblxuY29uc3QgcnVpbnNfcmVhZFJlZEJvb2tTY2VuZSA9IHtcbiAgICBuYW1lOiAncnVpbnNfcmVhZFJlZEJvb2tTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgYXBwcm9hY2ggdGhlIHJlZCBib29rIGFuZCByZWFkIGZyb20gaXQsIG5vdGljaW5nXCIsXG4gICAgICAgIFwiSXQncyBhY3R1YWxseSBtYWRlIG9mIHJlZCBncmFuaXRlIGFuZCBoYXMgb25seSBvbmUgcGFnZSB2aXNpYmxlLlwiLFxuICAgICAgICBcIkl0IHJlYWRzOlwiLFxuICAgICAgICBcIlJldHVybmluZyB0byB0aGUgc291cmNlIGlzIGNvbXBsZXRpb24gYW5kIHdob2xlbmVzcy4uLlwiLFxuICAgICAgICBcIllvdSBmZWVsIHNhZmV0eSBhdCB0aGVzZSB3b3Jkcy5cIlxuICAgIF0sXG4gICAgY2hvaWNlczogW1xuICAgICAgICB7IG5hbWU6IFwiUmV0dXJuIHRocm91Z2ggdGhlIHJlZCBkb29yd2F5XCIsIHZhbHVlOiBcInJ1aW5zX2ZveWVyU2NlbmVcIiB9XG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuYXVyYXMuYWRkKCdzYWZldHknKTtcbiAgICB9XG59O1xuXG5jb25zdCBydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2hpZGRlblBhdGhfRW50ZXJTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCJZb3UgcGFzcyB0aHJvdWdoIGEgdmVpbCBpbiBzcGFjZSwgYSBzaGltbWVyaW5nIGN1cnRhaW4gb2YgZHJlYW1zLFwiLFxuICAgICAgICBcIkFuZCBlbnRlciB0aGUgaGlkZGVuIHBhdGh3YXkgdGhyb3VnaCB0aGUgcnVpbnMuIEl0IHRha2VzIHlvdSB0aHJvdWdoXCIsXG4gICAgICAgIFwiTWFueSBicmFuY2hpbmcgcGFzc2FnZXMuXCJcbiAgICBdLFxuICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIGxlZnQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgcmlnaHQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lXCIgfSxcblxuICAgIF1cbn07XG5cbmNvbnN0IHJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGZvbGxvdyB0aGUgaGlkZGVuIHBhdGggYXMgaXQgYnJhbmNoZXMgdG8gdGhlIGxlZnQuXCIsXG4gICAgXSxcbiAgICBjaG9pY2VzOiAoc2VsZiwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgcG9zc2liaWxpdGllcyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJUYWtlIHRoZSByaWdodCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmVcIiB9LFxuICAgICAgICBdXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgICBwb3NzaWJpbGl0aWVzLnB1c2goXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcIlRha2UgdGhlIGxlZnQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhMZWZ0U2NlbmVcIiB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4zMykge1xuICAgICAgICAgICAgcG9zc2liaWxpdGllcy5wdXNoKFxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJFbnRlciB0aHJvdWdoIHRoZSBmcmllbmRzaGlwIGdhdGV3YXlcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aEdhdGV3YXlTY2VuZVwiIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvc3NpYmlsaXRpZXM7XG4gICAgfVxufTtcblxuY29uc3QgcnVpbnNfaGlkZGVuUGF0aFJpZ2h0U2NlbmUgPSB7XG4gICAgbmFtZTogJ3J1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBmb2xsb3cgdGhlIGhpZGRlbiBwYXRoIGFzIGl0IGJyYW5jaGVzIHRvIHRoZSByaWdodC5cIixcblxuICAgIF0sXG4gICAgY2hvaWNlczogKHNlbGYsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3NpYmlsaXRpZXMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgbGVmdCBicmFuY2hcIiwgdmFsdWU6IFwicnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZVwiIH0sXG4gICAgICAgIF1cbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjUpIHtcbiAgICAgICAgICAgIHBvc3NpYmlsaXRpZXMucHVzaChcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiVGFrZSB0aGUgcmlnaHQgYnJhbmNoXCIsIHZhbHVlOiBcInJ1aW5zX2hpZGRlblBhdGhSaWdodFNjZW5lXCIgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zc2liaWxpdGllcztcbiAgICB9XG59O1xuXG5jb25zdCBydWluc19oaWRkZW5QYXRoR2F0ZXdheVNjZW5lID0ge1xuICAgIG5hbWU6ICdydWluc19oaWRkZW5QYXRoR2F0ZXdheVNjZW5lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIllvdSBwYXNzIHRocm91Z2ggdGhlIGhpZGRlbiBkb29yd2F5LCBhbmQgYXMgeW91IGRvLFwiLFxuICAgICAgICBcIlRoZSB2b2ljZSBvZiBhIHdvbWFuIHNwZWFrcyBpbnRvIHlvdXIgbWluZC4gU2hlIHNwZWFrcyxcIixcbiAgICAgICAgXCJZb3Ugc2hhbGwgZmluZCB3aGF0IHlvdSBzZWVrLi4uXCIsXG4gICAgICAgIFwiWW91IHBhc3MgdGhyb3VnaCBzaGFkZSBhbmQgY3VybGluZyBpbmNlbnNlIHNtb2tlXCIsXG4gICAgICAgIFwiQW5kIGhlYXIgdGhlIHNvdW5kIG9mIHRoZSBtb29uIHJpc2luZyBiZXlvbmQgdGhlIGhvcml6b25cIixcbiAgICAgICAgXCJBbmQgZmFyIGFib3ZlIHlvdSBhIG11c2ljYWwgZmx1dGUgcGxheXMuIFlvdSB0aGVuIGF3YWtlblwiLFxuICAgICAgICBcIkluIGEgbWFnaWNhbCBmb3Jlc3QuIFlvdSBub3RpY2UgYSBib29rIGluIHlvdXIgcG9ja2V0LlwiXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJFeHBsb3JlXCIsIHZhbHVlOiBcImF3YWtlbl9leHBsb3JlU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiVGFsayB0byB0aGUgdHJlZXNcIiwgdmFsdWU6IFwiYXdha2VuX3RhbGtTY2VuZVwiIH0sXG4gICAgXSxcbiAgICBvbkVuZDogKHNlbGYsIHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuaW52ZW50b3J5WydkaWFtb25kU3V0cmEnXSA9IDE7XG4gICAgfVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBydWluc19lbnRlclNjZW5lLFxuICAgIHJ1aW5zX2ZveWVyU2NlbmUsXG5cbiAgICBydWluc19ibHVlRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRCbHVlQm9va1NjZW5lLFxuXG4gICAgcnVpbnNfcmVkRG9vcndheV9FbnRlclNjZW5lLFxuICAgIHJ1aW5zX3JlYWRSZWRCb29rU2NlbmUsXG5cbiAgICBydWluc19oaWRkZW5QYXRoX0VudGVyU2NlbmUsXG4gICAgcnVpbnNfaGlkZGVuUGF0aExlZnRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoUmlnaHRTY2VuZSxcbiAgICBydWluc19oaWRkZW5QYXRoR2F0ZXdheVNjZW5lXG59IiwiY29uc3QgdHJlZXNfdGFsa0VudGVyU2NlbmUgPSB7XG4gICAgbmFtZTogJ2F3YWtlbl90YWxrU2NlbmUnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiWW91IGNvbW11bmljYXRlIHdpdGggdGhlIGFuY2llbnQgdHJlZXMsXCIsXG4gICAgICAgIFwicGxhY2luZyB5b3VyIGhhbmRzIG9uIHRoZWlyIHRydW5rcywgYXNraW5nIHRoZW0gdG8gc3BlYWsuXCIsXG4gICAgICAgIFwiVGhleSBzYXksIFwiICsgXCInV2Ugd2lsbCBzcGVhayBzb2Z0bHkgb2YgZm9yZ290dGVuIHNlY3JldHMuLi4nXCIsXG4gICAgXSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJBc2sgYWJvdXQgdGhlIGZvcmVzdCdzIGhpc3RvcnlcIiwgdmFsdWU6IFwidHJlZXNfYXNrSGlzdG9yeVNjZW5lXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIklucXVpcmUgYWJvdXQgbWFnaWNhbCBrbm93bGVkZ2VcIiwgdmFsdWU6IFwidHJlZXNfYXNrTWFnaWNTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJSZXR1cm4gdG8geW91ciBzdXJyb3VuZGluZ3NcIiwgdmFsdWU6IG51bGwgfSxcbiAgICBdXG59O1xuXG5jb25zdCB0cmVlc19hc2tIaXN0b3J5U2NlbmUgPSB7XG4gICAgbmFtZTogJ3RyZWVzX2Fza0hpc3RvcnlTY2VuZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCInSW4gdGhlIGJlZ2lubmluZywgdGhlcmUgd2VyZSB0aGUgc2VlZGxpbmdzLCBmaXJzdCB0byBhd2FrZW4uLi4nXCIsXG4gICAgICAgIFwiJ1RoZW4gdGhlIGxvbmcgeWVhcnMgb2YgbWFueSB0dXJuaW5ncyBvZiB0aGUgc2t5LXdoZWVsLi4uJ1wiLFxuICAgICAgICBcIidBbmQgdGhlbiB0aGUgYnVybmluZyBvZiB0aGUgY2Fub3B5LCB3aGljaCBtYWRlIHRoaXMgZm9yZXN0Li4uJ1wiLFxuXG4gICAgXSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgbmFtZTogXCJBc2sgYWJvdXQgdGhlIHNlZWRsaW5nc1wiLCB2YWx1ZTogXCJ0cmVlc19hc2tTZWVkbGluZ3NTY2VuZVwiIH0sXG4gICAgICAgIHsgbmFtZTogXCJBc2sgYWJvdXQgdGhlIGxvbmcgeWVhcnNcIiwgdmFsdWU6IFwidHJlZXNfYXNrTG9uZ1llYXJzU2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQXNrIGFib3V0IHRoZSBjYW5vcHlcIiwgdmFsdWU6IFwidHJlZXNfYXNrQ2Fub3B5U2NlbmVcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQXNrIHNvbWV0aGluZyBlbHNlXCIsIHZhbHVlOiBudWxsIH0sXG4gICAgXVxufTtcblxuY29uc3QgdHJlZXNfYXNrU2VlZGxpbmdzU2NlbmUgPSB7XG4gICAgbmFtZTogJ3RyZWVzX2Fza1NlZWRsaW5nc1NjZW5lJyxcbiAgICBlcGhlbWVyYWw6IHRydWUsXG4gICAgc3RhY2s6IHRydWUsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCInLi4uJ1wiLFxuICAgICAgICBcIid0aGUgc2VlZGxpbmdzIHdlcmUgYmVmb3JlIHVzLCBhbmQgdGhleSBhcmUgYWZ0ZXIgdXMuLi4nXCIsXG4gICAgICAgIFwiJy4uLidcIlxuICAgIF1cbn07XG5cbmNvbnN0IHRyZWVzX2Fza0xvbmdZZWFyc1NjZW5lID0ge1xuICAgIG5hbWU6ICd0cmVlc19hc2tMb25nWWVhcnNTY2VuZScsXG4gICAgZXBoZW1lcmFsOiB0cnVlLFxuICAgIHN0YWNrOiB0cnVlLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgIFwiJy4uLidcIixcbiAgICAgICAgXCIndGhlIGxvbmcgeWVhcnMgd2VyZSBvZiB3ZWFyaW5lc3MgYW5kIHdvZS4uLidcIixcbiAgICAgICAgXCInLi4uJ1wiXG4gICAgXVxufTtcblxuY29uc3QgdHJlZXNfYXNrQ2Fub3B5U2NlbmUgPSB7XG4gICAgbmFtZTogJ3RyZWVzX2Fza0Nhbm9weVNjZW5lJyxcbiAgICBlcGhlbWVyYWw6IHRydWUsXG4gICAgc3RhY2s6IHRydWUsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgXCInLi4uJ1wiLFxuICAgICAgICBcIid0aGUgY2Fub3B5IGFmbGFtZSwgYWxpdCwgbGlrZSB0b3JjaGVzIGJsYXppbmcgaW4gbmlnaHQuLi4nXCIsXG4gICAgICAgIFwiJy4uLidcIlxuICAgIF1cbn07XG5cbmNvbnN0IHRyZWVzX2Fza01hZ2ljU2NlbmUgPSB7XG4gICAgbmFtZTogJ3RyZWVzX2Fza01hZ2ljU2NlbmUnLFxuICAgIGVwaGVtZXJhbDogdHJ1ZSxcbiAgICBzdGFjazogdHJ1ZSxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICBcIicuLi4nXCIsXG4gICAgICAgIFwiJ3RydWUgbWFnaWMgY2FuIG5ldmVyIGJlIHVzZWQgZm9yIGV2aWwuLi4nXCIsXG4gICAgICAgIFwiJy4uLidcIlxuICAgIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHRyZWVzX3RhbGtFbnRlclNjZW5lLFxuXG4gICAgdHJlZXNfYXNrSGlzdG9yeVNjZW5lLFxuICAgIHRyZWVzX2Fza1NlZWRsaW5nc1NjZW5lLFxuICAgIHRyZWVzX2Fza0xvbmdZZWFyc1NjZW5lLFxuICAgIHRyZWVzX2Fza0Nhbm9weVNjZW5lLFxuXG4gICAgdHJlZXNfYXNrTWFnaWNTY2VuZVxufTsiLCJjb25zdCB7IGNvbnNvbGVsb2cgfSA9IHJlcXVpcmUoJy4vaW8uanMnKTtcblxuLy8gVE9ETzogbWFrZSB0aGlzIHdvcmsgaW4gYnJvd3NlclxuY29uc3Qgc3RvcnlUZWxsID0gKGxpbmUpID0+IHtcbiAgICBjb25zb2xlbG9nKGxpbmUpO1xuICAgIC8vIFRPRE86IHVzZSBtYXJrb3YgdGV4dCAob3IgZ2VuZXJhdGl2ZSBBST8pIHRvIHdyaXRlIG1vcmUgdGV4dCBpbiBwdXJwbGVcbn07XG5cbmNvbnN0IHN0b3J5VGVsbE1ldGEgPSAobGluZSwgY29sb3IpID0+IHtcbiAgICBjb25zb2xlbG9nKGxpbmUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RvcnlUZWxsLFxuICAgIHN0b3J5VGVsbE1ldGFcbn07IiwiY29uc3Qgc2xlZXAgPSAobXMpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzLCBtcyk7XG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2xlZXBcbn07Il19
