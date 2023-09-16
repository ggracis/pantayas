import {
    Stack,
    Box,
    SimpleGrid,
    Icon,
    Input,
    IconButton
} from "@chakra-ui/react";
import Select, { components } from "react-select";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import styles from "../ModPreferencias.module.css";
import { availableSocialMedias } from "./usefulObjectes";


export const EditSocialMedia = ({ socialMedias, UpdateSocials }) => {



    const handleSocialMediasSelect = (value, x) => {
        UpdateSocials((y) =>
            y.map(obj =>
                obj.key == x.key ?
                    {
                        ...obj,
                        name: value.value,
                        icon: value.icon
                    }
                    :
                    { ...obj }
            )
        )
    }
    const handleSocialMediasLink = (value, x) => {
        UpdateSocials((y) =>
            y.map(obj =>
                obj.key === x.key ?
                    {
                        ...obj,
                        link: value.target.value
                    }
                    :
                    { ...obj }
            )
        )
    }


    const AddSocial = () => UpdateSocials(
        x =>
            x.concat({
                ...x[0],
                key: x.length
            })

    )
    const RemoveSocial = () => UpdateSocials(
        x => {
            let newSocial = [...x]
            if (newSocial.length > 1)
                newSocial.pop()
            return newSocial
        }
    )


    const Option = (props) => (
        <components.Option {...props} className={styles.SelectForm}>
            <Icon as={props.data.icon} alt="logo" width='40%' height='40%' m='auto' />
        </components.Option>
    );

    const SingleValue = ({ children, ...props }) => (
        <components.SingleValue {...props} className={styles.SelectForm}>
            <Icon as={props.data.icon} alt="s-logo" width='50%' height='50%' m='auto' />
        </components.SingleValue>
    );

    return (
        <Stack>
            {
                socialMedias.map((x) => (
                    <Box display='flex' key={x.key}>
                        <Box minWidth='25%' pr='1em'>
                            <Select
                                className={styles.SelectForm}
                                value={x}
                                key={x.key}
                                options={availableSocialMedias}
                                onChange={(value) => handleSocialMediasSelect(value, x)}
                                isRtl={true}
                                styles={{
                                    singleValue: (base) => ({
                                        ...base,
                                        display: "flex",
                                        alignItems: "center"
                                    })
                                }}
                                components={{
                                    Option,
                                    SingleValue
                                }}
                            />
                        </Box>
                        <Input placeholder='@NTQJ' value={x.link} onChange={(value) => handleSocialMediasLink(value, x)}
                        />
                    </Box>
                ))

            }
            <SimpleGrid columns={2} spacing={4}>
                <IconButton icon={<AddIcon />} onClick={AddSocial} />
                <IconButton icon={<CloseIcon />} onClick={RemoveSocial} />
            </SimpleGrid>
        </Stack>
    );
}

export default EditSocialMedia;