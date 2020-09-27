import React from "react";
import { Pagination as PaginationAntd} from "antd";

import "./PaginationPodcasts.scss";

export default function PaginationPodcasts(props) {
    const {podcasts, location, history} = props;
    const currentPage = parseInt(podcasts.page);

    const onChangePage = newPage => {
        history.push(`${location.pathname}?page=${newPage}`);
    };

    return(
        <PaginationAntd 
            defaultCurrent = {currentPage}
            total = {podcasts.totalDocs}
            pageSize = {podcasts.limit}
            onChange = {newPage => onChangePage(newPage)}
            className = "pagination"
        />
    );
}