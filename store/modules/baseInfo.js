import $http from "@/server/request.js"

function getDate(type) {
	var date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 20;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}
export default {
	state: {
		isRepeatLicense: false,
		deploy: {
			mechanicsTypeArray: [{
					mechanicsTypeName: '请选择',
					mechanicsTypeID: 0
				}, {
					mechanicsTypeName: "货车",
					mechanicsTypeID: 18
				},
				{
					mechanicsTypeName: "客车",
					mechanicsTypeID: 19
				},
				{
					mechanicsTypeName: "中型专项作业车",
					mechanicsTypeID: 20
				},
				{
					mechanicsTypeName: "起重机",
					mechanicsTypeID: 1
				},
				{
					mechanicsTypeName: "旋挖钻机",
					mechanicsTypeID: 2
				},
				{
					mechanicsTypeName: "强夯机",
					mechanicsTypeID: 3
				},
				{
					mechanicsTypeName: "打桩机",
					mechanicsTypeID: 4
				},
				{
					mechanicsTypeName: "挖掘机",
					mechanicsTypeID: 5
				},
				{
					mechanicsTypeName: "推土机",
					mechanicsTypeID: 6
				},
				{
					mechanicsTypeName: "装载机",
					mechanicsTypeID: 7
				},
				{
					mechanicsTypeName: "叉车",
					mechanicsTypeID: 8
				},
				{
					mechanicsTypeName: "压路机",
					mechanicsTypeID: 9
				},
				{
					mechanicsTypeName: "摊铺机",
					mechanicsTypeID: 10
				},
				{
					mechanicsTypeName: "平地机",
					mechanicsTypeID: 11
				},
				{
					mechanicsTypeName: "联合收割机",
					mechanicsTypeID: 12
				},
				{
					mechanicsTypeName: "农用运输机",
					mechanicsTypeID: 13
				},
				{
					mechanicsTypeName: "排灌机械",
					mechanicsTypeID: 14
				},
				{
					mechanicsTypeName: "手持小型通用机械",
					mechanicsTypeID: 15
				},
				{
					mechanicsTypeName: "非手持小型通用机械",
					mechanicsTypeID: 16
				},
				{
					mechanicsTypeName: "其他机械",
					mechanicsTypeID: 17
				}
			],
			mechanicsTypeIndex: 0,
			shiyongdidianArray: [{
				shiYongDiDianName: '请选择',
				shiyongDidianId: 0
			}, {
				shiYongDiDianName: '施工工地',
				shiyongDidianId: 1
			}, {
				shiYongDiDianName: '港口',
				shiyongDidianId: 2
			}, {
				shiYongDiDianName: '物流园区',
				shiyongDidianId: 3
			}, {
				shiYongDiDianName: '机场',
				shiyongDidianId: 4
			}, {
				shiYongDiDianName: '铁路货运',
				shiyongDidianId: 5
			}, {
				shiYongDiDianName: '大型矿工企业',
				shiyongDidianId: 6
			}, {
				shiYongDiDianName: '其他',
				shiyongDidianId: 7
			}],
			shiyongdidianIndex: 0,
			shiyongNengyuanArray: [{
					shiYongNengYuanName: '请选择',
					shiYongNengYuanID: 0
				}, {
					shiYongNengYuanID: 1,
					shiYongNengYuanName: "汽油"
				},
				{
					shiYongNengYuanID: 2,
					shiYongNengYuanName: "柴油"
				},
				{
					shiYongNengYuanID: 3,
					shiYongNengYuanName: "电动"
				},
				{
					shiYongNengYuanID: 4,
					shiYongNengYuanName: "CNG"
				},
				{
					shiYongNengYuanID: 5,
					shiYongNengYuanName: "天然气"
				}
			],
			shiyongNengyuanIndex: 0,
			aearFenjuArray: [{
					fenJuName: '请选择',
					fenJuID: 0
				},{
			"fenJuCode": "A",
			"fenJuID": 1,
			"fenJuName": "襄都区分局"
		},
		{
			"fenJuCode": "B",
			"fenJuID": 2,
			"fenJuName": "信都区分局"
		},
		{
			"fenJuCode": "X",
			"fenJuID": 3,
			"fenJuName": "邢东新区分局"
		},
		{
			"fenJuCode": "H",
			"fenJuID": 4,
			"fenJuName": "临城县分局"
		},
		{
			"fenJuCode": "G",
			"fenJuID": 5,
			"fenJuName": "内丘县分局"
		},
		{
			"fenJuCode": "J",
			"fenJuID": 6,
			"fenJuName": "柏乡县分局"
		},
		{
			"fenJuCode": "K",
			"fenJuID": 7,
			"fenJuName": "隆尧县分局"
		},
		{
			"fenJuCode": "F",
			"fenJuID": 8,
			"fenJuName": "任泽区分局"
		},
		{
			"fenJuCode": "E",
			"fenJuID": 9,
			"fenJuName": "南和区分局"
		},
		{
			"fenJuCode": "V",
			"fenJuID": 10,
			"fenJuName": "宁晋县分局"
		},
		{
			"fenJuCode": "L",
			"fenJuID": 11,
			"fenJuName": "巨鹿县分局"
		},
		{
			"fenJuCode": "U",
			"fenJuID": 12,
			"fenJuName": "新河县分局"
		},
		{
			"fenJuCode": "N",
			"fenJuID": 13,
			"fenJuName": "广宗县分局"
		},
		{
			"fenJuCode": "M",
			"fenJuID": 14,
			"fenJuName": "平乡县分局"
		},
		{
			"fenJuCode": "P",
			"fenJuID": 15,
			"fenJuName": "威县分局"
		},
		{
			"fenJuCode": "R",
			"fenJuID": 16,
			"fenJuName": "清河县分局"
		},
		{
			"fenJuCode": "Q",
			"fenJuID": 17,
			"fenJuName": "临西县分局"
		},
		{
			"fenJuCode": "S",
			"fenJuID": 18,
			"fenJuName": "南宫市分局"
		},
		{
			"fenJuCode": "D",
			"fenJuID": 19,
			"fenJuName": "沙河市分局"
		},
		{
			"fenJuCode": "W",
			"fenJuID": 20,
			"fenJuName": "河北邢台经济开发区分局"
		}
			],
			aearFenjuIndex: 0,
			yunxingSwitch: false,
			isinstallObdSwitch: false,
			isinstallWuranSwitch: false,
			startDate: getDate('start'),
			endDate: getDate('end')
		},
		baseInfo: {
			/* 基本信息 */
			chezhuName: '', // 车主姓名
			chezhuPhone: '', //- 车主电话
			carbrand: '', //- 车辆品牌
			cartype: '', //- 车辆类型
			jianceCompany: '', // - 检测单位
			drivinglicenseCode: '', // - 驾驶证号码
			travellicensCode: '', // - 行驶证号码
			shebeiSuoyouZhudi: '', // - 设备所有者住地
			/* 机械信息 */
			jixieProductcode: '', //机械产品识别码
			huanbaoInfogongkaicode: '', //机械环保信息公开号
			fadongjiChuchanghao: '', // - 发动机出厂号
			fadongjiHezhunhao: '', // - 发动机核准号
			fadongjiXinghao: '', //- 发动机型号
			fadongjiZhizaoQiye: '', //- 发动机制造企业
			jiXieHuanBaoCode: '', //- 机械环保编号
			jixieChuchanghao: '', //- 机械出厂号
			jixieZhizaoChangjia: '', // - 机械制造厂家
			jixieZhizaoChandi: '', // - 机械制造产地
			mechanicsTypeId: 0, // - 机械类型ID
			chuchangTime: getDate({
				format: true
			}), //- 出场时间
			fadongjiChuchangDate: getDate({
				format: true
			}), // - 发动机出厂日期
			yearAvgWorktime: 0, // - 年平均工作时间
			cumulativeWorktime: 0, // - 累计工作时间
			shiyongdidianId: 0, // - 排放标准ID
			shiyongNengyuanId: 0, // - 使用能源ID
			eDingGongLv: 0, // - 额定功率
			aearFenjuId: 0, // - 管理分局ID
			yunxingState: '0', //-运行状态
			isinstallObd: '0', // - 是否安装OBD
			isinstallWuran: '0', // - 是否安装污染装置
			//dpf信息
			dpfXingHao: '',
			dpfManufacturer: '',
			dpfAnZhuangDate: '',
			dpfYanduBefore: '',
			dpfYanduLast: '',
			dpfZsType: '',
		},
		list: [{
				text: '基本信息',
				info: [{
					type: 'baseInfo',
					List: '',
					id: '',
					imgurl: '',
					title: '营业执照（身份证）',
					example: '/static/example/license.jpg'
				}]
			},
			{
				text: '机械信息',
				info: [{
						type: 'hbxxbq',
						List: '',
						id: '',
						imgurl: '',
						title: '环保信息标签',
						example: '/static/example/hbxxbq.jpg'
					},
					{
						type: 'fdjmp',
						List: '',
						id: '',
						imgurl: '',
						title: '发动机铭牌',
						example: '/static/example/fdjmp.jpg'
					},
					{
						type: 'fdjxshzh',
						List: '',
						id: '',
						imgurl: '',
						title: '发动机型式核资号',
						example: '/static/example/fdjxshzh.jpg'
					},
					{
						type: 'hgz',
						List: '',
						id: '',
						imgurl: '',
						title: '合格证',
						example: '/static/example/hgz.jpg'
					},
					{
						type: 'jxmp',
						List: '',
						id: '',
						imgurl: '',
						title: '机械铭牌',
						example: '/static/example/jxmp.jpg'
					},
					{
						type: 'jxqd',
						List: '',
						id: '',
						imgurl: '',
						title: '机械前端',
						example: '/static/example/jxqd.jpg'
					},
					{
						type: 'jxqy',
						List: '',
						id: '',
						imgurl: '',
						title: '机械前右侧45度',
						example: '/static/example/ycsishiwu.jpg'
					},
					{
						type: 'jxym',
						List: '',
						id: '',
						imgurl: '',
						title: '机械右侧',
						example: '/static/example/jxym.jpg'
					},
					{
						type: 'jxhm',
						List: '',
						id: '',
						imgurl: '',
						title: '机械后端',
						example: '/static/example/jxhm.jpg'
					},
					{
						type: 'jcbg1',
						List: '',
						id: '',
						imgurl: '',
						title: '检测报告（首页）',
						example: '/static/images/jcbg1.png'
					},
					{
						type: 'jcbg2',
						List: '',
						id: '',
						imgurl: '',
						title: '检测报告（机械信息页）',
						example: '/static/images/jcbg2.png'
					},
					{
						type: 'jcbg3',
						List: '',
						id: '',
						imgurl: '',
						title: '检测报告（检测结果页）',
						example: '/static/images/jcbg3.png'
					},
					{
						type: 'jcbg4',
						List: '',
						id: '',
						imgurl: '',
						title: '检测报告（现场照片页）',
						example: '/static/images/jcbg4.png'
					},
					{
						type: 'dpf1',
						List: '',
						id: '',
						imgurl: '',
						title: 'DPF外观照片',
						example: '/static/images/dpf1.png'
					},
					{
						type: 'dpf2',
						List: '',
						id: '',
						imgurl: '',
						title: 'DPF铭牌照片',
						example: '/static/images/dpf2.png'
					}
				]
			}
		]
	},

	mutations: {
		//切换picker
		PickerChange: (state, item) => {


		},
	},
	actions: {
		//机械类型列表
		getJXLX: ({
			state,
			commit
		}) => {
			$http
				.post('/controller/MechanicsType/selectMechanicsTypeList.do')
				.then(data => {
					state.deploy.mechanicsTypeArray = [];
					state.deploy.mechanicsTypeArray.push({
						mechanicsTypeName: '请选择',
						mechanicsTypeID: 0
					})
					state.deploy.mechanicsTypeArray = state.deploy.mechanicsTypeArray.concat(data.data);
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		//使用地点列表
		getPFBX: ({
			state,
			commit
		}) => {
			$http
				.post('/controller/ShiYongDiDian/selectShiYongDiDianList.do')
				.then(data => {
					state.deploy.shiyongdidianArray = [];
					state.deploy.shiyongdidianArray.push({
						shiYongDiDianName: '请选择',
						shiyongDidianId: 0
					})
					state.deploy.shiyongdidianArray = state.deploy.shiyongdidianArray.concat(data.data);
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		//使用能源列表
			getSYNY: ({
				state,
				commit
			}) => {
				$http
					.post('/controller/ShiYongNengYuan/selectShiYongNengYuanList.do')
					.then(data => {
						state.deploy.shiyongNengyuanArray = [];
						state.deploy.shiyongNengyuanArray.push({
							shiYongNengYuanName: '请选择',
							shiYongNengYuanID: 0
						})
						state.deploy.shiyongNengyuanArray = state.deploy.shiyongNengyuanArray.concat(data.data);
					})
					.catch(msg => {
						uni.showToast({
							icon: 'none',
							title: msg
						});
					});
			},
		//管理分局
			getGLFJ: ({
				state,
				commit
			}) => {
				$http
					.post('/controller/AearFenJu/selectFenJuList.do')
					.then(data => {
						state.deploy.aearFenjuArray = [];
						state.deploy.aearFenjuArray.push({
							fenJuName: '请选择',
							fenJuID: 0
						})
						state.deploy.aearFenjuArray = state.deploy.aearFenjuArray.concat(data.data);
					})
					.catch(msg => {
						uni.showToast({
							icon: 'none',
							title: msg
						});
					});
			}
		}


	}
