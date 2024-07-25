define([], function () {

    function deepCopyArray(sourceArray, destinationArray) {

        sourceArray.forEach(value => {
            if (typeof value != "object") {
                destinationArray.push(value);
            }
            else if (value instanceof RegExp) {
                destinationArray.push(value);
            }
            else if (value instanceof Array) {
                let new_array = [];
                deepCopyArray(value, new_array)
                destinationArray.push(new_array);
            }
            else {
                let new_object = {};
                deepCopyObject(value, new_object);
                destinationArray.push(new_object);
            }
        })

    }

    function deepCopyObject(sourceObject, destinationObject) {

        for (key in sourceObject) {
            if (typeof sourceObject[key] != "object") {
                destinationObject[key] = sourceObject[key];
            }
            else if (sourceObject[key] instanceof RegExp) {
                destinationObject[key] = sourceObject[key];
            }
            else if (sourceObject[key] instanceof Array) {
                destinationObject[key] = []
                deepCopyArray(sourceObject[key], destinationObject[key]);
            }
            else {
                destinationObject[key] = {};
                deepCopyObject(sourceObject[key], destinationObject[key]);
            }
        }
    }

    let themes = {
        rules: {
            white: [
                { token: 'commentbsl', foreground: '008000' },
                { token: 'keywordbsl', foreground: 'ff0000' },
                { token: 'delimiterbsl', foreground: 'ff0000' },
                { token: 'delimiter.squarebsl', foreground: 'ff0000' },
                { token: 'delimiter.parenthesisbsl', foreground: 'ff0000' },
                { token: 'identifierbsl', foreground: '0000ff' },
                { token: 'funcbsl', foreground: '0000ff' },
                { token: 'funcdefbsl', foreground: '0000ff' },
                { token: 'constructbsl', foreground: '0000ff' },
                { token: 'stringbsl', foreground: '000000' },
                { token: 'string.quotebsl', foreground: '000000' },
                { token: 'string.invalidbsl', foreground: '000000' },
                { token: 'numberbsl', foreground: '000000' },
                { token: 'number.floatbsl', foreground: '000000' },
                { token: 'preprocbsl', foreground: '963200' },
                { token: 'compilebsl', foreground: '963200' },
                { token: 'gotomarkbsl', foreground: '3a3a3a' }
            ],
            whiteQueryOn: [
                { token: 'querybsl', foreground: '000000' },                    
                { token: 'query.quotebsl', foreground: '000000' },
                { token: 'query.stringbsl', foreground: 'df0000' },
                { token: 'query.keywordbsl', foreground: '0000ff' },
                { token: 'query.expbsl', foreground: 'a50000' },
                { token: 'query.parambsl', foreground: '007b7c' },                    
                { token: 'query.bracketsbsl', foreground: '0000ff' },
                { token: 'query.operatorbsl', foreground: '0000ff' },
                { token: 'query.floatbsl', foreground: 'ff00ff' },
                { token: 'query.intbsl', foreground: 'ff00ff' },
                { token: 'query.commentbsl', foreground: '008000' }
            ],
            dark: [
                { background: '1e1e1e' },
                { token: 'commentbsl', foreground: '6A9955' },
                { token: 'keywordbsl', foreground: '499caa' },
                { token: 'delimiterbsl', foreground: 'd4d4d4' },
                { token: 'delimiter.squarebsl', foreground: 'd4d4d4' },
                { token: 'delimiter.parenthesisbsl', foreground: 'd4d4d4' },
                { token: 'identifierbsl', foreground: 'd4d4d4' },
                { token: 'funcbsl', foreground: 'd4d4d4' },
                { token: 'funcdefbsl', foreground: 'd4d4d4' },
                { token: 'constructbsl', foreground: 'd4d4d4' },
                { token: 'stringbsl', foreground: 'c3602c' },
                { token: 'string.quotebsl', foreground: 'c3602c' },
                { token: 'string.invalidbsl', foreground: 'c3602c' },
                { token: 'numberbsl', foreground: 'b5cea8' },
                { token: 'number.floatbsl', foreground: 'b5cea8' },
                { token: 'preprocbsl', foreground: '963200' },
                { token: 'compilebsl', foreground: '963200' },
                { token: 'gotomarkbsl', foreground: 'ff9000' }
            ],
            darkQueryOff: [
                { token: 'querybsl', foreground: 'c3602c' },                    
                { token: 'query.quotebsl', foreground: 'c3602c' },
                { token: 'query.stringbsl', foreground: 'c3602c' },
                { token: 'query.keywordbsl', foreground: 'c3602c' },
                { token: 'query.expbsl', foreground: 'c3602c' },
                { token: 'query.parambsl', foreground: 'c3602c' },                    
                { token: 'query.bracketsbsl', foreground: 'c3602c' },
                { token: 'query.operatorbsl', foreground: 'c3602c' },
                { token: 'query.floatbsl', foreground: 'c3602c' },
                { token: 'query.intbsl', foreground: 'c3602c' },
                { token: 'query.commentbsl', foreground: 'c3602c' }
            ],
            darkQueryOn: [
                { token: 'querybsl', foreground: 'e7db6a' },                    
                { token: 'query.quotebsl', foreground: 'e7db6a' },
                { token: 'query.stringbsl', foreground: 'ff4242' },
                { token: 'query.keywordbsl', foreground: 'f92472' },
                { token: 'query.expbsl', foreground: 'a50000' },
                { token: 'query.parambsl', foreground: '007b7c' },                    
                { token: 'query.bracketsbsl', foreground: 'd4d4d4' },
                { token: 'query.operatorbsl', foreground: 'd4d4d4' },
                { token: 'query.floatbsl', foreground: 'ff00ff' },
                { token: 'query.intbsl', foreground: 'ff00ff' },
                { token: 'query.commentbsl', foreground: '6a9955' }
            ],
            edtWhite: [
                { token: 'commentbsl', foreground: '3f7f5f' },
                { token: 'keywordbsl', foreground: '7f0055', fontStyle: "bold" },
                { token: 'delimiterbsl', foreground: '000000' },
                { token: 'delimiter.squarebsl', foreground: '000000' },
                { token: 'delimiter.parenthesisbsl', foreground: '000000' },
                { token: 'identifierbsl', foreground: '000000' },
                { token: 'funcbsl', foreground: '7f0055' },
                { token: 'funcdefbsl', foreground: '000000' },
                { token: 'constructbsl', foreground: '000000' },
                { token: 'stringbsl', foreground: '0000ff' },
                { token: 'string.quotebsl', foreground: '0000ff' },
                { token: 'string.invalidbsl', foreground: '0000ff' },
                { token: 'numberbsl', foreground: '000000' },
                { token: 'number.floatbsl', foreground: '000000' },
                { token: 'preprocbsl', foreground: '0000cd', fontStyle: "bold" },
                { token: 'compilebsl', foreground: '7d7d7d' },
                { token: 'gotomarkbsl', foreground: '7f0055' },
                { token: 'querybsl', foreground: '0000ff' },                    
                { token: 'query.quotebsl', foreground: '0000ff' },
                { token: 'query.stringbsl', foreground: '0000ff' },
                { token: 'query.keywordbsl', foreground: '0000ff' },
                { token: 'query.expbsl', foreground: '0000ff' },
                { token: 'query.parambsl', foreground: '0000ff' },                    
                { token: 'query.bracketsbsl', foreground: '0000ff' },
                { token: 'query.operatorbsl', foreground: '0000ff' },
                { token: 'query.floatbsl', foreground: '0000ff' },
                { token: 'query.intbsl', foreground: '0000ff' },
                { token: 'query.commentbsl', foreground: '0000ff' }
            ],
            edtDark: [
                { token: 'commentbsl', foreground: '96a6b2' },
                { token: 'keywordbsl', foreground: 'ff7853', fontStyle: "bold" },
                { token: 'delimiterbsl', foreground: '839496' },
                { token: 'delimiter.squarebsl', foreground: '839496' },
                { token: 'delimiter.parenthesisbsl', foreground: '839496' },
                { token: 'identifierbsl', foreground: '839496' },
                { token: 'funcbsl', foreground: '721b36' },
                { token: 'funcdefbsl', foreground: '839496' },
                { token: 'constructbsl', foreground: '839496' },
                { token: 'stringbsl', foreground: 'f0ff71' },
                { token: 'string.quotebsl', foreground: 'f0ff71' },
                { token: 'string.invalidbsl', foreground: 'f0ff71' },
                { token: 'numberbsl', foreground: '839496' },
                { token: 'number.floatbsl', foreground: '839496' },
                { token: 'preprocbsl', foreground: 'a0caf4', fontStyle: "bold" },
                { token: 'compilebsl', foreground: '839496' },
                { token: 'gotomarkbsl', foreground: 'ff7853' },
                { token: 'querybsl', foreground: 'f0ff71' },                    
                { token: 'query.quotebsl', foreground: 'f0ff71' },
                { token: 'query.stringbsl', foreground: 'f0ff71' },
                { token: 'query.keywordbsl', foreground: 'f0ff71' },
                { token: 'query.expbsl', foreground: 'f0ff71' },
                { token: 'query.parambsl', foreground: 'f0ff71' },                    
                { token: 'query.bracketsbsl', foreground: 'f0ff71' },
                { token: 'query.operatorbsl', foreground: 'f0ff71' },
                { token: 'query.floatbsl', foreground: 'f0ff71' },
                { token: 'query.intbsl', foreground: 'f0ff71' },
                { token: 'query.commentbsl', foreground: 'f0ff71' }
            ]
        },
        colors: {
            dark: {
                'foreground': '#d4d4d4',
                'editor.background': '#1e1e1e',
                'editor.selectionBackground': '#062f4a',
                'editor.selectionHighlightBackground': '#495662',
                'editor.inactiveSelectionBackground': '#495662',
                'editorCursor.foreground': '#d4d4d4',
                'editorSuggestWidget.background': '#252526',
                'editorSuggestWidget.foreground': '#d4d4d4',
                'editorSuggestWidget.selectedBackground': '#094771',
                'editorSuggestWidget.highlightForeground': '#18a3ff',
                'editorWidget.background': '#252526',
                'editorWidget.foreground': '#d4d4d4',
                'editorWidget.border': '#d4d4d4',
                'list.hoverBackground': '#2a2d2e',
                'editor.lineHighlightBorder': '#282828',
                'editorWidget.border': '#454545'
            },
            white: {
                'editor.selectionBackground': '#ffe877',
                'editor.selectionHighlightBackground': '#fef6d0',
                'editor.inactiveSelectionBackground': '#fef6d0'
            },
            edtWhite: {
                'editor.selectionBackground': '#0078d7',
                'editor.selectionForeground': '#ffffff',
                'editor.selectionHighlightBackground': '#d4d4d4',
                'editor.inactiveSelectionBackground': '#0078d7'
            },
            edtDark: {
                'foreground': '#d4d4d4',
                'editor.background': '#2f2f2f',
                'editor.selectionBackground': '#062f4a',
                'editor.selectionHighlightBackground': '#495662',
                'editor.inactiveSelectionBackground': '#495662',
                'editorCursor.foreground': '#d4d4d4',
                'editorSuggestWidget.background': '#252526',
                'editorSuggestWidget.foreground': '#d4d4d4',
                'editorSuggestWidget.selectedBackground': '#094771',
                'editorSuggestWidget.highlightForeground': '#18a3ff',
                'editorWidget.background': '#252526',
                'editorWidget.foreground': '#d4d4d4',
                'editorWidget.border': '#d4d4d4',
                'list.hoverBackground': '#2a2d2e',
                'editor.lineHighlightBorder': '#282828',                
                'editorWidget.border': '#454545',
                'editorLineNumber.foreground': '#779189'
            }
        }
    }

    let bsl_language = {

        id: 'bsl',
        rules: {
            defaultToken: '',
            tokenPostfix: 'bsl',
            ignoreCase: true,
            brackets: [
                { open: '[', close: ']', token: 'delimiter.square' },
                { open: '(', close: ')', token: 'delimiter.parenthesis' }
            ],
            keywords: [
                'КонецПроцедуры', 'EndProcedure', 'КонецФункции', 'EndFunction',
                'Прервать', 'Break', 'Продолжить', 'Continue', 'Возврат', 'Return',
                'Если', 'If', 'Иначе', 'Else', 'ИначеЕсли', 'ElsIf', 'Тогда', 'Then',
                'КонецЕсли', 'EndIf', 'Попытка', 'Try', 'Исключение', 'Except',
                'КонецПопытки', 'EndTry', 'Raise', 'ВызватьИсключение', 'Пока',
                'While', 'Для', 'For', 'Каждого', 'Each', 'Из', 'In', 'По', 'To', 'Цикл',
                'Do', 'КонецЦикла', 'EndDo', 'НЕ', 'NOT', 'И', 'AND', 'ИЛИ', 'OR', 'Новый',
                'New', 'Процедура', 'Procedure', 'Функция', 'Function', 'Перем', 'Var',
                'Экспорт', 'Export', 'Знач', 'Val', 'Неопределено', 'Выполнить',
                'Истина', 'Ложь', 'True', 'False', 'Undefined', 'Асинх', 'Async',
                'Ждать', 'Await', 'Null', 'Перейти', 'Goto'
            ],
            namespaceFollows: [
                'namespace', 'using',
            ],
            parenFollows: [
                'if', 'for', 'while', 'switch', 'foreach', 'using', 'catch', 'when'
            ],
            operators: ['=', '<=', '>=', '<>', '<', '>', '+', '-', '*', '/', '%'],
            symbols: /[=><!~?:&+\-*\/\^%]+/,
            // escape sequences
            escapes: /(?:[abfnrtv']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
            queryWords: [
                'ВЫБРАТЬ', 'РАЗРЕШЕННЫЕ', 'РАЗЛИЧНЫЕ', 'ПЕРВЫЕ', 'КАК', 'ПУСТАЯТАБЛИЦА', 'ПОМЕСТИТЬ',
                'ИЗ', 'ВНУТРЕННЕЕ', 'ЛЕВОЕ', 'ВНЕШНЕЕ', 'ПРАВОЕ', 'ПОЛНОЕ', 'СОЕДИНЕНИЕ',
                'ГДЕ', 'СГРУППИРОВАТЬ', 'ПО', 'ИМЕЮЩИЕ', 'ОБЪЕДИНИТЬ', 'ВСЕ', 'УПОРЯДОЧИТЬ',
                'АВТОУПОРЯДОЧИВАНИЕ', 'ИТОГИ', 'ОБЩИЕ', 'ТОЛЬКО', 'ИЕРАРХИЯ', 'ПЕРИОДАМИ', 'ДЛЯ',
                'ИЗМЕНЕНИЯ', 'SELECT', 'ALLOWED', 'DISTINCT', 'TOP', 'AS', 'EMPTYTABLE',
                'INTO', 'FROM', 'INNER', 'LEFT', 'OUTER', 'RIGHT', 'FULL',
                'JOIN', 'ON', 'WHERE', 'GROUP', 'BY', 'HAVING', 'UNION',
                'ALL', 'ORDER', 'AUTOORDER', 'TOTALS', 'OVERALL', 'ONLY', 'HIERARCHY',
                'СГРУППИРОВАНОПО', 'GROUPEDBY', 'БУЛЕВО', 'BOOLEAN', 'ВОЗР', 'ASC',
                'ЗНАЧЕНИЕ', 'VALUE', 'ИНДЕКСИРОВАТЬ', 'INDEX', 'ТИП', 'TYPE', 'ТИПЗНАЧЕНИЯ',
                'VALUETYPE', 'УБЫВ', 'DESC', 'УНИЧТОЖИТЬ', 'DROP'
            ],
            queryWords_8_3_16: [
                'ГРУППИРУЮЩИМ', 'НАБОРАМ', 'GROUPING', 'SETS'
            ],
            queryWords_8_3_25: [
                'ДОБАВИТЬ', 'ПО НАБОРАМ', 'УНИКАЛЬНО'
            ],
            queryExp: [
                'АВТОНОМЕРЗАПИСИ', 'RECORDAUTONUMBER', 'В', 'IN', 'ВЫБОР', 'CASE',
                'ВЫРАЗИТЬ', 'CAST', 'ГОД', 'YEAR', 'ДАТА', 'DATE', 'ДАТАВРЕМЯ',
                'DATETIME', 'ДЕКАДА', 'TENDAYS', 'ДЕНЬ', 'DAY', 'ДЕНЬГОДА',
                'DAYOFYEAR', 'ДЕНЬНЕДЕЛИ', 'WEEKDAY', 'ДОБАВИТЬКДАТЕ', 'DATEADD',
                'ЕСТЬ', 'IS', 'ЕСТЬNULL', 'ISNULL', 'И', 'AND', 'ИЕРАРХИИ',
                'HIERARCHY', 'ИЛИ', 'OR', 'ИНАЧЕ', 'ELSE', 'ИСТИНА', 'TRUE',
                'КВАРТАЛ', 'QUARTER', 'КОЛИЧЕСТВО', 'COUNT', 'КОНЕЦПЕРИОДА',
                'ENDOFPERIOD', 'КОНЕЦ', 'END', 'ЛОЖЬ', 'FALSE', 'МАКСИМУМ',
                'MAX', 'МЕЖДУ', 'BETWEEN', 'МЕСЯЦ', 'MONTH', 'МИНИМУМ', 'MIN',
                'МИНУТА', 'MINUTE', 'НАЧАЛОПЕРИОДА', 'BEGINOFPERIOD', 'НЕ', 'NOT',
                'НЕДЕЛЯ', 'WEEK', 'НЕОПРЕДЕЛЕНО', 'UNDEFINED', 'ПОДОБНО', 'LIKE',
                'ПОДСТРОКА', 'SUBSTRING', 'ПОЛУГОДИЕ', 'HALFYEAR', 'ПРЕДСТАВЛЕНИЕ',
                'PRESENTATION', 'ПРЕДСТАВЛЕНИЕССЫЛКИ', 'REFPRESENTATION',
                'РАЗНОСТЬДАТ', 'DATEDIFF', 'СЕКУНДА', 'SECOND', 'СПЕЦСИМВОЛ',
                'ESCAPE', 'СРЕДНЕЕ', 'AVG', 'ССЫЛКА', 'REFS', 'СТРОКА', 'STRING',
                'СУММА', 'SUM', 'ТОГДА', 'THEN', 'УБЫВ', 'DESC', 'ЧАС', 'HOUR',
                'ЧИСЛО', 'NUMBER', 'NULL', 'КОГДА', 'WHEN'
            ],
            queryExp_8_3_20: [
                'СТРОКА', 'STRING', 'СОКРЛП', 'TRIMALL', 'СОКРП', 'TRIMAR', 'СОКРЛ', 'TRIMAL',
                'ACOS', 'ASIN', 'ATAN', 'COS', 'EXP', 'LOG', 'LOG10', 'SIN', 'SQRT', 'POW',
                'TAN', 'ОКР', 'ROUND', 'ЦЕЛ', 'INT', 'ДЛИНАСТРОКИ', 'STRINGLENGTH', 'ЛЕВ',
                'LEFT', 'ПРАВ', 'RIGHT', 'СТРНАЙТИ', 'STRFIND', 'ВРЕГ', 'UPPER', 'НРЕГ',
                'LOWER', 'СТРЗАМЕНИТЬ', 'STRREPLACE', 'РАЗМЕРХРАНИМЫХДАННЫХ', 'STOREDDATASIZE'
            ],
            queryExp_8_3_22: [
                'УНИКАЛЬНЫЙИДЕНТИФИКАТОР', 'UUID'
            ],
            DCSExp: [
                'Выбор', 'Case', 'Когда', 'When', 'Тогда', 'Then', 'Или', 'Or',
                'Иначе', 'Else', 'Истина', 'True', 'Конец', 'End', 'Ложь', 'False'
            ],
            DCSFunctions: [
                'ВЫЧИСЛИТЬ', 'EVAL', 'ВЫЧИСЛИТЬВЫРАЖЕНИЕ', 'EVALEXPRESSION',
                'ВЫЧИСЛИТЬВЫРАЖЕНИЕСГРУППИРОВКОЙМАССИВ', 'EVALEXPRESSIONWITHGROUPARRAY',
                'ВЫЧИСЛИТЬВЫРАЖЕНИЕСГРУППИРОВКОЙТАБЛИЦАЗНАЧЕНИЙ', 'EVALEXPRESSIONWITHGROUPVALUETABLE',
                'СТРОКА', 'STRING', 'ACOS', 'ASIN', 'ATAN', 'COS', 'EXP', 'LOG', 'LOG10', 'SIN',
                'SQRT', 'POW', 'TAN', 'ОКР', 'ROUND', 'ЦЕЛ', 'INT', 'ДЛИНАСТРОКИ', 'STRINGLENGTH',
                'СТРОКА', 'STRING', 'СОКРЛП', 'TRIMALL', 'СОКРП', 'TRIMAR', 'СОКРЛ', 'TRIMAL',
                'ЛЕВ', 'LEFT', 'ПРАВ', 'RIGHT', 'СТРНАЙТИ', 'STRFIND', 'ВРЕГ', 'UPPER', 'НРЕГ',
                'LOWER', 'СТРЗАМЕНИТЬ', 'STRREPLACE', 'НСТР', 'NSTR', 'МАССИВ', 'ARRAY', 'ТАБЛИЦАЗНАЧЕНИЙ',
                'VALUETABLE', 'СВЕРНУТЬ', 'GROUPBY', 'ПОЛУЧИТЬЧАСТЬ', 'GETPART', 'УПОРЯДОЧИТЬ', 'ORDER',
                'СОЕДИНИТЬСТРОКИ', 'JOINSTRINGS', 'ГРУППОВАЯОБРАБОТКА', 'GROUPPROCESSING', 'КАЖДЫЙ',
                'EVERY', 'ЛЮБОЙ', 'ANY', 'СТАНДАРТНОЕОТКЛОНЕНИЕГЕНЕРАЛЬНОЙСОВОКУПНОСТИ',
                'STDDEV_POP', 'СТАНДАРТНОЕОТКЛОНЕНИЕВЫБОРКИ', 'STDDEV_SAMP', 'ДИСПЕРСИЯВЫБОРКИ',
                'VAR_SAMP', 'ДИСПЕРСИЯГЕНЕРАЛЬНОЙСОВОКУПНОСТИ', 'VAR_POP', 'КОВАРИАЦИЯГЕНЕРАЛЬНОЙСОВОКУПНОСТИ',
                'COVAR_POP', 'КОВАРИАЦИЯВЫБОРКИ', 'COVAR_SAMP', 'КОРРЕЛЯЦИЯ', 'CORR', 'РЕГРЕССИЯНАКЛОН',
                'REGR_SLOPE', 'РЕГРЕССИЯОТРЕЗОК', 'REGR_INTERCEPT', 'РЕГРЕССИЯКОЛИЧЕСТВО', 'REGR_COUNT',
                'РЕГРЕССИЯR2', 'REGR_R2', 'РЕГРЕССИЯСРЕДНЕЕX', 'REGR_AVGX', 'РЕГРЕССИЯСРЕДНЕЕY',
                'REGR_AVGY', 'РЕГРЕССИЯSXX', 'REGR_SXX', 'РЕГРЕССИЯSYY', 'REGR_SYY', 'РЕГРЕССИЯSXY',
                'REGR_SXY', 'МЕСТОВПОРЯДКЕ', 'RANK', 'КЛАССИФИКАЦИЯABC', 'CLASSIFICATIONABC'

            ],
            queryOperators: /[=><+\-*\/%;,]+/,
            expBeforeAs: [
                'КОНЕЦ', 'END', 'NULL', 'НЕОПРЕДЕЛЕНО', 'UNDEFINED'
            ],
            tokenizer: {
                root: [
                    [/^\s*(процедура|функция|procedure|function)(\s*[a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]+\s*)(\()/, [
                        {token: 'keyword'},
                        {token: 'funcdef'},
                        {token: 'delimiter.square'},
                    ]],
                    [/(\s+)(новый|new)(\s*[a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]+\s*)(\()/, [
                        {token: ''},
                        {token: 'keyword'},
                        {token: 'construct'},
                        {token: 'delimiter.square'},
                    ]],
                    [/(\s+)([a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]+)(\s*)(\()/, [
                        {token: ''},
                        { cases: {
                            '@keywords': 'keyword',                            
                            '@default': 'func'
                        }},
                        {token: ''},
                        {token: 'delimiter.square'},
                    ]],
                    [/(перейти|goto)(\s+)(~[a-zA-Z\u0410-\u044F_0-9]*)/, ['keyword', '', 'gotomark']],
                    [/(~[a-zA-Z\u0410-\u044F_0-9]*)(:)/, ['gotomark', 'delimiter']],
                    [/(\.)(выполнить)(\(?)/, ['delimiter', 'identifier', 'delimiter.parenthesis']],
                    [/[a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
                    // whitespace
                    { include: '@whitespace' },                    
                    [/^\s*[&].*$/, 'compile'],
                    [/^\s*[#].*$/, 'preproc'],
                    [/[()\[\]]/, '@brackets'],
                    [/@symbols/, {
                        cases: {
                            '@operators': 'delimiter',
                            '@default': ''
                        }
                    }],
                    // numbers
                    [/[0-9_]*\.[0-9_]+([eE][\-+]?\d+)?[fFdD]?/, 'number.float'],
                    [/[0-9_]+/, 'number'],
                    // delimiter: after number because of .\d floats
                    [/[;,.]/, 'delimiter'],
                    // strings
                    [/(")(выбрать)/, [
                        {token: 'query.quote', next: '@query'},
                        {token: 'query.keyword'}                        
                    ]],
                    [/["|]/, { token: 'string.invalid', next: '@string' }],
                    [/"([^"\\]|\\.)*$/, 'string.invalid'],
                    [/\$\@"/, { token: 'string.quote', next: '@litinterpstring' }],
                    [/\@"/, { token: 'string.quote', next: '@litstring' }],
                    [/\$"/, { token: 'string.quote', next: '@interpolatedstring' }],
                    // characters
                    [/'[^\\']'/, 'string'],
                    [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                    [/'/, 'string.invalid']
                ],
                query: [
                    [/([a-zA-Z\u0410-\u044F]+)(\s+)(как|as)(\s+)([a-zA-Z\u0410-\u044F0-9]+)/, [
                        { cases: {
                            '@expBeforeAs': 'query.exp',                            
                            '@default': 'query'
                        }},
                        {token: 'query'},
                        {token: 'query.keyword'},
                        {token: 'query'},
                        {token: 'query'},
                    ]],                    
                    [/(как|as)(\s+)([a-zA-Z\u0410-\u044F]+)(\()/, [
                        {token: 'query.keyword'},
                        {token: 'query'},
                        {token: 'query.exp'},
                        {token: 'query.brackets'}
                    ]],
                    [/(как|as)(\s+)([a-zA-Z\u0410-\u044F_0-9]+)([,\s]*)/, [
                        {token: 'query.keyword'},
                        {token: 'query'},
                        {token: 'query'},
                        {token: 'query.operator'}
                    ]],
                    [/(\.)([a-zA-Z\u0410-\u044F_0-9]+)/, [
                        {token: 'query'},
                        {token: 'query'}                        
                    ]],
                    [/([a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]+)(\.)([a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]+)/, 'query'],
                    [/[a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]*/, {
                        cases: {
                            '@queryWords': 'query.keyword',
                            '@queryWords_8_3_16': 'query.keyword',
                            '@queryExp': 'query.exp',
                            '@queryExp_8_3_20': 'query.exp',
                            '@queryExp_8_3_22': 'query.exp',
                            '@default': 'query'
                        }
                    }],
                    [/&[a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]*/, 'query.param'],
                    [/&/, 'query.param'],
                    [/("".*"")(")/, [
                        { token: 'query.string' },
                        { token: 'query.quote', next: '@pop' }
                    ]],
                    [/"".*""/, 'query.string'],
                    [/[({})]/, 'query.brackets'],
                    [/\/\/.*$/, 'comment'],
                    [/(\|\s*)(\/\/.*$)/, [
                        {token: 'query'},
                        {token: 'query.comment'}
                    ]],
                    [/@queryOperators/, 'query.operator'],
                    [/[0-9_]*\.[0-9_]+([eE][\-+]?\d+)?[fFdD]?/, 'query.float'],
                    [/[0-9_]+/, 'query.int'],
                    [/^\s*#.*$/, 'preproc'],
                    [/\|/, 'query'],
                    [/\./, 'query'],
                    [/[?!@#$^*_]+/, 'query'],
                    [/"/, { token: 'query.quote', next: '@pop' }],
                ],
                comment: [
                    [/\/\/.*$/, 'comment'],
                ],
                string: [
                    [/^\s*\/\/.*$/, 'comment'],
                    [/[^"]+/, 'string'],
                    [/@escapes/, 'string.escape'],
                    [/"/, { token: 'string.quote', next: '@pop' }],
                    [/\|.*"/, { token: 'string.quote', next: '@pop' }],
                ],
                litstring: [
                    [/[^"]+/, 'string'],
                    [/""/, 'string.escape'],
                    [/"/, { token: 'string.quote', next: '@pop' }]
                ],
                litinterpstring: [
                    [/[^"{]+/, 'string'],
                    [/""/, 'string.escape'],
                    [/{{/, 'string.escape'],
                    [/}}/, 'string.escape'],
                    [/{/, { token: 'string.quote', next: 'root.litinterpstring' }],
                    [/"/, { token: 'string.quote', next: '@pop' }]
                ],
                interpolatedstring: [
                    [/[^\\"{]+/, 'string'],
                    [/@escapes/, 'string.escape'],
                    [/\\./, 'string.escape.invalid'],
                    [/{{/, 'string.escape'],
                    [/}}/, 'string.escape'],
                    [/{/, { token: 'string.quote', next: 'root.interpolatedstring' }],
                    [/"/, { token: 'string.quote', next: '@pop' }]
                ],
                whitespace: [
                    [/\/\/.*$/, 'comment'],
                ],
            },
        },        
        themes: {
            whiteTheme: {
                base: 'vs',
                name: 'bsl-white',
                inherit: true,
                colors: themes.colors.white,
                rules: themes.rules.white
            },            
            whiteQueryTheme: {
                base: 'vs',
                name: 'bsl-white-query',
                inherit: true,
                colors: themes.colors.white,
                rules: themes.rules.white.concat(themes.rules.whiteQueryOn)
            },
            darkTheme: {
                base: 'vs',
                name: 'bsl-dark',
                inherit: true,
                colors: themes.colors.dark,
                rules: themes.rules.dark.concat(themes.rules.darkQueryOff)
            },
            darkQueryTheme: {
                base: 'vs',
                name: 'bsl-dark-query',
                inherit: true,
                colors: themes.colors.dark,
                rules: themes.rules.dark.concat(themes.rules.darkQueryOn)
            },
            edtWhiteTheme: {
                base: 'vs',
                name: 'bsl-edt-white',
                inherit: true,
                colors: themes.colors.edtWhite,
                rules: themes.rules.edtWhite
            },
            edtDarkTheme: {
                base: 'vs',
                name: 'bsl-edt-dark',
                inherit: true,
                colors: themes.colors.edtDark,
                rules: themes.rules.edtDark
            }
        }        
    }

    let query_expressions = bsl_language.rules.queryExp;
    query_expressions = query_expressions.concat(bsl_language.rules.queryExp_8_3_20);
    query_expressions = query_expressions.concat(bsl_language.rules.queryExp_8_3_22);
    let query_keywords = bsl_language.rules.queryWords.concat(bsl_language.rules.queryWords_8_3_16);
    query_keywords = query_keywords.concat(bsl_language.rules.queryWords_8_3_25);

    let query_language = {

        id: 'bsl_query',
        rules: {
            defaultToken: '',
            tokenPostfix: 'bsl',
            ignoreCase: true,            
            keywords: query_keywords,
            expressions: query_expressions,
            operators: /[=><+\-*\/%;,]+/,
            expBeforeAs: [
                'КОНЕЦ', 'END', 'NULL', 'НЕОПРЕДЕЛЕНО', 'UNDEFINED'
            ],
            characteristics: [],
            tokenizer: {
                root: [                      
                    [/(поместить|из|into|from)/, { token: 'query.keyword', next: '@intofrom' }],
                    [/([a-zA-Z\u0410-\u044F]+)(\s+)(как|as)(\s+)([a-zA-Z\u0410-\u044F0-9]+)/, [
                        { cases: {
                            '@expBeforeAs': 'query.exp',                            
                            '@default': 'query'
                        }},
                        {token: 'query'},
                        {token: 'query.keyword'},
                        {token: 'query'},
                        {token: 'query'},
                    ]],                    
                    [/(как|as)(\s+)([a-zA-Z\u0410-\u044F]+)(\()/, [
                        {token: 'query.keyword'},
                        {token: 'query'},
                        {token: 'query.exp'},
                        {token: 'query.brackets'}
                    ]],
                    [/(как|as)(\s+)([a-zA-Z\u0410-\u044F_0-9]+)([,\s]*)/, [
                        {token: 'query.keyword'},
                        {token: 'query'},
                        {token: 'query'},
                        {token: 'query.operator'}
                    ]],
                    [/(\.)([a-zA-Z\u0410-\u044F_0-9]+)/, [
                        {token: 'query'},
                        {token: 'query'}                        
                    ]],
                    [/([a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]+)(\.)([a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]+)/, 'query'],
                    [/[a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]*/, { cases: {
                        '@characteristics': 'query.keyword',
                        '@keywords': 'query.keyword',
                        '@expressions': 'query.exp',
                        '@default': 'query'
                    }}],
                    [/".*?"/, 'query.string'],
                    [/&[a-zA-Z\u0410-\u044F_][a-zA-Z\u0410-\u044F_0-9]*/, 'query.param'],
                    [/&/, 'query.param'],
                    [/[({})]/, 'query.brackets'],
                    [/\/\/.*$/, 'comment'],
                    [/@operators/, 'query.operator'],
                    [/[0-9_]*\.[0-9_]+([eE][\-+]?\d+)?[fFdD]?/, 'query.float'],
                    [/[0-9_]+/, 'query.int'],
                    [/\|/, 'query']                    
                ],
                intofrom: [
                    [/\s/, 'query'],
                    [/[0-9]+/, 'query.int', '@pop'],
                    [/[#a-zA-Z\u0410-\u044F_][#a-zA-Z\u0410-\u044F_0-9]*/, {
                        cases: {
                            '@keywords': { token: 'query.keyword', next: '@pop' },
                            '@default': { token: 'query', next: '@pop' }
                        }
                    }],
                ],
            },
        },        
        themes: bsl_language.themes        
    }

    let dcs_rules = {};
    deepCopyObject(query_language.rules, dcs_rules);

    dcs_rules.characteristics = [
        'ХАРАКТЕРИСТИКИ', 'CHARACTERISTICS', 'СПИСОК', 'LIST', 'ТИП', 'TYPE',
        'ИДЕНТИФИКАТОР', 'ID', 'ИМЯ', 'NAME', 'ТИПЗНАЧЕНИЯ', 'VALUETYPE',
        'ХАРАКТЕРИСТИКА', 'CHARACTERISTIC', 'ОБЪЕКТ', 'OBJECT', 'ЗНАЧЕНИЯ',
        'VALUES', 'ЗНАЧЕНИЕ', 'VALUE'
    ];

    let dcs_language = {
        id: 'dcs_query',
        rules: dcs_rules
    }

    let dcs_expressions = query_expressions.concat(bsl_language.rules.DCSFunctions);
    dcs_language.rules.expressions = dcs_expressions;

    languages = {
        bsl: {
            languageDef: bsl_language,
            completionProvider: {
                triggerCharacters: ['.', '"', ' ', '&'],
                provideCompletionItems: function (model, position, context, token) {
                    resetSuggestWidgetDisplay();
                    let bsl = new bslHelper(model, position);
                    let completion = bsl.getCompletion(context, token);
                    bsl.onProvideCompletion(context, completion);
                    return completion;
                },
                resolveCompletionItem: function (model, position, item) {
                    let bsl = new bslHelper(model, position);
                    item = bsl.resolveCompletionItem(item);
                    return model;
                }
            },
            foldingProvider: {
                provideFoldingRanges: function (model, context, token) {
                    return bslHelper.getFoldingRanges(model);
                }
            },
            signatureProvider: {
                signatureHelpTriggerCharacters: ['(', ','],
                signatureHelpRetriggerCharacters: [')'],
                provideSignatureHelp: (model, position, token, context) => {
                    let helper = null;
                    if (!window.isSuggestWidgetVisible()) {
                        resetSignatureWidgetDisplay();
                        let bsl = new bslHelper(model, position);
                        helper = bsl.getSigHelp(context);
                        onProvideSignature(bsl, context, position);
                    }
                    return helper;
                }
            },
            hoverProvider: {
                provideHover: function (model, position) {                    
                    let bsl = new bslHelper(model, position);
                    bsl.onProvideHover();
                    if (!ctrlPressed) {                        
                        return bsl.getHover();
                    }
                    else {
                        return null;
                    }
                }
            },
            formatProvider: {
                provideDocumentFormattingEdits: function (model, options, token) {
                    return bslHelper.formatCode(model);
                }
            },
            codeLenses: {
                onDidChange: function(e) {
                    editor.updateCodeLens = e;
                },
                provider: function (model, token) {
                    return bslHelper.provideCodeLenses(model, token);
                },
                resolver: () => {}
            },
            colorProvider: {
                provideColorPresentations: (model, colorInfo) => {
                    return bslHelper.provideColorPresentations(model, colorInfo);
                },
                provideDocumentColors: (model) => {
                    return bslHelper.getDocumentColors(model);
                }
            },
            definitionProvider: {
                provideDefinition: (model, position) => {
                    let bsl = new bslHelper(model, position);
                    return bsl.provideDefinition();
                }
            },
            autoIndentation: true,
            indentationRules: {
                increaseIndentPattern: /^\s*(функция|function|процедура|procedure|если|if|#если|#if|пока|while|для|for|попытка|try|исключение|except).*$/i,
                decreaseIndentPattern: /^\s*(конецфункции|endfunction|конецпроцедуры|endprocedure|конецесли|endif|#конецесли|#endif|конеццикла|enddo|конецпопытки|endtry).*$/i
            },
            brackets: [
                ['(', ')'],
                ['[', ']'],
                ['если', 'конецесли'],
                ['иначеесли', 'иначеесли'],
                ['if', 'endif'],
                ['пока', 'конеццикла'],
                ['для', 'конеццикла'],
                ['while', 'enddo'],
                ['for', 'enddo'],
                ['попытка', 'конецпопытки'],
                ['try', 'endtry'],
                ['функция', 'конецфункции'],
                ['function', 'endfunction'],
                ['процедура', 'конецпроцедуры'],
                ['procedure', 'endprocedure'],
                ['#область', '#конецобласти']
            ],
            autoClosingPairs: []
        },
        query: {
            languageDef: query_language,
            completionProvider: {
                triggerCharacters: ['.', '(', '&', ' '],
                provideCompletionItems: function (model, position, context, token) {
                    resetSuggestWidgetDisplay();
                    let bsl = new bslHelper(model, position);
                    let completion = bsl.getQueryCompletion(context);
                    bsl.onProvideCompletion(context, completion);
                    return completion;
                }
            },
            foldingProvider: {
                provideFoldingRanges: function (model, context, token) {
                    return bslHelper.getQueryFoldingRanges(model);
                }
            },
            signatureProvider: {
                signatureHelpTriggerCharacters: ['(', ','],
                signatureHelpRetriggerCharacters: [')'],
                provideSignatureHelp: (model, position, token, context) => {
                    resetSignatureWidgetDisplay();
                    let bsl = new bslHelper(model, position);
                    let helper = bsl.getQuerySigHelp(context);
                    onProvideSignature(bsl, context, position);
                    return helper;
                }
            },
            hoverProvider: {
                provideHover: function (model, position) {                    
                    let bsl = new bslHelper(model, position);
                    bsl.onProvideHover();
                    if (!ctrlPressed) {                        
                        return bsl.getCustomHover();
                    }
                    else {
                        return null;
                    }
                }
            },
            formatProvider: {
                provideDocumentFormattingEdits: () => {}
            },
            codeLenses: {
                onDidChange: function(e) {
                    editor.updateCodeLens = e;
                },
                provider: function (model, token) {
                    return bslHelper.provideCodeLenses(model, token);
                },
                resolver: () => {}
            },
            colorProvider: {
                provideColorPresentations: () => {},
                provideDocumentColors: () => {}
            },
            definitionProvider: {
                provideDefinition: (model, position) => {
                    let bsl = new bslHelper(model, position);
                    return bsl.provideQueryDefinition();
                }
            },
            autoIndentation: false,
            indentationRules: {
                increaseIndentPattern: /^\s*(выбрать|из|выбор|когда).*$/i,
                decreaseIndentPattern: /^\s*(тогда|иначе|конец).*$/i
            },
            brackets: [
                ['(', ')'],
                ['[', ']'],
                ['{', '}']
            ],
            autoClosingPairs: []
        },
        dcs: {
            languageDef: dcs_language,
            completionProvider: {
                triggerCharacters: ['.', '(', '&'],
                provideCompletionItems: function (model, position, context, token) {
                    resetSuggestWidgetDisplay();
                    let bsl = new bslHelper(model, position);
                    let completion = bsl.getDCSCompletion();
                    bsl.onProvideCompletion(context, completion);
                    return completion;
                }
            },
            foldingProvider: {
                provideFoldingRanges: () => {}
            },
            signatureProvider: {
                signatureHelpTriggerCharacters: ['(', ','],
                signatureHelpRetriggerCharacters: [')'],
                provideSignatureHelp: (model, position, token, context) => {
                    resetSignatureWidgetDisplay();
                    let bsl = new bslHelper(model, position);
                    let helper = bsl.getDCSSigHelp(context);
                    onProvideSignature(bsl, context, position);
                    return helper;
                }
            },
            hoverProvider: {
                provideHover: function (model, position) {                    
                    let bsl = new bslHelper(model, position);
                    bsl.onProvideHover();
                    if (!ctrlPressed) {                        
                        return bsl.getCustomHover();
                    }
                    else {
                        return null;
                    }
                }
            },
            formatProvider: {
                provideDocumentFormattingEdits: () => {}
            },
            codeLenses: {
                onDidChange: function(e) {
                    editor.updateCodeLens = e;
                },
                provider: function (model, token) {
                    return bslHelper.provideCodeLenses(model, token);
                },
                resolver: () => {}
            },
            colorProvider: {
                provideColorPresentations: () => {},
                provideDocumentColors: () => {}
            },
            definitionProvider: {
                provideDefinition: () => {}
            },
            autoIndentation: false,
            indentationRules: null,
            brackets: [
                ['(', ')'],
                ['[', ']']                
            ],
            autoClosingPairs: []
        }

    };

});

function onProvideSignature(bsl, context, position) {

    let fire_event = getOption('generateBeforeSignatureEvent');

    if (fire_event) {
        let activeSignature = context.activeSignatureHelp ? context.activeSignatureHelp.activeSignature : 0;
        let params = {
            word: bsl.getWordUntilOpenBracket(),
            line: position.lineNumber,
            column: position.column,
            activeParameter: bsl.textBeforePosition.split(',').length - 1,
            activeSignature: activeSignature,
            triggerCharacter: context.triggerCharacter
        };
        sendEvent('EVENT_BEFORE_SIGNATURE', params);
    }

}

function resetSuggestWidgetDisplay() {

    let widget = document.querySelector('.suggest-widget');

    if (widget) {
        widget.style.display = '';
        widget.style.visibility = '';      
    }

}

function resetSignatureWidgetDisplay() {

    let widget = document.querySelector('.parameter-hints-widget');

    if (widget) {
        widget.style.display = '';
        signatureVisible = true;
    }

}