<!-- BurgerButton.vue -->
<template>
  <div id="burger" :class="{ 'active': active }">
    <button type="button" class="burger-button" title="Menu" @click="toggleActive">
      <span class="burger-bar burger-bar--1"></span>
      <span class="burger-bar burger-bar--2"></span>
      <span class="burger-bar burger-bar--3"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BurgerButton',
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    toggleActive() {
      this.$emit('toggle-menu')
    }
  }
}
</script>

<style scoped>
.burger-button {
  position: relative;
  height: 30px;
  width: 40px;
  display: block;
  z-index: 99;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
}

.burger-bar {
  background-color: #444;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 3px;
  width: auto;
  margin-top: -1px;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg);
  top: 50%;
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg);
  top: 50%;
}

.burger-bar--1 {
  top: 10px;
}

.burger-bar--2 {
  top: 20px;
}

.burger-bar--3 {
  top: 30px;
}
</style>
