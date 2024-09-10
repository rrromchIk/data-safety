export function generateRandomNumbers(
    a: number = 7 ** 5,
    X0: number = new Date().getUTCMilliseconds() % (2 ** 31 - 1),
    c: number = 31,
    m: number = 2 ** 31 - 1,
    sequenceLength: number = 10,
    changeSequenceUsingTime: boolean = false,
): number[] {
    let Xn: number = X0;
    let randomNumbersSequence: number[] = [];

    for (let i = 0; i < sequenceLength; i++) {
        Xn = (a * Xn + c) % m;
        if (changeSequenceUsingTime) {
            Xn += new Date().getUTCMilliseconds() % m;
        }
        randomNumbersSequence.push(Xn);
    }

    return randomNumbersSequence;
}

export function calculatePeriod(
    a: number = 7 ** 5,
    X0: number = new Date().getUTCMilliseconds() % (2 ** 31 - 1),
    c: number = 31,
    m: number = 2 ** 31 - 1,
): number {
    let Xn: number = X0;
    let period: number = 0;
    Xn = (a * Xn + c) % m;
    period++;

    while (Xn !== X0) {
        Xn = (a * Xn + c) % m;
        period++;
    }

    return period;
}
