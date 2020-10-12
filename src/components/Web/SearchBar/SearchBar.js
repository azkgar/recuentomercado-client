import React, {useState, useEffect, useRef} from "react";
import {Form, Input, Button, List, Divider} from "antd";
import {SearchOutlined, FontSizeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {getAllPostsApi} from "../../../api/post";

import "./SearchBar.scss";

export default function SearchBar(){
    const [isTyping, setIsTyping] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [postTitles, setPostTitles] = useState([]);
    const [posts, setPosts] = useState();
    const [matchTitles, setMatchTitles] = useState([]);
    const [urls, setUrls] = useState([]);
    const [showPosts, setShowPosts] = useState(false);
    const [word, setWord] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [open, setOpen] = useState(false);
    const node = useRef();

    useEffect(() => {
        getAllPostsApi()
        .then(response => {
            const titlesArray = [];
            setPosts(response.posts);
            response.posts.map( post => (
                titlesArray.push(post.title.toLowerCase())
            ));
            setPostTitles(titlesArray);
        });
    },[]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    },[]);
    
    useEffect(() => {
        if(!search){
            setIsTyping(false);
        } else {
            setIsTyping(true);
        }
    },[search]);

    useEffect(() => {
        if(isVisible === false) {
            setWord(search);
            setSearch("");
        }
    },[isVisible]);

    function visible() {
        setIsVisible(!isVisible);
    }

    function searchValue(e){
        e.preventDefault();
        const matchArray = [];
        postTitles.map(title => {
            const match = title.indexOf(search.toLowerCase()) > -1 ? true : false;
            if(match){
                matchArray.push(title);
            }
        });
        setMatchTitles(matchArray);
        if(matchArray.length){
            const urlArray = [];
            posts.map( post => {
                matchArray.map( single => {
                    const lower = post.title.toLowerCase();
                    const match = lower.indexOf(single) > -1 ? true : false;
                    if(match) {
                        urlArray.push(post.url);
                    }
                });
            });
            setUrls(urlArray);
            setShowPosts(true);
            setOpen(true);
        } else {
            setUrls([]);
            setShowPosts(false);
            setNotFound(true);
            setOpen(true);
        }
        setIsTyping(false);
        setIsVisible(false);
    }

    const handleClick = e => {
        if(node.current.contains(e.target)){
            return;
        }
        setOpen(false);
    }

    function openNewPost() {
        setOpen(false);
        window.location.reload(false);
    }

    const inputClass = isVisible ? "search-input-display" : "search-input-hidden";

    return(
        <div ref = {node}>
            <Form
                onSubmit = {searchValue}
                className = "search-container"
            >
                <Form.Item>
                    <Input
                        placeholder = "¿Qué estás buscando?"
                        type = "text"
                        name = "searchTerm"
                        prefix = {<FontSizeOutlined/>}
                        className = {inputClass}
                        value = {search}
                        onChange = {e => setSearch(e.target.value)}
                    />
                    <Button
                        shape = "circle"
                        icon = {<SearchOutlined/>}
                        htmlType = "submit"
                        className = "search-button"
                        onClick = {isTyping && isVisible ? searchValue : visible}
                    />
                </Form.Item>
            </Form>
            <FoundList 
                urls = {urls}
                showPosts = {showPosts}
                matchTitles = {matchTitles}
                word = {word}
                setShowPosts = {setShowPosts}
                notFound = {notFound}
                open = {open}
                openNewPost = {openNewPost} 
            />
        </div>
    );
}

function FoundList(props) {
    const {urls, showPosts, matchTitles, word, notFound, open, openNewPost} = props;
    const result = [];
    let i;
    for (i=0; i<urls.length; i++){
        result.push({
            title: matchTitles[i],
            url: urls[i]
        });
    }

    if(showPosts){
        return(
            open ?
            <>
                <Divider orientation = "left">
                    Resultados
                </Divider>
                <List
                    header = {<div>{`Artículos relacionados con "${word}":`}</div>}
                    bordered
                    dataSource = {result}
                    renderItem = {item => (
                        <List.Item onClick = {openNewPost}>
                            <Link to = {`/articulos/${item.url}`}>
                                {item.title}
                            </Link>
                        </List.Item>
                    )}
                />
            </> : null
        );
    } else {
        return(
            notFound && open ?
            <>
                <Divider orientation = "left">
                    ¡Oh, Oh!
                </Divider>
                <div className = "not-found">
                    <p>No se encontraron artículos relacionados con "{word}" <span role = "img" aria-label = "Cara de decepción">😔</span></p>
                </div>
            </> : null
        );
    }
}