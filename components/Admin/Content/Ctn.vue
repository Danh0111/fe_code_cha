<template>
    <div 
        class="wrap_content"
        @drop.prevent="drop"
        @dragover.prevent
    >
        <slot />
    </div>
</template>
<script>
export default {
    props:{
        ctn_item: {
            type: Array,
            default: []
        }  
    },
    methods: {
        drop: e => {
            const type = e.dataTransfer.getData("sidebar_data");
            console.log(type);
        }
    }
}
</script>