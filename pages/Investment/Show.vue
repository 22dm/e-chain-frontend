<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <router-view />
    <h1>我的持仓</h1>
    <div v-for="(item, index) in showList" :key="index" :style="{ padding: '20px' }">
      <a-card :title="'组合 ' + index" bordered :style="{ margin: '50 px'}">
          <a-table :dataSource="item" :columns="columns" :pagination="false"/>
          <br>
          <a-table :showHeader="false" :columns="columns0" :dataSource="data0" :pagination="false" bordered/>
          <br>
          <a-button style="display:block;margin:0 auto" type="primary">卖出</a-button>
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


// 下面列出两条假数据作为参考，后端获取的数据传到前端，请参考以下格式
const showList = [];
const showItem0 = [];
for (let i = 0; i < 5; i++) {
  let type = (i%3 === 0)? '股票':'基金';
  let price = 20 + 11*i;
  let quantity = 500 * (5-i);
  let amount = quantity * price;
  let priceNow = price + (i-2);
  showItem0.push({
    type: type,
    name: `${type} ${i}`,
    code: 10086 + i * 832 - 5,
    price: price,
    quantity: quantity,
    priceNow: priceNow,
    id : `${i}`
  });
}
showList.push(showItem0);
const showItem1 = [];
for (let i = 0; i < 5; i++) {
  let type = (i%3-1 === 0)? '股票':'基金';
  let price = 13 + 7*i;
  let quantity = 400 * (5-i);
  let amount = quantity * price;
  let priceNow = price + (i-1);
  showItem1.push({
    type: type,
    name: `${type} ${i}`,
    code: 27148 + i * 221 - 4,
    price: price,
    quantity: quantity,
    priceNow: priceNow,
    id : `${i}`
  });
}
showList.push(showItem1);

const columns0 = [
  {title: '交易时间', dataIndex: 'time', key: 'time'},
  {title: '初始金额', dataIndex: 'Fprice', key: 'Fprice'},
  {title: '当前金额', dataIndex: 'Nprice', key: 'Nprice' },
  {title: '累计收益', dataIndex: 'amount', key: 'amount'},
];

const data0 = [{
  time: "交易时间：",
  Fprice: "初始金额：",
  Nprice: "当前金额：",
  amount: "累计收益：",
  key: "null"
}];

export default {
  data() {
    return {
      showList,
      columns,
      data0,
      columns0,
    }
  }
}
</script>