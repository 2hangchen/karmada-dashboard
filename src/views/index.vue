<template>
  <div class="dashboard-container">
    <HeadNav :mini="true"/>
    <ConsoleDashboard />
  </div>
</template>

<script>
import HeadNav from '@/components/headNav.vue';
import ConsoleDashboard from '@/components/console.vue';

export default {
  name: 'Index',
  components: { HeadNav, ConsoleDashboard },
  data() {
    return {
    };
  },
  computed: {
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
};
</script>
