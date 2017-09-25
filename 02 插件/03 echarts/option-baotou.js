function randomData() {
      return Math.round(Math.random() * 1000);
}

// option = {
//       title: {
//             text: 'iphone销量',
//             subtext: '纯属虚构',
//             left: 'center' //组件的位置
//       },
//       tooltip: {  //提示框
//             trigger: 'item'
//       },
//       legend: {
//             orient: 'vertical',//图例列表的布局朝向
//             left: 'left',
//             data:['iphone3','iphone4','iphone5'] //和 series name对应
//       },
//       geo:{
//             roam: true
//       },
//       visualMap: {
//             inRange: {
//                   color: [ 'rgba(3,4,5,0.4)', 'red'],
//                   symbolSize: [15,16]
//             },
//             min: 0,
//             max: 2500,
//             left: 'left',
//             top: 'bottom',
//             text: ['高','低'],           // 文本，默认为数值文本
//             calculable: true   //范围区域选择的两个小箭头
//       },
//       toolbox: { //右边工具配置项（保存图片）
//             show: true,
//             orient: 'vertical',
//             left: 'right',
//             top: 'center',
//             feature: {
//                   dataView: {readOnly: false},
//                   restore: {},
//                   saveAsImage: {}
//             }
//       },
//       series: [
//             {
//                   name: 'iphone3',//系列名称，用于tooltip的显示，legend 的图例筛选
//                   type: 'map',
//                   map: 'china',
//                   roam: false,//是否开启鼠标缩放和平移漫游
//                   label: {
//                         normal: {
//                               show: true//是否显示标签名
//                         },
//                         emphasis: {
//                               show: true
//                         }
//                   },
//                   data:[
//                         {name: '北京',value: randomData() },
//                         {name: '天津',value: randomData() },
//                         {name: '上海',value: randomData() },
//                         {name: '重庆',value: randomData() },
//                         {name: '河北',value: randomData() },
//                         {name: '河南',value: randomData() },
//                         {name: '云南',value: randomData() },
//                         {name: '辽宁',value: randomData() },
//                         {name: '黑龙江',value: randomData() },
//                         {name: '湖南',value: randomData() },
//                         {name: '安徽',value: randomData() },
//                         {name: '山东',value: randomData() },
//                         {name: '新疆',value: randomData() },
//                         {name: '江苏',value: randomData() },
//                         {name: '浙江',value: randomData() },
//                         {name: '江西',value: randomData() },
//                         {name: '湖北',value: randomData() },
//                         {name: '广西',value: randomData() },
//                         {name: '甘肃',value: randomData() },
//                         {name: '山西',value: randomData() },
//                         {name: '内蒙古',value: randomData() },
//                         {name: '陕西',value: randomData() },
//                         {name: '吉林',value: randomData() },
//                         {name: '福建',value: randomData() },
//                         {name: '贵州',value: randomData() },
//                         {name: '广东',value: randomData() },
//                         {name: '青海',value: randomData() },
//                         {name: '西藏',value: randomData() },
//                         {name: '四川',value: randomData() },
//                         {name: '宁夏',value: randomData() },
//                         {name: '海南',value: randomData() },
//                         {name: '台湾',value: randomData() },
//                         {name: '香港',value: randomData() },
//                         {name: '澳门',value: randomData() }
//                   ]
//             },
//             {
//                   name: 'iphone4',
//                   type: 'map',
//                   mapType: 'china',
//                   label: {
//                         normal: {
//                               show: true
//                         },
//                         emphasis: {
//                               show: true
//                         }
//                   },
//                   data:[
//                         {name: '北京',value: randomData() },
//                         {name: '天津',value: randomData() },
//                         {name: '上海',value: randomData() },
//                         {name: '重庆',value: randomData() },
//                         {name: '河北',value: randomData() },
//                         {name: '安徽',value: randomData() },
//                         {name: '新疆',value: randomData() },
//                         {name: '浙江',value: randomData() },
//                         {name: '江西',value: randomData() },
//                         {name: '山西',value: randomData() },
//                         {name: '内蒙古',value: randomData() },
//                         {name: '吉林',value: randomData() },
//                         {name: '福建',value: randomData() },
//                         {name: '广东',value: randomData() },
//                         {name: '西藏',value: randomData() },
//                         {name: '四川',value: randomData() },
//                         {name: '宁夏',value: randomData() },
//                         {name: '香港',value: randomData() },
//                         {name: '澳门',value: randomData() }
//                   ]
//             },
//             {
//                   name: 'iphone5',
//                   type: 'map',
//                   mapType: 'china',
//                   label: {
//                         normal: {
//                               show: true
//                         },
//                         emphasis: {
//                               show: true
//                         }
//                   },
//                   data:[
//                         {name: '北京',value: randomData() },
//                         {name: '天津',value: randomData() },
//                         {name: '上海',value: randomData() },
//                         {name: '广东',value: randomData() },
//                         {name: '台湾',value: randomData() },
//                         {name: '香港',value: randomData() },
//                         {name: '澳门',value: randomData() }
//                   ]
//             }
//       ]
// };


option = {
      series: [{
            type: 'map',
            map: 'baotou'
      }]
}