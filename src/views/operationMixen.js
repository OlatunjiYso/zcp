import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
           message:"Hii",
        gender:[{code:'M',name:'Male'},{code:'F',name:'Female'}],
        countries:[],
        states:[],
        cities:[],
        stateCities:[],
        titles:[],
        maritalStatus:[],
        idCardType:[],
        socioProf:[],
        cardSetup:[],
        reasons:[],
        branches:[]
        }
    },
    async created(){
      console.log("created")
       this.getBranch()
       this.fetchReason();
      this.fetchCountries();
      this.fetchStates();
      this.fetchCities();
      this.fetchTitles();
      this.fetchMaritalStatus();
      this.fetchCardType();
      this.fetchSocioProf();
      this.fetchReason();
      // this.getCardSetup();
    },
    computed:{
    ...mapGetters([ 'getUrl','getUrl2','getPermissions','getAdminPermissions'])
    }, 
    methods: {
      checkPermAdmin(result){
         const response = this.getAdminPermissions.some( x=>{ return x.name == result })
         return response 
      },
    checkPerm(result){
      const response = this.getPermissions.some( x=>{ return x.name == result })
      return response 
     },
      // async getCardSetup(){
      //    const result = await axios.get(this.getUrl + 'api/CardProductSetup/FetchCardProductCodeForsetup')
      //     this.cardSetup = result.data
      //  },
      async getBranch(){
         const result = await axios.get(this.getUrl2 + 'api/Common/Branch')
         this.branches = result.data
  },
      async fetchReason(){
         const result = await axios.get(this.getUrl2 + 'api/CardReissue/reissuereason')
         this.reasons = result.data
      },
        async fetchCountries(){
           const result = await axios.get(this.getUrl2 + 'api/Common/countries')
           this.countries = result.data
        },
        async fetchStates(){
             const result = await axios.get(this.getUrl2 + 'api/Common/states')
             this.states = result.data
          },
          async fetchCities(){
             const result = await axios.get(this.getUrl2 + 'api/Common/cities')
             this.cities = result.data
          },
          async fetchStateCities(code){
            this.loader = true;
             const result = await axios.get(this.getUrl2 + 'api/Common/cities/' + code.target.value)
             this.loader = false;
             this.stateCities = result.data
          },
          async fetchTitles(){
             const result = await axios.get(this.getUrl2 + 'api/Common/titles')
              this.titles = result.data
          },
          async fetchMaritalStatus(){
             const result = await axios.get(this.getUrl2 + 'api/Common/martialstatus')
             this.maritalStatus = result.data
          },
          async fetchCardType(){
             const result = await axios.get(this.getUrl2 + 'api/Common/idcardtype')
             this.idCardType = result.data
          },
          async fetchSocioProf(){
             const result = await axios.get(this.getUrl2 + 'api/Common/SocioProf')
             this.socioProf = result.data
          },
    },
  }
