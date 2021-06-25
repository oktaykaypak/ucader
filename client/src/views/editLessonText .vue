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
      <div class="col-sm-6">
        <div
          class="btn-group btn-group-sm"
          role="group"
          aria-label="Basic example"
        >
          <button
            v-for="(data, i) in lessonPageData"
            :key="data"
            type="button"
            class="btn btn-primary btn-sm fontSize"
            @click="getLessonData(i)"
          >
            <i class="fontSize">{{ i + 1 }}</i>
          </button>
        </div>
      </div>
      <div class="col-sm-6 d-flex justify-content-end">
        <div class="row">
          <div class="px-1">
            <button class="btn btn-warning" @click="editPage()">Düzenle</button>
          </div>
          <!-- <div class="px-1">
            <button class="btn btn-info" @click="addPage()">Yeni Sayfa</button>
          </div> -->
          <div class="px-5">
            <button class="btn btn-success" @click="save()">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueNotify from "vue-notifyjs";
import "vue-notifyjs/themes/default.css";

import axios from "axios";
import lessonService from "../service/lessonService";
import ckeditor from "ckeditor4-vue";
import Vue from "vue";
Vue.use(ckeditor);
Vue.use(VueNotify);

export default {
  name: "editLessonText",
  props: {
    title: String,
    desc: String,
    lId: String,
    lessonPageData: Array,
  },
  components: {},
  mounted() {
    this.getLessonData(0);
  },
  data() {
    return {
      lessons: [],
      editorData: null,
      pageName: null,
      type: ["info", "success", "warning", "danger"],
      pageId: null,
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
    async getLessonData(id) {
      this.editorData = this.lessonPageData[id].data;
      this.pageName = this.lessonPageData[id].pageName;
      this.pageId = id;
    },
    async GetStatus() {
      this.lessons = await lessonService.getData(this.lId);
    },
    async save() {
      this.notifyVue("top", "right", "\n\rDüzenleme işlemi başladı!", "info");

      await lessonService
        .addLessonData(this.lId, this.title, this.desc)
        .then((res) => {
          if (res.status == 200) {
            this.notifyVue("top", "right", "\n\rİşlem Başarılı!", "success");
          }
        });

      this.$router.push("/admin/listlesson");
    },
    async editPage() {
      this.notifyVue("top", "right", "\n\rDüzenleme işlemi başladı!", "info");

      await lessonService
        .editLessonPage(this.lId, this.pageId, this.editorData, this.pageName)
        .then((res) => {
          if (res.status == 200) {
            this.notifyVue("top", "right", "\n\rİşlem Başarılı!", "success");
            this.GetStatus(this.lId);
          }
        });
    },
    async addPage() {
      this.notifyVue("top", "right", "\n\rDüzenleme işlemi başladı!", "info");

      await lessonService
        .addLessonPage(this.lId, this.editorData, this.pageName)
        .then((res) => {
          if (res.status == 200) {
            this.notifyVue("top", "right", "\n\rİşlem Başarılı!", "success");
            this.GetStatus(this.lId);
          }
        });
      this.editorData = "";
      this.pageName = "";
    },
  },
};
</script>

<style>
.fontSize {
  font-size: 12px !important;
}
</style>