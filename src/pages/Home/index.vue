<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
   <!-- 三级联动全局引入了不需要在这引入 -->
   <TypeNav/>
   <ListContainer></ListContainer>
   <Recommend></Recommend>
   <Rank></Rank>
   <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
   <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from "vuex"
    export default {
        components:{
            ListContainer,
            Recommend,
            Rank,
            Floor,
            Brand
        },
        mounted(){
            //获取floor组件的数据
            this.$store.dispatch("getFloorList");
        },
        computed:{
            ...mapState({
                floorList:(state)=>state.home.floorList,
            }),
        }
    }
</script>

<style lang="scss" scoped>

</style>