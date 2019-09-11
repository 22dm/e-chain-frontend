<template>
  <a-layout-content style="padding: 0 50px">
    <a-layout style="margin: 24px 16px; padding: 24px; background: #fff">
      <div>
        {{currentStockInfo.stockName}}
        {{currentStockInfo.stockCode}}
        <div style="float:right;">
            <a-select style="width: 120px" v-bind:defaultValue="0">
          <a-select-option
            v-for="(item,index) in stockList"
            v-bind:key="index"
            v-bind:value="index"
          >{{item.stockName}}</a-select-option>
        </a-select>
        <a-button type="primary" style="width: 100px">回到产业链</a-button>
        </div>
      </div>
      <a-divider />
      <a-card title="行情数据" style="margin:5px;">此处为图片</a-card>

      <a-table
        :columns="mainBusinessColumns"
        :dataSource="currentStockInfo.mainBusiness"
        bordered
        :pagination="false"
        style="margin:5px;"
      >
        <template slot="title" slot-scope="currentPageData">主营业务</template>
      </a-table>
      <a-card title="基本指标" style="margin:5px;">
        <table border="1">
          <tr>
            <td>总市值（万元）</td>
            <td>{{currentStockInfo.basicIndex.totalMarketValue}}</td>
            <td>市盈率（%）</td>
            <td>{{currentStockInfo.basicIndex.per}}</td>
          </tr>
          <tr>
            <td>流通市值（万元）</td>
            <td>{{currentStockInfo.basicIndex.circulatedMarketValue}}</td>
            <td>市净率（%）</td>
            <td>{{currentStockInfo.basicIndex.pbr}}</td>
          </tr>
          <tr>
            <td>总股本（万手）</td>
            <td>{{currentStockInfo.basicIndex.totalCapitalStock}}</td>
            <td>市销率（%）</td>
            <td>{{currentStockInfo.basicIndex.psr}}</td>
          </tr>
          <tr>
            <td>流通股本（万手）</td>
            <td>{{currentStockInfo.basicIndex.circulatedCapitalStock}}</td>
            <td>总资金周转率（%）</td>
            <td>{{currentStockInfo.basicIndex.totalCapitalTurnoverRate}}</td>
          </tr>
          <tr>
            <td>换手率（%）</td>
            <td>{{currentStockInfo.basicIndex.turnoverRate}}</td>
            <td>年化净资产收益率（%）</td>
            <td>{{currentStockInfo.basicIndex.annualizedReturnOnNetAssets}}</td>
          </tr>
        </table>
      </a-card>

      <a-card title="业绩预告" style="margin:5px;">
        <table border="1">
          <tr>
            <td>业绩预告类型</td>
            <td>{{currentStockInfo.performanceForecast.type}}</td>
          </tr>
          <tr>
            <td>预告净利润变动幅度下限（%）</td>
            <td>{{currentStockInfo.performanceForecast.lowerMarginOfNetProfitChange}}</td>
          </tr>
          <tr>
            <td>预告净利润变动幅度上限（%）</td>
            <td>{{currentStockInfo.performanceForecast.upperMarginOfNetProfitChange}}</td>
          </tr>
          <tr>
            <td>预告净利润下限（万元）</td>
            <td>{{currentStockInfo.performanceForecast.netProfitFloor}}</td>
          </tr>
          <tr>
            <td>预告净利润上限（万元）</td>
            <td>{{currentStockInfo.performanceForecast.netProfitCap}}</td>
          </tr>
        </table>
      </a-card>
    </a-layout>
  </a-layout-content>
</template>

<script>
export default {
  data() {
    return {
      stockList: [
        {
          stockName: "股票A",
          stockCode: "001"
        },
        {
          stockName: "好股票",
          stockCode: "002"
        }
      ],
      currentStockInfo: {
        stockName: "股票A",
        stockCode: "001",
        marketData: {},
        mainBusiness: [
          {
            businessName: "手机",
            income: 100
          }
        ],
        basicIndex: {
          totalMarketValue: 0,
          circulatedMarketValue: 0,
          totalCapitalStock: 0,
          circulatedCapitalStock: 0,
          turnoverRate: 0,
          per: 0,
          pbr: 0,
          psr: 0,
          totalCapitalTurnoverRate: 0,
          annualizedReturnOnNetAssets: 0
        },
        performanceForecast: {
          type: "",
          lowerMarginOfNetProfitChange: 0,
          upperMarginOfNetProfitChange: 0,
          netProfitCap: 0,
          netProfitFloor: 0
        }
      },
      mainBusinessColumns: [
        {
          title: "业务",
          dataIndex: "businessName"
        },
        {
          title: "收入",
          dataIndex: "income"
        }
      ]
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {}
  }
};
</script>
<style scoped>
</style>