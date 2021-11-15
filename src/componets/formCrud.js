import {Button, Card, Col, Form, Input, notification, Row, Select, Slider} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

export default function FormCrud(props) {
    const {item, primaryLabel, columnas, crear, editar, change, clearVar} = props;
    const {t} = useTranslation();
    const {Option} = Select;

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isNew, setIsNew] = useState(true);

    const onFinish = (values) => {
        setLoading(true);
        if (isNew) {
            crear(values).then((nuevo) => {
                setLoading(false);
                notification.success({
                    message: t('tabla.exito'),
                    description: values[primaryLabel] + t('form.save'),
                });
                change(nuevo);
                setShow(false);
                clearVar()
            }).catch(() => {
                setLoading(false);
            })
        } else {
            editar(values, item.id).then((editado) => {
                setLoading(false);
                notification.success({
                    message: t('tabla.exito'),
                    description: t('form.edit') + values[primaryLabel],
                });
                change(editado);
                setShow(false);
                clearVar()
            }).catch(() => {
                setLoading(false);
            })
        }
    };

    const title = () => (
        <h3 className="titulo">{isNew ? t('form.nuevo') : item[primaryLabel]}</h3>
    )

    useEffect(() => {
        setShow(false);
        if (item) {
            setIsNew(!item?.id);
            setTimeout(() => {
                setShow(true);
            }, 50);
        }
    }, [item])

    return (
        <div>
            {show &&
            <Card>
                <Form
                    name="form"
                    onFinish={onFinish}
                    initialValues={item}
                >
                    <Row gutter={[40, 16]}>
                        <Col span={24}>
                            {title()}
                        </Col>
                        {columnas.filter(c => c?.edit).sort((a, b) => a.formPos - b.formPos).map(i => (
                            <Col span={12} key={'col-' + i.llave}>
                                <Form.Item name={i.llave} label={t('pokemons.' + i.llave)} rules={i.rules}>
                                    {
                                        i.number ?
                                            <Slider min={0} max={100}/> :
                                            !i.combo ? <Input placeholder={t('form.place.' + i.llave)}/> :
                                                <Select placeholder={t('form.place.' + i.llave)}>
                                                    {i.combo.map(j => (
                                                        <Option key={j}>{j}</Option>
                                                    ))}
                                                </Select>
                                    }
                                </Form.Item>
                            </Col>))
                        }
                    </Row>
                    <Row justify="center" gutter={[40]}>
                        <Col md={{span: 4}} sm={{span: 12}}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} block loading={loading}>
                                    {t('form.guardar')}
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col md={{span: 4}} sm={{span: 12}}>
                            <Form.Item>
                                <Button type="primary" icon={<CloseOutlined/>} block onClick={() => setShow(false)}>
                                    {t('form.cancelar')}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>}
        </div>
    )
}
FormCrud.prototype = {
    editar: PropTypes.func,
    crear: PropTypes.func,
    columnas: PropTypes.array,
    textFiltrar: PropTypes.string,
    primaryLabel: PropTypes.string,
    change: PropTypes.func,
    clearVar: PropTypes.func,
}
FormCrud.defaultProps = {
    columnas: [],
    textFiltrar: '',
    primaryLabel: 'name',
}
