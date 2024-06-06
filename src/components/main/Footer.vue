<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-info footer-logo">
          <img src="../../assets/img/logo.png" alt="YourStart-up" />
        </div>
        <div class="footer-info chapter">
          <h3>Разделы</h3>
          <a href="#main">Главная</a>
          <a href="#about">О платформе</a>
          <a href="#about-project">О проекте</a>
          <a href="#apparel">АНО ДПО "Аппарель ИТ"</a>
          <a href="#contacts">Контакты</a>
        </div>
        <div class="footer-info information">
          <h3>Информация</h3>
          <!-- <a href="#">Частозадаваемые вопросы</a> -->
          <a href="http://shubizle11.beget.tech/for_abiturients"
            >Поступающему</a
          >
          <a href="http://shubizle11.beget.tech/for_workers">Вакансии</a>
          <a href="http://shubizle11.beget.tech/partners">Партнеры</a>
          <a href="http://shubizle11.beget.tech/study_program"
            >Программа обучения</a
          >
        </div>
      </div>
    </div>
    <div class="footer_contacts">
      <div class="container">
        <div class="footer_contacts-content">
          <div class="content">
            <p>{{ time }}</p>
            <p>{{ year }}</p>
          </div>
          <div class="content">
            <p>
              <a :href="'tel:' + phone">{{ phone }}</a>
            </p>
            <p>
              <a :href="'mailto:' + mail">{{ mail }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    phone: "",
    mail: "",
    time: "",
    year: "",
  },
};
</script>
<style scoped>
.footer-content {
  display: flex;
  justify-content: space-between;
}

.footer-content h3 {
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.84px;
  color: #1e1e1e;
}

.footer-content a {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.84px;
  color: #7d827f;
  margin-bottom: 20px;
}

.footer-content p {
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.84px;
  color: #7d827f;
}

.footer-logo img {
  object-fit: contain;
  width: 202px;
  height: 80px;
}

.footer-info {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.footer-info.mailing {
  width: 100%;
  max-width: 340px;
}

.mailing_inp {
  display: flex;
  width: 341px;
  border: 1px solid #1e1e1e;
}

.mailing_inp input {
  width: 100%;
  height: 100%;
  outline: 0;
  padding: 22px 32px;
  border: 0;
}

.mailing_inp-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #1e1e1e;
  padding: 22px 22px;
}

.footer_contacts-content {
  display: flex;
  justify-content: space-between;
}

.footer_contacts {
  border-top: 1px solid #d9d9d9;
}

.content {
  padding: 24px 0px;
  display: flex;
  flex-direction: row;
  gap: 60px;
}

.content p,
.content a {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #7d827f;
}

@media screen and (max-width: 1300px) {
  .footer-content {
    flex-direction: column;
    margin-bottom: 30px;
  }

  .mailing_inp {
    display: flex;
    width: 100%;
    border: 1px solid #1e1e1e;
  }

  .footer_contacts-content {
    flex-direction: column;
    padding-top: 15px;
  }
  .content {
    gap: 0;
    padding: 0;
    flex-direction: column;
  }

  .content p {
    padding: 0;
  }

  .footer-logo {
    margin-bottom: 30px;
  }
}
</style>
