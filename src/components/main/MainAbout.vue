<template>
  <section id="about">
    <div class="about">
      <div class="about_img">
        <img :src="src" />
      </div>
      <div class="about_desc">
        <h2>{{ title }}</h2>
        <p>{{ desc }}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    desc: "",
    title: "",
    src: "",
  },
};
</script>
<style>
.about {
  display: flex;
  justify-content: space-between;
}

.about_desc {
  width: 100%;
  max-width: 600px;
}

.about_desc h2 {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  letter-spacing: 0.84px;
  color: #1e1e1e;
}

.about_desc p {
  padding: 0;
  margin-bottom: 30px;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.84px;
  color: #7d827f;
}

.about_img {
  margin-right: 100px;
  width: 100%;
}

.about_img img {
  width: 580px;
  height: 420px;
}

@media screen and (max-width: 1300px) {
  .about {
    flex-direction: column;
    gap: 60px;
  }

  .about_img img {
    width: 100%;
    height: auto;
  }

  .about_desc {
    max-width: 100%;
  }

  .about_desc p {
    font-size: 18px;
  }

  .about_desc h2 {
    font-size: 34px;
  }
}
</style>
