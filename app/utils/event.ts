/** Event Data */
export type EventData = {
    /** Position, in milliseconds */
    position: number

    /**
     * Pitch Literal
     * @example
     * "C4#"
     */
    pitchLiteral: string

    /**
     * Pitch Frequency
     * @example
     * 261.626 // Hz
     */
    pitchFreq: number
}
