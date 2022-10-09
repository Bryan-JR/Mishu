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
      <p v-if="bingo==true">Bingooo!</p>
    </div>
    `,
    data(){
      return {
        tarj: {
          letras: ['M', 'I', 'S', 'H', 'U'],
          matriz: [[],[],[],[],[]]
        },
        m: [],
        i: [],
        s: [],
        h: [],
        u: [],
        bingo: false,
      }  
    },
    methods: {
        generaNumeros(){
          for (let i = 0;  i < 15; i++) {
            this.m.push(i+1);
            this.i.push(i+16);
            this.s.push(i+31);
            this.h.push(i+46);
            this.u.push(i+61);
          } 
        },
        cambiarEstado(i, j, estado){
          this.tarj.matriz[i][j].estado = !estado;
          this.bingo = this.comprobarBingo();
          console.log(this.bingo);
        },
        comprobarBingo(){
          let dp = false;
          let ds = false;
          for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
              let estado = this.tarj.matriz[i][j].estado;
              if(i==j){
                if(estado==true) dp = true;
                else dp = false;
              }
              if(i+j==4){
                if(estado==true) ds = true;
                else ds = false; 
              }
              if(dp||ds==false){
                return false;
              }
            }
          }
          return (dp||ds) == true;
        }
    },
    mounted() {
      this.generaNumeros();
      for(let i=0; i < 5; i++) {
        for(let j=0; j < 5; j++){
          if (i==2&&j==2) this.tarj.matriz[i].push({numero: 'Mishu', estado: true});
          else {
            let rd = 0;
            switch(i){
              case 0:
                rd = Math.floor(Math.random()*(this.m.length));
                this.tarj.matriz[i].push({numero: this.m[rd], estado: false});
                this.m.splice(rd, 1);
                break;
              case 1:
                rd = Math.floor(Math.random()*(this.i.length));
                this.tarj.matriz[i].push({numero: this.i[rd], estado: false});
                this.i.splice(rd, 1);
                break;
              case 2:
                rd = Math.floor(Math.random()*(this.s.length));
                this.tarj.matriz[i].push({numero: this.s[rd], estado: false});
                this.s.splice(rd, 1);
                break;
              case 3:
                rd = Math.floor(Math.random()*(this.h.length));
                this.tarj.matriz[i].push({numero: this.h[rd], estado: false});
                this.h.splice(rd, 1);
                break;
              case 4:
                rd = Math.floor(Math.random()*(this.u.length));
                this.tarj.matriz[i].push({numero: this.u[rd], estado: false});
                this.u.splice(rd, 1);
                break;
            }
            

          } 
        }
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