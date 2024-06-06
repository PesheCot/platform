<template>
    <router-link :to="'/review/' + slug">
    <div class="task">
        <div class="table-lesson task-student">
            {{lesson}}
        </div>
        <div class="table-student task-student">
            {{student}}
        </div>
        <div class="table-task task-student">
            {{task}}
        </div>
    </div>
</router-link>
</template>
<script>
export default {
    data() {
        return {
        }
    },

    props: {
        lesson: '',
        student: '',
        task: '',
        slug: ''
    },

    methods: 
    {
    },
    mounted () {
    },
    updated() {
    }
}
</script>
<style>
    .task {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .task-student {
        border-top: 1px solid var(--black);
        border-right: 1px solid var(--black);
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    .task-student:last-of-type {
        border-right: none;
    }

    .task-student p {
        margin: 0;
        padding: 0;
    }

    .table-lesson {
        width: 33%;
        justify-content: flex-start;
    }

    .table-student {
        width: 33%;
    }

    .table-task {
        width: 33%;
    }
</style>