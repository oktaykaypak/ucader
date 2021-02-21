<template>
  <div class="container" v-html="Pages[0]">

  </div>
</template>

<script>
export default {
name:"lessonContainer",
props:{
    title:String,
    desc:String,
    Pages:Array

},

}
</script>

<style>
.container{
  width: 100%;
  max-width: 1000px;
}
</style>