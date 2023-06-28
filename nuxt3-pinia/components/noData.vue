<template>
  <Card class="max-w-30rem" style="margin: 50px auto">
    <template #title
      ><div class="flex justify-content-center">
        <Button
          icon="pi pi-times"
          severity="danger"
          rounded
          aria-label="Cancel"
          size="large"
        />
      </div>
    </template>
    <template #content>
      <h3 class="text-center">No data</h3>
      <div class="flex justify-content-center">
        <NuxtLink to="/book"> <Button label="Back" link /></NuxtLink>
      </div>
    </template>
  </Card>
</template>
