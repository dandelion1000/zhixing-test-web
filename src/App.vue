<template>
    <div id="app" class="zhixing-main-content">
        <router-view class="animated" />
    </div>
</template>

<script>
export default {

    data(){
        return {
            loading: true
        };
    }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
