export const formEntities = [
    {
        name: "title", type: "text", colClass: 'col-md-3', className: "", htmlFor: "title", value: "",
        label: "Title", placeholder: "Task-1",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Title is Required"
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
        name: "worker_id", type: "select", colClass: 'col-md-3', className: "", htmlFor: "worker", value: "", label: "Worker", placeholder: "worker",
        validate: true,
        tab: "details",
        options: [
            { value: '', label: 'Select Worker' },
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "Worker is Required"
            },
        ]
    },
    {
        name: "customer_id", type: "select", colClass: 'col-md-3', className: "", htmlFor: "customer", value: "", label: "Customer", placeholder: "customer",
        validate: false,
        tab: "details",
        options: [
            { value: '', label: 'Select Customer' },
        ]
    },
    {
        name: "code", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Code", value: "",
        label: "Code", placeholder: "", readonly: "readonly",
        tab: "details",
        validate: false,
    },
    {
        name: "quantity", type: "number", colClass: 'col-md-3', className: "", htmlFor: "quantity", value: "",
        label: "Quantity", placeholder: "",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Quantity is Required"
            },
        ]
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
        name: "task_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md mb-5',
        className: "",
        htmlFor: "Image",
        value: "",
        label: "Task Image",
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
        name: "initial_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "",
        htmlFor: "InitialImage",
        value: "",
        label: "Initial Images (x)",
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
    {
        name: "delivered_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "",
        htmlFor: "DeliveredImage",
        value: "",
        label: "Delivered Images (x)",
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
        name: "description", type: "textarea", colClass: 'col-md-3', className: "", htmlFor: "Description", value: "",
        tab: "details",
        label: "Description", placeholder: "description",
        validate: false,
    },

    {
        name: "status", type: "select", colClass: 'col-md-3', className: "", htmlFor: "status", value: "Unassigned", label: "Status", placeholder: "status",
        validate: true,
        tab: "details",
        options: [
            { value: "Unassigned", label: "Unassigned" },
            { value: "Assigned", label: "Assigned" },
            { value: "Inprogress", label: "Inprogress" },
            { value: "Holding", label: "Holding" },
            { value: "Restarted", label: "Restarted" },
            { value: "Cancelled", label: "Cancelled" },
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
            { value: "Delivered", label: "Delivered" }
        ],
        validateOptions: [
            {
                rule: "required",
                msg: "Status is Required"
            },
        ]
    },
    {
        name: "start_date", type: "datetime", colClass: 'col-md-3', className: "", htmlFor: "start_date", value: "",
        label: "Start Date", placeholder: "",
        validate: false,
        tab: "details",
    },
    {
        name: "end_date", type: "datetime", colClass: 'col-md-3', className: "", htmlFor: "end_date", value: "",
        label: "Due Date", placeholder: "",
        validate: false,
        tab: "details",
    }
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
        name: "worker_id", type: "select", colClass: 'col-sm-3',
        className: "fs-12", htmlFor: "", value: "", label: "Worker", placeholder: "All",
        validate: false,
        options: [
            { value: '', label: 'All' },
        ]
    },
    {
        name: "customer_id", type: "select", colClass: 'col-sm-3',
        className: "fs-12", htmlFor: "", value: "", label: "Customer", placeholder: "All",
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
            { value: '', label: 'All' },
            { value: "Unassigned", label: "Unassigned" },
            { value: "Assigned", label: "Assigned" },
            { value: "Inprogress", label: "Inprogress" },
            { value: "Holding", label: "Holding" },
            { value: "Restarted", label: "Restarted" },
            { value: "Cancelled", label: "Cancelled" },
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
            { value: "Delivered", label: "Delivered" }
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
            { value: "Unassigned", label: "Unassigned" },
            { value: "Assigned", label: "Assigned" },
            { value: "Inprogress", label: "Inprogress" },
            { value: "Holding", label: "Holding" },
            { value: "Restarted", label: "Restarted" },
            { value: "Cancelled", label: "Cancelled" },
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
            { value: "Delivered", label: "Delivered" }
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