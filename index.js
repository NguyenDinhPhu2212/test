import InputWrapper from "./components/Input.js";
function adjacentElementsProduct(inputArray) {
    let max = -Infinity;
    for (let i = 1; i < inputArray.length; i++) {
        max = Math.max(inputArray[i] * inputArray[i - 1], max);
    }
    console.log(max);
    return max;
}
adjacentElementsProduct([2, 3, -5, -2, 4]);
// Prints help message to the console
// Returns a string
function alternatingSums(a) {
    let team1 = 0;
    let team2 = 0;
    for (let i in a) {
        if (i % 2 == 0) team1 += a[i];
        else team2 += a[i];
    }
    return [team1, team2];
}
console.log(alternatingSums([60, 40, 55, 75, 64]));
