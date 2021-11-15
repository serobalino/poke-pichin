import {useEffect, useState} from "react";
import {Avatar, Button, Image, notification, Popconfirm, Space, Table} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export default function Tabla(props) {
    const {consulta, editar, eliminar, columnas, textFiltrar, primaryLabel, onEdit, itemChange} = props;
    const {t} = useTranslation();

    const [data, setData] = useState([]);
    const [filtradas, setFiltradas] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDel, setLoadingDel] = useState(false);

    // const sorterAlp = (a, b) => (isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b);
    // const sorterNum = (a, b) => (parseFloat(a) - parseFloat(b));


    const confirmDelete = (item) => {
        setLoadingDel(true);
        eliminar(item).then(() => {
            consultaAPI()
            notification.success({
                message: t('tabla.exito'),
                description: item[primaryLabel] + t('tabla.eliminado'),
            });
            setLoadingDel(false);
        }).catch(() => {
            setLoadingDel(false);
        });
    }


    const consultaAPI = async () => {
        setLoading(true);
        await consulta().then((response) => {
            setData(response);
            setLoading(false);
        }).catch(() => {
            setData([]);
            setLoading(false);
        });
    }

    const filtro = () => {
        const filterTable = data.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(textFiltrar.toLowerCase())
            )
        );
        setFiltradas(filterTable);
    };

    const actionsColum = (record) => (
        <Space size="middle">
            {!!editar &&
            <Button
                type="link"
                icon={<EditOutlined/>}
                onClick={() => onEdit(record)}
            />}
            {!!eliminar &&
            <Popconfirm
                title={t('tabla.confirmar') + record[primaryLabel]}
                onConfirm={() => confirmDelete(record)}
                okText={t('tabla.si')}
                cancelText={t('tabla.no')}
            >
                <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined/>}
                    loading={loadingDel}
                />
            </Popconfirm>}
        </Space>
    )

    const imageColum = (item) => (
        <Space size="middle">
            <Avatar size="small" src={
                <Image
                    src={item}
                    style={{
                        width: 40,
                    }}
                />
            }/>
        </Space>
    )

    useEffect(() => {
        filtro();
    }, [textFiltrar, data])

    useEffect(() => {
        if (itemChange?.id) {
            const index = data.findIndex(i => i.id === itemChange.id);
            if (index > 0) {
                setData(
                    data.map(el => (el.id === itemChange.id ? Object.assign({}, el, itemChange) : el))
                );
            } else {
                setData(i => [...i, itemChange]);
            }
        }
    }, [itemChange])

    useEffect(() => {
        let auxCol = []
        let obj = {};
        columnas.map((i) => {
            if (i.show) {
                obj['title'] = t('pokemons.' + i.llave);
                obj['dataIndex'] = i.llave;
                obj['key'] = i.llave;
                // obj['sorter'] = (a,b)=>(a-b);
                if (i.llave === 'image') {
                    obj['render'] = (a) => imageColum(a)
                }
                auxCol.push(obj);
                obj = {};
            }
            return i;
        })
        if (eliminar || editar) {
            obj['title'] = t('tabla.aciones');
            obj['key'] = 'acciones';
            obj['render'] = (a, re) => actionsColum(re);
            auxCol.push(obj);
        }
        setColumns(auxCol);
    }, [columnas, t])

    useEffect(() => {
        const consultaAjax = () => consultaAPI()
        if (consulta) {
            consultaAjax();
        }
    }, [consulta])

    return (
        <Table
            columns={columns}
            dataSource={filtradas.length ? filtradas : data}
            bordered={true}
            size="small"
            pagination={{pageSize: 5}}
            scroll={{y: 240}}
            loading={loading}
            rowKey="id"
        />
    );
}
Tabla.prototype = {
    consulta: PropTypes.func,
    editar: PropTypes.func,
    eliminar: PropTypes.func,
    columnas: PropTypes.array,
    textFiltrar: PropTypes.string,
    primaryLabel: PropTypes.string,
    onEdit: PropTypes.func,
    reload: PropTypes.func,
}
Tabla.defaultProps = {
    columnas: [],
    textFiltrar: '',
    primaryLabel: 'name',
    onEdit: () => {

    }
}
