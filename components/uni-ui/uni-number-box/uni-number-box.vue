<template>
	<view class="uni-numbox">
		<view :class="{ 'uni-numbox--disabled': inputValue <= min || disabled }" class="uni-numbox__minus" @click.stop="_calcValue('minus')">-</view>
		<view class="uni-numbox__value d-flex a-center j-center"><input :disabled="isdisable" v-model="inputValue"  type="number" @blur="_onBlur" /></view>
		
		<view :class="{ 'uni-numbox--disabled': inputValue >= max || disabled }" class="uni-numbox__plus" @click.stop="_calcValue('plus')">+</view>
	</view>
</template>
<script>
export default {
	name: 'UniNumberBox',
	props: {
		value: {
			type: [Number, String],
			default: 1
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		disabled: {
			type: Boolean,
			default: false
		},
		disabledInput: {
			type: Boolean,
			default: true
		},
		index: {
			type: Number,
			default: 0
		},
		type: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			inputValue: 0
		};
	},
	computed: {
		isdisable() {
			if (this.disabled === true) {
				return true;
			} else {
				if (this.disabledInput === true) {
					return true;
				} else {
					return false;
				}
			}
		}
	},
	watch: {
		value(val) {
			this.inputValue = +val;
		},
		inputValue(newVal, oldVal) {
			if (+newVal !== +oldVal) {
				this.$emit('change', { val: newVal, index: this.index, type: this.type });
			}
		}
	},
	created() {
		this.inputValue = +this.value;
	},
	methods: {
		_calcValue(type) {
			if (this.disabled) {
				return;
			}
			const scale = this._getDecimalScale();
			let value = this.inputValue * scale;
			let step = this.step * scale;
			if (type === 'minus') {
				value -= step;
			} else if (type === 'plus') {
				value += step;
			}
			if (value < this.min || value > this.max) {
				return;
			}
			this.inputValue = value / scale;
		},
		_getDecimalScale() {
			let scale = 1;
			// 浮点型
			if (~~this.step !== this.step) {
				scale = Math.pow(10, (this.step + '').split('.')[1].length);
			}
			return scale;
		},
		_onBlur(event) {
			console.log(event)
			let value = event.detail.value;
			if (!value) {
				this.inputValue = 0;
				return;
			}
			value = +value;
			if (value > this.max) {
				value = this.max;
			} else if (value < this.min) {
				value = this.min;
			}
			this.inputValue = value;
		}
	}
};
</script>
<style>
@charset "UTF-8";

.uni-numbox {
		display: inline-flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 70upx;
		position: relative
	}

	.uni-numbox:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border: 1px solid #e5e5e5;
		border-radius: 12upx;
		transform: scale(.5)
	}

	.uni-numbox__minus,
	.uni-numbox__plus {
		margin: 0;
		background-color: #f8f8f8;
		width: 70upx;
		font-size: 40upx;
		height: 100%;
		line-height: 70upx;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #333;
		position: relative
	}

	.uni-numbox__value {
		position: relative;
		background-color: #fff;
		width: 80upx;
		height: 100%;
		text-align: center;
		padding: 0 40rpx ;
	}

	.uni-numbox__value:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-style: solid;
		border-color: #e5e5e5;
		border-left-width: 1px;
		border-right-width: 1px;
		border-top-width: 0;
		border-bottom-width: 0;
		transform: scale(.5)
	}

	.uni-numbox--disabled {
		color: silver
	}
</style>