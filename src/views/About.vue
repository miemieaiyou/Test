<template>
	<div>
		<div>
			<!-- <p v-html="str"></p> -->
			<el-button @click="fn1($event)">按钮</el-button>
		</div>
	</div>
</template>

<script>
  export default {  
    data() {
      return {
		  //str:'<span @click="$alert(1)">span标签</span>'
	  }
    },
    methods: {
		fn1(e){
			console.log(e)
		}
	}
  }
</script>

<style>
</style>