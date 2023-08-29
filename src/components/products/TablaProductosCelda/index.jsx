// ProductTableCell.js
import React, { useState } from "react";
import { InputGroup, Input, Button, InputRightElement } from "@chakra-ui/react";
import { MdOutlineSave } from "react-icons/md";

const ProductTableCell = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleDoubleClick = () => {
    setEditedValue(value);
    setEditing(true);
  };

  const handleBlur = () => {
    if (editing) {
      onSave(editedValue);
      setEditing(false);
    }
  };

  return (
    <td onDoubleClick={handleDoubleClick} onBlur={handleBlur}>
      {editing ? (
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleBlur}>
              <MdOutlineSave />
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        value
      )}
    </td>
  );
};

export default ProductTableCell;
