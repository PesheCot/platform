<template>
    <section>
        <div class="container">
            <Title lvl="1">
                Заголовок
            </Title>
            <Title lvl="2">
                Заголовок 2
            </Title>
            <Title lvl="3">
                Заголовок 3
            </Title>
            <Title lvl="4">
                Заголовок 4
            </Title>
            <Title lvl="5">
                Заголовок 5
            </Title>
            <Title lvl="6">
                Заголовок 6
            </Title>
            <Text>
                Lorem ipsum dolor sit amet consectetur  <Code color="">adipisicing</Code> elit. Temporibus, adipisci facilis facere voluptates veritatis odio est velit deserunt voluptatibus. Eos quae fugit est esse nisi impedit ab voluptatum, explicabo nemo!
            </Text>
            <Text type="warning">
                Lorem ipsum dolor sit amet consectetur <Code>adipisicing</Code> elit. Temporibus, adipisci facilis facere voluptates veritatis odio est velit deserunt voluptatibus. Eos quae fugit est esse nisi impedit ab voluptatum, explicabo nemo!
            </Text>
            <Text type="danger">
                Lorem ipsum dolor sit amet consectetur  <Code>adipisicing</Code> elit. Temporibus, adipisci facilis facere voluptates veritatis odio est velit deserunt voluptatibus. Eos quae fugit est esse nisi impedit ab voluptatum, explicabo nemo!
            </Text>
            <Text type="good-solution">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, adipisci facilis facere voluptates veritatis odio est velit deserunt voluptatibus. Eos quae fugit est esse nisi impedit ab voluptatum, explicabo nemo!
            </Text>
            <Editor  
                id="task-1"
                :content_js="content"
                :content_html="content2"
                :content_css="content3"
            />
        </div>
    </section>
</template>

<script>
    import Title from '@/components/ui/Title.vue';
    import Text from '@/components/ui/Text.vue';
    import Editor from '@/components/ui/Editor.vue';
    
    export default {
        data() {
            return {
                content: `document.querySelector('h1').style.color = 'red'`,
                content2: `<h1>\n   Title\n</h1>`,
                content3: `h1 {\n   font-size: 40px\n}`,
            }
        },
        components: {
            Title,
            Text,
            Editor,
        }
    }
</script>

<style>
.ace_editor {
    height: 400px;
    font-size: 18px;
    line-height: 26px;
}

.ace_dark * {
    color: #dddddd;
}
</style>