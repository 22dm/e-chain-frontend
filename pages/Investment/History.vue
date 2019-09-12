<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <h1>交易历史</h1>
    <router-view />
    <div v-for="(item, index) in historyList" :key="index" :style="{ padding: '20px' }">
      <a-card :title="'组合 ' + index" bordered :style="{ margin: '50 px'}">
          <a-table :dataSource="item" :columns="columns" :pagination="false" rowKey="id"/>
          <br>
          <a-button style="display:block;margin:0 auto" type="primary">分享</a-button>
      </a-card>
    </div>
  </a-layout-content>
</template>

<script>
const columns = [
  { title: '类型', dataIndex: 'type', key: 'type'},
  { title: '名称', dataIndex: 'name', key: 'name'},
  { title: '代码', dataIndex: 'code', key: 'code' },
  { title: '价格', dataIndex: 'price', key: 'price' },
  { title: '交易量', dataIndex: 'quantity', key: 'quantity' },
  { title: '交易额', dataIndex: 'amount', key: 'amount' },
];

// 下面列出两条假数据作为参考，后端获取的数据传到前端，请参考以下格式
const historyList = [];
const historyItem0 = [];
for (let i = 0; i < 5; i++) {
  let type = (i%3 === 0)? '股票':'基金';
  let price = 20 + 11*i;
  let quantity = 500 * (5-i);
  let amount = quantity * price;
  historyItem0.push({
    type: type,
    name: `${type} ${i}`,
    code: 10086 + i * 832 - 5,
    price: price,
    quantity: quantity,
    amount: amount,
    id : `${i}`
  });
}
historyList.push(historyItem0);
const historyItem1 = [];
for (let i = 0; i < 5; i++) {
  let type = (i%3-1 === 0)? '股票':'基金';
  let price = 13 + 7*i;
  let quantity = 400 * (5-i);
  let amount = quantity * price;
  historyItem1.push({
    type: type,
    name: `${type} ${i}`,
    code: 27148 + i * 221 - 4,
    price: price,
    quantity: quantity,
    amount: amount,
    id : `${i}`
  });
}


historyList.push(historyItem1);
export default {
  data() {
    return {
      historyList,
      columns,
    }
  }
}
</script>