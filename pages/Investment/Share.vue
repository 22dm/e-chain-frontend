<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <h1>精选组合</h1>
    <router-view />
    <div v-for="(item,index) in shareList" :key="index" :style="{ padding: '20px' }">
      <a-card :title="'组合-' + item.id" bordered :style="{ margin: '50 px'}">
          <a-table :dataSource="item['item']" :columns="columns" :pagination="false" rowKey="code"/>
          <br>
          <span><b>20个交易日收益: {{item['income']}}</b></span>
          <a-button style="float: right" type="primary" @click="onFollow(item.item)">一键跟单</a-button>
      </a-card>
    </div>
  </a-layout-content>
</template>

<script>
const columns = [
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '代码', dataIndex: 'code', key: '1' },
  { title: '价格', dataIndex: 'price', key: '2' },
  { title: '交易量', dataIndex: 'quantity', key: '3' },
];

// 下面列出两条假数据作为参考，后端获取的数据传到前端，请参考以下格式
const shareList = [];

export default {
  data() {
    return {
      shareList,
      columns,
    }
  },

  mounted() {
    this.getPage();
  },

  methods: {
    getPage() {
      this.$axios.get('/api/pub/getRecommend')
      .then((res) => {
        const shareList = res.data;
        this.shareList = [];
        for(let i=0;i<shareList.length;i++){
          let items = shareList[i].items;
          let shareItem = []
          for (let j=0;j<items.length;j++){
            let PItem = items[j];
            shareItem.push({
              type: PItem.type,
              name: PItem.name,
              code: PItem.code,
              price: PItem.buy_price,
              quantity: PItem.amount,
            });
          }
          this.shareList.push({
            item: shareItem,
            id: shareList[i].name,
          });
          shareItem = [];
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    //这里是按下一键跟单之后要执行的操作。
    onFollow (item) {
      const codeList = [];
      for (let i=0;i<item.length;i++) {
        codeList.push(item[i].code);
      }
      this.$router.push({
        path:'/investment/build', 
        query: {"codeList": codeList},
        })
    },
  },
}
</script>