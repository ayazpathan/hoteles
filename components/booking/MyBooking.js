import React, { useEffect } from "react";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { clearError } from "../../redux/actions/bookingActions";
import { MDBDataTable } from "mdbreact";

const MyBooking = () => {
  const dispatch = useDispatch();

  const { bookings, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "Booking ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkIn",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkOut",
          sort: "asc",
        },
        {
          label: "Annual Paid",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `₹${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>
              <button className="btn btn-success mx-2">
                <i className="fa fa-download"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const downloadInvoice = async (booking) => {
    const data = {
      "documentTitle": "Booking Invoice", //Defaults to INVOICE
      //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
      "currency": "INR", //See documentation 'Locales and Currency' for more info
      "taxNotation": "vat", //or gst
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
      "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
      "sender": {
          "company": "Sample Corp",
          "address": "Sample Street 123",
          "zip": "1234 AB",
          "city": "Sampletown",
          "country": "Samplecountry"
          //"custom1": "custom value 1",
          //"custom2": "custom value 2",
          //"custom3": "custom value 3"
      },
      "client": {
           "company": "Client Corp",
           "address": "Clientstreet 456",
           "zip": "4567 CD",
           "city": "Clientcity",
           "country": "Clientcountry"
          //"custom1": "custom value 1",
          //"custom2": "custom value 2",
          //"custom3": "custom value 3"
      },
      "invoiceNumber": "2021.0001",
      "invoiceDate": "1.1.2021",
      "products": [
          {
              "quantity": "2",
              "description": "Test1",
              "tax": 6,
              "price": 33.87
          },
          {
              "quantity": "4",
              "description": "Test2",
              "tax": 21,
              "price": 10.45
          }
      ],
      "bottomNotice": "Kindly pay your invoice within 15 days.",
      //Used for translating the headers to your preferred language
      //Defaults to English. Below example is translated to Dutch
      // "translate": { 
      //     "invoiceNumber": "Factuurnummer",
      //     "invoiceDate": "Factuurdatum",
      //     "products": "Producten", 
      //     "quantity": "Aantal", 
      //     "price": "Prijs",
      //     "subtotal": "Subtotaal",
      //     "total": "Totaal" 
      // }
  };
  }

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>
      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBooking;
