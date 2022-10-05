<template>
    <div class="config">
        <div class="config_title">
            Paragraph Text
        </div>
        <div class="config_input">
            <input  type="text" v-model="data_content.content"/>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data_content: {
            type: Object,
            default: () => {}
        }
    }
}
</script>