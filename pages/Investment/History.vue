<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <h1>交易历史</h1>
    <router-view />
    <div v-for="(item, index) in historyList" :key="index" :style="{ padding: '20px' }">
      <a-card bordered :style="{ margin: '50 px'}">
        <template class="ant-card-actions" slot="title">
        <a-row type="flex" justify="center" align="top">
          <a-col :span="2">
            <h4>组合-{{item.data.name}}</h4>
          </a-col>
          <a-col :span="2">
            <a-tag :color="item.data.tag==='卖出'?'blue':'green'">{{item.data.tag}}</a-tag>
          </a-col>
          <a-col :span="20">
            <p style="color: grey; font-size: 90%">{{item.data.time}}</p>
          </a-col>
        </a-row>
        </template>
          <a-table :dataSource="item['historyItem']" :columns="columns" :pagination="false" rowKey="code"/>
          <br>
          <a-button style="display:block;margin:0 auto" type="primary" @click="onShare(item.data.name)">分享</a-button>
      </a-card>
    </div>
  </a-layout-content>
</template>

<script>
const columns = [
  { title: '类型', dataIndex: 'type', key: 'type'},
  { title: '名称', dataIndex: 'name', key: 'name'},
  { title: '代码', dataIndex: 'code', key: 'code' },
  { title: '成交价', dataIndex: 'price', key: 'price' },
  { title: '交易量', dataIndex: 'quantity', key: 'quantity' },
  { title: '交易额', dataIndex: 'amount', key: 'amount' },
];

let historyList = [];

export default {
  data() {
    return {
      historyList,
      columns,
    }
  },
  mounted() {
    this.getPage();
  },

  methods: {
    getPage() {
      this.$axios.get('/api/pub/getHistory', {
        params: {
          user_id: "16",
        }
      })
      .then((res) => {
        this.historyList = [];
        const data = res.data;
        for(let i=0;i<data.length;i++){
          let item = data[i];
          let items = item['items'];
          let PItem = [];
          for(let j=0;j<items.length;j++){
            let thing = items[j];
            PItem.push({
              type: thing['type'],
              name: thing['name'],
              code: thing['code'],
              price: thing['buy_price'],
              quantity: thing['amount'],
              amount: thing['sum']
            })
          }
          this.historyList.push({
            historyItem: PItem,
            data: {
              name: item['name'],
              tag: item['tag'],
              time: item['time'],
            }
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    //这里是按下分享之后要执行的操作
    onShare(id) {
      console.log(id);
      this.$axios.post('/api/pub/recommend', {
        id: id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
}
</script>