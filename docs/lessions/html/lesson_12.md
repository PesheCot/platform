# Форматирование текста
### text-transform
Свойство **text-transform** изменяет регистр текста. Оно может принимать следующие значения:

- capitalize: делает первую букву слова заглавной

- uppercase: все слово переводится в верхний регистр

- lowercase: все слово переводится в нижний регистр

- none: регистр символов слова никак не изменяется

Например:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Шрифты в CSS3</title>
         
        <style>
            p.lowercase {text-transform: lowercase;}
            p.uppercase {text-transform: uppercase;}
            p.capitalize { text-transform: capitalize;}
        </style>
    </head>
    <body>
    <div>
        <p class="capitalize">Текст использует значение capitalize</p>
        <p class="lowercase">Текст использует значение lowercase</p>
        <p class="uppercase">Текст использует значение uppercase</p>
    </div>
    </body>
</html>
```

![alt](../assets/l12_1_1.png)

### Свойство text-decoration

Свойство **text-decoration** позволяет добавить к тексту некоторые дополнительные эффекты. Это свойство может принимать следующие значения:

- underline: подчеркивает текст

- overline: надчеркивает текст, проводит верхнюю линию

- line-through: зачеркивает текст

- none: к тексту не применяется декорирование

Например:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Шрифты в CSS3</title>
         
        <style>
            p.under {
                text-decoration: underline;
            }
            p.over {
                text-decoration: overline;
            }
            p.line {
                text-decoration: line-through;
            }
            p.mixed {
                text-decoration: underline line-through;
            }
            a.none {
                text-decoration: none;
            }
        </style>
    </head>
    <body>
    <div>
        <p class="under">Это подчеркнутый текст.</p>
        <p class="over">Это надчеркнутый текст</p>
        <p class="line">Это зачеркнутый текст</p>
        <p class="mixed">Это подчеркнутый и зачеркнутый текст</p>
        <p>Не подчеркнутая <a href="index.php" class="none">ссылка<a></p>
    </div>
    </body>
</html>
```

![alt](../assets/l12_2_1.png)

При необходимости мы можем комбинировать значения. Так, в предпоследнем случае применялся стиль:
```css
p.mixed { text-decoration: underline line-through; }
```

### Межсимвольный интервал
Два свойства CSS позволяют управлять интервалом между символами и словами текста. Для межсимвольного интервала применяется атрибут letter-spacing, а для интервала между словами - word-spacing:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Шрифты в CSS3</title>
         
        <style>
            p.smallLetterSpace {
                letter-spacing: -1px;
            }
            p.bigLetterSpace {
                letter-spacing: 1px;
            }
            p.smallWordSpace{
                word-spacing: -1px;
            }
            p.bigWordSpace{
                word-spacing: 1px;
            }
        </style>
    </head>
    <body>
    <div>
        <h3>Обычный текст</h3>
        <p>Над ним не было ничего уже, кроме неба...</p>
        <h3>letter-spacing: -1px;</h3>
        <p class="smallLetterSpace">Над ним не было ничего уже, кроме неба...</p>
        <h3>letter-spacing: 1px;</h3>
        <p class="bigLetterSpace">Над ним не было ничего уже, кроме неба...</p>
        <h3>word-spacing: -1px</h3>
        <p class="smallWordSpace">Над ним не было ничего уже, кроме неба...</p>
        <h3>word-spacing: 1px</h3>
        <p class="bigWordSpace">Над ним не было ничего уже, кроме неба...</p>
    </div>
    </body>
</html>
```

![alt](../assets/l12_3_1.png)

### text-shadow
С помощью свойства **text-shadow** можно создать тени для текста. Для этого свойства необходимо задать четыре значения: горизонтальное смещение тени относительно текста, вертикальное смещение тени относительно текста, степень размытости тени и цвет отбрасываемой тени. Например:

```css
h1{
    text-shadow: 5px 4px 3px #999;
}
```

![Текстовые тени](../assets/l12_4_1.png)

В данном случае горизонтальное смещение тени относительно букв составляет 5 пикселей, а вертикальное смещение вниз - 4 пикселя. Степень размытости - 3 пикселя, и для тени используется цвет #999.

Если нам надо было бы создать горизонтальное смещение влево, а не вправо, как по умолчанию, то в этом случае надо было бы использовать отрицательное значение. Аналогично для создания вертикального смещения вверх также надо использовать отрицательное значение. Например:

```css
h1{
    text-shadow: -5px -4px 3px #999;
}
```
![Текстовые тени](../assets/l12_5_1.png)

# Стилизация абзацев
Отдельная группа свойств CSS позволяет стилизовать большие группы текста, например, установить высоту строки или выравнивание текста.
### line-height
Свойство **line-height** определяет межстрочный интервал. Для его установки можно использовать пиксели, проценты или единицы em. Как правило, применяются либо проценты, либо em. Например:
```css
p{
    line-height: 150%;
}
```
Если это свойство не установлено, то по умолчанию используется значение line-height: 120%;

![Текстовые тени](../assets/l12_6_1.png)

### text-align

Свойство **text-align** выравнивает текст относительно одной из сторон веб-страницы. Оно принимает следующие значения:

- left: текст выравнивается по левой стороне

- right: текст выравнивается по правой стороне

- justify: выравнивание по ширине, слова равномерно распределяются по строке

- center: выравнивание по центру

Например:

```css
p{
    text-align: left;
}
```

![Текстовые тени](../assets/l12_7_1.png)

### text-indent
Свойство text-indent задает отступ первой строки абзаца. Для установки отступа могут применяться стандартные единицы измерения, например, em или пиксели:
```css
p{
    text-indent: 35px;
}
```

![Текстовые тени](../assets/l12_8_1.png)


## Задание:
Изменить код так чтобы результат соответствовал скриншоту
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Основы шрифтов</title>
    <style>
        .title {
            /*добавить подчеркивание*/
            line-height: 1em; /* 1em = 1% от высоты шрифта */
        }

        .subtitle {
            /* Все буквы - заглавные, зачеркивание, текст белый, фон #333 */
            padding: 10px 20px;
        }

        .paragraph {
            /* Отступ сверху - 20 пикселей, все буквы в неижнем регистре, тень 2px 2px #aaa */
        }
    </style>
</head>
    <body>
    <p class="title">Заголовок</p>
    <p class="subtitle">Подзаголовок</p>
    <p class="paragraph">Параграф</p>
    </body>
</html>
```
как должно получиться:

![Alt text](../assets/l12_task.png)
