import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import Home from "../views/Home.vue";
import Team from "../views/Team.vue";
import Statistical from "../views/Statistical.vue";
import We from "../views/We.vue";
import Login from "../views/Login.vue";
import AddSalesman from "../views/AddSalesman.vue";
import Pass from "../views/Pass.vue";
import Withdrawal from "../views/Withdrawal.vue";
import Branches from "../views/Branches.vue";
import CreateBranches from "../views/CreateBranches.vue";
import VipMembers from "../views/VipMembers.vue";
import BranchesDetails from "../views/BranchesDetails.vue";
import BranchDetails from "../views/BranchDetails.vue";
import AddEquipment from "../views/AddEquipment.vue";
import BranchesManagement from "../views/BranchesManagement.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/branches",
    name: "branches",
    component: Branches
  },
  {
    path: "/createBranches",
    name: "createBranches",
    component: CreateBranches
  },
  {
    path: "/vipMembers",
    name: "vipMembers",
    component: VipMembers
  },
  {
    path: "/branchesDetails",
    name: "branchesDetails",
    component: BranchesDetails
  },
  {
    path: "/branchDetails",
    name: "branchDetails",
    component: BranchDetails
  },
  {
    path: "/addEquipment",
    name: "addEquipment",
    component: AddEquipment
  },
  {
    path: "/branchesManagement",
    name: "branchesManagement",
    component: BranchesManagement
  },
  {
    path: "/team",
    name: "team",
    component: Team
  },
  {
    path: "/addSalesman",
    name: "addSalesman",
    component: AddSalesman
  },
  {
    path: "/statistical",
    name: "statistical",
    component: Statistical
  },
  {
    path: "/we",
    name: "we",
    component: We
  },
  {
    path: "/pass",
    name: "pass",
    component: Pass
  },
  {
    path: "/withdrawal",
    name: "withdrawal",
    component: Withdrawal
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, form, next) => {
  window.console.log(VueCookies.get("login"));
  if (to.path == "/" || to.path == "/login") {
    if (VueCookies.get("login") && VueCookies.get("login").userToken) {
      next("/home");
    } else {
      next();
    }
  } else if (VueCookies.get("login") && VueCookies.get("login").userToken) {
    next();
  } else {
    next("/");
  }
});

export default router;
