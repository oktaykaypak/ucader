<template>
  <div class="container">
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
         
          v-for="(data,i) in Pages"
          :key="data"
        >
          <div class="col-sm-12" @click="GetPageData(i)" >
            <div class="row">
              <div class="col-sm-1">
                <i class="ti-folder"></i>
              </div>
              <div class="col-sm-9">{{ i }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div v-html="rawData"></div>

      </div>
    </div>
    <div class="lessonButtonsGroup">
      <div
        class="btn-group btn-group-sm "
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          class="btn btn-primary btn-sm fontSize btnsColor"
          @click="PrewPageData()"
        >
          <i class="ti-angle-double-left"></i>
        </button>
        <button
          v-for="(data, i) in Pages"
          :key="data"
          type="button"
          class="btn btn-primary btn-sm fontSize btnsColor"
          @click="GetPageData(i)"
        >
          <i class="fontSize">{{ i + 1 }}</i>
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm fontSize btnsColor"
          @click="NextPageData()"
        >
          <i class="ti-angle-double-right"></i>
        </button>
      </div>
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
import lessonService from "../service/lessonService";
export default {
  data() {
    return {
      lessons:null,
      rawData:null,
      Pages:null,
      activePage:0,
      isActive:false
    };
  },
    mounted() {
    
    this.GetStatus(this.$route.query.id);
  },
  methods: {
     async Menu() {
      if (this.isActive == true) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
    async GetStatus(id) {
      this.lessons = await lessonService.getData(id);
      this.Pages=this.lessons[0].pages
  
      this.rawData=this.lessons[0].pages[0]
      
      console.log(this.lessons);
    },
    async GetPageData(id) {
     
      this.rawData=this.lessons[0].pages[id]
      this.activePage=id
      console.log(this.lessons);
    },
     async NextPageData() {
      console.log(this.Pages.length);
      if (this.activePage != this.Pages.length - 1) {
        this.activePage += 1;
        this.rawData = this.Pages[this.activePage];
      }
    },
    async PrewPageData() {
      if (this.activePage != 0) {
        this.activePage -= 1;
        this.rawData = this.Pages[this.activePage];
      }
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