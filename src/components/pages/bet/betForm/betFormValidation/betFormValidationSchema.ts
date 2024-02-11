import * as yup from 'yup';

export const betFormValidationSchema = yup.object().shape({
    title: yup
        .string()
        .required('Required field'),

    desc: yup
        .string()
        .required('Required field')
        .min(15, 'Not shorter than 15 characters!')
        .max(300, 'No longer than 300 characters!'),

    minRates: yup
        .string()
        .matches(/^\d+$/, 'MinRates must be a positive integer')
        .required('Required field'),

    image: yup
        .mixed(),

    endDate: yup
        .array()
        .of(yup.date())
        .min(1, 'Please select a date range')
        .required('Please select a date range')
});
