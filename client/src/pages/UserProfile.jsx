import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram 
} from "@fortawesome/free-brands-svg-icons";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BriefcaseIcon,
  // pencil
} from "@heroicons/react/24/solid";

import Bio from "../components/Bio";
import UserCreatedListings from "../components/UserCreatedListings";
import UserSavedListings from "../components/UserSavedListings";
import search from "../../utils/API";
import Auth from "../../utils/auth";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const userId = Auth.getProfile().data._id;
  useEffect(() => {
    search.fetchUser(userId)
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId]);


  return (
    <>
      <Tabs value="bio" orientation="vertical">
        <TabsHeader className="w-40">
          <Tab value="bio" className="place-items-start">
            <div className="flex items-center gap-2">
              {React.createElement(Square3Stack3DIcon, { className: "w-5 h-5" })}
              Bio
            </div>
          </Tab>
          <Tab value="jobListing" className="place-items-start">
            <div className="flex items-center gap-2">
              {React.createElement(UserCircleIcon, { className: "w-5 h-5" })}
              Job Listings
            </div>
          </Tab>
          <Tab value="savedJobs" className="place-items-start">
            <div className="flex items-center gap-2">
              {React.createElement(BriefcaseIcon, { className: "w-5 h-5" })}
              Saved Jobs
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody
        className="h-[200vh] mb-4"
        >
          <TabPanel value="bio" className="py-0">
            <Bio 
            id={user._id}
            name={user.name}
            username={user.username}
            email={user.email}
            phone={user.phone}
            bio={user.bio}
            salaryExpectation={user.salaryExpectation}
           

            />
          </TabPanel>
          <TabPanel value="jobListing" className="py-5">
            <h2 className="text-myColor-2 text-xl">View or Manage your job listings:</h2>
            <UserCreatedListings />
          </TabPanel>
          <TabPanel value="savedJobs" className="py-0">
            <h2 className="text-myColor-2 text-xl">My Saved Jobs:</h2>
            <UserSavedListings />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </>
    
  );
}
