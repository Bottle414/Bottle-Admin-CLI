<template>
    <el-button icon="Upload" type="success" @click="handleExport">
        {{ buttonText || $t('export.excel') }}
    </el-button>
</template>

<script lang="ts" setup>
    import * as XLSX from 'xlsx'
    import { onMounted } from 'vue'
    import { excelButtonProps, excelButtonEmits } from './excelButton'

    const props = defineProps(excelButtonProps)

    const emit = defineEmits(excelButtonEmits)

    let t = (s: string) => s // 默认直接返回 key

    onMounted(async () => {
        if (props.useI18n) {
            try {
                const i18n = await import('vue-i18n')
                t = i18n.useI18n().t
            } catch (e) {
                console.warn('i18n load failed:', e)
            }
        }
    })

    function handleExport() {
        if (!props.data || !props.columns || props.columns.length === 0) return

        const headerMap = Object.fromEntries(
            props.columns.map((col) => [col.prop, t(col.label)])
        )

        const exportData = props.data.map((row) => {
            const newRow: Record<string, any> = {}
            for (const key in headerMap) {
                newRow[headerMap[key]] = row[key]
            }
            return newRow
        })

        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, props.sheetName)

        const time = new Date().toLocaleString().replace(/[/:\s]/g, '-')
        const fileName = props.fileName || `export-${time}.xlsx`

        try {
            XLSX.writeFile(wb, fileName)
            emit('export-success', fileName)
        } catch (e) {
            emit('export-error', e)
        }
    }
</script>

<style scoped></style>
