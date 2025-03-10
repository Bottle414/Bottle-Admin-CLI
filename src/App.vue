<template>
  <div class='app'>
    <Icon icon="ion" name="airplane"/>
    <Icon icon="mdi" name="home" font-size="60px"/>
    <h1>Hi</h1>
  </div>
</template>

<script lang='ts' setup>
  // import { getAllUsers } from './utils/api.ts'
  // const users = await getAllUsers() // 还要等一次,或者.then，拿到的才不是promise async函数会把返回的user封装为promise
  // users.forEach(user => {
  //   let { username, password} = user
  //   console.log(username, password);
  // }); // 拿到用户名和密码

  import request from './utils/request.ts'
  request({
    url: 'http://localhost:3000/Users',
    method: 'GET'
  }).then(res => {
    console.log(res.data);
  })
</script>

<style scoped lang="scss">
  h1 {
    display: inline-block;
    color: myColor.$myBlack;
  }
</style>