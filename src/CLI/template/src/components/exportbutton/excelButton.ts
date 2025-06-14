import type { ExtractPropTypes, PropType } from 'vue'

interface Column {
    prop: string
    label: string
}

export const excelButtonProps = {
    data: Array as PropType<Record<string, any>[]>,
    columns: Array as PropType<Column[]>,
    fileName: String,
    sheetName: String,
    buttonText: String,
    useI18n: Boolean
}as const

export type ExcelButtonProps = ExtractPropTypes<typeof excelButtonProps>