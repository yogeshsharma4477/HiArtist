import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Badge from '@mui/material/Badge';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import FormData from "form-data";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                www.hiArtist.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,

}));

async function postSuggestionAPI(data, signal) {
    const response = await axios.post("/api/signup/username_suggestion", data, { signal: signal });
    return response;
}

async function signUpApi(data) {
    const response = await axios.post("/api/signup/signup", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response;
}

const defaultTheme = createTheme();

export default function SignUp() {

    const [formValue, setFormValue] = useState({
        name: "", username: "", mobile_email: "", profilePhoto: "", password: ""
    })
    const [suggestions, setSuggestions] = useState([])
    const [isUserNameAvailable, setIsUserNameAvailable] = useState(false)

    const handleSubmit = (e) => {
        // e.preventDefault();
        var fd = new FormData();
        fd.append("name", formValue.name)
        fd.append("username", formValue.username)
        fd.append("mobile_email", formValue.mobile_email)
        fd.append("password", formValue.password)
        fd.append("Profile_Photo", formValue.profilePhoto)
        signUpApi(fd).then((res) => console.log(res, "----------------"))
            .catch(e => console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee"))
    };

    function handleOnChange(e, value) {
        if (value === "profilePhoto") {
            setFormValue({ ...formValue, profilePhoto: e.target.files[0] })
        } else {
            setFormValue({ ...formValue, [value]: e.target.value })
        }
    }

    useEffect(() => {
        let timer
        setIsUserNameAvailable(false)
        const controller = new AbortController();
        if (formValue.username !== "") {
            timer = setTimeout(() => {
                postSuggestionAPI({ "username": formValue.username }, controller.signal).then((res) => {
                    if (res?.data?.results?.data?.length) {
                        setSuggestions(res?.data?.results?.data ? res?.data?.results?.data : [])
                    } else {
                        setIsUserNameAvailable(true)
                        setSuggestions([])
                    }
                })
                    .catch((e) => console.log(e))
            }, 500)
        } else {
            setSuggestions([])
        }
        return () => {
            clearTimeout(timer)
            controller.abort()
        }

    }, [formValue.username])


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" style={{ border: '0.01px solid darkgray' }}>
                <CssBaseline />
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    {
                        formValue.profilePhoto ?
                            <Badge
                                sx={{ mb: 1 }}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <ClearIcon style={{ color: "#555555", width: '14px', cursor: 'pointer' }}
                                        onClick={(e) => setFormValue({ ...formValue, profilePhoto: "" })} />
                                } >
                                <Avatar
                                    alt="Profile"
                                    src={`${URL.createObjectURL(formValue.profilePhoto)}`}
                                    sx={{ width: 50, height: 50 }}
                                />
                            </Badge>
                            :
                            <Avatar sx={{ mb: 1, bgcolor: 'secondary.main', width: 50, height: 50 }}>
                                <LockOutlinedIcon />
                            </Avatar>
                    }


                    <Typography component="h1" variant="h5">
                        HiArtist
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Mobile Number or email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => handleOnChange(e, "mobile_email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="family-name"
                                    onChange={(e) => handleOnChange(e, "name")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    freeSolo
                                    options={suggestions}
                                    renderInput={(params) => <TextField
                                        error={isUserNameAvailable ? true : false}
                                        {...params} label="username"
                                        onChange={(e) => handleOnChange(e, "username")}
                                        fullWidth
                                        helperText={`${isUserNameAvailable ? "username already exist" : ""}`}
                                    />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => handleOnChange(e, "password")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Profile Photo
                                    <VisuallyHiddenInput type="file" onChange={(e) => handleOnChange(e, "profilePhoto")} />
                                </Button>
                            </Grid>
                        </Grid>
                        <Button fullWidth variant="contained" onClick={() => handleSubmit()} sx={{ mt: 2, mb: 1 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5, mb: 1 }} />
            </Container>
        </ThemeProvider>
    );
}