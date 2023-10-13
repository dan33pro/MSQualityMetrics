const TABLA = {
    name: 'CalificarConductores',
    pk: 'id_calificacion_conductor',
};

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../tools/store/mysql');
    }
    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const calificacionConductor = {
            valor_calificacion: body.valor_calificacion,
            fecha_calificacion: body.fecha_calificacion,
            cc_conductor: body.cc_conductor,
            cc_ciudadano: body.cc_ciudadano,
        };

        if (body.accion == 'insert' && (!calificacionConductor.valor_calificacion || !calificacionConductor.fecha_calificacion || !calificacionConductor.cc_conductor || !calificacionConductor.cc_ciudadano)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_calificacion_conductor) {
            calificacionConductor.id_calificacion_conductor = body.id_calificacion_conductor;
        }

        const response = await store.upsert(TABLA, calificacionConductor, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la calificación del conductor');
        }
        return store.remove(TABLA, id);
    }

    function findByquery(key, value) {
        let query = {};
        query[key] = value;
        return store.query(TABLA, query);
    }

    return {
        list,
        get,
        upsert,
        remove,
        findByquery,
    };
};