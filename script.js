const jogador = [
  {
    id: 0,
    name: "Neymar",
    foto: "img/neymar.png",
    votos: 0,
    porcentagem: 0,
  },
  {
    id: 1,
    name: "Messi",
    foto: "img/messi.png",
    votos: 0,
    porcentagem: 0,
  },
  {
    id: 2,
    name: "C. Ronaldo",
    foto: "img/cr7.png",
    votos: 0,
    porcentagem: 0,
  },
  
];

function start() {
  calcularPorcentagem()
  inicializar();
  votar();
}

inicializar = () => {
  jogador.map((p) => {
    document.querySelector("#jogador").innerHTML += ` 
            <div key=${p.id} class="player-card">
                <img src=${p.foto}>
                <p class="player-name">${p.name}</p>
                </div>
            `;
  });
};

mostrarVoto = () => {
  let html = "<div>";
  jogador.map((p) => {

    html += `
        <div class='voto'>
        <img style="
        width: 45%;
        height: 45%;
        "src=${p.foto}>
        <div class='block'>
        <div class='porc' 
        style="
        width: ${p.porcentagem}%;
        height: 100%;
        background: rgb(28, 182, 169) ;
        cursor: pointer;
        background: "
        >
        <p "class="player-voto", style="color: #fff">${p.porcentagem}%</p>
        </div>
        </div>
       </div>`;
  });
  
  document.getElementById("votos").innerHTML = html;
};

calcularPorcentagem = () =>{
    let totalVotos = 0;

    for(let i = 0; i<jogador.length; i++){
        totalVotos += jogador[i].votos
    }

    for(let i = 0; i < jogador.length;i++){
        
    let porcentagem = 0

    if(totalVotos <= 0){
        mostrarVoto()
        return false
    }

    porcentagem =  ( jogador[i].votos * 100 ) / totalVotos 

        jogador[i].porcentagem = porcentagem.toFixed(2)
    }
    mostrarVoto()
}

votar = () => {
  let link = document.getElementsByClassName("player-card");

  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function () {
      let key = this.getAttribute("key");
      jogador[key].votos++;
      calcularPorcentagem()
      document.getElementById("body").style.overflow="hidden"
      document.querySelector("#jogador").style.display="none"
      confirmeVoto(jogador[key].id);
      return false;
    });
  }
};

function confirmeVoto(id) {
  document.querySelector("#confirmarVoto").innerHTML = ` 
        <div class="container-voto">
            <div class="card">
               <img class="image"src=${jogador[id].foto}>
               <p class="player-name">Obrigado pelo voto</p>
            </div>
           
            <div class='botao'>
            <button onclick="votarNovamente()" class="btn">
                <p>votar novamente</p>
            </button>
            </div>

        </div>
        `;
}
votarNovamente = () => {
  document.querySelector("#jogador").style.display="flex"
  document.querySelector("#confirmarVoto").innerHTML = "";
  document.getElementById("body").style.overflow="auto"

};

start();
