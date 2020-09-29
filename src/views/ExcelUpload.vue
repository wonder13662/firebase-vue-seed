<template>
  <div>
    <v-file-input label="Excel File Input" @change="change"></v-file-input>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  methods: {
    // TODO 샘플 Excel 파일 다운로드
    change(file) {
      // https://github.com/sheetjs/sheetjs#parsing-workbooks
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, {type: 'array'})
        // https://github.com/sheetjs/sheetjs#working-with-the-workbook
        const first_sheet_name = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[first_sheet_name]
        // https://github.com/sheetjs/sheetjs#json
        // const json = XLSX.utils.sheet_to_json(worksheet, {header:1})
        const json = XLSX.utils.sheet_to_json(worksheet)
        console.log('json:', json)
      }
      reader.readAsArrayBuffer(file)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
