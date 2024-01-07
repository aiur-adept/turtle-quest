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