<template>
  <div class="login">
    <el-card style="border-radius: 15px">
      <el-row type="flex" justify="space-around">
        <el-col :span="2" style="font-size: 24px"><i class="el-icon-eleme"  /></el-col>
        <el-col :span="20" style=" font-size: 24px">Student Information System</el-col>
      </el-row>
        <el-form :model="ruleForm" :rules="rules"
               ref="ruleForm" class="login-form">
        <el-form-item label="Username" prop="pass">
          <el-input type="text" v-model="ruleForm.pass" />
        </el-form-item>
        <el-form-item label="Password" prop="checkPass">
          <el-input type="password" show-password
                    v-model="ruleForm.checkPass"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="submitForm()" style="width: 100%; font-size: 20px; margin-top: 40px">
            <i class="el-icon-arrow-right"></i>
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the username'));
      }else{
        return callback()
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the password'));
      }else{
        return callback()
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePassword, trigger: 'blur'}
        ]
      },
    };
  },
  methods: {
     submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid)
          this.$router.replace({path: '/hotel-key-table'})
         else
          return false;
      });
          }
      },
    }

</script>
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>