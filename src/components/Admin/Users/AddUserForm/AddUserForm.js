import React, {useState} from "react";
import {Form, Input, Select, Button, Row, Col, notification} from "antd";
import{LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {signUpAdminApi} from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";

import "./AddUserForm.scss";

export default function AddUserForm(props) {
    const {setIsVisibleModal, setReloadUsers} = props;
    const [userData, setUserData] = useState({});

    const addUser = e => {
        e.preventDefault();

        if(!userData.name || !userData.lastname || !userData.role || !userData.email || !userData.password || !userData.repeatPassword) {
            notification["error"]({message: "Todos los campos son obligatorios."});
        } else if(userData.password !== userData.repeatPassword) {
            notification["error"]({message: "Las contraseñas no coinciden."});
        } else {
            const accessToken = getAccessTokenApi();
            signUpAdminApi(accessToken, userData)
            .then(response => {
                notification["success"]({message: response});
                setIsVisibleModal(false);
                setReloadUsers(true);
                setUserData({});
            })
            .catch(error => {
                notification["error"]({message: error});
            });
        }
    }
    return(
        <div className = "add-user-form">
            <AddForm
                userData = {userData}
                setUserData = {setUserData}
                addUser = {addUser}
            />
        </div>
    );
}

function AddForm(props) {
    const {userData, setUserData, addUser} = props;
    const {Option} = Select;

    return(
        <Form
            className = "form-add"
            onSubmit = {addUser}
        >
            <Row gutter = {24}>
                <Col span = {12}>
                    <Form.Item>
                        <Input
                            prefix = {<UserOutlined/>}
                            type = "text"
                            placeholder = "Nombre"
                            value = {userData.name}
                            onChange = {e => setUserData({...userData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span = {12}>
                    <Form.Item>
                        <Input
                            prefix = {<UserOutlined/>}
                            type = "text"
                            placeholder = "Apellido"
                            value = {userData.lastname}
                            onChange = {e => setUserData({...userData, lastname: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {12}>
                    <Form.Item>
                        <Input
                            prefix = {<MailOutlined/>}
                            type = "email"
                            placeholder = "email"
                            value = {userData.email}
                            onChange = {e => setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span = {12}>
                    <Form.Item>
                        <Select
                            placeholder = "Selecciona un rol"
                            value = {userData.role}
                            onChange = {e => setUserData({...userData, role: e})}
                        >
                            <Option value = "admin">Administrador</Option>
                            <Option value = "editor">Editor</Option>
                            <Option value = "reviewer">Revisor</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {12}>
                    <Form.Item>
                        <Input
                            prefix = {<LockOutlined/>}
                            type = "password"
                            placeholder = "Contraseña"
                            value = {userData.password}
                            onChange = {e => setUserData({...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span = {12}>
                    <Form.Item>
                        <Input
                            prefix = {<LockOutlined/>}
                            type = "password"
                            placeholder = "Repetir Contraseña"
                            value = {userData.repeatPassword}
                            onChange = {e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button
                    type = "primary"
                    htmlType = "submit"
                    className = "btn-submit"
                    onClick = {addUser}
                >
                    Crear Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}