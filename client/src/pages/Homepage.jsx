import React, { useState, useEffect } from "react";
import JobListing from "../components/JobListing";
import search from "../../utils/API";
import { Container, Row, Col, Form, Button } from "react-bootstrap";


export default function Homepage() {
    const [listings, setListings] = useState([]);
    const [listingContact, setListingContact] = useState([]);

    useEffect(() => {
        search.fetchListings()
            .then((data) => setListings(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        search.fetchUsers()
            .then((data) => setListingContact(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    return (
        <>
            <div>
                
                <Container 
                fluid
                >
                    <Row
                    style={{marginTop: "5rem"}}
                    >
                        <Form className="d-flex mb-3">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Row>
                    <Row>

                    </Row>
                    <Row
                        className="flex "
                    >
                            {listings.map((listing) => (
                                <JobListing

                                    key={listing._id}
                                    title={listing.title}
                                    location={listing.location}
                                    description={listing.description}
                                    requirements={listing.requirements}
                                    salary={listing.salary}
                                    benefits={listing.benefits}
                                    email={
                                        listingContact.map((contact) => {
                                            if (listing.contact === contact._id) {
                                                return contact.email;
                                            }
                                            return null;
                                        })
                                    }
                                    phone={
                                        listingContact.map((contact) => {
                                            if (listing.contact === contact._id) {
                                                return contact.phone;
                                            }
                                            return null;
                                        })
                                    }
                                    website={listing.website}
                                />
                            ))}
                    </Row>

                </Container>
                {listings.length === 0 && <h2>No results found</h2>}
            </div>
        </>
    );
}