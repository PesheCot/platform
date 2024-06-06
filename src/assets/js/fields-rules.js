class FieldsRules {
    constructor () {
        this.rules = {
            name:          { label: 'Имя',               type: 'text'   },
            last_name:     { label: 'Фамилия',           type: 'text'   },
            patronymic:    { label: 'Отчество',          type: 'text'   },
            phone:         { label: 'Телефон',           type: 'text'   },
            status:        { label: 'Статус',            type: 'text'   },
            email:         { label: 'Email',             type: 'email'  },
            series:        { label: 'Серия',             type: 'number' },
            number:        { label: 'Номер',             type: 'number' },
            issued:        { label: 'Кем выдан',         type: 'text'   },
            issued_date:   { label: 'Когда выдан',       type: 'date'   },
            division_code: { label: 'Код подразделения', type: 'number' },
            gender:        { label: 'Пол',               type: 'text'   },
            birth_date:    { label: 'Дата рождения',     type: 'date'   },
            birth_place:   { label: 'Место рождения',    type: 'text'   },
        };
    }

    getName(key) {
        return this.rules[key] ? this.rules[key].label : key;
    }
    
    getType(key) {
        return this.rules[key] ? this.rules[key].type : 'text';
    }

    getComment(key) {
        return this.rules[key] ? this.rules[key]?.comment : null;
    }
}

export default new FieldsRules();

