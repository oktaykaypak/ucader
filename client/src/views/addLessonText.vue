<template>
  <div class="" id="Ck">
    <div class="row">
      <div class="col-12">
          <div class="input-group mb-3 shadow-sm">
              <span class="input-group-text" id="basic-addon1">Sayfa Başlığı</span>
              <input
                type="text"
                class="form-control"
                style="border: 1px #ced4da solid !important; border-left: none"
                placeholder="Örn. Aracımıcı Boyayalım"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="pageName"
              />
            </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <ckeditor :config="editorConfig" v-model="editorData"></ckeditor>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12 d-flex justify-content-end">
        <div class="row">
          <div class="col-sm-5">
            <button class="btn btn-success" @click="save()">Kaydet</button>
          </div>
          <div class="col-sm-7">
            <button class="btn btn-warning" @click="addPage()">
              Yeni Sayfa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lessonService from "../service/lessonService";
import ckeditor from "ckeditor4-vue";
import Vue from "vue";
import VueNotify from "vue-notifyjs";
import "vue-notifyjs/themes/default.css";
Vue.use(VueNotify);
Vue.use(ckeditor);

export default {
  name: "addLessonText",
  props: {
    title: String,
    desc: String,
    lId: String,
  },
  components: {},
  data() {
    return {
      editorData:
        "<p>Bu alana sayfada gösterilecek olan tüm dokümanları tasarlamalısınız.</p>",

      editorConfig: {
        height: 400,
        language: "tr",
        embed_provider:
          "//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}",
        extraPlugins:
          "embed,autoembed,image2,colorbutton,font,justify,print,tableresize,pastefromword,liststyle,pagebreak,codesnippet",
      },
    };
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
    async save() {
      this.notifyVue("top", "right", "\n\r Sayfa kaydediliyor !", "info");
      await lessonService
        .addLessonData(this.lId, this.title, this.desc)
        .then((res) => {
          if (res.status == 200) {
            this.notifyVue("top", "right", "\n\rİşlem Başarılı!", "success");
          }
        });
      this.$router.push("/admin/listlesson");
    },
    async addPage() {
      this.notifyVue(
        "top",
        "right",
        "\n\r Sayfa veri tabanına kaydediliyor !",
        "info"
      );
      await lessonService
        .addLessonPage(this.lId, this.editorData)
        .then((res) => {
          if (res.status == 200) {
            this.notifyVue("top", "right", "\n\rİşlem Başarılı!", "success");
          }
        });
      this.editorData = "";
    },
  },
};
</script>

<style>
</style>