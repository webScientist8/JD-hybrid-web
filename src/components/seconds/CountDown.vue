<template>
  <div class="count-down">
    <span class="count-down-end-time">{{endHours}}点场</span>
    <span class="count-down-surplus">{{surplus | filterTime}}</span>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: function () {
    return {
      surplus: '',
      diffSeconds: 0,
      interval: undefined
    }
  },
  created: function () {
    this.computedSurplusTime()
  },
  methods: {
    computedSurplusTime: function () {
      if (this.interval) clearInterval(this.interval)
      const date = new Date()
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
        return
      }
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
        return
      }
      const diffHours = this.endHours - date.getHours() - 1
      const diffMinutes = 60 - date.getMinutes() - 1
      const diffSeconds = 60 - date.getSeconds()
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      this.interval = setInterval(() => { this.diffSeconds -= 1 }, 1000)
    }
  },
  watch: {
    diffSeconds: function (newV, oldV) {
      const hours = Math.floor(newV / 3600)
      const minutes = Math.floor(newV / 60) % 60
      const seconds = newV % 60
      this.surplus = hours + ':' + minutes + ':' + seconds
      if (newV === 0) {
        this.computedSurplusTime()
      }
    },
    endHours: function () {
      this.computedSurplusTime()
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/style.scss';

  .count-down {
    display: flex;
    font-size: px2rem(14);
    margin-left: $marginSize;

    span {
      display: inline-block;
      padding: px2rem(2) px2rem(4) px2rem(2) px2rem(4);
    }

    &-end-time {
      background-color: $mainColor;
      border-top-left-radius: px2rem(4);
      border-bottom-left-radius: px2rem(4);
      border: px2rem(1) solid $mainColor;
      color: white;
    }

    &-surplus {
      background-color: white;
      border-top-right-radius: px2rem(4);
      border-bottom-right-radius: px2rem(4);
      color: $mainColor;
      border: px2rem(1) solid $mainColor;
    }
  }
</style>
