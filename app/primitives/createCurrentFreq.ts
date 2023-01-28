import { AMDF } from "pitchfinder"
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js"

/**
 * useCurrentPitchFreq
 * @param delay Delay in ms between each pitch detection
 * @param hold If true, the pitch will not be reset to null when no pitch is detected
 * @returns Current pitch in Hz
 */
export function createCurrentPitchFreq(delay: number, hold: true): Accessor<number>
/**
 * useCurrentPitchFreq
 * @param delay Delay in ms between each pitch detection
 * @param hold If true, the pitch will not be reset to null when no pitch is detected
 * @returns Current pitch in Hz
 */
export function createCurrentPitchFreq(delay: number, hold: false): Accessor<number | null>
// ------------------------------------------------------------- //
export function createCurrentPitchFreq(delay: number, hold: boolean) {
    const [pitch, setPitch] = createSignal<number | null>(261.626)

    let intervalId: number | undefined
    let mediaStreamSource: MediaStreamAudioSourceNode | undefined
    let mediaStream: MediaStream | undefined

    createEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaStream = stream
            const audioContext = new AudioContext()
            const analyser = audioContext.createAnalyser()
            const bufferLength = analyser.frequencyBinCount
            const dataArray = new Float32Array(bufferLength)
            const pitchFinder = AMDF({ sampleRate: audioContext.sampleRate })
            mediaStreamSource = audioContext.createMediaStreamSource(stream)
            mediaStreamSource.connect(analyser)

            intervalId = setInterval(() => {
                analyser.getFloatTimeDomainData(dataArray)
                const pitch = pitchFinder(dataArray)
                if (pitch !== null) {
                    setPitch(pitch)
                } else if (!hold) {
                    setPitch(null)
                }
            }, delay)
        })
    })

    onCleanup(() => {
        if (intervalId) clearInterval(intervalId)
        if (mediaStreamSource) mediaStreamSource.disconnect()
        if (mediaStream) mediaStream.getTracks().forEach((track) => track.stop())
    })

    return pitch
}
