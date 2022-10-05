<template>
    <div id="wrapall_consumer">
        <div id="wrap_comsumer_content">
            <div
                class="wrap_item"
                v-for="(item,i) in dataShow"
                :key="i"
            >
                <ct-paragraph 
                    v-if="item.type === 'paragraph'" 
                    :data_content="item" 
                />
                <div
                    v-else
                    class="wrap_button"
                >
                    <button
                        :cfid='item.id'
                        @click="clickAlert(item.alert)"
                    >
                        {{ item.content }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CtParagraph from "~/components/Admin/Content/Items/CtParagraph.vue"
import CtBtn from "~/components/Admin/Content/Items/CtBtn.vue"

export default {
    components: {
        CtParagraph
    },
    computed: {
        dataShow() {
            return JSON.parse(localStorage.getItem('dataShow'));
        }
    },
    methods: {
        clickAlert(dataAlert){
            if(dataAlert !== "" && dataAlert !== undefined){
                alert(dataAlert)
            }
        }
    }
}
</script>