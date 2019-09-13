<template>
<div style="width: 100%; padding: 0 20px">
    <a-card>
        <h2>关注列表</h2>
        <a-tag v-for="(item, index) in tags"
               :key="item.content"
               color="blue"
               closable
               @close="deleteTag(index)"
        >{{item.content}}</a-tag>
    </a-card>
    <div style="width: 100%; margin-top: 30px; display: flex; justify-content: space-between; align-items: center">
        <a-radio-group  defaultValue="news" buttonStyle="solid" @change="handleKindChange" v-model="kind">
            <a-radio-button value="news">新闻</a-radio-button>
            <a-radio-button value="announcement">公告</a-radio-button>
        </a-radio-group>
        <div>
            <a-input-search
                placeholder="关键词"
                style="width: 200px"
                @search="onSearch"
                v-model="newTag"
            />
            <a-button type="primary" style="vertical-align: center" @click="addTag">添加关注</a-button>
        </div>
    </div>
</div>
</template>

<script>
    export default{
        data(){
            return{
                kind: "news",
                newTag: "",
                tags:[{content: "腾讯"},{content: "阿里巴巴"},{content: "蚂蚁金服"} ]
            }
        },
        methods:{
            deleteTag(index){
                this.$axios.get('/api/tag/delete', this.tags[index]).then(
                    res=>{
                        let data=res.data;
                        if(data===true){
                            this.$message.success('删除成功');
                            this.tags.splice(index, 1);
                        }else{
                            this.$message.error('删除失败');
                        }
                    }
                );
            },
            addTag(){
                if(this.newTag===""){
                    return;
                }
                this.$axios.get('/api/tag/add', this.newTag).then(
                    res=>{
                        let data=res.data;
                        if(data===true){
                            this.$message.success('添加成功');
                            this.tags.push({content: this.newTag});
                            this.newTag="";
                        }else{
                            this.$message.error('添加失败');
                        }
                    }
                );
            },
            handleKindChange(){

            },
            onSearch(){

            }
        }
    }
</script>
