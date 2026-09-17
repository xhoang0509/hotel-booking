export function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    const paddedNumber = randomNumber.toString().padStart(6, '0'); // Pad the number with zeros to ensure it has 6 digits
    return `DP${paddedNumber}`;
}
