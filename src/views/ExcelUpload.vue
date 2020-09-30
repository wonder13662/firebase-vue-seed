<template>
  <div>
    <v-row
      align="left"
      justify="space-around">
      <v-btn
      depressed
      color="primary"
      @click="exportExcel">
        Primary
      </v-btn>
    </v-row>
    <v-row
      align="left"
      justify="space-around">
    <v-file-input label="Excel File Input" @change="change"></v-file-input>
    </v-row>
    <v-row>
      <v-simple-table v-if="items.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                이름
              </th>
              <th class="text-left">
                Email
              </th>
              <th class="text-left">
                그룹
              </th>
              <th class="text-left">
                팀
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.email"
            >
              <td>{{ item['이름'] }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item['그룹'] }}</td>
              <td>{{ item['팀'] }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data() {
    return {
      excelTemplate: {
        data: [['이름', 'email', '그룹', '팀']],
      },
      items: [],
    }
  },
  methods: {
    // TODO 업로드한 파일의 내역을 화면에 보여주기
    exportExcel() {
      console.log('exportExcel')
      // https://github.com/SheetJS/sheetjs/blob/master/demos/vue/pages/index.vue
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.excelTemplate.data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
      /* generate file and send to client */
      XLSX.writeFile(wb, 'excel_template.xlsx')
    },
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
        this.items = json
      }
      reader.readAsArrayBuffer(file)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
