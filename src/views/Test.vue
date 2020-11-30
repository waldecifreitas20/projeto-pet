<template>
    <div id="div">
        <h1>PAGINA DE TESTES</h1>
            <br>
        <div class="coment">
            <!-- <input type="date" name="data" id="start" v-model="start">
        <br>
        <input type="date" name="data" id="end" v-model="end">
        <br><br><br>
        <p>Início: {{start}}</p>
        <br>
        <p>Final: {{end}}</p>
        <br><br>
        <input type="button" value="Calcular" id="btn" @click="calcData"> -->
       
       <!-- <label for="input">CEP: </label>
        <input type="text" class="input" id="input" placeholder="" v-model="cep" @keyup="verificaCEP">
        <p v-if="!foundedCEP">CEP inválido</p>
            <br>
        <label for="rua">Endereço: </label>
        <input type="text" name="" class="input" id="rua" v-model="address">
            <br>
        <label for="bairro">Bairro: </label>
        <input type="text" name="" class="input" id="bairro" v-model="bairro">
            <br> -->
        <!--  <input type="text" name="" class="input" id="input" @click="teste"> -->
        <!-- <form action="" method="post" id="form">
            <img id="image" style="width: 400px" alt="no image">
            <br>
            <input type="file" name="file" id="file" accept="image/*" @change="previewFile">
            <br>
            Nome:
            <input type="text"  name="name" class="input" id="name" v-model="dataForm.nome">
            <br>
            Idade:
            <input type="number" name="idade" class="input" id="idade" v-model="dataForm.idade">            
        </form> -->
        </div>    
        <!-- <img id="image" alt="image">     -->
        <!-- <input type="text" class="input" @keyup="addContador" v-model="number"> -->
        <!-- <br>
        <input type="file" name="file" id="file" accept="image/*" @change="previewFile">
        <br> -->
        <button @click="getDataForm"  id="btn">upload</button>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
        return {
            start : null,
            end : undefined,
            fileSelected : null,
            foundedCEP : true,
            number : '',
            cep: '',
            bairro: '',
            address: '',
            imgURL : undefined,
            dataForm : {
                nome : '',
                idade : 0,
            }
        }
    },
    methods : {
        calcData() { 
            const $ = this.start
            const f = this.end
            const years = $.slice(0,4)
            const yearsF = f.slice(0,4)
            const mounths = $.slice(5,7)
            const mounthsF = f.slice(5,7)
            const days = $.slice(8,10)
            const daysF = f.slice(8,10)
            var endDays = Number(mounthsF*30) + Number(yearsF*365) + Number(daysF)
            var startDays = Number(mounths*30) + Number(years*365) + Number(days)
            var totDays = endDays - startDays    
            const yearsP = Math.floor(totDays/365)
            const mounthsP = Math.floor((totDays - yearsP*365)/30)
            alert(yearsP + '/' + mounthsP)
        },
        previewFile(e) {
            this.fileSelected = e.target.files[0];
            var img = document.querySelector("#image");
            var reader = new FileReader();
            reader.onload = event => {
                img.src = event.target.result;
            }            
            reader.readAsDataURL(this.fileSelected);
        },
        uploadImage() {
            const CLIENT_ID = 'b2301735476d975';
            const doUpload = (url, options) => {
                const callBack = (resolve, reject) => {
                    fetch(url, options)
                    .then(response => response.json())
                    .then(resolve)
                    .catch(reject)
                }
                return new Promise(callBack);
            }
            const data =  new FormData();
            data.append('image', this.fileSelected);

            doUpload('https://api.imgur.com//image', {
                method : 'POST',
                body : data,
                headers : {
                    'Authorization' : `Client-ID ${CLIENT_ID}`,
                }
            }).then(resolve => {
                console.log(resolve);                
            })
            .catch(e => console.error(e))
        },
        checkCEP() {
            const cep = this.cep;
            if (cep.length == 8) {
                axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => {
                    if(response.data.erro){
                        this.foundedCEP = false;
                        alert("deu erro aqui caralho")
                    }else{
                        this.foundedCEP = true;
                        this.bairro = response.data.bairro;
                        this.address = response.data.logradouro;
                    }
                })
            }
          
        },
        cancelPaste() {
            document.getElementById('input').onpaste = () => {return false;}
        },
        submitForm() {
            const URL = 'https://jsonplaceholder.typicode.com/posts';
            fetch(URL, {
                method: 'POST',
                body: JSON.stringify(this.dataForm),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .finally(() => {
                alert('Seus dados foram salvos no servidor com sucesso!')
            })
        },
        iframe() {
            var iframe = document.getElementById('iframe');
            console.log(iframe.src);
        },
        addContador(){
            if (this.number.length == 11) {
                var ddd = this.number.slice(0,2);
                var part1 = this.number.slice(2,7);
                var part2 = this.number.slice(7,11);
                var finalString = '('+ ddd + ')' + part1 + '-' + part2;
                this.number = finalString;
            } else {
               this.cancelStrings();
            }
            console.log(this.number);
        }  ,
        cancelStrings() {
            this.number = this.number.replace('(', '');
            this.number = this.number.replace(')', '');
            this.number = this.number.replace('-', '');
        },
        getDataForm() {
            fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(response => response.json())
            .then(console.log)
            .catch(console.error)
        }      
    },
    watch : {
        contador(atual, before) {
            console.log('before: ', before);
            console.log('atual: ', atual);
        }
    }
}
</script>

<style scoped>
    iframe {
        height: 800px;
        width: 100%;
    }
    #div{
        width: 100%;
        display: block;
        margin:  0 auto;
        padding: 10px;
    }
    .input{
        background: rgb(248, 248, 248);
        color: black;
        height: 30px;
        border: 1px solid rgba(128, 128, 128, 0.568);
        border-radius: 5px;
        padding: 5px;
    }
    #btn{
        margin: 20px;
        width: 100px;
        height: 50px;
        font-size: 16px;
        border: none;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(171, 255, 46);
    }
    #btn:hover{
        background: rgb(137, 209, 37);
    }
</style>