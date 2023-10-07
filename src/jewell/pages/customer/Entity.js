export const formEntities = [
    {
        name: "first_name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "First name", value: "",
        label: "First name", placeholder: "Ram",
        validate: true,
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
        colClass: 'col-md-4',
        className: "",
        htmlFor: "Image",
        value: "",
        label: "Profile Image",
        multiple: "multiple",
        placeholder: "",
        validate: false,
        tab: "images",
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
        validateOptions: [
            {
                rule: "phone_no",
                msg: "Enter Indian phone number format"
            }
        ]
    },

    {
        name: "instagram_id", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Instagram_id", value: "",
        label: "Instagram Id", placeholder: "Kumar",
        tab: "details",
        validate: false,
    },

    {
        name: "address", type: "textarea", colClass: 'col-md-3', className: "", htmlFor: "Address", value: "",
        label: "Address", placeholder: "Address",
        validate: true,
        tab: "details",
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
        label: "Notes", placeholder: "notes",
        validate: true,
        validateOptions: [
            {
                rule: "required",
                msg: "Notes is Required"
            }]
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
        label: "User Name", placeholder: "Ram",
        validate: true,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "required",
                msg: "User name is Required"
            }]
    },
    {
        name: "password", type: "password", colClass: 'col-md-3', className: "", htmlFor: "Password", value: "",
        label: "Password", placeholder: "*****",
        validate: true,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "required",
                msg: "Password is Required"
            }]
    },
    {
        name: "confirm_password", type: "confirm_password", colClass: 'col-md-3', className: "", htmlFor: "Confirm_password", value: "",
        label: "Confirm Password", placeholder: "*****",
        validate: true,
        tab: "login_detail",
        validateOptions: [
            {
                rule: "required",
                msg: "Confirm password is Required"
            }]
    }
    // { type: "div", colClass: 'col-md-6' },
];

export const formStates = {
    title: "Customer",
    status: { show: false, type: 'success', msg: '' },
    tabs: [{ id: "details", tab: "Details" }, { id: "images", tab: "Images" }, { id: "login_detail", tab: "Login Detail" }],
    params: {
        encrypt_id: null,
        first_name: "leo",
        last_name: "ram",
        code: "",
        email: "leo@gmail.com",
        phone_no: "9629188839",
        whatsapp_no: "9629188839",
        instagram_id: "9629188839",
        gender: "male",
        address: "122",
        state: "Tamilnadu",
        city: "Coimbatore",
        notes: "",
        username: "",
        password: "",
        profile_image: [],
        status: 1,
    },
    validations: {
        hasFirst_nameRequired: true,
        hasLast_nameRequired: true,
        hasEmailRequired: true,
        hasEmailEmail: true,
        hasPhone_noRequired: true,
        hasPhone_noPhone_no: true,
        hasGenderRequired: true,
        hasCityRequired: true,
        hasStateRequired: true,
        hasProfile_imageImage: false,
    },
    validate: false,
}

export const listStates = {
    title: "Customers",
    params: {
        search_word: "",
        city: "",
    }
}


export const listDatas = {
    title: "Customers",
    status: { show: false, type: 'success', msg: '' },
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
            { value: '1', label: 'Coimbatore' },
            { value: '2', label: 'Ooty' }
        ]
    }
]