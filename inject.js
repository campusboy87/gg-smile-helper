setTimeout(GoodGameSmileSearchInit, 10000);

function GoodGameSmileSearchInit() {
    console.info('Поиск по смайлам активирован');

    const smileListContainer = document.getElementById("smiles");

    if (!smileListContainer) {
        return;
    }

    const smileLisFirst = smileListContainer.querySelector(".smile-list");
    const smileBlocks = smileListContainer.querySelectorAll('.smile-block');

    // Создаём поле для ввода поисковой фразы
    const boxSearch = document.createElement("input");
    boxSearch.type = "text";
    boxSearch.placeholder = "Поиск смайла";
    boxSearch.classList.add("search-smile");

    // Добавляет поле в вёрстку чата
    smileLisFirst.prepend(boxSearch);

    // При вводе поисковой фразы фильтруем смайлы
    boxSearch.addEventListener('input', function () {
        const cssListActive = "search-smile-list-active";

        if (this.value) {
            smileListContainer.classList.add(cssListActive);
            GoodGameSmileSearchFilterStart(smileBlocks, this.value);
        } else {
            smileListContainer.classList.remove(cssListActive);
            GoodGameSmileSearchShowAll(smileBlocks);
        }
    });

    // При отображении чата делаем фокус внутри поля поиска
    const smileBtn = document.querySelector('[ng-click="vm.toggleSmiles()"]');
    const inputChat = document.querySelector('.textarea[chat-input]');

    inputChat && inputChat.addEventListener('keydown', function (e) {
        e.key === 'Tab' && GoodGameSmileSearchFocusInput(boxSearch);
    });

    smileBtn && smileBtn.addEventListener('click', function () {
        GoodGameSmileSearchFocusInput(boxSearch);
    });
}

function GoodGameSmileSearchFocusInput(boxSearch) {
    setTimeout(function () {
        boxSearch.focus();
        boxSearch.select();
    }, 300);
}

/**
 * @param {NodeList} elements
 */
function GoodGameSmileSearchShowAll(elements) {
    elements.forEach((el) => {
        el.classList.remove("hide");
    });
}

/**
 * @param {NodeList} elements
 */
function GoodGameSmileSearchHideAll(elements) {
    elements.forEach((el) => {
        el.classList.add("hide");
    });
}

/**
 *
 * @param {string} key
 * @param {string} word
 * @return {boolean}
 */
function GoodGameSmileSearchIsShow(key, word) {
    let smilesDesc = new Map([
        [':eveg4:', 'жопка'],
        [':eveg6:', 'люблю'],
        [':eveg7:', 'танец,музыка'],
        [':eveg8:', 'привет'],
        [':muhbkasilver:', 'фак'],
        [':brat_loken1:', 'собака,пес,пёс'],
        [':brat_loken4:', 'привет'],
        [':brat_loken9:', 'жопка'],
        [':brat_lokensilver:', 'фак'],
        [':eatalot5:', 'люблю,поцелуй,привет'],
        [':eatalot6:', 'танец,музыка'],
        [':eatalot11:', 'танец,музыка'],
        [':eatalot10:', 'жопка'],
        [':eatalot13:', 'тащи,давай'],
        [':eatalot25:', 'фак'],
        [':eatalotking:', 'фак'],
        [':eatalotking:', 'фак'],
        [':eatalotdiamond:', 'привет'],
        [':muhbkasilver:', 'фак'],
        [':slap:', 'жопка'],
        [':eatalot8:', 'рак,краб,нубас,слоупок'],
        [':slow:', 'рак,краб,нубас,слоупок'],
        [':crab:', 'рак,краб,нубас'],
        [':sing:', 'танец,музыка,петь'],
        [':dance:', 'танец,музыка'],
        [':vanga:', 'ванга'],
        [':dicaprio:', 'привет,пить'],
        [':onelove:', 'люблю,сердечко']
    ]);

    let smileDesc = smilesDesc.get(key);

    if (smileDesc === undefined) {
        return false;
    }

    return -1 !== smileDesc.indexOf(word);
}

/**
 *
 * @param {NodeList} elements
 * @param {string} word
 */
function GoodGameSmileSearchFilterStart(elements, word) {
    GoodGameSmileSearchHideAll(elements);

    elements.forEach((el) => {
        let smileKey = el.querySelector("img").title;

        if (GoodGameSmileSearchIsShow(smileKey, word)) {
            el.classList.remove("hide");
        } else {
            el.classList.add("hide");
        }
    });
}