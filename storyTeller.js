import chalk from 'chalk';

const storyTell = (line) => {
    console.log(chalk.green(line));
    // TODO: use markov text (or generative AI?) to write more text in purple
};

export {
    storyTell
};