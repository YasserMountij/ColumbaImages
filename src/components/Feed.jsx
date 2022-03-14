import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "./../utils/data";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    console.log(categoryId);

    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        console.log("query", query);
        console.log("data", data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  if (!pins?.length)
    return (
      <h2 className="w-full text-center font-bold">No pins available</h2>
    );
  if (loading)
    return <Spinner message="We are adding new ideas to your feed !" />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feed;
