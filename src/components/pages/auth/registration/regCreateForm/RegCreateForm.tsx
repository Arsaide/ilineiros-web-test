import React, { FC, useContext, useState } from 'react';
import { Context } from '../../../../../index';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '../../../../layout/common/inputs/input/Input';
import { regCreateValidationSchema } from './regCreateValidation/regCreateValidationSchema';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { ButtonColors } from '../../../../../lib/colors/ButtonColors';
import { MainColors } from '../../../../../lib/colors/MainColors';
import { DialogContentText } from '@mui/material';

interface RegCreateFormProps {
    onSubmit: () => void;
}

interface RegCreateFormValues {
    code: string;
}

const RegCreateForm: FC<RegCreateFormProps> = ({ onSubmit }) => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        code: '',
    };

    const handleSubmit = async (values: RegCreateFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.registerCreate(values.code);
            if (response && response.status === 200) {
                onSubmit();
            }
        } catch (e: any) {
            setIsSubmitting(false);
            setErrorMessage(e.response?.data?.message);
            toast.error(e.response?.data?.message);
        }
    };

    return (
        <>
            <Formik
                validationSchema={regCreateValidationSchema}
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isValid }) => (
                    <Form>
                        <Typography
                            variant={'h6'}
                            sx={{
                                bgcolor: MainColors.GRAY595,
                                color: MainColors.WHITE,
                                pb: 3,
                            }}
                        >
                            Email confirmation
                        </Typography>
                        <DialogContentText
                            sx={{ color: MainColors.WHITE, ml: 0, mb: 1 }}
                        >
                            Enter the code that came to your email
                        </DialogContentText>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: 2,
                            }}
                        >
                            <Input
                                id={'code'}
                                label={'Your Code'}
                                name={'code'}
                                placeholder={'Enter your code'}
                                type={'number'}
                            />

                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                sx={{
                                    bgcolor: ButtonColors.LGREEN,
                                    '&:hover': {
                                        bgcolor: ButtonColors.DGREEN,
                                    },
                                    '&:disabled': {
                                        bgcolor: ButtonColors.LRED,
                                        color: ButtonColors.WHITE,
                                    },
                                }}
                            >
                                {isSubmitting
                                    ? 'Submitting code...'
                                    : 'Verify code'}
                            </Button>
                        </Box>
                        {errorMessage && (
                            <Typography
                                sx={{
                                    color: ButtonColors.LRED,
                                    maxWidth: '340px',
                                }}
                            >
                                {errorMessage}
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default RegCreateForm;
