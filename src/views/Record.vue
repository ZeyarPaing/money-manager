<template>
  <section class="record-overlay">
    <!-- :style="{ backgroundImage: `url(${BackgroundImg})` }" -->
    <RecordForm> </RecordForm>
  </section>
</template>

<script>
  import RecordForm from '@/components/forms/RecordForm'
  import BackgroundImg from '@/assets/imgs/bgtest.jpg'
  export default {
    data() {
      return {
        componentKey: 0,
        BackgroundImg,
      }
    },
    components: {
      RecordForm,
    },
  }
</script>
<style scoped>
  .record-overlay {
    @apply py-16;
    /* @apply fixed overflow-hidden bg-gray-300 z-10 text-center w-full h-full;
    top: 0;
    left: 0;
    background: no-repeat center;
    background-size: cover;
    background-color: rgba(5, 5, 5, 0.4);
    backdrop-filter: blur(10px) saturate(100%);
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.5s; */
  }
</style>
