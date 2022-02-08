import { useState } from "react";

export default function Address({ address }:any) {
  return (
    <div className="list-group list-group-flush address-item">
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
        Address id
        <span>{address.id}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
        Address Type
        <span>{address.type}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
        Address:
        <span>{address.street_address_1}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
        Email
        <span>{address.email}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
        Phone
        <span>{address.phone}</span>
      </li>
    </div>
  );
}