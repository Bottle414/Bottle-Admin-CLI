import * as XLSX from 'xlsx';

function exportExcel(data: any, fileName = '垃圾系统职员表.xlsx') {
    // 创建一个工作簿
    const ws = XLSX.utils.json_to_sheet(data); // 将 JSON 数据转换为工作表 得到
    const wb = XLSX.utils.book_new(); // 创建一个新的工作簿
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 将工作表添加到工作簿

    // 将工作簿写入到文件
    XLSX.writeFile(wb, fileName); // 触发文件下载
}

export default exportExcel