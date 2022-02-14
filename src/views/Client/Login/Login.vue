<template>
  <Loader v-show="loader" />
  <Status
    :state="state"
    :message="message"
    :resetState="resetState"
    v-if="status"
  />
  <div class="app-login-section">
    <div class="app-login-col-1">
      <div class="app-login-bg-cover">
        <div class="app-login-logo">
          <img
            src="../../../assets/images/logo-colored.svg"
            loading="lazy"
            width="120"
            alt=""
            class="app-logo-img"
          />
        </div>
      </div>
    </div>
    <div class="app-login-col-2">
      <h2 class="login-header">Welcome</h2>
      <div class="login-sub">
        Kindly fill in your credentials to login into your account.
      </div>
      <div>
        <form @submit.prevent="testLogin80_25">
          <div class="app-login-form-group">
            <label for="Email-address" class="login-label">User Name</label>
            <input
              v-model="form.userName"
              type="text"
              class="app-login-text-field w-input"
              placeholder="username"
              required
            />
          </div>
          <div class="app-login-form-group">
            <label for="password" class="login-label">Pin & Token</label>
            <input
              v-model="form.password"
              type="password"
              class="app-login-text-field w-input"
              placeholder="xxxxxxxxxxxxx"
              required
            />
          </div>
          <button
            type="submit"
            class="app-login-button"
            :disabled="this.isAttemptingLogin"
          >
            {{
              this.isAttemptingLogin
                ? "Logging you in ..."
                : "Login into Account"
            }}
          </button>
        </form>
      </div>
      <div class="app-login-divider"></div>
      <div class="app-login-notice">
        <div class="app-login-notice-col-1"></div>
        <div class="app-login-notice-col-2">
          Experiencing any problem with loging into your account ? Kindly
          contact the super admin to help resolve your issues.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Loader from "../../../components/Loader/Loader";
import Status from "../../../components/Status/Status2";
export default {
  props: ["closeAdd"],
  components: {
    Loader,
    Status,
  },
  data() {
    return {
      isAttemptingLogin: false,
      loader: false,
      status: false,
      state: null,
      message: null,
      roles: ["Super Admin", "Admin", "Support"],
      activityArray: [],
      form: {
        userName: "",
        password: "",
      },
      token: "",
    };
  },
  computed: {
    ...mapGetters(["getUrl", "getRoles"]),
  },
  methods: {
    resetState() {
      this.status = false;
    },
    GenerateToken(length) {
      var result = [];
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      this.token = result.join("");
      return result.join("");
    },
    testLogin() {
      const d1 = new Date();
      const d2 = new Date(d1);

      d2.setMinutes(d1.getMinutes() + 2);

      let testData = {
        responseCode: "00",
        responseMessage: "00-Success",
        id: 15,
        companyId: 2,
        firstName: "Olatunji",
        lastName: "Yusuf",
        emailAddress: "olatunjiyso@gmail.com",
        userName: "Olatunji",
        mobileNo: "2348034747769",
        rolesId: 31,
        roleType: "MFB",
        isActive: true,
        permissions: [
          { name: "Make_Requests" },
          { name: "Activity_Requests" },
          {
            id: 19,
            mfbOrBank: null,
            name: "Mfb_User_Management",
            description: "manage users",
            isActive: true,
            created_at: "2021-06-11T14:34:28.6079583+01:00",
          },
          {
            id: 17,
            mfbOrBank: null,
            name: "Card_Status",
            description: "check a card status",
            isActive: true,
            created_at: "2021-06-11T14:34:28.6434479+01:00",
          },
        ],
      };

      this.GenerateToken(50);
      localStorage.setItem("et", d2);
      localStorage.setItem("token-mfb", this.token);
      localStorage.setItem("user-mfb", JSON.stringify(testData));
      window.location = "client/activity-form/1";
    },
    testLogin80_25() {
      const d1 = new Date();
      const d2 = new Date(d1);

      d2.setMinutes(d1.getMinutes() + 2);

      let testData = {
        responseCode: "00",
        responseMessage: "00-Success",
        id: 10001,
        companyId: 2,
        firstName: "Olatunji",
        lastName: "Yusuf",
        emailAddress: "olatunji.yusuf@zenithbank.com",
        userName: "Olatunji",
        mobileNo: "2348034747769",
        rolesId: 32,
        roleType: "MFB",
        isActive: true,
        permissions: [
          { name: "Make_Requests" },
          { name: "Activity_Requests" },
          {
            id: 19,
            mfbOrBank: null,
            name: "Mfb_User_Management",
            description: "manage users",
            isActive: true,
            created_at: "2021-06-11T14:34:28.6079583+01:00",
          },
          {
            id: 17,
            mfbOrBank: null,
            name: "Card_Status",
            description: "check a card status",
            isActive: true,
            created_at: "2021-06-11T14:34:28.6434479+01:00",
          },
        ],
      };

      this.GenerateToken(50);
      localStorage.setItem("et", d2);
      localStorage.setItem("token-mfb", this.token);
      localStorage.setItem("user-mfb", JSON.stringify(testData));
      window.location = "client/activity-form/1";
    },
    async Login() {
      this.GenerateToken(50);
      this.loader = true;
      this.isAttemptingLogin = true;
      const formData = {
        userName: this.form.userName,
        password: this.form.password,
      };

      const d1 = new Date();
      const d2 = new Date(d1);
      d2.setHours(d1.getHours() + 2); //two hour from now
      try {
        const response = await axios.post(
          this.getUrl + "api/Login/companylogin",
          formData
        );
        if (response.status == 200 && response.data.userName != null) {
          localStorage.setItem("et", d2);
          await localStorage.setItem("token-mfb", this.token);
          await localStorage.setItem("user-mfb", JSON.stringify(response.data));

          this.loader = false;
          this.isAttemptingLogin = true;
          window.location = "/client/overview";
        } else {
          this.isAttemptingLogin = false;
          this.loader = false;
          this.status = true;
          this.state = "failed";
          this.message = "Invalid Credentials";
        }
      } catch (error) {
        console.log(error);
        this.isAttemptingLogin = false;
        this.loader = false;
        this.status = true;
        this.state = "failed";
        this.message = "System Error";
      }
    },
  },
};
</script>

<style>
</style>