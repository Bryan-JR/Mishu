const tarjeton = {
    template : `
    <div class='tarjeton'>
      <h1 class="titulo">MISHU</h1>
      <div class="tablaNums">
        <div v-for="data, i in tarj.letras":key="i" class="columnaNum">
            <h2>{{data}}</h2>
            <div class="listaNum">
                <div v-for="num, j in tarj.matriz[i]":key="j" 
                v-on:click="cambiarEstado(i, j, num.estado)"
                v-bind:class="[num.estado ? 'verde': '']"
                class="num">
                  {{num.numero}}
                </div>
            </div>
        </div>
      </div>
    </div>
    `,
    data(){
      return {
        tarj: {
          letras: ['M', 'I', 'S', 'H', 'U'],
          matriz: [[],[],[],[],[]]
        },
        num: 0
      }  
    },
    methods: {
        generaNumero(column){
          switch (column) {
            case 0:
              this.num = Math.round(Math.random()*14)+1;
              break;
            case 1:
              this.num = Math.round((Math.random()*14)+15)+1;
              break;
            case 2:
              this.num = Math.round((Math.random()*14)+30)+1;
              break;
            case 3:
              this.num = Math.round((Math.random()*14)+45)+1;
              break;
            case 4:
              this.num = Math.round((Math.random()*14)+60)+1;
              break;
            default:
              break;
          }
          if(this.tarj.matriz[column].includes(this.num)){
            this.generaNumero(column);
          }  
        },
        cambiarEstado(i, j, estado){
          this.tarj.matriz[i][j].estado = !estado;

        }
    },
    mounted() {
      for(let i=0; i < 5; i++) {
        for(let j=0; j < 5; j++){
          this.generaNumero(i);
          if (i==2&&j==2) this.tarj.matriz[i].push({numero: 'Mishu', estado: false});
          else this.tarj.matriz[i].push({numero: this.num, estado: false});
        }
        console.log(this.tarj.matriz[i]);
      }
    }
}

var app = new Vue({
  el : 'main',
  data :{
  },
  components :{
    tarjeton : tarjeton
  }
})