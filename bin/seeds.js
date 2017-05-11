const mongoose = require('mongoose');
const Company = require('../models/company');

mongoose.connect("mongodb://localhost:27017/borderless");

let companies = [
{name: 'Tiendeo',
 type: 'ecommerce',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.1833513, 41.38065],
 icon: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAPqAAAAJGIwZmFhMjgzLWVlNDMtNDBlMi1hMjg3LTM3MDA4YzBmZDlkMA.png',
 website: 'https://www.tiendeo.com/',
 details: 'Perfil adecuado para Tiendeo, por experiencia, formación, competencias y habilidades, conocimientos de la tecnologías, superación de pruebas específicas.'
},

{name: 'Furgo',
 type: 'logistics',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.1635485, 41.3920533],
 icon: '',
 website: 'https://www.furgo.io/',
 details: 'Work experience in a specific field with scarcity locally'
},

{name: 'ClearPeaks',
 type: 'consultancy',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1635485, 41.396059],
 icon: '',
 website: 'https://www.clearpeaks.com/',
 details: ''
},

{name: 'ForceManager',
 type: 'saas',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1271933, 41.391067],
 icon: '',
 website: 'https://www.forcemanager.net/',
 details: ''
},

{name: 'Blueliv',
 type: 'cyber security',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'MID-LEVEL',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.1885423, 41.3960779],
 icon: '',
 website: 'https://www.blueliv.com/',
 details: 'Cultural fit, experience in information security field.'
},

{name: 'Qumram',
 type: 'saas',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'NONE',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'NONE',
 coordinates: [2.1885423, 41.3960779],
 icon: '',
 website: 'https://www.qumram.com/',
 details: 'Outstanding and exceptional skills related to Fintech and/or IT domains.'
},

{name: 'Roche',
 type: 'saas',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'NONE',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'NONE',
 coordinates: [2.1737834, 41.3821379],
 icon: '',
 website: 'https://www.roche.com/',
 details: 'Only for Project Lead & Department Lead in Software, Architecture.'
},

{name: 'Be4Talent',
 type: 'recruitment',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1397852, 41.3890202],
 icon: '',
 website: 'https://www.bet4talent.com/',
 details: 'Si pudiera permitirme contratar talento internacional sin pensar en que fuera o no extracomunicatorio, lo que más valoro es: expertís-seniority, experiencia en empresa relevante en el sector, actitud. Buscar al mejor, sin importar dónde esté localizado.'
},

{name: 'Photoslurp',
 type: 'photography',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1906478, 41.406269],
 icon: '',
 website: 'https://www.hi.photoslurp.com/',
 details: "If I'm going through the trouble of getting in someone from a foreign country, I would want them to be very senior, have a lot of experience in what I need and be able to communicate well in English. Additional points: 1. I do not know what is involved in the process of getting someone a visa. How much does it cost me ? How long will it take ? Is it even possible for me as a startup to do so ? From what our lawyers have told us when we tried to do this last year: the person needs to have at least a Masters degree or even a PhD with a high salary. The person we wanted to hire from Turkey had only a BSc and his salary was that of a junior developer - clearly not a good fit for an employment visa."
},

{name: 'Interficie',
 type: 'web development',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.1760347, 41.3840566],
 icon: '',
 website: 'https://www.interficie.com/',
 details: ""
},

{name: 'AncoraDual',
 type: 'saas',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'JUNIOR-LEVEL',
 mobiledeveloper: 'JUNIOR-LEVEL',
 uxdeveloper: 'JUNIOR-LEVEL',
 coordinates: [2.1607026, 41.3814458],
 icon: '',
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
