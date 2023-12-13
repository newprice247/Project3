import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
// imports the authentification function from the auth.js file, used to register the user and log them in using json web tokens
import Auth from "../../utils/auth";
// imports the search function from the API.js file, used to fetch the listings and user models from the database
import search from "../../utils/API";

// imports the motion library for animations
import { motion } from "framer-motion";

export default function UserSavedListings() {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // Using useState to set the listings and listingContact to an empty array, is used by the map function to display the listings and pull the contact information for each listing from the user models in the database
  const userId = Auth.getProfile().data._id;
  const [savedListings, setSavedListings] = useState([]);
  const [savedListingsInfo, setSavedListingsInfo] = useState([]);
  useEffect(() => {
    search
      .fetchUser(userId)
      .then((data) => setSavedListings(data.savedListings))
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId]);
  // Using useEffect to fetch the listings and user models from the database, then filter the listings to only display the listings that the user has saved
  useEffect(() => {
    search
      .fetchListings()
      .then((data) => {
        const savedListingsInfo = data.filter((listing) =>
          savedListings.includes(listing._id)
        );
        setSavedListingsInfo(savedListingsInfo);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [savedListings]);
  return (
    <div className="bg-myColor-3">
      {/* Using the map function to display the listings that the user has saved */}
      {savedListingsInfo.map((listing) => (
        <div key={listing._id}>
          <Accordion open={open === listing._id}>
            <AccordionHeader onClick={() => handleOpen(listing._id)}>
              {listing.title}
            </AccordionHeader>
            <AccordionBody>
              <h2 className="text-myColor-2 text-xl">Job Category:</h2>
              <p className="text-myColor-2">{listing.category}</p>
              <h2 className="text-myColor-2 text-xl">Job Description:</h2>
              <p className="text-myColor-2">{listing.description}</p>
              <h2 className="text-myColor-2 text-xl">Salary:</h2>
              <p className="text-myColor-2">{listing.salary}</p>
              <h2 className="text-myColor-2 text-xl">Location:</h2>
              <p className="text-myColor-2">{listing.location}</p>
              <h2 className="text-myColor-2 text-xl">Requirements:</h2>
              <p className="text-myColor-2">{listing.requirements}</p>
              <h2 className="text-myColor-2 text-xl">Benefits:</h2>
              <p className="text-myColor-2">{listing.benefits}</p>
              <h2 className="text-myColor-2 text-xl">Company:</h2>
              <p className="text-myColor-2">{listing.company}</p>
              <h2 className="text-myColor-2 text-xl">Website:</h2>
              <p className="text-myColor-2">{listing.website}</p>
            </AccordionBody>
          </Accordion>
        </div>
      ))}
      {/* If the user has not saved any listings, display the message below */}
      {savedListingsInfo.length === 0 && (
        <>
          <h3 className="text-myColor-2">
            You haven't saved any listings yet!
          </h3>
        </>
      )}
    </div>
  );
}
