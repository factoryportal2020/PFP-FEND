export const formEntities = [
    {
        name: "email", type: "email", colClass: 'form-group mt-3', className: "", htmlFor: "email", value: "", label: "", placeholder: "E-mail Address",
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
];