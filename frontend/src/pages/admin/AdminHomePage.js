
import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
// import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';


const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList ? studentsList.length : 0;
    const numberOfClasses = sclassesList ? sclassesList.length : 0;
    const numberOfTeachers = teachersList ? teachersList.length : 0;




    return (
        <StyledContainer maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <StyledPaper>
                        <img src={Students} alt="Students" />
                        <Title>Total Students</Title>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StyledPaper>
                        <img src={Classes} alt="Classes" />
                        <Title>Total Classes</Title>
                        <Data start={0} end={numberOfClasses} duration={5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StyledPaper>
                        <img src={Teachers} alt="Teachers" />
                        <Title>Total Teachers</Title>
                        <Data start={0} end={numberOfTeachers} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3}>
                    {/* <StyledPaper>
                        <img src={Fees} alt="Fees" />
                        <Title>Fees Collection</Title>
                        <Data start={0} end={23000} duration={2.5} prefix="$" />
                    </StyledPaper> */}
                </Grid>

                <Grid item xs={12}>
                    <PaperStyled sx={{ p: 2, mb: 3 }}>
                        <SeeNotice />
                    </PaperStyled>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
    margin-top: 30px;
`;

const StyledPaper = styled(Paper)`
    && {

        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        background-color: white;
        box-shadow: 4px 8px 2px 2px #000;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        &:hover {
            transform: translateY(-5px);
        }
    }
`;

const Title = styled.p`
    font-size: 1.5rem;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Data = styled(CountUp)`
    font-size: 2.5rem;
    color: #4CAF50;
`;

const PaperStyled = styled(Paper)`
     && {
margin-top: 20px;
padding: 20px;
box-shadow: 2px 2px 2px 2px #000;
transition: all 0.3s ease-in-out;
        &:hover {
            transform: translateY(-5px);
        }
}
`;






export default AdminHomePage;
