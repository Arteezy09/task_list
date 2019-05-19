<template>
    <nav class="teal">
        <div class="container">
            <div class="nav-wrapper">
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <router-link to="/create" tag="li">
                        <a href="#"><i class="material-icons right">create</i>Создать</a>
                    </router-link>
                    <router-link to="/list" tag="li">
                        <a href="#"><i class="material-icons right">list</i>Список</a>
                    </router-link>
                    <router-link to="/" tag="li">
                        <a href="#"><i class="material-icons right">info</i>Инфо</a>
                    </router-link>
                </ul>
                <ul class="sidenav" id="mobile-demo" ref="side">
                    <router-link to="/create" tag="li">
                        <a href="#"><i class="material-icons right">create</i>Создать</a>
                    </router-link>
                    <router-link to="/list" tag="li">
                        <a href="#"><i class="material-icons right">list</i>Список</a>
                    </router-link>
                    <router-link to="/" tag="li">
                        <a href="#"><i class="material-icons right">info</i>Инфо</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  mounted() {
    M.Sidenav.init(this.$refs.side)
  }
}
</script>