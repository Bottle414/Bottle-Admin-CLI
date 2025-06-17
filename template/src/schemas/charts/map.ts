export const mapOption = {
    geo: {
        map: 'china',
        roam: true
    },
    series: [
        {
            type: 'lines',
            data: [
                {
                    coords: [
                        [112, 40],
                        [109, 30]
                    ],
                    lineStyle: {
                        color: 'orange',
                        width: 1
                    },
                    effect: {
                        show: true,
                        symbol: 'rect'
                    }
                }
            ]
        }
    ],
    grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
}
