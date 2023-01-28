/** Type of Piano Key */
export type PianoKey = Readonly<{
    /**
     * Piano Key Literal
     * @example
     * "C4#"
     */
    literal: string

    /**
     * Piano Key Frequency
     * @example
     * 261.626
     */
    freq: number

    /**
     * Piano Key Index, start at 0 and end at 87
     * @example
     * 87
     */
    index: number

    /** Piano Key Color */
    color: "black" | "white"
}>

/** Keys in Octave */
export const octaveKeys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

/** Keys of 88 Keys Piano */
export const pianoKeys: PianoKey[] = []
{
    let keyIndex = -9 // Start at "A0" and end at "C8"
    let currentFreq = 440 / 16
    ;[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((octaveIndex) => {
        octaveKeys.forEach((key) => {
            if (keyIndex >= 0 && keyIndex < 88) {
                pianoKeys.push({
                    literal: `${key[0]}${octaveIndex}${key.endsWith("#") ? "#" : ""}`,
                    freq: Math.round(currentFreq * 1000) / 1000,
                    index: keyIndex,
                    color: key.endsWith("#") ? "black" : "white"
                })
                currentFreq *= 1.0594630944
            }
            keyIndex++
        })
    })
}

/** Keys of 88 Keys Piano (`k=key.literal, v=key`) */
const pianoKeysLookupByLiteral: { [literal: string]: PianoKey } = {}
{
    for (let key of pianoKeys) {
        pianoKeysLookupByLiteral[key.literal] = key
    }
}

/**
 * Find Piano Key by Literal
 * @param by By Which Method, `"literal"` here
 * @param literal Piano Key Literal (eg. `C4#`)
 * @returns PianoKey when found the key, undefined when invalid literal is given
 */
export function findPianoKeysBy(by: "literal", literal: string): PianoKey | undefined
/**
 * Find Piano Key by Index
 * @param by By Which Method, `"index"` here
 * @param index Piano Key index (eg. `87`)
 * @returns PianoKey when found the key, undefined when invalid index is given
 */
export function findPianoKeysBy(by: "index", index: number): PianoKey | undefined
/**
 * Find Piano Key by Frequency
 * @param by By Which Method, `"freq"` here
 * @param freq Piano Key Frequency (eg. `261.626`)
 * @returns PianoKey when found the key, undefined when invalid frequency is given
 */
export function findPianoKeysBy(by: "freq", freq: number): PianoKey | undefined
// ------------------------------------------------------------------------- //
export function findPianoKeysBy(by: "literal" | "index" | "freq", value: string | number) {
    switch (by) {
        case "literal": {
            if (typeof value != "string" || !pianoKeysLookupByLiteral[value]) return
            return pianoKeysLookupByLiteral[value]
        }
        case "index": {
            if (typeof value != "number" || !pianoKeys[value]) return
            return pianoKeys[value]
        }
        case "freq": {
            if (typeof value != "number") return
            let closestKey: PianoKey | undefined = undefined
            let closestDiff = Infinity
            for (let key of pianoKeys) {
                let diff = Math.abs(key.freq - value)
                if (diff < closestDiff) {
                    closestDiff = diff
                    closestKey = key
                }
            }
            return closestKey
        }
    }
}
