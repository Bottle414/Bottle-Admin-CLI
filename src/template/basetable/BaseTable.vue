<template>
    <!-- 表头搜索栏 -->
    <div v-if="$slots.filters" class="base-table__filters">
        <slot name="filters" />
    </div>

    <!-- 工具栏插槽 -->
    <div v-if="$slots.toolbar" class="base-table__toolbar">
        <slot name="toolbar" />
    </div>

    <!-- 表身 -->
    <el-table
        :data="data"
        border
        :loading="loading"
        :row-key="rowKey"
        @selection-change="handleSelectionChange"
        v-bind="$attrs"
    >
        <el-table-column v-if="rowSelection" type="selection" width="45" />

        <el-table-column
            v-for="col in columns"
            :key="col.prop"
            :prop="col.prop"
            :label="$t(`labels.${col.label}`)"
            :width="col.width"
            :align="col.align || (alignCenter ? 'center' : 'left')"
            :sortable="col.sortable || false"
        >
            <template v-if="$slots[col.prop]" #default="{ row }">
                <slot :name="col.prop" :row="row" />
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="base-table__pagination">
        <slot name="pagination">
            <el-pagination
                v-if="showPagination"
                :current-page="currentPage"
                :page-size="pageSize"
                :page-sizes="pageSizes"
                :total="total"
                layout="prev, pager, next, jumper, ->, sizes, total"
                style="margin-top: 16px; text-align: right"
                @update:current-page="emit('update:currentPage', $event)"
                @update:page-size="emit('update:pageSize', $event)"
            />
        </slot>
    </div>
</template>

<script setup lang="ts">
    import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
    import { baseTableProps } from './baseTable'
    import { computed } from 'vue'

    const props = defineProps(baseTableProps)
    const emit = defineEmits([
        'update:currentPage',
        'update:pageSize',
        'selection-change'
    ])

    const showPagination = computed(() => props.total > 0)

    const handleSelectionChange = (val: any[]) => {
        emit('selection-change', val)
    }
</script>

<style scoped>
    .base-crud-table__filters {
        margin-bottom: 12px;
    }
</style>
