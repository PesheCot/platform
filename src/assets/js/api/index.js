import router from "@/router";
import axios from "axios";
import state from "@/store/index.js"
axios.defaults.withCredentials = true;

class Api {
    constructor (params) {
        this.default_params = {
            url: 'https://45.80.69.32/api/',
            accessToken: localStorage.getItem('accessToken'),
            user: JSON.parse(localStorage.getItem('user')),
        }

        this.params = Object.assign(this.default_params, params);
    }

    async send(path, data = null, method = 'get') {
        try {
            if (this.params.accessToken) {
                const headers = {
                    'Authorization' : 'Bearer ' + this.params.accessToken,
                    'Content-Type': 'application/json',
                };
                const axios_params = {
                    method,
                    url: this.params.url + path,
                    headers,
                    data
                }
    
                let result = await axios(axios_params);;
    
                if (result.status != 200) {
                    // TODO : Вывод ошибки
                    router.push('/');
                    return
                }
                return result;
            } else {
                // TODO : Вывод ошибки
                router.push('/');
                return
            }    
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }

    async login(data) {
        try {
            const result = await axios.post(this.params.url + 'auth/local', data);



            this.params.accessToken = result.data.jwt;
            localStorage.setItem('accessToken', this.params.accessToken);

            if (result.status == 200 && result.data.jwt) {
                this.params.user = await this.getUser();
            }

            localStorage.setItem('user', JSON.stringify(result.data.user));
            state.commit('loginError', true);
            return result.data;
        } catch (error) {
            state.commit('loginError', true);
            try {
                const content = error.response.data.error;
                console.error(content.name + ': ' + content.message);
                return false;
            } catch (error) {
                state.commit('loginError', false);
            }
        }
    }

    async registration(data) {
        try {
            const result = await axios.post(this.params.url + 'auth/local/register', data);
     
            this.params.accessToken = result.data.jwt;
            localStorage.setItem('accessToken', this.params.accessToken);

            this.params.user = result.data.user;
            localStorage.setItem('user', JSON.stringify(result.data.user));

            return result.data;
        } catch (error) {
            const content = error.response.data.error;
            console.error(content.name + ': ' + content.message);
            return false;
        }   
    }

    async logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.clear();

        this.params.user = null;
        this.params.accessToken = null;

        router.push('/');
    }

    async getUser(use_cash = false) {
        if (use_cash && this.params.user) {
            return this.params.user;
        }

        let result = await this.send('users/me');
        if (result.status == 200) {
            this.params.user = result.data;
            localStorage.setItem('user', JSON.stringify(result.data));

            return result.data; 
        }
    }

    async getUserEditFields() {
        let result = await this.send('user/editFields');

        if (result.status == 200) {
            return result.data.content.user; 
        }
    }

    async getModule(slug) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.get(this.params.url + 'module/' + slug, { headers });

            return result.data.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async getModules() {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.get(this.params.url + 'modules', { headers });
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getHistoriQuestion() {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            let user = JSON.parse(localStorage.getItem('user'));
            let request;
            if (user?.role?.name != 'Teacher') {
                request = await axios.get(this.params.url + 'feedback/all_user_question', { headers });
            }
            else if (user?.role?.name == 'Teacher') {
                request = await axios.get(this.params.url + 'feedback/all_teacher_question', { headers });
            } else {
                request = false
            }
            const result = request
            return result;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async getHistoriQuestionOne() {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            let user = JSON.parse(localStorage.getItem('user'));
            let request;

            if (user?.role?.name == 'Student') {
                request = await axios.get(this.params.url + 'feedback/one_user_question/' + router.currentRoute.value.params.id, { headers });
            }
            else if (user?.role?.name == 'Teacher') {
                request = await axios.get(this.params.url + 'feedback/one_teacher_question/' + router.currentRoute.value.params.id, { headers });
            } else {
                request = false
            }
            const result = request
            return result;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async createQuestion(data_form) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.post(this.params.url + 'feedback/user_question', data_form, { headers });

            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async createComents(data_form) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.post(this.params.url + 'feedback/create_comment/' + router.currentRoute.value.params.id, data_form, { headers });
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async createComentsTeacher(task, lesson, stud, data_form) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.post(this.params.url + 'review/comment/' + task + '/' + lesson + '/' + stud, data_form, { headers });

            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async getComments() {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            let user_comments = await axios.get(this.params.url + 'feedback/' + router.currentRoute.value.params.id + '/comments', { headers });
            const result = user_comments.data
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }



    async updateUserProfile(data) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            const result = await axios.post(this.params.url + 'user/me', data, { headers });
            if (result.status == 200) {
			    state.commit('userName', data);
            }
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async updateUser(data) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            const result = await axios.post(this.params.url + 'auth/change-password', data, { headers });
            return result.data;
        } catch (error) {
            const is_error = error.response.data.error
            if (is_error?.message == 'Passwords do not match') {
                state.commit('openErrorProfilePassword', 'Новые пароли не совпадают')
            }
            if (is_error?.message == 'The provided current password is invalid') {
                state.commit('openErrorProfilePassword', 'Неправильный старый пароль')
            }
            if (is_error?.message == '1 errors occurred' || is_error?.message == '2 errors occurred' || is_error?.message == '3 errors occurred') {
                state.commit('openErrorProfilePassword', 'Не все поля заполнены');
            }
            if (is_error?.message == 'Your new password must be different than your current password') {
                state.commit('openErrorProfilePassword', 'Новый пароль должен отличаться от старого');
            }
            // console.error(error);
            return error.response.data;
        }
    }

    async notesSave(data, lessons_id) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            const result = await axios.post(this.params.url + 'note/by_lesson/' + lessons_id, data, { headers });
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async getTasksList() {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.get(this.params.url + 'review/for_teacher', { headers });

            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }


    async postTask(data, lessons_id) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            const result = await axios.post(this.params.url + 'review/by_lesson/' + lessons_id, data , { headers });
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async putMark(task_id, lesson_id, student_id, data) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            const result = await axios.post(this.params.url + 'review/mark/' + task_id + '/' + lesson_id + '/' + student_id, data, { headers });
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async getTaskForStudent(task_id, lesson_id) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            const result = await axios.get(this.params.url + 'review/' + task_id + '/' + lesson_id, { headers });

            let code = JSON.parse(localStorage.getItem('codes'));
            if (!code) {
                code = {};
            } 

            if (code) {
                if (task_id in code) {
                    if (result.data.data.attributes.data_parse > code[task_id].new_date) {
                        code[task_id] = {
                            html: result.data.data.attributes.html,
                            css: result.data.data.attributes.css,
                            js: result.data.data.attributes.js,
                            new_date: new Date().getTime()
                        }
                    }
                } else {
                    code[task_id] = {
                        html: result.data.data.attributes.html,
                        css: result.data.data.attributes.css,
                        js: result.data.data.attributes.js,
                        new_date: new Date().getTime()
                    }
                }
                localStorage.setItem('codes', JSON.stringify(code));
            }
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    async getTask(task_id, lesson_id, stud_id) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };
            const result = await axios.get(this.params.url + 'review/' + task_id + '/' + lesson_id + '/' + stud_id, { headers });
            return result.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }

    // async getNote(lesson_id) {
    //     try {
    //         const headers = {
    //             'Authorization' : 'Bearer ' + this.params.accessToken,
    //             'Content-Type': 'application/json',
    //         };
    //         const result = await axios.get(this.params.url + 'note/by_lesson/' + lesson_id, { headers });
    //         return result.data;
    //     } catch (error) {
    //         console.error(error);
    //         return error.response.data;
    //     }
    // }

    async is_admin() {
        const user = await this.getUser();

        return user.role == 'administrator';
    }

    async is_student() {
        const user = await this.getUser();

        return user.role == 'student';
    }

    async is_teacher() {
        const user = await this.getUser();

        return user.role == 'teacher';
    }

    async addModules(module) {
        if (!this.is_admin()) {
            return false
        }

        let result = await this.send('modules/add/', module, 'post');

        if (result.status == 200) {
            return result.data.content; 
        }
    }

    async getLessons(module_slug) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.get(this.params.url + 'lessons/by_module/' + module_slug, { headers });
            return result.data.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async getLesson(slug) {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.get(this.params.url + 'lessons/' + slug, { headers });

            return result.data.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async getSchedule() {
        try {
            const headers = {
                'Authorization' : 'Bearer ' + this.params.accessToken,
                'Content-Type': 'application/json',
            };

            const result = await axios.get(this.params.url + 'schedule', { headers });

            return result.data.data;
        } catch (error) {
            return error.response.data;
        }
    }

}

export default new Api();