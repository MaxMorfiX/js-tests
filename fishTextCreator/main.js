let columns = [
    [
        "Товарищи!",
        "С другой стороны,",
        "Равным образом",
        "Не следует, однако, забывать, что",
        "Таким образом",
        "Повседневная практика показывает, что",
        "Уважаемые коллеги!",
        "Позвольте Вам напомнить, что",
        "Также как",
        "В целом, конечно,",
        "Дамы и господа!",
        
        "Получается, что",
        
        "Идейные соображения высшего порядка, а также",
        "Задачи организации, в оссобености",
        "Разнообразный и богатый опыт",
        "Значимость этих проблем настолько очевидна, что"
    ],
    
    [
        "реализация намеченных плановых заданий",
        "рамки и место обучения кадров",
        "постоянный количественный рост и сфера нашей активности",
        "сложившаяся структура организации",
        "новая модель организационной деятельности",
        "дальнейшее развитие различных форм деятельности",
        "перспективное планирование",
        "оптимизация основных целей",
        "экономическая повестка сегоднящнего дня",
        "внедрение современных подходов",
        
        "разработка нашего проекта",
        
        "постоянное информационное опеспечение нашей деяльности",
        "укрепление и развитие нашей структуры",
        "консультация с широким кругом специалистов",
        "начало повседневной работы по формированию"
    ],
    
    [
        "играет важную роль в формировании",
        "требуют от нас анализа",
        "требуют определения и уточнения",
        "способствует подготовке и реализации",
        "обеспечивает широкому кругу (специалистов) участие в формировании",
        "позволяет выполнить важные задания по разработке",
        "не дает нам иного выбора, кроме определения",
        "вынуждает нас объективно потребовать",
        "играет определяющее значение для",
        "выявляет срочную потребность",
        
        "не требует обдумывания для",
        
        "позволяет оценить значение",
        "влечёт за собой процесс внедрения и модернизации"
    ],
    
    [
        "финансовых и административных условий",
        "дальнейших направлений развития",
        "системы массового участия",
        "позиций, занимаемых участниками в отношении поставленных задач",
        "новых предложений",
        "направлений прогрессивного развития",
        "стандартных подходов",
        "нестандартных решений",
        "экономических и неэкономических факторов и перспектив",
        "инновационных методов управления процессами",
        
        "нашего коллектива",
        
        "форм воздействия",
        "модели развития",
        "соответствующих условий активизации работы"
    ]
];


function createText(sentences = 10) {
    
    let ret = "";
    
    for(let i = 0; i <= sentences; i++) {
        ret += createPhrase() + ".";
    }
    
    ret = ret.trim();
    
    return ret;
}
function createPhrase() {
    let ret = "";
    
    for(let i in columns) {
        let column = columns[i];
        
        ret += " " + takeRandomPhrasePart(column);
    }
    
    return ret;
}

function takeRandomPhrasePart(variants) {
    let rand = Math.round(Math.random());

    let ret = variants[rand*(variants.length - 1)];
    
    return ret;
}

createText(10);
