<!-- 报告 -->
<template>
            <div style="background:#009FD9;width: 10px;height: 10px;border-radius:50%;position: absolute;left:600px; top:100px;"><p></p><span style="animation-delay: 2.7s;"></span></div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
        p{position: absolute;top:50%;left:50%;margin-left:-20px;margin-top:-20px;width: 40px;height: 40px;border-radius:50%;animation: myfirst 1s infinite;border:1px solid #009FD9;opacity: 0; }


         @keyframes myfirst{
            0% {transform: scale(0);opacity: 0;}
            /* 40% {transform: scale(3);} */
            60% {opacity: 0.8;}
            /* 80% {transform: scale(5);} */
            100% {transform: scale(1);opacity: 0;}
        }
</style>