export const formEntities = [
    {
        name: "name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Company name", value: "",
        label: "Company Name", placeholder: "ABc Company",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Company name is Required"
            }]
    },
    {
        name: "site_url", type: "text", colClass: 'col-md-6', className: "", htmlFor: "Site Url", value: "",
        label: "Site Url", placeholder: "abcjewelly",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Site Url is Required"
            }]
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
        name: "landline_no", type: "number", colClass: 'col-md-3', className: "", htmlFor: "LandlineNo", value: "", label: "Landline No", placeholder: "9629188839",
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "required",
                msg: "Landline no is Required"
            },
            {
                rule: "phone_no",
                msg: "Enter Indian Landline number format"
            }
        ]
    },
    {
        name: "phone_no", type: "number", colClass: 'col-md-3', className: "", htmlFor: "PhoneNo", value: "", label: "Phone No", placeholder: "9629188839",
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
        name: "instagram_link", type: "text", colClass: 'col-md-6', className: "", htmlFor: "Instagram Link", value: "",
        label: "Instagram Link", placeholder: "",
        validate: false,
        tab: "details",
    },
    {
        name: "facebook_link", type: "text", colClass: 'col-md-6', className: "", htmlFor: "Facebook link", value: "",
        label: "Facebook link", placeholder: "",
        validate: false,
        tab: "details",
    },
    {
        name: "twitter_link", type: "text", colClass: 'col-md-6', className: "", htmlFor: "Twitter link", value: "",
        label: "Twitter link", placeholder: "",
        validate: false,
        tab: "details",
    },
    {
        name: "about", type: "tinyMCE", colClass: 'col-md', className: "", htmlFor: "About", value: "",
        label: "About", placeholder: "",
        tab: "about",
        validate: false,
    },
    {
        name: "about_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "medium-file",
        htmlFor: "Image",
        value: "",
        label: "About Image",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "about",
        width: 300,
        height: 300,
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
{
    name: "banner1_image",
    type: "file",
    fileType: "image",
    colClass: 'col-md',
    className: "banner-file",
    htmlFor: "BannerImage1",
    value: "",
    label: "Banner Image-1",
    multiple: "",
    placeholder: "",
    validate: true,
    tab: "banner",
    width: 1500,
    height: 900,
    validateOptions: [
        {
            rule: "image",
            msg: "Only upload image format ",
        }
    ]
},
    {
        name: "banner1_title", type: "text", colClass: '', className: "", htmlFor: "banner1_title", value: "",
        label: "Banner Title - 1", placeholder: "",
        validate: false,
        tab: "banner",
    },
    {
        name: "banner1_caption", type: "text", colClass: '', className: "", htmlFor: "banner1_caption", value: "",
        label: "Banner Caption - 1", placeholder: "",
        validate: false,
        tab: "banner",
    },
    {
        name: "banner2_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md mt-4',
        className: "banner-file",
        htmlFor: "BannerImage2",
        value: "",
        label: "Banner Image-2",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "banner",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
    {
        name: "banner2_title", type: "text", colClass: 'mt-300', className: "", htmlFor: "banner2_title", value: "",
        label: "Banner Title - 2", placeholder: "",
        validate: false,
        tab: "banner",
    },
    {
        name: "banner2_caption", type: "text", colClass: '', className: "", htmlFor: "banner2_caption", value: "",
        label: "Banner Caption - 2", placeholder: "",
        validate: false,
        tab: "banner",
    },
    {
        name: "banner3_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md mt-4',
        className: "banner-file",
        htmlFor: "BannerImage3",
        value: "",
        label: "Banner Image-3",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "banner",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
    {
        name: "banner3_title", type: "text", colClass: 'mt-300', className: "", htmlFor: "banner3_title", value: "",
        label: "Banner Title - 3", placeholder: "",
        validate: false,
        tab: "banner",
    },
    {
        name: "banner3_caption", type: "text", colClass: '', className: "", htmlFor: "banner3_caption", value: "",
        label: "Banner Caption - 3", placeholder: "",
        validate: false,
        tab: "banner",
    },
];
