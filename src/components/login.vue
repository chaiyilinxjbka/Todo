<template>

<div class="app-location">
  <b-modal ref="myModalRef" hide-footer title="login failed">
    <div class="d-block text-center">
      信息输入有误！
    </div>
    <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">确定</b-btn>
  </b-modal>
	<div id="login">
	<h1>登录</h1>	
	<form action="">
		<p><input placeholder="用户名"  type="text" value="用户名"  onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'text';}" v-model="username" id="user"></p>
		<p><input  placeholder="密码"  type="password" value="Password" v-model="password" id="pwd" ></p>
		  <button class="btn btn-primary" @click="checkLogin">登录</button>
	</form>
</div>

	
    <div class="clear"></div>

</div>

</template>

<script>

export default{
  data() {
    return {
      username: '请输入名字',
      password: '',
      isLogin: false
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    checkLogin() {
        if ( this.username === 'chaiyilin' && this.password === '123456') {
          this.$router.push('/todo');
        }else {
          this.showModal();
        }
      }
  },
  created() {
    let user = {
        username: 'chaiyilin',
        password: '123456'
      };
      this.$store.commit('addUser', user);
      this.$store.commit('setLogin', false)
  }
}

</script>

<style>

body,p,div,ul,li,h1,h2,h3,h4,h5,h6{
		margin:0;
		padding: 0;
	}
	body{
		background:url(../images/1120.jpg) rgba(0,0,0,.1) no-repeat;
		background-size:100%;
	}
	#login{
		width: 400px;
		height: 250px;
		background: #FFF; 
		margin:200px auto;
		position: relative;
	}
	#login h1{
		text-align:center;
		position:auto;
		left:120px;
		top:-40px;
		font-size:21px;
	}
	#login form p{
		text-align: center;
	}
	#user{
		background:url(../images/user.png) rgba(0,0,0,.1) no-repeat;
		width: 200px;
		height: 30px;
		border:solid #ccc 1px;
		border-radius: 3px;
		padding-left: 32px;
		margin-top: 50px;
		margin-bottom: 30px;
	}
	#pwd{
		background: url(../images/pwd.png) rgba(0,0,0,.1) no-repeat;
		width: 200px;
		height: 30px;
		border:solid #ccc 1px;
		border-radius: 3px;
		padding-left: 32px;
		margin-bottom: 30px;
	}
	#submit{
		width: 232px;
		height: 30px;
		background: rgba(0,0,0,.1);
		border:solid #ccc 1px;
		border-radius: 3px;
	}
	#submit:hover{
		cursor: pointer;
		background:#D8D8D8;
	}
input:focus { box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2); }

</style>
