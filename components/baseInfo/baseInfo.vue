<template>
	<view>
		<view class="example-title">车主信息</view>
		<view class="example-body" style="padding: 0;">
			<view class="px-2 bg-white rounded pb-1">
				<view class="d-flex flex-row w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">车主姓名</view>
						<input class="puc_ipt" type="text" disabled="true" placeholder="输入姓名" v-model="baseInfo.chezhuName || name" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column w-50  mr-1 ">
						<view class="font-md text-muted">车主电话</view>
						<input class="puc_ipt" type="number" :disabled="editStatu" placeholder="输入电话" v-model="baseInfo.chezhuPhone" placeholder-class="pcolor" />
					</view>
				</view>
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column mr-1">
						<view class="font-md text-muted">机械品牌</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入机械品牌" v-model="baseInfo.carbrand" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column mr-1">
						<view class="font-md text-muted">机械型号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入机械型号" v-model="baseInfo.cartype" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column col-6">
						<view class="font-md text-muted">排放检测单位</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入检测单位" v-model="baseInfo.jianceCompany" placeholder-class="pcolor" />
					</view>
				</view>
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">机械行驶证号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入行驶证号" v-model="baseInfo.travellicensCode" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column w-50">
						<view class="font-md text-muted">机动车驾驶证号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="请输入驾驶证号" v-model="baseInfo.drivinglicenseCode" placeholder-class="pcolor" />
					</view>
				</view>
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column  w-100">
						<view class="font-md text-muted">设备所有者住地</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入居住地" v-model="baseInfo.shebeiSuoyouZhudi" placeholder-class="pcolor" />
					</view>
				</view>
			</view>
		</view>
		<DividLine />
		<view class="example-title">机械信息</view>
		<view class="example-body" style="padding: 0;">
			<view class="px-2 bg-white rounded pb-1">
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">机械环保信息公开号</view>
						<input
							class="puc_ipt"
							maxlength="24"
							type="text"
							:disabled="editStatu"
							placeholder="输入机械环保信息公开号"
							v-model="baseInfo.huanbaoInfogongkaicode"
							placeholder-class="pcolor"
						/>
					</view>
					<view class="py-1 d-flex flex-column w-50">
						<view class="font-md text-muted">机械产品识别码</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入机械产品识别码" v-model="baseInfo.jixieProductcode" placeholder-class="pcolor" />
					</view>
				</view>

				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">发动机出厂号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入发动机出厂号" v-model="baseInfo.fadongjiChuchanghao" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column w-50">
						<view class="font-md text-muted">发动机型式核准号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="发动机型式核准号" v-model="baseInfo.fadongjiHezhunhao" placeholder-class="pcolor" />
					</view>
				</view>
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">发动机型号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入发动机型号" v-model="baseInfo.fadongjiXinghao" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column w-50">
						<view class="font-md text-muted">发动机制造商</view>
						<input
							class="puc_ipt"
							type="text"
							:disabled="editStatu"
							placeholder="请输入发动机制造商"
							v-model="baseInfo.fadongjiZhizaoQiye"
							placeholder-class="pcolor"
						/>
					</view>
				</view>
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">机械环保代码</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入机械环保代码" v-model="baseInfo.jiXieHuanBaoCode" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column w-50">
						<view class="font-md text-muted">机械出厂号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="请输入机械出厂号" v-model="baseInfo.jixieChuchanghao" placeholder-class="pcolor" />
					</view>
				</view>
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">机械制造厂家</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入机械制造厂家" v-model="baseInfo.jixieZhizaoChangjia" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column w-50">
						<view class="font-md text-muted">机械制造产地</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="请输入机械制造产地" v-model="baseInfo.jixieZhizaoChandi" placeholder-class="pcolor" />
					</view>
				</view>
			</view>
		</view>
		<DividLine />
		<view class="px-2 rounded pb-2">
			<uni-list-item title="机械类型" extraWidth="50%">
				<view slot="rightContent">
					<picker
						@change="bindPickerChange($event, 'mechanicsType')"
						range-key="mechanicsTypeName"
						:dataId="!editStatu ? deploy.mechanicsTypeArray[deploy.mechanicsTypeIndex].mechanicsTypeID : ''"
						:value="deploy.mechanicsTypeIndex"
						:range="deploy.mechanicsTypeArray"
						:disabled="editStatu"
						ref="mechanicsType"
					>
						<view class="uni-input">{{ deploy.mechanicsTypeArray[deploy.mechanicsTypeIndex].mechanicsTypeName }}</view>
					</picker>
				</view>
			</uni-list-item>
			<uni-list-item title="出厂时间" extraWidth="50%">
				<view slot="rightContent">
					<picker
						mode="date"
						:disabled="editStatu"
						:value="baseInfo.chuchangTime"
						:start="deploy.startDate"
						:end="deploy.endDate"
						@change="bindPickerChange($event, 'chuchangTime')"
					>
						<view class="uni-input">{{ baseInfo.chuchangTime }}</view>
					</picker>
				</view>
			</uni-list-item>
			<uni-list-item title="发动机出厂时间" extraWidth="50%">
				<view slot="rightContent">
					<picker
						mode="date"
						:disabled="editStatu"
						:value="baseInfo.fadongjiChuchangDate"
						:start="deploy.startDate"
						:end="deploy.endDate"
						@change="bindPickerChange($event, 'fadongjiChuchangDate')"
					>
						<view class="uni-input">{{ baseInfo.fadongjiChuchangDate }}</view>
					</picker>
				</view>
			</uni-list-item>
			<uni-list-item title="年平均工作时长(小时)" extraWidth="50%" :showArrow="false">
				<view slot="rightContent">
					<uni-number-box
						:disabled="editStatu"
						:value="baseInfo.yearAvgWorktime"
						@change="change"
						:type="'yearAvgWorktime'"
						:min="0"
						:max="8784"
						:step="1"
						:disabledInput="false"
					/>
				</view>
			</uni-list-item>
			<uni-list-item title="累计工作时间(小时)" extraWidth="50%" :showArrow="false">
				<view slot="rightContent">
					<uni-number-box
						:disabled="editStatu"
						:value="baseInfo.cumulativeWorktime"
						@change="change"
						:type="'cumulativeWorktime'"
						:min="0"
						:max="999999"
						:step="1"
						:disabledInput="false"
					/>
				</view>
			</uni-list-item>
			<uni-list-item title="使用地点" extraWidth="50%">
				<view slot="rightContent">
					<picker
						@change="bindPickerChange($event, 'shiyongdidianType')"
						range-key="shiYongDiDianName"
						:dataId="!editStatu ? deploy.shiyongdidianArray[deploy.shiyongdidianIndex].shiYongDiDianId : ''"
						:value="deploy.shiyongdidianIndex"
						:range="deploy.shiyongdidianArray"
						:disabled="editStatu"
						ref="shiyongdidianType"
					>
						<view class="uni-input">{{ deploy.shiyongdidianArray[deploy.shiyongdidianIndex].shiYongDiDianName }}</view>
					</picker>
				</view>
			</uni-list-item>
			<uni-list-item title="使用能源" extraWidth="50%">
				<view slot="rightContent">
					<picker
						@change="bindPickerChange($event, 'shiyongNengyuanType')"
						range-key="shiYongNengYuanName"
						:dataId="!editStatu ? deploy.shiyongNengyuanArray[deploy.shiyongNengyuanIndex].shiYongNengYuanID : ''"
						:value="deploy.shiyongNengyuanIndex"
						:range="deploy.shiyongNengyuanArray"
						:disabled="editStatu"
						ref="shiyongNengyuanType"
					>
						<view class="uni-input">{{ deploy.shiyongNengyuanArray[deploy.shiyongNengyuanIndex].shiYongNengYuanName }}</view>
					</picker>
				</view>
			</uni-list-item>
			<uni-list-item title="额定功率 ( KW )" extraWidth="50%" :showArrow="false">
				<view slot="rightContent">
					<uni-number-box :disabled="editStatu" :value="baseInfo.eDingGongLv" @change="change" :type="'eDingGongLv'" :min="0" :max="9999" :disabledInput="false" />
				</view>
			</uni-list-item>
			<uni-list-item title="管理分局" extraWidth="50%">
				<view slot="rightContent">
					<picker
						@change="bindPickerChange($event, 'aearFenjuType')"
						range-key="fenJuName"
						:dataId="!editStatu ? deploy.aearFenjuArray[deploy.aearFenjuIndex].fenJuID : ''"
						:value="deploy.aearFenjuIndex"
						:range="deploy.aearFenjuArray"
						:disabled="editStatu"
						ref="aearFenjuType"
					>
						<view class="uni-input">{{ deploy.aearFenjuArray[deploy.aearFenjuIndex].fenJuName }}</view>
					</picker>
				</view>
			</uni-list-item>
			<uni-list-item title="运行状态" extraWidth="50%" :showArrow="false">
				<view slot="rightContent">
					<switch :disabled="editStatu" :checked="deploy.yunxingSwitch" color="#18d0ac" style="transform:scale(0.8)" @change="switchChange($event, 'yunxingState')" />
				</view>
			</uni-list-item>
			<uni-list-item title="是否安装OBD" extraWidth="50%" :showArrow="false">
				<view slot="rightContent">
					<switch
						:disabled="editStatu"
						:checked="deploy.isinstallObdSwitch"
						color="#18d0ac"
						style="transform:scale(0.8)"
						@change="switchChange($event, 'isinstallObd')"
					/>
				</view>
			</uni-list-item>
			<uni-list-item title="是否有dpf设备" extraWidth="50%" :showArrow="false">
				<view slot="rightContent">
					<switch
						:disabled="editStatu"
						:checked="deploy.isinstallWuranSwitch"
						color="#18d0ac"
						style="transform:scale(0.8)"
						@change="switchChange($event, 'isinstallWuran')"
					/>
				</view>
			</uni-list-item>
		</view>
		<!-- dpf设备信息 -->
		<view class="example-body" style="padding: 0;" v-show="isdpf">
			<view class="px-2 bg-white rounded pb-1">
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">dpf设备型号</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入dpf设备型号" v-model="baseInfo.dpfXingHao" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column w-50">
						<view class="font-md text-muted">dpf设备生产厂家</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入dpf设备生产厂家" v-model="baseInfo.dpfManufacturer" placeholder-class="pcolor" />
					</view>
				</view>

				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-50 mr-1">
						<view class="font-md text-muted">dpf安装日期</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入安装日期" v-model="baseInfo.dpfAnZhuangDate" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column  mr-1">
						<view class="font-md text-muted">安装前烟度值</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入安装前烟度值" v-model="baseInfo.dpfYanduBefore" placeholder-class="pcolor" />
					</view>
					<view class="py-1 d-flex flex-column col-6">
						<view class="font-md text-muted">安装后烟度值</view>
						<input class="puc_ipt" type="text" :disabled="editStatu" placeholder="输入安装后烟度值" v-model="baseInfo.dpfYanduLast" placeholder-class="pcolor" />
					</view>
				</view>
				<view class="d-flex flex-row  w-100 ">
					<view class="py-1 d-flex flex-column w-100">
						<view class="font-md text-muted">dpf再生方式</view>
							<radio-group @change="radioChange">
								<label v-for="(item, index) in radioGround" :key="index" class="radio" style="margin-right: 30rpx;">
									<radio name="zsfs" :value="item.value" :checked="index === current" color="#007bff" style="transform:scale(0.8)"/>
									{{ item.name }}
								</label>
							</radio-group>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getDate } from '@/common/util/util.js';
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';
export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		phone: {
			type: String,
			default: ''
		},
		editStatu: {
			type: Boolean,
			default: false
		},
		deploy: {
			type: Object,
			default() {
				return {};
			}
		},
		isdpf:{
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			baseInfo: {
				/* 基本信息 */
			/* 	carCode: '', //车牌号 */
				chezhuName: '', // 车主姓名
				chezhuPhone: '', //- 车主电话
				carbrand: '', //- 机械品牌
				cartype: '', //- 机械类型
				jianceCompany: '', // - 检测单位
				drivinglicenseCode: '', // - 驾驶证号码
				travellicensCode: '', // - 行驶证号码
				shebeiSuoyouZhudi: '', // - 设备所有者住地
				/* 机械信息 */
				jixieProductcode: '', //机械产品识别码
				huanbaoInfogongkaicode: '', //机械环保信息公开号
				fadongjiChuchanghao: '', // - 发动机出厂号
				fadongjiHezhunhao: '', // - 发动机型式核准号
				fadongjiXinghao: '', //- 发动机型号
				fadongjiZhizaoQiye: '', //- 发动机制造企业
				jiXieHuanBaoCode: '', //- 机械环保代码
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
				shiyongDidianId: 0, // - 使用地点ID
				shiyongNengyuanId: 0, // - 使用能源ID
				eDingGongLv: 0, // - 额定功率
				aearFenjuId: 0, // - 管理分局ID
				yunxingState: '0', //-运行状态
				isinstallObd: '0', // - 是否安装OBD
				isinstallWuran: '0',
				//dpf信息
				dpfXingHao: '',
				dpfManufacturer: '',
				dpfAnZhuangDate: '',
				dpfYanduBefore: '',
				dpfYanduLast: '',
				dpfZsType:'',
			}, // - 是否安装污染装置
			mechanicsTypeID: 0,
			shiyongDidianId: 0,
			shiyongNengyuanID: 0,
			aearFenjuID: 0,
			current: 0,
			radioGround: [
				{
					value: '1',
					name: '主动'
				},
				{
					value: '2',
					name: '被动'
				},
				{
					value: '3',
					name: '主动被动结合'
				}
			]
		};
	},
	components: {
		uniListItem,
		uniNumberBox
	},
	methods: {
		bindPickerChange(e, type) {
			var item = {
				data: e,
				type: type
			};
			this.$emit('bindPickerChange', item);
		},
		/* 切换数值 */
		change(value) {
			const type = value.type;
			const valueData = Number(value.val);
			switch (type) {
				case 'yearAvgWorktime':
					this.baseInfo.yearAvgWorktime = valueData;
					break;
				case 'cumulativeWorktime':
					this.baseInfo.cumulativeWorktime = valueData;
					break;
				case 'eDingGongLv':
					this.baseInfo.eDingGongLv = valueData;
					break;
				default:
					break;
			}
		},
		switchChange(e, type) {
			uni.hideKeyboard();
			var item = {
				data: e,
				type: type
			};
			this.$emit('switchChange', item);
		},
		//检查车牌号
		checkLicense(data) {
			this.$emit('checkLicense', data);
		},
		radioChange(evt) {
			for (let i = 0; i < this.radioGround.length; i++) {
				if (this.radioGround[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			const data=evt.target.value
			this.$emit('radioChange', data);
		}
	}
};
</script>

<style scoped lang="less">
.puc_ipt {
	border: 1rpx solid #3497f3;
	height: 45rpx;
	border-radius: 6rpx;
	padding: 10rpx;
	font-size: 28rpx;
	color: #3497f3;
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
.uni-input {
	padding: 3rpx 10rpx;
	background: none;
}
</style>
