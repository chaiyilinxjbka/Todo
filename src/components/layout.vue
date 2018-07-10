<template>
<div>
  <b-container fluid>
      <b-row>
        <b-col class="menus" sm="3">
          <menus></menus>
        </b-col>
        <b-col class="todo-content" sm="9">
          <todo></todo>
        </b-col>
      </b-row>
  </b-container>
</div>


</template>

<script>
import todo from './todo'
import menus from './menus'

export default {

  data() {

  },
  components: {
    todo,
    menus
  }

}


</script>

<style>


.menus {
  background: #283643;
  height: 740px
}

.todo-content {
  background: #f3f3f3;
}
</style>
