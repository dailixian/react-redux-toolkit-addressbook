import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../datatypes";

interface IState {
    contacts: IContact[],
    selectedContact: IContact | {},
    isEditing: boolean

}
const contactSlice = createSlice({
    name: "contactSlice",
    initialState: {
        contacts: [
            { id: 1, firstname: "Lixian", lastname: "Dai", email: "test@gmail.com", city: "test" },
            { id: 2, firstname: "Lixian2", lastname: "Dai", email: "test@", city: "test" },
            { id: 3, firstname: "Lixian3", lastname: "Dai", email: "test@", city: "test" }
        ] as IContact[],
        selectedContact: {},
        isEditing: false
    } as IState,
    reducers: {
        deleteContact: (state, action: PayloadAction<number>) => {
            const index = state.contacts.findIndex(c => c.id === action.payload)
            if (index !== -1) {
                state.contacts.splice(index, 1);
            }
        },
        selectContact: (state, action: PayloadAction<IContact>) => {
            state.selectedContact = action.payload;
            state.isEditing = false;
        },
        addContact: (state, action: PayloadAction<Omit<IContact, "id">>) => {
            const { contacts } = state;
            const id = contacts.length === 0 ? 1 : Math.max(...contacts.map(c => c.id));
            const contact = { ...action.payload, id: id }
            state.contacts.push(contact);
        },
        setIsEditing: (state, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        updateContact: (state, action: PayloadAction<IContact>) => {
            const contact = action.payload;
            const index = state.contacts.findIndex(c => c.id === contact.id);
            if (index !== -1) {
                state.contacts[index] = contact;
                state.isEditing = true;
                state.selectedContact = {};
            }
        }
    }
});

export default contactSlice.reducer;
export const { deleteContact, selectContact, setIsEditing, addContact, updateContact } = contactSlice.actions;