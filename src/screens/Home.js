import {PokeService} from "../services";
import CrudComponet from "../componets/crudComponet";
import {PokeTipes} from "../util/const";


export default function Home() {

    const lst = () => PokeService.consultar();
    const del = (i) => PokeService.eliminar(i);
    const upd = (n, id) => PokeService.actualizar(n, id);
    const cre = (n) => PokeService.crear(n);

    return (
        <CrudComponet
            consulta={lst}
            eliminar={del}
            editar={upd}
            crear={cre}
            columnas={[
                {
                    llave: 'name',
                    rules: [{
                        required: true,
                    }],
                    edit: true,
                    show: true,
                    number: false,
                    formPos: 1,
                },
                {
                    llave: 'image',
                    rules: [{
                        required: true,
                    }, {
                        type: "url",
                    }],
                    edit: true,
                    show: true,
                    number: false,
                    formPos: 3,
                },
                {
                    llave: 'attack',
                    rules: [{
                        required: true,
                    }],
                    edit: true,
                    show: true,
                    number: true,
                    formPos: 2,
                },
                {
                    llave: 'defense',
                    rules: [{
                        required: true,
                    }],
                    edit: true,
                    show: true,
                    number: true,
                    formPos: 4,
                },
                {
                    llave: 'hp',
                    rules: [{
                        required: true,
                    }],
                    edit: true,
                    show: false,
                    number: true,
                    formPos: 6,
                },
                {
                    llave: 'type',
                    rules: [{
                        required: true,
                    }],
                    edit: true,
                    show: false,
                    number: false,
                    formPos: 5,
                    combo: PokeTipes,
                }
            ]}
        />
    );
}
