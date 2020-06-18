<template>
  <div class="about">
    <h1>About</h1>
    <table class="about-detail">
      <tr>
        <td>Name</td>
        <td>Money Manager</td>
      </tr>
      <tr>
        <td>Features</td>
        <td>
          <ul>
            <li>Record daily usage</li>
            <li>Review usage history</li>
            <li>Shareable usage history for collabrations</li>
            <li>Distinguish wallets by colors</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Version</td>
        <td>0.1.0</td>
      </tr>
      <tr>
        <td>Developer</td>
        <td>
          <a href="https://www.facebook.com/Zeyar.Paing.MWD">Zeyar Paing</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Views.About',
    data() {
      return {}
    },
  }
</script>
<style scoped>
  .about {
    @apply py-16;

    h1 {
      @apply font-bold color-primary;
      font-size: 20px;
    }
    .about-detail {
      td {
        @apply pr-2 pt-2;
        vertical-align: top;

        a {
          @apply color-primary;
        }
      }
    }
  }
</style>
