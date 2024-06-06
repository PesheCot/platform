<template>
  <section id="apparel">
    <div class="apparel">
      <div class="apparel_desc">
        <h2>{{ title }}</h2>
        <p>{{ desc }}</p>
      </div>
      <div class="apparel_btn">
        <Button theme="dark" @click="toApparel">Перейти на сайт</Button>
      </div>
    </div>
  </section>
</template>
<script>
import Button from "../ui/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    title: "",
    desc: "",
    link: "",
  },
  methods: {
    toApparel() {
      if (this.link) {
        window.open(this.link);
      }
    },
  },
};
</script>
<style>
.apparel {
  display: flex;
  justify-content: space-between;
}

.apparel_desc {
  width: 100%;
  max-width: 600px;
}

.apparel_desc h2 {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  letter-spacing: 0.84px;
  color: #1e1e1e;
}

.apparel_desc p {
  padding: 0;
  margin-bottom: 30px;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.84px;
  color: #7d827f;
}

.apparel_btn {
  display: flex;
  align-items: flex-end;
  padding-bottom: 40px;
}

@media screen and (max-width: 1300px) {
  .apparel {
    flex-direction: column;
  }

  .apparel_desc p {
    font-size: 18px;
  }

  .apparel_desc h2 {
    font-size: 34px;
  }
}
</style>
