const VOW = "aeiou";
const CON = "bcdfghjklmnpqrstvwxyz";

// prettier-ignore
const CHEM_ELEMENTS_NAMES = [
    "actinium","aluminum","americium","antimony","argon","arsenic","astatine",
    "barium","berkelium","beryllium","bismuth","bohrium","boron","bromine","cadmium",
    "calcium","californium","carbon","cerium","cesium","chlorine","chromium","cobalt",
    "copernicium","copper","curium","darmstadtium","dubnium","dysprosium","einsteinium",
    "erbium","europium","fermium","flerovium","fluorine","francium","gadolinium","gallium",
    "germanium","gold","hafnium","hassium","helium","holmium","hydrogen","indium","iodine",
    "iridium","iron","krypton","lanthanum","lawrencium","lead","lithium","livermorium",
    "lutetium","magnesium","manganese","meitnerium","mendelevium","mercury","molybdenum",
    "moscovium","neodymium","neon","neptunium","nickel","nihonium","niobium","nitrogen",
    "nobelium","oganesson","osmium","oxygen","palladium","phosphorus","platinum","plutonium",
    "polonium","potassium","praseodymium","promethium","protactinium","radium","radon",
    "rhenium","rhodium","roentgenium","rubidium","ruthenium","rutherfordium",
    "samarium","scandium","seaborgium","selenium","silicon","silver","sodium",
    "strontium","sulfur","tantalum","technetium","tellurium","tennessine","terbium",
    "thallium","thorium","thulium","titanium","tungsten","uranium","vanadium",
    "xenon","ytterbium","yttrium","zinc","zirconium"
]
// prettier-ignore
const CHEM_ELEMENTS_SYMBOLS = [
    "ac","al","am","sb","ar","as","at","ba","bk","be","bi","bh","b","br","cd","ca","cf","c","ce",
    "cs","cl","cr","co","cn","cu","cm","ds","db","dy","es","er","eu","fm","fl","f","fr","gd","ga",
    "ge","au","hf","hs","he","ho","h","in","i","ir","fe","kr","la","lr","pb","li","lv","lu","mg",
    "mn","mt","md","hg","mo","mc","nd","ne","np","ni","nh","nb","n","no","og","os","o","pd","p",
    "pt","pu","po","k","pr","pm","pa","ra","rn","re","rh","rg","rb","ru","rf","sm","sc","sg","se",
    "si","ag","na","sr","s","ta","tc","te","ts","tb","tl","th","tm","sn","ti","w","u","v","xe","yb","y","zn","zr"
]

function get_random_vow() {
  return VOW[Math.floor(Math.random() * VOW.length)];
}
function get_random_con() {
  return CON[Math.floor(Math.random() * CON.length)];
}
function get_random_element_name() {
  return CHEM_ELEMENTS_NAMES[
    Math.floor(Math.random() * CHEM_ELEMENTS_NAMES.length)
  ];
}
function get_random_element_symbol() {
  return CHEM_ELEMENTS_SYMBOLS[
    Math.floor(Math.random() * CHEM_ELEMENTS_SYMBOLS.length)
  ];
}

let MAX_SYLLABLES = 3;
let MAX_WORDS = 10;

function change_max_syllables_range() {
  MAX_SYLLABLES = document.getElementById("MAX_SYLLABLES_range").value;
  document.getElementById("MAX_SYLLABLES_number").value = MAX_SYLLABLES;
}
function change_max_syllables_number() {
  MAX_SYLLABLES = document.getElementById("MAX_SYLLABLES_number").value;
  document.getElementById("MAX_SYLLABLES_range").value = MAX_SYLLABLES;
}
function change_max_words_range() {
  MAX_WORDS = document.getElementById("MAX_WORDS_range").value;
  document.getElementById("MAX_WORDS_number").value = MAX_WORDS;
}
function change_max_words_number() {
  MAX_WORDS = document.getElementById("MAX_WORDS_number").value;
  document.getElementById("MAX_WORDS_range").value = MAX_WORDS;
}

change_max_syllables_range();
change_max_words_range();

if (!localStorage.getItem("liked")) {
  localStorage.setItem("liked", JSON.stringify([]));
}

function like(word) {
  let liked = JSON.parse(localStorage.getItem("liked"));
  if (liked.includes(word)) return;
  liked.push(word);
  localStorage.setItem("liked", JSON.stringify(liked));
  print_liked();
}

function dislike(word) {
  let liked = JSON.parse(localStorage.getItem("liked"));
  liked = liked.filter((w) => w !== word);
  localStorage.setItem("liked", JSON.stringify(liked));
  print_liked();
}

function print_liked() {
  let liked = JSON.parse(localStorage.getItem("liked"));
  document.getElementById("liked").innerHTML = "";
  liked.forEach((word) => {
    document.getElementById(
      "liked"
    ).innerHTML += `<div class="word"><p>${word}</p><div class="btns"><button onclick="dislike('${word}')">Dislike</button> <button onclick="mutate_char('${word}')">Mutate Char</button> <button onclick="mutate_syl('${word}')">Mutate Syllable</button></div></div>`;
  });
}

print_liked();

function get_random_liked() {
  let liked = JSON.parse(localStorage.getItem("liked"));
  if (liked.length === 0) return alert("No liked words!");
  return liked[Math.floor(Math.random() * liked.length)];
}

function print_random_syllable() {
  document.getElementById("output").innerHTML = "";
  const ENABLED_STYLES = [];
  ["v", "vc", "cv", "cvc", "chem_sym"].forEach((style) => {
    document.getElementById(style).checked && ENABLED_STYLES.push(style);
  });
  if (ENABLED_STYLES.length === 0) {
    alert("Please select at least one style");
    return;
  }
  for (let i = 0; i < MAX_WORDS; i++) {
    let word = "";
    for (let j = 0; j < MAX_SYLLABLES; j++) {
      const STYLES = {
        v: `${get_random_vow()}`,
        vc: `${get_random_vow()}${get_random_con()}`,
        cv: `${get_random_con()}${get_random_vow()}`,
        cvc: `${get_random_con()}${get_random_vow()}${get_random_con()}`,
        chem_sym: `${get_random_element_symbol()}`,
      };
      word +=
        STYLES[
          ENABLED_STYLES[Math.floor(Math.random() * ENABLED_STYLES.length)]
        ];
    }
    document.getElementById(
      "output"
    ).innerHTML += `<div class="word"><p>${word}</p><div class="btns"><button onclick="like('${word}')">Like</button> <button onclick="mutate_char('${word}')">Mutate Char</button> <button onclick="mutate_syl('${word}')">Mutate Syllable</button></div></div>`;
  }
}

function mutate_char(word) {
  document.getElementById("output").innerHTML = "";
  for (let i = 0; i < MAX_WORDS; i++) {
    let new_word = [...word];
    const pos = Math.floor(Math.random() * new_word.length);
    const rand_char = word[pos];
    if (VOW.includes(rand_char)) {
      new_word[pos] = get_random_vow();
    } else if (CON.includes(rand_char)) {
      new_word[pos] = get_random_con();
    } else {
      alert("Unable to mutate");
      return;
    }
    new_word = new_word.join("");
    document.getElementById(
      "output"
    ).innerHTML += `<div class="word"><p>${new_word}</p><div class="btns"><button onclick="like('${new_word}')">Like</button> <button onclick="mutate_char('${new_word}')">Mutate Char</button>  <button onclick="mutate_syl('${new_word}')">Mutate Syllable</button></div></div>`;
  }
}

function mutate_syl(word) {
  document.getElementById("output").innerHTML = "";
  const ENABLED_STYLES = [];
  ["v", "vc", "cv", "cvc", "chem_sym"].forEach((style) => {
    document.getElementById(style).checked && ENABLED_STYLES.push(style);
  });
  if (ENABLED_STYLES.length === 0) {
    alert("Please select at least one style");
    return;
  }
  for (let i = 0; i < MAX_WORDS; i++) {
    const STYLES = {
      v: `${get_random_vow()}`,
      vc: `${get_random_vow()}${get_random_con()}`,
      cv: `${get_random_con()}${get_random_vow()}`,
      cvc: `${get_random_con()}${get_random_vow()}${get_random_con()}`,
      chem_sym: `${get_random_element_symbol()}`,
    };
    const syl = Math.floor(Math.random() * 3);
    const pos = Math.floor(Math.random() * word.length);
    const word_syl = word.slice(pos, pos + syl + 1);
    const rand_syl =
      STYLES[ENABLED_STYLES[Math.floor(Math.random() * ENABLED_STYLES.length)]];
    const new_word = word.replace(word_syl, rand_syl);

    document.getElementById(
      "output"
    ).innerHTML += `<div class="word"><p>${new_word}</p><div class="btns"><button onclick="like('${new_word}')">Like</button> <button onclick="mutate_char('${new_word}')">Mutate Char</button> <button onclick="mutate_syl('${new_word}')">Mutate Syllable</button></div></div>`;
  }
}

function print_random() {
  if (document.getElementById("random").checked) {
    print_random_syllable();
  } else if (document.getElementById("chem_el").checked) {
    mutate_syl(get_random_element_name());
  } else if (document.getElementById("liked_words").checked) {
    mutate_syl(get_random_liked());
  }
}
