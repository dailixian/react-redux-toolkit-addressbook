import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { IContact } from "../datatypes";
import { addContact } from "../redux/contactSlice";

function ContactForm() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<Omit<IContact, "id">>({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
  });

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    if (!user.firstname) {
      return;
    }

    dispatch(addContact(user));
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
      <h5 className="mt-3 mb-3">New contact</h5>
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

        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default ContactForm;
