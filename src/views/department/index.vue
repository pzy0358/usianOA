<template>
  <div class="container">
    <div class="app-container">
      <el-tree
        :data="departmentList"
        :props="defaultProps"
        :expand-on-click-node="false"
      >
        <template v-slot="{ data }">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            style="width: 100%; height: 40px"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4" style="text-align: right">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="handleCommand($event, data.id)">
                <span
                  class="rl-dropdown-link"
                >操作<i
                  class="el-icon-arrow-down el-icon--right"
                /></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="remove">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <add-dept
      ref="dept"
      :show-dialog.sync="showDialog"
      :current-node-id="currentNodeId"
      @updateDepartment="getDepartment"
    />
  </div>
</template>
<script>
import { getDepartmentApi, deleteDepartmentApi } from '@/api/department'
import { transListToTreeData } from '@/utils'
import addDept from './components/add-dept.vue'

export default {
  name: 'Department',
  components: { addDept },
  data() {
    return {
      departmentList: [],
      showDialog: false,
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      currentNodeId: null
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 点击下拉触发的方法
    handleCommand(command, id) {
      switch (command) {
        case 'add':
          this.currentNodeId = id
          this.showDialog = true
          break
        case 'edit':
          this.showDialog = true
          this.currentNodeId = id
          this.$nextTick(() => {
            this.$refs.dept.getDepartmentDetail()
          })
          break
        case 'remove':
          this.removeDepartment(id)
          break
      }
    },
    // 获取部门列表
    async getDepartment() {
      const res = await getDepartmentApi()
      console.log('res=>', res)
      this.departmentList = transListToTreeData(res, 0)
    },
    // 删除部门
    removeDepartment(id) {
      this.$confirm('你确定要删除吗').then(async() => {
        await deleteDepartmentApi(id)
        this.$message.success('删除成功')
        this.getDepartment()
      })
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 40px;
  font-size: 14px;
}
.tree-manager {
  min-width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
