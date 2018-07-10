<template>
	<div>

		<b-modal ref="myModalRef" hide-footer title="新建menus">
	    <div class="d-block text-center">
	      <b-form-input v-model="newtitle" type="text" placeholder="输入事项名称" @keyup.enter="addList"></b-form-input>
	    </div>
	    <b-btn class="mt-3" variant="secondary" block @click="addList"><a href="#">确定</a></b-btn>
	  </b-modal>
		<b-list-group>

			<b-list-group-item href="#" class="list-style"  @click='goList("all")'>
		  	我的一天
		  </b-list-group-item>

		  <b-list-group-item href="#" class="list-style" v-for="list in lists" @click="goList(list.title)">
		  	{{ list.title }}
		  </b-list-group-item>

		  <b-list-group-item href="#">
		  	<input type="text" v-model="newtitle" name="" v-if="isAdd" @keyup.enter="addList">
		  </b-list-group-item>

		  <b-list-group-item href="#" class="list-style" @click="showModal">
		  	+新建清单
		  </b-list-group-item>

		</b-list-group>
	</div>
</template>

<script>
import bus from '../assets/eventBus'

export default{
	data() {
		return {
			name: 'xc',
			newtitle: '',
			isAdd: false
		}
	},
	computed: {
		lists() {
			return this.$store.getters.lists;
		}
	},
	methods: {
		addList() {
			let newList = {
				title: this.newtitle,
				count: 0
			}
			this.$store.commit('addList', newList)
			this.newtitle = "";
			this.isAdd = false
		},
		goList(title) {
      bus.$emit('LIstTitle', title)
    },
		showModal () {
      this.$refs.myModalRef.show()
    },

	}
}

</script>

<style>
.list-style {
	background:#283643;
	color: blue;
}


</style>
