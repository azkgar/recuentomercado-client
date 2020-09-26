import React, {useState} from "react";
import {Form, Input, Button, notification} from "antd";
import {TagOutlined, FileImageOutlined} from "@ant-design/icons";
import {addCategoryApi} from "../../../../api/category";
import {getAccessTokenApi} from "../../../../api/auth";

import "./AddCategoryForm.scss";

export default function AddCategoryForm(props) {
    const {setIsVisibleModal, setReloadCategories} = props;
    const [categoriesData, setCategoriesData] = useState({});

    const addCategory = event => {
        event.preventDefault();
        let finalData = {
          tag: categoriesData.tag,
          url: categoriesData.url
        };
    
        if (!finalData.tag || !finalData.url) {
          notification["error"]({message: "Todos los campos son obligatorios."});
        } else {
          const accessToken = getAccessTokenApi();
          finalData.active = false;
          finalData.order = 1000;
    
          addCategoryApi(accessToken, finalData)
            .then(response => {
              notification["success"]({
                message: response
              });
              setIsVisibleModal(false);
              setReloadCategories(true);
              setCategoriesData({});
              finalData = {};
            })
            .catch(() => {
              notification["error"]({
                message: "Error del servidor"
              });
            });
        }
      };

    return(
        <div className = "add-category-form">
            <AddForm 
                categoriesData = {categoriesData}
                setCategoriesData = {setCategoriesData}
                addCategory = {addCategory}
            />
        </div>
    );
}

function AddForm(props) {
    const {categoriesData, setCategoriesData, addCategory} = props;

    return(
        <Form 
            className = "form-add" 
            onSubmit = {addCategory}
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
                <Button type = "primary" htmlType = "submit" className = "btn-submit" onClick = {addCategory}>
                    Crear nueva categoría
                </Button>
            </Form.Item>
        </Form>
    );
}