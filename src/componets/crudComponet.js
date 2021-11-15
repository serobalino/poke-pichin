import {Button, Col, Input, Row} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Tabla from "./tabla";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import FormCrud from "./formCrud";
import PropTypes from "prop-types";

export default function CrudComponet(props) {
    const {consulta, crear, editar, eliminar, columnas, primaryLabel} = props;
    const {t} = useTranslation();

    const [buscar, setBuscar] = useState('');
    const [item, setItem] = useState(null);
    const [itemChange, setItemChange] = useState(null);

    const nuev = () => {
        setItem({});
    }

    const edit = (item) => {
        setItem(item);
    }


    return (
        <div>
            <Row>
                <Col span={24}>
                    <h3>{t('listado')}</h3>
                </Col>
            </Row>
            <Row justify="center" gutter={[16, 16]}>
                <Col md={{span: 6}} sm={{span: 12}}>
                    <Input
                        placeholder={t('search')}
                        prefix={<SearchOutlined/>}
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                    />
                </Col>
                <Col md={{span: 3, offset: 15}} sm={{span: 12, offset: 0}}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        block
                        onClick={() => nuev()}
                    >Nuevo</Button>
                </Col>
                <Col span={24}>
                    <Tabla
                        textFiltrar={buscar}
                        consulta={consulta}
                        eliminar={eliminar}
                        editar={editar}
                        onEdit={edit}
                        columnas={columnas}
                        primaryLabel={primaryLabel}
                        itemChange={itemChange}
                    />
                </Col>
                <Col span={24}>
                    <FormCrud
                        item={item}
                        primaryLabel={primaryLabel}
                        columnas={columnas}
                        crear={crear}
                        editar={editar}
                        change={(value) => setItemChange(value)}
                        clearVar={() => setItem(null)}
                    />
                </Col>
            </Row>
        </div>
    );
}
CrudComponet.prototype = {
    consulta: PropTypes.func,
    editar: PropTypes.func,
    eliminar: PropTypes.func,
    crear: PropTypes.func,
    columnas: PropTypes.array,
    textFiltrar: PropTypes.string,
    primaryLabel: PropTypes.string,
}
CrudComponet.defaultProps = {
    columnas: [],
    textFiltrar: '',
    primaryLabel: 'name',
}
