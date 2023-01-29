import { Accessor, createEffect, createSignal, onCleanup } from "solid-js"
import { EventData } from "../utils/event"
import { findPianoKeysBy } from "../utils/octave"
import { createCurrentPitchFreq } from "./createCurrentPitchFreq"

export function createEventDataFromCurrentPitchFreq(
    delay: number,
    clearDelay: number
): [eventData: Accessor<EventData[]>, resetEventData: () => void] {
    const [eventData, setEventData] = createSignal<EventData[]>([])
    const currentPitchFreq = createCurrentPitchFreq(delay, false)
    const currentPitchLiteral = () => {
        const currentPitchFreqValue = currentPitchFreq()
        if (currentPitchFreqValue) {
            return findPianoKeysBy("freq", currentPitchFreqValue)?.literal ?? ""
        } else {
            return ""
        }
    }

    let currentPosition = 0
    createEffect(() => {
        const intervalId = setInterval(() => {
            currentPosition += delay
        }, delay)

        onCleanup(() => {
            clearInterval(intervalId)
        })
    })

    createEffect(() => {
        const currentPitchFreqValue = currentPitchFreq()
        if (currentPitchFreqValue !== null) {
            setEventData((prevEventData) => {
                if (clearDelay) {
                    return [
                        ...prevEventData,
                        {
                            position: currentPosition,
                            pitchFreq: currentPitchFreqValue,
                            pitchLiteral: currentPitchLiteral()
                        }
                    ].filter((event) => {
                        return event.position + clearDelay > currentPosition
                    })
                } else {
                    return [
                        ...prevEventData,
                        {
                            position: currentPosition,
                            pitchFreq: currentPitchFreqValue,
                            pitchLiteral: currentPitchLiteral()
                        }
                    ]
                }
            })
        }
    })

    return [
        eventData,
        () => {
            setEventData([])
            currentPosition = 0
        }
    ]
}
