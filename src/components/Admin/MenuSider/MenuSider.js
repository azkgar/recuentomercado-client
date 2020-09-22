import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Layout, Menu} from "antd";
import {HomeOutlined, UserOutlined, MenuOutlined, FileOutlined, TagOutlined, VideoCameraOutlined, SoundOutlined} from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props) {
    const {Sider} = Layout;
    const {menuCollapsed, location} = props;

    return(
        <Sider
            className = "admin-sider"
            collapsed = {menuCollapsed}
        >
            <Menu
                theme = "dark"
                mode = "inline"
                defaultSelectedKeys={[location.pathname]}
            >
                <Menu.Item key = "/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined/>
                        <span className="nav-text">Inicio</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = "/admin/users">
                    <Link to={"/admin/users"}>
                        <UserOutlined/>
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = "/admin/menu">
                    <Link to={"/admin/menu"}>
                        <MenuOutlined/>
                        <span className="nav-text">Menú</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = "/admin/blog">
                    <Link to={"/admin/blog"}>
                        <FileOutlined/>
                        <span className="nav-text">Blog</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = "/admin/categorias">
                    <Link to={"/admin/categorias"}>
                        <TagOutlined/>
                        <span className="nav-text">Categorías</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = "/admin/videos">
                    <Link to={"/admin/videos"}>
                        <VideoCameraOutlined/>
                        <span className="nav-text">Videos</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = "/admin/podcast">
                    <Link to={"/admin/podcast"}>
                        <SoundOutlined/>
                        <span className="nav-text">Podcast</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);