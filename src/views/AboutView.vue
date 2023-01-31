<script lang="ts" setup>
import Button from 'primevue/button';

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="grid">
      <div class="col-4">
        <Button label="Submit" :loading="true" />
      </div>
      <div class="col-4">
        <Button label="Disabled" disabled />
      </div>
      <div class="col-4">
        <Button label="Link" class="p-button-link" />
      </div>
    </div>
    <div>
      <h5>Icons</h5>
      <Button icon="pi pi-check" />
      <Button label="Submit" icon="pi pi-check" />
      <Button label="Submit" icon="pi pi-check" iconPos="right" />
    </div>
  </div>
</template>
