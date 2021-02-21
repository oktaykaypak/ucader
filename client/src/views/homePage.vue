<template>
  <div class="row">
    <div class="col-sm-2 sideNav text-light">
      <div class="row">
        <div class="col-sm-12 h3">
          Üreten Çocuklar Akedemisi Eğitim Platformu
        </div>
      </div>
      <div v-if="lessons != null">
        <div
          :title="data.desc"
          class="row menuItems"
          @click="openLesson(i)"
          v-for="(data, i) in lessons"
          :key="data"
        >
          <div class="col-sm-12">
            <div class="row">
              <div class="col-sm-1">
                <i class="ti-folder"></i>
              </div>
              <div class="col-sm-9">{{ data.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-10 lessonContent" v-if="title != null">
      <lessonContainer :title="title" :desc="desc" :Pages="Pages" />
    </div>
    <div class="col-sm-10 lessonContent" v-else>
      Bu sayfa hoşgeldin sayfası olacak
    </div>
    <div class="menu  menu-active">
  <i class="fa fa-bars"></i>
    </div>
  </div>
</template>

<script>
import lessonContainer from "./lessonContainer";
import lessonService from "../service/lessonService";
export default {
  components: {
    lessonContainer,
  },
  data() {
    return {
      lessons: [],
      title: null,
      desc: null,
      Pages: [],
    };
  },
  mounted() {
    this.GetStatus();
  },
  methods: {
    async openLesson(id) {
      this.title = this.lessons[id].title;
      this.desc = this.lessons[id].desc;
      this.Pages = this.lessons[id].pages;
      console.log(this.title);
    },
    async GetStatus() {
      this.lessons = await lessonService.getDataLessons();
      console.log(this.lessons);
    },
  },
};
</script>

<style>
.sideNav {
  background: #f1103a !important;

  text-align: end;
  height: 100%;
  position: fixed !important;
}
.menuItems {
  text-align: start;
  height: 40px;
  transition-duration: 0.25s;
  padding: 10px 15px;
}
.menuItems:hover {
  text-align: start;
  background: #d60f34 !important;
  transition-duration: 0.25s;
}
.lessonContent {
  margin-top: 30px;
  max-width: 1170px;
  padding: 15px 0;
  position: fixed !important;
  right: 0;
}
.menu {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.menu-active {
  color: #f1103a;
  background: white;
}
.menu-hidden{
    color:white;
  background: #f1103a
}
</style>