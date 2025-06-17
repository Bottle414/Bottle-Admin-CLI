export const pieOption = {
    title: {
        text: '标题',
        subtext: '副标题',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '图例',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: '部分一' },
                { value: 735, name: '部分二' },
                { value: 580, name: '部分三' },
                { value: 484, name: '部分四' },
                { value: 300, name: '部分五' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
    color: [
        '#cad3f4',
        '#4f9bfa',
        '#90c050',
        '#6f9081',
        '#ffa611'
    ]
}