<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="sxh" :rules="rules" ref="sxhFrom" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="sxh.name"></el-input>
      </el-form-item>
      <el-form-item label="城市：" prop="city">
        <el-input v-model="sxh.city"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input v-model="sxh.address"></el-input>
      </el-form-item>
      <el-form-item label="容量：" prop="capacity">
        <el-input v-model="sxh.capacity"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker type="datetime"  v-model="sxh.startTime" value-format="yyyy-MM-dd'T'HH:mm:ss'Z'" placeholder="选择开始时间" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <el-date-picker type="datetime"  v-model="sxh.endTime" value-format="yyyy-MM-dd'T'HH:mm:ss'Z'" placeholder="选择结束时间" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注：" prop="note">
        <el-input v-model="sxh.note"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('sxhFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('sxhFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createSxh} from '@/api/shuangXuanHui'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSxh={
    name: '',
    city: '',
    address: '',
    capacity: 100,
    startTime: '',
    endTime: '',
    note: '',
    status: 1,
    applyNumber: 0,
  };
  export default {
    name: 'SxhDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        sxh:Object.assign({}, defaultSxh),
        rules: {
          name: [
            {required: true, message: '请输入双选会名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请输入城市', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          capacity: [
            {required: true, message: '请输入双选会容量', trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '请选择开始日期', trigger: 'blur'}
          ],
          endTime: [
            {required: true, message: '请选择结束日期', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        // getBrand(this.$route.query.id).then(response => {
        //   this.brand = response.data;
        // });
        console.log("isEdit true");
      }else{
        this.sxh = Object.assign({},defaultSxh);
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
                updateBrand(this.$route.query.id, this.brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSxh(this.sxh).then(response => {
                  this.$refs[formName].resetFields();
                  this.sxh = Object.assign({},defaultSxh);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
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
        this.sxh = Object.assign({},defaultSxh);
      }
    }
  }
</script>
<style>
</style>


