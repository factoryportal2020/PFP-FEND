export const customerEntities = [
    {
        name: "name", type: "text", colClass: 'col-md-4', className: "", htmlFor: "Name", value: "",
        label: "Name", placeholder: "Leo",
        validate: true,
        validateOptions: [
            {
                rule: "required",
                msg: "Name is Required"
            }]
    },
    {
        name: "email", type: "email", colClass: 'col-md-4', className: "", htmlFor: "Email", value: "", label: "Email", placeholder: "leo@gmail.com",
        validate: true,
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
        name: "phone_no", type: "number", colClass: 'col-md-4', className: "", htmlFor: "PhoneNo", value: "", label: "Phone No", placeholder: "9629188839",
        validate: true,
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
        name: "gender", type: "select", colClass: 'col-md-4', className: "", htmlFor: "Gender", value: "", label: "Gender", placeholder: "Male",
        validate: true,
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
        name: "domain", type: "checkbox", colClass: 'col-md-4', className: "", htmlFor: "Domain", value: "", label: "Domain", placeholder: "",
        validate: true,
        options: [
            { value: 'jewell', label: 'Jewell' },
            { value: 'textile', label: 'Textile' },
            { value: 'textile1', label: 'Textile1' },
            { value: 'textile2', label: 'Textile2' },
            { value: 'textile3', label: 'Textile3' },
        ],
        validateOptions: [
            {
                rule: "required_array",
                msg: "Domain is Required"
            },
        ]

    },
    {
        name: "description", type: "textarea", colClass: 'col-md-4', className: "", htmlFor: "Description", value: "",
        label: "Description", placeholder: "Leo is the customer for this domain",
        validate: true,
        validateOptions: [
            {
                rule: "required",
                msg: "Description is Required"
            }]
    },
    {
        name: "datetime", type: "datetime", colClass: 'col-md-4', className: "", htmlFor: "Datetime", value: "", label: "Datetime", placeholder: "",
        validate: true,
        validateOptions: [
            {
                rule: "required",
                msg: "Datetime is Required"
            }]

    },
    {
        name: "images",
        type: "file",
        fileType: "image",
        colClass: 'col-md-4',
        className: "",
        htmlFor: "Image",
        value: "",
        label: "Images",
        multiple: "multiple",
        placeholder: "",
        validate: true,
        validateOptions: [
            {
                rule: "required_array",
                msg: "Images is Required"
            },
            {
                rule: "image",
                msg: "Only upload image format ",
            }
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
        multiple: "",
        placeholder: "",
        validate: true,
        validateOptions: [
            {
                rule: "required_array",
                msg: "Image is Required"
            },
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]

    },
    {
        name: "docs",
        type: "file",
        fileType: "doc",
        colClass: 'col-md-4',
        className: "",
        htmlFor: "Doc",
        value: "",
        label: "Docs",
        multiple: "mulitple",
        placeholder: "",
        validate: true,
        validateOptions: [
            {
                rule: "required_array",
                msg: "Resume is Required"
            },
            {
                rule: "doc",
                msg: "Only upload .doc (or) .docx format ",
            }
        ]

    },
    {
        name: "excels",
        type: "file",
        fileType: "excel",
        colClass: 'col-md-4',
        className: "",
        htmlFor: "Excels",
        value: "",
        label: "Excel",
        multiple: "mulitple",
        placeholder: "",
        validate: true,
        validateOptions: [
            {
                rule: "required_array",
                msg: "Excel is Required"
            },
            {
                rule: "excel",
                msg: "Only upload .xls (or) .xlsx format ",
            }
        ]

    },
    {
        name: "status", type: "radio", colClass: 'col-md-4', className: "", htmlFor: "Status", value: 1, label: "Status", placeholder: "",
        validate: false,
        options: [
            { value: 1, label: 'Active' },
            { value: 0, label: 'Deactive' }
        ],
    },
    // { type: "div", colClass: 'col-md-6' },
];

export const customerStates = {
    title: "Customer",
    status: { show: false, type: 'success', msg: '' },
    params: {
        encrypt_id: null,
        name: "",
        email: "",
        phone_no: "",
        gender: "",
        domain: [],
        description: "",
        // images: [{ file: {}, name: "" }],
        images: [],
        docs: [],
        excels: [],
        profile_image: [],
        status: 1,
        datetime: new Date(),
    },
    validations: {
        hasEmailRequired: true,
        hasEmailEmail: true,
        hasNameRequired: true,
        hasPhone_noRequired: true,
        hasPhone_noPhone_no: true,
        hasGenderRequired: true,
        hasDomainRequired_array: true,
        hasDescriptionRequired: true,
        hasDatetimeRequired: true,
        hasImagesRequired_array: true,
        hasImagesImage: true,
        hasProfile_imageRequired_array: true,
        hasProfile_imageImage: true,
        hasDocsRequired_array: true,
        hasDocsDoc: true,
        hasExcelsRequired_array: true,
        hasExcelsExcel: true,
    },
    validate: false,
}

