<template>
    <div class="wrap_button">
        <button
            :cfid='data_content.id'
            @click="showCf"
        >
            {{ data_content.content }}
        </button>
    </div>
</template>
<script>
export default {
    props: {
        data_content: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        showCf(e) {
            this.$emit('showCf',e.target.getAttribute('cfid'));
        }
    }
}
</script>