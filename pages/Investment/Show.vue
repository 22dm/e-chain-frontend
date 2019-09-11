<template>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <router-view />
    <h1>我的持仓</h1>
    <div v-for="i in 2" :key="i" :style="{ padding: '20px' }">
      <a-card :title="'组合' + i" bordered="true" :style="{ margin: '50 px'}">
          <a-table :dataSource="data" :columns="columns" :pagination="false"/>
          <br>
          <a-table :showHeader="false" :columns="columns0" :dataSource="data0" :pagination="false" bordered/>
          <br>
          <a-button style="display:block;margin:0 auto" type="primary">卖出</a-button>
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
  { title: '类型', dataIndex: 'type', key: 'type', fixed: '' },
  { title: '名称', dataIndex: 'name', key: 'name', fixed: '' },
  { title: '代码', dataIndex: 'code', key: '1' },
  { title: '成交价', dataIndex: 'price', key: '2' },
  { title: '交易量', dataIndex: 'quantity', key: '3' },
  { title: '当前价格', dataIndex: 'priceNow', key: '4' },
];

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    type: i,
    name: `stock ${i}`,
    code: 10086 + i * 832 - 5,
    price: 50 + i,
    quantity: 500 * i,
    priceNow: 50 + 2 * i,
  });
}

const columns0 = [
  {title: '交易时间', dataIndex: 'time', key: 'time', fixed: '' },
  {title: '初始金额', dataIndex: 'Fprice', key: 'Fprice', fixed: '' },
  {title: '当前金额', dataIndex: 'Nprice', key: 'Nprice', fixed: '' },
  {title: '累计收益', dataIndex: 'amount', key: 'amount', fixed: '' },
];

const data0 = [{
  time: "交易时间：",
  Fprice: "初始金额：",
  Nprice: "当前金额：",
  amount: "累计收益：",
}];

export default {
  data() {
    return {
      data,
      columns,
      data0,
      columns0,
    }
  }
}
</script>