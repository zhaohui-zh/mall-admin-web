<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="company" :rules="rules" ref="companyFrom" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="company.name"></el-input>
      </el-form-item>
      <el-form-item label="规模：" prop="size">
        <el-input v-model="company.size"></el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="profile">
        <el-input v-model="company.profile "></el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="property">
        <el-select v-model="company.property" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('companyFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('companyFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createCompany, updateCompany} from '@/api/company'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultCompany={
    name: '',
    sxhId: null,
    profile: '',
    property: null,
    size: null,
  };
  export default {
    name: 'CompanyDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        company: Object.assign({}, defaultCompany),
        rules: {
          name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
          ],
          size: [
            {required: true, message: '请输入公司规模', trigger: 'blur'}
          ],
          profile: [
            {required: true, message: '请输入公司简介', trigger: 'blur'}
          ],
          property: [
            {required: true, message: '请选择公司性质', trigger: 'blur'}
          ],
        },
        options: [{
          value: 0,
          label: '国企'
        }, {
          value: 1,
          label: '私企'
        }, {
          value: 2,
          label: '外企'
        }, {
          value: 3,
          label: '其他'
        }],
      }
    },
    created() {
      if (this.isEdit) {
        this.company = this.$route.query.company;
      }else{
        this.company = Object.assign({},defaultCompany);
        this.company.sxhId = this.$route.query.sxhId;
        // this.company.property = 0;
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
                updateCompany(this.company).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createCompany(this.company).then(response => {
                  this.$refs[formName].resetFields();
                  this.company = Object.assign({},defaultCompany);
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


