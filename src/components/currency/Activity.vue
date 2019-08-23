<template>
    <div class="activty">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Activity'
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/style";
  .activty{
    max-height: px2rem(160);
    position: relative;
    z-index: 2;
  }
</style>
