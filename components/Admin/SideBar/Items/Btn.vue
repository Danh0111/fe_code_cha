<template>
    <span 
        data="button"
        draggable="true"
        @dragstart="drag"
        @dragover.stop
    >
        Button
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