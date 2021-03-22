import React, { useState } from "react";
import { SwitchValues } from "@constants/types";
import {
  Select,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { MdAdd, MdClose } from "react-icons/md";
import ModalTemplate from "./ModalTemplate";
import { defaultSwitchValues } from "@constants/constants";

type Props = {
  switchValues: SwitchValues;
  setSwitchValues: React.Dispatch<React.SetStateAction<SwitchValues>>;
  tableHeaders: string[];
};

const EditModal: React.FC<Props> = ({
  switchValues,
  setSwitchValues,
  tableHeaders,
}) => {
  const [newColumnText, setNewColumnText] = useState<string>("");
  const [removeColumnText, setRemoveColumnText] = useState<string>(
    Object.keys(switchValues[0].data)[0]
  );

  return (
    <ModalTemplate title="Edit" closeButton="Close">
      <Button
        w="100%"
        my="15px"
        onClick={() => {
          setSwitchValues(defaultSwitchValues);
        }}
      >
        Reset Columns
      </Button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let values = [...switchValues].map((value) => ({
            ...value,
            data: { ...value.data, [newColumnText]: false },
          }));
          setSwitchValues(values);
          setNewColumnText("");
        }}
      >
        <FormControl mt={3}>
          <FormLabel>Add Column: </FormLabel>
          <Input
            value={newColumnText}
            onChange={(e) => setNewColumnText(e.target.value)}
            placeholder="Column Name"
          />
          <Button type="submit" colorScheme="green" mt={3} leftIcon={<MdAdd />}>
            Create
          </Button>
        </FormControl>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          let newValues = [...switchValues];
          newValues.forEach((_, index) => {
            delete newValues[index].data[removeColumnText];
          });

          setSwitchValues(newValues);
          setRemoveColumnText("");
        }}
      >
        <FormControl mt={9}>
          <FormLabel>Remove Column: </FormLabel>
          <Select
            value={removeColumnText}
            onChange={(e) => setRemoveColumnText(e.target.value)}
          >
            {tableHeaders.map((header) => (
              <option key={`${header} column`} value={header}>
                {header}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="red" mt={3} leftIcon={<MdClose />}>
          Delete
        </Button>
      </form>
    </ModalTemplate>
  );
};

export default EditModal;
