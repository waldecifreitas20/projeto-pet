<template>
   <a :href="to" @click="changePage()" class="btn-back">Voltar</a>
</template>

<script>
export default {
    props : {
        to : String,
        from : String,
    },
    methods : {
        changePage() {
            if(this.to.length > 0){
                var to = document.querySelector(this.to)
                to.style.display = 'block'               
            }
            if(this.from.length > 0){
                var from = document.querySelector(this.from)
                from.style.display = 'none'
            }           
        },
    }
}
</script>

<style>

</style>