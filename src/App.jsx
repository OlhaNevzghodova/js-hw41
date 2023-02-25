import React, {useState} from "react";
import {
    Box,
    Container,
    Stack,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    IconButton
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";


import {NotesForm} from "./components/NotesForm";
import {EditModal} from "./components/EditModal.jsx";

const useNotes = () => {
    const [notes, setNotes] = useState([]);

    function createNote({title, description}) {
        setNotes((prevState) => {
            return [
                ...prevState,
                {
                    title,
                    description,
                    id: crypto.randomUUID(),
                },
            ];
        });
    }
    function deleteNote(id) {
        return () => {
            setNotes((prevState) => prevState.filter((note) => {
                note.id !== id
            }))
        };
    }

    function updateNote(id, title, description) {
        setNotes((prevState) => {
            return prevState.map((note) => {
                if (note.id === id) {
                    return {
                        id,
                        title,
                        description
                    };
                }

                return note;
            })
        })
    }
    return {
        notes,
        createNote,
        updateNote,
        deleteNote
    }
}

function App() {
    const { notes, createNote, updateNote, deleteNote } = useNotes();
    const [open, setOpen] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState({});


    return <Box>
        <Container>
            <Stack spacing={3}>
                <Typography variant="h4" align="center">
                    Create note
                </Typography>
                <NotesForm onSubmit={createNote}/>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                notes.map(({title, description, id}, index) => {
                                    return (
                                        <TableRow key={id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{title}</TableCell>
                                            <TableCell>{description}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => {
                                                    setOpen(true);
                                                    setNoteToEdit({id, title, description})
                                                }}>
                                                    <Edit/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={deleteNote(id)}>
                                                    <Delete/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Container>
        <EditModal open={open}
                   onClose={() => {
                       setOpen(false);
                   }}
                   currentNote={noteToEdit}
        onEdit={updateNote}/>
    </Box>;
}

export default App
