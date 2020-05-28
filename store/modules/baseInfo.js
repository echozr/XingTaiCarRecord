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
			}],
			mechanicsTypeIndex: 0,
			shiyongdidianArray: [{
				shiYongDiDianName: '请选择',
				shiyongDidianId: 0
			},{
				shiYongDiDianName: '施工工地',
				shiyongDidianId: 1
			},{
				shiYongDiDianName: '港口',
				shiyongDidianId: 2
			},{
				shiYongDiDianName: '物流园区',
				shiyongDidianId: 3
			},{
				shiYongDiDianName: '机场',
				shiyongDidianId: 4
			},{
				shiYongDiDianName: '铁路货运',
				shiyongDidianId: 5
			},{
				shiYongDiDianName: '大型矿工企业',
				shiyongDidianId: 6
			},{
				shiYongDiDianName: '其他',
				shiyongDidianId: 7
			}],
			shiyongdidianIndex: 0,
			shiyongNengyuanArray: [{
				shiYongNengYuanName: '请选择',
				shiYongNengYuanID: 0
			}],
			shiyongNengyuanIndex: 0,
			aearFenjuArray: [{
				fenJuName: '请选择',
				fenJuID: 0
			}],
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
			jixieProductcode:'', //机械产品识别码
			huanbaoInfogongkaicode:'',//机械环保信息公开号
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
			dpfZsType:'',
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
						title: '监测报告',
						example: '/static/images/nopic.png'
					},
					{
						type: 'jcbg2',
						List: '',
						id: '',
						imgurl: '',
						title: '监测报告',
						example: '/static/images/nopic.png'
					},
					{
						type: 'jcbg3',
						List: '',
						id: '',
						imgurl: '',
						title: '监测报告',
						example: '/static/images/nopic.png'
					},
					{
						type: 'jcbg4',
						List: '',
						id: '',
						imgurl: '',
						title: '监测报告',
						example: '/static/images/nopic.png'
					},
					{
						type: 'dpf1',
						List: '',
						id: '',
						imgurl: '',
						title: 'DPF',
						example: '/static/images/nopic.png'
					},
					{
						type: 'dpf2',
						List: '',
						id: '',
						imgurl: '',
						title: 'DPF',
						example: '/static/images/nopic.png'
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
		// getPFBX: ({
		// 	state,
		// 	commit
		// }) => {
		// 	$http
		// 		.post('/controller/ShiYongDiDian/selectShiYongDiDianList.do')
		// 		.then(data => {
		// 			state.deploy.shiyongdidianArray = [];
		// 			state.deploy.shiyongdidianArray.push({
		// 				shiYongDiDianName: '请选择',
		// 				shiyongDidianId: 0
		// 			})
		// 			state.deploy.shiyongdidianArray = state.deploy.shiyongdidianArray.concat(data.data);
		// 		})
		// 		.catch(msg => {
		// 			uni.showToast({
		// 				icon: 'none',
		// 				title: msg
		// 			});
		// 		});
		// },
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
