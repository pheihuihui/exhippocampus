import React, { FC, Fragment, useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useFetch } from '../hooks/_hooks'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemButton
} from "@mui/material";
import { PageWindow } from './PageWindow'

export const PageList: FC = () => {

    type T_PageTitles = Array<{
        id: string,
        title: string
    }>

    const { data, error } = useFetch<T_PageTitles>('/query/page/ids')

    const [open, setOpen] = useState(false)
    const [itemId, setItemId] = useState('')

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {data?.map(_ => (
                    <ListItem key={_.id}>
                        <ListItemButton onClick={() => {
                            setItemId(_.id)
                            setOpen(true)
                        }}>
                            <ListItemText primary={`${_.title}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose} maxWidth={false}>
                <DialogContent>
                    <PageWindow itemId={itemId} />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
