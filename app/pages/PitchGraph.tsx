import { useNavigate } from "@solidjs/router"
import { ArrowBack, Refresh } from "@suid/icons-material"
import { Box, Button, Card, CardActions, CardContent, Fab, Typography } from "@suid/material"
import { Component, createMemo, For } from "solid-js"
import { createEventDataFromCurrentPitchFreq } from "../primitives/createEventDataFromCurrentPitchFreq"
import { findPianoKeysBy, pianoKeys } from "../utils/octave"

export const PitchGraph: Component = () => {
    const navigate = useNavigate()
    const [eventData, resetEventData] = createEventDataFromCurrentPitchFreq(100, 10000)
    const startingPosition = () => (eventData()[0] ?? { position: 0 }).position
    const lastPointPosition = () => {
        const eventDataValue = eventData()
        if (eventDataValue.length != 0) {
            return eventDataValue[eventDataValue.length - 1].position - startingPosition()
        } else {
            return 0
        }
    }
    const scaleX = 0.01
    const svgMaxHeight = createMemo(() => Math.log2(pianoKeys[pianoKeys.length - 1].freq) * 25)
    const currentPitchFreq = () => {
        const eventDataValue = eventData()
        return eventDataValue.length != 0 ? eventDataValue[eventDataValue.length - 1].pitchFreq : 261.626
    }
    const currentPitchLiteral = () => findPianoKeysBy("freq", currentPitchFreq())?.literal ?? ""

    return (
        <>
            <Card class="w-200px">
                <CardContent class="items-center">
                    <Typography class="text-[#1492D5]" variant="body2">
                        {Math.round(currentPitchFreq() * 1000) / 1000}@{currentPitchLiteral()}
                    </Typography>
                    <svg width={lastPointPosition() * scaleX} height={svgMaxHeight()}>
                        <For each={eventData()}>
                            {(event) => (
                                <circle
                                    cx={(event.position - startingPosition()) * scaleX}
                                    cy={svgMaxHeight() - Math.log2(event.pitchFreq) * 25}
                                    r={2}
                                    fill="#66CCFF"
                                />
                            )}
                        </For>
                    </svg>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={() => resetEventData()}>
                        <Refresh />
                    </Button>
                </CardActions>
            </Card>
            <Box class="absolute bottom-0 p-4">
                <Fab size="medium" color="info" variant="circular" onClick={() => navigate("/")}>
                    <ArrowBack />
                </Fab>
            </Box>
        </>
    )
}
