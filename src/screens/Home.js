import {Button, Col, Input, Row, Table, Space, Popconfirm, Card, Form, Slider, Select} from "antd";
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    SaveOutlined
} from '@ant-design/icons';
import {useState} from "react";
import {PokeTipes} from "../util/const";
import {useTranslation} from "react-i18next";

const { Option } = Select;

export default function Home() {
    const {t} = useTranslation();

    const [buscar, setBuscar] = useState('');
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => sorterAlp(a.name, b.name),
            filteredValue: buscar
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => sorterNum(a.age, b.age),
            filteredValue: buscar
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: true,
            filteredValue: buscar
        },
        {
            title: 'Action',
            key: 'action',
            sorter: true,
            render: (i) => (
                <Space size="middle">
                    <Button type="link" icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Está seguro que quiere eliminar ?"
                        onConfirm={() => confirmDelete(i)}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button danger type="link" icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const sorterAlp = (a, b) => (isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b);
    const sorterNum = (a, b) => (a - b);

    const confirmDelete = (item) => {
        console.log('Eliminado', item)
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32 * i,
            address: `London, Park Lane no. ${i}`,
        });
    }
    return (
        <div>
            <Row>
                <Col span={24}>
                    <h3>Listado de Pokemon</h3>
                </Col>
            </Row>
            <Row justify="center" gutter={[16, 16]}>
                <Col span={6}>
                    <Input
                        placeholder={t('search')}
                        prefix={<SearchOutlined/>}
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                    />
                </Col>
                <Col span={3} offset={15}>
                    <Button type="primary" icon={<PlusOutlined/>} block>Nuevo</Button>
                </Col>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered={true}
                        size="small"
                        pagination={{pageSize: 5}}
                        scroll={{y: 240}}
                        filteredValue={buscar}
                    />
                </Col>
                <Col span={24}>
                    <Card>
                        <Form
                            name="form"
                            onFinish={onFinish}
                            initialValues={{
                                'input-number': 3,
                                rate: 3.5,
                            }}
                        >
                            <Row gutter={[40, 16]}>
                                <Col span={24}>
                                    <h3 className="titulo">Titulo</h3>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="nombre" label="Nombre:">
                                        <Input placeholder="Name"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="ataque" label="Ataque:">
                                        <Slider min={0} max={100}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="imagen" label="Imagen:">
                                        <Input placeholder="http://lorem.com/image.png" type="url"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="defensa" label="Defensa:">
                                        <Slider min={0} max={100}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="tipo" label="Tipo:">
                                        <Select placeholder="Elije un tipo">
                                            {PokeTipes.map(i => (
                                                <Option key={i}>{i}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="puntos de golpe" label="Puntos de golpe:">
                                        <Slider min={0} max={100}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="center" gutter={[40]}>
                                <Col span={4}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} block>
                                            Guardar
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item>
                                        <Button type="primary" icon={<CloseOutlined/>} block>
                                            Cancelar
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>,
                </Col>
            </Row>
        </div>);
}
