<template>
  <div>
    <h4 v-if="tasks.length">Список задач</h4>
    <div v-if="tasks.length" class="row" style="margin-top: 40px;">
      <div class="col s12 m6">
        <div class="input-field"> 
          <i class="material-icons prefix">search</i>
          <input id="search" v-model="search" type="text">
          <label for="search">Поиск</label>
        </div>
      </div>
      <div class="col s12 m6">
        <div class="input-field">
          <select ref="select" v-model="filter">
            <option value="" disabled selected>Выбрать</option>
            <option value="working">Активные</option>
            <option value="outdated">Устаревшие</option>
            <option value="completed">Завершенные</option>
          </select>
          <label>Поиск по статусу</label>
        </div>
        <button v-if="filter" class="btn-small grey darken-1" @click="filter = null">Очистить фильтр</button>
      </div>
    </div>
    <table v-if="tasks.length" class="striped responsive-table" style="margin-top: 30px; border-spacing: 0 5px; border-collapse: separate;">
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Дата</th>
        <th>Описание</th>
        <th>Статус</th>
        <th>Изменить</th>
        <th>Удалить</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in displayTasks" :key="task.id">
        <td>{{index + 1}}</td>
        <td>{{task.title}}</td>
        <td>{{new Date(task.date).toLocaleDateString()}}</td>
        <td class="td">
          <div class="text">{{task.description}}</div>
        </td>
        <td :class="`${task.status}`">{{task.status}}</td>
        <td>
          <router-link tag="button" class="btn-small" :to="'/task/' + task.id">
            Edit<i class="material-icons right">edit</i>
          </router-link>
        </td>
        <td>
          <button class="btn-small red accent-3" type="button" @click="deleteTask(task.id)">
            <i class="material-icons">delete</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <h4 v-else style="margin-top: 30px;">На данный момент нет никаких заданий</h4>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: null,
    search: null
  }),
  methods: {
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id)
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    displayTasks() {
      return this.tasks.filter(todo => {
        if (!this.search && !this.filter) {
          return true
        }
        if (!this.search && this.filter) {
          return (todo.status === this.filter)
        }
        if (this.search && !this.filter) {
          return (todo.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
        }
        if (this.search && this.filter) {
          return (todo.status === this.filter && todo.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
        }
      })
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select)
  }
}
</script>

<style scoped>
.td {
  max-width: 400px;
}
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.working{
  border-left: 4px solid #4b3cd1;
}
.outdated{
  border-left: 4px solid #ffaa2c; 
}
.completed{
  border-left: 4px solid #f83e70;
}
</style>