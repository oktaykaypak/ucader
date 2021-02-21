<template>
  <div id="container">
    <transition name="fade" mode="out-in">
      <div class="row">
        <div class="col-sm-12">
          <div class="row">
            <div class="col-sm-12 d-flex justify-content-end">
              <button class="btn btn-outline-success" @click="AddLesson()">
                <i class="ti-plus"></i>
              </button>
            </div>
          </div>
          <br />
          <div class="row" v-for="data in lessons" :key="data" :id="data._id">
            <div class="card col-sm-12">
              <div class="card-header h5">
                <div class="row">
                  <div class="col-sm-6">
                    <strong>{{ data.title }}</strong>
                  </div>
                  <div class="col-sm-6 d-flex justify-content-end">
                    <div
                      class="btn-group btn-group-sm"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-primary btn-sm fontSize"
                        @click="EditLesson(data._id)"
                      >
                        <i class="ti-pencil"></i>
                      </button>
                      <button
                        @click="DeleteLesson(data._id)"
                        type="button"
                        class="btn btn-secondary btn-sm fontSize"
                      >
                        <i class="ti-trash"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm fontSize"
                      >
                        <i class="ti-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <small> {{ data.desc }} </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import lessonService from "../service/lessonService";
import VueNotify from "vue-notifyjs";
import Vue from "vue";
import "vue-notifyjs/themes/default.css";
Vue.use(VueNotify);
export default {
  data() {
    return {
      lessons: [],
      newLessonsId: null,
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
    async EditLesson(id) {
      this.$router.push({
        path: "/admin/editlesson",
        query: { id: id },
      });
      console.log(id);
    },

    async DeleteLesson(id) {
      this.notifyVue("top", "right", "\n\r Eğitim Siliniyor !", "info");
      await lessonService.deleteLesson(id).then((res) => {
        if (res.status == 200) {
          this.notifyVue("top", "right", "\n\rİşlem Başarılı!", "success");
        }
      });
      window.location.reload(1);
    },

    async GetStatus() {
      this.lessons = await lessonService.getDataLessons();
      console.log(this.lessons);
    },
    async AddLesson() {
      await lessonService.addLesson().then((res) => {
        if (res.status === 200) {
          this.newLessonsId = res.data.id;
        }
      });
      this.$router.push({
        path: "/admin/addLesson",
        query: { id: this.newLessonsId },
      });
    },
  },
};
</script>

<style>
#container {
  padding: 15px;
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
.fontSize {
  font-size: 15px !important;
}
</style>