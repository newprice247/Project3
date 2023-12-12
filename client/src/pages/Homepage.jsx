import React, { useState, useEffect } from "react";

// imports the search function from the API.js file, used to fetch the listings and user models from the database
import search from "../../utils/API";

// imports the motion library for animations
import { motion } from "framer-motion";

// imports the current listing and job listing prototypes from the components folder
import CurrentListing from "../components/CurrentListing";
import JobListing from "../components/JobListingCard";
import CreateListingModal from "../components/CreateListingModal";
import Auth from "../../utils/auth";
import { Collapse, Card, Typography, CardBody } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

// Exporting the Homepage, located at '/'
export default function Homepage() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchStarted, setSearchStarted] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [listingContact, setListingContact] = useState([]);
  const [currentListing, setCurrentListing] = useState(null);
  const [uniqueSalaries, setUniqueSalaries] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  // Using useState to set the listings and listingContact to an empty array, is used by the map function to display the listings and pull the contact information for each listing from the user models in the database

  useEffect(() => {
    search
      .fetchListings()
      .then((data) => setListings(data))
      .catch((error) => console.error("Error fetching data:", error));

    search
      .fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));

    search
      .fetchUsers()
      .then((data) => setListingContact(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      listings.filter((listing) => {
        if (listing.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          setSearchResults((searchResults) => [...searchResults, listing]);
        }
        if (listing.location.toLowerCase().includes(searchTerm.toLowerCase())) {
          setSearchResults((searchResults) => [...searchResults, listing]);
        }
        if (listing.category.includes(searchTerm)) {
          setSearchResults((searchResults) => [...searchResults, listing]);
        }
        if (listing.salary.includes(searchTerm)) {
          setSearchResults((searchResults) => [...searchResults, listing]);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  function handleSearch(event) {
    setSearchResults([]);
    setSearchTerm(event.target.value);
    setSearchStarted(true);
  }
  function handleCategoryFilter(event) {
    setSearchResults([]);
    setSearchTerm(event.target.id);
    setSearchStarted(true);
  }

  function handleLocationFilter(event) {
    setSearchResults([]);
    setSearchTerm(event.target.name);
    setSearchStarted(true);
  }

  function handleSalaryFilter(event) {
    setSearchResults([]);
    setSearchTerm(event.target.name);
    setSearchStarted(true);
  }

  useEffect(() => {
    let uniqueSalaries = [];
    listings.map((listing) => {
      if (!uniqueSalaries.includes(listing.salary)) {
        uniqueSalaries.push(listing.salary);
      }
    });
    setUniqueSalaries(uniqueSalaries);
  }, [listings]);

  useEffect(() => {
    let uniqueLocations = [];
    listings.map((listing) => {
      if (!uniqueLocations.includes(listing.location)) {
        uniqueLocations.push(listing.location);
      }
    });
    setUniqueLocations(uniqueLocations);
  }, [listings]);

  // if the currentListing is not null and is not an object, fetch the listing by id and set the currentListing to the data
  useEffect(() => {
    if (currentListing !== null && typeof currentListing !== "object") {
      search
        .fetchListingById(currentListing)
        .then((data) => setCurrentListing(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [currentListing]);

  // Searchbar
  const [openSection, setOpenSection] = useState(null);

  const toggleOpen = (section) =>
    setOpenSection((prevOpenSection) =>
      prevOpenSection === section ? null : section
    );

  const scrollToCurrentListing = () => {
    const currentListingElement = document.getElementById("currentlisting");
    if (currentListingElement) {
      currentListingElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToAllCards = () => {
    const allCardsElement = document.getElementById("allcards");
    if (allCardsElement) {
      allCardsElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleResetFilters = () => {
    setSearchResults([]);
    setSearchTerm("");
    setSearchStarted(false);
    scrollToAllCards();
  };

  // Returning the homepage as html
  return (
    <div className="bg-myColor-3">
      {/* imports the searchbar component */}
      <div className="flex flex-wrap items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          animate={{ y: 80 }}
          transition={{ delay: 0.5, duration: 1.0 }}>
          <div className="w-full">
            <div className="w-[80%] mx-auto text-black">
              <div className="w-full">
                <div className="relative flex items-center mb-6">
                  <FaSearch className="absolute left-3 text-myColor-1" />
                  <input
                    type="text"
                    placeholder="Search for a job..."
                    onChange={handleSearch}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(e);
                      }
                    }}
                    className="w-full h-10 pl-10 pr-3 text-md text-myColor-2 bg-white border rounded-full focus:outline-none shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS FOR FILTER CATEGORY - These will display after user types in search bar */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => toggleOpen(1)}>Job Category</Button>

            <Button onClick={() => toggleOpen(2)}>Location</Button>

            <Button onClick={() => toggleOpen(3)}>Pay</Button>

            {/* Reset Filter Button */}
            <Button onClick={handleResetFilters}>Reset Filters</Button>
          </div>

          <div className="mb-4">
            <Collapse open={openSection === 1}>
              <Card className="flex items-center justify-center bg-myColor-1/50 my-4 mx-auto  w-7/12 md:w-8/12">
                <CardBody>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      name={category.name}
                      id={category._id}
                      className="w-44 h-auto bg-myColor-3/90 p-2 m-2 rounded-lg text-myColor-2 text-sm hover:text-myColor-1 hover:shadow-xl hover:ring-2 ring-white"
                      onClick={(e) => {
                        handleCategoryFilter(e);
                        scrollToAllCards();
                      }}>
                      {category.name}
                    </button>
                  ))}
                </CardBody>
              </Card>
            </Collapse>

            <Collapse open={openSection === 2}>
              <Card className="flex items-center justify-center bg-myColor-1/50 my-4 mx-auto w-7/12 md:w-8/12">
                <CardBody>
                  {uniqueLocations.map((location) => (
                    <button
                      key={location}
                      name={location}
                      className="w-44 h-auto bg-myColor-3/90 p-2 m-2 rounded-lg text-myColor-2 text-sm hover:ring-2 ring-white hover:text-myColor-1 hover:shadow-xl"
                      onClick={(e) => {
                        handleLocationFilter(e);
                        scrollToAllCards();
                      }}>
                      {location}
                    </button>
                  ))}
                </CardBody>
              </Card>
            </Collapse>

            <Collapse open={openSection === 3}>
              <Card className="flex items-center justify-center bg-myColor-1/50 my-4 mx-auto  w-8/12 md:w-8/12">
                <CardBody>
                  {uniqueSalaries.map((salary) => (
                    <button
                      key={salary}
                      name={salary}
                      className="w-56 h-auto bg-myColor-3/90 p-2 m-2 rounded-lg text-myColor-2 text-sm hover:text-myColor-1 hover:shadow-xl hover:ring-2 ring-white"
                      onClick={(e) => {
                        handleSalaryFilter(e);
                        scrollToAllCards();
                      }}>
                      {salary}
                    </button>
                  ))}
                </CardBody>
              </Card>
            </Collapse>
          </div>

          <div className="flex flex-wrap flex-row-reverse justify-evenly items-start mt-4 mb-4">
            {Auth.loggedIn() ? (
              <CreateListingModal />
            ) : (
              <div className="mt-10 mb-10 mx-5">
                <h1 className="tracking-wider">Log in to create a listing!</h1>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Using 'motion' to animate the homepage, set as a div container with opening and closing motion.div tags */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        animate={{ y: 50 }}
        transition={{ delay: 0.5, duration: 1.0 }}
        className="flex flex-wrap flex-col-reverse lg:flex-row-reverse justify-evenly items-start mt-10">
        {/* {Auth.loggedIn() ? (
          <CreateListingModal />
        ) : (
          <div className="justify-center items-center mt-30 mb-10 mx-5 md:h-[95vh]">
            <h1 className="tracking-wider">Log in to create a listing!</h1>
          </div>
        )} */}
        {/* container for the job listings, current listing, and search bar */}
        <div
          id="allcards"
          className="sm:w-full md:w-full lg:w-1/3 xl:w-1/3 justify-center items-center z-10 mb-12 overflow-y-auto h-[260vh] scroll-smooth no-scrollbar ">
          {/* Maps through the listings array and displays each listing as a card, passing in the listing information as props to the JobListing prototype */}
          {searchStarted ? (
            <div>
              {searchResults.map((listing) => (
                <JobListing
                  id={listing._id}
                  title={listing.title}
                  location={listing.location}
                  description={listing.description}
                  requirements={listing.requirements}
                  salary={listing.salary}
                  benefits={listing.benefits}
                  company={listing.company}
                  // Maps through the listingContact array and displays the contact information for each listing as props to the JobListing prototype
                  email={listingContact.map((contact) => {
                    if (listing.contact === contact._id) {
                      return contact.email;
                    }
                    return null;
                  })}
                  phone={listingContact.map((contact) => {
                    if (listing.contact === contact._id) {
                      return contact.phone;
                    }
                    return null;
                  })}
                  website={listing.website}
                  // Sets the current listing to the listing id when a user clicks on a listing
                  onClick={() => {
                    setCurrentListing(listing._id);
                    scrollToCurrentListing();
                  }}
                />
              ))}
            </div>
          ) : (
            <div>
              {listings.map((listing) => (
                <JobListing
                  id={listing._id}
                  title={listing.title}
                  category={categories.map((category) => {
                    if (listing.category === category._id) {
                      return category.name;
                    }
                    return null;
                  })}
                  location={listing.location}
                  description={listing.description}
                  requirements={listing.requirements}
                  salary={listing.salary}
                  benefits={listing.benefits}
                  company={listing.company}
                  // Maps through the listingContact array and displays the contact information for each listing as props to the JobListing prototype
                  email={listingContact.map((contact) => {
                    if (listing.contact === contact._id) {
                      return contact.email;
                    }
                    return null;
                  })}
                  phone={listingContact.map((contact) => {
                    if (listing.contact === contact._id) {
                      return contact.phone;
                    }
                    return null;
                  })}
                  website={listing.website}
                  // Sets the current listing to the listing id when a user clicks on a listing
                  onClick={() => {
                    setCurrentListing(listing._id);
                    scrollToCurrentListing();
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* container for the current listing, displays the current listing when a user clicks on a listing */}

        <div
          id="currentlisting"
          className="xs:w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 justify-center items-center mb-10">
          {/* if the current listing is not null, display the current listing, otherwise display a message prompting the user to click on a listing */}

          {currentListing !== null ? (
            <CurrentListing
              title={currentListing.title}
              category={categories.map((category) => {
                if (currentListing.category === category._id) {
                  return category.name;
                }
                return null;
              })}
              location={currentListing.location}
              description={currentListing.description}
              requirements={currentListing.requirements}
              salary={currentListing.salary}
              benefits={currentListing.benefits}
              company={currentListing.company}
              // Maps through the listingContact array and displays the contact information for each listing as props to the CurrentListing prototype
              email={listingContact.map((contact) => {
                if (currentListing.contact === contact._id) {
                  return contact.email;
                }
                return null;
              })}
              phone={listingContact.map((contact) => {
                if (currentListing.contact === contact._id) {
                  return contact.phone;
                }
                return null;
              })}
              website={currentListing.website}
            />
          ) : (
            // if the current listing is null, display a message prompting the user to click on a listing
            <div>
              <h1 className="items-center lg:items-start tracking-wider text-center">
                Click on a job listing to see more details!
              </h1>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
