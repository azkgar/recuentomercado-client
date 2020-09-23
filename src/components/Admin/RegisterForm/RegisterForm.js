import React, {useState} from "react";
import {Form, Input, Button, Checkbox, notification} from "antd";
import {UserAddOutlined, LockOutlined} from "@ant-design/icons";
import {emailValidation, minLengthValidation} from "../../../utils/formValidation";
import signUpApi from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password:false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const changeForm = e => {
        if(e.target.name === "privacyPolicy") {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    }

    const inputValidation = e => {
        const {type, name} = e.target;

        if(type === "email") {
            setFormValid(
                {
                    ...formValid,
                    [name]: emailValidation(e.target)
                });
        }
        if(type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target,6)
            });
        }
        if(type === "checkbox") {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            });
        }
    }

    const register = async e => {
        e.preventDefault();
        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        if(!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            });
        } else {
            if(passwordVal !== repeatPasswordVal) {
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales."
                });
            } else {
                const result = await signUpApi(inputs);
                if(!result.ok){
                    notification["error"]({
                        message: "El correo electrónico ya está registrado."
                    });
                } else {
                    notification["success"]({
                        message: "El usuario ha sido registrado."
                    });
                    resetForm();
                }
            }
        }
    }

    const resetForm = () => {
        const input = document.getElementsByTagName("input");
        for (let i=0; i<input.length; i++) {
            input[i].classList.remove("success");
            input[i].classList.remove("error");
        }

        setInputs({
            email: "",
            password:"",
            repeatPassword:"",
            privacyPolicy: false
        });

        setFormValid({
            email:false,
            password:false,
            repeatPassword: false,
            privacyPolicy:false
        });
    }

    return(
        <Form className = "register-form" onSubmit={register} onChange={changeForm}>
            <Form.Item>
                <Input
                    prefix = {<UserAddOutlined style ={{color: "rgba(0,0,0,0.25)"}}/>}
                    type="email"
                    name="email"
                    placeholder = "email"
                    className = "register-form__input"
                    value={inputs.email}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix = {<LockOutlined style ={{color: "rgba(0,0,0,0.25)"}}/>}
                    type="password"
                    name="password"
                    placeholder = "Contraseña"
                    className = "register-form__input"
                    value={inputs.password}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix = {<LockOutlined style ={{color: "rgba(0,0,0,0.25)"}}/>}
                    type="password"
                    name="repeatPassword"
                    placeholder = "Repetir Contraseña"
                    className = "register-form__input"
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox
                    name = "privacyPolicy"
                    checked = {inputs.privacyPolicy}
                    onChange ={inputValidation}
                    className = "checkbox"
                >
                    He leído y acepto el <a href = "/aviso-de-privacidad">aviso de privacidad</a>.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    className="register-form__button"
                    onClick={register}
                >
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}