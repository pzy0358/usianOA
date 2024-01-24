<template>
  <div class="container">
    <div class="app-container">
      <el-button
        type="primary"
        size="mini"
        @click="addRole"
      >添加角色</el-button>
      <el-table :data="roleList" border style="width: 100%; margin-top: 10px">
        <el-table-column type="index" align="center" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="角色" />
        <el-table-column align="center" prop="state" label="启用">
          <template v-slot="{ row }">
            {{ row.state | stateFilter }}
            <template />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pagesize"
        :current-page="page"
        @current-change="changePage"
      />
    </div>

    <!-- 新增弹框 -->
    <el-dialog
      title="新增角色"
      :visible.sync="showDialog"
      width="500px"
      @close="close"
    >
      <el-form ref="roles" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch
            v-model="form.state"
            size="mini"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleListApi, addRoleApi } from '@/api/role'

export default {
  name: 'Role',
  filters: {
    stateFilter(state) {
      switch (state) {
        case 1:
          return '已启用'
        case 0:
          return '未启用'
        default:
          return '无'
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        state: 1,
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色信息不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      roleList: [],
      page: 1, // 第⼏⻚
      pagesize: 5, // 每⻚多少条
      total: 0,
      showDialog: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    changePage(page) {
      this.page = page
      this.getRoleList()
    },
    async getRoleList() {
      const res = await getRoleListApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.roleList = res.rows
      this.total = res.total
    },
    addRole() {
      this.showDialog = true
    },
    close() {
      this.showDialog = false
      this.form = {}
    },
    confirmAdd() {
      this.$refs.roles.validate(async(valid) => {
        if (valid) {
          const res = await addRoleApi(this.form)
          console.log('1', res)
          this.$message.success('添加角色成功')
          this.close()
          this.getRoleList()
          this.page = 1
        }
      })
    }
  }
}
</script>
