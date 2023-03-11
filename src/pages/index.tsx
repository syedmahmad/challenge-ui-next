import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { Modal, Box, Typography, Button, TextField, Select, FormControl, InputLabel, MenuItem, FormHelperText } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

function createData(teamMember: string, priority: string, orderNumber: number, team: string, dueDate: string) {
    return { name: teamMember, priority: priority, id: orderNumber, team_name: team, date: dueDate };
}

const rows = [
    createData('Robert Fox', 'High', 2345, 'Blue', '01/01/2024'),
    createData('Darlene Robertson', 'Low', 210735, 'Red', '01/01/2024'),
    createData('Theresa Webb', 'Medium', 7452342, 'Green', '01/01/2024'),
];

const Home: React.FC = () => {
    const fields = {
        name: '',
        priority: '',
        team_name: '',
        date: '01/01/2024',
        id: Math.floor(Math.random() * 10000)
    };
    const [data, setData] = React.useState(fields);
    const [open, setOpen] = useState(false);
    const [tableRows, setTableRows] = React.useState<any>([]);

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if(typeof window !== 'undefined')
        {
            const initaltableData = JSON.parse(localStorage.getItem('form_data')!) || [];
            if(initaltableData.length < 1)
            {
                localStorage.setItem('form_data', JSON.stringify(rows));
            }
            const tableData = JSON.parse(localStorage.getItem('form_data')!) || [];
            const newData: any = [];
            if( tableData.length > 0)
            {
                setTableRows([]);
                tableData.map((item: any) => {
                    newData.push(
                        createData(item.name, item.priority, item.id, item.team_name, item.date)
                    );
                    return null
                });
                setTableRows(newData);
            }
        }
    }, []);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleChange = (e: any) => {
        setData((prev) => {
            return {
              ...prev,
              [e.target.name]: e.target.value,
            };
        });
    }

    const handleSave = () => {
        if (typeof window !== 'undefined')
        {
            const localData = JSON.parse(localStorage.getItem('form_data')!) || [];
            if(data.date !== '' && data.name !== '' && data.priority !== '' && data.team_name !== '')
            {
                if(localData?.length > 0)
                {
                    localStorage.setItem('form_data', JSON.stringify([...localData, data]));
                }else {
                    localStorage.setItem('form_data', JSON.stringify([data]));
                }
            }else {
                alert("All fields are mendatory")
            }
            setData(() => {
              return {
              ...fields,
              id: Math.floor(Math.random() * 10000)
            }});
            const tableData = JSON.parse(localStorage.getItem('form_data')!) || [];
            const newData: any = [];
            if( tableData.length > 0)
            {
                setTableRows([]);
                tableData.map((item: any) => {
                    newData.push(
                        createData(item.name, item.priority, item.id, item.team_name, item.date)
                    );
                    return null
                });
                setTableRows(newData);
            }
            // closing the modal
            handleClose();
        }
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            sm: 510,
            xs: '80%',
        },
        padding: '40px',
        bgcolor: '#F7FAFC',
        borderRadius: '16px',
        boxShadow: 24,
        p: 4,
      };
      

    return(
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography id="modal-modal-title" variant="h4" sx={{ fontSize: '28px', fontWeight: 600}}>
                            Create a New Order
                        </Typography>
                        <br />
                        <Typography id="modal-modal-description" sx={{ color: '#718096', fontSize: '14px', fontWeight: 400 }}>
                            Fill out the required information to create a new order.
                        </Typography>
                    </Box>
                    <Box sx={{ m: '30px 0px'}}>
                        <Box sx={{width: '100%'}}>
                            <Typography sx={{ color: '#425466', fontSize: '14px', fontWeight: 500, mb: 2}}>
                                Team Member Name
                            </Typography>   
                            <TextField label="Placeholder" value={data?.name} name="name" onChange={handleChange} variant="filled" sx={{border: 0, boxShadow: '0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)', width: '100%', '& .MuiFilledInput-root': {
                                background: '#fff',
                            } }} />                      
                        </Box>
                        <Box sx={{width: '100%', mt: 4}}>
                            <Typography sx={{ color: '#425466', fontSize: '14px', fontWeight: 500, mb: 2}}>
                                Priority
                            </Typography>   
                            <FormControl fullWidth>
                                <InputLabel>Placeholder</InputLabel>
                                <Select
                                    label="Age"
                                    variant="filled"
                                    sx={{'& .MuiSelect-filled': {
                                        backgroundColor: '#fff !important',
                                    }}}
                                    value={data?.priority} 
                                    name="priority" 
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Low'}>Low</MenuItem>
                                    <MenuItem value={'Medium'}>Medium</MenuItem>
                                    <MenuItem value={'High'}>High</MenuItem>
                                </Select>
                            </FormControl>                     
                        </Box>
                        <Box sx={{width: '100%', mt: 4}}>
                            <Typography sx={{ color: '#425466', fontSize: '14px', fontWeight: 500, mb: 2}}>
                                Team
                            </Typography>   
                            <FormControl fullWidth>
                                <InputLabel>Placeholder</InputLabel>
                                <Select
                                    label="Age"
                                    variant="filled"
                                    sx={{'& .MuiSelect-filled': {
                                        backgroundColor: '#fff !important',
                                    } }}
                                    value={data?.team_name}
                                    name="team_name"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Blue'}>Blue</MenuItem>
                                    <MenuItem value={'Green'}>Green</MenuItem>
                                    <MenuItem value={'Red'}>Red</MenuItem>
                                    <MenuItem value={'Yellow'}>Yellow</MenuItem>
                                </Select>
                            </FormControl>                      
                        </Box>
                        <Box sx={{width: '100%', mt: 4}}>
                            <Typography sx={{ color: '#425466', fontSize: '14px', fontWeight: 500, mb: 2}}>
                                Due Date
                            </Typography>   
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                                <DatePicker defaultValue={dayjs('01/01/2024')} sx={{width: '100%', backgroundColor: '#fff'}} format="DD/MM/YYYY" onChange={(newValue: any) => setData({ ...data, date: dayjs(newValue).format('DD/MM/YYYY') })}/>
                            </LocalizationProvider>        
                            <FormHelperText>Date format must be mm/dd/yyyyy</FormHelperText>      
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <Button variant="contained" size='small' sx={{ borderRadius: '6px', padding: '12px 20px', background: '#E4ECF7', width: '83px', height: '36px', fontSize: '12px', color: '#505780', textTransform: 'unset'}} onClick={handleClose}> Cancel </Button>
                        <Button variant="contained" size='small' sx={{ borderRadius: '6px', padding: '12px 20px', background: '#4C6FFF', width: '83px', height: '36px', fontSize: '12px',  textTransform: 'unset'}} onClick={() => handleSave()}> Submit </Button>
                    </Box>
                </Box>
            </Modal>
            <Table handleOpen={handleOpen} tableData={tableRows}/>   
        </>
    )
}

export default Home;