export const formEntities = [
    {
        name: "email", type: "email", colClass: 'form-group mt-3', className: "", htmlFor: "email", value: "", label: "", placeholder: "Email",
        validate: true,
        maxLength: 40,
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
        name: "username", type: "text", colClass: 'form-group mt-3', className: "", htmlFor: "username", value: "",
        label: "", placeholder: "Username",
        maxLength: 15,
        validate: true, readonly: "",
        tab: "login_detail",
        validateOptions: [
            {
                rule: "required",
                msg: "Username is Required"
            },
        ]
    },

    {
        name: "phone_no", type: "number", colClass: 'form-group mt-3', className: "", htmlFor: "phone_no", value: "", label: "",
        placeholder: "Phone No",
        validate: true,
        maxLength: 10,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Phone no is Required"
            },
            {
                rule: "phone_no",
                msg: "Enter Indian phone number format"
            }
        ]
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
    {
        name: "password_confirmation", type: "password", colClass: 'form-group mt-3', className: "", htmlFor: "password_confirmation", value: "",
        label: "", placeholder: "Confirm Password", readonly: "",
        validate: true,
        maxLength: 15,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "required",
                msg: "Confirm password is Required"
            },
            {
                rule: "equal",
                equal: "password",
                msg: "Confirm password equal to Password"
            }
        ]
    },
];

export const formStates = {
    title: "Register",
    submitted: false,
    submitDisabled: "",
    status: { show: false, type: 'success', msg: '' },
    errorsModalTrigger: "fade",
    errors: [],
    tabs: [],
    params: {
        encrypt_id: null,
        email: "leo@gmail.com",
        phone_no: "9629188839",
        username: "leo",
        password: "9",
    },
    validations: {
        hasEmailRequired: true,
        hasEmailEmail: true,
        hasPhone_noRequired: true,
        hasPhone_noPhone_no: false,
        hasUsernameRequired: true,
        hasPasswordRequired: true,
        hasPassword_confirmationRequired: true,
        hasPassword_confirmationEqual: false,
    },
    validate: false,
}