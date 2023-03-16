import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IContact } from "../datatypes";
import { addContact, updateContact } from "../redux/contactSlice";
import { RootStoreType } from "../redux/store";

const ContactForm = () => {
  const { isEditing, selectedContact } = useSelector(
    (store: RootStoreType) => store.contactReducerState
  );
  const dispatch = useDispatch();
  const [user, setUser] = useState<Omit<IContact, "id">>({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    const { firstname, lastname, email, city } = selectedContact as IContact;
    setUser({ firstname, lastname, email, city });
  }, [isEditing, selectedContact]);

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    if (!user.firstname) {
      return;
    }

    if (isEditing) {
      dispatch(
        updateContact({ ...user, id: (selectedContact as IContact).id })
      );
    } else {
      dispatch(addContact(user));
    }

    setUser({
      firstname: "",
      lastname: "",
      email: "",
      city: "",
    });
  };

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <>
      <h5 className="mt-3 mb-3">{isEditing ? "Edit" : "New Contact"}</h5>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            className="form-control"
            id="firstname"
            name="firstname"
            value={user.firstname}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Lastname
          </label>
          <input
            className="form-control"
            id="lastname"
            name="lastname"
            value={user.lastname}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            className="form-control"
            id="city"
            name="city"
            value={user.city}
            onChange={changeHandler}
          />
        </div>
        <button className="btn btn-primary">
          {isEditing ? "Edit" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
