import React, { useState } from "react";
import { SwitchValues } from "../../types";
import {
  Select,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { MdAdd, MdClose } from "react-icons/md";
import ModalTemplate from "./ModalTemplate";

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
    Object.keys(switchValues["Sunday"])[0]
  );

  return (
    <ModalTemplate title="Edit" closeButton="Close">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let values: SwitchValues = { ...switchValues };
          for (const value in values) {
            values[value] = { ...values[value], [newColumnText]: false };
          }
          setSwitchValues((prev) => ({
            ...prev,
            ...values,
          }));
          setNewColumnText("");
        }}
      >
        <FormControl mt={3}>
          <FormLabel>Add Column: </FormLabel>
          <Input
            value={newColumnText}
            onChange={(e) => setNewColumnText(e.target.value)}
          />
          <Button type="submit" colorScheme="green" mt={3} leftIcon={<MdAdd />}>
            Create
          </Button>
        </FormControl>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let values: SwitchValues = { ...switchValues };
          for (const value in values) {
            delete values[value][removeColumnText];
          }

          setSwitchValues(values);
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
              <option key={`${header} column`}>{header}</option>
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
