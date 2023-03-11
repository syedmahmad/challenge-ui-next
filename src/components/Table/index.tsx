import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  Box, Table, TableBody, TableCell, TableContainer,
  TableRow, Paper, Card, CardHeader, Button, TableHead,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

interface TableProps {
    handleOpen: () => void;
    tableData: any;
}

export default function CustomPaginationActionsTable({ handleOpen, tableData } : TableProps) {
  return (
        <Card sx={{ borderRadius: '16px' }}>
            <CardHeader title="Orders" action={<Button onClick={handleOpen} variant='contained' size='small' sx={{ borderRadius: '6px', padding: '12px 20px', background: '#4C6FFF', width: '120px', height: '36px', fontSize: '12px'}}>New Order</Button>}/>
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead sx={{ background: '#FAFAFB', borderTop: '1px solid #EDF2F7', borderBottom: '1px solid #EDF2F7'}}>
                        <TableRow>
                            <TableCell sx={{ color: '#8492A6' }} align="left">TEAM MEMBER</TableCell>
                            <TableCell sx={{ color: '#8492A6' }} align="left">PRIORITY</TableCell>
                            <TableCell sx={{ color: '#8492A6' }} align="left">ORDER NUMBER</TableCell>
                            <TableCell sx={{ color: '#8492A6' }} align="left">TEAM</TableCell>
                            <TableCell sx={{ color: '#8492A6' }} align="left">DUE DATE</TableCell>
                            <TableCell sx={{ color: '#8492A6' }} align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((item: any) => (
                            <TableRow key={item.teamMember}>
                                <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 600, lineHeight: '20px'}}>{item.name}</TableCell>
                                <TableCell align="left" sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#425466'}}><Box sx={{ display: 'flex', alignItems: 'center'}}><Box sx={{ width: '10px', height: '10px', marginRight: '10px', background: `${item.priority === 'Low' ? '#F16063' : item.priority === 'Medium' ? '#F7936F' : '#66CB9F'}`, borderRadius: '50%'}}></Box>{item.priority}</Box></TableCell>
                                <TableCell align="left" sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#425466'}}>{item.id}</TableCell>
                                <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 600, lineHeight: '20px', color: '#425466'}}>{item.team_name}</TableCell>
                                <TableCell align="left" sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#425466'}}>{item.date}</TableCell>
                                <TableCell align="left" sx={{ display: 'flex', alignItems: 'center'}}><MoreVert sx={{ color: '#718096'}} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
  );
}