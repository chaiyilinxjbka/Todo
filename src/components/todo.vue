<template>
<div>
	<div class="form-group">
	<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">ToDo</b-navbar-brand>

 

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form>
        <b-form-input v-model=searchinfo @key.enter="searchbytext" size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" v-model=searchinfo @click="searchbytext" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown text="事项" right>
        <b-dropdown-item @click="showModal">新建事项</b-dropdown-item>
      
     
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
       
        <b-dropdown-item href="index.html">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
	</div>
	<b-modal ref="myModalRef" hide-footer title="新建事项">
    <div class="d-block text-center">
      <b-form-input v-model="newText" type="text" placeholder="请输入" @keyup.enter="addItem"></b-form-input>

		<datepicker v-model="newdate" placeholder="点击选择时间" style="margin-left:120px"></datepicker>

    </div>
    <b-btn class="mt-3" variant="success" block @click="addItem"><a href="#">确定</a></b-btn>
  </b-modal>

  <table class="table table-striped">
	    <thead>
	    <tr>
	    	<th>标记完成</th>
        <th>事项名称</th>
        <th>截止日期</th>
        <th>点击编辑</th>
        <th>点击删除</th>
	    </tr>
	    </thead>
	    <tbody>
	    <tr v-for="(item,index) in items">
	        <td>
	        	<input  v-model="item.isfinished"  class="form-check-input" type="checkbox" value="option1">
	        </td>
	        <td>
	        	<span v-if="!isupdate&&item.isfinished" style="text-decoration:line-through;color:blue" >{{item.text}}</span>
			    <span v-if="!isupdate&&!item.isfinished">{{item.text}}</span>
	        	<span v-if="isupdate">
	        		<input @keyup.enter="isupdate = false" type="text" name="" value="item.text" v-model="item.text">
	        	</span>
	        </td>
			<span v-if="!isupdate&&item.isfinished" style="text-decoration:line-through;color:blue" >{{item.date}}</span>
	        <td v-if="!isupdate&&!item.isfinished">{{ item.date }}</td>
			<td v-if="isupdate" @keyup.enter="item.date=getDate(new Date(item.date));isupdate=false">
			<datepicker  v-model="item.date" placeholder="点击选择时间" style="margin-left:120px">
			</datepicker>
			</td>
			<td>
	        	<button class="btn btn-outline-success" @click="isupdate='ture'">编辑</button>
	        </td>
	        <td>
	        	<button class="btn btn-warning" @click="deleteItem(item.text)">删除</button>
	        </td>
	    </tr>
	    </tbody>
	</table>

   
</div>

</template>

<script>
import bus from '../assets/eventBus'
import Datepicker from 'vuejs-datepicker'
const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.text).includes(toLower(term)))
  }
  return items
}

export default {

data() {
		return {
			title: 'all',
			newText: '',
			newdate: '',
			selected: '请选择清单',
			items: [],
			searchinfo: '',
			isupdate: false
		}
	},
	created() {
    this.init();
  },
	computed: {
		lists() {
			return this.$store.getters.lists;
		}
	},
	components: {
    Datepicker
  },
	methods: {
		init() {
			if (this.title === 'all') {
				this.items = this.$store.getters.items
			}else {
				this.items = this.$store.getters.getItemsbytitle(this.title);
			}
		},
		showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
		addItem() {
			let newItem = {
				text: this.newText,
				date: this.getDate(new Date(this.newdate)),
				belongto: this.title,
				isfinished: false,
				isupdate:false
			}
			console.log(newItem.belongto)
			this.$store.commit('addItem', newItem);
			this.newText  ="";
			this.hideModal();
		},
		deleteItem(text) {
      this.$store.commit('deleteItem', text);
      this.init()
    },
    searchbytext() {
    	this.items = searchByName(this.$store.getters.items, this.searchinfo);
		},
	
		getDate(date){
			var y=date.getFullYear();
			var m=date.getMonth()+1;
			var d=date.getDate();
			return y+'-'+m+'-'+d;
		},
	},
	mounted() {
    var self = this;
    bus.$on('LIstTitle', function(msg) {
        self.title = msg;
        self.init()
    });
  }

}

</script>

<style>


</style>

