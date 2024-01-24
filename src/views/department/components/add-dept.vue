<template>
  <el-dialog
    :before-close="close"
    title="新增部门"
    :visible.sync="showDialog"
    width="50%"
    @close="close"
  >
    <el-form ref="dialogform" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" type="text" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" type="text" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="form.managerId" placeholder="请选择">
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :value="item.id"
            :label="item.username"
            placeholder="请选择负责人"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          type="textarea"
          :rows="2"
          placeholder="1-100个字符"
        />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary" @click="add">确定</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getDepartmentApi,
  getManagerApi,
  addDepartmentApi,
  getDepartmentDetailApi,
  updateDepartmentApi
} from '@/api/department'

export default {
  props: {
    showDialog: {
      type: Boolean,
      showDialog: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '部门名称2-10个字符',
            trigger: 'blur'
          },
          {
            validator: async(rule, value, callback) => {
              let departmentList = await getDepartmentApi()

              if (this.form.id) {
                departmentList = departmentList.filter(
                  (item) => item.name !== value
                )
              }

              if (departmentList.some((item) => item.name === value)) {
                callback(new Error('部门名称已存在'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入部门编码',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '部门编码2-10个字符',
            trigger: 'blur'
          },
          {
            validator: async(rule, value, callback) => {
              // 获取当前部门列表
              let departmentList = await getDepartmentApi()
              if (this.form.id) {
                departmentList = departmentList.filter(
                  (item) => item.code !== value
                )
              }
              if (departmentList.some((item) => item.code === value)) {
                callback(new Error('部门编码已存在'))
              } else {
                callback
              }
            }
          }
        ],
        managerId: [
          {
            required: true,
            message: '请选择部门负责人',
            trigger: 'change'
          }
        ],
        introduce: [
          {
            required: true,
            message: '请输入部门介绍',
            trigger: 'blur'
          }
        ]
      },
      managerList: []
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // 关闭的时候重新设置表单
      this.form = {
        // 部门名称
        name: '',
        // 部门编码
        code: '',
        // 部门负责人
        managerId: '',
        // 部门介绍
        introduce: '',
        // 父部门id
        pid: ''
      }
      this.$refs.dialogform.resetFields()
      this.showDialog = false
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      const res = await getManagerApi()
      this.managerList = res
    },
    add() {
      this.$refs.dialogform.validate(async(valid) => {
        if (valid) {
          let msg = '新增'

          if (this.form.id) {
            await updateDepartmentApi(this.currentNodeId, this.form)
            msg = '编辑'
          } else {
            this.form.pid = this.currentNodeId
            // 调用接口
            await addDepartmentApi(this.form)
          }

          this.close()
          this.$message.success(msg + '部门成功')
          // 通知父组件重新获取列表
          this.$emit('updateDepartment')
        }
      })
    },
    async getDepartmentDetail() {
      const res = await getDepartmentDetailApi(this.currentNodeId)
      this.form = res
    }
  }
}
</script>

<style lang="scss" scoped></style>
