<template>
  <div class="row">
    <div class="col s12 m6 offset-m3"> 
      <h4 style="margin-top: 60px;">Создайте задачу</h4>
      <form @submit.prevent="submitHandler">
        <div class="input-field" style="margin-top: 70px;">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Название</label>
          <span class="helper-text" data-error="Заголовок пустой"></span>
        </div>
        <div class="input-field">
          <textarea id="description" v-model="description" class="materialize-textarea" maxlength="1024"></textarea>
          <label for="description">Описание</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/1024</span>
        </div>
        <div ref="chips"></div>
        <input type="text" ref="datepicker" style="margin-top: 10px;">
        <button class="btn-small waves-effect waves-light" type="submit" name="action" style="margin-top: 40px;">
        сохранить<i class="material-icons right">send</i></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      title: '',
      description: '',
      chips: null,
      date: null
    }
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      secondaryPlaceholder: '+Тег',
      data: [{ tag: 'работа'}]
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    })
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: 'working',
        tags: this.chips.chipsData,
        date: this.date.date
      }
      this.$store.dispatch('createTask', task)
      this.$router.push('/list')
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  }
}
</script>

