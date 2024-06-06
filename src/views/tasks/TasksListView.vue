<template>   
<div class="container">
    <h3> Задания на проверке</h3>
    <div ref="lesson_btn" class="task_btn" @click="removeFilter">Сбросить фильтры</div>
    <div ref="lesson_info" class="lesson-info">
        <div class="lesson-header_table">
            <div class="table-name lesson-header-item">
                Урок
                <div class="drop-item">
                    <input class="table-header-inp drop-item-inp" ref="lesson_inp" type="text" @input="filter">
                    <div class="drop-item-close">
                        <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.05273 21L21.0001 1" stroke="#263238" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10"/>
                            <path d="M1 1L21 21" stroke="#263238" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10"/>
                        </svg>
                    </div>
                </div>
                <div class="tools-bar">
                    <div class="filter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div> 
                    <div class="sort" @click="sortByLesson">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M11.1924 5.65685C11.5829 5.26633 11.5829 4.63316 11.1924 4.24264L8.36397 1.41421C8.30576 1.356 8.24485 1.30212 8.18165 1.25259C7.50286 0.720577 6.55947 0.689024 5.84929 1.15793C5.73839 1.23115 5.63317 1.31658 5.53554 1.41421L2.70711 4.24264C2.31658 4.63316 2.31658 5.26633 2.70711 5.65685C3.09763 6.04738 3.7308 6.04738 4.12132 5.65685L6.00003 3.77814V18C6.00003 18.5523 6.44775 19 7.00003 19C7.55232 19 8.00003 18.5523 8.00003 18V3.8787L9.77818 5.65685C10.1687 6.04737 10.8019 6.04737 11.1924 5.65685Z" fill="#0F0F0F"/>
                            <path d="M12.7071 18.3432C12.3166 18.7337 12.3166 19.3668 12.7071 19.7574L15.5355 22.5858C15.6332 22.6834 15.7384 22.7689 15.8493 22.8421C16.6256 23.3546 17.6805 23.2692 18.364 22.5858L21.1924 19.7574C21.5829 19.3668 21.5829 18.7337 21.1924 18.3432C20.8019 17.9526 20.1687 17.9526 19.7782 18.3432L18 20.1213L18 6C18 5.44771 17.5523 5 17 5C16.4477 5 16 5.44771 16 6L16 20.2218L14.1213 18.3432C13.7308 17.9526 13.0976 17.9526 12.7071 18.3432Z" fill="#0F0F0F"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="table-status lesson-header-item">
                Студент
                <div class="drop-item">
                    <input class="table-header-inp drop-item-inp" ref="student_inp" type="text" @input="filter">
                    <div class="drop-item-close">
                        <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.05273 21L21.0001 1" stroke="#263238" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10"/>
                            <path d="M1 1L21 21" stroke="#263238" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10"/>
                        </svg>
                    </div>
                </div>
                <div class="drop-item">
                    <input class="table-header-inp drop-item-inp" type="hidden" ref="status_inp">
                </div>
                <div class="tools-bar">
                    <div class="filter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div> 
                    <div class="sort"  @click="sortByProgress">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M11.1924 5.65685C11.5829 5.26633 11.5829 4.63316 11.1924 4.24264L8.36397 1.41421C8.30576 1.356 8.24485 1.30212 8.18165 1.25259C7.50286 0.720577 6.55947 0.689024 5.84929 1.15793C5.73839 1.23115 5.63317 1.31658 5.53554 1.41421L2.70711 4.24264C2.31658 4.63316 2.31658 5.26633 2.70711 5.65685C3.09763 6.04738 3.7308 6.04738 4.12132 5.65685L6.00003 3.77814V18C6.00003 18.5523 6.44775 19 7.00003 19C7.55232 19 8.00003 18.5523 8.00003 18V3.8787L9.77818 5.65685C10.1687 6.04737 10.8019 6.04737 11.1924 5.65685Z" fill="#0F0F0F"/>
                            <path d="M12.7071 18.3432C12.3166 18.7337 12.3166 19.3668 12.7071 19.7574L15.5355 22.5858C15.6332 22.6834 15.7384 22.7689 15.8493 22.8421C16.6256 23.3546 17.6805 23.2692 18.364 22.5858L21.1924 19.7574C21.5829 19.3668 21.5829 18.7337 21.1924 18.3432C20.8019 17.9526 20.1687 17.9526 19.7782 18.3432L18 20.1213L18 6C18 5.44771 17.5523 5 17 5C16.4477 5 16 5.44771 16 6L16 20.2218L14.1213 18.3432C13.7308 17.9526 13.0976 17.9526 12.7071 18.3432Z" fill="#0F0F0F"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="table-progress lesson-header-item">
                Задача
                <div class="drop-item">
                    <input class="table-header-inp drop-item-inp" ref="task_inp" type="text" @input="filter">
                    <div class="drop-item-close">
                        <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.05273 21L21.0001 1" stroke="#263238" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10"/>
                            <path d="M1 1L21 21" stroke="#263238" stroke-opacity="0.5" stroke-width="1.5" stroke-miterlimit="10"/>
                        </svg>
                    </div>
                </div>
                <div class="tools-bar">
                    <div class="filter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div> 
                    <div class="sort" @click="sortByTasks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M11.1924 5.65685C11.5829 5.26633 11.5829 4.63316 11.1924 4.24264L8.36397 1.41421C8.30576 1.356 8.24485 1.30212 8.18165 1.25259C7.50286 0.720577 6.55947 0.689024 5.84929 1.15793C5.73839 1.23115 5.63317 1.31658 5.53554 1.41421L2.70711 4.24264C2.31658 4.63316 2.31658 5.26633 2.70711 5.65685C3.09763 6.04738 3.7308 6.04738 4.12132 5.65685L6.00003 3.77814V18C6.00003 18.5523 6.44775 19 7.00003 19C7.55232 19 8.00003 18.5523 8.00003 18V3.8787L9.77818 5.65685C10.1687 6.04737 10.8019 6.04737 11.1924 5.65685Z" fill="#0F0F0F"/>
                            <path d="M12.7071 18.3432C12.3166 18.7337 12.3166 19.3668 12.7071 19.7574L15.5355 22.5858C15.6332 22.6834 15.7384 22.7689 15.8493 22.8421C16.6256 23.3546 17.6805 23.2692 18.364 22.5858L21.1924 19.7574C21.5829 19.3668 21.5829 18.7337 21.1924 18.3432C20.8019 17.9526 20.1687 17.9526 19.7782 18.3432L18 20.1213L18 6C18 5.44771 17.5523 5 17 5C16.4477 5 16 5.44771 16 6L16 20.2218L14.1213 18.3432C13.7308 17.9526 13.0976 17.9526 12.7071 18.3432Z" fill="#0F0F0F"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>    
        <Task v-for="(item, index) in filtered_tasks" :lesson="item.attributes.lesson_id.data.attributes.name"  :student="item.attributes.fio" :task="item.attributes.task_name" :slug="item.attributes.task_id + '/' + item.attributes.lesson_id.data.id + '/' + item.attributes.task_user_id"/>
    </div>
</div>
</template>
<script>
import api from '@/assets/js/api'
import Task from "@/components/tasks/Task.vue";

export default {
components: {
    Task
},
// props: {
// },
data() {
    return {
        id: 0,
        name: "",
        filtered_tasks: [],
        tasks: [],
        sort_ASC: true,
        last_sort: ''
    }
},
computed: {
    
}, 
methods: {
    dropList() {
        if (!this.$refs.lesson_info) {
            return;
        }

        let headers = this.$refs.lesson_info.querySelectorAll('.lesson-header-item')
        headers.forEach(header => {
            let drop_item = header.querySelector('.drop-item');
            let height_drop_inp = header.querySelector('.drop-item-inp')
            let height_drop = height_drop_inp.clientHeight
            drop_item.style.transition =  Math.round(height_drop / 50) * 0.3 + 's'
            window.addEventListener('click', (e)=> {
                if (e.target != (drop_item && header.querySelector('.filter svg'))) {
                    drop_item.style.height = 0 + 'px';
                }
            })
            header.querySelector('.filter').addEventListener('click', ()=>{
                if (drop_item.clientHeight == 0){
                    this.removeDropList();
                    let inp = drop_item.querySelector('input')
                    if (inp) {
                        inp.focus()
                        inp.addEventListener('keydown', function(e) {
                            if (e.keyCode === 13) {
                                drop_item.style.height = 0 + 'px'
                            }
                        });
                        drop_item.querySelector('svg').addEventListener('click', ()=>{
                            inp.value = '';
                            drop_item.style.height = 0 + 'px'
                            this.filter();
                        })
                    }
                    drop_item.style.height = height_drop + 20 + 'px';
                } else {
                    drop_item.style.height = 0 + 'px'
                }
                
            })
        })   
    },
    removeDropList() {
        let headers = this.$refs.lesson_info.querySelectorAll('.lesson-header-item')
        headers.forEach(header => {
            let drop_item = header.querySelector('.drop-item');
            drop_item.style.height = 0 + 'px'
        })
    },
    filter() {
        this.filtered_tasks = this.tasks.filter((tasks) => {
            let flag = true;

            // Lesson
            if  (this.$refs.lesson_inp.value.length > 2 && this.$refs.lesson_inp.value != ''){
                flag = tasks.attributes.lesson_id.data.attributes.name.toLowerCase().indexOf(this.$refs.lesson_inp.value.toLowerCase()) >= 0;
                if (!flag) {
                    return false;
                }
            }

            // Student
            if  (this.$refs.student_inp.value.length > 2 && this.$refs.student_inp.value != ''){
                flag = tasks.attributes.fio.toLowerCase().indexOf(this.$refs.student_inp.value.toLowerCase()) >= 0;
                if (!flag) {
                    return false;
                }
            }

            // Tasks
            if  (this.$refs.task_inp.value.length > 2 && this.$refs.task_inp.value != ''){
                flag = tasks.attributes.task_name.toLowerCase().indexOf(this.$refs.task_inp.value.toLowerCase()) >= 0;
                if (!flag) {
                    return false;
                }
            }

            return true; 
        })
    },
    // filteredByLate(e) {
    //     this.$refs.late_inp.value = e.target.dataset.value;
    //     this.removeDropList();
    //     this.filter();
    // },
    // filteredByStatus(e) {
    //     this.$refs.status_inp.value = e.target.dataset.value;
    //     this.removeDropList();
    //     this.filter();
    // },
    removeFilter() {
        this.removeDropList();
        this.filtered_tasks = this.tasks
        this.$refs.lesson_inp.value = ''
        this.$refs.student_inp.value = ''
        this.$refs.task_inp.value = ''
    },
    sortByLesson() {
        if (this.last_sort != 'lesson') {
            this.sort_ASC = true;
        }

        this.filtered_tasks.sort((a, b) => {
            if (this.sort_ASC) {
                if (a.attributes.lesson_id.data.attributes.name < b.attributes.lesson_id.data.attributes.name) {return -1;}
                if (a.attributes.lesson_id.data.attributes.name < b.attributes.lesson_id.data.attributes.name) {return 1;}
            } else {
                if (a.attributes.lesson_id.data.attributes.name > b.attributes.lesson_id.data.attributes.name) {return -1;}
                if (a.attributes.lesson_id.data.attributes.name > b.attributes.lesson_id.data.attributes.name) {return 1;}
            }
        });

        this.last_sort = 'lesson';
        this.sort_ASC = !this.sort_ASC;
    },  
    sortByProgress() {
        if (this.last_sort != 'progress') {
            this.sort_ASC = true;
        }

        this.filtered_tasks.sort((a, b) => {
            if (this.sort_ASC) {
                if(a.attributes.fio < b.attributes.fio){return -1;}
                if(b.attributes.fio < a.attributes.fio){return 1;}
            } else {
                if(a.attributes.fio > b.attributes.fio){return -1;}
                if(b.attributes.fio > a.attributes.fio){return 1;}
            }
        });

        this.last_sort = 'progress';
        this.sort_ASC = !this.sort_ASC;
    },
    sortByTasks() {
        if (this.last_sort != 'tasks') {
            this.sort_ASC = true;
        }

        this.filtered_tasks.sort((a, b) => {
            if (this.sort_ASC) {
                if(a.attributes.task_name < b.attributes.task_name) {return -1;}
                if(b.attributes.task_name < a.attributes.task_name) {return 1;}
            } else {
                if(a.attributes.task_name > b.attributes.task_name) {return -1;}
                if(b.attributes.task_name > a.attributes.task_name) {return 1;}
            }
        });
        this.last_sort = 'tasks';
        this.sort_ASC = !this.sort_ASC;
    },
    
},
async created() {
        const result = await api.getTasksList();
        this.tasks = result.data;
        if (this.tasks) {
            this.dropList();
            if (this.tasks.length > 0) {
                this.tasks.forEach(task => {
                    //student.progress 
                });
            }
            this.filtered_tasks = this.tasks;
        }
    },
};
</script>
<style scoped>  

.route-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}

.route-leave-active {
    transition: 0.8s;
}

.task_btn {
    transition: 0.8s;
    cursor: pointer;
    padding: 10px;
    border: 1px solid black;
    position: absolute;
    font-size: 14px;
    right: 80px;
    top: 24px;
}

.task_btn:hover{
    color: var(--tip-gray);
    background-color: var(--black);
}
.lesson-info {
    display: flex;
    flex-direction: column;
}

.lesson-header_table {
    display: flex;
    flex-direction: row;
}

.lesson-header-item {
    flex-direction: column;
    align-items: center;
}

.table-name {
    width: 33%;
}
.lesson-header-item{
    font-weight: 600;
    font-size: 18px;
}

.table-status {
    width: 33%;
}

.table-progress {
    width: 33%;
}

.lesson-header-item {
    display: flex;
    position: relative;
    border-right: 1px solid var(--black);
    padding: 20px;
    gap: 10px;
}

.lesson-header-item:last-of-type {
    border-right: none;
}

.lesson-info:first-of-type {
    border-bottom: 1px solid var(--black);
}

.tools-bar {
    top: 10px;
    right: 10px;
    position: absolute;
    display: flex;
    flex-direction: column;
}

.filter,
.sort {
    cursor: pointer;
    width: 18px;
    height: 18px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter {
    margin-bottom: 5px;
}

.drop-item {
    position: absolute;
    transition: 0.8s;
    left: 0px;
    top: 56px;
    width: 100%;
    min-width: 100%;
    height: 0px;
    z-index: 10;
    overflow: hidden;
}

.drop-item-close {
    position: absolute;
    cursor: pointer;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0px;
    top: 0px;
}
.table-header-inp {
    width: 100%;
    font-size: 14px;
    line-height: 16px;
    outline: 0;
    outline-offset: 0;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--dark-grey);
    border-left: none;
    border-right: none;
    padding: 5px;
}

.lesson-filter-list {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    padding: 10px;
    border: 1px solid var(--dark-grey);
    border-left: none;
    border-right: none;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
}

.late_filter-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    border-top: 1px solid black;
    width: 100%;
    padding-top: 10px;
}

.late_filter-item:first-of-type {
    border-top: none;
}
</style>