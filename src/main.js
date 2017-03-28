import 'todomvc-app-css/index.css';   //引入CSS文件
import Vue from 'vue';    //引入Vue

let filters = {
  all (todoList) {
    return todoList
  },
  active (todoList) {
    return todoList.filter((ele)=>{
      return !ele.check
    })
  },
  completed (todoList) {
    return todoList.filter((ele)=>{
      return ele.check
    })
  }
}

let app = new Vue({
  el:'.todoapp',
  data:{
    title:'ToDoList',
    todoList:[],
    newTodo:'',
    check:false,
    todoSave:'',
    editedTodo:null,
    mod:'all'
  },
  computed:{
    spare(){
      return filters.active(this.todoList).length;
    },
    isAll:{
      get(){
        if(!this.todoList.length)return false;
        return this.spare === 0
      },
      set(val){
        this.todoList.forEach((ele)=>{
          ele.check = val
        })
      }
    },
    filteredTodo(){
      return filters[this.mod](this.todoList)
    }
  },
  methods:{
    addList(){
      if(!this.newTodo)return;
      this.todoList.unshift({
        cont:this.newTodo,
        check:false
      });
      this.newTodo = '';
    },
    deleFn(index){
      this.todoList.splice(index,1)
    },
    allFn(ev){
      this.check = !this.check;
      ev.target.previousElementSibling.checked = this.check;
      this.todoList.forEach((ele)=>{
        ele.check = this.check
      })
    },
    editFn(todo){
      this.todoSave = todo.cont;
      this.editedTodo = todo;
    },
    commitFn(todo,index){
      this.editedTodo = null;
      if(!todo.cont) {
        this.deleFn(index)
      }
    },
    cancelFn(todo){
      this.editedTodo = null;
      todo.cont = this.todoSave;
    },
    clearFn(){
      this.todoList = filters.active(this.todoList)
    }
  },
  directives:{
    focus(ele,value){
      if(value)ele.focus()
    }
  }
})
function modChange () {
  let mod = location.hash.replace(/#\/?/,'');
  if (filters[mod]) {
    app.mod = mod;
  }else{
    location.hash = '';
    app.mod = 'all';
  }
}
window.addEventListener('hashchange',modChange)
