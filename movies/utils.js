/** Debounce Function
 * Forces a function to wait a certain amount of time before running again
 * Takes in a function as an argument and returns a function
 * func -> Function to force wait
 * delay -> Desired delay before every execution
 *
 * func.apply() takes in any number of arguments and passes to the function
 * Used when the number of arguments is not clear.
 */
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};
