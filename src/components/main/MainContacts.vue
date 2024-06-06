<template>
  <section id="contacts">
    <h2>{{ title }}</h2>
    <div class="contacts-content">
      <div class="contacts-left">
        <p>
          {{ fio }}
          <a :href="'tel:' + phone">{{ phone }}</a>
        </p>
        <p>
          <a :href="'mailto:' + mail">{{ mail }}</a>
        </p>
      </div>
      <div class="contacts-right">
        <p v-html="info1"></p>
        <p v-html="info2"></p>
        <p ></p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    title:'',
    phone:'',
    mail:'',
    info1:'',
    info2:'',
    fio:'',
    time_worck:''
  },
};
</script>
<style>
.contacts-content {
  display: flex;
  flex-direction: row;
}
.contacts-left,
.contacts-right {
  width: 50%;
}

.contacts-left {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.contacts-left p {
  font-weight: 400;
  padding-right: 20px;
  font-size: 35px;
  line-height: 40px;
  letter-spacing: 0.84px;
  color: #7d827f;
  margin: 0;
  padding: 0;
}

.contacts-left p a {
  color: #7d827f;
}

.contacts-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
  gap: 20px;
}

.contacts-right p {
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.84px;
  color: #7d827f;
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 1300px) {
  .contacts-left,
  .contacts-right {
    width: 100%;
  }

  .contacts-content {
    flex-direction: column;
    gap: 40px;
  }

  .contacts-right {
    text-align: left;
  }

  .contacts-left p {
    font-size: 32px;
  }

  .contacts-right p {
    font-size: 20px;
  }

  #contacts h2 {
    font-size: 34px;
  }
}
</style>
