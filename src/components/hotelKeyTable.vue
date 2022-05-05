<template>
  <div>
    <el-container>
      <el-header>
        <ul class="flex-container space-between">
          <div style="position:absolute; top: 10px;">
            <el-row type="flex" :gutter="20">
              <el-col :span="6" style="font-size: 50px"><i class="el-icon-eleme"  /></el-col>
              <el-col>Student Information System</el-col>
            </el-row>
          </div>
          <li>
            <div style="position:absolute; top: 10px; right: 10px;">
            <div style="display: inline-block">
              <i class="el-icon-user-solid" style="font-size: 50px" />
            </div>
            <div style="display: inline-block">
              Jhon Doe  <br><el-link type="primary">Logout</el-link>
            </div>
            </div>
          </li>
        </ul>
        <el-tabs type="card" style="margin-top: 10px">
          <el-tab-pane label="User" />
          <el-tab-pane label="Config" />
          <el-tab-pane label="Role" />
          <el-tab-pane label="Task" />
        </el-tabs>

      </el-header>
      <el-main>
        <el-row style="margin-bottom: 30px"
                type="flex" class="row-bg" justify="space-between">
        <el-col :span="8" :offset="2">
         <el-input align="left"
           v-model="search" type="search"
           placeholder="Type to search" >
           <i slot="prefix" class="el-input__icon el-icon-search" />
         </el-input>
        </el-col>
          <el-col :span="5">
            <el-button style="background: #f5f7fa">Register New Student</el-button>
          </el-col>
        </el-row>
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <el-table
            :data="filteredProjects"
            size="medium" border stripe >
          <el-table-column
              prop="index" style="background: gray"
              label="Index"/>
          <el-table-column
              label="Name"
              prop="name"
              sortable
          />
          <el-table-column
              label="DoB"
              prop="date" />
          <el-table-column
              prop="municipality"
              label="Municipality" />
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
      </el-main>
    </el-container>
    <el-dialog title="Edit User" :visible.sync="dialogFormVisible" center width="40%"
               destroy-on-close>
      <el-form :model="editForm" style="margin-bottom: 50px; padding: 20px 30px" ref="editForm"
               label-position="left" :rules="rules">
        <el-row>
          <el-col :span="16">
            <el-form-item label="Index" :label-width="formLabelWidth">
              <el-input readonly v-model="editForm.index" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="Name" :label-width="formLabelWidth" prop="name">
              <el-input v-model="editForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
          <el-form-item label="Date of Birth" :label-width="formLabelWidth" prop="dateOfBirth">
            <el-date-picker
                v-model="editForm.dateOfBirth"
                type="date"
                placeholder="Pick a day"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        </el-row>
        <el-col :span="16">
            <el-form-item label="Municipality" :label-width="formLabelWidth">
              <el-select v-model="editForm.municipality">
                <el-option v-for="data in tableData" :key="data.index"
                            v-model="data.municipality"
                >
                  {{ data.municipality }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer" style="display: flex; justify-content: end">
          <el-button @click="cancelForm(editForm)">Cancel</el-button>
          <el-button type="primary" @click="saveForm()">Safe</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="deleteDialog" title="Delete Confirmation" width="31%">
      <hr>
      <div style="font-size: 16px; color: black; padding: 30px;">
        Are you sure you want to delete the Selected User ?
      </div>
        <div style="display: flex; justify-content: end; border-top: 1px solid black;">
        <div style="margin: 10px">
          <el-button icon="el-icon-delete" @click="deleteDialog = false">Cancel</el-button>
          <el-button type="primary" @click="deleteUser()" icon="el-icon-success">Yes</el-button>
         </div>
      </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'hotelKeyTable',
  data() {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };
    let validateDateOfBirth = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('Please input the date'));
      }  else {
        callback();
      }
    };
    return {
      rawTableData: [{
        index: '12987122',
        name: 'Tom Tucker',
        date: '2016-05-03',
        municipality: 'Kolovice'
      }, {
        index: '14487122',
        name: 'Jack Jones',
        date: '2017-05-02',
        municipality: 'Frezaj'
      }, {
        index: '129255522',
        name: 'Zack Parker',
        date: '2018-05-04',
        municipality: 'Kuwait'
      }, {
        index: '12387122',
        name: 'Amir Hoxha',
        date: '2019-05-01',
        municipality: 'Prishtina',
      },
        {
          index: '12987444',
          name: 'Mergim Bajrami',
          date: '2016-05-03',
          municipality: 'Dardani'
        }, {
          index: '12345678',
          name: 'Blerta Rexhepi',
          date: '2017-05-02',
          municipality: 'Frezaj'
        }, {
          index: '87654321',
          name: 'Abdullah Krasniqi',
          date: '2018-05-04',
          municipality: 'Kuwait'
        }, {
          index: '98765402',
          name: 'Sami Salihu',
          date: '2019-05-01',
          municipality: 'Prishtina'
        }],
      formLabelWidth: '150px',
      tableData: [],
      search: '',
      activeIndex: '1',
      dialogFormVisible: false,
      deleteDialog: false,
      editForm:{
        index: '',
        name: '',
        dateOfBirth: '',
        municipality: '',
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        dateOfBirth: [
          { validator: validateDateOfBirth, trigger: 'blur' }
        ],
      }
    }
  },
  beforeMount() {
    localStorage.setItem("tableData", JSON.stringify(this.rawTableData))
    this.tableData = JSON.parse(localStorage.getItem("tableData"))
  },
  methods: {
    deletedUserAlert() {
      this.$notify.success({
        title: 'Success',
        message: 'User was deleted successfully',
        showClose: false
      });
    },
    editUserAlert() {
      this.$notify.success({
        title: 'Success',
        message: 'User Was Updated Successfully',
        showClose: false
      });
    },
    handleEdit(index, row) {
      this.editForm.index = row.index
      this.editForm.name = row.name
      this.editForm.dateOfBirth = row.date
      this.editForm.municipality = row.municipality
      this.dialogFormVisible = true;
      localStorage.setItem("editRow", row.index)
    },
    saveForm(){
      this.$refs["editForm"].validate((valid) => {
        if (valid){
          this.dialogFormVisible = false
          const index = this.tableData.findIndex(object => {
            return object.index === localStorage.getItem("editRow");
          });
          this.tableData[index].name = this.editForm.name
          this.tableData[index].date = this.editForm.dateOfBirth
          this.tableData[index].municipality = this.editForm.municipality
          localStorage.setItem("tableData", JSON.stringify(this.tableData))
          this.editUserAlert();
        }
        else
          return false;
      });
    },
    handleDelete(index, row) {
      this.deleteDialog = true
      localStorage.setItem("row", row.index)
    },
    deleteUser(){
      const index = this.tableData.findIndex(object => {
        return object.index === localStorage.getItem("row");
      });
      if(this.tableData.splice(index, 1))
      this.deletedUserAlert();
      localStorage.setItem("tableData", JSON.stringify(this.tableData))
      this.deleteDialog = false
    },
    cancelForm(obj){
      this.dialogFormVisible = false
      for (const key in obj) {
        obj[key] = "";
      }
    }
  },
  computed:{
    filteredProjects(){
      return this.tableData.filter((obj) => {
        return obj.index.toLowerCase().includes(this.search.toLowerCase()) ||
            obj.name.toLowerCase().includes(this.search.toLowerCase()) ||
            obj.municipality.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
}
</script>
<style>
input[type="search"]{
  border-radius: 25px;
}
.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}
.space-between {
  justify-content: space-between;
}
hr {
  border: 0;
  height: 1px;
  background-color: black;
}
.el-dialog__header{
  padding: 20px 20px 0 5px !important;
}
.el-dialog__body{
  padding: 0 !important;
}
</style>