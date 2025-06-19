const conjuntos = [
  `01 03 05 07
09 11 13 15
17 19 21 23
25 27 29 31
33 35 37 39
41 43 45 47
49 51 53 55
57 59 61 63`,
  `02 03 06 07
10 11 14 15
18 19 22 23
26 27 30 31
34 35 38 39
42 43 46 47
50 51 54 55
58 59 62 63`,
  `04 05 06 07
12 13 14 15
20 21 22 23
28 29 30 31
36 37 38 39
44 45 46 47
52 53 54 55
60 61 62 63`,
  `08 09 10 11
12 13 14 15
24 25 26 27
28 29 30 31
40 41 42 43
44 45 46 47
56 57 58 59
60 61 62 63`,
  `16 17 18 19
20 21 22 23
24 25 26 27
28 29 30 31
48 49 50 51
52 53 54 55
56 57 58 59
60 61 62 63`,
  `32 33 34 35
36 37 38 39
40 41 42 43
44 45 46 47
48 49 50 51
52 53 54 55
56 57 58 59
60 61 62 63`,
];

const valores = [1, 2, 4, 8, 16, 32];
let indicePergunta = 0;
let numero = 0;
let idiomaAtual = "pt";

const perguntaContainer = document.getElementById("pergunta-container");
const resultadoDiv = document.getElementById("resultado");
const botoesContainer = document.getElementById("botoes-container");
const reiniciarContainer = document.getElementById("reiniciar-container");
const btnSim = document.getElementById("btn-sim");
const btnNao = document.getElementById("btn-nao");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnToggleTheme = document.getElementById("btn-toggle-theme");
const controleBrilho = document.getElementById("controle-brilho");
const btnAutoTheme = document.getElementById("btn-auto-theme");


function mostrarPergunta() {
  const t = traducoes[idiomaAtual];
  const perguntaTexto = ""; 
  perguntaContainer.innerHTML = perguntaTexto + `<pre class="fade-in">${conjuntos[indicePergunta]}</pre>`;
  resultadoDiv.textContent = "";
  botoesContainer.style.display = "flex";
  reiniciarContainer.style.display = "none";
  atualizarBarraProgresso();
  btnSim.disabled = false;
  btnNao.disabled = false;
}

function responder(sim) {
  btnSim.disabled = true;
  btnNao.disabled = true;

  document.getElementById("imagem-inicial").style.display = "none";

  imagemResposta.style.display = "block";
  imagemResposta.src = sim ? "img/sim.png" : "img/nao.png";

  setTimeout(() => {
    imagemResposta.style.display = "none";

    if (sim && indicePergunta < valores.length) {
      numero += valores[indicePergunta];
    }
    indicePergunta++;

    if (indicePergunta < conjuntos.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }, 500);
}

function mostrarResultado() {
  perguntaContainer.innerHTML = "";
  botoesContainer.style.display = "none";

  const imagemFinal = document.createElement("img");
  imagemFinal.id = "imagem-final";
  imagemFinal.style.display = "block";
  imagemFinal.style.margin = "2rem auto";
  imagemFinal.style.maxWidth = "250px";

  if (numero === 0) {
    resultadoDiv.textContent = traducoes[idiomaAtual].erroZero;
    imagemFinal.src = "img/zero.png";
  } else {
    resultadoDiv.textContent = traducoes[idiomaAtual].resultado(numero);
    resultadoDiv.classList.add("celebration");
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    imagemFinal.src = "img/resultado.png"; 
  }

  resultadoDiv.appendChild(imagemFinal);
  reiniciarContainer.style.display = "flex";
}

const imagemResposta = document.createElement("img");
imagemResposta.id = "imagem-resposta";
imagemResposta.style.display = "none";
imagemResposta.style.position = "absolute";
imagemResposta.style.top = "125%";
imagemResposta.style.left = "50%";
imagemResposta.style.transform = "translate(-50%, -50%)";
imagemResposta.style.zIndex = "999";
imagemResposta.style.maxWidth = "200px";
document.body.appendChild(imagemResposta);

btnSim.addEventListener("click", () => responder(true));
btnNao.addEventListener("click", () => responder(false));
btnReiniciar.addEventListener("click", () => {
  indicePergunta = 0;
  numero = 0;
  document.getElementById("imagem-inicial").style.display = "block";
  mostrarPergunta();
});

btnToggleTheme.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("modoTema", isDark ? "dark" : "light");
  atualizarTextoBotaoTema();
});

btnAutoTheme.addEventListener("click", () => {
  localStorage.removeItem("modoTema");

  const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark", prefereEscuro);

  atualizarTextoBotaoTema();
});

const traducoes = {
  pt: {
    titulo: "Jogo de Adivinhação",
    descricao:
      "Pense em um número entre <strong>1</strong> e <strong>63</strong>. Eu irei descobrir qual número que você escolheu fazendo algumas perguntas simples.",
    comoFunciona: `
      <p><strong>Como funciona?</strong></p>
      <ul>
        <li>Eu vou mostrar alguns conjuntos de números.</li>
        <li>Para cada conjunto, responda se seu número está presente clicando em <strong>Sim</strong> ou <strong>Não</strong>.</li>
        <li>No final, irei adivinhar seu número baseado nas suas respostas.</li>
      </ul>
    `,
    menuIdioma: "🌐 Idiomas",
    sim: "Sim",
    nao: "Não",
    jogarNovamente: "Jogar Novamente",
    resultado: numero => `🎉 Seu número é ${numero}! 🎉`,
    erroZero: "🤔 Parece que seu número não está entre 1 e 63!",
    menu: {
      configuracoes: "⚙️ Configurações",
      tema: "🎨 Tema",
      modo: "🌓 Modo",
      brilho: "💡 Brilho"
    },
    usarTemaNavegador: "🌐 Usar Tema do Navegador",
    temaClaro: "Modo Claro",
    temaEscuro: "Modo Escuro",
    desenvolvidoPor: "©2025 Miguel Escobar — Todos os direitos reservados.",
    perguntaXdeY: (x, y) => `Pergunta ${x} de ${y}`,
    menuSecreto: {
      titulo: "Comandos de Teclado",
      comandos: [
        "<strong>M</strong> - Abrir/Fechar Menu Principal",
        "<strong>C</strong> - Abrir/Fechar Configurações",
        "<strong>I</strong> - Abrir/Fechar Idiomas",
        "<strong>K</strong> - Abrir/Fechar Tema",
        "<strong>T</strong> - Alternar Modo Claro/Escuro",
        "<strong>P</strong> - Mostrar/Ocultar Barra de Progresso",
        "<strong>↑ / ↓</strong> - Navegar entre idiomas",
        "<strong>S</strong> - Responder \"Sim\"",
        "<strong>N</strong> - Responder \"Não\"",
        "<strong>R</strong> - Jogar novamente",
        "<strong>D</strong> - Abrir/Fechar este menu de comandos"
      ],
      fechar: "Fechar"
    }
  },

  en: {
    titulo: "Guessing Game",
    descricao:
      "Think of a number between <strong>1</strong> and <strong>63</strong>. I will find out which number you chose by asking a few simple questions.",
    comoFunciona: `
      <p><strong>How does it work?</strong></p>
      <ul>
        <li>I will show some sets of numbers.</li>
        <li>For each set, answer whether your number is present by clicking <strong>Yes</strong> or <strong>No</strong>.</li>
        <li>At the end, I will guess your number based on your answers.</li>
      </ul>
    `,
    menuIdioma: "🌐 Languages",
    sim: "Yes",
    nao: "No",
    jogarNovamente: "Play Again",
    resultado: numero => `🎉 Your number is ${numero}! 🎉`,
    erroZero: "🤔 It seems your number is not between 1 and 63!",
    menu: {
      configuracoes: "⚙️ Settings",
      tema: "🎨 Theme",
      modo: "🌓 Mode",
      brilho: "💡 Brightness"
    },
    usarTemaNavegador: "🌐 Use Browser Theme",
    temaClaro: "Light Mode",
    temaEscuro: "Dark Mode",
    desenvolvidoPor: "©2025 Miguel Escobar — All rights reserved.",
    perguntaXdeY: (x, y) => `Question ${x} of ${y}`,
    menuSecreto: {
      titulo: "Keyboard Commands",
      comandos: [      
      "<strong>M</strong> - Open/Close Main Menu",
      "<strong>C</strong> - Open/Close Settings",
      "<strong>I</strong> - Open/Close Languages",
      "<strong>K</strong> - Open/Close Theme",
      "<strong>T</strong> - Toggle Light/Dark Mode",
      "<strong>P</strong> - Show/Hide Progress Bar",
      "<strong>↑ / ↓</strong> - Navigate between languages",
      "<strong>S</strong> - Answer \"Yes\"",
      "<strong>N</strong> - Answer \"No\"",
      "<strong>R</strong> - Play again",
      "<strong>D</strong> - Open/Close this command menu"
      ],
      fechar: "Close"
    }
  },

  es: {
    titulo: "Juego de Adivinanza",
    descricao:
      "Piensa en un número entre <strong>1</strong> y <strong>63</strong>. Descubriré qué número elegiste haciendo algunas preguntas sencillas.",
    comoFunciona: `
      <p><strong>¿Cómo funciona?</strong></p>
      <ul>
        <li>Te mostraré algunos conjuntos de números.</li>
        <li>Para cada conjunto, responde si tu número está presente haciendo clic en <strong>Sí</strong> o <strong>No</strong>.</li>
        <li>Al final, adivinaré tu número basado en tus respuestas.</li>
      </ul>
    `,
    menuIdioma: "🌐 Idiomas",
    sim: "Sí",
    nao: "No",
    jogarNovamente: "Jugar de Nuevo",
    resultado: numero => `🎉 ¡Tu número es ${numero}! 🎉`,
    erroZero: "🤔 ¡Parece que tu número no está entre 1 y 63!",
    menu: {
      configuracoes: "⚙️ Configuración",
      tema: "🎨 Tema",
      modo: "🌓 Modo",
      brilho: "💡 Brillo"
    },
    usarTemaNavegador: "🌐 Usar Tema del Navegador",
    temaClaro: "Modo Claro",
    temaEscuro: "Modo Oscuro",
    desenvolvidoPor: "©2025 Miguel Escobar — Todos los derechos reservados.",
    perguntaXdeY: (x, y) => `Pregunta ${x} de ${y}`,
    menuSecreto: {
      titulo: "Comandos de Teclado",
      comandos: [
         "<strong>M</strong> - Abrir/Cerrar Menú Principal",
      "<strong>C</strong> - Abrir/Cerrar Configuración",
      "<strong>I</strong> - Abrir/Cerrar Idiomas",
      "<strong>K</strong> - Abrir/Cerrar Tema",
      "<strong>T</strong> - Alternar Modo Claro/Oscuro",
      "<strong>P</strong> - Mostrar/Ocultar Barra de Progreso",
      "<strong>↑ / ↓</strong> - Navegar entre idiomas",
      "<strong>S</strong> - Responder \"Sí\"",
      "<strong>N</strong> - Responder \"No\"",
      "<strong>R</strong> - Jugar de nuevo",
      "<strong>D</strong> - Abrir/Cerrar este menú de comandos"
      ],
      fechar: "Cerrar"
    }
  },

  fr: {
    titulo: "Jeu de Devinette",
    descricao:
      "Pensez à un nombre entre <strong>1</strong> et <strong>63</strong>.Je vais découvrir quel numéro vous avez choisi en posant quelques questions simples.",
    comoFunciona: `
      <p><strong>Comment ça marche ?</strong></p>
      <ul>
        <li>Je vais afficher quelques ensembles de nombres.</li>
        <li>Pour chaque ensemble, répondez si votre nombre y figure en cliquant sur <strong>Oui</strong> ou <strong>Non</strong>.</li>
        <li>À la fin, je devinerai votre nombre en fonction de vos réponses.</li>
      </ul>
    `,
    menuIdioma: "🌐 Langues",
    sim: "Oui",
    nao: "Non",
    jogarNovamente: "Rejouer",
    resultado: numero => `🎉 Votre nombre est ${numero} ! 🎉`,
    erroZero: "🤔 Il semble que votre nombre ne soit pas entre 1 et 63 !",
    menu: {
      configuracoes: "⚙️ Paramètres",
      tema: "🎨 Thème",
      modo: "🌓 Mode",
      brilho: "💡 Luminosité"
    },
    usarTemaNavegador: "🌐 Utiliser le thème du navigateur",
    temaClaro: "Mode Clair",
    temaEscuro: "Mode Sombre",
    desenvolvidoPor: "©2025 Miguel Escobar — Tous droits réservés.",
    perguntaXdeY: (x, y) => `Question ${x} sur ${y}`,
    menuSecreto: {
      titulo: "Commandes Clavier",
      comandos: [
      "<strong>M</strong> - Ouvrir/Fermer le Menu Principal",
      "<strong>C</strong> - Ouvrir/Fermer les Paramètres",
      "<strong>I</strong> - Ouvrir/Fermer les Langues",
      "<strong>K</strong> - Ouvrir/Fermer le Thème",
      "<strong>T</strong> - Basculer en Mode Clair/Sombre",
      "<strong>P</strong> - Afficher/Masquer la Barre de Progression",
      "<strong>↑ / ↓</strong> - Naviguer entre les langues",
      "<strong>S</strong> - Répondre \"Oui\"",
      "<strong>N</strong> - Répondre \"Non\"",
      "<strong>R</strong> - Rejouer",
      "<strong>D</strong> - Ouvrir/Fermer ce menu de commandes"
      ],
      fechar: "Fermer"
    }
  },

  it: {
    titulo: "Gioco di Indovinelli",
    descricao:
      "Pensa a un numero tra <strong>1</strong> e <strong>63</strong>. Scoprirò quale numero hai scelto facendo alcune semplici domande.",
    comoFunciona: `
      <p><strong>Come funziona?</strong></p>
      <ul>
        <li>Ti mostrerò alcuni gruppi di numeri.</li>
        <li>Per ogni gruppo, rispondi se il tuo numero è presente cliccando su <strong>Sì</strong> o <strong>No</strong>.</li>
        <li>Alla fine, indovinerò il tuo numero in base alle tue risposte.</li>
      </ul>
    `,
    menuIdioma: "🌐 Lingue",
    sim: "Sì",
    nao: "No",
    jogarNovamente: "Gioca di Nuovo",
    resultado: numero => `🎉 Il tuo numero è ${numero}! 🎉`,
    erroZero: "🤔 Sembra che il tuo numero non sia tra 1 e 63!",
    menu: {
      configuracoes: "⚙️ Impostazioni",
      tema: "🎨 Tema",
      modo: "🌓 Modalità",
      brilho: "💡 Luminosità"
    },
    usarTemaNavegador: "🌐 Usa il tema del browser",
    temaClaro: "Modalità Chiara",
    temaEscuro: "Modalità Scura",
    desenvolvidoPor: "©2025 Miguel Escobar — Tutti i diritti riservati.",
    perguntaXdeY: (x, y) => `Domanda ${x} di ${y}`,
    menuSecreto: {
      titulo: "Comandi da Tastiera",
      comandos: [
      "<strong>M</strong> - Apri/Chiudi Menu Principale",
      "<strong>C</strong> - Apri/Chiudi Impostazioni",
      "<strong>I</strong> - Apri/Chiudi Lingue",
      "<strong>K</strong> - Apri/Chiudi Tema",
      "<strong>T</strong> - Attiva/Disattiva Modalità Chiaro/Scuro",
      "<strong>P</strong> - Mostra/Nascondi Barra di Progresso",
      "<strong>↑ / ↓</strong> - Naviga tra le lingue",
      "<strong>S</strong> - Rispondi \"Sì\"",
      "<strong>N</strong> - Rispondi \"No\"",
      "<strong>R</strong> - Gioca di nuovo",
      "<strong>D</strong> - Apri/Chiudi questo menu comandi"
      ],
      fechar: "Chiudi"
    }
  },

  de: {
    titulo: "Zahlenratespiel",
    descricao:
      "Denke dir eine Zahl zwischen <strong>1</strong> und <strong>63</strong>. Ich werde herausfinden, welche Zahl du gewählt hast, indem ich ein paar einfache Fragen stelle.",
    comoFunciona: `
      <p><strong>Wie funktioniert das?</strong></p>
      <ul>
        <li>Ich zeige dir einige Zahlenmengen.</li>
        <li>Für jede Menge antworte, ob deine Zahl enthalten ist, indem du auf <strong>Ja</strong> oder <strong>Nein</strong> klickst.</li>
        <li>Am Ende werde ich deine Zahl anhand deiner Antworten erraten.</li>
      </ul>
    `,
    menuIdioma: "🌐 Sprachen",
    sim: "Ja",
    nao: "Nein",
    jogarNovamente: "Nochmals spielen",
    resultado: numero => `🎉 Deine Zahl ist ${numero}! 🎉`,
    erroZero: "🤔 Es scheint, deine Zahl liegt nicht zwischen 1 und 63!",
    menu: {
      configuracoes: "⚙️ Einstellungen",
      tema: "🎨 Thema",
      modo: "🌓 Modus",
      brilho: "💡 Helligkeit"
    },    
    usarTemaNavegador: "🌐 Browser-Design verwenden",
    temaClaro: "Heller Modus",
    temaEscuro: "Dunkler Modus",
    desenvolvidoPor: "©2025 Miguel Escobar — Alle Rechte vorbehalten.",
    perguntaXdeY: (x, y) => `Frage ${x} von ${y}`,
    menuSecreto: {
      titulo: "Tastaturbefehle",
      comandos: [
      "<strong>M</strong> - Hauptmenü Öffnen/Schließen",
      "<strong>C</strong> - Einstellungen Öffnen/Schließen",
      "<strong>I</strong> - Sprachen Öffnen/Schließen",
      "<strong>K</strong> - Thema Öffnen/Schließen",
      "<strong>T</strong> - Hell-/Dunkelmodus Umschalten",
      "<strong>P</strong> - Fortschrittsbalken Anzeigen/Verbergen",
      "<strong>↑ / ↓</strong> - Zwischen Sprachen Navigieren",
      "<strong>S</strong> - \"Ja\" Antworten",
      "<strong>N</strong> - \"Nein\" Antworten",
      "<strong>R</strong> - Erneut Spielen",
      "<strong>D</strong> - Dieses Befehlsmenü Öffnen/Schließen"
      ],
      fechar: "Schließen"
    }
  },

  id: {
    titulo: "Permainan Menebak Angka",
    descricao:
      "Pikirkan sebuah angka antara <strong>1</strong> dan <strong>63</strong>. Saya akan mengetahui angka yang Anda pilih dengan mengajukan beberapa pertanyaan sederhana.",
    comoFunciona: `
      <p><strong>Bagaimana cara kerjanya?</strong></p>
      <ul>
        <li>Saya akan menunjukkan beberapa kumpulan angka.</li>
        <li>Untuk setiap kumpulan, jawab apakah angka Anda ada di dalamnya dengan mengklik <strong>Ya</strong> atau <strong>Tidak</strong>.</li>
        <li>Pada akhirnya, saya akan menebak angka Anda berdasarkan jawaban Anda.</li>
      </ul>
    `,
    menuIdioma: "🌐 Bahasa",
    sim: "Ya",
    nao: "Tidak",
    jogarNovamente: "Main Lagi",
    resultado: numero => `🎉 Angka Anda adalah ${numero}! 🎉`,
    erroZero: "🤔 Sepertinya angka Anda tidak berada di antara 1 dan 63!",
    menu: {
      configuracoes: "⚙️ Pengaturan",
      tema: "🎨 Tema",
      modo: "🌓 Mode",
      brilho: "💡 Kecerahan"
    },
    usarTemaNavegador: "🌐 Gunakan Tema Browser",
    temaClaro: "Mode Terang",
    temaEscuro: "Mode Gelap",
    desenvolvidoPor: "©2025 Miguel Escobar — Semua hak dilindungi.",
    perguntaXdeY: (x, y) => `Pertanyaan ${x} dari ${y}`,
    menuSecreto: {
      titulo: "Perintah Keyboard",
      comandos: [
      "<strong>M</strong> - Buka/Tutup Menu Utama",
      "<strong>C</strong> - Buka/Tutup Pengaturan",
      "<strong>I</strong> - Buka/Tutup Bahasa",
      "<strong>K</strong> - Buka/Tutup Tema",
      "<strong>T</strong> - Alihkan Mode Terang/Gelap",
      "<strong>P</strong> - Tampilkan/Sembunyikan Bilah Progres",
      "<strong>↑ / ↓</strong> - Navigasi antar bahasa",
      "<strong>S</strong> - Jawab \"Ya\"",
      "<strong>N</strong> - Jawab \"Tidak\"",
      "<strong>R</strong> - Main Lagi",
      "<strong>D</strong> - Buka/Tutup Menu Perintah Ini"
      ],
      fechar: "Tutup"
    }
  },

  ru: {
    titulo: "Игра в Угадайку",
    descricao:
      "Загадайте число от <strong>1</strong> до <strong>63</strong>. Я узнаю, какое число вы выбрали, задав несколько простых вопросов.",
    comoFunciona: `
      <p><strong>Как это работает?</strong></p>
      <ul>
        <li>Я покажу вам несколько наборов чисел.</li>
        <li>Для каждого набора ответьте, есть ли в нём ваше число, нажав <strong>Да</strong> или <strong>Нет</strong>.</li>
        <li>В конце я угадаю ваше число на основе ваших ответов.</li>
      </ul>
    `,
    menuIdioma: "🌐 Языки",
    sim: "Да",
    nao: "Нет",
    jogarNovamente: "Играть снова",
    resultado: numero => `🎉 Ваше число: ${numero}! 🎉`,
    erroZero: "🤔 Похоже, ваше число не входит в диапазон от 1 до 63!",
    menu: {
      configuracoes: "⚙️ Настройки",
      tema: "🎨 Тема",
      modo: "🌓 Режим",
      brilho: "💡 Яркость"
    },
    usarTemaNavegador: "🌐 Использовать тему браузера",
    temaClaro: "Светлая тема",
    temaEscuro: "Тёмная тема",
    desenvolvidoPor: "©2025 Miguel Escobar — Все права защищены.",
    perguntaXdeY: (x, y) => `Вопрос ${x} из ${y}`,
    menuSecreto: {
      titulo: "Горячие клавиши",
      comandos: [
      "<strong>M</strong> - Открыть/Закрыть Главное Меню",
      "<strong>C</strong> - Открыть/Закрыть Настройки",
      "<strong>I</strong> - Открыть/Закрыть Языки",
      "<strong>K</strong> - Открыть/Закрыть Тему",
      "<strong>T</strong> - Переключить Светлый/Тёмный Режим",
      "<strong>P</strong> - Показать/Скрыть Панель Прогресса",
      "<strong>↑ / ↓</strong> - Перемещаться по языкам",
      "<strong>S</strong> - Ответить \"Да\"",
      "<strong>N</strong> - Ответить \"Нет\"",
      "<strong>R</strong> - Играть снова",
      "<strong>D</strong> - Открыть/Закрыть это меню команд"
      ],
      fechar: "Закрыть"
    }
  },

  zh: {
    titulo: "猜数字游戏",
    descricao:
      "想一个介于 <strong>1</strong> 和 <strong>63</strong> 之间的数字。我会通过几个简单的问题找出你选的数字。",
    comoFunciona: `
      <p><strong>游戏说明</strong></p>
      <ul>
        <li>我会显示一些数字集合。</li>
        <li>对于每个集合，点击 <strong>是</strong> 或 <strong>否</strong> 回答你的数字是否在里面。</li>
        <li>最后，我会根据你的回答猜出你的数字。</li>
      </ul>
    `,
    menuIdioma: "🌐 语言",
    sim: "是",
    nao: "否",
    jogarNovamente: "再玩一次",
    resultado: numero => `🎉 你选的数字是 ${numero}！🎉`,
    erroZero: "🤔 看起来你的数字不在 1 到 63 之间！",
    menu: {
      configuracoes: "⚙️ 设置",
      tema: "🎨 主题",
      modo: "🌓 模式",
      brilho: "💡 亮度"
    },
    usarTemaNavegador: "🌐 使用浏览器主题",
    temaClaro: "浅色模式",
    temaEscuro: "深色模式",
    desenvolvidoPor: "©2025 Miguel Escobar — 版权所有。",
    perguntaXdeY: (x, y) => `第 ${x} 题，总共 ${y} 题`,
    menuSecreto: {
      titulo: "键盘命令",
      comandos: [
      "<strong>M</strong> - 打开/关闭主菜单",
      "<strong>C</strong> - 打开/关闭设置",
      "<strong>I</strong> - 打开/关闭语言",
      "<strong>K</strong> - 打开/关闭主题",
      "<strong>T</strong> - 切换明亮/黑暗模式",
      "<strong>P</strong> - 显示/隐藏进度条",
      "<strong>↑ / ↓</strong> - 切换语言",
      "<strong>S</strong> - 回答 “是”",
      "<strong>N</strong> - 回答 “否”",
      "<strong>R</strong> - 再玩一次",
      "<strong>D</strong> - 打开/关闭此命令菜单"
      ],
      fechar: "关闭"
    }
  },

  ja: {
    titulo: "数当てゲーム",
    descricao:
      "<strong>1</strong>から<strong>63</strong>の間の数字を思い浮かべてください。	いくつかの簡単な質問で、あなたが選んだ数字を当てます。",
    comoFunciona: `
      <p><strong>遊び方</strong></p>
      <ul>
        <li>いくつかの数字のセットを表示します。</li>
        <li>各セットに対して、あなたの数字が含まれているかどうかを<strong>はい</strong>または<strong>いいえ</strong>で答えてください。</li>
        <li>最後に、あなたの回答に基づいて数字を当てます。</li>
      </ul>
    `,
    menuIdioma: "🌐 言語",
    sim: "はい",
    nao: "いいえ",
    jogarNovamente: "もう一度遊ぶ",
    resultado: numero => `🎉 あなたの数字は ${numero} です！🎉`,
    erroZero: "🤔 1から63の間の数字ではないようです！",
    menu: {
      configuracoes: "⚙️ 設定",
      tema: "🎨 テーマ",
      modo: "🌓 モード",
      brilho: "💡 明るさ"
    },
    usarTemaNavegador: "🌐 ブラウザのテーマを使用",
    temaClaro: "ライトモード",
    temaEscuro: "ダークモード",
    desenvolvidoPor: "©2025 Miguel Escobar — 無断転載を禁じます。",
    perguntaXdeY: (x, y) => `質問 ${x} / ${y}`,
    menuSecreto: {
      titulo: "キーボードコマンド",
      comandos: [
      "<strong>M</strong> - メインメニューを開く/閉じる",
      "<strong>C</strong> - 設定を開く/閉じる",
      "<strong>I</strong> - 言語を開く/閉じる",
      "<strong>K</strong> - テーマを開く/閉じる",
      "<strong>T</strong> - ライト/ダークモードを切り替える",
      "<strong>P</strong> - 進行バーを表示/非表示",
      "<strong>↑ / ↓</strong> - 言語をナビゲート",
      "<strong>S</strong> - 「はい」と答える",
      "<strong>N</strong> - 「いいえ」と答える",
      "<strong>R</strong> - もう一度遊ぶ",
      "<strong>D</strong> - このコマンドメニューを開く/閉じる"
      ],
      fechar: "閉じる"
    }
  },

  ko: {
    titulo: "숫자 추측 게임",
    descricao:
      "<strong>1</strong>에서 <strong>63</strong> 사이의 숫자를 생각하세요. 몇 가지 간단한 질문으로 당신이 고른 숫자를 알아맞힐 거예요.",
    comoFunciona: `
      <p><strong>게임 방법</strong></p>
      <ul>
        <li>몇 개의 숫자 집합을 보여드립니다.</li>
        <li>각 집합에 대해 숫자가 포함되어 있는지 <strong>예</strong> 또는 <strong>아니오</strong>로 답해주세요.</li>
        <li>마지막에 당신의 대답을 기반으로 숫자를 추측합니다.</li>
      </ul>
    `,
    menuIdioma: "🌐 언어",
    sim: "예",
    nao: "아니오",
    jogarNovamente: "다시 하기",
    resultado: numero => `🎉 당신이 생각한 숫자는 ${numero}입니다! 🎉`,
    erroZero: "🤔 1에서 63 사이의 숫자가 아닌 것 같아요!",
    menu: {
      configuracoes: "⚙️ 설정",
      tema: "🎨 테마",
      modo: "🌓 모드",
      brilho: "💡 밝기"
    },
    usarTemaNavegador: "🌐 브라우저 테마 사용",
    temaClaro: "라이트 모드",
    temaEscuro: "다크 모드",
    desenvolvidoPor: "©2025 Miguel Escobar — 모든 권리 보유.",
    perguntaXdeY: (x, y) => `${y}의 ${x}번째 질문`,
    menuSecreto: {
      titulo: "키보드 명령어",
      comandos: [
      "<strong>M</strong> - 메인 메뉴 열기/닫기",
      "<strong>C</strong> - 설정 열기/닫기",
      "<strong>I</strong> - 언어 열기/닫기",
      "<strong>K</strong> - 테마 열기/닫기",
      "<strong>T</strong> - 밝은/어두운 모드 전환",
      "<strong>P</strong> - 진행률 바 표시/숨기기",
      "<strong>↑ / ↓</strong> - 언어 탐색",
      "<strong>S</strong> - \"예\" 응답",
      "<strong>N</strong> - \"아니오\" 응답",
      "<strong>R</strong> - 다시 하기",
      "<strong>D</strong> - 이 명령 메뉴 열기/닫기"
      ],
      fechar: "닫기"
    }
  },

  ar: {
    titulo: "لعبة التخمين",
    descricao:
      "فكر في رقم بين <strong>1</strong> و <strong>63</strong>. سأكتشف الرقم الذي اخترته من خلال طرح بعض الأسئلة البسيطة.",
    comoFunciona: `
      <p><strong>كيف تعمل اللعبة؟</strong></p>
      <ul>
        <li>سأعرض لك بعض مجموعات الأرقام.</li>
        <li>لكل مجموعة، أجب ما إذا كان رقمك موجودًا بالنقر على <strong>نعم</strong> أو <strong>لا</strong>.</li>
        <li>في النهاية، سأخمن رقمك بناءً على إجاباتك.</li>
      </ul>
    `,
    menuIdioma: "🌐 اللغات",
    sim: "نعم",
    nao: "لا",
    jogarNovamente: "العب مرة أخرى",
    resultado: numero => `🎉 رقمك هو ${numero}! 🎉`,
    erroZero: "🤔 يبدو أن رقمك ليس بين 1 و 63!",
    menu: {
      configuracoes: "⚙️ الإعدادات",
      tema: "🎨 السمة",
      modo: "🌓 الوضع",
      brilho: "💡 السطوع"
    },
    usarTemaNavegador: "🌐 استخدام سمة المتصفح",
    temaClaro: "الوضع الفاتح",
    temaEscuro: "الوضع الداكن",
    desenvolvidoPor: "©2025 ميغيل إسكوبار — جميع الحقوق محفوظة.",
    perguntaXdeY: (x, y) => `السؤال ${x} من ${y}`,
    menuSecreto: {
      titulo: "أوامر لوحة المفاتيح",
      comandos: [
      "<strong>M</strong> - فتح/إغلاق القائمة الرئيسية",
      "<strong>C</strong> - فتح/إغلاق الإعدادات",
      "<strong>I</strong> - فتح/إغلاق اللغات",
      "<strong>K</strong> - فتح/إغلاق السمة",
      "<strong>T</strong> - تبديل الوضع الفاتح/الداكن",
      "<strong>P</strong> - إظهار/إخفاء شريط التقدم",
      "<strong>↑ / ↓</strong> - التنقل بين اللغات",
      "<strong>S</strong> - الرد بـ \"نعم\"",
      "<strong>N</strong> - الرد بـ \"لا\"",
      "<strong>R</strong> - اللعب مرة أخرى",
      "<strong>D</strong> - فتح/إغلاق قائمة الأوامر هذه"
      ],
      fechar: "إغلاق"
    }
  },
  
  hi: {
    titulo: "अनुमान लगाने का खेल",
    descricao:
      "<strong>1</strong> से <strong>63</strong> के बीच की एक संख्या सोचें। मैं कुछ सरल सवाल पूछकर यह पता लगाऊँगा कि आपने कौन सा नंबर चुना है।",
    comoFunciona: `
      <p><strong>यह कैसे काम करता है?</strong></p>
      <ul>
        <li>मैं आपको कुछ संख्याओं के समूह दिखाऊँगा।</li>
        <li>प्रत्येक समूह के लिए, यह उत्तर दें कि आपकी संख्या उसमें है या नहीं — <strong>हाँ</strong> या <strong>नहीं</strong> पर क्लिक करें।</li>
        <li>अंत में, मैं आपके उत्तरों के आधार पर आपकी संख्या का अनुमान लगाऊँगा।</li>
      </ul>
    `,
    menuIdioma: "🌐 भाषाएँ",
    sim: "हाँ",
    nao: "नहीं",
    jogarNovamente: "फिर से खेलें",
    resultado: numero => `🎉 आपकी संख्या है ${numero}! 🎉`,
    erroZero: "🤔 लगता है आपकी संख्या 1 से 63 के बीच नहीं है!",
    menu: {
      configuracoes: "⚙️ सेटिंग्स",
      tema: "🎨 थीम",
      modo: "🌓 मोड",
      brilho: "💡 ब्राइटनेस"
    },
    usarTemaNavegador: "🌐 ब्राउज़र की थीम का उपयोग करें",
    temaClaro: "प्रकाश मोड",
    temaEscuro: "डार्क मोड",
    desenvolvidoPor: "©2025 मिगुएल एस्कोबार — सर्वाधिकार सुरक्षित।",
    perguntaXdeY: (x, y) => `प्रश्न ${x} में से ${y}`,
    menuSecreto: {
      titulo: "कीबोर्ड कमांड",
      comandos: [
      "<strong>M</strong> - मुख्य मेनू खोलें/बंद करें",
      "<strong>C</strong> - सेटिंग्स खोलें/बंद करें",
      "<strong>I</strong> - भाषाएं खोलें/बंद करें",
      "<strong>K</strong> - थीम खोलें/बंद करें",
      "<strong>T</strong> - लाइट/डार्क मोड टॉगल करें",
      "<strong>P</strong> - प्रगति बार दिखाएं/छिपाएं",
      "<strong>↑ / ↓</strong> - भाषाओं के बीच नेविगेट करें",
      "<strong>S</strong> - \"हाँ\" जवाब दें",
      "<strong>N</strong> - \"नहीं\" जवाब दें",
      "<strong>R</strong> - फिर से खेलें",
      "<strong>D</strong> - इस कमांड मेनू को खोलें/बंद करें"
      ],
      fechar: "बंद करें"
    }
  },

  bn: {
    titulo: "সংখ্যা অনুমান খেলা",
    descricao:
      "<strong>1</strong> থেকে <strong>63</strong> এর মধ্যে একটি সংখ্যা ভাবুন। আমি কিছু সহজ প্রশ্ন করে বুঝে যাব আপনি কোন সংখ্যা বেছে নিয়েছেন।",
    comoFunciona: `
      <p><strong>কীভাবে কাজ করে?</strong></p>
      <ul>
        <li>আমি কিছু সংখ্যার সেট দেখাব।</li>
        <li>প্রত্যেক সেটে, আপনার সংখ্যা আছে কিনা তা <strong>হ্যাঁ</strong> অথবা <strong>না</strong> ক্লিক করে জানান।</li>
        <li>সবশেষে, আমি আপনার উত্তরগুলোর উপর ভিত্তি করে সংখ্যাটি অনুমান করব।</li>
      </ul>
    `,
    menuIdioma: "🌐 ভাষাসমূহ",
    sim: "হ্যাঁ",
    nao: "না",
    jogarNovamente: "আবার খেলুন",
    resultado: numero => `🎉 আপনার সংখ্যা হলো ${numero}! 🎉`,
    erroZero: "🤔 মনে হচ্ছে আপনার সংখ্যা 1 থেকে 63-এর মধ্যে নয়!",
    menu: {
      configuracoes: "⚙️ সেটিংস",
      tema: "🎨 থিম",
      modo: "🌓 মোড",
      brilho: "💡 উজ্জ্বলতা"
    },
    usarTemaNavegador: "🌐 ব্রাউজারের থিম ব্যবহার করুন",
    temaClaro: "আলো মোড",
    temaEscuro: "ডার্ক মোড",
    desenvolvidoPor: "©২০২৫ মিগুয়েল এস্কোবার — সর্বস্বত্ব সংরক্ষিত।",
    perguntaXdeY: (x, y) => `প্রশ্ন ${x} এর ${y}`,
    menuSecreto: {
      titulo: "কীবোর্ড কমান্ড",
      comandos: [
      "<strong>M</strong> - প্রধান মেনু খুলুন/বন্ধ করুন",
      "<strong>C</strong> - সেটিংস খুলুন/বন্ধ করুন",
      "<strong>I</strong> - ভাষা খুলুন/বন্ধ করুন",
      "<strong>K</strong> - থিম খুলুন/বন্ধ করুন",
      "<strong>T</strong> - লাইট/ডার্ক মোড টগল করুন",
      "<strong>P</strong> - প্রগতি বার দেখান/লুকান",
      "<strong>↑ / ↓</strong> - ভাষার মধ্যে নেভিগেট করুন",
      "<strong>S</strong> - \"হ্যাঁ\" উত্তর দিন",
      "<strong>N</strong> - \"না\" উত্তর দিন",
      "<strong>R</strong> - আবার খেলুন",
      "<strong>D</strong> - এই কমান্ড মেনু খুলুন/বন্ধ করুন"
      ],
      fechar: "বন্ধ করুন"
    }
  },
  
  ur: {
    titulo: "نمبر اندازہ لگانے کا کھیل",
    descricao:
      "<strong>1</strong> سے <strong>63</strong> کے درمیان ایک نمبر سوچیں۔ میں چند آسان سوالات پوچھ کر یہ معلوم کروں گا کہ آپ نے کون سا نمبر چنا ہے۔",
    comoFunciona: `
      <p><strong>یہ کیسے کام کرتا ہے؟</strong></p>
      <ul>
        <li>میں آپ کو کچھ نمبروں کے سیٹ دکھاؤں گا۔</li>
        <li>ہر سیٹ کے لیے، بتائیں کہ آیا آپ کا نمبر موجود ہے یا نہیں — <strong>ہاں</strong> یا <strong>نہیں</strong> پر کلک کریں۔</li>
        <li>آخر میں، میں آپ کے جوابات کی بنیاد پر آپ کا نمبر بتاؤں گا۔</li>
      </ul>
    `,
    menuIdioma: "🌐 زبانیں",
    sim: "ہاں",
    nao: "نہیں",
    jogarNovamente: "دوبارہ کھیلیں",
    resultado: numero => `🎉 آپ کا نمبر ہے ${numero}! 🎉`,
    erroZero: "🤔 لگتا ہے آپ کا نمبر 1 سے 63 کے درمیان نہیں ہے!",
    menu: {
      configuracoes: "⚙️ ترتیبات",
      tema: "🎨 تھیم",
      modo: "🌓 موڈ",
      brilho: "💡 چمک"
    },
    usarTemaNavegador: "🌐 براؤزر کا تھیم استعمال کریں",
    temaClaro: "روشن موڈ",
    temaEscuro: "اندھیرا موڈ",
    desenvolvidoPor: "©2025 میگوئل ایسکوبار — جملہ حقوق محفوظ ہیں۔",
    perguntaXdeY: (x, y) => `سوال ${x} میں سے ${y}`,
    menuSecreto: {
      titulo: "کی بورڈ کمانڈز",
      comandos: [
      "<strong>M</strong> - مرکزی مینو کھولیں/بند کریں",
      "<strong>C</strong> - سیٹنگز کھولیں/بند کریں",
      "<strong>I</strong> - زبانیں کھولیں/بند کریں",
      "<strong>K</strong> - تھیم کھولیں/بند کریں",
      "<strong>T</strong> - لائٹ/ڈارک موڈ ٹوگل کریں",
      "<strong>P</strong> - پروگریس بار دکھائیں/چھپائیں",
      "<strong>↑ / ↓</strong> - زبانوں کے درمیان نیویگیٹ کریں",
      "<strong>S</strong> - \"ہاں\" کا جواب دیں",
      "<strong>N</strong> - \"نہیں\" کا جواب دیں",
      "<strong>R</strong> - دوبارہ کھیلیں",
      "<strong>D</strong> - اس کمانڈ مینو کو کھولیں/بند کریں"
      ],
      fechar: "بند کریں"
    }
  },

  mr: {
    titulo: "संख्या ओळखण्याचा खेळ",
    descricao:
      "<strong>1</strong> ते <strong>63</strong> दरम्यानची एक संख्या मनात ठेवा. मी काही सोपे प्रश्न विचारून तुम्ही कोणता क्रमांक निवडला आहे ते शोधून काढीन.",
    comoFunciona: `
      <p><strong>हे कसे कार्य करते?</strong></p>
      <ul>
        <li>मी काही संख्या समूह दाखवीन.</li>
        <li>प्रत्येक समूहात तुमची संख्या आहे की नाही, <strong>होय</strong> किंवा <strong>नाही</strong> क्लिक करून उत्तर द्या.</li>
        <li>शेवटी, मी तुमच्या उत्तरांवरून तुमची संख्या ओळखीन.</li>
      </ul>
    `,
    menuIdioma: "🌐 भाषा",
    sim: "होय",
    nao: "नाही",
    jogarNovamente: "पुन्हा खेळा",
    resultado: numero => `🎉 तुमची संख्या आहे ${numero}! 🎉`,
    erroZero: "🤔 तुमची संख्या 1 ते 63 दरम्यान दिसत नाही!",
    menu: {
      configuracoes: "⚙️ सेटिंग्ज",
      tema: "🎨 थीम",
      modo: "🌓 मोड",
      brilho: "💡 ब्राइटनेस"
    },
    usarTemaNavegador: "🌐 ब्राउझर थीम वापरा",
    temaClaro: "प्रकाश मोड",
    temaEscuro: "गडद मोड",
    desenvolvidoPor: "©2025 मिगुएल एस्कोबार — सर्व हक्क राखीव.",
    perguntaXdeY: (x, y) => `प्रश्न ${x} का ${y}`,
    menuSecreto: {
      titulo: "कीबोर्ड आदेश",
      comandos: [
      "<strong>M</strong> - मुख्य मेनू उघडा/बंद करा",
      "<strong>C</strong> - सेटिंग्ज उघडा/बंद करा",
      "<strong>I</strong> - भाषा उघडा/बंद करा",
      "<strong>K</strong> - थीम उघडा/बंद करा",
      "<strong>T</strong> - लाईट/डार्क मोड टॉगल करा",
      "<strong>P</strong> - प्रगती पट्टी दाखवा/लपवा",
      "<strong>↑ / ↓</strong> - भाषांमध्ये नेव्हिगेट करा",
      "<strong>S</strong> - \"होय\" उत्तर द्या",
      "<strong>N</strong> - \"नाही\" उत्तर द्या",
      "<strong>R</strong> - पुन्हा खेळा",
      "<strong>D</strong> - हे आदेश मेनू उघडा/बंद करा"
      ],
      fechar: "बंद करा"
    }
  },

  th: {
    titulo: "เกมทายตัวเลข",
    descricao:
      "นึกถึงตัวเลขระหว่าง <strong>1</strong> ถึง <strong>63</strong> ฉันจะค้นหาหมายเลขที่คุณเลือกโดยการถามคำถามง่าย ๆ ไม่กี่ข้อ",
    comoFunciona: `
      <p><strong>วิธีการทำงาน</strong></p>
      <ul>
        <li>ฉันจะแสดงชุดของตัวเลขบางชุด</li>
        <li>ในแต่ละชุด ให้คลิก <strong>ใช่</strong> หรือ <strong>ไม่</strong> เพื่อบอกว่ามีเลขของคุณหรือไม่</li>
        <li>เมื่อเสร็จสิ้น ฉันจะเดาหมายเลขของคุณตามคำตอบของคุณ</li>
      </ul>
    `,
    menuIdioma: "🌐 ภาษา",
    sim: "ใช่",
    nao: "ไม่",
    jogarNovamente: "เล่นอีกครั้ง",
    resultado: numero => `🎉 หมายเลขของคุณคือ ${numero}! 🎉`,
    erroZero: "🤔 ดูเหมือนว่าหมายเลขของคุณจะไม่อยู่ระหว่าง 1 ถึง 63!",
    menu: {
      configuracoes: "⚙️ การตั้งค่า",
      tema: "🎨 ธีม",
      modo: "🌓 โหมด",
      brilho: "💡 ความสว่าง"
    },
    usarTemaNavegador: "🌐 ใช้ธีมของเบราว์เซอร์",
    temaClaro: "โหมดสว่าง",
    temaEscuro: "โหมดมืด",
    desenvolvidoPor: "©2025 มิเกล เอสโกบาร์ — สงวนลิขสิทธิ์ทั้งหมด.",
    perguntaXdeY: (x, y) => `คำถาม ${x} จาก ${y}`,
    menuSecreto: {
      titulo: "คำสั่งคีย์บอร์ด",
      comandos: [
      "<strong>M</strong> - เปิด/ปิดเมนูหลัก",
      "<strong>C</strong> - เปิด/ปิดการตั้งค่า",
      "<strong>I</strong> - เปิด/ปิดภาษา",
      "<strong>K</strong> - เปิด/ปิดธีม",
      "<strong>T</strong> - สลับโหมดสว่าง/มืด",
      "<strong>P</strong> - แสดง/ซ่อนแถบความคืบหน้า",
      "<strong>↑ / ↓</strong> - เลื่อนดูภาษาต่างๆ",
      "<strong>S</strong> - ตอบว่า \"ใช่\"",
      "<strong>N</strong> - ตอบว่า \"ไม่\"",
      "<strong>R</strong> - เล่นอีกครั้ง",
      "<strong>D</strong> - เปิด/ปิดเมนูคำสั่งนี้"
      ],
      fechar: "ปิด"
    }
  },
};

function atualizarIdioma(idioma) {
  idiomaAtual = idioma;
  const t = traducoes[idioma];
  const menuSecreto = document.getElementById("menu-secreto");
  menuSecreto.querySelector("h3").textContent = t.menuSecreto.titulo;
  const listaComandos = menuSecreto.querySelector("ul");
  listaComandos.innerHTML = t.menuSecreto.comandos.map(cmd => `<li>${cmd}</li>`).join("");
  const btnFecharSecreto = menuSecreto.querySelector("button");
  btnFecharSecreto.textContent = t.menuSecreto.fechar;

  document.querySelector("h1").textContent = t.titulo;
  document.querySelector(".description").innerHTML = t.descricao;
  document.getElementById("explicacao").innerHTML = t.comoFunciona;
  document.getElementById("btn-menu-idioma").textContent = t.menuIdioma;
  document.getElementById("btn-menu-config").textContent = t.menu.configuracoes;
  document.getElementById("btn-menu-tema").textContent = t.menu.tema;
  document.getElementById("btn-menu-modo").textContent = t.menu.modo;
  document.getElementById("btn-menu-brilho").textContent = t.menu.brilho;
  btnAutoTheme.textContent = t.usarTemaNavegador;
  btnAutoTheme.setAttribute("aria-label", t.usarTemaNavegador);

  btnSim.textContent = t.sim;
  btnNao.textContent = t.nao;
  btnReiniciar.textContent = t.jogarNovamente;
  document.querySelector("footer p").textContent = t.desenvolvidoPor;

  if (indicePergunta >= conjuntos.length) {
    resultadoDiv.textContent = numero === 0 ? t.erroZero : t.resultado(numero);
  }
  idiomaBtns.forEach(b => {
    if (b.dataset.lang === idioma) {
      b.classList.add("idioma-ativo");
    } else {
      b.classList.remove("idioma-ativo");
    }
  });

  atualizarTextoBotaoTema();
  atualizarBarraProgresso();
}

function atualizarTextoBotaoTema() {
  const t = traducoes[idiomaAtual];
  if (document.body.classList.contains("dark")) {
    btnToggleTheme.textContent = t.temaClaro;
    btnToggleTheme.setAttribute("aria-label", t.temaClaro);
  } else {
    btnToggleTheme.textContent = t.temaEscuro;
    btnToggleTheme.setAttribute("aria-label", t.temaEscuro);
  }
}

const menuHamburguer = document.getElementById("menu-hamburguer");
const menuPrincipal = document.getElementById("menu-principal");
const btnMenuIdioma = document.getElementById("btn-menu-idioma");
const menuIdioma = document.getElementById("menu-idioma");
const idiomaBtns = document.querySelectorAll(".idioma-btn");
const btnMenuConfig = document.getElementById("btn-menu-config");
const menuConfig = document.getElementById("menu-config");
const btnMenuTema = document.getElementById("btn-menu-tema");
const menuTema = document.getElementById("menu-tema");
const btnMenuModo = document.getElementById("btn-menu-modo");
const menuModo = document.getElementById("menu-modo");
const btnMenuBrilho = document.getElementById("btn-menu-brilho");
const menuBrilho = document.getElementById("menu-brilho");

menuHamburguer.addEventListener("click", () => {
  menuPrincipal.classList.toggle("menu-fechado");
});

btnMenuIdioma.addEventListener("click", () => {
  menuIdioma.classList.toggle("menu-fechado");
});

btnMenuConfig.addEventListener("click", () => {
  menuConfig.classList.toggle("menu-fechado");
});

btnMenuTema.addEventListener("click", () => {
  menuTema.classList.toggle("menu-fechado");
});

btnMenuModo.addEventListener("click", () => {
  menuModo.classList.toggle("menu-fechado");
});



btnMenuBrilho.addEventListener("click", () => {
  menuBrilho.classList.toggle("menu-fechado");
});

idiomaBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang; 
    atualizarIdioma(lang);
    localStorage.setItem("idioma", lang); 
    menuIdioma.classList.add("menu-fechado");
    idiomaBtns.forEach(b => b.classList.remove("idioma-ativo"));
    btn.classList.add("idioma-ativo");
  });
});

const idiomaSalvo = localStorage.getItem("idioma");
const idiomaDoNavegador = navigator.language.slice(0, 2);
const idiomaInicial = idiomaSalvo || (traducoes[idiomaDoNavegador] ? idiomaDoNavegador : "pt");

atualizarIdioma(idiomaInicial);

document.querySelectorAll(".idioma-btn").forEach(btn => {
  if (btn.dataset.lang === idiomaInicial) {
    btn.classList.add("idioma-ativo");
  }
});

const temaSalvo = localStorage.getItem("modoTema");
if (temaSalvo) {
  document.body.classList.toggle("dark", temaSalvo === "dark");
} else {
  const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark", prefereEscuro);
}

atualizarTextoBotaoTema();

mostrarPergunta();

function atualizarBarraProgresso() {
  const t = traducoes[idiomaAtual];
  const progresso = document.getElementById("barra-progresso");
  progresso.textContent = t.perguntaXdeY(indicePergunta + 1, conjuntos.length);
}

let idiomaIndex = 0;
let idiomaVisivel = false;

btnMenuIdioma.addEventListener("click", () => {
  idiomaVisivel = !menuIdioma.classList.contains("menu-fechado");

  if (idiomaVisivel) {
    idiomaIndex = Array.from(idiomaBtns).findIndex(btn => btn.dataset.lang === idiomaAtual);

    if (idiomaIndex === -1) idiomaIndex = 0;

    idiomaBtns[idiomaIndex].focus();
  }
});


document.addEventListener("keydown", function (e) {  
  if (e.key === "c" || e.key === "C") {
  if (menuPrincipal.classList.contains("menu-fechado")) {
    menuHamburguer.click();
  }
  if (menuIdioma.classList.contains("menu-fechado")) {
    btnMenuConfig.click(); 
  }
} 

if (e.key === "p" || e.key === "P") {
  const barra = document.getElementById("barra-progresso");
  if (barra.style.display === "none") {
    barra.style.display = "block";
  } else {
    barra.style.display = "none";
  }
}

  if (e.key === "t" || e.key === "T") {
    btnToggleTheme.click();
  }

    if (e.key === "i" || e.key === "I") {
  if (menuPrincipal.classList.contains("menu-fechado")) {
    menuHamburguer.click();
  }

  if (menuConfig.classList.contains("menu-fechado")) {
    btnMenuConfig.click();
  }

  if (menuIdioma.classList.contains("menu-fechado")) {
    btnMenuIdioma.click();
  }
}
  if (e.key === "k" || e.key === "K") {
  if (menuPrincipal.classList.contains("menu-fechado")) {
    menuHamburguer.click();
  }
  if (menuConfig.classList.contains("menu-fechado")) {
    btnMenuConfig.click();
  }
  btnMenuTema.click();
}

  if (e.key === "m" || e.key === "M") {
     menuHamburguer.click();
  }
  if (idiomaVisivel) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      idiomaIndex = (idiomaIndex + 1) % idiomaBtns.length;
      idiomaBtns[idiomaIndex].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      idiomaIndex = (idiomaIndex - 1 + idiomaBtns.length) % idiomaBtns.length;
      idiomaBtns[idiomaIndex].focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      idiomaBtns[idiomaIndex].click();
      menuIdioma.classList.add("menu-fechado");
      menuPrincipal.classList.add("menu-fechado");
      idiomaVisivel = false;
      btnMenuIdioma.focus();
    } else if (e.key === "Escape") {
      menuIdioma.classList.add("menu-fechado");
      idiomaVisivel = false;
    }
  }
  if (e.key === "s" || e.key === "S") {
    if (getComputedStyle(botoesContainer).display !== "none") {
      e.preventDefault();
      btnSim.click();
    }
  }

  if (e.key === "n" || e.key === "N") {
    if (getComputedStyle(botoesContainer).display !== "none") {
      e.preventDefault();
      btnNao.click();
    }
  }

  if (
    (e.key === "r" || e.key === "R") &&
    reiniciarContainer.style.display !== "none"
  ) {
    e.preventDefault();
    btnReiniciar.click();
  }
});

const menuSecreto = document.getElementById("menu-secreto");
const btnFecharSecreto = document.getElementById("btn-fechar-secreto");

let combinacaoSecreta = [];

document.addEventListener("keydown", function (e) {
  if (e.key === "d" || e.key === "D") {
    menuSecreto.classList.toggle("menu-fechado");
  }
});

btnFecharSecreto.addEventListener("click", function () {
  menuSecreto.classList.add("menu-fechado");
});

document.addEventListener("click", (event) => {
  const isClickInsideMenu = menuPrincipal.contains(event.target) || menuHamburguer.contains(event.target);
  const isClickInsideIdioma = menuIdioma.contains(event.target) || btnMenuIdioma.contains(event.target);
  const isClickInsideConfig = menuConfig.contains(event.target) || btnMenuConfig.contains(event.target);
  const isClickInsideTema = menuTema.contains(event.target) || btnMenuTema.contains(event.target);

  if (!isClickInsideMenu && !isClickInsideIdioma && !isClickInsideConfig && !isClickInsideTema) {
    if (!menuIdioma.classList.contains("menu-fechado")) {
      menuIdioma.classList.add("menu-fechado");
    }
    if (!menuTema.classList.contains("menu-fechado")) {
      menuTema.classList.add("menu-fechado");
    }
    if (!menuConfig.classList.contains("menu-fechado")) {
      menuConfig.classList.add("menu-fechado");
    }
    if (!menuPrincipal.classList.contains("menu-fechado")) {
      menuPrincipal.classList.add("menu-fechado");
    }
  }
});

controleBrilho.addEventListener("input", () => {
  const brilho = controleBrilho.value;
  const intensidade = brilho / 10;
  const resultado = document.getElementById("resultado");
  resultado.style.textShadow = `
    0 0 ${10 + brilho * 2}px rgba(199, 244, 100, ${intensidade})
  `;
});

controleBrilho.addEventListener("input", () => {
  const brilho = parseInt(controleBrilho.value);
  if (brilho === 0) {
    resultadoDiv.style.textShadow = "none";
    resultadoDiv.style.animation = "none";
  } else {
    const intensidade = brilho * 3; 
    resultadoDiv.style.textShadow = `
      0 0 ${intensidade}px #c7f464aa,
      0 0 ${intensidade * 2}px #c7f464cc
    `;
    resultadoDiv.style.animation = "none";
  }
});

document.addEventListener("click", function (e) {
  const menusAbertos = [
    menuPrincipal,
    menuConfig,
    menuTema,
    menuModo,
    menuBrilho,
    menuIdioma,
    menuSecreto,
  ];

  const botoesMenus = [
    menuHamburguer,
    btnMenuConfig,
    btnMenuTema,
    btnMenuModo,
    btnMenuBrilho,
    btnMenuIdioma,
    btnToggleTheme,
    btnAutoTheme,
    btnFecharSecreto,
  ];

  const clicouDentroDeAlgumMenu = menusAbertos.some(menu => menu.contains(e.target));
  const clicouEmBotaoDeMenu = botoesMenus.some(botao => botao.contains(e.target));

  if (!clicouDentroDeAlgumMenu && !clicouEmBotaoDeMenu) {
    menusAbertos.forEach(menu => menu.classList.add("menu-fechado"));
  }
});
