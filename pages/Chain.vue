<template>
  <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
    <div id="jsmind_container" class="jsmind_container" style="height: 85em"></div>
  </a-layout-content>
</template>

<script>
const jsMind = require("jsmind");
export default {
  name: "App",
  data: function() {
    return {
      active: true
    };
  },
  mounted: function() {
    this.load_jsmind();
  },
  methods: {
    load_jsmind: function() {
      var mind = {
        meta: {
          name: "e-Chain 产业链",
          author: "nyako",
          version: "0.1"
        },
        format: "node_tree",
        data: {
          id: "半导体产品",
          topic: "半导体产品",
          children: [
            {
              id: "半导体设备",
              topic: "半导体设备",
              direction: "left",
              children: [
                { id: "钢铁", topic: "钢铁" },
                { id: "铝", topic: "铝" },
                { id: "可编程逻辑控制器", topic: "可编程逻辑控制器" }
              ]
            },
            {
              id: "半导体生产原料",
              topic: "半导体生产原料",
              direction: "left",
              children: [
                { id: "冶金矿采", topic: "冶金矿采" },
                { id: "石英坩锅", topic: "石英坩锅" },
                { id: "晶炉", topic: "晶炉" },
                { id: "无机硅", topic: "无机硅" },
                { id: "半导体材料生产设备", topic: "半导体材料生产设备" }
              ]
            },
            {
              id: "通信设备",
              topic: "通信设备",
              direction: "right",
              children: [
                { id: "信息技术服务", topic: "信息技术服务" },
                { id: "无线电信业务", topic: "无线电信业务" },
                { id: "互联网软件与服务", topic: "互联网软件与服务" },
                { id: "通信网络规划设计", topic: "通信网络规划设计" },
                { id: "综合电信业务", topic: "综合电信业务" },
                { id: "网络通信工程", topic: "网络通信工程" },
                { id: "技术服务", topic: "技术服务" },
                { id: "销售渠道", topic: "销售渠道" }
              ]
            },
            {
              id: "PC",
              topic: "PC",
              direction: "right",
              children: [
                { id: "信息技术服务2", topic: "信息技术服务" },
                { id: "应用软件", topic: "应用软件" },
                { id: "互联网软件与服务2", topic: "互联网软件与服务" },
                { id: "销售渠道2", topic: "销售渠道" },
                { id: "技术服务2", topic: "技术服务" }
              ]
            },
            {
              id: "消费电子",
              topic: "消费电子",
              direction: "right",
              children: [
                { id: "应用系统集成服务", topic: "应用系统集成服务" },
                { id: "销售渠道3", topic: "销售渠道" },
                { id: "技术服务3", topic: "技术服务" }
              ]
            },
            {
              id: "半导体产品安装劳务",
              topic: "半导体产品安装劳务",
              direction: "right"
            },
            {
              id: "电子设备与元器件经销",
              topic: "电子设备与元器件经销",
              direction: "right"
            }
          ]
        }
      };
      var options = {
        container: "jsmind_container",
        editable: false,
        theme: "primary"
      };

      var urls = {
        半导体设备: "/companyInfo/1",
        半导体生产原料: "/companyInfo/1",
        通信设备: "/companyInfo/1",
        PC: "/companyInfo/1",
        消费电子: "/companyInfo/1",
        半导体产品安装劳务: "/companyInfo/1",
        电子设备与元器件经销: "/companyInfo/1"
      };

      var jm = jsMind.show(options, mind);
      var jmnodes = [...document.getElementsByTagName("jmnode")];
      for (var i = 0; i < jmnodes.length; i++) {
        var jmnode = jmnodes[i];
        var jmnode_id = jmnode.getAttribute("nodeid");
        if (jmnode_id in urls) {
          jmnode.setAttribute(
            "onclick",
            "window.location.href='" + urls[jmnode_id] + "'"
          );
          //jmnode.outerHTML = "<a href=" + urls[jmnode_id] + ">" + jmnode.outerHTML + "</a>";
        }
      }
    }
  }
};
</script>

<style>
.jsmind_container::-webkit-scrollbar {
  width: 0 !important;
}
/*
 * Released under BSD License
 * Copyright (c) 2014-2015 hizzgdev@163.com
 * 
 * Project Home:
 *   https://github.com/hizzgdev/jsmind/
 */

/* important section */
.jsmind-inner {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
} /*box-shadow:0 0 2px #000;*/
.jsmind-inner {
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* z-index:1 */
svg {
  position: absolute;
  z-index: 1;
}
canvas {
  position: absolute;
  z-index: 1;
}

/* z-index:2 */
jmnodes {
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0);
} /*background color is necessary*/
jmnode {
  position: absolute;
  cursor: default;
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
jmexpander {
  position: absolute;
  width: 11px;
  height: 11px;
  display: block;
  overflow: hidden;
  line-height: 12px;
  font-size: 12px;
  text-align: center;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
}

/* default theme */
jmnode {
  padding: 10px;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #666;
  font: 16px/1.125 Verdana, Arial, Helvetica, sans-serif;
}
jmnode:hover {
  box-shadow: 2px 2px 8px #000;
  background-color: #ebebeb;
  color: #333;
}
jmnode.selected {
  background-color: #11f;
  color: #fff;
  box-shadow: 2px 2px 8px #000;
}
jmnode.root {
  font-size: 24px;
}
jmexpander {
  border-color: gray;
}
jmexpander:hover {
  border-color: #000;
}

@media screen and (max-device-width: 1024px) {
  jmnode {
    padding: 5px;
    border-radius: 3px;
    font-size: 14px;
  }
  jmnode.root {
    font-size: 21px;
  }
}
/* primary theme */
jmnodes.theme-primary jmnode {
  background-color: #428bca;
  color: #fff;
  border-color: #357ebd;
}
jmnodes.theme-primary jmnode:hover {
  background-color: #3276b1;
  border-color: #285e8e;
}
jmnodes.theme-primary jmnode.selected {
  background-color: #f1c40f;
  color: #fff;
}
jmnodes.theme-primary jmnode.root {
}
jmnodes.theme-primary jmexpander {
}
jmnodes.theme-primary jmexpander:hover {
}
</style>