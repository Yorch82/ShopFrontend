import { Box, useMediaQuery, TextField } from "@mui/material";
import { getIn } from "formik";

const AddressForm = ({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // these functions allow for better code readability
    const formattedName = (field) => `${type}.${field}`;

    const formattedError = (field) => 
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        );

    const formattedHelper = (field) => 
        getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    return (
        <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}
            }}
        >
            <TextField 
                fullWidth
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.name}
                name={formattedName("name")}
                error={formattedError("name")}
                helperText={formattedHelper("name")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField 
                fullWidth
                type="text"
                label="Surname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.surname}
                name={formattedName("surname")}
                error={formattedError("surname")}
                helperText={formattedHelper("surname")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField 
                fullWidth
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.country}
                name={formattedName("country")}
                error={formattedError("country")}
                helperText={formattedHelper("country")}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField 
                fullWidth
                type="text"
                label="Street Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.street1}
                name={formattedName("street1")}
                error={formattedError("street1")}
                helperText={formattedHelper("street1")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField 
                fullWidth
                type="text"
                label="Street Address 2 (optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.street2}
                name={formattedName("street2")}
                error={formattedError("street2")}
                helperText={formattedHelper("street2")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField 
                fullWidth
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.city}
                name={formattedName("city")}
                error={formattedError("city")}
                helperText={formattedHelper("city")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField 
                fullWidth
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.state}
                name={formattedName("state")}
                error={formattedError("state")}
                helperText={formattedHelper("state")}
                sx={{ gridColumn: "1fr" }}
            />
            <TextField 
                fullWidth
                type="text"
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.zipCode}
                name={formattedName("zipCode")}
                error={formattedError("zipCode")}
                helperText={formattedHelper("zipCode")}
                sx={{ gridColumn: "1fr" }}
            />
        </Box>
    )

};

export default AddressForm;