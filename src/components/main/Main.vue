<template>
  <section id="main">
    <div class="main">
      <div class="main_desc">
        <p>{{ desc }}</p>
        <h1>{{ title }}</h1>
        <!-- <Button theme="dark" @click="openPopup('reg')"
          >Зарегистрироваться</Button
        > -->
      </div>
      <div class="main_img">
        <img :src="src" />
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
    desc: "",
    title: "",
    src: "",
  },
  methods: {
    openPopup(type) {
      this.$store.commit("openPopup", true);
      this.$store.commit("setPopupType", type);
    },
  },
};
</script>
<style>
.main {
  display: flex;
  justify-content: space-between;
}

.main_desc {
  width: 100%;
  max-width: 600px;
}

.main_desc h1 {
  font-weight: 700;
  font-size: 64px;
  line-height: 120%;
  letter-spacing: 0.84px;
  color: #1e1e1e;
}

.main_desc p {
  font-weight: 400;
  font-size: 28px;
  line-height: 120%;
  letter-spacing: 0.84px;
  color: #1e1e1e;
}

.main_img {
  border: 1px solid #000000;
  position: relative;
  width: 480px;
  height: 410px;
}

.main_img img {
  position: absolute;
  width: 500px;
  height: 390px;
  right: 30px;
  top: 30px;
}

@media screen and (max-width: 1460px) {
  .main_desc h1 {
    font-size: 34px;
  }

  .main_desc p {
    font-size: 18px;
  }

  .main_desc p,
  .main_desc h1 {
    padding: 0;
  }
}

@media screen and (max-width: 1200px) {
  .main_img {
    display: none;
  }
  
  .main {
    flex-direction: column-reverse;
    justify-content: flex-start;
    gap: 60px;
  }

}
</style>
