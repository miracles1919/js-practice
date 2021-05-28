<template>
  <div class="detail">
    <h1>This is an detail {{ id }} page</h1>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["id"],
};
</script>
