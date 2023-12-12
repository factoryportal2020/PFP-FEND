export const formEntities = [
    {
        name: "email", type: "email", colClass: 'form-group mt-3', className: "", htmlFor: "email", value: "", label: "", placeholder: "Email",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Email is Required"
            },
            {
                rule: "email",
                msg: "Email format is wrong",
            }]
    },

    {
        name: "password", type: "password", colClass: 'form-group mt-3', className: "", htmlFor: "password", value: "",
        label: "", placeholder: "Password", readonly: "",
        validate: true,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "required",
                msg: "Password is Required"
            },
        ]
    },
];

export const formStates = {
    title: "Login",
    submitted: false,
    submitDisabled: "",
    status: { show: false, type: 'success', msg: '' },
    errorsModalTrigger: "fade",
    errors: [],
    tabs: [],
    params: {
        encrypt_id: null,
        email: "logu@gmail.com",
        password: "98659",
    },
    validations: {
        hasEmailRequired: true,
        hasEmailEmail: true,
        hasPasswordRequired: true,
    },
    validate: false,
}