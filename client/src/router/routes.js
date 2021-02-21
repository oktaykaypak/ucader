import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import logindash from "@/layout/dashboard/logindash.vue";

// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import addLesson from "@/views/addLesson.vue";
import listLesson from "@/views/listLesson.vue";
import editLesson from "@/views/editLesson.vue";
import homePage from "@/views/homePage.vue";

const routes = [
  {


    path: "/admin",
    component: DashboardLayout,
    redirect: "admin/listLesson",
    children: [
      {
        path: "/admin/listLesson",
        name: "Eğitimler",
        component: listLesson,
        
      },
      {
        path: "/admin/addLesson",
        name: "Ders Ekle",
        component: addLesson,
      },{
        path: "/admin/editLesson",
        name: "Ders Düzenle",
        component: editLesson,
      },
      {
        path: "/admin/stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "/admin/notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "/admin/icons",
        name: "icons",
        component: Icons
      },
      {
        path: "/admin/maps",
        name: "maps",
        component: Maps
      },
      {
        path: "/admin/typography",
        name: "typography",
        component: Typography
      },
      {
        path: "/admin/table-list",
        name: "table-list",
        component: TableList
      }
    ]
  }, 
  
  {
    path: "/",
    component: logindash,
    children: [
      {
        path: "/",
        name: "Home Page",
        component: homePage
      }]
  },

  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
