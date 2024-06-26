# Основы CSS. Свойства

## Создание тени у элемента

Свойство **box-shadow** позволяет создать у элемента тень. Это свойство может принимать сразу несколько значений:

```css
box-shadow: hoffset voffset blur spread color inset
```

* `hoffset`: горизонтальное смещение тени относительно элемента. При положительном значении тень смещается вправо, а при отрицательном - влево

* `voffset`: вертикальное смещение тени относительно элемента. При положительном значении тень смещается вниз, а при отрицательном - вверх

* `blur`: необязательное значение, которое определяет радиус размытия тени. Чем больше это значение, тем более размытыми будут края тени. По умолчанию имеет значение 0.

* `spread`: необязательное значение, которое определяет направление тени. Положительное значение распространяет тень во вне во всех направлениях от элемента, а отрицательное значение направляет тень к элементу

* `color`: необязательное значение, которое устанавливает цвет тени

* `inset`: необязательное значение, которое заставляет рисовать тент внутри блока элемента

Например:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Тени в CSS3</title>
        <style>
        div{
            width: 128px;
            height: 96px;
            margin: 20px;
            border: 1px solid #ccc;
            background-color: #eee;
            box-shadow: 10px 4px 10px 3px #888;
        }
        </style>
    </head>
    <body>
        <div></div>
    </body>
</html>
```

![alt](../assets/l17_1_6.png)

Через запятую можно определить несколько различных теней:

```css
box-shadow: 5px 3px 8px 3px #faa, 10px 4px 10px 3px #888 inset;
```

## Контуры элементов

Концепция контуров похожа на использование границ у элементов. Не стоит путать или заменять границы контурами, они имеют разное значение. Контуры полезны тем, что позволяют выделить элемент, чтобы привлечь к нему внимание в какой-то ситуации. Контуры располагаются вне элемента сразу за его границами.

Контур в CSS 3 представлен свойством **outline**, хотя данное свойство является сокращением следующих свойств:

* **outline-color**: цвет контура

* **outline-offset**: смещение контура

* **outline-style**: стиль контура. Оно принимает те же значения, что и border-style:

    + `none`: контур отсутствует

    + `solid`: контур в виде обычной линии

    + `dashed`: штриховая линия

    + `dotted`: линия в виде последовательности точек

    + `double`: контур в виде двух параллельных линий

* **outline-width**: толщина контура

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Контур в CSS3</title>
        <style>
        div{
            width: 128px;
            height: 96px;
            margin: 20px;
            border: 1px solid #ccc;
            background-color: #eee;
            outline-color: red;
            outline-style: dashed;
            outline-width: 2px;
        }
        </style>
    </head>
    <body>
        <div>Контур в CSS3</div>
    </body>
</html>
```

![alt](../assets/l17_2_6.png)

С помощью свойства outline данное определение контура можно сократить следующим образом:

```css
outline: red dashed 2px;
```

## Обтекание элементов

Как правило, все блоки и элементы на веб-странице в браузере появляются в том порядке, в каком они определены в коде html. Однако CSS предоставляет специальное свойство **float**, которое позволяет установить обтекание элементов, благодаря чему мы можем создать более интересные и разнообразные по своему дизайну веб-страницы.

Это свойство может принимать одно из следующих значений:

* `left`: элемент перемещается влево, а все содержимое, которое идет ниже его, обтекает правый край элемента

* `right`: элемент перемещается вправо

* `none`: отменяет обтекание и возвращает объект в его обычную позицию

При применении свойства **float** для стилизуемых элементов, кроме элемента img, рекомендуется установить свойство width.

Итак, представим, что нам надо на странице вывести слева от основного текста изображение, справа должен быть сайдбар, а все остальное место должно быть занято основным текстом статьи. Определим интерфейс страницы сначала без свойства float:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Обтекание в CSS3</title>
        <style>
         
        .image { 
            margin:10px;
            margin-top:0px;
        }
        .sidebar{
            border: 2px solid #ccc;
            background-color: #eee;
            width: 150px;
            padding: 10px;
            margin-left:10px;
            font-size: 20px;
        }
        </style>
    </head>
    <body>
        <div>
            <div class="sidebar">Л. Толстой. Война и мир. Том второй. Часть третья</div>
            <img src="dubi.png" class="image" alt="Война и мир" />
            <p>Старый дуб, весь преображенный, раскинувшись шатром сочной, темной зелени, млел, 
            чуть колыхаясь в лучах вечернего солнца...</p>
            <p>«Нет, жизнь не кончена в 31 год, – вдруг окончательно, беспеременно решил князь Андрей...</p>
        </div>
    </body>
</html>
```

В данном случае мы получим последовательное размещение элементов на странице:

![alt](../assets/l17_3_6.png)

Теперь на той же странице применим свойство `float`, изменив стили следующим образом:

```css
.image { 
    float:left; /* обтекание слева */
    margin:10px;
    margin-top:0px;
}
.sidebar{
    border: 2px solid #ccc;
    background-color: #eee;
    width: 150px;
    padding: 10px;
    margin-left:10px;
    font-size: 20px;
    float: right; /* обтекание справа */
}
```

Соответственно изменится и размещение элементов на странице:

![alt](../assets/l17_4_6.png)

Элементы, к которым применяется свойство `float`, еще называют floating elements или плавающими элементами.

Запрет обтекания. Свойство clear

Иногда возникает необходимость запретить обтекания. Подобная задача может быть актуальна, если какой-то блок должен переноситься вниз на новую строку, а не обтекать плавающий элемент. Например, футер, как правило, должен находиться строго внизу и растягиваться по всей ширине страницы. Если же перед футером находится плавающий элемент, то футер может обтекать этот элемент, что не желательно.

Для запрета обтекания элементов в CSS применяется свойство **clear**, которое указывает браузеру, что к стилизуемому элементу не должно применяться обтекание.

Свойство `clear` может принимать следующие значения:

* `left`: стилизуемый элемент может обтекать плавающий элемент справа. Слева же обтекание не работает

* `right`: стилизуемый элемент может обтекать плавающий элемент только слева. А справа обтекание не работает

* `both`: стилизуемый элемент может обтекать плавающие элементы и относительно них смещается вниз

* `none`: стилизуемый элемент ведет себя стандартным образом, то есть принимает участие в обтекании справа и слева

Например, пусть на веб-странице будет определен футер:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Обтекание в CSS3</title>
        <style>
        .image { 
            float:left;
            margin:10px;
            margin-top:0px;
        }
        .footer{
            border-top: 1px solid #ccc;
        }
        </style>
    </head>
    <body>
     
        <img src="dubi.png" class="image" alt="Дубы" />
        <div class="footer">Copyright © MyCorp. 2016</div>
    </body>
</html>
```

Наличие обтекания будет создавать некорректное отображение, при котором футер смещается вверх:

![alt](../assets/l17_5_6.png)

Изменим стиль футера:

```css
.footer{
    border-top: 1px solid #ccc;
    clear: both;
}
```

Теперь футер не будет обтекать изображение, а будет уходить вниз.

![alt](../assets/l17_6_6.png)

## Прокрутка элементов

Нередко при создании веб-страниц можно столкнуться с ситуацией, когда содержимое блока занимает гораздо больше места, чем сам определено шириной и высотой блока. В этой ситуации по умолчанию браузер все равно отображает содержимое, даже если оно выходит за границы блока.

Однако свойство **overflow** позволяет настроить поведение блока в подобной ситуации и добавить возможность прокрутки. Это свойство может принимать следующие значения:

* `auto`: если контент выходит за границы блока, то создается прокрутка. В остальных случаях полосы прокрутки не отображаются

* `hidden`: отображается только видимая часть контента. Контент, который выходит за границы блока, не отображается, а полосы прокрутки не создаются

* `scroll`: в блоке отображаются полосы прокрутки, даже если контент весь помещается в границах блока, и таких полос прокрутки не требуется

* `visible`: значение по умолчанию, контент отображается, даже если он выходит за границы блока

Рассмотрим применение двух значений:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Прокрутка в CSS3</title>
        <style>
        .article1{
            width: 300px;
            height: 150px;
            margin:15px;
            border: 1px solid #ccc;
            overflow: auto;
        }
        .article2{
            width: 300px;
            height: 150px;
            margin:15px;
            border: 1px solid #ccc;
            overflow: hidden;
        }
        </style>
    </head>
    <body>
        <div class="article1">
        <p>Старый дуб, весь преображенный, раскинувшись шатром сочной, темной зелени, млел, чуть 
            колыхаясь в лучах вечернего солнца. Ни корявых пальцев, ни болячек, ни старого недоверия и 
            горя – ничего не было видно. Да, это тот самый дуб», – подумал князь 
            Андрей, и на него вдруг нашло беспричинное весеннее чувство радости и обновления.</p>
        </div>
        <div class="article2">
        <p>Старый дуб, весь преображенный, раскинувшись шатром сочной, темной зелени, млел, чуть 
            колыхаясь в лучах вечернего солнца. Ни корявых пальцев, ни болячек, ни старого недоверия и 
            горя – ничего не было видно. Да, это тот самый дуб», – подумал князь 
            Андрей, и на него вдруг нашло беспричинное весеннее чувство радости и обновления.</p>
        </div>
    </body>
</html>
```

![alt](../assets/l17_7_6.png)

Свойство `overflow` управляет полосами прокрутки как по вертикали, так и по горизонтали. С помощью дополнительных свойств **overflow-x** и **overflow-y** можно определить прокрутку соответственно по горизонтали и по вертикали. Данные свойства принимают те же значения, что и `overflow`:

```css
overflow-x: auto;
overflow-y: hidden;
```

## Задание

### Задание 1

Создайте HTML-документ с элементом `<div>`. Примените следующие стили к этому элементу:
- Ширина: 200 пикселей.
- Высота: 150 пикселей.
- Цвет фона: любой цвет по вашему выбору.
- Текст внутри элемента: "Тень".
- box-shadow: Добавьте тень элементу с помощью свойства box-shadow. Параметры тени (hoffset, voffset, blur, spread, color) выберите на свой вкус, чтобы создать интересный эффект.

### Задание 2

Создайте HTML-документ с несколькими блоками `<div>`. Примените следующие стили к каждому из блоков:
- Ширина: 200 пикселей.
- Высота: 150 пикселей.
- Отступы: 20 пикселей справа и снизу.
- Фоновый цвет: любой цвет по вашему выбору.
- Контур: Создайте контур для каждого блока, используя свойство "outline." Установите разные значения для цвета, стиля и толщины контура.