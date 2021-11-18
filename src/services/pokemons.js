import api from "./api";

const PREFIJO = 'pokemons';

const PARAMTROS = {
    idAuthor: 2
}

class PokemonsService {

    consultar() {
        return api.get(PREFIJO, {
            params: PARAMTROS
        });
    }

    crear(formulario) {
        const data = {
            ...PARAMTROS,
            ...formulario,
        }
        return api.post(PREFIJO, data, {
            params: PARAMTROS
        });
    }

    consultarId(id) {
        return api.get(`${PREFIJO}/${id}`);
    }

    consultarNroReg(nrm) {
        return api.get(`${PREFIJO}/${nrm}`, {
            params: PARAMTROS
        });
    }

    actualizar(formulario, id) {
        const data = {
            ...PARAMTROS,
            ...formulario,
        };
        return api.put(`${PREFIJO}/${id}`, data);
    }

    eliminar(formulario) {
        const id = formulario.id;
        return api.delete(`${PREFIJO}/${id}`);
    }
}

export default new PokemonsService();
