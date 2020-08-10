<template>
	<view>
		<view class="d-flex flex-row a-center p-2">
			<block v-for="(item, index) in tabList" :key="index">
				<view class="topbtn mr-auto" :class="chanegflag ? (index === current ? 'active' : 'active2') : index === current ? 'active' : ''"
				 @tap="chanegStep(index)">
					{{ item }}
				</view>
			</block>
		</view>

		<view class="content">
			<view v-show="current === 0">
				<baseInfo ref="baseInfo" :name="name" :phone="phone" :editStatu="editStatu" :deploy="deploy" :isdpf="isdpf"
				 @bindPickerChange="bindPickerChange" @changeNumber="changeNumber" @switchChange="switchChange" @radioChange="radioChange" />
				<view class="btmWarp" v-show="!editStatu">
					<view class="stepBtn ml-auto" hover-class="stepBtn-hover" @click="submitBaseInfo">保存</view>
				</view>
			</view>
			<view v-show="current === 1">
				<view>
					<baseUpload :uploadInfo="uploadInfo" :editStatu="false" :imageUploadUrl="imageUploadUrl" @successUpload="successUpload"
					 @deleteUpload="deleteUpload" />
				</view>
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
	import {
		getDate
	} from '@/common/util/util.js';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		components: {
			baseInfo,
			baseUpload
		},
		data() {
			return {
				name: '',
				phone: '',
				editStatu: false,
				uploadRelation: '',
				tabList: ['1.基本信息', '2.材料上传'],
				current: 0,
				chanegflag: false,
				imageUploadUrl: `${this.$http.common.baseUrl}/VehicleInfo/uploadAttachment.do`,
				isdpf: false,
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
					shiyongdidianArray: [
						{
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
			this.deploy.mechanicsTypeIndex = 0;
			this.deploy.shiyongdidianIndex = 0;
			this.deploy.shiyongNengyuanIndex = 0;
			this.deploy.aearFenjuIndex = 0;
			this.deploy.yunxingSwitch = false;
			this.deploy.isinstallObdSwitch = false;
			this.deploy.isinstallWuranSwitch = false;
			const self = this;
			uni.getStorage({
				key: 'info',
				success: function(res) {
					self.name = res.data.chezhuname;
					self.phone = res.data.chezhuphone;
				}
			});
		},
		computed: {
			...mapState({
				uploadInfo: state => state.baseInfo.list,
				baseInfo: state => state.baseInfo.baseInfo
			})
		},
		methods: {
			...mapMutations(['PickerChange']),
			...mapActions(['getBaseInfo']),
			//切换选项卡
			chanegStep(index) {
				if (this.chanegflag) {
					this.current = index;
				}
			},
			//提交基本信息(下一步)
			submitBaseInfo() {
				uni.showLoading({
					title: '保存中...',
					mask: true
				});
				this.$refs['baseInfo'].baseInfo.chezhuName = this.name;
				console.log(this.$refs['baseInfo'].baseInfo)
				this.$http
					.post('/VehicleInfo/insertVehicleInfo.do', this.$refs['baseInfo'].baseInfo)
					.then(data => {
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
				this.$http
					.post('/VehicleInfo/insertAttachRelation.do', {
						attachId: e.id,
						attachType: e.type,
						vehicleId: this.uploadRelation
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
									vehicleId: this.uploadRelation
								})
								.then(data => {
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
			//返回基本信息
			backBaseInof() {
				this.current = 0;
			},
			//提交完成
			completeReport() {
				uni.showLoading({
					title: '提交中...',
					mask: true
				});
				this.$http
					.post('/VehicleInfo/updateVehicleShenHeZhuangTai.do', {
						vehicleId: this.uploadRelation
					})
					.then(data => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '提交成功！'
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
			},
			toggleTab(type) {
				if (type === 'type') {
					this.$refs['selector'].show();
				}
			},
			//切换picker
			bindPickerChange(item) {
				const type = item.type;
				const e = item.data;
				switch (type) {
					case 'mechanicsType': //机械类型
						this.deploy.mechanicsTypeIndex = e.target.value;
						this.$refs['baseInfo'].baseInfo.mechanicsTypeId = this.deploy.mechanicsTypeArray[e.target.value].mechanicsTypeID;

						console.log(this.deploy.mechanicsTypeArray[e.target.value].mechanicsTypeID)
						console.log(this.$refs['baseInfo'].baseInfo.mechanicsTypeId)
						break;
					case 'chuchangTime': //出厂时间
						this.$refs['baseInfo'].baseInfo.chuchangTime = e.target.value;

						break;
					case 'fadongjiChuchangDate': //发动机出厂时间
						this.$refs['baseInfo'].baseInfo.fadongjiChuchangDate = e.target.value;

						break;
					case 'shiyongdidianType': //使用地点
						this.deploy.shiyongdidianIndex = e.target.value;
						this.$refs['baseInfo'].baseInfo.shiyongDidianId = this.deploy.shiyongdidianArray[e.target.value].shiyongDidianId;
						console.log(this.deploy.shiyongdidianArray[e.target.value].shiyongDidianId)
						console.log(this.$refs['baseInfo'].baseInfo.shiyongDidianId)
						break;
					case 'shiyongNengyuanType': //使用能源
						console.log(e.target.value)
						this.deploy.shiyongNengyuanIndex = e.target.value;
						this.$refs['baseInfo'].baseInfo.shiyongNengyuanId = this.deploy.shiyongNengyuanArray[e.target.value].shiYongNengYuanID;
						console.log(this.deploy.shiyongNengyuanArray[e.target.value])
						console.log(this.deploy.shiyongNengyuanArray[e.target.value].shiYongNengYuanID)
						console.log(this.$refs['baseInfo'].baseInfo.shiyongNengyuanId)

						break;
					case 'aearFenjuType': //管理分局
						this.deploy.aearFenjuIndex = e.target.value;
						this.$refs['baseInfo'].baseInfo.aearFenjuId = this.deploy.aearFenjuArray[e.target.value].fenJuID;
						console.log(this.deploy.aearFenjuArray[e.target.value].fenJuID)
						console.log(this.$refs['baseInfo'].baseInfo.aearFenjuId)
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
							this.deploy.yunxingSwitch = value;
							break;
						case 'isinstallObd':
							this.$refs['baseInfo'].baseInfo.isinstallObd = '1';
							this.deploy.isinstallObdSwitch = value;
							break;
						case 'isinstallWuran':
							this.$refs['baseInfo'].baseInfo.isinstallWuran = '1';
							this.deploy.isinstallWuranSwitch = value;
							this.isdpf = true;
							break;
						default:
							break;
					}
				} else if (value === false) {
					switch (type) {
						case 'yunxingState':
							this.$refs['baseInfo'].baseInfo.yunxingState = '0';
							this.deploy.yunxingSwitch = value;
							break;
						case 'isinstallObd':
							this.$refs['baseInfo'].baseInfo.isinstallObd = '0';
							this.deploy.isinstallObdSwitch = value;
							break;
						case 'isinstallWuran':
							this.$refs['baseInfo'].baseInfo.isinstallWuran = '0';
							this.deploy.isinstallWuranSwitch = value;
							this.$refs['baseInfo'].baseInfo.dpfXingHao = '';
							this.$refs['baseInfo'].baseInfo.dpfManufacturer = '';
							this.$refs['baseInfo'].baseInfo.dpfAnZhuangDate = '';
							this.$refs['baseInfo'].baseInfo.dpfYanduBefore = '';
							this.$refs['baseInfo'].baseInfo.dpfYanduLast = '';
							this.$refs['baseInfo'].baseInfo.dpfZsType = '';
							this.$refs['baseInfo'].current = '';
							this.isdpf = false;
							break;
						default:
							break;
					}
				}
			},
			//单选
			radioChange: function(data) {
				this.$refs['baseInfo'].baseInfo.dpfZsType = data;
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
		bottom: 90rpx;
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
</style>
