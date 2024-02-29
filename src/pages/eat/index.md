<script setup>
const userInput = window.prompt("请输入密码", "");
if (userInput !== null) {
    if(userInput==='zero715625'){
      alert(`吃饱一点！`);
    }else{
        window.location.href = '/';
    }
} else {
  window.location.href = '/';
}
</script>
