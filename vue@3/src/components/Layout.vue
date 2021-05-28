<template>
  <div>
    <div class="header">
      <router-link to="/detail/1">Detail-1</router-link> |
      <router-link to="/detail/2">Detail-2</router-link>
    </div>
    <router-view />
    <div class="footer">footer</div>
  </div>
</template>


<style>
.header {
  padding: 30px;
}
 
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer {
  padding: 30px;
}
</style>