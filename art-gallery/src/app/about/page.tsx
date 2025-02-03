"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const About = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div
      className={`minDimensions bg-background xPadding yPadding flex flex-col gap-8 text-medium fade-in ${startAnimation ? "opacity-100" : "opacity-0"}`}
    >
      <h1 className={"text-large font-bold"}>About This Project</h1>
      <p>
        This website is a dynamic platform designed to explore and celebrate the
        world of art powered by the Art Institute of Chicago’s API. By
        leveraging this powerful resource, the site provides users with access
        to a vast collection of art-related data, including detailed information
        about artists, their works, exhibitions, and more. The API enables
        real-time access to an extensive array of art, making it an invaluable
        tool for both art enthusiasts and researchers.
      </p>
      <p>
        Through this integration, users can explore collections from renowned
        institutions, discover the fascinating stories behind famous pieces, and
        gain a deeper understanding of the artists&apos; lives and creative
        processes. The project aims to make art more accessible and engaging,
        offering a user-friendly interface where visitors can immerse themselves
        in the rich history and diverse expressions of visual culture.
      </p>
      <p>
        Whether you&apos;re a student researching art history, a visitor looking
        for information about a piece, or simply someone passionate about art,
        this site provides an intuitive and informative experience. The API
        pulls data from various collections, offering up-to-date details,
        high-quality images, and extensive metadata about each artwork.
      </p>
      <p>
        For more information about the API and how it powers this project, check
        out the official{" "}
        <Link href={"https://api.artic.edu/docs"} className={"text-primary"}>
          Art Institute of Chicago API
        </Link>{" "}
        documentation.
      </p>
      <div className={"w-full flex justify-center"}>
        <Image
          src={"/Art_Institute_of_Chicago_logo.png"}
          alt={"Art Institute of Chicago Logo"}
          height={300}
          width={300}
        />
      </div>
    </div>
  );
};

export default About;
