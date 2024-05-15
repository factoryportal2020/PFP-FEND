export const formEntities = [
    {
        name: "working_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "",
        htmlFor: "WorkingImage",
        value: "",
        label: "Working Images (x)",
        multiple: "multiple",
        placeholder: "",
        validate: true,
        tab: "images",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
    {
        name: "completed_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "",
        htmlFor: "CompletedImage",
        value: "",
        label: "Completed Images (x)",
        multiple: "multiple",
        placeholder: "",
        validate: true,
        tab: "images",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
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
    title: "Tasks",
    addLink: "task",
    status: { show: false, type: 'success', msg: '' },
    params: {
        search_word: "",
        category_id: "",
        customer_id: "",
        status: "",
        worker_id: "",
        start_date: "",
        end_date: "",
        itemPerPage: 10,
        currentPage: 1,
    },
    datas: {
        totalCount: 0,
        data: [
            {
                encrypt_id: "",
                code: "",
                title: "",
                description: "",
                specification: "",
                quantity: "",
                price: "",
                category_id: "",
                customer_id: "",
                worker_id: "",
                start_date: "",
                end_date: "",
                task_image: [{ "name": "dbc9a21512bf6a7b9988f41fe5c6d403.jpg" }],
                customer_image: [{ "name": "dbc9a21512bf6a7b9988f41fe5c6d403.jpg" }],
                worker_image: [{ "name": "dbc9a21512bf6a7b9988f41fe5c6d403.jpg" }],
                status: "Unassigned",
                overdue: "",
                created_at: "",
                updated_at: ""
            },
        ]
    }
}


export const listDatas = {
    datas: [
        {
            encrypt_id: "",
            code: "",
            title: "",
            category_id: "",
            customer_id: "",
            worker_id: "",
            start_date: "",
            end_date: "",
            description: "",
            specification: "",
            quantity: "",
            price: "",
            task_image: [],
            worker_image: [],
            customer_image: [],
            status: "Unassigned",
        },
    ]
}


export const filterEntities = [
    {
        name: "search_word", type: "text", colClass: 'col-sm-3', className: "fs-12", htmlFor: "", value: "",
        label: "", placeholder: "Search",
        validate: false,
    },
    {
        name: "category_id", type: "select", colClass: 'col-sm-3',
        className: "fs-12", htmlFor: "", value: "", label: "Category", placeholder: "All",
        validate: false,
        options: [
            { value: '', label: 'All' },
        ]
    },
    {
        name: "status", type: "select", colClass: 'col-md-3',
        className: "fs-12", htmlFor: "status", value: "", label: "Status", placeholder: "All",
        validate: false,
        options: [
            { value: "Assigned", label: "Assigned" },
            { value: "Inprogress", label: "Inprogress" },
            { value: "Holding", label: "Holding" },
            { value: "Restarted", label: "Restarted" },
            { value: "Completed", label: "Completed" },
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "Status is Required"
            },
        ]
    },
    {
        name: "start_date", type: "datetime", colClass: 'col-md-4', className: "", htmlFor: "start_date", value: "",
        label: "Start Date", placeholder: "",
        validate: false,
    },
    {
        name: "end_date", type: "datetime", colClass: 'col-md-4', className: "", htmlFor: "end_date", value: "",
        label: "Due Date", placeholder: "",
        validate: false,
    }
]

export const changeStatusEntities = [

    {
        name: "status", type: "select", colClass: 'col-md-12',
        className: "fs-12", htmlFor: "status", value: "", label: "Status", placeholder: "All",
        validate: false,
        tab: "details",
        options: [
            { value: "Assigned", label: "Assigned" },
            { value: "Inprogress", label: "Inprogress" },
            { value: "Holding", label: "Holding" },
            { value: "Restarted", label: "Restarted" },
            { value: "Completed", label: "Completed" },
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "Status is Required"
            },
        ]
    },
    {
        name: "comment", type: "text", colClass: 'col-md-12', className: "fs-12", htmlFor: "Comment", value: "",
        label: "Comment", placeholder: "", tab: "details",
        validate: false,
    },
]


export const specificationEntities = [
    {
        name: "label_name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "label_name", value: "",
        label: "Label name", placeholder: "Product Story",
        validate: false,
        tab: "images",
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
        tab: "images",
        validateOptions: [
            {
                rule: "required",
                msg: "Value is Required"
            }]
    }
]