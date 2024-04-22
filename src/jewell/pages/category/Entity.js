export const formEntities = [
    {
        name: "name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "name", value: "",
        label: "Title", placeholder: "Ring",
        validate: true,
        maxLength: 20,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Title is Required"
            }]
    },
    {
        name: "sub_title", type: "text", colClass: 'col-md-3', className: "", htmlFor: "sub_title", value: "",
        label: "Sub title", placeholder: "Men's lucky ring",
        validate: true,
        maxLength: 30,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Sub title is Required"
            }]
    },
    {
        name: "code", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Code", value: "",
        label: "Code", placeholder: "", readonly: "readonly",
        tab: "details",
        validate: false,
    },
    {
        name: "category_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "",
        htmlFor: "Image",
        value: "",
        label: "Category Image",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "details",
        validateOptions: [
            // {
            //     rule: "required",
            //     msg: "Image is Required"
            // },
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]

    },
    {
        name: "description", type: "textarea", colClass: 'col-md-3', className: "", htmlFor: "Description", value: "",
        tab: "details",
        maxLength: 300,
        label: "Description", placeholder: "description",
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
        name: "is_show", type: "radio", colClass: 'col-md-3', className: "", htmlFor: "is_show", value: 1, label: "Showing in website", placeholder: "",
        tab: "details",
        validate: false,
        options: [
            { value: 1, label: 'Show' },
            { value: 0, label: 'Hide' }
        ],
    },
    // { type: "div", colClass: 'col-md-6' },
];

// declared in index.js
// export const formStates = {
//     title: "Category",
//     listLink: "category",
//     submitted: false,
//     submitDisabled: "",
//     status: { show: false, type: 'success', msg: '' },
//     clickedTabId: 0,
//     errorsModalTrigger: "fade",
//     errors: [],
//     tabs: [{ id: "details", tab: "Details" }],
//     params: {
//         encrypt_id: null,
//         deleteImages: [], // Edit purpose
//         name: "",
//         description: "",
//         code: "",
//         category_image: [],
//         status: 1,
//     },
//     validations: {
//         hasNameRequired: true,

//         //Inital false
//         hasCategory_imageImage: false,
//     },
//     validate: false,
// }
//end declared in index.js


export const listStates = {
    title: "Categories",
    addLink: "category",
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
                name: "",
                description: "",
                category_image: [{ "name": "dbc9a21512bf6a7b9988f41fe5c6d403.jpg" }],
                status: 1,
                created_at: ""
            },
        ]
    }
}


export const listDatas = {
    datas: [
        {
            encrypt_id: "",
            code: "",
            name: "",
            description: "",
            category_image: [],
            status: 1,
        },
    ]
}


export const filterEntities = [
    {
        name: "search_word", type: "text", colClass: 'col-sm', className: "fs-12", htmlFor: "", value: "",
        label: "", placeholder: "Search",
        validate: false,
    }
]