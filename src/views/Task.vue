<template>
  <div class="row">
    <div v-if="task" class="col s12 m6 offset-m3">
      <h4 style="margin-top: 60px;">{{ task.title }}</h4>
      <span v-for="tag in task.tags" :key="tag.id" style="font-size: 20px; font-weight: 400; margin-top: 20px; color: #01579b;">
        #{{ tag.tag }}
      </span>
      <form @submit.prevent="submitHandler" v-if="task.status !== 'completed'">
        <div class="input-field" style="margin-top: 100px;">
          <textarea v-model="description" id="description" class="materialize-textarea" style="min-height: 100px" maxlength="1024"></textarea>
          <label for="description">Описание</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/1024</span>
        </div>
        <input type="text" ref="datepicker">
        <div style="margin-top: 40px;">
          <button class="btn" type="submit" style="margin-right: 1rem;">Обновить</button>
          <button class="btn blue" type="button" @click="completeTask">Завершить</button>
        </div> 
      </form>
      <div v-else>
        <h5>{{ task.description }}</h5>
        <h5 style="margin-top: 40px;">{{new Date(task.date).toLocaleDateString()}}</h5>
        <h4 style="margin-top: 80px; color: #d50000 ;">Задание завершено</h4>
      </div>
    </div>
    <h4 v-else style="margin-top: 30px;">Задание не найдено</h4>
  </div>
</template>

<script>
export default {
  data: () => ({
    description: '',
    date: null
  }),
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id)
    }
  },
  mounted() {
    this.description = this.task.description
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    })
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date  
      })
      this.$router.push('/list')
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id)
      this.$router.push('/list')
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
  }
}
</script>