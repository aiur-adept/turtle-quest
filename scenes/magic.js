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