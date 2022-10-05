<template>
    <div id="wrapall">
        <div id="wrap_btn_menu" class="container">
            <ul>
                <li>
                    <button @click="save">Save</button>
                </li>
                <li>
                    <button>Undo</button>
                </li>
                <li>
                    <button>Redo</button>
                </li>
                <li>
                    <button @click="exportFile">Export</button>
                </li>
                <li>
                    <label for="import">Import</label>
                    <input 
                        id="import"
                        type="file" 
                        ref="importfile" 
                        @change="importFile(getDataImport)"
                    />
                </li>
                <li>
                    <nuxt-link
                        id="view"
                        to="/consumer"
                        target="_blank"
                    >
                        View
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div id="wrap_main">
            <side-bar>
                <paragraph />
                <btn />
            </side-bar>
            <div id="wrap_content_config">
                <div 
                    class="wrap_content"
                    @drop.prevent="drop"
                    @dragover.prevent
                >
                    <div
                        class="wrap_item"
                        v-for="(item,i) in content_items"
                        :key="i"
                    >
                        <ct-paragraph 
                            v-if="item.type === 'paragraph'" 
                            :data_content="item" 
                            @showCf="showCf"
                        />
                        <ct-btn 
                            v-else 
                            :data_content="item" 
                            @showCf="showCf"
                        />
                    </div>
                </div>
                <div id="wrap_config">
                    <div
                        class="wrap_item_config"
                        v-for="(item,i) in content_items"
                        :key="i"
                    >
                        <cf-paragraph 
                            v-if="item.type === 'paragraph'" 
                            :data_content="item" 
                            v-show="item.cfshow" 
                        />
                        <cf-btn 
                            v-else 
                            :data_content="item" 
                            v-show="item.cfshow" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SideBar from "~/components/Admin/SideBar/SideBar.vue"
import Paragraph from "~/components/Admin/SideBar/Items/Paragraph.vue"
import Btn from "~/components/Admin/SideBar/Items/Btn.vue"
import CtParagraph from "~/components/Admin/Content/Items/CtParagraph.vue"
import CtBtn from "~/components/Admin/Content/Items/CtBtn.vue"
import CfParagraph from "~/components/Admin/Config/CfParagraph.vue"
import CfBtn from "~/components/Admin/Config/CfBtn.vue"
import { mapState } from 'vuex'
import urHandler from '~/services/undoRedo.js'

export default {
    components: {
        SideBar,
        Paragraph,
        Btn,
        CtBtn,
        CtParagraph,
        CfParagraph,
        CfBtn
    },
    created() {
        localStorage.clear();
    },
    data() {
        return{
            content_items: [],
            action: 'none',
            dataUndo: [],
            dataRedo: [],
            actionBefore: 'none',            
        }
    },
    computed: {
        ...mapState({
            dataShow: (state) => state.dataShow
        })
    },  
    methods: {
        drop(e) {
            const type = e.dataTransfer.getData("sidebar_data");
            console.log(type);
            let data_ctn_item = {
                type: type,
                id: Date.now(),
                cfshow: false
            } 
            switch (type) {
                case 'paragraph':
                    data_ctn_item.content = "Paragraph"
                    this.content_items.push(data_ctn_item);
                    break;
                case 'button':
                    data_ctn_item.content = "Button"
                    data_ctn_item.alet = ""
                    this.content_items.push(data_ctn_item);
                    break;
                default:
                    console.log("ERROR DROP TYPE !!!")
            }

            // urHandler.insert(JSON.stringify(this.content_items))
            // console.log(urHandler)
            // this.action = 'drag'
        },
        showCf(id) {
            this.content_items.forEach(item => item.cfshow = false);
            const indexShow =  this.content_items.findIndex(d => d.id == id);
            this.content_items[indexShow].cfshow = true;
        },
        save(){
            localStorage.setItem('dataShow', JSON.stringify(this.content_items));
            alert("SAVED")
        },
        exportFile() {  
            let dataContent = {
                data : JSON.parse(localStorage.getItem('dataShow'))
            };
            var a = document.createElement("a");
            var file = new Blob([JSON.stringify(dataContent)], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = 'export.json';
            a.click();
        },
        importFile(cb) {            
            var files = this.$refs.importfile.files;
            if (files.length <= 0) {
                return false;
            }
            var fr = new FileReader();
            fr.onload = function(e) {
                try {
                    const result = JSON.parse(e.target.result);
                    cb(result);
                } catch (e) {  
                    alert('INVALID JSON DATA');
                }
            }

            fr.readAsText(files.item(0));
        },
        getDataImport(imp){
            this.content_items = imp.data
        },
        // undo() {
        //     switch(this.action){
        //         case('drag'):
        //             let data = urHandler.getPrevState();
        //             if(data === 'Can not undo')
        //             {
        //                 alert(data);
        //                 return;
        //             }
        //             this.content_items = data[0]
        //             console.log("t: ",this.content_items)
        //             console.log(urHandler)
        //             break;
        //         case('save'):
        //             break;
        //         case('import'):
        //             break;
        //         default:
        //             alert("NO ACTION");
        //     }
        // },
        // redo() {
        //     switch(this.action){
        //         case('drag'):
        //             // this.content_items =  this.dataRedo
        //             let data = urHandler.getNextState()
        //             if(data === 'Can not redo')
        //             {
        //                 alert(data);
        //                 return;
        //             }
        //             console.log('r: ',data)
        //             this.content_items = data
        //             console.log(this.content_items)
        //             console.log(urHandler)
        //             break;
        //         case('save'):
        //             break;
        //         case('import'):
        //             break;
        //         default:
        //             alert("NO ACTION");
        //     }
        // }
    }
}
</script>