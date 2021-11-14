import api from "./api";

const PREFIJO = 'pokemons';

const PARAMTROS = {
    idAuthor: 1
}

class PokemonsService {

    consultar() {
        return api.get(PREFIJO,{
            params: PARAMTROS
        });
    }

    crear(formulario) {
        const data = {

        }
        return api.post(PREFIJO, data,{
            params: PARAMTROS
        });
    }

    consultarId(id) {
        return api.get(`${PREFIJO}/${id}`);
    }

    consultarNroReg(nrm) {
        return api.get(`${PREFIJO}/${nrm}`,{
            params: PARAMTROS
        });
    }

    actualizar(formulario) {
        const id = formulario.id;
        const data = {

        };
        return api.put(`${PREFIJO}/${id}`,data);
    }

    eliminar(formulario) {
        const id = formulario.id;
        return api.delete(`${PREFIJO}/${id}`);
    }
}

export default new PokemonsService();
