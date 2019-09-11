<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <h1>交易历史</h1>
    <router-view />
    <div v-for="i in 2" :key="i" :style="{ padding: '20px' }">
      <a-card :title="'组合' + i" bordered="true" :style="{ margin: '50 px'}">
          <a-table :dataSource="data" :columns="columns" :pagination="false"/>
          <br>
          <a-button style="display:block;margin:0 auto" type="primary">分享</a-button>
      </a-card>
    </div>
  </a-layout-content>
</template>

<style>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>

<script>
const columns = [
  { title: '类型', dataIndex: 'type', key: 'type'},
  { title: '名称', dataIndex: 'name', key: 'name'},
  { title: '代码', dataIndex: 'code', key: 'code' },
  { title: '价格', dataIndex: 'price', key: 'price' },
  { title: '交易量', dataIndex: 'quantity', key: 'quantity' },
  { title: '交易额', dataIndex: 'amount', key: 'amount' },
];

const data = [];
for (let i = 0; i < 5; i++) {
  let price = 20 + 11*i;
  let quantity = 500 * (5-i);
  let amount = quantity * price;
  data.push({
    type: i,
    name: `stock ${i}`,
    code: 10086 + i * 832 - 5,
    price: price,
    quantity: quantity,
    amount: amount,
  });
}

export default {
  data() {
    return {
      data,
      columns,
    }
  }
}
</script>