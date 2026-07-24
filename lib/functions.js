const config = require('../config');

// වෙලාව (Time) ලබා ගන්නා function එක
const getTime = () => {
    return new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo' });
};

// දිනය (Date) ලබා ගන්නා function එක
const getDate = () => {
    return new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Colombo' });
};

// Delay එකක් ලබා දීමට (Sleep function)
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
    getTime,
    getDate,
    sleep
};
