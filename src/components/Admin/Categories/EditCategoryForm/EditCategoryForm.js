import React, {useState, useEffect, useCallback} from "react";
import {Avatar, Form, Input, Button, notification} from "antd";
import {TagOutlined, FileImageOutlined} from "@ant-design/icons";
import {updateCategoryApi} from "../../../../api/category";
import {getAccessTokenApi} from "../../../../api/auth";
import noCover from "../../../../assets/img/png/Missing.png";

import "./EditCategoryForm.scss";

export default function EditCategoryForm(props) {
    const {setIsVisibleModal, setReloadCategories, categories} = props;
    const [categoriesData, setCategoriesData] = useState({});
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        setCategoriesData(categories);
    }, [categories]);

    useEffect(() => {
        if(categories.avatar){
            setAvatar(categories.avatar);
        } else {
            setAvatar(null);
        }
    }, [categories]);

    useEffect(() => {
        if(avatar) {
            setCategoriesData({...categoriesData, avatar: avatar});
        }
    }, (avatar));

    const editCategory = event => {
        event.preventDefault();
        if(!categoriesData.tag || !categoriesData.url) {
            notification["error"]({message: "Todos los campos son obligatorios"});
        } else { 
            const accessToken = getAccessTokenApi();
            updateCategoryApi(accessToken, categoriesData._id, categoriesData)
            .then(response => {
                notification["success"]({message: response});
                setIsVisibleModal(false);
                setReloadCategories(true);
                })
            .catch(() => {
                notification["error"]({message: "Error del servidor"});
            });
        }
    }
            
    return(
        <div className = "edit-categories-form">
            <EditForm
                categoriesData = {categoriesData} 
                setCategoriesData = {setCategoriesData} 
                editCategory = {editCategory}
                avatar = {avatar} 
            />
        </div>
    );
}

function EditForm(props) {
    const {categoriesData, setCategoriesData, editCategory, avatar} = props;

    return(
        <>
        <Avatar
            size = {window.screen.width > 425 ? 240 : 120}
            shape = "square"
            src = {avatar ? avatar : noCover}
            className = "avatar" 
        />
        <Form 
            className = "form-edit" 
            onSubmit = {editCategory}
        >
            <Form.Item>
                <Input 
                    prefix = {<TagOutlined />}
                    placeholder = "Categoría"
                    value = {categoriesData.tag}
                    onChange = {e => setCategoriesData({...categoriesData, tag: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix = {<TagOutlined />}
                    placeholder = "url"
                    value = {categoriesData.url}
                    onChange = {e => setCategoriesData({...categoriesData, url: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix = {<FileImageOutlined />}
                    placeholder = "Cover"
                    value = {categoriesData.avatar}
                    onChange = {e => setCategoriesData({...categoriesData, avatar: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button 
                    type = "primary" 
                    htmlType = "submit" 
                    className = "btn-submit" 
                    onClick = {editCategory}
                >
                    Actualizar categoría
                </Button>
            </Form.Item>
        </Form>
        </>
    );
}