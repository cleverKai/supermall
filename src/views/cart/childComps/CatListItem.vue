<template>
    <div>
      {{product}}
    </div>
</template>

<script>
    export default {
        name: "CatListItem",
      props:{
        product:{
          type:Object,
          default(){
            return {}
          }
        }
      }
    }
</script>

<style scoped>

</style>
