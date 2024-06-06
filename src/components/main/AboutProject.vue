<template>
  <section id="about-project">
    <h2>{{ title }}</h2>
    <div class="modules">
      <Module
        v-for="(item, index) in blocks"
        :id="index + 1"
        :title="item.title"
        :desc="item.text"
      />
    </div>
  </section>
</template>
<script>
import Module from "@/components/main/ProjectModule.vue";

export default {
  components: {
    Module,
  },
  props: {
    title: "",
    blocks: [],
  },
};
</script>
<style>
#about-project h2 {
  font-weight: 700;
  font-size: 40px;
  line-height: 120%;
  letter-spacing: 0.84px;
  color: #1e1e1e;
}

.modules {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  width: 100%;
}
.modules_card {
  position: relative;
  width: 100%;
  padding: 40px;
  border: 2px solid #1e1e1e;
}
.number {
  position: absolute;
  top: 20px;
  right: 20px;
}

@media screen and (max-width: 1300px) {
  .modules {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 860px) {
  .modules_card {
    padding: 25px;
  }
  .modules {
    grid-template-columns: 1fr;
  }

  #about-project h2 {
    font-size: 34px;
  }
}
</style>
