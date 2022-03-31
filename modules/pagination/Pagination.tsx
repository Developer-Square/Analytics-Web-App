import React, {ChangeEvent } from "react";
import { Pagination } from '@mui/material';

interface PaginationProps {
    count: number;
    page: number;
    onChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const MyPagination = (props: PaginationProps) => <Pagination count={props.count} page={props.page} onChange={props.onChange} showFirstButton showLastButton color='primary' />;

export default MyPagination;