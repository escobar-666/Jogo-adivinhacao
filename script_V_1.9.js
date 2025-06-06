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

function mostrarPergunta() {
  const t = traducoes[idiomaAtual];
  const perguntaTexto = ""; 
  perguntaContainer.innerHTML = perguntaTexto + `<pre class="fade-in">${conjuntos[indicePergunta]}</pre>`;
  resultadoDiv.textContent = "";
  resultadoDiv.classList.remove("celebration");
  botoesContainer.style.display = "flex";
  reiniciarContainer.style.display = "none";
  atualizarBarraProgresso();
}

function responder(sim) {
  if (sim) {
    numero += valores[indicePergunta];
  }
  indicePergunta++;
  if (indicePergunta < conjuntos.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  perguntaContainer.innerHTML = "";
  botoesContainer.style.display = "none";

  if (numero === 0) {
    resultadoDiv.textContent = traducoes[idiomaAtual].erroZero;
  } else {
    resultadoDiv.textContent = traducoes[idiomaAtual].resultado(numero);
    resultadoDiv.classList.add("celebration");
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

  }

  reiniciarContainer.style.display = "flex";
}

btnSim.addEventListener("click", () => responder(true));
btnNao.addEventListener("click", () => responder(false));
btnReiniciar.addEventListener("click", () => {
  indicePergunta = 0;
  numero = 0;
  mostrarPergunta();
});

btnToggleTheme.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("modoTema", isDark ? "dark" : "light");
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
    temaClaro: "Modo Claro",
    temaEscuro: "Modo Escuro",
    desenvolvidoPor: "Desenvolvido por Miguel Escobar",
    perguntaXdeY: (x, y) => `Pergunta ${x} de ${y}`,
    menuSecreto: {
      titulo: "Comandos de Teclado",
      comandos: [
        "<strong>T</strong> - Alternar Modo Claro/Escuro",
        "<strong>M</strong> - Abrir/Fechar Menu",
        "<strong>I</strong> - Abrir/Fechar Idiomas",
        "<strong>↑ / ↓</strong> - Navegar entre idiomas",
        "<strong>S</strong> - Responder \"Sim\"",
        "<strong>N</strong> - Responder \"Não\"",
        "<strong>R</strong> - Reiniciar o jogo",
        "<strong>C</strong> - Abrir este menu secreto de comandos"
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
    temaClaro: "Light Mode",
    temaEscuro: "Dark Mode",
    desenvolvidoPor: "Developed by Miguel Escobar",
    perguntaXdeY: (x, y) => `Question ${x} of ${y}`,
    menuSecreto: {
      titulo: "Keyboard Commands",
      comandos: [
        "<strong>T</strong> - Toggle Light/Dark Mode",
        "<strong>M</strong> - Open/Close Menu",
        "<strong>I</strong> - Open/Close Languages",
        "<strong>↑ / ↓</strong> - Navigate between languages",
        "<strong>S</strong> - Answer \"Yes\"",
        "<strong>N</strong> - Answer \"No\"",
        "<strong>R</strong> - Restart the game",
        "<strong>C</strong> - Open this secret command menu"
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
    temaClaro: "Modo Claro",
    temaEscuro: "Modo Oscuro",
    desenvolvidoPor: "Desarrollado por Miguel Escobar",
    perguntaXdeY: (x, y) => `Pregunta ${x} de ${y}`,
    menuSecreto: {
      titulo: "Comandos de Teclado",
      comandos: [
        "<strong>T</strong> - Alternar Modo Claro/Oscuro",
        "<strong>M</strong> - Abrir/Cerrar Menú",
        "<strong>I</strong> - Abrir/Cerrar Idiomas",
        "<strong>↑ / ↓</strong> - Navegar entre idiomas",
        "<strong>S</strong> - Responder \"Sí\"",
        "<strong>N</strong> - Responder \"No\"",
        "<strong>R</strong> - Reiniciar el juego",
        "<strong>C</strong> - Abrir este menú secreto de comandos"
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
    temaClaro: "Mode Clair",
    temaEscuro: "Mode Sombre",
    desenvolvidoPor: "Développé par Miguel Escobar",
    perguntaXdeY: (x, y) => `Question ${x} sur ${y}`,
    menuSecreto: {
      titulo: "Commandes Clavier",
      comandos: [
        "<strong>T</strong> - Activer/Désactiver le Mode Clair/Sombre",
        "<strong>M</strong> - Ouvrir/Fermer le Menu",
        "<strong>I</strong> - Ouvrir/Fermer les Langues",
        "<strong>↑ / ↓</strong> - Naviguer entre les langues",
        "<strong>S</strong> - Répondre \"Oui\"",
        "<strong>N</strong> - Répondre \"Non\"",
        "<strong>R</strong> - Redémarrer le jeu",
        "<strong>C</strong> - Ouvrir ce menu secret de commandes"
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
    temaClaro: "Modalità Chiara",
    temaEscuro: "Modalità Scura",
    desenvolvidoPor: "Sviluppato da Miguel Escobar",
    perguntaXdeY: (x, y) => `Domanda ${x} di ${y}`,
    menuSecreto: {
      titulo: "Comandi da Tastiera",
      comandos: [
        "<strong>T</strong> - Attiva/Disattiva Modalità Chiara/Scura",
        "<strong>M</strong> - Apri/Chiudi Menu",
        "<strong>I</strong> - Apri/Chiudi Lingue",
        "<strong>↑ / ↓</strong> - Naviga tra le lingue",
        "<strong>S</strong> - Rispondere \"Sì\"",
        "<strong>N</strong> - Rispondere \"No\"",
        "<strong>R</strong> - Riavvia il gioco",
        "<strong>C</strong> - Apri questo menu segreto di comandi"
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
    temaClaro: "Heller Modus",
    temaEscuro: "Dunkler Modus",
    desenvolvidoPor: "Entwickelt von Miguel Escobar",
    perguntaXdeY: (x, y) => `Frage ${x} von ${y}`,
    menuSecreto: {
      titulo: "Tastaturbefehle",
      comandos: [
        "<strong>T</strong> - Hell/Dunkel Modus umschalten",
        "<strong>M</strong> - Menü öffnen/schließen",
        "<strong>I</strong> - Sprachen öffnen/schließen",
        "<strong>↑ / ↓</strong> - Zwischen Sprachen navigieren",
        "<strong>S</strong> - Mit \"Ja\" antworten",
        "<strong>N</strong> - Mit \"Nein\" antworten",
        "<strong>R</strong> - Spiel neu starten",
        "<strong>C</strong> - Dieses geheime Befehlsmenü öffnen"
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
    temaClaro: "Mode Terang",
    temaEscuro: "Mode Gelap",
    desenvolvidoPor: "Dikembangkan oleh Miguel Escobar",
    perguntaXdeY: (x, y) => `Pertanyaan ${x} dari ${y}`,
    menuSecreto: {
      titulo: "Perintah Keyboard",
      comandos: [
        "<strong>T</strong> - Ubah Mode Terang/Gelap",
        "<strong>M</strong> - Buka/Tutup Menu",
        "<strong>I</strong> - Buka/Tutup Bahasa",
        "<strong>↑ / ↓</strong> - Navigasi antar bahasa",
        "<strong>S</strong> - Jawab \"Ya\"",
        "<strong>N</strong> - Jawab \"Tidak\"",
        "<strong>R</strong> - Mulai ulang permainan",
        "<strong>C</strong> - Buka menu perintah rahasia ini"
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
    temaClaro: "Светлая тема",
    temaEscuro: "Тёмная тема",
    desenvolvidoPor: "Разработано Miguel Escobar",
    perguntaXdeY: (x, y) => `Вопрос ${x} из ${y}`,
    menuSecreto: {
      titulo: "Горячие клавиши",
      comandos: [
        "<strong>T</strong> - Переключить Светлый/Тёмный режим",
        "<strong>M</strong> - Открыть/Закрыть меню",
        "<strong>I</strong> - Открыть/Закрыть языки",
        "<strong>↑ / ↓</strong> - Перемещаться между языками",
        "<strong>S</strong> - Ответить \"Да\"",
        "<strong>N</strong> - Ответить \"Нет\"",
        "<strong>R</strong> - Перезапустить игру",
        "<strong>C</strong> - Открыть это секретное меню команд"
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
    temaClaro: "浅色模式",
    temaEscuro: "深色模式",
    desenvolvidoPor: "由 Miguel Escobar 开发",
    perguntaXdeY: (x, y) => `第 ${x} 题，总共 ${y} 题`,
    menuSecreto: {
      titulo: "键盘命令",
      comandos: [
        "<strong>T</strong> - 切换亮/暗模式",
        "<strong>M</strong> - 打开/关闭菜单",
        "<strong>I</strong> - 打开/关闭语言",
        "<strong>↑ / ↓</strong> - 在语言之间导航",
        "<strong>S</strong> - 回答“是”",
        "<strong>N</strong> - 回答“否”",
        "<strong>R</strong> - 重新开始游戏",
        "<strong>C</strong> - 打开这个隐藏命令菜单"
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
    temaClaro: "ライトモード",
    temaEscuro: "ダークモード",
    desenvolvidoPor: "Miguel Escobar によって開発されました",
    perguntaXdeY: (x, y) => `質問 ${x} / ${y}`,
    menuSecreto: {
      titulo: "キーボードコマンド",
      comandos: [
        "<strong>T</strong> - ライト/ダークモード切替",
        "<strong>M</strong> - メニューを開閉",
        "<strong>I</strong> - 言語メニューを開閉",
        "<strong>↑ / ↓</strong> - 言語間を移動",
        "<strong>S</strong> - 「はい」と答える",
        "<strong>N</strong> - 「いいえ」と答える",
        "<strong>R</strong> - ゲームを再起動",
        "<strong>C</strong> - この秘密のコマンドメニューを開く"
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
    temaClaro: "라이트 모드",
    temaEscuro: "다크 모드",
    desenvolvidoPor: "Miguel Escobar 제작",
    perguntaXdeY: (x, y) => `${y}의 ${x}번째 질문`,
    menuSecreto: {
      titulo: "키보드 명령어",
      comandos: [
        "<strong>T</strong> - 라이트/다크 모드 전환",
        "<strong>M</strong> - 메뉴 열기/닫기",
        "<strong>I</strong> - 언어 열기/닫기",
        "<strong>↑ / ↓</strong> - 언어 간 탐색",
        "<strong>S</strong> - \"예\"로 답하기",
        "<strong>N</strong> - \"아니오\"로 답하기",
        "<strong>R</strong> - 게임 재시작",
        "<strong>C</strong> - 이 비밀 명령어 메뉴 열기"
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
    temaClaro: "الوضع الفاتح",
    temaEscuro: "الوضع الداكن",
    desenvolvidoPor: "تم التطوير بواسطة Miguel Escobar",
    perguntaXdeY: (x, y) => `السؤال ${x} من ${y}`,
    menuSecreto: {
      titulo: "أوامر لوحة المفاتيح",
      comandos: [
        "<strong>T</strong> - تبديل الوضع الفاتح/الداكن",
        "<strong>M</strong> - فتح/إغلاق القائمة",
        "<strong>I</strong> - فتح/إغلاق اللغات",
        "<strong>↑ / ↓</strong> - التنقل بين اللغات",
        "<strong>S</strong> - الرد بـ \"نعم\"",
        "<strong>N</strong> - الرد بـ \"لا\"",
        "<strong>R</strong> - إعادة تشغيل اللعبة",
        "<strong>C</strong> - فتح قائمة الأوامر السرية هذه"
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
    temaClaro: "प्रकाश मोड",
    temaEscuro: "डार्क मोड",
    desenvolvidoPor: "Miguel Escobar द्वारा विकसित",
    perguntaXdeY: (x, y) => `प्रश्न ${x} में से ${y}`,
    menuSecreto: {
      titulo: "कीबोर्ड कमांड",
      comandos: [
        "<strong>T</strong> - लाइट/डार्क मोड बदलें",
        "<strong>M</strong> - मेनू खोलें/बंद करें",
        "<strong>I</strong> - भाषाएँ खोलें/बंद करें",
        "<strong>↑ / ↓</strong> - भाषाओं के बीच नेविगेट करें",
        "<strong>S</strong> - \"हाँ\" का उत्तर दें",
        "<strong>N</strong> - \"नहीं\" का उत्तर दें",
        "<strong>R</strong> - खेल पुनः प्रारंभ करें",
        "<strong>C</strong> - इस गुप्त कमांड मेनू को खोलें"
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
    temaClaro: "আলো মোড",
    temaEscuro: "ডার্ক মোড",
    desenvolvidoPor: "Miguel Escobar দ্বারা উন্নত করা হয়েছে",
    perguntaXdeY: (x, y) => `প্রশ্ন ${x} এর ${y}`,
    menuSecreto: {
      titulo: "কীবোর্ড কমান্ড",
      comandos: [
        "<strong>T</strong> - লাইট/ডার্ক মোড পরিবর্তন",
        "<strong>M</strong> - মেনু খুলুন/বন্ধ করুন",
        "<strong>I</strong> - ভাষা খুলুন/বন্ধ করুন",
        "<strong>↑ / ↓</strong> - ভাষার মধ্যে নেভিগেট করুন",
        "<strong>S</strong> - \"হ্যাঁ\" উত্তর দিন",
        "<strong>N</strong> - \"না\" উত্তর দিন",
        "<strong>R</strong> - খেলা পুনরায় শুরু করুন",
        "<strong>C</strong> - এই গোপন কমান্ড মেনু খুলুন"
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
    temaClaro: "روشن موڈ",
    temaEscuro: "اندھیرا موڈ",
    desenvolvidoPor: "ڈویلپ کیا گیا از Miguel Escobar",
    perguntaXdeY: (x, y) => `سوال ${x} میں سے ${y}`,
    menuSecreto: {
      titulo: "کی بورڈ کمانڈز",
      comandos: [
        "<strong>T</strong> - لائٹ/ڈارک موڈ تبدیل کریں",
        "<strong>M</strong> - مینو کھولیں/بند کریں",
        "<strong>I</strong> - زبانیں کھولیں/بند کریں",
        "<strong>↑ / ↓</strong> - زبانوں کے درمیان نیویگیٹ کریں",
        "<strong>S</strong> - \"ہاں\" کا جواب دیں",
        "<strong>N</strong> - \"نہیں\" کا جواب دیں",
        "<strong>R</strong> - کھیل دوبارہ شروع کریں",
        "<strong>C</strong> - یہ خفیہ کمانڈ مینو کھولیں"
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
    temaClaro: "प्रकाश मोड",
    temaEscuro: "गडद मोड",
    desenvolvidoPor: "Miguel Escobar द्वारा विकसित",
    perguntaXdeY: (x, y) => `प्रश्न ${x} का ${y}`,
    menuSecreto: {
      titulo: "कीबोर्ड आदेश",
      comandos: [
        "<strong>T</strong> - प्रकाश/गडद मोड बदला",
        "<strong>M</strong> - मेनू उघडा/बंद करा",
        "<strong>I</strong> - भाषा उघडा/बंद करा",
        "<strong>↑ / ↓</strong> - भाषांमध्ये नेव्हिगेट करा",
        "<strong>S</strong> - \"होय\" उत्तर द्या",
        "<strong>N</strong> - \"नाही\" उत्तर द्या",
        "<strong>R</strong> - खेळ पुन्हा सुरू करा",
        "<strong>C</strong> - हे गुप्त आदेश मेनू उघडा"
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
    temaClaro: "โหมดสว่าง",
    temaEscuro: "โหมดมืด",
    desenvolvidoPor: "พัฒนาโดย Miguel Escobar",
    perguntaXdeY: (x, y) => `คำถาม ${x} จาก ${y}`,
    menuSecreto: {
      titulo: "คำสั่งคีย์บอร์ด",
      comandos: [
        "<strong>T</strong> - สลับโหมดสว่าง/มืด",
        "<strong>M</strong> - เปิด/ปิดเมนู",
        "<strong>I</strong> - เปิด/ปิดภาษา",
        "<strong>↑ / ↓</strong> - เลื่อนระหว่างภาษา",
        "<strong>S</strong> - ตอบว่า \"ใช่\"",
        "<strong>N</strong> - ตอบว่า \"ไม่\"",
        "<strong>R</strong> - เริ่มเกมใหม่",
        "<strong>C</strong> - เปิดเมนูคำสั่งลับนี้"
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

menuHamburguer.addEventListener("click", () => {
  menuPrincipal.classList.toggle("menu-fechado");
});

btnMenuIdioma.addEventListener("click", () => {
  menuIdioma.classList.toggle("menu-fechado");
});

idiomaBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang; // Agora lang está corretamente definido
    atualizarIdioma(lang);
    localStorage.setItem("idioma", lang); // Salva corretamente no localStorage
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
if (temaSalvo === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
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
  if (e.key === "t" || e.key === "T") {
    btnToggleTheme.click();
  }

  if (e.key === "i" || e.key === "I") {
    if (menuPrincipal.classList.contains("menu-fechado")) {
      menuHamburguer.click();
    }
    if (menuIdioma.classList.contains("menu-fechado")) {
      btnMenuIdioma.click();
    }
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
  if (e.key === "c" || e.key === "C") {
    menuSecreto.classList.toggle("menu-fechado");
  }
});

btnFecharSecreto.addEventListener("click", function () {
  menuSecreto.classList.add("menu-fechado");
});
