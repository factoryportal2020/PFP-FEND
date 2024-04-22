export const formEntities = [
    {
        name: "email", type: "text", colClass: 'form-group mt-3', className: "", htmlFor: "email", value: "", label: "", placeholder: "Email",
        validate: true,
        maxLength: 40,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Email is Required"
            }]
    },

    {
        name: "password", type: "password", colClass: 'form-group mt-3', className: "", htmlFor: "password", value: "",
        label: "", placeholder: "Password", readonly: "",
        validate: true,
        maxLength: 15,
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
        email: "",
        password: "",
    },
    validations: {
        hasEmailRequired: true,
        hasPasswordRequired: true,
    },
    validate: false,
}