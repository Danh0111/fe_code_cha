<template>
    <span 
        data="paragraph"
        draggable="true"
        @dragstart="drag"
        @dragover.stop
    >
        Paragraph
    </span>
</template>
<script>
export default {
    methods: {
        drag: e => {
            const data = e.target.getAttribute('data');
            e.dataTransfer.setData("sidebar_data", data);
        }
    }
}
</script>