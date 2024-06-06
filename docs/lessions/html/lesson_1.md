# Введение в HTML5

## Что такое HTML

HTML (HyperText Markup Language) представляет язык разметки гипертекста, используемый преимущественно для создания документов в сети интернет. HTML начал свой путь в начале 90-х годов как примитивный язык для создания веб-страниц, и в настоящий момент уже трудно представить себе интернет без HTML. Подавляющее большинство сайтов так или иначе используют HTML.
В 2014 году официально была завершена работа над новым стандартом - HTML5, который фактически произвел революцию, привнеся в HTML много нового.

## Что именно привнес HTML5?

HTML5 определяет новый алгоритм парсинга для создания структуры DOM, добавление новых элементов и тегов, как например, элементы video, audio и ряд других переопределение правил и семантики уже существовавших элементов HTML
Фактически с добавлением новых функций HTML5 стал не просто новой версией языка разметки для создания веб-страниц, но и фактически платформой для создания приложений, а область его использования вышла далеко за пределы веб-среды интернет: HTML5 применяется также для создания мобильных приложений под Android, iOS, Windows Mobile и даже для создания десктопных приложений для обычных компьютеров (в частности, в ОС Windows 8/8.1/10).

В итоге, как правило, HTML 5 применяется преимущественно в двух значениях:
- HTML 5 как обновленный язык разметки гипертекста, некоторое развитие предыдущей версии HTML 4
- HTML 5 как мощная платформа для создания веб-приложений, которая включает не только непосредственно язык разметки гипертекста, обновленный HTML, но и язык программирования JavaScript и каскадные таблицы стилей CSS 3.

Кто отвечает за развитие HTML5? Этим занимается World Wide Web Consortium (сокращенно W3C - Консорциум Всемирной Паутины) - независимая международная организация, которая определяет стандарт HTML5 в виде спецификаций. Текущую полную спецификацию на английском языке можно посмотреть на сайте [w3.org](https://www.w3.org/TR/html5). 
И надо отметить, что организация продолжает работать над HTML5, выпуская обновления к спецификации.

## Поддержка браузерами
Надо отметить, что между спецификацией HTML5 и использованием этой технологии в веб-браузерах всегда был разрыв. Большинство браузеров стало внедрять стандарты HTML5 еще до их официальной публикации. И к текущему моменту большинство последних версий браузеров поддерживают большинство функциональностей HTML5 (Google Chrome, Firefox, Opera, Internet Explorer 11, Microsoft Edge). В то же время многие старые браузеры, как например, Internet Explorer 8 и более младшие версии, не поддерживают стандарты, а IE 9, 10 поддерживает лишь частично.

При этом даже те браузеры, которые в целом поддерживают стандарты, могут не поддерживать какие-то отдельные функции. И это тоже надо учитывать в работе. Но в целом с поддержкой данной технологии довольно хорошая ситуация.
Для проверки поддержки HTML5 конкретным браузером можно использовать специальный сервис [html5test.com](https://html5test.com).

## Необходимые инструменты
Что потребуется для работы с HTML5? В первую очередь, текстовый редактор, чтобы набирать текст веб-страниц на html. На данный момент одним из самых простых и наиболее популярных текстовых редакторов является Notepad++, который можно найти на сайте [notepad-plus-plus.org](http://notepad-plus-plus.org/). 

К его преимуществам можно отнести бесплатность, подсветка тегов html. В дальнейшем я буду ориентироваться именно на этот текстовый редактор.
Также стоит упомянуть кроссплатформенный текстовый редактор Visual Studio Code. Данный редактор обладает несколько большими возможностями, чем Notepad++, и кроме того, может работать не только в ОС Windows, но и в MacOS и в операционных системах на основе Linux.

И также потребуется веб-браузер для запуска и проверки написанных веб-страничек. В качестве веб-браузера можно взять последнюю версию любого из распространенных браузеров - Google Chrome, Mozilla Firefox, Microsoft Edge, Opera.

## Элементы и атрибуты HTML5

Прежде чем переходить непосредственно к созданию своих веб-страниц на HTML5, рассмотрим основные строительные блоки, кирпичики, из которых состоит веб-страница.
Документ HTML5, как и любой документ HTML, состоит из элементов, а элементы состоят из тегов. Как правило, элементы имеют открывающий и закрывающий тег, которые заключаются в угловые скобки. Например:

```html
<div>Текст элемента div</div>
```
Здесь определен элемент div, который имеет открывающий тег `<div>` и закрывающий тег `</div>`. Между этими тегами находится содержимое элемента div. В данном случае в качестве содержимого выступает простой текст "Текст элемента div".

Элементы также могут состоять из одного тега, например, элемент `<br />`, функция которого - перенос строки.
```html
<div>Текст <br /> 
    элемента div
</div>
```
Такие элементы еще называют пустыми элементами (void elements). Хотя я использовал закрывающий слеш, но его наличие согласно спецификации необязательно, и равнозначно использованию тега без слеша: `<br>`

Каждый элемент внутри открывающего тега может иметь атрибуты. Например:
```html
<div style="color:red;">Кнопка</div>
<input type="button" value="Нажать">
```
Здесь определено два элемента: `div` и `input`. Элемент `div` имеет атрибут `style`. После знака равно в кавычках пишется значение атрибута: `style="color:red;`". В данном случае значение "`color:red;`" указывает, что цвет текста будет красным.

Второй элемент - элемент `input`, состоящий из одного тега, имеет два атрибута: `type` (указывает на тип элемента - кнопка) и `value` (определяет текст кнопки)

Существуют глобальные или общие для всех элементов атрибуты, как например, `style`, а есть специфические, применяемые к определенным элементам, как например, `type`.
Кроме обычных атрибутов существуют еще булевые или логические атрибуты (boolean attributes). Подобные атрибуты могут не иметь значения. Например, у кнопки можно задать атрибут `disabled`:
```html
<input type="button" value="Нажать" disabled>
```
Атрибут `disabled` указывает, что данный элемент отключен.

## Глобальные атрибуты

В HTML5 есть набор глобальных атрибутов, которые применимы к любому элементу HTML5:
- accesskey: определяет клавишу для быстрого доступа к элементу
- class: задает класс CSS, который будет применяться к элементу
- contenteditable: определяет, можно ли редактировать содержимое элемента
- contextmenu: определяет контекстное меню для элемента, которое отображается при нажатии на элемент правой кнопкой мыши
- dir: устанавливает направление текста в элементе
- draggable: определяет, можно ли перетаскивать элемент
- dropzone: определяет, можно ли копировать переносимые данные при переносе на элемент
- hidden: скрывает элемент
- id: уникальный идентификатор элемента. На веб-странице элементы не должны иметь повторяющихся идентификаторов
- lang: определяет язык элемента
- spellcheck: указывает, будет ли для данного элемента использоваться проверка правописания
- style: задает стиль элемента
- tabindex: определяет порядок, в котором по элементам можно переключаться с помощью клавиши TAB
- title: устанавливает дополнительное описание для элемента
- translate: определяет, должно ли переводиться содержимое элемента

Но, как правило, из всего этого списка наиболее часто используются три: `class`, `id` и `style`.

## Пользовательские атрибуты
В отличие от предыдущей версии языка разметки в HTML5 были добавлены пользовательские атрибуты (custom attributes). Теперь разработчик или создатель веб-страницы сам может определить любой атрибут, предваряя его префиксом `data-*`. Например:
```html
<input type="button" value="Нажать" data-color="red" >
```
Здесь определен атрибут `data-color`, который имеет значение "red". Хотя для этого элемента, ни в целом в html не существует подобного атрибута. Мы его определяем сами и устанавливаем у него любое значение.

## Одинарные или двойные кавычки
Нередко можно встретить случаи, когда в html при определении значений атрибутов применяются как одинарные, так и двойные кавычки. Например:
```html
<input type='button' value='Нажать'>
```

И одинарные, и двойные кавычки в данном случае допустимы, хотя чаще применяются именно двойные кавычки. Однако иногда само значение атрибута может содержать двойные кавычки, и в этом случае все значение лучше поместить в одинарные:
```html
<input type="button" value='Кнопка "Привет мир"'>
```

# Создание документа HTML5

Элементы являются кирпичиками, из которых складывается документ html5. Для создания документа нам надо создать простой текстовый файл, а в качестве расширения файла указать *.html
Создадим текстовый файл, назовем его index и изменим его расширение на .html.

![alt](../assets/l1_1.png)

Затем откроем этот файл в любом текстовом редакторе, например, в Notepad++. Добавим в файл следующий текст:
```html
<!DOCTYPE html>
<html>

</html>
```

Для создания документа HTML5 нам нужны в первую очередь два элемента: DOCTYPE и html. Элемент doctype или Document Type Declaration сообщает веб-браузеру тип документа. `<!DOCTYPE html>` указывает, что данный документ является документом html и что используется html5, а не html4 или какая-то другая версия языка разметки.

А элемент html между своим открывающим и закрывающим тегами содержит все содержимое документа. Внутри элемента html мы можем разместить два других элемента: head и body. Элемент head содержит метаданные веб-страницы - заголовок веб-страницы, тип кодировки и т.д., а также ссылки на внешние ресурсы - стили, скрипты, если они использутся. Элемент body собственно определяет содержимое html-страницы.

Теперь изменим содержимое файла index.html следующим образом:

```html
<!DOCTYPE html>
 <html>
     <head>
         <meta charset="utf-8">
         <title>Документ HTML5</title>
     </head>
     <body>
        <div>Содержание документа HTML5</div>
     </body>
 </html>
```

В элементе head определено два элемента:
- элемент title представляет заголовок страницы
- элемент meta определяет метаинформацию страницы. Для корректного отображения символов предпочтительно указывать кодировку. В данном случае с помощью атрибута charset="utf-8" указываем кодировку utf-8.

В пределах элемента элемента body используется только один элемент - div, который оформляет блок. Содержимым этого блока является простая строка.
Поскольку мы выбрали в качестве кодировки utf-8, то браузер будет отображать веб-страницу именно в этой кодировке. 

Однако необходимо чтобы сам текст документа также соответствовал выбранной кодировке utf-8. Как правило, в различных текстовых редакторах есть соотвествующие настройки для установки кодировки. Например, в Notepad++ надо зайти в меню Кодировки и в открывшемся списке выбрать пункт Преобразовать в UTF-8 без BOM:

![alt](../assets/l1_2.png)

После этого в статусной строке будет можно будет увидеть UTF-8 w/o BOM, что будет указывать, что нужная кодировка установлена.

Сохраним и откроем файл index.html в браузере:

![alt](../assets/l1_3.png)

Таким образом, мы создали первый документ HTML5. Так как мы указали в элементе title заголовок "Документ HTML5", то именно такое название будет иметь вкладка браузера.
Так как указана кодировка utf-8, то веб-браузер будет корректно отображать кириллические символы.

А весь текст, определенный внутри элемента body мы увидим в основном поле браузера.

## Задание 
Создайте страницу, у которой заголовок будет "Моя первая HTML страница". Также на странице должен быть параграф с текстом: "Это первый урок. Привет мир!"