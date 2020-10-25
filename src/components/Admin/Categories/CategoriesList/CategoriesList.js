import React, {useState, useEffect} from "react";
import {Avatar, Switch, List, Button, Modal as ModalAntd, notification} from "antd";
import {EditOutlined, DeleteOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import {updateCategoryApi, activateCategoryApi, deleteCategoryApi} from "../../../../api/category";
import {getAccessTokenApi} from "../../../../api/auth";
import AddCategoryForm from "../AddCategoryForm";
import EditCategoryForm from "../EditCategoryForm";
import noCover from "../../../../assets/img/png/Missing.png";


import "./CategoriesList.scss";

const {confirm} = ModalAntd;


export default function CategoriesList(props) {
    const {categories, setReloadCategories} = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];

        categories.forEach(item => {
            listItemsArray.push({
                content: (
                    <CategoryItem 
                        item = {item} 
                        activateCategory = {activateCategory} 
                        editCategoryModal = {editCategoryModal} 
                        deleteCategory = {deleteCategory }
                    />
                )
            });
        });
        setListItems(listItemsArray);
    }, [categories]);


    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const {_id} = item.content.props.item;
            const order = item.rank;

            updateCategoryApi(accessToken, _id, {order});
        });
    }

    const activateCategory = (categories, status) => {
        const accessToken = getAccessTokenApi();
        activateCategoryApi(accessToken, categories._id, status)
        .then( response => {
                notification["success"]({message: response});
            }
        )
        .catch(() => {
            notification["error"]({message: "Error del servidor"});
        });
    }
    
    const addCategoryModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Nueva categoría");
        setModalContent(
            <AddCategoryForm 
                setIsVisibleModal = {setIsVisibleModal} 
                setReloadCategories = {setReloadCategories} 
            />
        );
    }

    const editCategoryModal = categories => {
        setIsVisibleModal(true);
        setModalTitle(`Editando categoría: ${categories.tag}`);
        setModalContent(
            <EditCategoryForm 
                setIsVisibleModal = {setIsVisibleModal} 
                setReloadCategories = {setReloadCategories} 
                categories = {categories} />
        );
    }

    const deleteCategory = (categories) => {
        const accessToken = getAccessTokenApi();

        confirm({
            icon: <QuestionCircleOutlined />,
            title: "Eliminar categoría",
            content: `¿Estás seguro de eliminar la categoría ${categories.tag}?`,
            okText: "Eliminar",
            okButtonProps: {type: "primary", danger: true},
            cancelText: "Cancelar",
            onOk() {
                deleteCategoryApi(accessToken,categories._id)
                .then(response => {
                    notification["success"]({message: response});
                    setReloadCategories(true);
                })
                .catch(() => {
                    notification["error"]({message: "Error del servidor"});
                });
            }
        });
    }

    return(
        <div className = "categories-list">
            <div className = "categories-list__header">
                <Button 
                    type = "primary" 
                    onClick = {addCategoryModal}
                >
                    Crear nueva categoría
                </Button>
            </div>
            <div className = "categories-list__items">
                <DragSortableList 
                    items = {listItems} 
                    onSort = {onSort} 
                    type = "vertical" 
                />
            </div>
            <Modal 
                title = {modalTitle} 
                isVisible = {isVisibleModal} 
                setIsVisible = {setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function CategoryItem(props) {
    const {item, activateCategory, editCategoryModal, deleteCategory} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        if(item.avatar){
            setAvatar(item.avatar);
        } else {
            setAvatar(null);
        }
    },[item]);

    return(
        <List.Item
            actions = {[
                <Switch 
                    defaultChecked = {item.active} 
                    onChange = {e => activateCategory(item, e)} 
                />,
                <Button 
                    type = "primary" 
                    onClick = {() => editCategoryModal(item)}
                >
                    <EditOutlined />
                </Button>,
                <Button 
                    type = "danger" 
                    onClick ={() => deleteCategory(item)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta 
                avatar = {<Avatar src = {avatar ? avatar : noCover} 
                shape ="square" 
                size = {150} /> } 
                title = {item.tag}  
            />
        </List.Item>
    );
}