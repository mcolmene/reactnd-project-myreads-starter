// Created a deep copy by using JSON.parse and JSON.stringify
const deepCopy = object => JSON.parse(JSON.stringify(object));

export default deepCopy;

