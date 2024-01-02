import chalk from 'chalk';

const awaken_enterScene = {
    name: 'awaken_enterScene',
    description: (state) => {
        const msg = [
            `You awaken${state.awakened ? ' again ' : ' '}in a mysterious forest.`,
            "The air is enchanted with much memory.",
            "You hear faintly the leaves in the canopy dancing.",
        ];
        return msg;
    },
    onEnd: (state) => {
        state.awakened = true;
    },
    choices: [
        { name: "Explore", value: "awaken_exploreScene" },
        { name: "Talk to the trees", value: "trees_talkEnterScene" },
    ]
};

const awaken_exploreScene = {
    name: 'awaken_exploreScene',
    description: [
        "You walk, exploring the mysterious forest.",
        "Your mind seeks the way through the dream.",
        "As you walk, you see a vinegrown doorway to ancient ruins,",
        "And you sense hidden pathways.",
    ],
    choices: [
        { name: "Enter the ruins", value: "ruins_enterScene" },
        { name: "Follow the hidden path", value: "path_enterScene" },
        { name: "Talk to the trees", value: "trees_talkEnterScene" },
    ]
};

export {
    awaken_enterScene,
    awaken_exploreScene
};