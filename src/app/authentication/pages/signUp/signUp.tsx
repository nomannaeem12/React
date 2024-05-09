import {Button, Card, Container, Link, TextField} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";

interface FormValues extends CredentialDto {

}

export function SignUp(){
    const navigate = useNavigate();

    const  handleLogin = (values: FormValues) => {
        navigate('/');
        // SignInAPI(values).then(()=>{
        //     alert(`Login with email ${values.email}`);
        // })
    }

    return (
        <>
            <Card variant="elevation">
                        <Formik initialValues={{email: '',password: ''}} onSubmit={(values )=>{
                            handleLogin(values);
                        }}>
                            {({handleSubmit})=>(
                                <Form onSubmit={handleSubmit}>
                                    <Container maxWidth="sm" sx={{marginBottom: '1rem'}}>
                                        <Field name='email'>
                                            {({field})=>(
                                                <TextField label="Username" variant="filled" margin='normal' fullWidth {...field}/>
                                            )}
                                        </Field>
                                        <Field name='password'>
                                            {({field})=>(
                                                <TextField label="Password" variant="filled" margin='normal' fullWidth {...field}/>
                                            )}
                                        </Field>
                                    </Container>
                                    <Container sx={{display:'flex',justifyContent: 'space-between',alignItems: 'end', marginBottom: '2rem'}}>
                                        <Link href="#" underline="always">
                                            Forgot password?
                                        </Link>
                                        <Button type='submit' variant="contained" color='error'>Sign Up</Button>
                                    </Container>
                                </Form>
                            )}
                        </Formik>
                    </Card>
        </>
    )
}

export interface CredentialDto {
    email: string;
    password: string;
}