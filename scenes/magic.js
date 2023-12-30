const magicScene = {
    name: 'magicScene',
    description: "You decide to harness the magic within you. A surge of power flows through your veins.",
    choices: [
        { name: "Cast a spell of protection", value: "castProtection" },
        { name: "Channel elemental magic", value: "channelElemental" },
        { name: "Return to the start of the tale", value: "returnStart" }
    ],
    transition: (self, state, action) => {
        switch (action) {
            case 'castProtection':
                return 'castProtectionScene';
            case 'channelElemental':
                return 'channelElementalScene';
            case 'returnStart':
                return 'awakenScene';
        }
    }
};

export {
    magicScene
};