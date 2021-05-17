import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            gender:['Male','Female'],
        countries:[],
        states:[],
        cities:[],
        stateCities:[],
        titles:[],
        maritalStatus:[],
        idCardType:[],
        socioProf:[]
        }
    },
    created(){
      this.fetchCountries();
      this.fetchStates();
      this.fetchCities();
      this.fetchTitles();
      this.fetchMaritalStatus();
      this.fetchCardType();
      this.fetchSocioProf();
    },
    computed:{
    ...mapGetters([ 'getUrl2' ])
    }, 
    methods: {
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
            console.log("result>>>",result.data)
              console.log("100");this.titles = result.data
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
