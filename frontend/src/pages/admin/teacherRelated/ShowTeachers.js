import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Paper, Table, TableBody, TableContainer,
    TableHead, TablePagination, Button, Box, IconButton,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { GreenButton, BlueButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllTeachers(currentUser._id));
        });
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => ({
        name: teacher.name,
        teachSubject: teacher.teachSubject?.subName || null,
        teachSclass: teacher.teachSclass.sclassName,
        teachSclassID: teacher.teachSclass._id,
        id: teacher._id,
    }));

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />,
            name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'teachSubject') {
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {value ? (
                                                        value
                                                    ) : (
                                                        <Button variant="contained"
                                                            onClick={() => {
                                                                navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                                            }}>
                                                            Add Subject
                                                        </Button>
                                                    )}
                                                </StyledTableCell>
                                            );
                                        }
                                        return (
                                            <StyledTableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </StyledTableCell>
                                        );
                                    })}
                                    <StyledTableCell align="center">
                                        <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                                            <PersonRemoveIcon color="error" />
                                        </IconButton>
                                        <BlueButton variant="contained"
                                            onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
                                            View
                                        </BlueButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Paper>
    );
};

export default ShowTeachers;
