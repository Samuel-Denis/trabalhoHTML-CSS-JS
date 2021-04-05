const jogador = [
  {
    id: 0,
    name: "Neymar",
    foto: "img/neymar.png",
    votos: 100,
    porcentagem: 0,
  },
  {
    id: 1,
    name: "Messi",
    foto: "/img/messi.png",
    votos: 2345,
    porcentagem: 0,
  },
  {
    id: 2,
    name: "C. Ronaldo",
    foto: "/img/cr7.png",
    votos: 54678,
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
      confirmeVoto(jogador[key].name, jogador[key].foto);

      return false;
    });
  }
};

function confirmeVoto(nome, foto) {
  document.querySelector("#confirmarVoto").innerHTML = ` 
        <div class="container-voto", style="
        position: fixed;
        background-color: rgba(188, 241, 237, 0.9) ;
        max-width: 85%;
        height: 85%;
        top: 30%;
        left: 5%;
        right: 5%;
        padding: 0 20px;
        display: flex;
        ">
            <div class="card">
               <img src=${foto}>
               <p class="player-name">${nome}</p>
            </div>
            <div class='botao'>
            <button onclick="votarNovamente()" class="btn">
                <p>Presione aqui</p>
            </button>
            </div>

        </div>
        `;
}
votarNovamente = () => {
  document.querySelector("#confirmarVoto").innerHTML = "";
};

start();
