const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const dateFormat = (d: any) => {
    const t = new Date(d)
    return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear()
}

export const response = {
    experiment_group: 'a',
    insights: [
        [
            {
                category: {
                    type: 'health',
                    name: 'Hypertension',
                    icon: 'data:image/svg;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMi45NDEiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAyMi45NDEgMzMiPgogIDxnIGlkPSJIZWFydCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQuMTI0IC0wLjY3MSkiPgogICAgPHBhdGggaWQ9IlBhdGhfODgiIGRhdGEtbmFtZT0iUGF0aCA4OCIgZD0iTTQuMTI0LDE1LjQ2N2ExNi4yNCwxNi4yNCwwLDAsMCwuNjc2LDQuNDkuNzM0LjczNCwwLDAsMCwuODQyLjUxNGM0LjAxMS0uNzUzLDEzLjA0LTYuNDQ0LDEzLjA0Ni03LjkxNmEuNzI4LjcyOCwwLDAsMSwxLjQ1NiwwYzAsLjkzMywyLjU5NCwyLjMxLDUuNCwzLjI0OGEuNzI4LjcyOCwwLDAsMCwuOTQ0LS41OTEsMTkuOTUsMTkuOTUsMCwwLDAsLjIxMy0yLjY1Niw3LjI4MSw3LjI4MSwwLDAsMC0uMzc5LTIuMzg1bC42MjgtMS44ODNhMi4zNSwyLjM1LDAsMCwwLTEuMTcyLTIuODMyLDIuMzksMi4zOSwwLDAsMC0zLjA5Ljk1NCwxMS4xNzEsMTEuMTcxLDAsMCwwLTEuNzU5LS41ODdMMjEuMzA4LDMuOWEyLjM0LDIuMzQsMCwwLDAtMS41NTUtMi42OEwxOC40NjcuNzkyYTIuMzQsMi4zNCwwLDAsMC0zLjAzNSwxLjc2MmwtLjU0MywyLjcyMmExOS4zMywxOS4zMywwLDAsMC0zLjAzOS4yMzRsLTEuMy0zLjI1MkEyLjM1NiwyLjM1NiwwLDAsMCw3LjE3NiwxLjExN2EyLjQyOSwyLjQyOSwwLDAsMC0uOTQ1LDMuMDA5TDcuNDc4LDcuMjQzQzUuMjUxLDguOTI0LDQuMTI0LDExLjY4Nyw0LjEyNCwxNS40NjdaIiBmaWxsPSIjZmZmIi8+CiAgICA8cGF0aCBpZD0iUGF0aF84OSIgZGF0YS1uYW1lPSJQYXRoIDg5IiBkPSJNMTguODc1LDkuOTE5QzE2LjYsMTIuNzcsOS41NjYsMTYuNjA4LDUuOCwxNy41NjdhLjcyMS43MjEsMCwwLDAtLjQ4MS45OWMyLjcsNi4wMzYsNy45MzEsMTAuODkzLDEwLjY2NCwxMC44OTMsNC4zLDAsNy45MzUtOC43LDkuNDQ2LTE1LjUxMmEuNzE4LjcxOCwwLDAsMC0uNDkxLS44NDNDMjMuMTE4LDEyLjUyMywyMC4yLDExLjQxOSwxOC44NzUsOS45MTlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUxNyA0LjIyKSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg==',
                    color: 'CD6052',
                },
                present_value: {
                    expectation: 0.5,
                    pp10: 0.25,
                    pp90: 0.75,
                },
                historical: {
                    times: [
                        '2022-07-15T00:23:30.813079',
                        '2022-07-16T00:23:30.813083',
                        '2022-07-17T00:23:30.813089',
                    ],
                    expectation: [0.2, 0.4, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                forecast: {
                    times: [
                        '2022-07-18T00:23:30.813079',
                        '2022-07-19T00:23:30.813083',
                        '2022-07-20T00:23:30.813089',
                    ],
                    expectation: [0.2, 0, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                patterns: [
                    {
                        direction: 'up',
                        magnitude: 1,
                        factors: [
                            {
                                factor_id:
                                    '110a74a8-7420-410a-b2fa-cb1860c2a8f0',
                                name: 'eating gluten',
                            },
                        ],
                        p_str: 'There is evidence that eating gluten improves your hypertension.',
                    },
                ],
            },
            {
                category: {
                    type: 'health',
                    name: 'Hypertension',
                    icon: 'data:image/svg;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMi45NDEiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAyMi45NDEgMzMiPgogIDxnIGlkPSJIZWFydCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQuMTI0IC0wLjY3MSkiPgogICAgPHBhdGggaWQ9IlBhdGhfODgiIGRhdGEtbmFtZT0iUGF0aCA4OCIgZD0iTTQuMTI0LDE1LjQ2N2ExNi4yNCwxNi4yNCwwLDAsMCwuNjc2LDQuNDkuNzM0LjczNCwwLDAsMCwuODQyLjUxNGM0LjAxMS0uNzUzLDEzLjA0LTYuNDQ0LDEzLjA0Ni03LjkxNmEuNzI4LjcyOCwwLDAsMSwxLjQ1NiwwYzAsLjkzMywyLjU5NCwyLjMxLDUuNCwzLjI0OGEuNzI4LjcyOCwwLDAsMCwuOTQ0LS41OTEsMTkuOTUsMTkuOTUsMCwwLDAsLjIxMy0yLjY1Niw3LjI4MSw3LjI4MSwwLDAsMC0uMzc5LTIuMzg1bC42MjgtMS44ODNhMi4zNSwyLjM1LDAsMCwwLTEuMTcyLTIuODMyLDIuMzksMi4zOSwwLDAsMC0zLjA5Ljk1NCwxMS4xNzEsMTEuMTcxLDAsMCwwLTEuNzU5LS41ODdMMjEuMzA4LDMuOWEyLjM0LDIuMzQsMCwwLDAtMS41NTUtMi42OEwxOC40NjcuNzkyYTIuMzQsMi4zNCwwLDAsMC0zLjAzNSwxLjc2MmwtLjU0MywyLjcyMmExOS4zMywxOS4zMywwLDAsMC0zLjAzOS4yMzRsLTEuMy0zLjI1MkEyLjM1NiwyLjM1NiwwLDAsMCw3LjE3NiwxLjExN2EyLjQyOSwyLjQyOSwwLDAsMC0uOTQ1LDMuMDA5TDcuNDc4LDcuMjQzQzUuMjUxLDguOTI0LDQuMTI0LDExLjY4Nyw0LjEyNCwxNS40NjdaIiBmaWxsPSIjZmZmIi8+CiAgICA8cGF0aCBpZD0iUGF0aF84OSIgZGF0YS1uYW1lPSJQYXRoIDg5IiBkPSJNMTguODc1LDkuOTE5QzE2LjYsMTIuNzcsOS41NjYsMTYuNjA4LDUuOCwxNy41NjdhLjcyMS43MjEsMCwwLDAtLjQ4MS45OWMyLjcsNi4wMzYsNy45MzEsMTAuODkzLDEwLjY2NCwxMC44OTMsNC4zLDAsNy45MzUtOC43LDkuNDQ2LTE1LjUxMmEuNzE4LjcxOCwwLDAsMC0uNDkxLS44NDNDMjMuMTE4LDEyLjUyMywyMC4yLDExLjQxOSwxOC44NzUsOS45MTlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUxNyA0LjIyKSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg==',
                    color: 'CD6052',
                },
                present_value: {
                    expectation: 0.5,
                    pp10: 0.25,
                    pp90: 0.75,
                },
                historical: {
                    times: [
                        '2022-07-15T00:23:30.813079',
                        '2022-07-16T00:23:30.813083',
                        '2022-07-17T00:23:30.813089',
                    ],
                    expectation: [0.2, 0.4, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                forecast: {
                    times: [
                        '2022-07-15T00:23:30.813079',
                        '2022-07-16T00:23:30.813083',
                        '2022-07-17T00:23:30.813089',
                    ],
                    expectation: [0.2, 0.4, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                patterns: [
                    {
                        direction: 'up',
                        magnitude: 1,
                        factors: [
                            {
                                factor_id:
                                    '110a74a8-7420-410a-b2fa-cb1860c2a8f0',
                                name: 'eating gluten',
                            },
                        ],
                        p_str: 'There is evidence that eating gluten improves your hypertension.',
                    },
                ],
            },
        ],
        [
            {
                category: {
                    type: 'health',
                    name: 'Hypertension',
                    icon: 'data:image/svg;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMi45NDEiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAyMi45NDEgMzMiPgogIDxnIGlkPSJIZWFydCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQuMTI0IC0wLjY3MSkiPgogICAgPHBhdGggaWQ9IlBhdGhfODgiIGRhdGEtbmFtZT0iUGF0aCA4OCIgZD0iTTQuMTI0LDE1LjQ2N2ExNi4yNCwxNi4yNCwwLDAsMCwuNjc2LDQuNDkuNzM0LjczNCwwLDAsMCwuODQyLjUxNGM0LjAxMS0uNzUzLDEzLjA0LTYuNDQ0LDEzLjA0Ni03LjkxNmEuNzI4LjcyOCwwLDAsMSwxLjQ1NiwwYzAsLjkzMywyLjU5NCwyLjMxLDUuNCwzLjI0OGEuNzI4LjcyOCwwLDAsMCwuOTQ0LS41OTEsMTkuOTUsMTkuOTUsMCwwLDAsLjIxMy0yLjY1Niw3LjI4MSw3LjI4MSwwLDAsMC0uMzc5LTIuMzg1bC42MjgtMS44ODNhMi4zNSwyLjM1LDAsMCwwLTEuMTcyLTIuODMyLDIuMzksMi4zOSwwLDAsMC0zLjA5Ljk1NCwxMS4xNzEsMTEuMTcxLDAsMCwwLTEuNzU5LS41ODdMMjEuMzA4LDMuOWEyLjM0LDIuMzQsMCwwLDAtMS41NTUtMi42OEwxOC40NjcuNzkyYTIuMzQsMi4zNCwwLDAsMC0zLjAzNSwxLjc2MmwtLjU0MywyLjcyMmExOS4zMywxOS4zMywwLDAsMC0zLjAzOS4yMzRsLTEuMy0zLjI1MkEyLjM1NiwyLjM1NiwwLDAsMCw3LjE3NiwxLjExN2EyLjQyOSwyLjQyOSwwLDAsMC0uOTQ1LDMuMDA5TDcuNDc4LDcuMjQzQzUuMjUxLDguOTI0LDQuMTI0LDExLjY4Nyw0LjEyNCwxNS40NjdaIiBmaWxsPSIjZmZmIi8+CiAgICA8cGF0aCBpZD0iUGF0aF84OSIgZGF0YS1uYW1lPSJQYXRoIDg5IiBkPSJNMTguODc1LDkuOTE5QzE2LjYsMTIuNzcsOS41NjYsMTYuNjA4LDUuOCwxNy41NjdhLjcyMS43MjEsMCwwLDAtLjQ4MS45OWMyLjcsNi4wMzYsNy45MzEsMTAuODkzLDEwLjY2NCwxMC44OTMsNC4zLDAsNy45MzUtOC43LDkuNDQ2LTE1LjUxMmEuNzE4LjcxOCwwLDAsMC0uNDkxLS44NDNDMjMuMTE4LDEyLjUyMywyMC4yLDExLjQxOSwxOC44NzUsOS45MTlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUxNyA0LjIyKSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg==',
                    color: 'CD6052',
                },
                present_value: {
                    expectation: 0.5,
                    pp10: 0.25,
                    pp90: 0.75,
                },
                historical: {
                    times: [
                        '2022-07-15T00:23:30.813079',
                        '2022-07-16T00:23:30.813083',
                        '2022-07-17T00:23:30.813089',
                    ],
                    expectation: [0.2, 0.4, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                forecast: {
                    times: [
                        '2022-07-15T00:23:30.813079',
                        '2022-07-16T00:23:30.813083',
                        '2022-07-17T00:23:30.813089',
                    ],
                    expectation: [0.2, 0.4, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                patterns: [
                    {
                        direction: 'up',
                        magnitude: 1,
                        factors: [
                            {
                                factor_id:
                                    '110a74a8-7420-410a-b2fa-cb1860c2a8f0',
                                name: 'eating gluten',
                            },
                        ],
                        p_str: 'There is evidence that eating gluten improves your hypertension.',
                    },
                ],
            },
            {
                category: {
                    type: 'health',
                    name: 'Hypertension',
                    icon: 'data:image/svg;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMi45NDEiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAyMi45NDEgMzMiPgogIDxnIGlkPSJIZWFydCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQuMTI0IC0wLjY3MSkiPgogICAgPHBhdGggaWQ9IlBhdGhfODgiIGRhdGEtbmFtZT0iUGF0aCA4OCIgZD0iTTQuMTI0LDE1LjQ2N2ExNi4yNCwxNi4yNCwwLDAsMCwuNjc2LDQuNDkuNzM0LjczNCwwLDAsMCwuODQyLjUxNGM0LjAxMS0uNzUzLDEzLjA0LTYuNDQ0LDEzLjA0Ni03LjkxNmEuNzI4LjcyOCwwLDAsMSwxLjQ1NiwwYzAsLjkzMywyLjU5NCwyLjMxLDUuNCwzLjI0OGEuNzI4LjcyOCwwLDAsMCwuOTQ0LS41OTEsMTkuOTUsMTkuOTUsMCwwLDAsLjIxMy0yLjY1Niw3LjI4MSw3LjI4MSwwLDAsMC0uMzc5LTIuMzg1bC42MjgtMS44ODNhMi4zNSwyLjM1LDAsMCwwLTEuMTcyLTIuODMyLDIuMzksMi4zOSwwLDAsMC0zLjA5Ljk1NCwxMS4xNzEsMTEuMTcxLDAsMCwwLTEuNzU5LS41ODdMMjEuMzA4LDMuOWEyLjM0LDIuMzQsMCwwLDAtMS41NTUtMi42OEwxOC40NjcuNzkyYTIuMzQsMi4zNCwwLDAsMC0zLjAzNSwxLjc2MmwtLjU0MywyLjcyMmExOS4zMywxOS4zMywwLDAsMC0zLjAzOS4yMzRsLTEuMy0zLjI1MkEyLjM1NiwyLjM1NiwwLDAsMCw3LjE3NiwxLjExN2EyLjQyOSwyLjQyOSwwLDAsMC0uOTQ1LDMuMDA5TDcuNDc4LDcuMjQzQzUuMjUxLDguOTI0LDQuMTI0LDExLjY4Nyw0LjEyNCwxNS40NjdaIiBmaWxsPSIjZmZmIi8+CiAgICA8cGF0aCBpZD0iUGF0aF84OSIgZGF0YS1uYW1lPSJQYXRoIDg5IiBkPSJNMTguODc1LDkuOTE5QzE2LjYsMTIuNzcsOS41NjYsMTYuNjA4LDUuOCwxNy41NjdhLjcyMS43MjEsMCwwLDAtLjQ4MS45OWMyLjcsNi4wMzYsNy45MzEsMTAuODkzLDEwLjY2NCwxMC44OTMsNC4zLDAsNy45MzUtOC43LDkuNDQ2LTE1LjUxMmEuNzE4LjcxOCwwLDAsMC0uNDkxLS44NDNDMjMuMTE4LDEyLjUyMywyMC4yLDExLjQxOSwxOC44NzUsOS45MTlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUxNyA0LjIyKSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg==',
                    color: 'CD6052',
                },
                present_value: {
                    expectation: 0.5,
                    pp10: 0.25,
                    pp90: 0.75,
                },
                historical: {
                    times: [
                        '2022-07-15T00:23:30.813079',
                        '2022-07-16T00:23:30.813083',
                        '2022-07-17T00:23:30.813089',
                    ],
                    expectation: [0.2, 0.4, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                forecast: {
                    times: [
                        '2022-07-15T00:23:30.813079',
                        '2022-07-16T00:23:30.813083',
                        '2022-07-17T00:23:30.813089',
                    ],
                    expectation: [0.2, 0.4, 0.6],
                    pp10: [0.02, 0.15, 0.25],
                    pp90: [0.4, 0.6, 1],
                    vmin: 0,
                    vmax: 1,
                },
                patterns: [
                    {
                        direction: 'up',
                        magnitude: 1,
                        factors: [
                            {
                                factor_id:
                                    '110a74a8-7420-410a-b2fa-cb1860c2a8f0',
                                name: 'eating gluten',
                            },
                        ],
                        p_str: 'There is evidence that eating gluten improves your hypertension.',
                    },
                ],
            },
        ],
    ],
}
