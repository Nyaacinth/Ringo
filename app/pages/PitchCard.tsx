import { Card, CardContent, Typography } from "@suid/material"
import { Component } from "solid-js"
import { createCurrentPitchFreq } from "../primitives/createCurrentFreq"
import { findPianoKeysBy } from "../utils/octave"

export const PitchCard: Component = () => {
    const currentPitchFreq = createCurrentPitchFreq(100, true)
    const currentPitchLiteral = () => findPianoKeysBy("freq", currentPitchFreq())?.literal

    return (
        <Card class="w-36 h-36 justify-center items-center">
            <CardContent class="items-center">
                <Typography class="text-[#38ADEC]" variant="body2">
                    {Math.round(currentPitchFreq() * 1000) / 1000}
                </Typography>
                <Typography class="text-[#1492D5] !fw-bold" variant="h2">
                    {currentPitchLiteral()}
                </Typography>
            </CardContent>
        </Card>
    )
}