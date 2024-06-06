# Стилизация списков
CSS предоставляет специальные свойства по стилизации списков. Одним из таких свойств является list-style-type. Оно может принимать следующие значения для нумерованных списков:

- decimal: десятичные числа, отсчет идет от 1

- decimal-leading-zero: десятичные числа, которые предваряются нулем, например, 01, 02, 03, … 98, 99

- lower-roman: строчные латинские цифры, например, i, ii, iii, iv, v

- upper-roman: заглавные латинские цифры, например, I, II, III, IV, V…

- lower-alpha: строчные латинские буквы, например, a, b, c..., z

- upper-alpha: заглавные латинские буквы, например, A, B, C, … Z

Для ненумерованных списков:

- disc: черный диск

- circle: пустой кружочек

- square: черный квадратик

Например:
```css
ul{
    list-style-type: square;
}
```

![img](../assets/l13_1_1.png)

Чтобы вообще отключить маркеры у элементов списка, используется значение none:

```css
ul{
    list-style-type: none;
}
```
Данное свойство может применяться как ко всему списку, так и к отдельным элементам. Например:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Стилизация списков в CSS3</title>
        <style>
             
            .decimal{
                list-style-type: decimal;
            }
            ol{
                list-style-type: lower-roman;
            }
        </style>
    </head>
    <body>
        <ol>
            <li>Элемент 1</li>
            <li class="decimal">Элемент 2</li>
            <li>Элемент 3</li>
            <li>Элемент 4</li>
        </ol>
    </body>
</html>
```

### list-style-position
Веб-браузеры обычно отображают маркеры списка слева от элементов списка. С помощью свойства **list-style-position** мы можем настроить их позиционирование. Это свойство принимает два значения: outside (по умолчанию) и inside (обеспечивает равномерное распределение по ширине).

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Стилизация списков в CSS3</title>
        <style>
             
            ul.outside{
                list-style-position: outside;
            }
            ul.inside{
                list-style-position: inside;
            }
        </style>
    </head>
    <body>
        <h3>Inside</h3>
        <ul class="inside">
            <li>Он стал прислушиваться и услыхал звуки приближающегося топота лошадей и звуки голосов...</li>
            <li>Он стал прислушиваться и услыхал звуки приближающегося топота лошадей и звуки голосов...</li>
        </ul>
        <h3>Outside</h3>
        <ul class="outside">
            <li>Он стал прислушиваться и услыхал звуки приближающегося топота лошадей и звуки голосов...</li>
            <li>Он стал прислушиваться и услыхал звуки приближающегося топота лошадей и звуки голосов...</li>
        </ul>
    </body>
</html>
```

![img](../assets/l13_2_1.png)

### list-style-image

Свойство **list-style-image** позволяет задать в качестве маркера изображение:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Стилизация списков в CSS3</title>
        <style>
            ul{
                list-style-image:url(phone_touch.png);
            }
        </style>
    </head>
    <body>
        <ul>
            <li>iPhone 6S</li>
            <li>Galaxy S7</li>
            <li>Nexus 5X</li>
            <li>Lumia 950</li>
        </ul>
    </body>
</html>
```

![img](../assets/l13_3_1.png)

Свойство **list-style-image** в качестве значения принимает путь к изображению url(phone_touch.png), где "phone_touch.png" - это название файла изображения. То есть в данном случае предполагается, что в одной папке с веб-страницей находится файл изображения phone_touch.png.

# Стилизация таблиц
CSS предоставляет ряд свойств, которые помогают стилизовать таблицу:

- **border-collapse:** устанавливает, как будет стилизоваться граница смежных ячеек

- **border-spacing:** устанавливает промежутки между границами смежных ячеек

- **caption-side:** устанавливает положение элемента caption

- **empty-cells:** задает режим отрисовки для пустых ячеек

- **table-layout:** определяет размеры таблицы

### Установка таблицы
Ранее для установки границы в таблице широко использовался атрибут border, например:
```html
<table border="2px" >
```
Сейчас же тенденция для стилизации использовать только стили CSS, поэтому граница также задается через CSS с помощью стандартного свойства **border:**
```css
table {
    border: 1px solid #ccc;  /* граница всей таблицы */
}
tr {
    border: 1px solid #ccc;  /* границы между строками */
}
td, th {
    border: 1px solid #ccc;  /* границы между столбцами */
}
```
При установке границ между столбцами с помощью свойства **border-collapse** можно установить общую или раздельную границу между смежными ячейками:

- collapse: смежные ячейки имеют общую границу

- separate: смежные ячейки имеют отдельные границы, которые разделяются пространством

Если смежные ячейки имеют раздельные границы, то с помощью свойства **border-spacing** можно установить пространство между границами:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Стилизаци таблиц в CSS3</title>
        <style>
        table {
            border: 1px solid #ccc;
            border-spacing: 3px;
        }
         
        td, th{
            border: solid 1px #ccc;
        }
        .collapsed{
            border-collapse: collapse;
        }
        .separated{
            border-collapse: separate;
        }
        </style>
    </head>
    <body>
        <h3>Collapse</h3>
        <table class="collapsed">
            <tr><th>Модель</th><th>Производитель</th><th>Цена</th></tr>
            <tr><td>Lumia 950</td><td>Microsoft</td><td>29900</td></tr>
            <tr><td>iPhone 6S</td><td>Apple</td><td>52900</td></tr>
            <tr><td>Nexus 6P</td><td>Huawei</td><td>49000</td></tr>
        </table>
        <h3>Separate</h3>
        <table class="separated">
            <tr><th>Модель</th><th>Производитель</th><th>Цена</th></tr>
            <tr><td>G 5</td><td>LG</td><td>44900</td></tr>
            <tr><td>HTC 10</td><td>HTC</td><td>49900</td></tr>
            <tr><td>Nexus 5X</td><td>Google/LG</td><td>25000</td></tr>
        </table>
    </body>
</html>
```

![img](../assets/l13_4_1.png)

### Пустые ячейки

Свойство empty-cells позволяет стилизовать пустые ячейки с помощью одного из следующих значений:

- show: пустые ячейки отображаются, значение по умолчанию

- hide: пустые ячейки не отображаются

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Стилизаци таблиц в CSS3</title>
        <style>
        table {
            border: 1px solid #ccc;
            border-spacing: 3px;
        }
         
        td, th{
            border: solid 1px #ccc;
        }
        .hidden-empty-cells{
            empty-cells: hide;
        }
        </style>
    </head>
    <body>
        <h3>Show</h3>
        <table>
            <tr><th>Модель</th><th>Производитель</th><th>Цена</th></tr>
            <tr><td>Lumia 950</td><td>Microsoft</td><td>29900</td></tr>
            <tr><td>iPhone 6S</td><td></td><td></td></tr>
            <tr><td>Nexus 6P</td><td>Huawei</td><td>49000</td></tr>
        </table>
        <h3>Hide</h3>
        <table class="hidden-empty-cells">
            <tr><th>Модель</th><th>Производитель</th><th>Цена</th></tr>
            <tr><td>G 5</td><td>LG</td><td>44900</td></tr>
            <tr><td>HTC 10</td><td></td><td></td></tr>
            <tr><td>Nexus 5X</td><td>Google/LG</td><td>25000</td></tr>
        </table>
    </body>
</html>
```

![img](../assets/l13_5_1.png)

### Позиционирование заголовка

Свойство **caption-side** управляет позицией заголовка и может принимать следующие значения:

- top: позиционирование заголовка вверху (значение по умолчанию)

- bottom: позиционирование заголовка внизу

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Стилизаци таблиц в CSS3</title>
        <style>
        table {
            border: 1px solid #ccc;
            border-spacing: 3px;
        }
         
        caption {
         
            font-weight: bold;
        }
         
        td, th{
            border: solid 1px #ccc;
        }
        .captionBottom{
            caption-side: bottom;
        }
        </style>
    </head>
    <body>
        <h3>Top</h3>
        <table>
            <caption>Флагманы 2015 года</caption>
            <tr><th>Модель</th><th>Производитель</th><th>Цена</th></tr>
            <tr><td>Lumia 950</td><td>Microsoft</td><td>29900</td></tr>
            <tr><td>iPhone 6S</td><td>Apple</td><td>52900</td></tr>
            <tr><td>Nexus 6P</td><td>Huawei</td><td>49000</td></tr>
        </table>
        <h3>Bottom</h3>
        <table class="captionBottom">
            <caption>Новинки 2016 года</caption>
            <tr><th>Модель</th><th>Производитель</th><th>Цена</th></tr>
            <tr><td>G 5</td><td>LG</td><td>44900</td></tr>
            <tr><td>HTC 10</td><td>HTC</td><td>49900</td></tr>
            <tr><td>iPhone SE</td><td>Apple</td><td>37000</td></tr>
        </table>
    </body>
</html>
```

![img](../assets/l13_6_1.png)

### Управление размером таблицы
С помощью свойства **table-layout** можно управлять размером таблицы. По умолчанию это свойство имеет значение auto, при котором браузер устанавливает ширину столбцов таблицы автоматически, исходя из ширины самой широкой ячейки в столбце. А из ширины отдельных столбцов складывается ширина всей таблицы.

Однако с помощью другого значения - fixed можно установить фиксированную ширину:
```css
table {
    border: 1px solid #ccc;
    border-spacing: 3px;
    table-layout: fixed;
    width:350px; 
}
```

### Вертикальное выравнивание ячеек
Как правило, содержимое ячеек таблицы выравнивается по центру ячейки. Но с помощью свойства vertical-align это поведение можно переопределить. Это свойство принимает следующие значения:

- top: выравнивание содержимого по верху ячейки

- baseline: выравнивание первой строки текста по верху ячейки

- middle: выравнивание по центру (значение по умолчанию)

- bottom: выравнивание по низу

Свойство vertical-align применяется только к элементам <th> и <td>:
```css
td, th{
    border: solid 1px #ccc;
    vertical-align: bottom;
    height: 30px;
}
```
## Задание

Создайте HTML-таблицу, содержащую информацию о продуктах, например:

```html
<table>
    <thead>
        <tr>
            <th>Продукт</th>
            <th>Цена</th>
            <th>Наличие</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Яблоки</td>
            <td>1.99</td>
            <td>Да</td>
        </tr>
        <tr>
            <td>Бананы</td>
            <td>0.99</td>
            <td>Нет</td>
        </tr>
        <!-- Добавьте больше продуктов по желанию -->
    </tbody>
</table>
```

Задачи:

1. Используйте CSS для стилизации таблицы. Установите границы ячеек, цвет фона для заголовков столбцов и т. д.

2. Используйте свойства `border-collapse` и `border-spacing` для управления стилем границ таблицы и ячеек.

3. Установите цвет фона для четных и нечетных строк таблицы, чтобы легче читать данные.

4. Попробуйте использовать свойство `empty-cells` для скрытия пустых ячеек в таблице, если такие есть.
