const ruins_enterScene = {
    name: 'ruins_enterScene',
    description: [
        "You pass beneath the stone gateway, brushed by overgrown vines.",
        "The air is cool and a fresh wind from outside blows inward.",
        "As you walk, the light fades to grey, never quite going out.",
        "You come to a blue doorway and a green doorway"
    ],
    choices: [
        { name: "Enter the blue doorway", value: "ruins_blueDoorwayScene" },
        { name: "Enter the green doorway", value: "ruins_greenDoorwayScene" },
        { name: "Follow the hidden path", value: "ruins_hiddenPathScene" }
    ]
};

export {
    ruins_enterScene,
}