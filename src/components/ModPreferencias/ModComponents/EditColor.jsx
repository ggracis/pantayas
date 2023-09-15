import { useState, useEffect } from 'react';

import Colorful from '@uiw/react-color-colorful';
import styles from "../ModPreferencias.module.css";
// ,color, setColor
export const EditColor = ({colorState,UpdateColor}) => {

    const ChangeColor = (color) =>{
        UpdateColor(color.hexa)
    }

    return (
        <Colorful
            className={styles.colorful}
            color={colorState}
            disableAlpha={true}
            onChange={ChangeColor}
        />
    );
}

export default EditColor;