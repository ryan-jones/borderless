const mongoose = require('mongoose');
const Company = require('../models/company');

mongoose.connect("mongodb://localhost:27017/borderless");

let companies = [
 // {name: 'Travel Perk',
 //  description: 'yes',
 //  city: 'Barcelona',
 //  coordinates: [2.154306, 41.396874],
 //  icon: '',
 //  type: 'travel',
 //  website: 'http://travelperk.com/'
 // },
 // {name: 'Skyscanner',
 //  description: 'yes',
 //  city: 'Barcelona',
 //  coordinates: [2.169416, 41.386005],
 //  icon: '',
 //  type: 'travel',
 //  website: 'https://www.skyscanner.net/',
 // },
 // {name: 'Frame 25',
 //  description: 'yes',
 //  city: 'Madrid',
 //  coordinates: [-3.673085, 40.417115],
 //  icon: '',
 //  type: 'recruitment',
 //  website: 'https://www.frame-25.com/',
 //  },

{name: 'Tiendeo',
 description: 'yes',
 position: ['Senior Web Developer', 'Senior Mobile Developer', 'Senior UX/UI Developer'],
 city: 'Barcelona',
 coordinates: [2.1833513, 41.38065],
 icon: '',
 type: 'ecommerce',
 website: 'https://www.tiendeo.com/',
 details: 'Perfil adecuado para Tiendeo, por experiencia, formación, competencias y habilidades, conocimientos de la tecnologías, superación de pruebas específicas.'
},

{name: 'Furgo',
 description: 'yes',
 position: ['Senior Web Developer', 'Senior Mobile Developer', 'Senior UX/UI Developer'],
 city: 'Barcelona',
 coordinates: [2.1635485, 41.3920533],
 icon: '',
 type: 'logistics',
 website: 'https://www.furgo.io/',
 details: 'Work experience in a specific field with scarcity locally'
},

{name: 'ClearPeaks',
 description: 'no',
 position: [],
 city: 'Barcelona',
 coordinates: [2.1635485, 41.396059],
 icon: '',
 type: 'consultancy',
 website: 'https://www.clearpeaks.com/',
 details: ''
},

{name: 'ForceManager',
 description: 'no',
 position: [],
 city: 'Barcelona',
 coordinates: [2.1271933, 41.391067],
 icon: '',
 type: 'saas',
 website: 'https://www.forcemanager.net/',
 details: ''
},

{name: 'Blueliv',
 description: 'yes',
 position: ['Mid-level Web Developer', 'Mid-level Mobile Developer', 'Mid-level UX/UI Developer', 'Senior Web Developer', 'Senior Mobile Developer', 'Senior UX/UI Developer'],
 city: 'Barcelona',
 coordinates: [2.1885423, 41.3960779],
 icon: '',
 type: 'cyber security',
 website: 'https://www.blueliv.com/',
 details: 'Cultural fit, experience in information security field.'
},

{name: 'Qumram',
 description: 'yes',
 position: [ 'Senior Mobile Developer'],
 city: 'Barcelona',
 coordinates: [2.1885423, 41.3960779],
 icon: '',
 type: 'saas',
 website: 'https://www.qumram.com/',
 details: 'Outstanding and exceptional skills related to Fintech and/or IT domains.'
},

{name: 'Roche',
 description: 'yes',
 position: [ 'Senior Mobile Developer'],
 city: 'Barcelona',
 coordinates: [2.1737834, 41.3821379],
 icon: '',
 type: 'saas',
 website: 'https://www.roche.com/',
 details: 'Only for Project Lead & Department Lead in Software, Architecture.'
},

{name: 'Be4Talent',
 description: 'no',
 position: [ ''],
 city: 'Barcelona',
 coordinates: [2.1397852, 41.3890202],
 icon: '',
 type: 'recruitment',
 website: 'https://www.bet4talent.com/',
 details: 'Si pudiera permitirme contratar talento internacional sin pensar en que fuera o no extracomunicatorio, lo que más valoro es: expertís-seniority, experiencia en empresa relevante en el sector, actitud. Buscar al mejor, sin importar dónde esté localizado.'
},

{name: 'Photoslurp',
 description: 'yes',
 position: [ 'Senior Web Developer'],
 city: 'Barcelona',
 coordinates: [2.1906478, 41.406269],
 icon: '',
 type: 'photography',
 website: 'https://www.hi.photoslurp.com/',
 details: "If I'm going through the trouble of getting in someone from a foreign country, I would want them to be very senior, have a lot of experience in what I need and be able to communicate well in English. Additional points: 1. I do not know what is involved in the process of getting someone a visa. How much does it cost me ? How long will it take ? Is it even possible for me as a startup to do so ? From what our lawyers have told us when we tried to do this last year: the person needs to have at least a Masters degree or even a PhD with a high salary. The person we wanted to hire from Turkey had only a BSc and his salary was that of a junior developer - clearly not a good fit for an employment visa."
},

{name: 'Interficie',
 description: 'yes',
 position: [ 'Mid-level Web Developer', 'Mid-level UX/UI Developer'],
 city: 'Barcelona',
 coordinates: [2.1760347, 41.3840566],
 icon: '',
 type: 'web development',
 website: 'https://www.interficie.com/',
 details: ""
},

{name: 'AncoraDual',
 description: 'yes',
 position: [ 'Junior Web Developer', 'Junior Mobile Developer', 'Junior UX/UI Developer', 'Mid-level Web Developer', 'Mid-level Mobile Developer', 'Mid-level UX/UI Developer', 'Senior Web Developer', 'Senior Mobile Developer', 'Senior UX/UI Developer'],
 city: 'Barcelona',
 coordinates: [2.1607026, 41.3814458],
 icon: '',
 type: 'saas',
 website: 'https://www.ancoradual.com/',
 details: "ahora mismo no sabría decir"
},

]// Iteration #1

Company.create(companies, (err, docs)=> {
 if(err) { throw err}
 docs.forEach((company) => {
   console.log(company.name);
});

mongoose.connection.close();

});
