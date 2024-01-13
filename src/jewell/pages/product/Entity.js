export const formEntities = [
    {
        name: "name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "name", value: "",
        label: "Name", placeholder: "Ring",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Name is Required"
            }]
    },
    {
        name: "category_id", type: "select", colClass: 'col-md-3', className: "", htmlFor: "category", value: "", label: "Category", placeholder: "category",
        validate: true,
        tab: "details",
        options: [
            { value: '', label: 'Select Category' },
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "Category is Required"
            },
        ]
    },
    {
        name: "code", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Code", value: "",
        label: "Code", placeholder: "", readonly: "readonly",
        tab: "details",
        validate: false,
    },
    {
        name: "note", type: "text", colClass: 'col-md-3', className: "", htmlFor: "note", value: "",
        label: "Sub-title", placeholder: "",
        validate: false,
        tab: "details",
    },
    {
        name: "specification", type: "text", colClass: 'col-md-3', className: "", htmlFor: "specification", value: "",
        label: "Specification", placeholder: "",
        validate: false,
        tab: "details",
    },
    {
        name: "price", type: "number", colClass: 'col-md-3', className: "", htmlFor: "price", value: "",
        label: "Price", placeholder: "",
        validate: false,
        tab: "details",
    },
    {
        name: "item_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md mb-5',
        className: "",
        htmlFor: "Image",
        value: "",
        label: "Item Image",
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
        name: "other_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "",
        htmlFor: "Image",
        value: "",
        label: "Other Images (multiple)",
        multiple: "multiple",
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
        name: "description", type: "textarea", colClass: 'col-md-3', className: "", htmlFor: "Description", value: "",
        tab: "details",
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
    // { type: "div", colClass: 'col-md-6' },
];

// declared in index.js
// export const formStates = {
//     title: "Item",
//     listLink: "item",
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
//         category_id:"",
//         code: "",
//         item_image: [],
//         status: 1,
//     },
//     validations: {
//         hasNameRequired: true,

//         //Inital false
//         hasItem_imageImage: false,
//     },
//     validate: false,
// }
//end declared in index.js


export const listStates = {
    title: "Products",
    addLink: "product",
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
                category_id: "",
                item_image: [{ "name": "dbc9a21512bf6a7b9988f41fe5c6d403.jpg" }],
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
            category_id: "",
            description: "",
            item_image: [],
            status: 1,
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
        name: "category_id", type: "select", colClass: 'col-sm',
        className: "fs-12", htmlFor: "", value: "", label: "Category", placeholder: "All",
        validate: false,
        options: [
            { value: '', label: 'All' },
        ]
    },
]


export const specificationEntities = [
    {
        name: "label_name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "label_name", value: "",
        label: "Label name", placeholder: "Product Story",
        validate: false,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Label name is Required"
            }]
    },
    {
        name: "value", type: "text", colClass: 'col-md-3', className: "", htmlFor: "value", value: "",
        label: "Value", placeholder: "",
        validate: false,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Value is Required"
            }]
    }
]