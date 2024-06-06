<template>
    <div class="student">
        <div class="table-id lesson-student">{{id}}</div>
        <div class="table-name lesson-student">
            {{name}}
        </div>
        <div class="table-status lesson-student" :style="{color: status_color}">
            {{ status_text }}
        </div>
        <div class="table-progress lesson-student">
            {{progress}}%
        </div>
        <div class="table-grade lesson-student">
            {{grade}}
        </div>
        <div class="table-late lesson-student" :style="{color: late_color}">
            {{ late_text }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: Number,
        name: "",
        status: "",
        progress: Number,
        grade: Number,
        late: Number,
    },

    data() {
        return {
            status_color: "",
            late_color: "",
            status_text: "",
            late_text: "",
        }
    },

    methods: 
    {
        setColor(){ 
            if (this.status == 0) {
                this.status_color = 'var(--red)'
                this.status_text = "не выполнен"

            }
            if (this.status == 1) {
                this.status_color = 'var(--blue)'
                this.status_text = "на проверке"

            }
            if (this.status == 2) {
                this.status_color = 'var(--darck-green)'
                this.status_text = "выполнен"

            }

            if (this.late == 1) {
                this.late_color = 'var(--darck-green)'
                this.late_text = "вовремя"
            }
            if (this.late == 2) {
                this.late_color = 'var(--red)'
                this.late_text = "задержан"
            }
        },    
    },
    mounted () {
        this.setColor();
    },
    updated() {
        this.setColor(); 
    }
}
</script>
<style>
    .student {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    .lesson-student {
        border-top: 1px solid var(--black);
        border-right: 1px solid var(--black);
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    .lesson-student:last-of-type {
        border-right: none;
    }

    .lesson-student p {

        margin: 0;
        padding: 0;
    }

    .table-id {
        width: 5%;
        color: var(--tip-gray);
    }

    .table-name {
        width: 30%;
        justify-content: flex-start;
        font-weight: 600;
        font-size: 18px;
    }

    .table-status {
        width: 18%;
    }

    .table-progress {
        width: 18%;
    }

    .table-grade {
        width: 18%;
    }

    .table-late {
        width: 11%;
    }
</style>