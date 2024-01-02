import { itemDescriptions } from './itemDescriptions.js';
import { storyTell } from './storyTeller.js';

const describeItem = (itemName) => {
    storyTell(itemDescriptions[itemName]);
};

export {
    describeItem
};