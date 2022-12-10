import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

/*const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First item",
    image:
      "https://images.techhive.com/images/article/2015/10/151027-facebook-headquarters-8-100624948-large.jpg?auto=webp&quality=85,70",
    address: "Some address 12345, Some City",
    description: "This is the first item",
  },
  {
    id: "m2",
    title: "Second item",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlfo6ih1WnFn32-nNqUMUCWIfKDq5Q1dyhfSGwfROIZkl_f08GSV_UgDQSlYoV6tXhM2g&usqp=CAU",
    address: "Some address 45678, Some City",
    description: "This is the second item",
  },
];*/

function HomePage(props) {
  return (
    <Fragment>
      <title>NextJS Demo App</title>
      <MeetupList meetups={props.meetups}></MeetupList>{" "}
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://URW:Urw123@cluster0.2xgmmkm.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
