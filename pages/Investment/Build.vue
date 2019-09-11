<template>
  <div style="width: 100%; padding: 0em 3em 0em 5em">
    <div style="padding: 0em 0em 3em 0em;">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="账户余额" :bordered="false">
            <p>¥100000.00</p>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-card title="推荐资产比例" :bordered="false">
            <a-row :gutter="16">
              <a-col :span="12">
                <a-card title="股票" :bordered="false">
                  <p>10%</p>
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card title="基金" :bordered="false">
                  <p>30%</p>
                </a-card>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <h2>已选资产</h2>
    <a-table
      :columns="columns_buy"
      :dataSource="buy"
      :pagination="false"
      style="padding: 0em 0em 3em 0em"
    >
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">移除 {{record.name}}</a>
      </span>
    </a-table>
    股票比例 基金比例 总交易额
    <h2>A股推荐</h2>
    <a-table
      :columns="columns"
      :dataSource="stock"
      :pagination="false"
      style="padding: 0em 0em 3em 0em"
    >
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">加入 {{record.name}}</a>
      </span>
    </a-table>
    <h2>基金推荐</h2>
    <a-table
      :columns="columns"
      :dataSource="fund"
      :pagination="false"
      style="padding: 0em 0em 3em 0em"
    >
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">加入 {{record.name}}</a>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "代码",
    dataIndex: "code"
  },
  {
    title: "价格",
    dataIndex: "price"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];

const columns_buy = [
  {
    title: "类型",
    dataIndex: "type"
  },
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "代码",
    dataIndex: "code"
  },
  {
    title: "价格",
    dataIndex: "price"
  },
  {
    title: "交易量",
    dataIndex: "amount"
  },
  {
    title: "交易额",
    dataIndex: "amount_price"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];

const stock = [
  {
    name: "示例股票1",
    code: "000001.AA",
    price: "2.33"
  },
  {
    name: "示例股票2",
    code: "000002.AA",
    price: "2.33"
  },
  {
    name: "示例股票3",
    code: "000003.AA",
    price: "2.33"
  }
];

const fund = [
  {
    name: "示例基金1",
    code: "000001.BB",
    price: "2.33"
  },
  {
    name: "示例基金2",
    code: "000002.BB",
    price: "2.33"
  }
];

const buy = [
  {
    type: "股票",
    name: "示例股票1",
    code: "000001.AA",
    price: "2.33",
    amount: "100",
    amount_price: "233.00"
  },
  {
    type: "股票",
    name: "示例股票2",
    code: "000002.AA",
    price: "2.33",
    amount: "100",
    amount_price: "233.00"
  },
  {
    type: "基金",
    name: "示例基金1",
    code: "000001.BB",
    price: "2.33",
    amount: "100",
    amount_price: "233.00"
  },
  {
    type: "基金",
    name: "示例基金2",
    code: "000002.BB",
    price: "2.33",
    amount: "100",
    amount_price: "233.00"
  }
];

export default {
  data() {
    return {
      stock,
      fund,
      buy,
      columns_buy,
      columns
    };
  }
};
</script>