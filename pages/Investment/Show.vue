<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <router-view />
    <h1>我的持仓</h1>
    <div v-for="(item, index) in showList" :key="index" :style="{ padding: '20px' }">
      <a-card :title="'组合-' + item['sumItem'][0]['id']" bordered :style="{ margin: '50 px'}">
          <a-table :dataSource="item['showItem']" :columns="columns" :pagination="false" rowKey="id"/>
          <br>
          <a-table :showHeader="false" :columns="columns0" :dataSource="item['sumItem']" :pagination="false" rowKey="id" bordered/>
          <br>
          <a-button style="display:block;margin:0 auto" type="primary" @click="onSell(item)">卖出</a-button>
      </a-card>
    </div>
  </a-layout-content>
</template>

<script>
const columns = [
  { title: '类型', dataIndex: 'type', key: 'type', fixed: '' },
  { title: '名称', dataIndex: 'name', key: 'name', fixed: '' },
  { title: '代码', dataIndex: 'code', key: '1' },
  { title: '成交价', dataIndex: 'price', key: '2' },
  { title: '交易量', dataIndex: 'quantity', key: '3' },
  { title: '当前价格', dataIndex: 'priceNow', key: '4' },
];

const columns0 = [
  {title: '交易时间', dataIndex: 'time', key: 'time'},
  {title: '初始金额', dataIndex: 'Fprice', key: 'Fprice'},
  {title: '当前金额', dataIndex: 'Nprice', key: 'Nprice' },
  {title: '累计收益', dataIndex: 'income', key: 'income'},
];

// 下面列出两条假数据作为参考，后端获取的数据传到前端，请参考以下格式
let showList = [];
// let showItem = [];

// let Fprice = 0;
// let Nprice = 0;
// let time = "2019/9/12 10:16";
// for (let i = 0; i < 5; i++) {
//   let type = (i%3 === 0)? '股票':'基金';
//   let price = 20 + 11*i;
//   let quantity = 500 * (5-i);
//   let amount = quantity * price;
//   let priceNow = price + (i-2);
//   showItem.push({
//     type: type,
//     name: `${type} ${i}`,
//     code: 10086 + i * 832 - 5,
//     price: price,
//     quantity: quantity,
//     priceNow: priceNow,
//     id : `${i}`
//   });
//   Fprice += amount;
//   Nprice += quantity * priceNow;
// }

// showList.push({
//   showItem: showItem,
//   sumItem : [{
//             time: `交易时间： ${time}` ,
//             Fprice : `初始金额： ${Fprice}`,
//             Nprice : `当前金额： ${Nprice}`,
//             income : `累计收益： ${Nprice - Fprice}`,
//             id: 0,
//           }],
//   id: 0,
// });
// Fprice = 0;
// Nprice = 0;
// showItem = [];

// time = "2019/9/10 9:16";
// for (let i = 0; i < 5; i++) {
//   let type = (i%3-1 === 0)? '股票':'基金';
//   let price = 13 + 7*i;
//   let quantity = 400 * (5-i);
//   let amount = quantity * price;
//   let priceNow = price + (i-1);
//   showItem.push({
//     type: type,
//     name: `${type} ${i}`,
//     code: 27148 + i * 221 - 4,
//     price: price,
//     quantity: quantity,
//     priceNow: priceNow,
//     id : `${i}`
//   });
//   Fprice += amount;
//   Nprice += quantity * priceNow;
// }

// showList.push({
//   showItem: showItem,
//   sumItem : [{
//             time: `交易时间： ${time}` ,
//             Fprice : `初始金额： ${Fprice}`,
//             Nprice : `当前金额： ${Nprice}`,
//             income : `累计收益： ${Nprice - Fprice}`,
//             id: 1,
//             }],
//   id: 1,
// });

export default {
  data() {
    return {
      showList,
      columns,
      columns0,
    }
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {
      this.$axios.get('/api/pub/getPortfolio', {params: { 
       id: "16",
      }
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        this.showList = [];
        for(let i=0;i<data.length;i++){
          const item = data[i]['items'];
          let showItem = [];
          for(let j=0;j<item.length;j++){
            let getItem = item[j];
            showItem.push({
              type: getItem['type'],
              name: getItem['name'],
              code: getItem['code'],
              price: getItem['buy_price'],
              quantity: getItem['amount'],
              priceNow: getItem['now_price'],
              id: j,
            });
          }
          let Fprice = parseFloat(data[i]['buy_price']).toFixed(2);
          let Nprice = parseFloat(data[i]['now_amount_price']).toFixed(2);;
          let income = parseFloat(data[i]['earnings']).toFixed(2);;
          let time = data[i]['time'];
          this.showList.push({
            showItem: showItem,
            sumItem: [{
            time: `交易时间： ${time}` ,
            Fprice : `初始金额： ${Fprice}`,
            Nprice : `当前金额： ${Nprice}`,
            income : `累计收益： ${income}`,
            id: data[i]['name'],
            }],
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    },
    //这里是按下卖出之后要执行的操作。
    onSell(item) {
      console.log(item['sumItem'][0]['id']);
      let id = item['sumItem'][0]['id'];
      this.$axios.post('/api/pub/sell', {
        "id": id, 
      })
      .then((res) => {
        console.log(res);
        // this.$router.go(0);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
}
</script>