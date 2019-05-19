<template>
  <div>  
    <h4>Task list — это простой список дел или список задач. Запиши в него все свои важные дела, чтобы не забыть.</h4>
    <span>Создай свой «список задач» прямо сейчас.</span>
    <router-link to="/create">
      <a class="btn-floating cyan pulse" style="margin-left: 70px;"><i class="material-icons">edit</i></a>
    </router-link>
    <div class="row">
      <div class="col s12">
        <img src="@/assets/img.png" alt="" class="responsive-img materialboxed"  style="margin-top: 50px; cursor: default;">
      </div>
    </div>
  </div>
</template>

