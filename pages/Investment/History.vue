<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <h1>交易历史</h1>
    <router-view />
    <div v-for="(item, index) in historyList" :key="index" :style="{ padding: '20px' }">
      <a-card bordered :style="{ margin: '50 px'}">
        <template class="ant-card-actions" slot="title">
        <a-row type="flex" justify="center" align="top">
          <a-col :span="2">
            <h4>组合-{{item.name}}</h4>
          </a-col>
          <a-col :span="2">
            <a-tag :color="item.tag==='卖出'?'blue':'green'">{{item.tag}}</a-tag>
          </a-col>
          <a-col :span="20">
            <p style="color: grey; font-size: 90%">{{item.time}}</p>
          </a-col>
        </a-row>
        </template>
          <a-table :dataSource="item['historyItem']" :columns="columns" :pagination="false" rowKey="id"/>
          <br>
          <a-button style="display:block;margin:0 auto" type="primary" @click="onShare(item)">分享</a-button>
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

// 下面列出两条假数据作为参考，后端获取的数据传到前端，请参考以下格式
const historyList = [];
// let historyItem = [];

// for (let i = 0; i < 5; i++) {
//   let type = (i%3 === 0)? '股票':'基金';
//   let price = 20 + 11*i;
//   let quantity = 500 * (5-i);
//   let amount = quantity * price;
//   historyItem.push({
//     type: type,
//     name: `${type} ${i}`,
//     code: 10086 + i * 832 - 5,
//     price: price,
//     quantity: quantity,
//     amount: amount,
//     id : `${i}`
//   });
// }
// historyList.push({
//   historyItem: historyItem,
//   id: 0,
//   type: "买入",
//   time: "2019-9-10",
// });

// historyItem = [];
// for (let i = 0; i < 5; i++) {
//   let type = (i%3-1 === 0)? '股票':'基金';
//   let price = 13 + 7*i;
//   let quantity = 400 * (5-i);
//   let amount = quantity * price;
//   historyItem.push({
//     type: type,
//     name: `${type} ${i}`,
//     code: 27148 + i * 221 - 4,
//     price: price,
//     quantity: quantity,
//     amount: amount,
//     id : `${i}`
//   });
// }

// historyList.push({
//   historyItem: historyItem,
//   id: 1,
//   type: "卖出",
//   time: "2019-8-22",
// });

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
        console.log(res);

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
            item: PItem,
            data: {
              name: item['name'],
              tag: item['tag'],
              time: item['time'],
            }
          })
        }
        console.log(this.historyList);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    //这里是按下分享之后要执行的操作
    onShare(item) {

    }
  },
}
</script>