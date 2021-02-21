<template>
  <div id="container">
    <div class="row">
      <div class="col-sm-12 card-body card">
        *İlk Olarak kullanacağınız görselleri yükleyiniz. Yüklediğiniz
        görsellerin bağlantıları ilgili alanda görünecektir. <br />
        *Görsellerinizi yükledikten sonra İçerik bilgilerini doldurunuz.
        <br />
        *İçerik bilgilerini tamamladıktan sonra ilgili içeriğin yazılarını
        girmeniz gerekmektedir. <br />
        *Her yeni Sayfa için yeni sayfa butonuna tıklayın daha sonra içeriği
        tekrar girin. <br />
        *Tamamlandıktan sonra kaydet demeniz gerekmektedir. <br />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 card">
        <div class="row">
          <div class="col-sm-3 card-header h5">Görsel Yükleme</div>
          <div class="col-sm-9 card-header h5">Görsel Yükleme</div>
        </div>
        <div class="row">
          <div class="col-sm-1 card-body">
            <input
              type="file"
              ref="file"
              name="file"
              style="display: none"
              @change="onChange($event)"
              class="form-control"
            />
            <button
              class="btn btn-success"
              type="button"
              @click="$refs.file.click()"
            >
              Görsel Seçiniz
            </button>
          </div>
          <div class="col-sm-2 card-body">
            <button class="btn btn-success" type="button" @click="AddPhoto()">
              Yükle
            </button>
          </div>
          <div
            class="col-sm-9 card-body"
            style="flex-wrap: wrap"
            v-if="lessonData[0] != null"
          >
            <span
              class=""
              v-for="data in lessonData[0].picture"
              :key="data.picture"
            >
              <embed
                class="imgButton"
                :src="'http://localhost:5000/' + data"
                alt=""
                title="Kopyalamak için Tıkla"
                @click="copyImgLink(data)"
              />
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 card">
        <div class="row">
          <div class="col-sm-12 card-header h5">İçerik Bilgileri</div>
        </div>
        <br />
        <div class="row">
          <div class="col-sm-6 card-body">
            <div class="input-group mb-3 shadow-sm">
              <span class="input-group-text" id="basic-addon1">Başlık</span>
              <input
                type="text"
                class="form-control"
                style="border: 1px #ced4da solid !important; border-left: none"
                placeholder="Örn. Pet şişe ile araba"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="titleIn"
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group shadow-sm">
              <span class="input-group-text">Kazanımlar</span>
              <textarea
                class="form-control"
                style="
                  border: 1px #ced4da solid !important;
                  border-left: none;
                  height: 100px;
                "
                aria-label="With textarea"
                placeholder="Bu eğitimde öğrenciler neler öğrenecek"
                v-model="descIn"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 card">
        <div class="row">
          <div class="col-sm-12 card-header h5">İçerik</div>
        </div>
        <div class="row">
          <div class="col-sm-12 card-body">
            <addLessonText :lId="lessonId" :title="titleIn" :desc="descIn" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import addLessonText from "./addLessonText";
import lessonService from "../service/lessonService";
export default {
  components: {
    addLessonText,
  },
  data() {
    return {
      lessonId: "",
      lessonData: [],
      titleIn: null,
      descIn: null,
      product: { selectedImage: null },
    };
  },
  mounted() {
    this.GetStatus();
  },
  methods: {
     async notifyVue(verticalAlign, horizontalAlign, message, type) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message: message,
        icon: "fa fa-cogs",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type,
      });
    },
    async copyImgLink(text) {
      window.prompt(
        "Copy to clipboard: Ctrl+C, Enter",
        "http://localhost:5000/" + text
      );
    },
    async getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    async GetStatus() {
      this.lessonId = await this.getParameterByName("id");
      console.log(this.lessonId);

      this.lessonData = await lessonService.getData(this.lessonId);

      this.titleIn = this.lessonData[0].title;
      this.descIn = this.lessonData[0].desc;
    },
    onChange(e) {
      let file = e.target.files[0];
      this.product.selectedImage = URL.createObjectURL(file);

      this.file = this.$refs.file.files[0];
      let tmpNameFormat = this.file.name.split(".")[1];
      let tmpName = this.getUniqid(16);

      this.img_url = "api/uploads/" + tmpName + "." + tmpNameFormat;
      this.img_name = tmpName + "." + tmpNameFormat;
    },
    async AddPhoto() {
      this.notifyVue("top", "right", "\n\rGörsel Yükleniyor!", "info");
      if (this.file != null) {
        try {
          const formData = new FormData();
          formData.append("file", this.file);
          await axios
            .post(
              `http://localhost:5000/api/uploads/${this.img_name}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              if (res.status == 200) {
                this.notifyVue(
                  "top",
                  "right",
                  "\n\rİşlem Başarılı!",
                  "success"
                );
              }
            })
            .catch(function () {
              console.log("FAILURE!!");
            });

          await lessonService.addPhoto(this.lessonId, this.img_url);
          window.location.reload(1);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Lütfen Görsel Ekleyiniz.");
      }
    },
    getUniqid(length) {
      let result = "";
      //var characters = '0123456789';
      //var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 1; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>

<style>
#container {
  padding: 15px;
}
.formBorder {
  border: 1px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
  /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.imgButton {
  width: 280px;
  margin: 10px;
  border-radius: 10px;
  flex-wrap: wrap;
  transition-duration: 0.25s;
}

.imgButton:hover {
  transform: scale(1.1);
  transition-duration: 0.25s;
  cursor: pointer;
}
</style>