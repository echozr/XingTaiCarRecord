<template>
	<view>
		<block v-for="(list, listIndex) in uploadInfo" :key="listIndex">
			<view class="example-title">{{ list.text }}</view>
			<view class="example-body">
				<block v-for="(item, index) in list.info" :key="index">
					<!-- 新增及编辑 -->
					<view v-if="!editStatu">
						<view class="d-flex flex-row a-center j-center w-100 my-2">
							<view class="d-flex flex-column a-center j-center" style="width: 49%;">
								<view>{{ item.title }}</view>
								<image-upload
									:showDelet="editStatu"
									:imageUploadUrl="imageUploadUrl"
									:dataImgUrl="item.imgurl"
									:dataUploadID="item.id"
									:UploadType="item.type"
									@deleteImage="deleteUpload"
									@success="successUpload"
								/>
							</view>
							<view class="d-flex flex-column a-center j-center" style="width: 49%;" v-show="!editStatu">
								<view>示例图片</view>
								<image :src="item.example" @tap="showPreviewImage(item.example)" style="width: 110px; height: 110px;" />
							</view>
						</view>
						<DividLine v-if="index != list.info.length - 1" />
					</view>
					<!-- 查看 -->
					<view v-else-if="editStatu && item.imgurl != ''">
						<view class="d-flex flex-row a-center j-center w-100 my-2">
							<view class="d-flex flex-column a-center j-center" style="width: 49%;">
								<view>{{ item.title }}</view>
								<image-upload
									:showDelet="editStatu"
									:imageUploadUrl="imageUploadUrl"
									:dataImgUrl="item.imgurl"
									:dataUploadID="item.id"
									:UploadType="item.type"
									@deleteImage="deleteUpload"
									@success="successUpload"
								/>
							</view>
							<view class="d-flex flex-column a-center j-center" style="width: 49%;" v-show="!editStatu">
								<view>示例图片</view>
								<image :src="item.example" @tap="showPreviewImage(item.example)" style="width: 110px; height: 110px;" />
							</view>
						</view>

						<DividLine v-if="index != list.info.length - 1" />
					</view>
					<!-- 查看暂无数据 -->
					<view v-else-if="editStatu && item.imgurl === ''" class="d-flex flex-column a-center j-center my-2" >
						<view class="my-1">{{ item.title }}</view>
						<image src="../../static/images/nopic.png"  style="width: 110px; height: 110px;" />
						
					</view>
				</block>
			</view>
		</block>
	</view>
</template>

<script>
import ImageUpload from '@/components/common/ImageUpload.vue';
export default {
	props: {
		editStatu: {
			type: Boolean,
			default: false
		},
		imageUploadUrl: {
			type: String,
			default: ''
		},
		uploadInfo: {
			type: Array,
			default() {
				return [];
			}
		},
		imgList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	components: {
		ImageUpload
	},
	methods: {
		showPreviewImage: function(picurl) {
			uni.previewImage({
				current: picurl,
				urls: [picurl]
			});
		},
		successUpload(e) {
			console.log(e);
			this.$emit('successUpload', e);
		},
		deleteUpload(e) {
			console.log(e);
			this.$emit('deleteUpload', e);
		}
	}
};
</script>

<style scoped>
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
</style>
