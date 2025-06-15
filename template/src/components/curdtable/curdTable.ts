import type { PropType } from 'vue'

export type TableColumn = {
    prop: string
    label: string
    width?: string
    align?: 'left' | 'center' | 'right'
    sortable?: boolean
}

export const curdTableProps = {
    data: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    rowSelection: {
        type: Boolean,
        default: false
    },
    alignCenter: {
        type: Boolean,
        default: true
    },
    rowKey: {
        type: String,
        default: 'id'
    },
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 10
    },
    pageSizes: {
        type: Array as PropType<number[]>,
        default: () => [5, 10, 20, 50, 100]
    },
    total: {
        type: Number,
        default: 0
    }
}
