import { storyTell } from './storyTeller.js';
import { sleep } from './utils.js';

const describe = async (description, state) => {
    // if a function, call it (it should return either an array or one line)
    if (description.apply && description.call) {
        description = description(state);
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
    await sleep(1000);
};

export {
    describe
};