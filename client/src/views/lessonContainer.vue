<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="content" v-html="pageData"></div>
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
  </div>
</template>

<script>
export default {
  name: "lessonContainer",
  props: {
    title: String,
    desc: String,
    Pages: Array,
  },
  data() {
    return {
      activePage: 0,
      pageData: null,
    };
  },
  mounted() {
    this.GetPageData(0);
  },
  methods: {
    async GetPageData(id) {
      this.pageData = this.Pages[id];
      this.activePage = id;
    },
    async NextPageData() {
      console.log(this.Pages.length);
      if (this.activePage != this.Pages.length - 1) {
        this.activePage += 1;
        this.pageData = this.Pages[this.activePage];
      }
    },
    async PrewPageData() {
      if (this.activePage != 0) {
        this.activePage -= 1;
        this.pageData = this.Pages[this.activePage];
      }
    },
  },
};
</script>

<style>
.lessonButtonsGroup {
  position: fixed;
  bottom: 10px;
  left: 10px;
}.btnsColor{
   background: #f1103a !important;
   border: solid #f1103a !important;
}.btnsColor:hover{
   background:  #d60f34 !important;;
   border: solid #d60f34 !important;
}
.btnsColor:focus{
   background:  #d60f34 !important;;
   border: solid #d60f34 !important;
}.btnsColor:active{
   background:  #d60f34 !important;;
   border: solid #d60f34 !important;
}
</style>