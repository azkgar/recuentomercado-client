import React, {useState, useEffect} from "react";
import {Avatar, Form, Input, Select, Button, Row, Col, notification} from "antd";
import{UserOutlined, MailOutlined, LockOutlined} from "@ant-design/icons"
import noAvatar from "../../../../assets/img/png/RM-logo_fondoblanco.png";
import {updateUserApi} from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const {user, setIsVisibleModal, setReloadUsers} = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        });
    }, [user]);

    useEffect(() => {
        if(user.avatar){
            setAvatar(user.avatar);
        } else {
            setAvatar(null);
        }
    }, [user]);

    const updateUser = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if(userUpdate.password || userUpdate.repeatPassword) {
            if(userUpdate.password !== userUpdate.repeatPassword) {
                notification["error"]({message: "Las contraseñas no coinciden."});
                return;
            } else {
                delete userUpdate.repeatPassword;
            }
        }

        if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification["error"]({message: "Email, nombre y apellido son obligatorios."});
            return;
        }

        
        updateUserApi(token, userUpdate, user._id)
        .then(result => {
            notification["success"]({message: result.message});
            setIsVisibleModal(false);
            setReloadUsers(true);
            setUserData({
                ...userData,
                password: "",
                repeatPassword: ""
            });
        });
    }

    return(
        <div className = "edit-user-form">
            <ShowAvatar
                avatar = {avatar}
            />
            <EditForm
                userData = {userData}
                setUserData = {setUserData}
                updateUser = {updateUser}
            />
        </div>
    );
}

function ShowAvatar(props) {
    const {avatar} = props;

    return(
        <div className = "upload-avatar">
            <Avatar
            size = {150}
            src = {avatar ? avatar : noAvatar}
            />
        </div>
    );
}

function EditForm(props) {
    const {userData, setUserData, updateUser} = props;
    const {Option} = Select;

    return(
        <Form
            className = "form-edit"
            onSubmit = {updateUser}
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
            <Row gutter ={24}>
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
                            placeholder = "Repetir contraseña"
                            value = {userData.repeatPassword}
                            onChange = {e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {12}>
                    <Form.Item>
                        <Input
                            prefix = {<UserOutlined/>}
                            type = "text"
                            placeholder = "URL Avatar"
                            value = {userData.avatar}
                            onChange = {e => setUserData({...userData, avatar: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button
                    type = "primary"
                    htmlType = "submit"
                    className = "btn-submit"
                    onClick = {updateUser}
                >Actualizar</Button>
            </Form.Item>
        </Form>
    );
}