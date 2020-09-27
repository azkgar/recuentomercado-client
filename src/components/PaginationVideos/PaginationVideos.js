import React from "react";
import { Pagination as PaginationAntd} from "antd";

import "./PaginationVideos.scss";

export default function PaginationVideos(props) {
    const {videos, location, history} = props;
    const currentPage = parseInt(videos.page);

    const onChangePage = newPage => {
        history.push(`${location.pathname}?page=${newPage}`);
    };

    return(
        <PaginationAntd 
            defaultCurrent = {currentPage}
            total = {videos.totalDocs}
            pageSize = {videos.limit}
            onChange = {newPage => onChangePage(newPage)}
            className = "pagination"
        />
    );
}