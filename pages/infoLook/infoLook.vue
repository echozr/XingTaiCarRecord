<template>
	<view>
		<view class="d-flex flex-row a-center p-2">
			<block v-for="(item, index) in tabList" :key="index">
				<view class="topbtn mr-auto" :class="chanegflag ? (index === current ? 'active' : 'active2') : index === current ? 'active' : ''" @tap="chanegStep(index)">
					{{ item }}
				</view>
			</block>
		</view>
		<view class="content">
			<view v-show="current === 0">
				<baseInfo
					ref="baseInfo"
					:editStatu="editStatu"
					:deploy="deployLook"
					:isdpf="isdpf"
					@bindPickerChange="bindPickerChange"
					@changeNumber="changeNumber"
					@switchChange="switchChange"
					@radioChange="radioChange"
				/>
				<view style="height: 80rpx;" v-show="!editStatu"></view>
				<view class="btmWarp" v-show="!editStatu"><view class="stepBtn ml-auto" hover-class="stepBtn-hover" @click="submitbaseInfo">保存</view></view>
			</view>
			<view v-show="current === 1">
				<baseUpload
					:uploadInfo="uploadInfoLook"
					:imgList="CarInfo.fuJianIdList"
					:editStatu="editStatu"
					:imageUploadUrl="imageUploadUrl"
					@successUpload="successUpload"
					@deleteUpload="deleteUpload"
				/>
				<view style="height: 80rpx;" v-show="!editStatu"></view>
				<view class="btmWarp" v-show="!editStatu">
					<view class="stepBtn backBtn ml-auto" hover-class="backBtn-hover" @click="backBaseInof">上一步</view>
					<view class="stepBtn" hover-class="stepBtn-hover" @click="completeReport">提交</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import baseInfo from '@/components/baseInfo/baseInfo.vue';
import baseUpload from '@/components/baseInfo/BaseUpload.vue';
import { getDate } from '@/common/util/util.js';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
	components: {
		baseInfo,
		baseUpload
	},
	data() {
		return {
			editStatu: true,
			isdpf:false,
			deployLook: {
				mechanicsTypeArray: [
					{
						mechanicsTypeName: '请选择',
						mechanicsTypeID: 0
					}
				],
				mechanicsTypeIndex: 0,
				shiyongdidianArray: [
					{
						emissionTandardName: '请选择',
						emissionTandardID: 0
					}
				],
				shiyongdidianIndex: 0,
				shiyongNengyuanArray: [
					{
						shiYongNengYuanName: '请选择',
						shiYongNengYuanID: 0
					}
				],
				shiyongNengyuanIndex: 0,
				aearFenjuArray: [
					{
						fenJuName: '请选择',
						fenJuID: 0
					}
				],
				aearFenjuIndex: 0
			},
			uploadInfoLook: [
				{
					text: '附件信息',
					info: [
						{
							type: 'baseInfo',
							List: '',
							id: '',
							imgurl: '',
							title: '营业执照',
							example: '/static/example/license.jpg'
						},
						{
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
							title: '发动机型式核准号',
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
			],
			CarInfo: {},
			uploadRelation: '',
			tabList: ['1.基本信息', '2.材料上传'],
			current: 0,
			chanegflag: true,
			imageUploadlook: `${this.$http.common.baseUrl}/admin/attach/downloadAttach.do?attachId=`,
			imageUploadUrl: `${this.$http.common.baseUrl}/VehicleInfo/uploadAttachment.do`,
			vehicleId: '',
			editText:"",
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
					}, {
						fenJuID: 1,
						fenJuCode: "A",
						fenJuName: "桥东区分局"
					},
			
					{
						fenJuID: 2,
						fenJuCode: "B",
						fenJuName: "桥西区分局"
					},
			
					{
						fenJuID: 3,
						fenJuCode: "C",
						fenJuName: "邢台县分局"
					},
			
					{
						fenJuID: 4,
						fenJuCode: "H",
						fenJuName: "临城县分局"
					},
			
					{
						fenJuID: 5,
						fenJuCode: "G",
						fenJuName: "内丘县分局"
					},
			
					{
						fenJuID: 6,
						fenJuCode: "J",
						fenJuName: "柏乡县分局"
					},
			
					{
						fenJuID: 7,
						fenJuCode: "K",
						fenJuName: "隆尧县分局"
					},
			
					{
						fenJuID: 8,
						fenJuCode: "F",
						fenJuName: "任县分局"
					},
			
					{
						fenJuID: 9,
						fenJuCode: "E",
						fenJuName: "南和县分局"
					},
			
					{
						fenJuID: 10,
						fenJuCode: "V",
						fenJuName: "宁晋县分局"
					},
			
					{
						fenJuID: 11,
						fenJuCode: "L",
						fenJuName: "巨鹿县分局"
					},
			
					{
						fenJuID: 12,
						fenJuCode: "U",
						fenJuName: "新河县分局"
					},
			
					{
						fenJuID: 13,
						fenJuCode: "N",
						fenJuName: "广宗县分局"
					},
			
					{
						fenJuID: 14,
						fenJuCode: "M",
						fenJuName: "平乡县分局"
					},
			
					{
						fenJuID: 15,
						fenJuCode: "P",
						fenJuName: "威县分局"
					},
			
					{
						fenJuID: 16,
						fenJuCode: "R",
						fenJuName: "清河县分局"
					},
			
					{
						fenJuID: 17,
						fenJuCode: "Q",
						fenJuName: "临西县分局"
					},
			
					{
						fenJuID: 18,
						fenJuCode: "S",
						fenJuName: "南宫市分局"
					},
			
					{
						fenJuID: 19,
						fenJuCode: "D",
						fenJuName: "沙河市分局"
					},
			
					{
						fenJuID: 20,
						fenJuCode: "W",
						fenJuName: "河北邢台经济开发区分局"
					}
				],
				aearFenjuIndex: 0,
				yunxingSwitch: false,
				isinstallObdSwitch: false,
				isinstallWuranSwitch: false,
				startDate: getDate('start'),
				endDate: getDate('end')
			},
			
		};
	},
	onShow() {
		const self = this;
		uni.getStorage({
			key: 'vehicleId',
			success: function(res) {
				self.vehicleId = res.data.vehicleInfoId;
				self.editText=res.data.shenheStateName
				self.deployLook = self.deployVuex;
				self.getbaseInfo(res.data.vehicleInfoId);
			
			},
			fail: function() {
				uni.showToast({
					icon: 'none',
					title: '获取信息失败！'
				});
			}
		});
	},
	computed: {
		...mapState({
			deployVuex: state => state.baseInfo.deploy
		})
	},
	onNavigationBarButtonTap() {
		if(this.editText==="待审核" || this.editText==="退回重填" || this.editText==="填报中"){
			this.editStatu = false;
			this.chanegflag = false;
		}else{
			uni.showToast({
				icon:'none',
				title:"此车辆已进入制卡阶段，无法编辑"
			})
		}
		
	},
	methods: {
		...mapActions(['getJXLX', 'getPFBX', 'getSYNY', 'getGLFJ']),
		//切换选项卡
		chanegStep(index) {
			if (this.chanegflag) {
				this.current = index;
			}
		},
		backBaseInof() {
			this.current = 0;
		},
		toggleTab(type) {
			if (type === 'type') {
				this.$refs['selector'].show();
			}
		},
		//获取基本信息
		getbaseInfo(item) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.$http
				.post('/VehicleInfo/selectVehicleInfoByVehicleID.do', {
					vehicleid: item
				})
				.then(data => {
					console.log(data)
					uni.hideLoading();
					this.$refs['baseInfo'].baseInfo = data.data;
					//获取附件图片
					this.getImageUrl(data.data.fuJianIdList);
					//获取picker选中索引
					this.getIndex(this.deployLook.mechanicsTypeArray, 'mechanicsTypeName',  data.data.mechanicsTypeName);
					this.getIndex(this.deployLook.shiyongdidianArray, 'shiyongdidianName',  data.data.shiyongDidianName);
					this.getIndex(this.deployLook.shiyongNengyuanArray, 'shiyongNengyuanName',  data.data.shiyongNengyuanName);
					this.getIndex(this.deployLook.aearFenjuArray, 'aearFenjuName',  data.data.aearFenjuName);
					this.$refs['baseInfo'].baseInfo.eDingGongLv = Number( data.data.edingGongLv);
					this.$refs['baseInfo'].baseInfo.yunxingState == '1' ? (this.deployLook.yunxingSwitch = true) : (this.deployLook.yunxingSwitch = false);
					this.$refs['baseInfo'].baseInfo.isinstallObd == '1' ? (this.deployLook.isinstallObdSwitch = true) : (this.deployLook.isinstallObdSwitch = false);
					this.$refs['baseInfo'].baseInfo.isinstallWuran == '1' ? (this.deployLook.isinstallWuranSwitch = true) : (this.deployLook.isinstallWuranSwitch = false);
					this.isdpf=data.data.isinstallWuran==1?true:false
					this.$refs['baseInfo'].current=Number(data.data.dpfZsType)-1
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		getIndex(arr, type, name) {
			for (var i in arr) {
				if (type === 'mechanicsTypeName') {
					if (arr[i].mechanicsTypeName === name) {
						return (this.deployLook.mechanicsTypeIndex = Number(i));
					}
				} else if (type === 'shiyongdidianName') {
		
					if (arr[i].shiYongDiDianName === name) {
						return (this.deployLook.shiyongdidianIndex = Number(i));
					}
				} else if (type === 'shiyongNengyuanName') {
					if (arr[i].shiYongNengYuanName === name) {
						return (this.deployLook.shiyongNengyuanIndex = Number(i));
					}
				} else if (type === 'aearFenjuName') {
					if (arr[i].fenJuName === name) {
						return (this.deployLook.aearFenjuIndex = Number(i));
					}
				}
			}
		},
		//获取附件
		getImageUrl(fuJianIdList) {
			for (var i in fuJianIdList) {
				for (var k in this.uploadInfoLook[0].info) {
					if (fuJianIdList[i].attachType === this.uploadInfoLook[0].info[k].type) {
						this.uploadInfoLook[0].info[k].imgurl = `${this.imageUploadlook}${fuJianIdList[i].attachId}`;
						this.uploadInfoLook[0].info[k].id = fuJianIdList[i].attachId.toString();
					}
				}
			}
		},
		/* 编辑页面 */
		//切换picker
		bindPickerChange(item) {
			const type = item.type;
			const e = item.data;
			switch (type) {
				case 'mechanicsType': //机械类型
					this.deployLook.mechanicsTypeIndex = e.target.value;
					this.$refs['baseInfo'].baseInfo.mechanicsTypeId = this.deployLook.mechanicsTypeArray[e.target.value].mechanicsTypeID;
					console.log(this.$refs['baseInfo'].baseInfo.mechanicsTypeId);
					console.log(this.deployLook.mechanicsTypeIndex);
					break;
				case 'chuchangTime': //出厂时间
					this.$refs['baseInfo'].baseInfo.chuchangTime = e.target.value;
					break;
				case 'fadongjiChuchangDate': //发动机出厂时间
					this.$refs['baseInfo'].baseInfo.fadongjiChuchangDate = e.target.value;
					break;
				case 'shiyongdidianType': //使用地点
			        debugger
					this.deployLook.shiyongdidianIndex = e.target.value;
					this.$refs['baseInfo'].baseInfo.shiyongdidianId = this.deployLook.shiyongdidianArray[e.target.value].shiyongdidianId;
					break;
				case 'shiyongNengyuanType': //使用能源
					this.deployLook.shiyongNengyuanIndex = e.target.value;
					this.$refs['baseInfo'].baseInfo.shiyongNengyuanId = this.deployLook.shiyongNengyuanArray[e.target.value].shiYongNengYuanID;
					break;
				case 'aearFenjuType': //管理分局
					this.deployLook.aearFenjuIndex = e.target.value;
					this.$refs['baseInfo'].baseInfo.aearFenjuId = this.deployLook.aearFenjuArray[e.target.value].fenJuID;
					break;
				default:
					break;
			}
		},
		//切换switch
		switchChange(item) {
			const value = item.data.detail.value;
			const type = item.type;
			if (value === true) {
				switch (type) {
					case 'yunxingState':
						this.$refs['baseInfo'].baseInfo.yunxingState = '1';
						this.$refs['baseInfo'].baseInfo.yunxingSwitch = value;
						break;
					case 'isinstallObd':
						this.$refs['baseInfo'].baseInfo.isinstallObd = '1';
						this.$refs['baseInfo'].baseInfo.isinstallObdSwitch = value;
						break;
					case 'isinstallWuran':
						this.$refs['baseInfo'].baseInfo.isinstallWuran = '1';
						this.$refs['baseInfo'].baseInfo.isinstallWuranSwitch = value;
						this.isdpf = true;
						break;
					default:
						break;
				}
			} else {
				switch (type) {
					case 'yunxingState':
						this.$refs['baseInfo'].baseInfo.yunxingState = '0';
						this.$refs['baseInfo'].baseInfo.yunxingSwitch = value;
						break;
					case 'isinstallObd':
						this.$refs['baseInfo'].baseInfo.isinstallObd = '0';
						this.$refs['baseInfo'].baseInfo.isinstallObdSwitch = value;
						break;
					case 'isinstallWuran':
						this.$refs['baseInfo'].baseInfo.isinstallWuran = '0';
						this.$refs['baseInfo'].baseInfo.isinstallWuranSwitch = value;
						this.$refs['baseInfo'].baseInfo.dpfXingHao = '';
						this.$refs['baseInfo'].baseInfo.dpfManufacturer = '';
						this.$refs['baseInfo'].baseInfo.dpfAnZhuangDate = '';
						this.$refs['baseInfo'].baseInfo.dpfYanduBefore = '';
						this.$refs['baseInfo'].baseInfo.dpfYanduLast = '';
						this.$refs['baseInfo'].baseInfo.dpfZsType = '';
						this.$refs['baseInfo'].current=''
						this.isdpf = false
						break;
					default:
						break;
				}
			}
		},
		//单选
		radioChange: function(data) {
			this.$refs['baseInfo'].baseInfo.dpfZsType = data;
		},
		//提交基本信息(下一步)
		submitbaseInfo() {
			uni.showLoading({
				title: '保存中...',
				mask: true
			});
			/* alert(this.vehicleId) */
			this.$refs['baseInfo'].baseInfo.vehicleId = this.vehicleId;
			console.log(this.$refs['baseInfo'].baseInfo)
			this.$http
				.post('/VehicleInfo/updateVehicleInfoByVehicleId.do', this.$refs['baseInfo'].baseInfo)
				.then(data => {
					console.log(data)
					uni.hideLoading();
					this.uploadRelation = data.data;
					this.current = 1;
					this.chanegflag = true;
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		//关联上传附件
		successUpload(e) {
			console.log(e);
			this.$http
				.post('/VehicleInfo/insertAttachRelation.do', {
					attachId: e.id,
					attachType: e.type,
					vehicleId: this.vehicleId
				})
				.then(data => {
					uni.showToast({
						icon: 'none',
						title: '添加附件成功！'
					});
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		},
		//删除附件
		deleteUpload(e) {
			uni.showModal({
				content: '确定要删除！',
				success: res => {
					if (res.confirm) {
						this.$http
							.post('/VehicleInfo/deleteAttachRelation.do', {
								attachId: Number(e.id),
								vehicleId: this.vehicleId
							})
							.then(data => {
								this.deleteImageData(e.id);
								uni.showToast({
									icon: 'none',
									title: '删除成功！'
								});
							})
							.catch(msg => {
								uni.showToast({
									icon: 'none',
									title: msg
								});
							});
					}
				}
			});
		},
		//删除图片数据
		deleteImageData(id) {
			this.uploadInfoLook.find(v => {
				if (v.id == id) {
					return (v.imgurl = '');
				}
			});
		},
		//提交完成
		completeReport() {
			uni.showLoading({
				title: '提交中...',
				mask: true
			});
			this.$http
				.post('/VehicleInfo/updateVehicleShenHeZhuangTai.do', {
					vehicleId: this.vehicleId
				})
				.then(data => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '编辑成功！'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '../index/index'
						});
					}, 2000);
				})
				.catch(msg => {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				});
		}
	}
};
</script>

<style>
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}
.topbtn {
	padding: 10rpx 20rpx;
	background: #eeeeee;
	color: #aaaaaa;
	margin: 0 20rpx 0 0;
	border-radius: 20rpx;
}
.topbtn.active {
	background: #3497f3;
	color: #ffffff;
}
.topbtn.active2 {
	background: #3fcdeb;
	color: #ffffff;
}

.content {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0rpx;
	top: 110rpx;
	overflow-y: auto;
}

.btmWarp {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #f9f9f9;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.stepBtn {
	padding: 1rpx 30rpx;
	background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(3, 169, 244, 1));
	border-radius: 30rpx;
	font-size: 26rpx;
	margin-right: 20rpx;
	color: #fff;
}
.stepBtn-hover {
	background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(3, 169, 244, 0.8));
}
.backBtn {
	background: linear-gradient(-90deg, rgba(144, 225, 134, 1), rgba(28, 217, 177, 1));
}
.backBtn-hover {
	background: linear-gradient(-90deg, rgba(144, 225, 134, 0.8), rgba(28, 217, 177, 0.8));
}
.pcolor {
	color: #3497f3;
	font-size: 28rpx;
}
.example-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	color: #464e52;
	padding: 15rpx 15rpx 15rpx 40rpx;
	position: relative;
	background-color: #fdfdfd;
	border-bottom: 1px #f5f5f5 solid;
}

.example-title__after {
	position: relative;
	color: #031e3c;
}

.example-title:after {
	content: '';
	position: absolute;
	left: 26rpx;
	margin: auto;
	top: 2rpx;
	bottom: 0;
	width: 6upx;
	height: 32upx;
	background-color: #03a9f4;
}

.example .example-title {
	margin: 40upx 0;
}

.example-body {
	padding: 30upx;
	background: #fff;
}

.example-info {
	padding: 30upx;
	color: #3b4144;
	background: #fff;
}

.example-body {
	padding: 30upx 0;
}
.cell-pd {
	padding: 22upx 30upx;
}

.list-pd {
	margin-top: 50upx;
}
.uni-uploader__file {
	position: relative;
}
</style>
