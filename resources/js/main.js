console.info('Запуск модуля поиска по смайлам GG');

/**
 * Запускает модуль поиска по смайлам GG.
 *
 * @param {Number|undefined} iterations
 */
function GoodGameSmileSearchInit(iterations) {
    const mainContainer = document.getElementById("smiles");

    if (!mainContainer) {
        GoodGameSmileSearchReInit(iterations);
        return;
    }

    console.info('Модуля поиска по смайлам GG запущен');

    GoodGameSmileSearchProccesing(mainContainer);
}

/**
 * Перезапускает инициализацию модуля в попытках найти нужные элементы.
 *
 * Перезапуск сработает не более 30 раз с ожиданием в 1 секунду.
 *
 * Это необходимо, так как вёрстка чата генерируется не сервером (не доступна сразу),
 * а с помощью Angular и доступна для изменения не сразу.
 *
 * @param {Number|undefined} iterations
 */
function GoodGameSmileSearchReInit(iterations) {
    iterations = iterations === undefined ? 0 : iterations;

    ++iterations;

    if (iterations === 30) {
        console.info('Поиск по смайлам не нашёл чат');
        return;
    }

    setTimeout(function () {
        GoodGameSmileSearchInit(iterations);
    }, 1000);
}

/**
 * Запуск основного функционала модуля.
 *
 * @param {Element} mainContainer
 */
function GoodGameSmileSearchProccesing(mainContainer) {
    const smileBtn = document.querySelector('[ng-click="vm.toggleSmiles()"]');
    const inputChat = document.querySelector('.textarea[chat-input]');
    const smileListFirst = mainContainer.querySelector(".smile-list");

    // Создаём поле для ввода поисковой фразы
    const boxSearch = document.createElement("input");
    boxSearch.type = "text";
    boxSearch.placeholder = "Поиск смайла";
    boxSearch.classList.add("search-smile");

    // Добавляет поле в вёрстку чата
    smileListFirst.prepend(boxSearch);

    // При вводе поисковой фразы фильтруем смайлы
    boxSearch.addEventListener('input', function () {
        const cssListActive = "search-smile-list-active";
        const smileBlocks = GoodGameSmileSearchGetSmileBlocks(mainContainer);

        if (this.value) {
            mainContainer.classList.add(cssListActive);
            GoodGameSmileSearchFilterStart(smileBlocks, this.value);
        } else {
            mainContainer.classList.remove(cssListActive);
            GoodGameSmileSearchShowAll(smileBlocks);
        }
    });

    // При нажатии Tab и Escape скрываем селектор смайлов и возвращаем фокус в поле ввода сообщения
    boxSearch.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            smileBtn.click();
            setTimeout(function () {
                inputChat.focus();
                inputChat.click();

                /*const range = document.createRange();
                range.selectNodeContents(inputChat);
                range.collapse(false);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);*/
            }, 100);
        }
    });

    // При отображении чата делаем фокус внутри поля поиска
    inputChat.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            GoodGameSmileSearchFocusInput(boxSearch);
        }
    });
    smileBtn.addEventListener('click', function () {
        GoodGameSmileSearchFocusInput(boxSearch);
    });
}

/**
 * Получает все доступные пользователю смайлы.
 *
 * Подобное получение (постоянный поиск в DOM) блоков не очень производительное,
 * но зато позволяет избежать ситуаций не пападания каких-то смайлов в список.
 *
 * @param {Element} mainContainer
 * @return {NodeList}
 */
function GoodGameSmileSearchGetSmileBlocks(mainContainer) {
    return mainContainer.querySelectorAll('.smile-block');
}

/**
 * Фокусирует указатель для набора тексте в поле поиска.
 * Задержка используется, так как открытие попапа со смайлами и нашим полем не мгновенное,
 * а поле может иметь фокус только, если оно отображено.
 *
 * @param {Element} boxSearch
 */
function GoodGameSmileSearchFocusInput(boxSearch) {
    setTimeout(function () {
        boxSearch.focus();
        boxSearch.select();
    }, 100);
}

/**
 * Отображает все смайлы.
 *
 * @param {NodeList} elements
 */
function GoodGameSmileSearchShowAll(elements) {
    elements.forEach((el) => {
        el.classList.remove("hide");
    });
}

/**
 * Скрывает все смайлы.
 *
 * @param {NodeList} elements
 */
function GoodGameSmileSearchHideAll(elements) {
    elements.forEach((el) => {
        el.classList.add("hide");
    });
}

/**
 * Проверяет, соответствует ли смайл поисковой фразе или нет.
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
 * Запускает процесс фильтрации смайлов.
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

GoodGameSmileSearchInit();