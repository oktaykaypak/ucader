<template>
  <div class="row">
    <div :class="isActive ? 'sideNav' : 'sideNav-hidden'" class="text-light">
      <div class="row">
        <div class="col-sm-12 h4">
          Üreten Çocuklar Akedemisi Eğitim Platformu
        </div>
      </div>
      <div v-if="lessons != null">
        <div
          :title="data.desc"
          class="row menuItems"
         
          v-for="data in lessons"
          :key="data"
        >
          <div class="col-sm-12" @click="RouteLesson(data._id)" >
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

    <div class="col-sm-12 lessonContent" v-if="title != null">
      <lessonContainer :title="title" :desc="desc" :Pages="Pages" />
    </div>
    <div class="col-sm-12 container lessonContent" v-else>
      Bu sayfa hoşgeldin sayfası olacak
    </div>
    <div
      :class="isActive ? 'menu-active' : 'menu-hidden'"
      class="menu"
      @click="Menu()"
    >
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
      isActive: false,
    };
  },
  mounted() {
    this.GetStatus();
  },
  methods: {
    RouteLesson(id) {
      this.$router.push({ path: "/lesson", query: { id: id } });
    },
    async Menu() {
      if (this.isActive == true) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
    async openLesson(id) {
      this.title = this.lessons[id].title;
      this.desc = this.lessons[id].desc;
      this.Pages = this.lessons[id].pages;
      console.log(this.title);
      this.isActive = false;
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
  width: 350px;
  padding: 15px;
  left: 0;
  height: 100%;
  position: absolute !important;
  transition-duration: 0.5s;
  z-index: 99;
}
.sideNav-hidden {
  background: #f1103a !important;
  text-align: end;
  width: 350px;
  padding: 0px;
  left: -350px;
  height: 100%;
  position: absolute !important;
  transition-duration: 0.5s;
  z-index: 99;
  overflow: hidden;
}
.menuItems {
  text-align: start;
  height: 40px;
  transition-duration: 0.25s;
  padding: 10px 15px;
  cursor: pointer;
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
  z-index: 999;
  cursor: pointer;
}
.menu-active {
  color: #f1103a;
  background: white;
  transition-duration: 0.5s;
}
.menu-hidden {
  color: white;
  background: #f1103a;
  transition-duration: 0.5s;
}
</style>