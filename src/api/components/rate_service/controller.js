const TABLA = {
    name: 'CalificacionesServicio',
    pk: 'id_calificacion_servicio',
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
        const calificacionServicio = {
            valor_calificacion: body.valor_calificacion,
            fecha_calificacion: body.fecha_calificacion,
            cc_ciudadano: body.cc_ciudadano,
        };

        if (body.accion == 'insert' && (!calificacionServicio.valor_calificacion || !calificacionServicio.fecha_calificacion || !calificacionServicio.cc_ciudadano)) {
            return Promise.reject('No se indico la información necesaria');
        } else if(body.accion == 'update' && body.id_calificacion_servicio) {
            calificacionServicio.id_calificacion_servicio = body.id_calificacion_servicio;
        }

        const response = await store.upsert(TABLA, calificacionServicio, body.accion);
        return response;
    }

    function remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id de la calificación del servicio');
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