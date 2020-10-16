<template>
  <div id="div">
      <input type="file" name="" id="input" @change="readImage" accept=".png, .jpg">
      <img src="" alt="" id="image">
  </div>
</template>

<script>
export default {
    methods : {
        readImage(e) {
            const $ = document.querySelector.bind(document)
            const previewImage = $('#image')            
            const fileUpload = e.target.files.item(0)
            const reader = new FileReader()

            reader.onload = e => previewImage.src = e.target.result

            reader.readAsDataURL(fileUpload)
        }
            
        
    }
}
</script>

<style>

</style>