export const formEntities = [
    {
        name: "company_name", type: "text", colClass: 'col-md-3', className: "", htmlFor: "Company name", value: "",
        label: "Company Name", placeholder: "ABc Company",
        maxLength: 25,
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
        label: "Site Url (ex: abcprivate, modernCorp, mystore1)", placeholder: "abcjewelly",
        maxLength: 30,
        validate: true,
        tab: "details",
        // pattern: "[0-9a-zA-Z_.-]*",
        validateOptions: [
            {
                rule: "required",
                msg: "Site Url is Required"
            },
            {
                rule: "string_numeric",
                msg: "Site Url should string, no space and special characters"
            }
        ]
    },
    {
        name: "email", type: "email", colClass: 'col-md-3', className: "", htmlFor: "Email", value: "", label: "Email", placeholder: "leo@gmail.com",
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
        name: "landline_no", type: "number", colClass: 'col-md-3', className: "", htmlFor: "LandlineNo", value: "", label: "Landline No (04222345678)", placeholder: "04222345678",
        validate: true,
        // pattern: "\d*",
        // maxLength: 10,
        tab: "details",
        validateOptions: [
            {
                rule: "landline_no",
                msg: "Enter Landline phone number format"
            }]
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
        maxLength: 200,
        validateOptions: [
            {
                rule: "required",
                msg: "Address is Required"
            }]
    },
    {
        name: "instagram_link", type: "text", colClass: 'col-md-6', className: "", htmlFor: "Instagram Link", value: "",
        label: "Instagram Link (ex: https://, www)",
        placeholder: "https://www.instagram.com/id/",
        validate: true,
        maxLength: 80,
        tab: "details",
        validateOptions: [
            {
                rule: "url",
                msg: "Enter Valid Url"
            }
        ]
    },
    {
        name: "facebook_link", type: "text", colClass: 'col-md-6', className: "", htmlFor: "Facebook link", value: "",
        label: "Facebook link (ex: https://, www)",
        placeholder: "https://www.facebook.com/id/",
        validate: true,
        maxLength: 80,
        tab: "details",
        validateOptions: [
            {
                rule: "url",
                msg: "Enter Valid Url"
            }
        ]
    },
    {
        name: "twitter_link", type: "text", colClass: 'col-md-6', className: "", htmlFor: "Twitter link", value: "",
        label: "Twitter link (ex: https://, www)",
        placeholder: "https://twitter.com/id/",
        maxLength: 80,
        validate: true,
        tab: "details",
        validateOptions: [
            {
                rule: "url",
                msg: "Enter Valid Url"
            }
        ]
    },
    {
        name: "status", type: "radio", colClass: 'col-md-3', className: "", htmlFor: "Status", value: 0, label: "Website Launch Status", placeholder: "",
        tab: "details",
        validate: false,
        options: [
            { value: 1, label: 'Active' },
            { value: 0, label: 'Deactive' }
        ],
    },
    {
        name: "logo_image",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "medium-file",
        htmlFor: "LogoImage",
        value: "",
        label: "Logo Image",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "details",
        width: 300,
        height: 300,
        maxWidthOrHeight: "800",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
    {
        name: "about", type: "tinyMCE", colClass: 'col-md', className: "banner-file", htmlFor: "About", value: "",
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
        htmlFor: "AboutImage",
        value: "",
        label: "About Image (Your Shop Photo)",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "about",
        width: 300,
        height: 300,
        maxWidthOrHeight: "800",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
    {
        name: "defaultAbouts",
        type: "fileCheckbox",
        fileType: "image",
        colClass: 'col-md',
        className: "default-about-file",
        htmlFor: "about_image",
        value: "",
        label: "About Image",
        multiple: "multiple",
        placeholder: "",
        validate: false,
        tab: "about",
        maxWidthOrHeight: "100",
        width: 100,
        height: 100,
    },
    {
        name: "feature_image1",
        type: "file",
        fileType: "image",
        colClass: 'col-md',
        className: "medium-file",
        htmlFor: "FeatureImage1",
        value: "",
        label: "Feature Image 1 (Feature Product image)",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "feature",
        width: 300,
        height: 300,
        maxWidthOrHeight: "800",
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },
    {
        name: "defaultFeatures",
        type: "fileCheckbox",
        fileType: "image",
        colClass: 'col-md mt-4',
        className: "default-about-file",
        htmlFor: "feature_image1",
        value: "",
        label: "Features Images",
        multiple: "multiple",
        placeholder: "",
        validate: false,
        tab: "feature",
        maxWidthOrHeight: "100",
        width: 100,
        height: 100,
    },
    // {
    //     name: "feature_image2",
    //     type: "file",
    //     fileType: "image",
    //     colClass: 'col-md',
    //     className: "medium-file",
    //     htmlFor: "FeatureImage2",
    //     value: "",
    //     label: "Feature Image 2 (Feature Product image)",
    //     multiple: "",
    //     placeholder: "",
    //     validate: true,
    //     tab: "feature",
    //     width: 300,
    //     height: 300,
    //     maxWidthOrHeight: "800",
    //     validateOptions: [
    //         {
    //             rule: "image",
    //             msg: "Only upload image format ",
    //         }
    //     ]
    // },
    // {
    //     name: "defaultFeatures",
    //     type: "fileCheckbox",
    //     fileType: "image",
    //     colClass: 'col-md mt-4',
    //     className: "default-about-file",
    //     htmlFor: "feature_image2",
    //     value: "",
    //     label: "Features Images",
    //     multiple: "multiple",
    //     placeholder: "",
    //     validate: false,
    //     tab: "feature",
    //     maxWidthOrHeight: "100",
    //     width: 100,
    //     height: 100,
    // },
    // {
    //     name: "feature_image3",
    //     type: "file",
    //     fileType: "image",
    //     colClass: 'col-md',
    //     className: "medium-file",
    //     htmlFor: "FeatureImage3",
    //     value: "",
    //     label: "Feature Image 3 (Feature Product image)",
    //     multiple: "",
    //     placeholder: "",
    //     validate: true,
    //     tab: "feature",
    //     width: 300,
    //     height: 300,
    //     maxWidthOrHeight: "800",
    //     validateOptions: [
    //         {
    //             rule: "image",
    //             msg: "Only upload image format ",
    //         }
    //     ]
    // },
    {
        name: "defaultFeatures",
        type: "fileCheckbox",
        fileType: "image",
        colClass: 'col-md mt-4',
        className: "default-about-file",
        htmlFor: "feature_image3",
        value: "",
        label: "Features Images",
        multiple: "multiple",
        placeholder: "",
        validate: false,
        tab: "feature",
        maxWidthOrHeight: "100",
        width: 100,
        height: 100,
    },
    {
        name: "banner_image1",
        type: "file",
        fileType: "image",
        colClass: 'col-md-6',
        className: "banner-file",
        htmlFor: "BannerImage1",
        value: "",
        label: "Banner Image-1",
        multiple: "",
        placeholder: "",
        validate: true,
        tab: "banner",
        maxWidthOrHeight: "500",
        width: 500,
        height: 250,
        validateOptions: [
            {
                rule: "image",
                msg: "Only upload image format ",
            }
        ]
    },

    {
        name: "banner_title1", type: "text", colClass: '', className: "", htmlFor: "banner_title1", value: "",
        label: "Banner Title - 1", placeholder: "", maxLength: 70,
        validate: false,
        tab: "banner",
    },
    {
        name: "banner_caption1", type: "text", colClass: '', className: "", htmlFor: "banner_caption1", value: "",
        label: "Banner Caption - 1", placeholder: "", maxLength: 30,
        validate: false,
        tab: "banner",
    },
    {
        name: "defaultBanners",
        type: "fileCheckbox",
        fileType: "image",
        colClass: 'col-md',
        className: "default-banner-file",
        htmlFor: "banner_image1",
        value: "",
        label: "Banner Images",
        multiple: "multiple",
        placeholder: "",
        validate: false,
        tab: "banner",
        maxWidthOrHeight: "100",
        width: 100,
        height: 50,
    },
    {
        name: "banner_image2",
        type: "file",
        fileType: "image",
        colClass: 'col-md-6 mt-5',
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
        name: "banner_title2", type: "text", colClass: 'mt-240', className: "", htmlFor: "banner_title2", value: "",
        label: "Banner Title - 2", placeholder: "", maxLength: 70,
        validate: false,
        tab: "banner",
    },
    {
        name: "banner_caption2", type: "text", colClass: '', className: "", htmlFor: "banner_caption2", value: "",
        label: "Banner Caption - 2", placeholder: "", maxLength: 30,
        validate: false,
        tab: "banner",
    },
    {
        name: "defaultBanners",
        type: "fileCheckbox",
        fileType: "image",
        colClass: 'col-md mt-5',
        className: "default-banner-file",
        htmlFor: "banner_image2",
        value: "",
        label: "Banner Images",
        multiple: "multiple",
        placeholder: "",
        validate: false,
        tab: "banner",
        maxWidthOrHeight: "100",
        width: 100,
        height: 50,
    },
    {
        name: "banner_image3",
        type: "file",
        fileType: "image",
        colClass: 'col-md-6 mt-5',
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
        name: "banner_title3", type: "text", colClass: 'mt-240', className: "", htmlFor: "banner_title3", value: "",
        label: "Banner Title - 3", placeholder: "", maxLength: 70,
        validate: false,
        tab: "banner",
    },
    {
        name: "banner_caption3", type: "text", colClass: '', className: "", htmlFor: "banner_caption3", value: "",
        label: "Banner Caption - 3", placeholder: "", maxLength: 30,
        validate: false,
        tab: "banner",
    },
    {
        name: "defaultBanners",
        type: "fileCheckbox",
        fileType: "image",
        colClass: 'col-md mt-5',
        className: "default-banner-file",
        htmlFor: "banner_image3",
        value: "",
        label: "Banner Images",
        multiple: "multiple",
        placeholder: "",
        validate: false,
        tab: "banner",
        maxWidthOrHeight: "100",
        width: 100,
        height: 50,
    },
];
