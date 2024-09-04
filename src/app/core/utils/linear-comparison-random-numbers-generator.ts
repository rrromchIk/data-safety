export function generateRandomNumbers(
    a: number = 7 ** 5,
    X0: number = new Date().getUTCMilliseconds() % (2 ** 31 - 1),
    c: number = 31,
    m: number = 2 ** 31 - 1,
    sequenceLength: number = 10,
    changeSequenceUsingTime: boolean = false,
): number[] {
    let x: number = X0;
    let randomNumbersSequence: number[] = [];

    for (let i = 0; i < sequenceLength; i++) {
        x = (a * x + c) % m;
        if (changeSequenceUsingTime) {
            x += new Date().getUTCMilliseconds() % m;
        }
        randomNumbersSequence.push(x);
    }

    return randomNumbersSequence;
}
