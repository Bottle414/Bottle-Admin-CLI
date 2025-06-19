import type { ExtractPropTypes, PropType } from 'vue'

interface Column {
    prop: string
    label: string
}

export const excelButtonProps = {
    data: Array as PropType<Record<string, any>[]>,
    columns: Array as PropType<Column[]>,
    fileName: String,
    sheetName: {
        type: String,
        default: 'Sheet1'
    },
    buttonText: String,
    useI18n: Boolean
}as const

export const excelButtonEmits = {
    'export-success': (fileName: string) => fileName,
    'export-error': (error: unknown) => error
}

export type ExcelButtonProps = ExtractPropTypes<typeof excelButtonProps>