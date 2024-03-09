const {model,Schema} = require('mongoose')

const SesionesSchema = Schema({
    asn:{
        ips:String,
        ips_ipAddress:String,
        ips_network:String
    },
    ubicaciones:{
        isocode: String,
        pais: String,
        provincia: String,
        isocodeprovincia:String,
        lat: String,
        lon: String,
        localidad: String,
        postal: String,
        continentecodigo: String,
        continente:String
    },
    browser: String,
    ip: String,
    plataforma:String,
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:false

    },
})


module.exports = model('Sesiones',SesionesSchema)