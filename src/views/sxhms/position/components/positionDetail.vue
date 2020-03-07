<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="position" :rules="rules" ref="positionFrom" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="position.name"></el-input>
      </el-form-item>
      <el-form-item label="城市：" prop="city">
        <el-input v-model="position.city"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="introduce">
        <el-input v-model="position.introduce"></el-input>
      </el-form-item>
      <el-form-item label="人数：" prop="number">
        <el-input v-model="position.number"></el-input>
      </el-form-item>
      <el-form-item label="要求：" prop="requirement">
        <el-input v-model="position.requirement"></el-input>
      </el-form-item>
      <el-form-item label="薪水：" prop="salary">
        <el-input v-model="position.salary"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('positionFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('positionFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createPosition, updatePosition} from '@/api/position'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultPosition={
    name: '',
    companyId: null,
    city: '',
    introduce: '',
    number: null,
    requirement: '',
    salary: null,
  };
  export default {
    name: 'PositionDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        position: Object.assign({}, defaultPosition),
        rules: {
          name: [
            {required: true, message: '请输入岗位名称', trigger: 'blur'},
          ],
          city: [
            {required: true, message: '请输入城市', trigger: 'blur'}
          ],
          introduce: [
            {required: true, message: '请输入岗位介绍', trigger: 'blur'}
          ],
          number: [
            {required: true, message: '请输入招聘人数', trigger: 'blur'}
          ],
          requirement: [
            {required: true, message: '请输入岗位要求', trigger: 'blur'}
          ],
          salary: [
            {required: true, message: '请输入岗位薪水', trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      if (this.isEdit) {
        this.position = this.$route.query.position;
      }else{
        this.position = Object.assign({},defaultPosition);
        this.position.companyId = this.$route.query.companyId;
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updatePosition(this.position).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createPosition(this.position).then(response => {
                  this.$refs[formName].resetFields();
                  this.position = Object.assign({},defaultPosition);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
                // console.log(this.sxh);
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.company = Object.assign({},defaultCompany);
      }
    }
  }
</script>
<style>
</style>


