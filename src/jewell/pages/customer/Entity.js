export const formEntities = [
    {
        name: "first_name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "First name", value: "",
        label: "First name", placeholder: "Ram",
        validate: true,
        maxLength: 15,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "First name is Required"
            }]
    },
    {
        name: "last_name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Last name", value: "",
        label: "Last name", placeholder: "Kumar",
        validate: true,
        maxLength: 15,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Last name is Required"
            }]
    },
    {
        name: "code", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Code", value: "",
        label: "Code", placeholder: "", readonly: "readonly",
        tab: "details",
        validate: false,
    },


    {
        name: "gender", type: "select", colClass: 'col-md-3', className: "", htmlFor: "Gender", value: "", label: "Gender", placeholder: "Male",
        validate: true,
        tab: "details",
        options: [
            { value: '', label: 'Select Gender' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "Gender is Required"
            },
        ]
    },
    {
        name: "profile_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "",
        htmlFor: "Image",
        value: "",
        label: "Profile Image",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]

    },

    {
        name: "email", type: "email", colClass: 'col-md-3', className: "", htmlFor: "Email", value: "", label: "Email", placeholder: "leo@gmail.com",
        validate: true,
        tab: "details",
        maxLength: 40,
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
        name: "phone_no", type: "number", colClass: 'col-md-3', className: "", htmlFor: "PhoneNo", value: "", label: "Phone No", placeholder: "9629188839",
        validate: true,
        tab: "details",
        maxLength: 10,
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
        name: "whatsapp_no", type: "number", colClass: 'col-md-3', className: "", htmlFor: "Whatsapp_no", value: "", label: "Whatsapp No", placeholder: "9629188839",
        validate: true,
        tab: "details",
        maxLength: 10,
        validateOptions: [
            {
                rule: "phone_no",
                msg: "Enter Indian phone number format"
            }
        ]
    },

    {
        name: "instagram_id", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Instagram_id", value: "",
        label: "Instagram Id (@id)", placeholder: "Kumar",
        maxLength: 30,
        tab: "details",
        validate: false,
    },

    {
        name: "address", type: "textarea", colClass: 'col-md-3', className: "", htmlFor: "Address", value: "",
        label: "Address", placeholder: "Address",
        validate: true,
        tab: "details",
        maxLength: 200,
        validateOptions: [
            {
                rule: "required",
                msg: "Address is Required"
            }]
    },
    {
        name: "state", type: "select", colClass: 'col-md-3', className: "", htmlFor: "state", value: "", label: "state", placeholder: "state",
        validate: true,
        tab: "details",
        options: [
            { value: '', label: 'Select State' },
            { value: 'Tamilnadu', label: 'Tamilnadu' },
            { value: 'Kerala', label: 'Kerala' }
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "State is Required"
            },
        ]
    },
    {
        name: "city", type: "select", colClass: 'col-md-3', className: "", htmlFor: "city", value: "", label: "City", placeholder: "city",
        validate: true,
        tab: "details",
        options: [
            { value: '', label: 'Select City' },
            { value: 'Coimbatore', label: 'Coimbatore' },
            { value: 'Ooty', label: 'Ooty' },
            { value: 'Theni', label: 'Theni' }
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "City is Required"
            },
        ]
    },
    {
        name: "notes", type: "textarea", colClass: 'col-md-3', className: "", htmlFor: "Notes", value: "",
        tab: "details",
        maxLength: 300,
        label: "Notes", placeholder: "notes",
        validate: false,
    },
    {
        name: "status", type: "radio", colClass: 'col-md-3', className: "", htmlFor: "Status", value: 1, label: "Status", placeholder: "",
        tab: "details",
        validate: false,
        options: [
            { value: 1, label: 'Active' },
            { value: 0, label: 'Deactive' }
        ],
    },
    {
        name: "username", type: "text", colClass: 'col-md-3', className: "", htmlFor: "username", value: "",
        label: "User Name", placeholder: "",
        validate: true, readonly: "",
        maxLength: 15,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "have",
                have: "password",
                msg: "Username is Required"
            },
            {
                rule: "have_to",
                have_to: "password",
                msg: "password is Required" //msg actually not working
            }
        ]
    },
    {
        name: "password", type: "password", colClass: 'col-md-3', className: "", htmlFor: "Password", value: "",
        label: "Password", placeholder: "*****", readonly: "",
        validate: true,
        maxLength: 15,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "have", //if username have value this password should get value 
                have: "username",
                msg: "Password is Required"
            },
            {
                rule: "have_to",
                have_to: "username",
                msg: "username is Required" //actually not working
            },
            // {
            //     rule: "have_to",
            //     have_to: "password_confirmation",
            //     msg: "password_confirmation is Required" //actually not working
            // }
        ]
    },
    {
        name: "password_confirmation", type: "password_confirmation", colClass: 'col-md-3', className: "", htmlFor: "Confirm_password", value: "",
        label: "Confirm Password", placeholder: "*****", readonly: "",
        validate: true,
        maxLength: 15,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "equal",
                equal: "password",
                msg: "Confirm password equal to Password"
            }
        ]
    },
    {
        name: "change_password", type: "button", colClass: 'hide',
        className: "normal__btn", htmlFor: "Change Password",
        value: "",
        disabled: "",
        toggle: "hide",
        label: "Change Password", placeholder: "",
        validate: false,
        tab: "login_detail"
    }
    // { type: "div", colClass: 'col-md-6' },
];

export const buttonStates = [
    {
        name: "change_password", type: "button", colClass: 'col-md-3',
        className: "normal__btn", htmlFor: "Change Password",
        value: "",
        label: "Change Password", placeholder: "",
        validate: false,
        tab: "login_detail"
    },
];


/* declared in index file
export const formStates = {
    title: "Customer",
    listLink: "customer",
    submitted: false,
    submitDisabled: "",
    status: { show: false, type: 'success', msg: '' },
    clickedTabId: 0,
    errorsModalTrigger: "fade",
    errors: [],
    tabs: [{ id: "details", tab: "Details" }, { id: "login_detail", tab: "Login Detail" }],
    validate: false,
    params: {
        encrypt_id: null,
        deleteImages: [], // Edit purpose
        isPasswordChange: false,
        first_name: "",
        last_name: "",
        code: "",
        email: "",
        phone_no: "",
        whatsapp_no: "",
        instagram_id: "",
        gender: "",
        address: "",
        state: "",
        city: "",
        notes: "",
        username: "",
        password: "",
        profile_image: [],
        status: 1,
        old_username: ""
    },
    validations: {
        hasFirst_nameRequired: true,
        hasLast_nameRequired: true,
        hasEmailRequired: true,
        hasEmailEmail: true,
        hasPhone_noRequired: true,
        hasPhone_noPhone_no: false,
        hasGenderRequired: true,
        hasCityRequired: true,
        hasStateRequired: true,

        //Inital false
        hasProfile_imageImage: false,

        hasUsernameHave_to: false,
        hasUsernameHave: false,

        hasPasswordHave_to: false,
        hasPasswordHave: false,

        hasConfirm_passwordHave_to: false,
        hasPassword_confirmationEqual: false
    }
};
*/
/* end declared in index file */

export const listStates = {
    title: "Customers",
    addLink: "customer",
    status: { show: false, type: 'success', msg: '' },
    params: {
        search_word: "",
        city: "",
        itemPerPage: 10,
        currentPage: 1,
    },
    datas: {
        totalCount: 0,
        data: [
            {
                encrypt_id: "",
                code: "",
                first_name: "",
                last_name: "",
                phone_no: "",
                gender: "",
                address: "",
                whatsapp_no: "",
                state: "",
                city: "",
                notes: "",
                profile_image: [{ "name": "dbc9a21512bf6a7b9988f41fe5c6d403.jpg" }],
                email: "",
                password: "",
                status: 1,
                created_at: "2023-08-09 02:20:00"
            },
        ]
    }
}


export const listDatas = {
    datas: [
        {
            encrypt_id: "",
            code: "",
            first_name: "",
            last_name: "",
            phone_no: "",
            gender: "",
            address: "",
            whatsapp_no: "",
            instagram_id: "",
            state: "",
            city: "",
            notes: "",
            username: "",
            password: "",
            profile_image: [],
            email: "",
            status: 1,
            password: "",
        },
    ]
}


export const filterEntities = [
    {
        name: "search_word", type: "text", colClass: 'col-sm', className: "fs-12", htmlFor: "", value: "",
        label: "", placeholder: "Search",
        validate: false,
    },
    {
        name: "city", type: "select", colClass: 'col-sm',
        className: "fs-12", htmlFor: "", value: "", label: "City", placeholder: "Select City",
        validate: false,
        options: [
            { value: '', label: 'Select City' },
            { value: 'Coimbatore', label: 'Coimbatore' },
            { value: 'Ooty', label: 'Ooty' }
        ]
    }
]