<template lang="">
    <div>
        <rotate-loader :loading="loading" :color="color" :size="size"></rotate-loader>
    </div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

new Vue({
    components: {
        PulseLoader
    }
})

export default vue.spinner
</script>
<style lang="">
    
</style>