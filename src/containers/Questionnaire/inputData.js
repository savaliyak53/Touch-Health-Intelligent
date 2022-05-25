export const inputData = [
    {
        "version": "1",
        "type": "MULTIPLE_CHOICE",
        "payload": {
            "q_str": "Which common symptoms of diabetes type II are you experiencing?",
            "q_content": {
                "options": [
                    "fatigue",
                    "shortness-of-breath"
                ],
                "defaults": [
                    0
                ]
            }
        }
    },
    {
        "version": "1",
        "type": "YES_NO",
        "payload": {
            "q_str": "Are you currently experiening a headache?",
            "q_content": {}
        }
    },
    {
        "version": "1",
        "type": "SLIDER",
        "payload": {
            "q_str": "How painful is your headache?",
            "q_content": {
                "lower": {
                    "value": 0,
                    "qualifier": "No pain"
                },
                "upper": {
                    "value": 10,
                    "qualifier": "Worse pain imaginable"
                },
                "step": 0.5
            }
        }
    },
]